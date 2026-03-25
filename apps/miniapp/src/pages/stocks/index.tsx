import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View, Text } from '@tarojs/components';
import Taro, { useDidShow } from '@tarojs/taro';
import styles from './index.module.scss';
import PrimaryButton from '@/components/PrimaryButton';
import EmptyState from '@/components/EmptyState';
import SectionHeader from '@/components/SectionHeader';
import type { Stock } from '@/types/stock';
import { deleteStock, listStocks } from '@/services/stockService';
import { formatDateTime } from '@/utils/format';

const STOCK_EDIT_URL = '/pages/stockEdit/index';
const RECORD_EDIT_URL = '/pages/recordEdit/index';

const StocksPage: React.FC = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const load = useCallback(() => {
    setLoading(true);
    listStocks()
      .then((data) => setStocks(data))
      .catch((error) => {
        console.error('[Stocks] load failed', error);
        Taro.showToast({ title: '加载失败', icon: 'error' });
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useDidShow(() => {
    load();
  });

  const statsText = useMemo(() => {
    if (loading) return '加载中…';
    return `${stocks.length} 只`;
  }, [loading, stocks.length]);

  const addStock = () => {
    Taro.navigateTo({ url: STOCK_EDIT_URL });
  };

  const openRecord = (stock: Stock) => {
    Taro.navigateTo({
      url: `${RECORD_EDIT_URL}?id=${encodeURIComponent(stock.id)}`,
    });
  };

  const onLongPress = async (stock: Stock) => {
    const res = await Taro.showModal({
      title: '删除股票',
      content: `确定删除 ${stock.name}（${stock.code}）？仅删除股票条目，不会影响其他数据。`,
      confirmText: '删除',
      confirmColor: '#F53F3F',
    });
    if (!res.confirm) return;

    await deleteStock(stock.id);
    console.info('[Stocks] deleted', { id: stock.id });
    load();
  };

  return (
    <View className={styles.container}>
      <View className={styles.hero}>
        <Text className={styles.heroTitle}>股票清单</Text>
        <Text className={styles.heroSub}>自定义股票列表，针对每只股票记录买入 / 持有 / 卖出逻辑。</Text>

        <View className={styles.actions}>
          <PrimaryButton text='新增股票' onClick={addStock} />
        </View>
      </View>

      <SectionHeader title='我的股票' hint={statsText} />

      <View className={styles.list}>
        {!loading && stocks.length === 0 ? <EmptyState title='还没有股票' desc='先新增一只股票，然后开始记录三段逻辑。' /> : null}

        {stocks.map((s) => (
          <View
            key={s.id}
            className={styles.stockCard}
            onClick={() => openRecord(s)}
            onLongPress={() => onLongPress(s)}
          >
            <View className={styles.topRow}>
              <View>
                <Text className={styles.name}>{s.name}</Text>
                <Text className={styles.code}>{s.code}</Text>
              </View>
            </View>
            <Text className={styles.hint}>点击进入逻辑记录；长按删除</Text>
            <Text className={styles.meta}>更新 {formatDateTime(s.updatedAt)}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default StocksPage;

