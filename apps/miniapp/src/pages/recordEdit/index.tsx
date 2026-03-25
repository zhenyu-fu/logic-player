import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, Textarea } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import PrimaryButton from '@/components/PrimaryButton';
import EmptyState from '@/components/EmptyState';
import { getStock } from '@/services/stockService';
import { getRecord, upsertRecord } from '@/services/recordService';
import type { Stock, StockRecord } from '@/types/stock';
import { formatDateTime } from '@/utils/format';

const RecordEditPage: React.FC = () => {
  const params = Taro.getCurrentInstance().router?.params;
  const stockId = params?.id;

  const [stock, setStock] = useState<Stock | undefined>(undefined);
  const [record, setRecord] = useState<StockRecord | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);

  const [buyLogic, setBuyLogic] = useState<string>('');
  const [holdLogic, setHoldLogic] = useState<string>('');
  const [sellLogic, setSellLogic] = useState<string>('');

  useEffect(() => {
    if (!stockId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    Promise.all([getStock(stockId), getRecord(stockId)])
      .then(([s, r]) => {
        setStock(s);
        setRecord(r);
        setBuyLogic(r?.buyLogic || '');
        setHoldLogic(r?.holdLogic || '');
        setSellLogic(r?.sellLogic || '');
      })
      .catch((error) => {
        console.error('[RecordEdit] load failed', error);
        Taro.showToast({ title: '加载失败', icon: 'error' });
      })
      .finally(() => setLoading(false));
  }, [stockId]);

  const canSave = useMemo(() => {
    if (!stockId) return false;
    if (loading || saving) return false;
    return true;
  }, [loading, saving, stockId]);

  const save = async () => {
    if (!stockId) return;
    setSaving(true);
    try {
      const next = await upsertRecord(stockId, { buyLogic, holdLogic, sellLogic });
      setRecord(next);
      console.info('[RecordEdit] saved', { stockId });
      Taro.showToast({ title: '已保存', icon: 'success' });
    } catch (error) {
      console.error('[RecordEdit] save failed', error);
      Taro.showToast({ title: '保存失败', icon: 'error' });
    } finally {
      setSaving(false);
    }
  };

  if (!stockId) {
    return (
      <View className={styles.container}>
        <EmptyState title='缺少参数' desc='请从股票列表进入该页面。' />
      </View>
    );
  }

  return (
    <View className={styles.container}>
      <View className={styles.headerCard}>
        <Text className={styles.stockName}>{stock?.name || '股票'}</Text>
        <Text className={styles.stockCode}>{stock?.code || stockId}</Text>
        <Text className={styles.desc}>
          这里记录你的交易逻辑：买入条件、持有原则、卖出触发。尽量写清楚可执行的规则与例外。
        </Text>
        {record?.updatedAt ? <Text className={styles.desc}>上次更新：{formatDateTime(record.updatedAt)}</Text> : null}
      </View>

      <View className={styles.section}>
        <View className={styles.labelRow}>
          <Text className={styles.label}>买入逻辑</Text>
          <Text className={styles.hint}>条件 / 触发 / 分批</Text>
        </View>
        <Textarea
          className={styles.textarea}
          value={buyLogic}
          placeholder='例如：突破关键价位 + 量能确认；分两笔建仓；止损位…'
          onInput={(e) => setBuyLogic(e.detail.value)}
          maxlength={2000}
          autoHeight
        />
      </View>

      <View className={styles.section}>
        <View className={styles.labelRow}>
          <Text className={styles.label}>持有逻辑</Text>
          <Text className={styles.hint}>跟踪 / 加仓 / 风控</Text>
        </View>
        <Textarea
          className={styles.textarea}
          value={holdLogic}
          placeholder='例如：趋势未破继续持有；回撤超阈值减仓；移动止损上移…'
          onInput={(e) => setHoldLogic(e.detail.value)}
          maxlength={2000}
          autoHeight
        />
      </View>

      <View className={styles.section}>
        <View className={styles.labelRow}>
          <Text className={styles.label}>卖出逻辑</Text>
          <Text className={styles.hint}>止盈 / 止损 / 退出</Text>
        </View>
        <Textarea
          className={styles.textarea}
          value={sellLogic}
          placeholder='例如：达到目标区间分批止盈；跌破关键位止损；基本面变化退出…'
          onInput={(e) => setSellLogic(e.detail.value)}
          maxlength={2000}
          autoHeight
        />
      </View>

      <View className={styles.actions}>
        <PrimaryButton text={saving ? '保存中…' : '保存记录'} disabled={!canSave} onClick={save} />
      </View>
    </View>
  );
};

export default RecordEditPage;

