import type { RunStep } from '@/types/run';

export function createMockRunSteps(strategyId: string): RunStep[] {
  const base = strategyId.charCodeAt(0) + strategyId.length;
  const now = Date.now();
  const times = [0, 4, 9, 13, 18, 26, 33].map((m) => new Date(now - m * 60 * 1000).toISOString());

  const prices = [
    12.31,
    12.18,
    12.42,
    12.58,
    12.47,
    12.66,
    12.54,
  ].map((p, idx) => Math.round((p + (base % 7) * 0.03 + idx * 0.01) * 100) / 100);

  return [
    { id: 'r1', action: 'hold', price: prices[0], reason: '等待信号确认，防止假突破', time: times[6] },
    { id: 'r2', action: 'buy', price: prices[1], reason: '回踩支撑 + 指标转强', time: times[5] },
    { id: 'r3', action: 'hold', price: prices[2], reason: '上行趋势延续，继续持有', time: times[4] },
    { id: 'r4', action: 'hold', price: prices[3], reason: '波动可接受，移动止损上移', time: times[3] },
    { id: 'r5', action: 'sell', price: prices[4], reason: '触发风险线，执行减仓保护', time: times[2] },
    { id: 'r6', action: 'buy', price: prices[5], reason: '二次确认有效，补回仓位', time: times[1] },
    { id: 'r7', action: 'sell', price: prices[6], reason: '达到目标区间，落袋为安', time: times[0] },
  ];
}

