import React, { useMemo } from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import SectionHeader from '@/components/SectionHeader';

const SETTINGS_PAGE_URL = '/pages/settings/index';

const MinePage: React.FC = () => {
  const envName = useMemo(() => process.env.TARO_ENV || 'unknown', []);

  const openSettings = () => {
    console.info('[Mine] openSettings');
    Taro.navigateTo({ url: SETTINGS_PAGE_URL });
  };

  const showAbout = () => {
    Taro.showModal({
      title: '关于',
      content: `买入逻辑 / 持有逻辑 / 卖出逻辑\n用于记录每只股票的操作逻辑\n环境：${envName}`,
      showCancel: false,
    });
  };

  return (
    <View className={styles.container}>
      <View className={styles.profile}>
        <Text className={styles.name}>我的</Text>
        <Text className={styles.desc}>管理你的股票清单与三段逻辑记录，方便复盘与迭代。</Text>
      </View>

      <SectionHeader title='常用入口' />

      <View className={styles.cards}>
        <View className={styles.card} onClick={openSettings}>
          <Text className={styles.cardTitle}>设置</Text>
          <Text className={styles.cardHint}>基础配置</Text>
        </View>
        <View className={styles.card} onClick={showAbout}>
          <Text className={styles.cardTitle}>关于</Text>
          <Text className={styles.cardHint}>版本与环境</Text>
        </View>
      </View>
    </View>
  );
};

export default MinePage;
