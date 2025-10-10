# docWiki 项目说明

本项目是一个基于 Docsify 的文档网站，使用 docsify-themeable 提供可定制主题，并集成 Mermaid 以支持流程图、时序图等图形化描述。

## 基础
- 框架基础：Docsify（前端渲染 Markdown，无需构建）
- 主题基础：docsify-themeable（可切换 Light/Dark，便于样式覆盖）
- 图形基础：Mermaid（使用 UMD 版本，保证与 docsify-mermaid 插件协同）
- 目录结构：所有文档位于 `docs/` 目录，根目录为站点入口（`index.html`）

## 使用的插件与库
- Docsify 核心（`docsify@4`）
- docsify-themeable（`docsify-themeable@0`）
- 文本搜索插件（`docsify@4/lib/plugins/search.min.js`）
- 图片放大插件（`docsify@4/lib/plugins/zoom-image.min.js`）
- Mermaid 图表（`mermaid@10` UMD）
- docsify-mermaid 插件（`docsify-mermaid@2.0.1`）
- docsify-wikilink（`docsify-wikilink@1`）- Obsidian 风格 [[wikilinks]] 支持
- D3.js v7 - 力导向图可视化

## 关键配置与约定
- `index.html` 中：
  - `basePath: '/docs/'` 指向文档根目录；
  - `loadSidebar: true` 启用侧边栏；
  - `alias: { '/.*/_sidebar.md': '/_sidebar.md' }` 复用根侧边栏；
  - `subMaxLevel: 2` 控制目录展开层级；
  - `search: { paths: 'auto' }` 开启全文检索；
  - `mermaidConfig: { querySelector: '.mermaid' }` 指定选择器；
- 书写规范：
  - UI 文案与注释使用英文；
  - 源码注释使用中文；
  - 生成代码时补充函数级注释。

## 已做的修改（本次迭代）
- 修复 `sidebar_rule.md` 中的别名示例小错误（`/_sidebar.md`）。
- 清理 `docs/README.md` 中的测试残留文案。
- 为每个文档页面首行插入测试提示文本（仅供测试使用，素材随机生成），避免重复插入。
- 调整 Mermaid 加载策略：改为使用 UMD 版本，并保留 `docsify-mermaid` 插件，避免初始化时序冲突。
- 新增并完善主题切换逻辑：系统主题监听 + 手动覆盖优先，Mermaid 随主题重渲染。
- 修复样式片段中残留的 diff 标记，保证样式与脚本无语法问题。

## 新增功能

### 主题切换
- 左下角 Light/Dark 主题开关（toggle switch）：
  - 开关两侧显示文字 `light / dark`；
  - 手动切换后写入 `localStorage` 并强制刷新一次页面；
  - 切换时立即切换 themeable 的样式表 media；
  - Mermaid 图根据当前主题实时重渲染；
  - 如存在手动覆盖，系统主题变化将被忽略。
- 暗色主题下的 Mermaid 对比度优化（线条、标签等视觉可读性增强）。

### Wikilinks 与图谱视图
- **[[Wikilink]] 语法支持**：
  - 使用 `[[Page Name]]` 或 `[[Page Name|Display Text]]` 创建页面链接
  - 自动生成 URL slug，支持同目录页面跳转
  - Obsidian 兼容的 Markdown 语法

- **交互式关系图谱**（Obsidian 风格）：
  - D3.js 力导向图可视化所有页面关系
  - 预扫描模式：进入 Vault 作用域时批量扫描所有文件
  - 完整网络发现：显示所有节点及二级连接关系
  - 智能缓存：后续导航使用缓存，性能优秀
  - 作用域限制：仅在指定文件夹（如 `07-knowledge-base/Vault/`）启用
  - 灰色主题配色，节点大小按连接数动态调整
  - 支持缩放、平移、拖拽节点
  - 点击节点直接跳转到对应页面
  - ESC 键或 × 按钮关闭图谱

- **技术实现**：
  - 静态索引文件 `_index.json` 用于高效文件发现
  - 并发扫描（`Promise.all()`）实现快速加载
  - 主题感知，自动适配 light/dark 模式
  - 响应式设计，支持移动端和桌面端

## 目录结构（节选）
```
/ (项目根)
├── index.html                # Docsify 入口与配置、主题/脚本注入
├── sidebar_rule.md           # 侧边栏编写规范
├── README.md                 # 本说明文档（你正在阅读）
├── CLAUDE.md                 # Claude Code 项目指南
└── docs/                     # 文档根目录
    ├── README.md
    ├── _sidebar.md
    ├── assets/               # 静态资源
    │   ├── css/
    │   │   └── wikilink-graph.css
    │   └── js/
    │       ├── wikilink-graph-scanner.js
    │       └── wikilink-graph-view.js
    ├── 07-knowledge-base/
    │   └── Vault/            # Wiki 知识库（启用 wikilinks + 图谱）
    │       ├── _index.json   # 文件索引
    │       └── Sample Vault/ # 示例 Vault
    └── [其他文档目录...]
```

## 本地开发

### 安装 Docsify CLI
首次使用需要全局安装 docsify-cli：
```bash
npm install -g docsify-cli
```
### 启动本地服务器
在项目根目录执行以下命令启动本地开发服务器：
```bash
docsify serve .
docsify serve . --port 8080 # 启动本地服务器，默认端口为 3000
nohup docsify serve . & # 在后台运行
```

### 开发提示
- 修改 `docs/` 目录下的 Markdown 文件后，浏览器会自动刷新显示最新内容
- 修改 `index.html` 配置文件后，需要手动刷新浏览器

## 文档编写提示
- 侧边栏编写规范请参阅根目录 `sidebar_rule.md`
- 因 `basePath` 为 `/docs/`，文内链接如 `[Home](/)` 会指向 `docs/README.md`
- 在 Vault 文件夹中使用 `[[Page Name]]` 创建 wikilinks
- 添加新文件到 Vault 后，需更新 `_index.json` 以启用图谱扫描

## 配置 Wikilinks 图谱
要在新文件夹中启用 wikilinks 图谱功能：

1. **配置作用域** - 编辑 `docs/assets/js/wikilink-graph-scanner.js`:
   ```javascript
   window.wikiGraphConfig = {
     includePaths: [
       '07-knowledge-base/Vault',
       'your-new-folder/path'  // 添加新路径
     ],
     includePatterns: [
       /^07-knowledge-base\/Vault/i,
       /^your-new-folder\/path/i  // 添加对应正则
     ]
   };
   ```

2. **创建索引文件** - 在目标文件夹创建 `_index.json`:
   ```json
   {
     "version": "1.0",
     "generatedAt": "2025-01-09T12:00:00Z",
     "files": [
       "Page 01.md",
       "Page 02.md"
     ]
   }
   ```

3. **使用 wikilinks** - 在 Markdown 文件中：
   ```markdown
   链接到其他页面：[[Page 01]]
   自定义显示文字：[[Page 01|查看第一页]]
   ```

