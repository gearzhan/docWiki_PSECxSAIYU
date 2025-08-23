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
- 左下角 Light/Dark 主题开关（toggle switch）：
  - 开关两侧显示文字 `light / dark`；
  - 手动切换后写入 `localStorage` 并强制刷新一次页面；
  - 切换时立即切换 themeable 的样式表 media；
  - Mermaid 图根据当前主题实时重渲染；
  - 如存在手动覆盖，系统主题变化将被忽略。
- 暗色主题下的 Mermaid 对比度优化（线条、标签等视觉可读性增强）。

## 目录结构（节选）
```
/ (项目根)
├── index.html           # Docsify 入口与配置、主题/脚本注入
├── sidebar_rule.md      # 侧边栏编写规范
├── readme.md            # 本说明文档（你正在阅读）
└── docs/                # 文档根目录
    ├── README.md
    ├── _sidebar.md
    ├── guide/README.md
    ├── api/README.md
    ├── faq/README.md
    ├── about/about.md
    └── tutorials/getting-started.md
```

## 文档编写提示
- 侧边栏编写规范请参阅根目录 `sidebar_rule.md`；
- 因 `basePath` 为 `/docs/`，文内链接如 `[Home](/)` 会指向 `docs/README.md`；
- Mermaid 示例与语法参考可见 `docs/README.md` 与 `docs/guide/README.md`。