import React, { useEffect, useMemo, useState } from 'react';
import { View, Text } from '@tarojs/components';
import Taro from '@tarojs/taro';
import classnames from 'classnames';
import styles from './index.module.scss';
import SectionHeader from '@/components/SectionHeader';
import EmptyState from '@/components/EmptyState';
import { fetchRunLogs } from '@/services/logicPlayerApi';
import type { LogLevel, RunLog } from '@/types/run';
import { formatDateTime } from '@/utils/format';

type FilterKey = 'all' | LogLevel;

const LogsPage: React.FC = () => {
  const [filter, setFilter] = useState<FilterKey>('all');
  const [logs, setLogs] = useState<RunLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let cancelled = false;
    fetchRunLogs()
      .then((data) => {
        if (cancelled) return;
        setLogs(data);
      })
      .catch((error) => {
        console.error('[Logs] load failed', error);
        Taro.showToast({ title: '加载失败', icon: 'error' });
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    if (filter === 'all') return logs;
    return logs.filter((l) => l.level === filter);
  }, [filter, logs]);

  const filterItems: Array<{ key: FilterKey; text: string }> = [
    { key: 'all', text: '全部' },
    { key: 'info', text: '信息' },
    { key: 'warn', text: '警告' },
    { key: 'error', text: '错误' },
  ];

  const getLevelClass = (level: LogLevel) => {
    if (level === 'warn') return styles.levelWarn;
    if (level === 'error') return styles.levelError;
    return styles.levelInfo;
  };

  const getLevelText = (level: LogLevel) => {
    if (level === 'warn') return 'WARN';
    if (level === 'error') return 'ERROR';
    return 'INFO';
  };

  return (
    <View className={styles.container}>
      <View className={styles.filters}>
        {filterItems.map((f) => (
          <View
            key={f.key}
            className={classnames(styles.filterItem, filter === f.key && styles.filterActive)}
            onClick={() => setFilter(f.key)}
          >
            <Text>{f.text}</Text>
          </View>
        ))}
      </View>

      <SectionHeader title='运行日志' hint={loading ? '加载中…' : `${filtered.length} 条`} />

      <View className={styles.list}>
        {!loading && filtered.length === 0 ? <EmptyState title='暂无日志' desc='运行后这里会展示关键流程与错误信息。' /> : null}

        {filtered.map((l) => (
          <View key={l.id} className={styles.logItem}>
            <View className={styles.logTop}>
              <View className={classnames(styles.level, getLevelClass(l.level))}>
                <Text>{getLevelText(l.level)}</Text>
              </View>
              <Text className={styles.title}>{l.title}</Text>
            </View>
            <Text className={styles.detail}>{l.detail}</Text>
            <Text className={styles.time}>{formatDateTime(l.time)}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default LogsPage;
