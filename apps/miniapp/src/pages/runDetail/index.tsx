import React from 'react';
import { View, Text } from '@tarojs/components';
import styles from './index.module.scss';

const RunDetailPage: React.FC = () => {
  return (
    <View className={styles.container}>
      <View className={styles.card}>
        <Text className={styles.title}>运行详情</Text>
        <Text className={styles.desc}>功能正在开发中...</Text>
      </View>
    </View>
  );
};

export default RunDetailPage;

