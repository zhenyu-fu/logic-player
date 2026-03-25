import dayjs from 'dayjs';

export function formatDateTime(iso: string): string {
  return dayjs(iso).format('MM-DD HH:mm');
}

export function formatMoney(value: number): string {
  const fixed = Math.round(value * 100) / 100;
  return fixed.toFixed(2);
}

