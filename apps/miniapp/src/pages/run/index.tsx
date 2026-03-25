import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, Picker } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import styles from './index.module.scss';
import SectionHeader from '@/components/SectionHeader';
import PrimaryButton from '@/components/PrimaryButton';
import EmptyState from '@/components/EmptyState';
import { fetchRunSteps, fetchStrategies } from '@/services/logicPlayerApi';
import type { Strategy } from '@/types/strategy';
import type { RunStep } from '@/types/run';
import { formatDateTime, formatMoney } from '@/utils/format';

const RUN_DETAIL_PAGE_URL = '/pages/runDetail/index';

const RunPage: React.FC = () => {
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [running, setRunning] = useState<boolean>(false);
  const [steps, setSteps] = useState<RunStep[]>([]);

  useEffect(() => {
    fetchStrategies()
      .then((data) => setStrategies(data))
      .catch((error) => {
        console.error('[Run] load strategies failed', error);
        Taro.showToast({ title: '加载失败', icon: 'error' });
      });
  }, []);

  const selectedStrategy = strategies[selectedIndex];

  const pickerRange = useMemo(() => strategies.map((s) => s.name), [strategies]);

  const runOnce = async () => {
    if (!selectedStrategy) {
      Taro.showToast({ title: '请选择策略', icon: 'none' });
      return;
    }
    setRunning(true);
    try {
      const data = await fetchRunSteps(selectedStrategy.id);
      setSteps(data);
      console.info('[Run] runOnce done', { strategyId: selectedStrategy.id, count: data.length });
      Taro.showToast({ title: '运行完成', icon: 'success' });
    } catch (error) {
      console.error('[Run] runOnce failed', error);
      Taro.showToast({ title: '运行失败', icon: 'error' });
    } finally {
      setRunning(false);
    }
  };

  const openRunDetail = () => {
    Taro.navigateTo({
      url: RUN_DETAIL_PAGE_URL,
    });
  };

  return (
    <View className={styles.container}>
      <View className={styles.panel}>
        <Text className={styles.label}>选择策略</Text>

        <Picker
          mode='selector'
          range={pickerRange}
          value={selectedIndex}
          onChange={(e) => setSelectedIndex(Number(e.detail.value))}
        >
          <View className={styles.picker}>
            <Text className={styles.pickerText}>{selectedStrategy ? selectedStrategy.name : '请选择'}</Text>
            <Text className={styles.pickerHint}>切换</Text>
          </View>
        </Picker>

        <View className={styles.divider} />

        <PrimaryButton text={running ? '运行中…' : '执行一轮模拟'} disabled={running || !selectedStrategy} onClick={runOnce} />
      </View>

      <SectionHeader title='运行步骤' hint={steps.length ? `${steps.length} 条` : '暂无'} />

      <View className={styles.steps}>
        {steps.length === 0 ? <EmptyState title='还没有运行记录' desc='先执行一轮模拟，再查看买入/持有/卖出步骤。' /> : null}

        {steps.map((s) => {
          const actionText = s.action === 'buy' ? '买入' : s.action === 'sell' ? '卖出' : '持有';
          return (
            <View key={s.id} className={styles.stepItem} onClick={openRunDetail}>
              <View className={styles.stepTop}>
                <Text
                  className={classnames(
                    styles.action,
                    s.action === 'buy' && styles.actionBuy,
                    s.action === 'sell' && styles.actionSell,
                  )}
                >
                  {actionText}
                </Text>
                <Text className={styles.price}>¥{formatMoney(s.price)}</Text>
              </View>
              <Text className={styles.reason}>{s.reason}</Text>
              <Text className={styles.time}>{formatDateTime(s.time)}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default RunPage;
