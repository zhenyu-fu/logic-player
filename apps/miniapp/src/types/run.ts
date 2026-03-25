export type TradeAction = 'buy' | 'hold' | 'sell';

export interface RunStep {
  id: string;
  action: TradeAction;
  price: number;
  reason: string;
  time: string;
}

export type LogLevel = 'info' | 'warn' | 'error';

export interface RunLog {
  id: string;
  level: LogLevel;
  title: string;
  detail: string;
  time: string;
}

