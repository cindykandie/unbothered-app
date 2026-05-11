import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  userName: 'unbothered:userName',
  completedDays: 'unbothered:completedDays',
  notes: 'unbothered:notes',
};

export async function saveUserName(name: string): Promise<void> {
  await AsyncStorage.setItem(KEYS.userName, name);
}

export async function getUserName(): Promise<string | null> {
  return AsyncStorage.getItem(KEYS.userName);
}

export async function saveCompletedDay(day: number): Promise<void> {
  const existing = await getCompletedDays();
  if (!existing.includes(day)) {
    await AsyncStorage.setItem(KEYS.completedDays, JSON.stringify([...existing, day]));
  }
}

export async function getCompletedDays(): Promise<number[]> {
  try {
    const raw = await AsyncStorage.getItem(KEYS.completedDays);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function saveNote(day: number, text: string): Promise<void> {
  const notes = await getAllNotes();
  notes[day] = text;
  await AsyncStorage.setItem(KEYS.notes, JSON.stringify(notes));
}

export async function getNote(day: number): Promise<string> {
  const notes = await getAllNotes();
  return notes[day] ?? '';
}

export async function getAllNotes(): Promise<Record<number, string>> {
  try {
    const raw = await AsyncStorage.getItem(KEYS.notes);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export async function clearProgress(): Promise<void> {
  await AsyncStorage.removeItem(KEYS.completedDays);
}
