export interface Stock {
  id: string;
  code: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export const stocks: Stock[] = [
  {
    id: 'stk_600519',
    code: '600519',
    name: '贵州茅台',
    createdAt: '2026-03-20T08:00:00.000Z',
    updatedAt: '2026-03-20T08:00:00.000Z',
  },
  {
    id: 'stk_000001',
    code: '000001',
    name: '平安银行',
    createdAt: '2026-03-21T08:00:00.000Z',
    updatedAt: '2026-03-21T08:00:00.000Z',
  },
  {
    id: 'stk_300750',
    code: '300750',
    name: '宁德时代',
    createdAt: '2026-03-22T08:00:00.000Z',
    updatedAt: '2026-03-22T08:00:00.000Z',
  },
];

