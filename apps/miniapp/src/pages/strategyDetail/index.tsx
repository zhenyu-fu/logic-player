import React from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';

const StrategyDetailPage: React.FC = () => {
  const params = Taro.getCurrentInstance().router?.params;
  const id = params?.id;

  return (
    <View className={styles.container}>
      <View className={styles.card}>
        <Text className={styles.title}>策略详情</Text>
        <Text className={styles.desc}>ID：{id || '-'}，功能正在开发中...</Text>
      </View>
    </View>
  );
};

export default StrategyDetailPage;

