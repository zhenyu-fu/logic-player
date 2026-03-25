import React from 'react';
import { Text } from '@tarojs/components';
import classnames from 'classnames';
import styles from './index.module.scss';

export interface TagProps {
  text: string;
  muted?: boolean;
}

export default function Tag(props: TagProps) {
  const { text, muted } = props;
  return <Text className={classnames(styles.tag, muted && styles.tagMuted)}>{text}</Text>;
}

