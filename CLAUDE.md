# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**docWiki** is a Docsify-based documentation website for PSEC Project Services and SAIYU Construction. It serves as an internal wiki containing company policies, procedures, commercial workflows, and technical knowledge base. The site uses client-side Markdown rendering without a build step.

## Architecture

### Technology Stack
- **Framework**: Docsify 4 (client-side Markdown rendering)
- **Theme**: docsify-themeable (supports light/dark mode switching)
- **Diagramming**: Mermaid 10 (UMD build) with docsify-mermaid plugin
- **Wikilinks**: docsify-wikilink plugin for Obsidian-style [[page]] syntax
- **Graph Visualization**: D3.js v7 for force-directed graph view
- **Deployment**: Vercel (SPA routing via vercel.json)

### Key Files
- `index.html` - Main entry point containing all Docsify configuration, theme loading, and custom theme switching logic
- `docs/` - All documentation content (Markdown files)
- `docs/_sidebar.md` - Global sidebar navigation (aliased for all routes)
- `docs/assets/js/wikilink-graph-scanner.js` - Scans pages for wikilinks and builds graph data
- `docs/assets/js/wikilink-graph-view.js` - D3.js force-directed graph visualization
- `docs/assets/css/wikilink-graph.css` - Graph view styling (theme-aware)
- `sidebar_rule.md` - Documentation for sidebar authoring conventions
- `vercel.json` - SPA rewrite rules for deployment

### Configuration Details

**Docsify Config** (in `index.html`):
```javascript
window.$docsify = {
  basePath: '/docs/',           // 文档根目录指向 docs/
  loadSidebar: true,             // 启用侧边栏
  alias: { '/.*/_sidebar.md': '/_sidebar.md' },  // 所有路由共用根侧边栏
  subMaxLevel: 2,                // 目录展开最大层级
  auto2top: true,
  search: { paths: 'auto' },     // 全文检索
  mermaidConfig: { querySelector: '.mermaid' }
}
```

**Theme Switching**:
- Manual light/dark theme toggle in top-right corner
- Theme preference stored in `localStorage` as `preferred-theme`
- Manual override takes precedence over system preference
- Theme changes trigger Mermaid re-initialization with theme-specific colors
- Page auto-reloads after manual theme switch for full style application

**Mermaid Integration**:
- Uses UMD version loaded before docsify-mermaid plugin to ensure `window.mermaid` availability
- Theme-specific initialization with custom color variables
- Dark theme uses enhanced contrast colors for better readability
- Automatic re-rendering on theme changes

