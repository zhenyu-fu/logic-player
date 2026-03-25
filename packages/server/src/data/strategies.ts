export interface Strategy {
  id: string;
  name: string;
  tags: string[];
  description: string;
  updatedAt: string;
  riskLevel: 'low' | 'medium' | 'high';
  enabled: boolean;
}

export const strategies: Strategy[] = [
  {
    id: 's1',
    name: '均线交叉策略',
    tags: ['趋势', 'MA'],
    description: '短期均线上穿长期均线买入；反向交叉卖出。适合趋势行情。',
    updatedAt: '2026-03-24T10:12:00.000Z',
    riskLevel: 'medium',
    enabled: true,
  },
  {
    id: 's2',
    name: '布林带回归策略',
    tags: ['均值回归', 'BOLL'],
    description: '价格触及下轨分批买入，回归中轨止盈；突破上轨减仓。',
    updatedAt: '2026-03-23T07:48:00.000Z',
    riskLevel: 'high',
    enabled: false,
  },
  {
    id: 's3',
    name: 'RSI 超卖反弹',
    tags: ['动量', 'RSI'],
    description: 'RSI 低位钝化后出现反弹信号买入，回到中位区间卖出。',
    updatedAt: '2026-03-22T15:20:00.000Z',
    riskLevel: 'medium',
    enabled: true,
  },
];

