import type { RunLog } from '@/types/run';

export const mockRunLogs: RunLog[] = [
  {
    id: 'l1',
    level: 'info',
    title: '初始化完成',
    detail: '策略参数加载完成，准备开始运行。',
    time: '2026-03-24T10:21:00.000Z',
  },
  {
    id: 'l2',
    level: 'warn',
    title: '波动放大',
    detail: '价格波动超过阈值，建议降低单次加仓比例。',
    time: '2026-03-24T10:26:00.000Z',
  },
  {
    id: 'l3',
    level: 'info',
    title: '信号确认',
    detail: '趋势与成交量信号一致，允许开仓。',
    time: '2026-03-24T10:29:00.000Z',
  },
  {
    id: 'l4',
    level: 'error',
    title: '网络请求失败',
    detail: '获取远端行情失败，已切换为本地模拟数据。',
    time: '2026-03-24T10:33:00.000Z',
  },
  {
    id: 'l5',
    level: 'info',
    title: '风控生效',
    detail: '止损线更新成功，后续将按新阈值执行。',
    time: '2026-03-24T10:40:00.000Z',
  },
  {
    id: 'l6',
    level: 'warn',
    title: '滑点扩大',
    detail: '盘口深度不足，成交滑点可能扩大。',
    time: '2026-03-24T10:45:00.000Z',
  },
  {
    id: 'l7',
    level: 'info',
    title: '运行结束',
    detail: '本次模拟运行已结束，可查看运行详情。',
    time: '2026-03-24T10:48:00.000Z',
  },
];

