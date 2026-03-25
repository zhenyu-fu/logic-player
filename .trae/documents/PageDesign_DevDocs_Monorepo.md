# 页面设计文档（桌面优先）

## 重要说明
本页面设计文档用于最初的“文档站点/桌面 Web”设想；当前仓库前端已调整为 Taro 微信小程序，本文件仅作历史参考。

## 全局设计规范
- Layout：桌面优先（≥1200px），内容区最大宽度 1100–1200px，左右留白自适应；主要使用 Flexbox + 局部 CSS Grid。
- Typography：
  - H1 28px/36, H2 22px/30, H3 18px/26
  - 正文 14–16px，代码块等宽字体 13–14px
- Color tokens：
  - Background: #0B1220（深色）或 #FFFFFF（浅色，二选一项目主题）
  - Text: 主文本 #111827 / 反色 #E5E7EB
  - Accent: #6366F1（链接与主按钮）
  - Border: #E5E7EB（浅色）或 #243047（深色）
- Button：主按钮实心、hover 加深 8%；次按钮描边。
- Link：默认下划线隐藏，hover 显示下划线；外链图标（可选）。
- Code block：带复制按钮；支持水平滚动。

## 1）文档首页
### Meta Information
- title：Monorepo 项目文档
- description：React+TS 与 Node.js+TS 的 monorepo 目录与脚本约定
- Open Graph：title/description 与站点 URL（占位即可）

### Page Structure
- 顶部导航（横向） + 主内容（两列：左侧目录卡片、右侧快速开始） + 页脚。

### Sections & Components
1. 顶部导航栏
   - 左侧：项目名称/Logo（点击回到首页）
   - 右侧：导航链接（首页 / 前端指南 / 后端指南）
2. 项目概览（Hero）
   - 一句话定位 + 三个关键点（monorepo、统一 TS、统一脚本）
3. 快速开始（重点区块）
   - 步骤列表（安装依赖 → dev → build → start）
   - 每步配套代码块（可复制）
4. 目录结构预览
   - 使用树状结构展示 /packages/web、/packages/api、/packages/shared
   - 每个条目配一句职责说明
5. 页脚
   - 版权/维护者信息（占位）

### Responsive（建议）
- ≤992px：两列改为单列，快速开始置顶；导航收纳为汉堡菜单。

## 2）前端指南
### Meta Information
- title：前端指南
- description：前端开发/构建/运行与联调约定

### Page Structure
- 左侧固定侧边栏（本页目录锚点） + 右侧文档正文。

### Sections & Components
1. 侧边栏
   - 章节锚点：开发、构建、运行、环境变量、与后端联调
2. 正文：开发
   - 启动命令说明（dev）
   - 热更新与本地端口说明（用占位值，不强制具体端口）
3. 正文：构建/运行
   - build 与 preview/start 的差异说明
   - dist 产物位置
4. 正文：环境变量
   - VITE_API_BASE_URL 的用途与示例
5. 正文：联调约定
   - 请求封装建议（统一 ApiResponse<T>）
   - 错误展示最小规则（toast/inline 二选一）

## 3）后端指南
### Meta Information
- title：后端指南
- description：后端开发/构建/运行与 API 约定

### Page Structure
- 左侧固定侧边栏 + 右侧文档正文；正文以“约定优先”的清单呈现。

### Sections & Components
1. 正文：开发
   - dev（watch）启动说明
   - 日志输出字段最小集合（时间、级别、requestId 可选）
2. 正文：构建/运行
   - build（tsc）输出到 dist
   - start（node dist 入口文件）
3. 正文：API 约定
   - 路由前缀 /api
   - 健康检查 /api/health 示例
   - 统一响应结构 ApiResponse<T>
4. 正文：共享代码
   - shared 包的导入方式（只共享纯 TS、避免引入 Node-only 或 Browser-only 依赖）
