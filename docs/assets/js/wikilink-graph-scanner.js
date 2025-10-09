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
    const basePath = '/07-knowledge-base/Vault/';

    // 并发扫描所有文件（Scan all files concurrently）
    const scanPromises = index.files.map(async (filePath) => {
      const fullPath = basePath + filePath;
      const fileId = pathToId(fullPath);
      const fileName = filePath.split('/').pop().replace(/\.md$/i, '');
      const label = decodeURIComponent(fileName);

      // 添加节点（Add node）
      addNode(fileId, label, fullPath);

      // 获取文件内容（Fetch file content）
      const content = await fetchMarkdownContent(fullPath);
      if (!content) return;

      // 提取 wikilinks（Extract wikilinks）
      const wikilinks = parseWikilinks(content);

      // 处理每个 wikilink（Process each wikilink）
      wikilinks.forEach(targetName => {
        const currentDir = fullPath.substring(0, fullPath.lastIndexOf('/'));
        const targetPath = `${currentDir}/${targetName}`;
        const targetId = pathToId(targetPath);

        // 添加目标节点（Add target node）
        addNode(targetId, targetName, targetPath);

        // 添加链接（Add link）
        addLink(fileId, targetId);
      });
    });

    // 等待所有扫描完成（Wait for all scans to complete）
    await Promise.all(scanPromises);

    console.log(`Vault scan complete: ${window.wikiGraphData.nodes.size} nodes, ${window.wikiGraphData.links.length} links`);

    // 更新缓存状态（Update cache state）
    vaultGraphCache.scanned = true;
    vaultGraphCache.lastScan = Date.now();

    // 触发图更新事件（Trigger graph update event）
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

      // 初始化时重置图数据
      hook.init(function() {
        window.wikiGraphData.nodes.clear();
        window.wikiGraphData.links = [];
        console.log('Wikilink Graph Scanner initialized');
      });

      // 路由就绪时也扫描一次
      hook.ready(function() {
        scanCurrentPage(hook, vm);
      });
    }
  );
})();
