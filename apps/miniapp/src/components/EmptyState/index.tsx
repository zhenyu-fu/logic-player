import React from 'react';
import { View, Text } from '@tarojs/components';
import styles from './index.module.scss';

export interface EmptyStateProps {
  title: string;
  desc?: string;
}

export default function EmptyState(props: EmptyStateProps) {
  const { title, desc } = props;
  return (
    <View className={styles.wrap}>
      <Text className={styles.title}>{title}</Text>
      {desc ? <Text className={styles.desc}>{desc}</Text> : null}
    </View>
  );
}