**Wikilinks & Graph View**:
- **Wikilink Syntax**: `[[Page Name]]` or `[[Page Name|Display Text]]` (Obsidian-style)
- **Pre-Scanning Mode**: Batch scans entire Vault on first entry using `_index.json` file list
- **Graph Scanner**: Uses `Promise.all()` for concurrent file fetching and parsing
- **Complete Network Discovery**: Shows all nodes including secondary connections (1-level deep from each node)
- **Scoped Scanning**: Graph view limited to specific folders (configurable in `wikiGraphConfig`)
- **Default Scope**: Only scans `docs/07-knowledge-base/Vault/` folder
- **Cache Management**: Graph data cached after initial scan, cleared on scope exit
- **Index File**: Static `_index.json` lists all .md files for efficient discovery
- **Graph Data Structure**: Stored in `window.wikiGraphData` with nodes and links
- **Force-Directed Layout**: D3.js simulation with drag, zoom, and click-to-navigate
- **Obsidian-Style Colors**: Unified gray color scheme (#5c5c5c light, #888 dark)
- **Node Sizing**: Node radius scales with number of connections
- **Always-Visible Labels**: All node labels displayed for better navigation
- **Dynamic Button**: "Graph View" button only visible within scoped folders
- **Auto-Clear**: Graph data cleared when navigating outside scope
- **Keyboard Shortcut**: ESC key closes graph view
- **Lazy Loading**: D3.js only loads when graph is first opened
- **Sample Data**: Test with `/docs/07-knowledge-base/Vault/Sample Vault/` files

## Content Structure

### Directory Organization (2-level max)
```
docs/
├── README.md              # 主页（欢迎页）
├── _sidebar.md            # 全局侧边栏导航
├── getting-started.md     # 入门指南
├── dashboard.md           # 链接仪表盘（政府服务、标准、工具等）
├── 01-policies/           # 公司政策
├── 02-commercial/         # 商务流程（采购、合同等）
├── 03-TBC/                # 待定内容
├── 04-procedures/         # 操作规程（详细步骤）
│   ├── buildertrend/      # BuilderTrend 工作流程
│   ├── fieldwire/         # Fieldwire 使用指南
│   └── googleservice/     # Google 服务使用说明
├── 05-quality/            # 质量管理
├── 06-safety/             # 安全管理
├── 07-knowledge-base/     # 知识库（技术参考、FAQ）
│   ├── dev/               # 开发流程知识
│   ├── technical/         # 技术知识
│   └── geeks/             # 技术工具指南
├── 08-templates/          # 可重用表单和模板
└── 11-assets/             # 静态资源
```

**Folder Conventions**:
- Folders are numbered with two-digit prefixes (e.g., `01-policies`)
- Every folder MUST contain a `README.md` as the default landing page
- Maximum 2-level nesting enforced by Docsify and project standards

### Sidebar Rules (from `sidebar_rule.md`)
- First-level headings are category names (no links)
- Maximum 2 levels of hierarchy
- Link format: `[Display Name](path/to/file)` (`.md` extension can be omitted)
- Linking to folders automatically loads `README.md`
- Example:
  ```markdown
  - Policies
    - [Company Policies](01-policies/company-policies)
    - [Safety Guidelines](01-policies/safety-guidelines)
  ```

## Development Workflow

### Local Development
```bash
# 安装 Docsify CLI（首次）
npm install -g docsify-cli

# 启动开发服务器（默认端口 3000）
docsify serve .

# 指定端口
docsify serve . --port 8080

# 后台运行
nohup docsify serve . &
```

### Content Editing
- Markdown 文件修改后浏览器自动刷新
- `index.html` 修改需手动刷新浏览器
- 内部链接（如 `[Home](/)`）因 `basePath: '/docs/'` 会指向 `docs/README.md`

### Theme Customization
All custom styles are embedded in `index.html` `<style>` block:
- Sidebar compact styles (reduced padding/margins)
- Mermaid dark theme contrast optimization
- Theme toggle switch styles (fixed top-right position)

## Document Authoring Standards

### Language Conventions
- **UI components and user-facing text**: English
- **Source code comments**: Chinese (中文)
- **Function-level documentation**: Always add when generating code

### Markdown Best Practices
- Use Mermaid for flowcharts, sequence diagrams, etc.
- Use standard Markdown for text content
- Follow Docsify's link conventions (omit `.md` extension)
- Use `README.md` as folder index pages

### Dashboard Pattern
The `dashboard.md` file contains categorized quick links to external services with embedded credentials. Format:
```markdown
## Category Name
- [Service Name](url) `acc: email@example.com` `p/w: password`
```

## Common Tasks

### Adding New Documentation
1. Create Markdown file in appropriate numbered folder under `docs/`
2. Add entry to `docs/_sidebar.md` following hierarchy rules
3. Test locally with `docsify serve .`

### Creating New Section
1. Create numbered folder under `docs/` (e.g., `09-new-section/`)
2. Add `README.md` with section heading
3. Update `docs/_sidebar.md` with new category and links
4. Follow 2-level maximum nesting

### Using Wikilinks
1. **Basic Syntax**: `[[Page Name]]` - links to page in same directory
2. **Custom Display**: `[[Page Name|Link Text]]` - shows custom text
3. **Section Links**: `[[Page Name#section]]` - links to specific section
4. **Viewing Graph**: Click "Graph View" button (top-right) to see relationships
5. **Sample Files**: Check `/docs/07-knowledge-base/Vault/Sample Vault/` for examples

### Configuring Graph View for New Folders
1. **Edit Scanner Config** (`docs/assets/js/wikilink-graph-scanner.js`):
   ```javascript
   window.wikiGraphConfig = {
     includePaths: [
       '07-knowledge-base/Vault',
       'your-new-folder'  // Add new path
     ],
     includePatterns: [
       /^07-knowledge-base\/Vault/i,
       /^your-new-folder/i  // Add regex pattern
     ]
   };
   ```

2. **Create Index File** (`your-new-folder/_index.json`):
   ```json
   {
     "version": "1.0",
     "generatedAt": "2025-01-09T12:00:00Z",
     "files": [
       "Page 01.md",
       "Page 02.md",
       "subfolder/Page 03.md"
     ]
   }
   ```

3. **Update Index**: When adding/removing files, regenerate `_index.json`:
   ```bash
   # From Vault root folder
   find . -name "*.md" -type f | sed 's|^\./||' | sort > temp.txt
   # Then manually format into JSON
   ```

### Modifying Theme/Configuration
- Edit `index.html` for Docsify config or custom styles
- Theme switch logic is in embedded `<script>` tags
- Mermaid config changes require testing both light and dark themes
- Graph view colors defined in `/docs/assets/css/wikilink-graph.css`

### Deployment
- Vercel automatically deploys from main branch
- `vercel.json` handles SPA routing (all routes → `index.html`)
- No build step required (client-side rendering)

## Git Workflow

**Current branch**: `main`
**Deployment**: Auto-deploy from main branch to Vercel

### Recent Changes
- **Added Wikilinks & Graph View** (2025-10-09):
  - Obsidian-style [[wikilinks]] with docsify-wikilink plugin
  - Interactive D3.js force-directed graph visualization
  - Pre-scanning mode with static index files for instant graph loading
  - Complete network discovery (1-level deep from each node)
  - Obsidian-style gray color scheme
  - Cache management for performance optimization
- Replaced legacy project rules with this CLAUDE.md
- Updated dashboard with Squarespace credentials
- Updated PSEC timesheet documentation

## Special Considerations

### Credentials Management
- Dashboard contains embedded credentials for internal services
- **IMPORTANT**: Never commit credential changes to public repositories
- Consider separating credentials if repo becomes public

### Theme System
- Manual theme preference overrides system preference
- `localStorage.preferred-theme` stores user choice
- Page reload ensures complete style application after manual switch
- Mermaid diagrams re-render with theme-appropriate colors

### Browser Compatibility
- All resources loaded from CDN (jsdelivr, unpkg)
- Requires JavaScript enabled
- Modern browser required for CSS custom properties and ES6+ features
