import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'unbothered:completedDays';

export async function loadCompletedDays(): Promise<number[]> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function saveCompletedDay(day: number): Promise<void> {
  const existing = await loadCompletedDays();
  if (!existing.includes(day)) {
    await AsyncStorage.setItem(KEY, JSON.stringify([...existing, day]));
  }
}

export async function clearProgress(): Promise<void> {
  await AsyncStorage.removeItem(KEY);
}
