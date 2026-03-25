import Taro from '@tarojs/taro';
import { getJson, setJson } from './storage';
import type { Stock } from '@/types/stock';
import { seedStocks } from '@/data/seedStocks';

const STOCKS_KEY = 'logic_player_stocks_v1';

function nowIso(): string {
  return new Date().toISOString();
}

function normalizeCode(code: string): string {
  return code.trim().replace(/\s+/g, '').toUpperCase();
}

export function ensureSeedStocks(): void {
  const exists = Taro.getStorageSync(STOCKS_KEY);
  if (exists) return;
  setJson(STOCKS_KEY, seedStocks);
}

export async function listStocks(): Promise<Stock[]> {
  ensureSeedStocks();
  const stocks = getJson<Stock[]>(STOCKS_KEY, []);
  return stocks.slice().sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function getStock(id: string): Promise<Stock | undefined> {
  const stocks = await listStocks();
  return stocks.find((s) => s.id === id);
}

export async function upsertStock(input: { id?: string; code: string; name: string }): Promise<Stock> {
  ensureSeedStocks();
  const stocks = getJson<Stock[]>(STOCKS_KEY, []);

  const code = normalizeCode(input.code);
  const name = input.name.trim();
  const time = nowIso();

  const id = input.id || `stk_${code || Math.random().toString(36).slice(2, 10)}`;
  const existingIndex = stocks.findIndex((s) => s.id === id);

  if (existingIndex >= 0) {
    const next: Stock = { ...stocks[existingIndex], code, name, updatedAt: time };
    stocks.splice(existingIndex, 1, next);
    setJson(STOCKS_KEY, stocks);
    return next;
  }

  const createdAt = time;
  const next: Stock = { id, code, name, createdAt, updatedAt: time };
  setJson(STOCKS_KEY, [next, ...stocks]);
  return next;
}

export async function deleteStock(id: string): Promise<void> {
  ensureSeedStocks();
  const stocks = getJson<Stock[]>(STOCKS_KEY, []);
  setJson(
    STOCKS_KEY,
    stocks.filter((s) => s.id !== id),
  );
}

