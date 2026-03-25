import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import styles from './index.module.scss';
import PrimaryButton from '@/components/PrimaryButton';
import { getStock, upsertStock } from '@/services/stockService';

const StockEditPage: React.FC = () => {
  const params = Taro.getCurrentInstance().router?.params;
  const id = params?.id;

  const [code, setCode] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(Boolean(id));
  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getStock(id)
      .then((stock) => {
        if (!stock) return;
        setCode(stock.code);
        setName(stock.name);
      })
      .catch((error) => {
        console.error('[StockEdit] load failed', error);
        Taro.showToast({ title: '加载失败', icon: 'error' });
      })
      .finally(() => setLoading(false));
  }, [id]);

  const canSave = useMemo(() => {
    if (loading || saving) return false;
    return Boolean(code.trim() && name.trim());
  }, [code, loading, name, saving]);

  const save = async () => {
    if (!canSave) {
      Taro.showToast({ title: '请补全信息', icon: 'none' });
      return;
    }
    setSaving(true);
    try {
      const stock = await upsertStock({ id, code, name });
      console.info('[StockEdit] saved', { id: stock.id });
      Taro.showToast({ title: '已保存', icon: 'success' });
      setTimeout(() => Taro.navigateBack(), 300);
    } catch (error) {
      console.error('[StockEdit] save failed', error);
      Taro.showToast({ title: '保存失败', icon: 'error' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <View className={styles.container}>
      <View className={styles.card}>
        <Text className={styles.title}>{id ? '编辑股票' : '新增股票'}</Text>
        <Text className={styles.desc}>建议使用股票代码 + 名称，便于检索与复盘。</Text>

        <View className={styles.field}>
          <Text className={styles.label}>股票代码</Text>
          <Input
            className={styles.input}
            value={code}
            placeholder='例如：600519'
            onInput={(e) => setCode(e.detail.value)}
            confirmType='next'
          />
        </View>

        <View className={styles.field}>
          <Text className={styles.label}>股票名称</Text>
          <Input
            className={styles.input}
            value={name}
            placeholder='例如：贵州茅台'
            onInput={(e) => setName(e.detail.value)}
            confirmType='done'
          />
        </View>

        <View className={styles.actions}>
          <PrimaryButton text={saving ? '保存中…' : '保存'} disabled={!canSave} onClick={save} />
        </View>
      </View>
    </View>
  );
};

export default StockEditPage;

