import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Header } from '@/components/Header';
import { NoteInput } from '@/components/NoteInput';
import { CompletionButton } from '@/components/CompletionButton';
import { COLORS } from '@/constants/colors';
import { challenges } from '@/constants/challenges';
import { getCompletedDays, saveCompletedDay, getNote, saveNote } from '@/utils/storage';

export default function UnbotheredDayScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const day = parseInt(id as string, 10);
  const challenge = challenges[day - 1];

  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [note, setNote] = useState('');
  const [noteSaved, setNoteSaved] = useState(false);

  useEffect(() => {
    async function load() {
      const [days, savedNote] = await Promise.all([getCompletedDays(), getNote(day)]);
      setCompletedDays(days);
      setNote(savedNote);
    }
    load();
  }, [day]);

  async function handleMarkComplete() {
    if (isCompleted) return;
    const updated = [...completedDays, day];
    setCompletedDays(updated);
    await saveCompletedDay(day);
  }

  async function handleSaveNote() {
    await saveNote(day, note);
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 3000);
  }

  if (!challenge) return null;
  const isCompleted = completedDays.includes(day);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <Header showBack />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Meta */}
        <View style={styles.meta}>
          <Text style={styles.dayLabel}>Unbothered · Day {challenge.day}</Text>
          {isCompleted && (
            <View style={styles.doneBadge}>
              <Text style={styles.doneBadgeText}>✓ Complete</Text>
            </View>
          )}
        </View>

        <Text style={styles.title}>{challenge.title}</Text>

        {/* Challenge */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Today's practice</Text>
          <Text style={styles.cardText}>{challenge.description}</Text>
        </View>

        {/* Reflection */}
        <View style={[styles.card, styles.reflectCard]}>
          <Text style={[styles.cardLabel, styles.reflectLabel]}>Reflect on this</Text>
          <Text style={[styles.cardText, styles.reflectText]}>{challenge.reflectionPrompt}</Text>
        </View>

        {/* Notes */}
        <View style={styles.noteSection}>
          <NoteInput
            value={note}
            onChange={(text) => { setNote(text); setNoteSaved(false); }}
            onSave={handleSaveNote}
            saved={noteSaved}
          />
        </View>

        {/* Complete */}
        <CompletionButton isCompleted={isCompleted} onPress={handleMarkComplete} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  scroll: { paddingHorizontal: 24, paddingBottom: 56, gap: 16 },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  dayLabel: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.3,
    textTransform: 'uppercase',
  },
  doneBadge: {
    backgroundColor: COLORS.cardAlt,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: COLORS.primary + '55',
  },
  doneBadgeText: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: '600',
  },
  title: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.5,
    lineHeight: 35,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 10,
  },
  cardLabel: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  cardText: {
    color: COLORS.text,
    fontSize: 16,
    lineHeight: 26,
  },
  reflectCard: {
    backgroundColor: COLORS.secondary,
    borderColor: 'transparent',
  },
  reflectLabel: {
    color: COLORS.accent,
  },
  reflectText: {
    color: COLORS.white,
    fontStyle: 'italic',
  },
  noteSection: {},
});
