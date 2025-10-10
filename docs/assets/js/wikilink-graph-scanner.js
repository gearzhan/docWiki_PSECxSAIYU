/**
 * Wikilink Graph Scanner Plugin for Docsify
 *
 * 功能说明（Function Description）：
 * - 扫描指定路径下的markdown文件中的wikilinks
 * - 构建页面关系图数据结构
 * - 存储到window.wikiGraphData供可视化使用
 */

(function() {
  'use strict';

  // 配置：限制图视图扫描的路径（Configuration: restrict graph scanning paths）
  // 默认配置（在配置文件加载失败时使用）
  window.wikiGraphConfig = {
    // 只扫描这些路径下的wikilinks（Array of path patterns to include）
    includePaths: [
      '07-knowledge-base/Vault'
    ],
    // 或者使用正则表达式（Or use regex patterns）
    includePatterns: [
      /^07-knowledge-base\/Vault/i
    ]
  };

  /**
   * 从配置文件加载 includePaths
   * Load includePaths from config file
   */
  async function loadConfigFromFile() {
    try {
      const basePath = window.$docsify.basePath || '/docs/';
      const configPath = basePath + 'wikilink-config.json';

      const response = await fetch(configPath);
      if (!response.ok) {
        console.warn('Wikilink config file not found, using defaults');
        return;
      }

      const config = await response.json();
      if (config.indexFolders && Array.isArray(config.indexFolders)) {
        // 更新 includePaths（移除 docs/ 前缀，因为 basePath 已包含）
        window.wikiGraphConfig.includePaths = config.indexFolders.map(
          path => path.replace(/^docs\//, '')
        );

        // 更新正则表达式匹配模式
        window.wikiGraphConfig.includePatterns = window.wikiGraphConfig.includePaths.map(
          path => new RegExp('^' + path.replace(/\//g, '\\/'), 'i')
        );

        console.log('Wikilink config loaded:', window.wikiGraphConfig.includePaths);
      }
    } catch (error) {
      console.error('Error loading wikilink config:', error);
    }
  }

  // 全局图数据结构（Global graph data structure）
  window.wikiGraphData = {
    nodes: new Map(), // id -> { id, label, path, category, connections }
    links: []
  };

  // 跟踪上一次扫描的作用域路径（Track last scoped path）
  let lastScopedPath = null;

  // Vault 图谱缓存状态（Vault graph cache state）
  let vaultGraphCache = {
    scanned: false,
    lastScan: null,
    scopePath: null
  };

  /**
   * 检查路径是否在允许的作用域内
   * Check if path is in allowed scope
   * @param {string} path - 页面路径
   * @returns {boolean} - 是否在作用域内
   */
  function isPathInScope(path) {
    if (!path) return false;

    const config = window.wikiGraphConfig;
    const normalizedPath = path.replace(/^\/+|\/+$/g, ''); // 移除首尾斜杠

    // 检查include paths
    for (const includePath of config.includePaths) {
      if (normalizedPath.includes(includePath)) {
        return true;
      }
    }

    // 检查正则表达式匹配
    for (const pattern of config.includePatterns) {
      if (pattern.test(normalizedPath)) {
        return true;
      }
    }

    return false;
  }

  /**
   * 提取文件路径的slug ID
   * Extract slug ID from file path
   */
  function pathToId(path) {
    return path
      .toLowerCase()
      .replace(/^\/+|\/+$/g, '') // 移除首尾斜杠
      .replace(/\.md$/i, '') // 移除.md后缀
      .replace(/\s+/g, '-') // 空格转连字符
      .replace(/[^\w\-\/]/g, ''); // 只保留字母数字连字符斜杠
  }

  /**
   * 从wikilink文本提取页面名称
   * Extract page name from wikilink text
   */
  function extractWikilinkTarget(wikilinkText) {
    // 移除 [[ ]] 包裹
    let inner = wikilinkText.replace(/^\[\[|\]\]$/g, '');

    // 处理 [[Page Name|Display Text]] 格式
    if (inner.includes('|')) {
      inner = inner.split('|')[0].trim();
    }

    // 处理 [[Page Name#section]] 格式
    if (inner.includes('#')) {
      inner = inner.split('#')[0].trim();
    }

    return inner.trim();
  }

  /**
   * 解析markdown内容提取wikilinks
   * Parse markdown content to extract wikilinks
   */
  function parseWikilinks(content) {
    const wikilinkRegex = /\[\[([^\[\]]+)\]\]/g;
    const links = [];
    let match;

    while ((match = wikilinkRegex.exec(content)) !== null) {
      const target = extractWikilinkTarget(match[0]);
      if (target) {
        links.push(target);
      }
    }

    return links;
  }

  /**
   * 解析markdown内容提取标准Markdown链接
   * Parse markdown content to extract standard markdown links
   * @param {string} content - Markdown文件内容
   * @returns {Array<{text: string, path: string}>} - 链接对象数组
   */
  function parseMarkdownLinks(content) {
    // 匹配 [text](path.md) 格式，排除外部链接（http/https）
    const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+\.md)\)/g;
    const links = [];
    let match;

    while ((match = markdownLinkRegex.exec(content)) !== null) {
      const text = match[1];
      const path = match[2];

      // 排除外部链接（以 http:// 或 https:// 开头）
      if (!path.match(/^https?:\/\//i)) {
        links.push({
          text: text.trim(),
          path: path.trim()
        });
      }
    }

    return links;
  }

  /**
   * 解析相对路径（处理 ../ 和 ./ 导航）
   * Resolve relative path from current file path
   * @param {string} currentPath - 当前文件完整路径（如 /07-knowledge-base/Vault/SafeWorkCode/WHS-Framework/04-Specific-Hazard-Management/Construction-Work.md）
   * @param {string} relativePath - 相对路径（如 ../../code of practice/construction_work.md）
   * @returns {string} - 解析后的绝对路径
   */
  function resolvePath(currentPath, relativePath) {
    // 解码URL编码的字符（如 %20 -> 空格）
    const decodedPath = decodeURIComponent(relativePath);

    // 获取当前文件所在目录（移除文件名）
    const currentDir = currentPath.substring(0, currentPath.lastIndexOf('/'));

    // 将相对路径按 / 分割
    const parts = decodedPath.split('/').filter(p => p);
    const dirParts = currentDir.split('/').filter(p => p);

    // 处理每个路径部分
    for (const part of parts) {
      if (part === '..') {
        // 上级目录：移除最后一个目录
        dirParts.pop();
      } else if (part === '.') {
        // 当前目录：忽略
        continue;
      } else {
        // 普通目录或文件：添加到路径
        dirParts.push(part);
      }
    }

    // 重新组合为绝对路径（以 / 开头）
    return '/' + dirParts.join('/');
  }

  /**
   * 获取页面分类（基于路径）
   * Get page category based on path
   */
  function getCategory(path) {
    const parts = path.split('/').filter(p => p);
    if (parts.length > 0) {
      // 使用第一级目录作为分类
      const firstDir = parts[0];
      if (firstDir.match(/^\d{2}-/)) {
        return firstDir.replace(/^\d{2}-/, ''); // 移除数字前缀
      }
      return firstDir;
    }
    return 'root';
  }

  /**
   * 添加或更新节点
   * Add or update node in graph
   */
  function addNode(id, label, path) {
    if (!window.wikiGraphData.nodes.has(id)) {
      window.wikiGraphData.nodes.set(id, {
        id: id,
        label: label,
        path: path,
        category: getCategory(path),
        connections: 0
      });
    }
  }

  /**
   * 添加边（链接）
   * Add edge (link) to graph
   */
  function addLink(sourceId, targetId) {
    // 检查是否已存在此链接
    const exists = window.wikiGraphData.links.some(
      link => link.source === sourceId && link.target === targetId
    );

    if (!exists) {
      window.wikiGraphData.links.push({
        source: sourceId,
        target: targetId
      });

      // 增加连接计数
      const sourceNode = window.wikiGraphData.nodes.get(sourceId);
      const targetNode = window.wikiGraphData.nodes.get(targetId);
      if (sourceNode) sourceNode.connections++;
      if (targetNode) targetNode.connections++;
    }
  }

  /**
   * 获取 Vault 索引文件
   * Fetch Vault index file
   */
  async function fetchVaultIndex() {
    try {
      const basePath = window.$docsify.basePath || '/docs/';

      // 获取第一个配置的 Vault 路径（Get first configured Vault path）
      const vaultPath = window.wikiGraphConfig.includePaths[0];
      const indexPath = basePath + vaultPath + '/_index.json';

      const response = await fetch(indexPath);
      if (!response.ok) {
        console.warn(`Failed to fetch vault index: ${indexPath}`);
        return null;
      }

      const index = await response.json();
      console.log('Vault index loaded:', index.files.length, 'files');
      return index;
    } catch (error) {
      console.error('Error fetching vault index:', error);
      return null;
    }
  }

  /**
   * 批量扫描整个 Vault
   * Scan entire Vault in batch
   */
  async function scanEntireVault() {
    console.log('Starting full Vault scan...');

    const index = await fetchVaultIndex();
    if (!index || !index.files) {
      console.error('Cannot scan vault: index file not found or invalid');
      return;
    }

    const vaultPath = window.wikiGraphConfig.includePaths[0];
    const basePath = '/' + vaultPath + '/';

    // ============================================================
    // 第一步：建立文件名到路径的映射表（解决跨目录引用问题）
    // Step 1: Build filename-to-path lookup table (resolve cross-directory references)
    // ============================================================
    const fileNameToPath = new Map();

    index.files.forEach((filePath) => {
      const fileName = filePath.split('/').pop().replace(/\.md$/i, '');
      const fullPath = basePath + filePath;
      const fileId = pathToId(fullPath);

      // 存储映射：文件名（小写） -> { fullPath, fileId, label }
      fileNameToPath.set(fileName.toLowerCase(), {
        fullPath: fullPath,
        fileId: fileId,
        label: decodeURIComponent(fileName)
      });
    });

    console.log(`Built lookup table with ${fileNameToPath.size} files`);

    // ============================================================
    // 第二步：并发扫描所有文件并建立链接关系
    // Step 2: Scan all files concurrently and build link relationships
    // ============================================================
    const scanPromises = index.files.map(async (filePath) => {
      const fullPath = basePath + filePath;
      const fileId = pathToId(fullPath);
      const fileName = filePath.split('/').pop().replace(/\.md$/i, '');
      const label = decodeURIComponent(fileName);

      // 添加源节点
      addNode(fileId, label, fullPath);

      // 获取文件内容
      const content = await fetchMarkdownContent(fullPath);
      if (!content) return;

      // ============================================================
      // 第一部分：处理 Wikilinks（[[...]] 格式）
      // Part 1: Process wikilinks ([[...]] format)
      // ============================================================
      const wikilinks = parseWikilinks(content);

      wikilinks.forEach(targetName => {
        // 规范化目标名称（移除空格、转小写）
        const targetKey = targetName.toLowerCase().trim();

        // 从查找表中查找目标文件
        const targetInfo = fileNameToPath.get(targetKey);

        if (targetInfo) {
          // ✅ 找到目标文件，使用正确的完整路径
          const { fullPath: targetPath, fileId: targetId, label: targetLabel } = targetInfo;

          // 确保目标节点存在（虽然第一步已添加，但保持幂等性）
          addNode(targetId, targetLabel, targetPath);

          // 添加链接（双向增加 connections）
          addLink(fileId, targetId);
        } else {
          // ⚠️ 未找到目标文件（可能是拼写错误、跨 Vault 引用或待创建页面）
          console.warn(`[Scan] Wikilink target not found: "${targetName}" (from ${fileName})`);

          // 仍然创建"幽灵节点"（虚线显示，标记为不存在）
          const currentDir = fullPath.substring(0, fullPath.lastIndexOf('/'));
          const targetPath = `${currentDir}/${targetName}`;
          const targetId = pathToId(targetPath);

          addNode(targetId, targetName, targetPath);
          addLink(fileId, targetId);
        }
      });

      // ============================================================
      // 第二部分：处理标准 Markdown 链接（[text](path.md) 格式）
      // Part 2: Process standard markdown links ([text](path.md) format)
      // ============================================================
      const markdownLinks = parseMarkdownLinks(content);

      markdownLinks.forEach(link => {
        // 解析相对路径为绝对路径
        const resolvedPath = resolvePath(fullPath, link.path);
        const targetId = pathToId(resolvedPath);

        // 从路径提取文件名作为 label
        const targetFileName = resolvedPath.split('/').pop().replace(/\.md$/i, '');
        const targetLabel = decodeURIComponent(targetFileName);

        // 尝试从查找表中查找（优先使用已知路径）
        const targetKey = targetFileName.toLowerCase();
        const targetInfo = fileNameToPath.get(targetKey);

        if (targetInfo) {
          // ✅ 在查找表中找到（使用正确的完整路径和 label）
          const { fullPath: knownPath, fileId: knownId, label: knownLabel } = targetInfo;
          addNode(knownId, knownLabel, knownPath);
          addLink(fileId, knownId);
        } else {
          // ⚠️ 未在查找表中找到（可能是跨 Vault 链接或文件不存在）
          // 仍然创建节点并添加链接
          addNode(targetId, targetLabel, resolvedPath);
          addLink(fileId, targetId);
        }
      });
    });

    // 等待所有扫描完成
    await Promise.all(scanPromises);

    console.log(`Vault scan complete: ${window.wikiGraphData.nodes.size} nodes, ${window.wikiGraphData.links.length} links`);

    // ============================================================
    // 调试输出：显示连接最多的前 10 个节点
    // Debug: Show top 10 most connected nodes
    // ============================================================
    const topNodes = Array.from(window.wikiGraphData.nodes.values())
      .sort((a, b) => b.connections - a.connections)
      .slice(0, 10);

    console.log('Top 10 connected nodes:');
    topNodes.forEach((node, index) => {
      console.log(`  ${index + 1}. ${node.label}: ${node.connections} connections`);
    });

    // 更新缓存状态
    vaultGraphCache.scanned = true;
    vaultGraphCache.lastScan = Date.now();

    // 触发图更新事件
    window.dispatchEvent(new CustomEvent('wikiGraphUpdated', {
      detail: window.wikiGraphData
    }));
  }

  /**
   * 从路径获取原始markdown文件内容
   * Fetch raw markdown content from path
   */
  async function fetchMarkdownContent(path) {
    try {
      // 构建文件URL（Construct file URL）
      const basePath = window.$docsify.basePath || '/docs/';

      // 确保路径有.md后缀（Ensure path has .md extension）
      let mdPath = path;
      if (!mdPath.toLowerCase().endsWith('.md')) {
        mdPath += '.md';
      }

      const fullPath = basePath + mdPath;

      const response = await fetch(fullPath);
      if (!response.ok) {
        console.warn(`Failed to fetch ${fullPath}`);
        return null;
      }

      const content = await response.text();

      // 检查是否意外获取了HTML而不是markdown（Check if we got HTML instead of markdown）
      if (content.trim().startsWith('<!doctype') || content.trim().startsWith('<html')) {
        console.warn(`Got HTML instead of markdown for ${fullPath}`);
        return null;
      }

      return content;
    } catch (error) {
      console.error('Error fetching markdown:', error);
      return null;
    }
  }

  /**
   * 扫描当前页面并更新图数据
   * Scan current page and update graph data
   */
  async function scanCurrentPage(hook, vm) {
    const currentPath = vm.route.path;

    // 如果离开了作用域，清空图数据和缓存（If leaving scope, clear graph data and cache）
    if (lastScopedPath && !isPathInScope(currentPath)) {
      window.wikiGraphData.nodes.clear();
      window.wikiGraphData.links = [];
      lastScopedPath = null;
      vaultGraphCache.scanned = false;
      vaultGraphCache.lastScan = null;
      console.log('Left graph scope, cleared data and cache');

      // 触发图更新事件（通知UI）
      window.dispatchEvent(new CustomEvent('wikiGraphUpdated', {
        detail: window.wikiGraphData
      }));
      return;
    }

    // 检查路径是否在允许范围内（Check if path is in allowed scope）
    if (!isPathInScope(currentPath)) {
      return; // 跳过扫描（Skip scanning for this page）
    }

    // 首次进入 Vault：触发批量扫描（First time entering Vault: trigger batch scan）
    if (!lastScopedPath && !vaultGraphCache.scanned) {
      console.log('Entering Vault scope, starting batch scan...');
      lastScopedPath = currentPath;
      await scanEntireVault();
      return;
    }

    lastScopedPath = currentPath;

    // 后续导航：使用缓存，无需重新扫描（Subsequent navigation: use cache, no need to rescan）
    console.log('Using cached Vault graph data');
  }

  /**
   * Docsify插件注册
   * Docsify plugin registration
   */
  window.$docsify = window.$docsify || {};
  window.$docsify.plugins = [].concat(
    window.$docsify.plugins || [],
    function(hook, vm) {
      // 每次页面渲染完成后扫描
      hook.doneEach(function() {
        scanCurrentPage(hook, vm);
      });

      // 初始化时重置图数据并加载配置
      hook.init(async function() {
        window.wikiGraphData.nodes.clear();
        window.wikiGraphData.links = [];
        await loadConfigFromFile(); // 加载配置文件
        console.log('Wikilink Graph Scanner initialized');
      });

      // 路由就绪时也扫描一次
      hook.ready(function() {
        scanCurrentPage(hook, vm);
      });
    }
  );
})();
