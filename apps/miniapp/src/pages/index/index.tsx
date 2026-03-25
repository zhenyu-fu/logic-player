import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import Tag from '@/components/Tag';
import SectionHeader from '@/components/SectionHeader';
import EmptyState from '@/components/EmptyState';
import { fetchStrategies } from '@/services/logicPlayerApi';
import type { Strategy } from '@/types/strategy';
import { formatDateTime } from '@/utils/format';

const STRATEGY_DETAIL_PAGE_URL = '/pages/strategyDetail/index';

const StrategiesPage: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let cancelled = false;
    fetchStrategies()
      .then((data) => {
        if (cancelled) return;
        setStrategies(data);
      })
      .catch((error) => {
        console.error('[Strategies] load failed', error);
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
    const q = query.trim().toLowerCase();
    if (!q) return strategies;
    return strategies.filter((s) => {
      const inName = s.name.toLowerCase().includes(q);
      const inTags = s.tags.some((t) => t.toLowerCase().includes(q));
      return inName || inTags;
    });
  }, [query, strategies]);

  const stats = useMemo(() => {
    const total = strategies.length;
    const enabled = strategies.filter((s) => s.enabled).length;
    return { total, enabled };
  }, [strategies]);

  const openStrategy = (strategy: Strategy) => {
    console.info('[Strategies] openStrategy', { id: strategy.id });
    Taro.navigateTo({
      url: `${STRATEGY_DETAIL_PAGE_URL}?id=${encodeURIComponent(strategy.id)}`,
    });
  };

  return (
    <View className={styles.container}>
      <View className={styles.hero}>
        <Text className={styles.heroTitle}>逻辑播放器</Text>
        <Text className={styles.heroSub}>把买入 / 持有 / 卖出逻辑整理成可复用的策略。</Text>

        <View className={styles.statsRow}>
          <View className={styles.statCard}>
            <Text className={styles.statValue}>{stats.total}</Text>
            <Text className={styles.statLabel}>策略总数</Text>
          </View>
          <View className={styles.statCard}>
            <Text className={styles.statValue}>{stats.enabled}</Text>
            <Text className={styles.statLabel}>已启用</Text>
          </View>
        </View>

        <View className={styles.searchBox}>
          <Text className={styles.searchLabel}>搜索策略（名称 / 标签）</Text>
          <Input
            className={styles.searchInput}
            value={query}
            placeholder='例如：趋势 / MA / 风控'
            onInput={(e) => setQuery(e.detail.value)}
            confirmType='search'
          />
        </View>
      </View>

      <SectionHeader title='策略列表' hint={loading ? '加载中…' : `${filtered.length} 条`} />

      <View className={styles.list}>
        {!loading && filtered.length === 0 ? (
          <EmptyState title='暂无匹配策略' desc='换个关键词试试，或者先从模板策略开始。' />
        ) : null}

        {filtered.map((s) => (
          <View key={s.id} className={styles.strategyCard} onClick={() => openStrategy(s)}>
            <View className={styles.strategyTop}>
              <Text className={styles.strategyTitle}>{s.name}</Text>
              <View className={s.enabled ? `${styles.badge} ${styles.badgeOn}` : `${styles.badge} ${styles.badgeOff}`}>
                <Text>{s.enabled ? '启用' : '停用'}</Text>
              </View>
            </View>

            <Text className={styles.strategyDesc}>{s.description}</Text>

            <View className={styles.metaRow}>
              <View className={styles.tags}>
                {s.tags.slice(0, 3).map((t) => (
                  <Tag key={`${s.id}-${t}`} text={t} />
                ))}
                <Tag text={s.riskLevel.toUpperCase()} muted />
              </View>
              <Text className={styles.meta}>更新 {formatDateTime(s.updatedAt)}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default StrategiesPage;
