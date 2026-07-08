import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV({ id: 'enterprise-ai-assistant' });

export function getString(key: string): string | undefined {
  return storage.getString(key);
}

export function setString(key: string, value: string): void {
  storage.set(key, value);
}

export function getObject<T>(key: string): T | undefined {
  const value = storage.getString(key);
  if (!value) {
    return undefined;
  }

  return JSON.parse(value) as T;
}

export function setObject<T>(key: string, value: T): void {
  storage.set(key, JSON.stringify(value));
}

export function remove(key: string): void {
  storage.remove(key);
}
