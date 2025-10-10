/**
 * Wikilink Graph View - Interactive Force-Directed Graph
 *
 * 功能说明（Function Description）：
 * - 使用D3.js创建力导向图可视化
 * - 支持拖拽、缩放、点击导航
 * - 主题感知（light/dark）
 */

(function() {
  'use strict';

  let d3Loaded = false;
  let graphVisible = false;
  let simulation = null;
  let svg = null;

  /**
   * 动态加载D3.js库
   * Dynamically load D3.js library
   */
  function loadD3(callback) {
    if (d3Loaded && window.d3) {
      callback();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/d3@7';
    script.onload = function() {
      d3Loaded = true;
      console.log('D3.js loaded successfully');
      callback();
    };
    script.onerror = function() {
      console.error('Failed to load D3.js');
    };
    document.head.appendChild(script);
  }

  /**
   * 获取当前主题
   * Get current theme
   */
  function getCurrentTheme() {
    const stored = localStorage.getItem('preferred-theme');
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  /**
   * 获取主题相关的颜色配置（Obsidian风格）
   * Get theme-related color configuration (Obsidian style)
   */
  function getThemeColors() {
    const isDark = getCurrentTheme() === 'dark';
    return {
      background: isDark ? '#1e1e1e' : '#ffffff',
      // Obsidian风格节点颜色：灰色系（Obsidian-style node colors: gray theme）
      nodeFill: isDark ? '#888888' : '#5c5c5c',
      nodeStroke: isDark ? '#aaaaaa' : '#4a4a4a',
      // 连接线颜色：半透明（Link colors: semi-transparent）
      linkStroke: isDark ? 'rgba(136, 136, 136, 0.3)' : 'rgba(92, 92, 92, 0.4)',
      linkStrokeHover: isDark ? 'rgba(170, 170, 170, 0.8)' : 'rgba(74, 74, 74, 0.8)',
      // 文字颜色（Text colors）
      textFill: isDark ? '#dcddde' : '#2e3338',
      textStroke: isDark ? '#1e1e1e' : '#ffffff',
      // 高亮和悬停（Highlight and hover）
      highlightFill: isDark ? '#aaaaaa' : '#6a6a6a',
      hoverFill: isDark ? '#999999' : '#666666',
      // 当前节点（Current node）
      currentNodeFill: isDark ? '#7dcfff' : '#4a9eff',
      currentNodeStroke: isDark ? '#89ddff' : '#2e7fd6'
    };
  }

  /**
   * 获取节点颜色（Obsidian风格：统一灰色）
   * Get node color (Obsidian style: unified gray)
   */
  function getNodeColor(category, colors) {
    // Obsidian 使用统一的灰色，不区分分类
    // Obsidian uses unified gray color, no category distinction
    return colors.nodeFill;
  }

  /**
   * 创建力导向图（Obsidian风格）
   * Create force-directed graph (Obsidian style)
   */
  function createGraph(container) {
    const d3 = window.d3;
    const colors = getThemeColors();

    // 获取容器尺寸
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 清除现有内容
    container.innerHTML = '';

    // 创建SVG
    svg = d3.select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height]);

    // 添加缩放和平移支持
    const g = svg.append('g');

    const zoom = d3.zoom()
      .scaleExtent([0.1, 4])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    // 准备数据
    const nodes = Array.from(window.wikiGraphData.nodes.values());
    const links = window.wikiGraphData.links.map(d => ({...d}));

    if (nodes.length === 0) {
      // 显示空状态提示
      g.append('text')
        .attr('x', width / 2)
        .attr('y', height / 2)
        .attr('text-anchor', 'middle')
        .attr('fill', colors.textFill)
        .attr('font-size', '18px')
        .text('No wikilinks found. Navigate to pages with [[wikilinks]] to see the graph.');
      return;
    }

    // 获取当前页面路径用于高亮（Get current page path for highlighting）
    const currentPath = window.location.hash.substring(2);
    const currentId = currentPath.toLowerCase().replace(/^\/+|\/+$/g, '').replace(/\.md$/i, '').replace(/\s+/g, '-').replace(/[^\w\-\/]/g, '');

    // 创建力模拟（Obsidian风格：较强的排斥力，较长的连接距离）
    simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => d.id).distance(150))
      .force('charge', d3.forceManyBody().strength(-800))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(40));

    // 绘制连接线（Obsidian风格：曲线）
    const link = g.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', colors.linkStroke)
      .attr('stroke-width', 1.5)
      .attr('opacity', 0.6);

    // 绘制节点
    const node = g.append('g')
      .attr('class', 'nodes')
      .selectAll('g')
      .data(nodes)
      .join('g')
      .call(drag(simulation));

    // 节点外发光效果（Node glow effect）
    node.append('circle')
      .attr('r', d => {
        const baseSize = Math.sqrt(d.connections + 1) * 6;
        return Math.max(6, Math.min(25, baseSize));
      })
      .attr('fill', 'none')
      .attr('stroke', d => d.id === currentId ? colors.currentNodeStroke : colors.nodeStroke)
      .attr('stroke-width', d => d.id === currentId ? 3 : 0)
      .attr('opacity', 0.3);

    // 节点主体（Node main body）
    node.append('circle')
      .attr('class', 'node-circle')
      .attr('r', d => {
        const baseSize = Math.sqrt(d.connections + 1) * 5;
        const radius = Math.max(5, Math.min(20, baseSize));
        d.radius = radius;  // 存储原始半径（Store original radius）
        return radius;
      })
      .attr('fill', d => d.id === currentId ? colors.currentNodeFill : getNodeColor(d.category, colors))
      .attr('stroke', d => d.id === currentId ? colors.currentNodeStroke : colors.nodeStroke)
      .attr('stroke-width', 2)
      .attr('cursor', 'pointer')
      .on('mouseover', function(event, d) {
        // 高亮节点（Highlight node）
        d3.select(this)
          .attr('fill', d.id === currentId ? colors.currentNodeFill : colors.hoverFill)
          .transition()
          .duration(200)
          .attr('r', d.radius * 1.3);  // 使用存储的半径（Use stored radius）

        // 高亮相关连接线（Highlight related links）
        link
          .attr('stroke', l => (l.source.id === d.id || l.target.id === d.id) ? colors.linkStrokeHover : colors.linkStroke)
          .attr('stroke-width', l => (l.source.id === d.id || l.target.id === d.id) ? 2.5 : 1.5)
          .attr('opacity', l => (l.source.id === d.id || l.target.id === d.id) ? 1 : 0.3);

        // 显示标签（Show label）
        d3.select(this.parentNode).select('.node-label')
          .attr('opacity', 1)
          .attr('font-weight', 600);
      })
      .on('mouseout', function(event, d) {
        // 恢复节点（Restore node）
        d3.select(this)
          .attr('fill', d.id === currentId ? colors.currentNodeFill : getNodeColor(d.category, colors))
          .transition()
          .duration(200)
          .attr('r', d.radius);  // 使用存储的半径（Use stored radius）

        // 恢复连接线（Restore links）
        link
          .attr('stroke', colors.linkStroke)
          .attr('stroke-width', 1.5)
          .attr('opacity', 0.6);

        // 恢复标签样式（Restore label style）
        d3.select(this.parentNode).select('.node-label')
          .attr('font-weight', 400);
      })
      .on('click', function(event, d) {
        // 导航到页面
        window.location.hash = '#' + d.path;
        closeGraph();
      });

    // 节点标签（带描边以提高可读性）
    // Node labels (with stroke for better readability)
    node.append('text')
      .attr('class', 'node-label')
      .text(d => d.label)
      .attr('x', 0)
      .attr('y', d => -d.radius - 8)  // 使用存储的半径（Use stored radius）
      .attr('text-anchor', 'middle')
      .attr('font-size', '13px')
      .attr('font-weight', 400)
      .attr('pointer-events', 'none')
      .attr('opacity', 1)  // 始终显示标签（Always show labels）
      .style('user-select', 'none')
      .each(function(d) {
        // 添加描边以提高可读性（Add stroke for readability）
        const label = d3.select(this);
        const text = label.text();

        // 背景描边（Background stroke）
        d3.select(this.parentNode).insert('text', '.node-label')
          .attr('class', 'node-label-bg')
          .text(text)
          .attr('x', 0)
          .attr('y', -d.radius - 8)  // 使用存储的半径（Use stored radius）
          .attr('text-anchor', 'middle')
          .attr('font-size', '13px')
          .attr('font-weight', 400)
          .attr('stroke', colors.textStroke)
          .attr('stroke-width', 3)
          .attr('opacity', 1)  // 始终显示（Always visible）
          .attr('pointer-events', 'none')
          .style('user-select', 'none');

        // 前景文字（Foreground text）
        label.attr('fill', colors.textFill);
      });

    // 更新位置
    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node
        .attr('transform', d => `translate(${d.x},${d.y})`);
    });

    // 拖拽功能
    function drag(simulation) {
      function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }

      function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }

      return d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
    }
  }

  /**
   * 显示图视图
   * Show graph view
   */
  function showGraph() {
    if (graphVisible) return;

    const overlay = document.getElementById('wikilink-graph-overlay');
    if (!overlay) return;

    overlay.style.display = 'flex';
    setTimeout(() => {
      overlay.classList.add('active');
      graphVisible = true;
    }, 10);

    // 加载D3并创建图
    loadD3(function() {
      const container = document.getElementById('graph-container');
      if (container) {
        createGraph(container);
      }
    });
  }

  /**
   * 关闭图视图
   * Close graph view
   */
  function closeGraph() {
    const overlay = document.getElementById('wikilink-graph-overlay');
    if (!overlay) return;

    overlay.classList.remove('active');
    setTimeout(() => {
      overlay.style.display = 'none';
      graphVisible = false;

      // 停止模拟
      if (simulation) {
        simulation.stop();
        simulation = null;
      }
    }, 300);
  }

  /**
   * 重置缩放
   * Reset zoom
   */
  window.resetGraphZoom = function() {
    if (svg) {
      const d3 = window.d3;
      svg.transition()
        .duration(750)
        .call(d3.zoom().transform, d3.zoomIdentity);
    }
  };

  /**
   * 检查路径是否在图视图作用域内
   * Check if path is in graph scope (matches wikiGraphConfig)
   */
  function isPathInGraphScope(path) {
    if (!path || !window.wikiGraphConfig) return false;

    const config = window.wikiGraphConfig;
    const normalizedPath = path.replace(/^\/+|\/+$/g, '').replace(/^#\//, '');

    // 检查include paths
    for (const includePath of config.includePaths) {
      if (normalizedPath.includes(includePath)) {
        return true;
      }
    }

    // 检查正则表达式
    for (const pattern of config.includePatterns) {
      if (pattern.test(normalizedPath)) {
        return true;
      }
    }

    return false;
  }

  /**
   * 更新图视图按钮的可见性
   * Update graph view button visibility based on current path
   */
  function updateButtonVisibility() {
    const btn = document.querySelector('.graph-toggle-btn');
    if (!btn) return;

    const currentPath = window.location.hash.substring(2); // 移除 #/

    if (isPathInGraphScope(currentPath)) {
      btn.style.display = 'flex';
    } else {
      btn.style.display = 'none';
    }
  }

  /**
   * 初始化图视图UI
   * Initialize graph view UI
   */
  function initGraphUI() {
    // 创建覆盖层
    const overlay = document.createElement('div');
    overlay.id = 'wikilink-graph-overlay';
    overlay.className = 'wikilink-graph-overlay';
    overlay.innerHTML = `
      <div class="graph-panel">
        <div class="graph-header">
          <h2>Wikilink Graph View</h2>
          <div class="graph-controls">
            <button onclick="resetGraphZoom()" title="Reset Zoom">🔍</button>
            <button onclick="closeWikilinkGraph()" title="Close">✕</button>
          </div>
        </div>
        <div id="graph-container" class="graph-container"></div>
        <div class="graph-legend">
          <div class="legend-item">
            <span class="legend-circle" style="background: var(--node-color)"></span>
            <span>Node size = number of connections</span>
          </div>
          <div class="legend-item">
            <span>Drag to move • Scroll to zoom • Click to navigate</span>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    // 点击覆盖层背景关闭
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) {
        closeGraph();
      }
    });

    // ESC键关闭
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && graphVisible) {
        closeGraph();
      }
    });

    // 全局函数
    window.showWikilinkGraph = showGraph;
    window.closeWikilinkGraph = closeGraph;

    // 监听路由变化，更新按钮可见性（Listen to route changes, update button visibility）
    window.addEventListener('hashchange', updateButtonVisibility);

    // 初始化时设置按钮可见性（Set initial button visibility）
    setTimeout(updateButtonVisibility, 100);
  }

  /**
   * 监听图数据更新
   * Listen for graph data updates
   */
  window.addEventListener('wikiGraphUpdated', function(event) {
    console.log('Wiki graph updated:', event.detail);
    // 如果图当前可见，刷新它
    if (graphVisible) {
      loadD3(function() {
        const container = document.getElementById('graph-container');
        if (container) {
          createGraph(container);
        }
      });
    }
  });

  /**
   * 页面加载完成后初始化
   * Initialize after page load
   */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGraphUI);
  } else {
    initGraphUI();
  }
})();
