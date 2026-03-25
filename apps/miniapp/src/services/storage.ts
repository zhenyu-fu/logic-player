import Taro from '@tarojs/taro';

export function getJson<T>(key: string, fallback: T): T {
  try {
    const value = Taro.getStorageSync(key);
    if (!value) return fallback;
    return JSON.parse(value) as T;
  } catch (error) {
    console.error('[Storage] getJson failed', { key, error });
    return fallback;
  }
}

export function setJson(key: string, value: unknown): void {
  try {
    Taro.setStorageSync(key, JSON.stringify(value));
  } catch (error) {
    console.error('[Storage] setJson failed', { key, error });
  }
}

