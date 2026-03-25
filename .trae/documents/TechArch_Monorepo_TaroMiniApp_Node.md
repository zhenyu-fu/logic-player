# 技术架构：logic-player Monorepo（Taro 微信小程序 + Node 后端）

## 目录结构
```
logic-player/
  apps/
    miniapp/                 # Taro 4.x 小程序（React + TS）
  packages/
    server/                  # Node + TS 后端（HTTP 原生）
  scripts/                   # 本仓库辅助脚本
  .trae/documents/           # 文档
```

## 前端（Taro 小程序）
- 运行平台：微信小程序（可扩展 H5/抖音/支付宝）
- UI：Taro 组件 + 手写组件（CSS Modules + SCSS 变量）
- 数据：当前使用本地持久化（`Taro.getStorageSync/setStorageSync`），服务封装在 `src/services/*`，后续可替换为真实后端请求

### 页面与路由
入口配置在 `apps/miniapp/src/app.config.ts`：
- tabBar：`股票 / 记录 / 我的`
- 二级页：`编辑股票 / 逻辑记录 / 设置`

## 后端（Node + TS）
- 运行方式：编译为 `dist/` 后使用 `node dist/index.js` 启动
- 路由：`packages/server/src/router.ts`
- 现阶段无第三方 Web 框架，便于最小依赖运行

## Monorepo
- 根目录提供 `workspaces` 与 `pnpm-workspace.yaml`，便于后续统一安装与脚本管理
- 由于小程序模板的编译/预览由内置脚本提供，仓库额外提供脚本封装：
  - `scripts/trae-init-miniapp-template.cjs`
  - `scripts/trae-preview-miniapp.cjs`
