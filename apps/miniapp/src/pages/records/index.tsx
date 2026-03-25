import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text } from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';
import classnames from 'classnames';
import styles from './index.module.scss';
import SectionHeader from '@/components/SectionHeader';
import EmptyState from '@/components/EmptyState';
import type { Stock, StockRecord } from '@/types/stock';
import { listStocks } from '@/services/stockService';
import { getRecord } from '@/services/recordService';
import { formatDateTime } from '@/utils/format';

const RECORD_EDIT_URL = '/pages/recordEdit/index';
const STOCKS_TAB_URL = '/pages/stocks/index';

interface StockWithRecord {
  stock: Stock;
  record?: StockRecord;
}

const RecordsPage: React.FC = () => {
  const [items, setItems] = useState<StockWithRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const stocks = await listStocks();
      const records = await Promise.all(stocks.map((s) => getRecord(s.id)));
      const next: StockWithRecord[] = stocks.map((s, idx) => ({ stock: s, record: records[idx] }));
      next.sort((a, b) => (b.record?.updatedAt || '').localeCompare(a.record?.updatedAt || ''));
      setItems(next);
    } catch (error) {
      console.error('[Records] load failed', error);
      Taro.showToast({ title: '加载失败', icon: 'error' });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useDidShow(() => {
    load();
  });

  const hint = useMemo(() => {
    if (loading) return '加载中…';
    const done = items.filter((i) => Boolean(i.record && (i.record.buyLogic || i.record.holdLogic || i.record.sellLogic))).length;
    return `${done}/${items.length}`;
  }, [items, loading]);

  const openRecord = (stockId: string) => {
    Taro.navigateTo({ url: `${RECORD_EDIT_URL}?id=${encodeURIComponent(stockId)}` });
  };

  const goAddStocks = () => {
    Taro.switchTab({ url: STOCKS_TAB_URL });
  };

  return (
    <View className={styles.container}>
      <SectionHeader title='逻辑记录' hint={hint} />

      <View className={styles.list}>
        {!loading && items.length === 0 ? <EmptyState title='还没有股票' desc='先去“股票”页新增股票，再回来记录逻辑。' /> : null}
        {!loading && items.length === 0 ? (
          <View onClick={goAddStocks}>
            <Text>去新增股票</Text>
          </View>
        ) : null}

        {items.map(({ stock, record }) => {
          const hasAny = Boolean(record && (record.buyLogic || record.holdLogic || record.sellLogic));
          return (
            <View key={stock.id} className={styles.item} onClick={() => openRecord(stock.id)}>
              <View className={styles.topRow}>
                <View>
                  <Text className={styles.name}>{stock.name}</Text>
                  <Text className={styles.code}>{stock.code}</Text>
                </View>
                <View
                  className={classnames(styles.status, hasAny ? styles.statusDone : styles.statusEmpty)}
                >
                  <Text>{hasAny ? '已记录' : '未记录'}</Text>
                </View>
              </View>
              <Text className={styles.meta}>{record?.updatedAt ? `更新 ${formatDateTime(record.updatedAt)}` : '点击开始记录买入/持有/卖出逻辑'}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default RecordsPage;

