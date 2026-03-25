import React from 'react';
import { View, Text } from '@tarojs/components';
import styles from './index.module.scss';

export interface SectionHeaderProps {
  title: string;
  hint?: string;
}

export default function SectionHeader(props: SectionHeaderProps) {
  const { title, hint } = props;
  return (
    <View className={styles.wrap}>
      <Text className={styles.title}>{title}</Text>
      {hint ? <Text className={styles.hint}>{hint}</Text> : null}
    </View>
  );
}

