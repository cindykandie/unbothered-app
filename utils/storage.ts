import AsyncStorage from '@react-native-async-storage/async-storage';
import type { CompetitionProgress } from '@/types';

const KEYS = {
  userName: 'unbothered:userName',
  completedDays: 'unbothered:completedDays',
  notes: 'unbothered:notes',
  competitionCompletedDays: 'unbothered:competition:completedDays',
  competitionReflections: 'unbothered:competition:reflections',
  competitionLastDate: 'unbothered:competition:lastDate',
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

// ─── Competition Challenge Storage ───────────────────────────────────────────

export async function saveCompetitionDayComplete(day: number): Promise<void> {
  const existing = await getCompetitionCompletedDays();
  if (!existing.includes(day)) {
    const updated = [...existing, day];
    const today = new Date().toISOString().split('T')[0];
    await Promise.all([
      AsyncStorage.setItem(KEYS.competitionCompletedDays, JSON.stringify(updated)),
      AsyncStorage.setItem(KEYS.competitionLastDate, today),
    ]);
  }
}

async function getCompetitionCompletedDays(): Promise<number[]> {
  try {
    const raw = await AsyncStorage.getItem(KEYS.competitionCompletedDays);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function getCompetitionProgress(): Promise<CompetitionProgress> {
  try {
    const [raw, lastDate] = await Promise.all([
      AsyncStorage.getItem(KEYS.competitionCompletedDays),
      AsyncStorage.getItem(KEYS.competitionLastDate),
    ]);
    const completedDays: number[] = raw ? JSON.parse(raw) : [];

    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    const streakAlive = lastDate === today || lastDate === yesterday;
    const streak = streakAlive ? completedDays.length : 0;

    return { completedDays, streak, lastCompletedDate: lastDate };
  } catch {
    return { completedDays: [], streak: 0, lastCompletedDate: null };
  }
}

export async function saveCompetitionReflection(day: number, text: string): Promise<void> {
  const all = await getAllCompetitionReflections();
  all[day] = text;
  await AsyncStorage.setItem(KEYS.competitionReflections, JSON.stringify(all));
}

export async function getCompetitionReflection(day: number): Promise<string> {
  const all = await getAllCompetitionReflections();
  return all[day] ?? '';
}

async function getAllCompetitionReflections(): Promise<Record<number, string>> {
  try {
    const raw = await AsyncStorage.getItem(KEYS.competitionReflections);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

// ─── Cross-challenge combined notes ──────────────────────────────────────────

export type CombinedNote = {
  challengeId: 'unbothered' | 'softening';
  challengeLabel: string;
  day: number;
  text: string;
};

export async function getCombinedNotes(): Promise<CombinedNote[]> {
  const [unbotheredRaw, softeningRaw] = await Promise.all([
    AsyncStorage.getItem(KEYS.notes),
    AsyncStorage.getItem(KEYS.competitionReflections),
  ]);

  const unbotheredNotes: Record<number, string> = unbotheredRaw ? JSON.parse(unbotheredRaw) : {};
  const softeningNotes: Record<number, string> = softeningRaw ? JSON.parse(softeningRaw) : {};

  const combined: CombinedNote[] = [];

  Object.entries(unbotheredNotes).forEach(([day, text]) => {
    if (text.trim()) {
      combined.push({
        challengeId: 'unbothered',
        challengeLabel: 'Unbothered',
        day: parseInt(day),
        text,
      });
    }
  });

  Object.entries(softeningNotes).forEach(([day, text]) => {
    if (text.trim()) {
      combined.push({
        challengeId: 'softening',
        challengeLabel: 'Softening the Need to Win',
        day: parseInt(day),
        text,
      });
    }
  });

  return combined.sort((a, b) =>
    a.challengeId.localeCompare(b.challengeId) || a.day - b.day
  );
}
