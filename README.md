# logic-player

monorepo：
- `apps/miniapp`：Taro 微信小程序（React + TypeScript）
- `packages/server`：Node.js + TypeScript 后端（无框架，HTTP 原生实现）

产品定位：
- 用户维护自定义股票列表
- 针对每只股票记录三段逻辑：买入逻辑、持有逻辑、卖出逻辑（用于复盘与迭代）

常用命令：
- 初始化小程序模板：`node scripts/trae-init-miniapp-template.cjs apps/miniapp`
- 启动小程序预览：`node scripts/trae-preview-miniapp.cjs apps/miniapp`

后端：
- `packages/server` 下包含 `build/start/dev` 脚本（需要先安装依赖后使用）
