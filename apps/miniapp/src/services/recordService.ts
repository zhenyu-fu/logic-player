import { getJson, setJson } from './storage';
import type { StockRecord } from '@/types/stock';

const RECORDS_KEY = 'logic_player_records_v1';

type RecordMap = Record<string, StockRecord>;

function nowIso(): string {
  return new Date().toISOString();
}

export async function getRecord(stockId: string): Promise<StockRecord | undefined> {
  const map = getJson<RecordMap>(RECORDS_KEY, {});
  return map[stockId];
}

export async function upsertRecord(stockId: string, patch: Partial<Omit<StockRecord, 'stockId' | 'updatedAt'>>): Promise<StockRecord> {
  const map = getJson<RecordMap>(RECORDS_KEY, {});
  const existing = map[stockId];
  const next: StockRecord = {
    stockId,
    buyLogic: patch.buyLogic ?? existing?.buyLogic ?? '',
    holdLogic: patch.holdLogic ?? existing?.holdLogic ?? '',
    sellLogic: patch.sellLogic ?? existing?.sellLogic ?? '',
    updatedAt: nowIso(),
  };
  map[stockId] = next;
  setJson(RECORDS_KEY, map);
  return next;
}

export async function deleteRecord(stockId: string): Promise<void> {
  const map = getJson<RecordMap>(RECORDS_KEY, {});
  delete map[stockId];
  setJson(RECORDS_KEY, map);
}

