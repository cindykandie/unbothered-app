import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Header } from '@/components/Header';
import { NoteInput } from '@/components/NoteInput';
import { COLORS } from '@/constants/colors';
import { challenges } from '@/constants/challenges';
import { getCompletedDays, saveCompletedDay, getNote, saveNote } from '@/utils/storage';

export default function ChallengeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const day = parseInt(id as string, 10);
  const challenge = challenges[day - 1];

  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [note, setNote] = useState('');
  const [noteSaved, setNoteSaved] = useState(false);

  useEffect(() => {
    async function load() {
      const [days, savedNote] = await Promise.all([
        getCompletedDays(),
        getNote(day),
      ]);
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
        {/* Day badge */}
        <View style={styles.meta}>
          <Text style={styles.dayLabel}>Day {challenge.day} of 21</Text>
          {isCompleted && (
            <View style={styles.doneBadge}>
              <Text style={styles.doneBadgeText}>✓ Complete</Text>
            </View>
          )}
        </View>

        {/* Title */}
        <Text style={styles.title}>{challenge.title}</Text>

        {/* Description */}
        <View style={styles.descCard}>
          <Text style={styles.descLabel}>The challenge</Text>
          <Text style={styles.description}>{challenge.description}</Text>
        </View>

        {/* Reflection prompt */}
        <View style={styles.promptCard}>
          <Text style={styles.promptLabel}>Reflect on this</Text>
          <Text style={styles.prompt}>{challenge.reflectionPrompt}</Text>
        </View>

        {/* Note input */}
        <View style={styles.noteSection}>
          <NoteInput
            value={note}
            onChange={(text) => { setNote(text); setNoteSaved(false); }}
            onSave={handleSaveNote}
            saved={noteSaved}
          />
        </View>

        {/* Mark complete */}
        {!isCompleted && (
          <TouchableOpacity
            style={styles.completeBtn}
            onPress={handleMarkComplete}
            activeOpacity={0.8}
          >
            <Text style={styles.completeBtnText}>Mark Complete</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    paddingHorizontal: 24,
    paddingBottom: 56,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
    marginBottom: 10,
  },
  dayLabel: {
    color: COLORS.primary,
    fontSize: 12,
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
    borderColor: COLORS.primary,
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
    marginBottom: 24,
    lineHeight: 34,
  },
  descCard: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 8,
  },
  descLabel: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  description: {
    color: COLORS.text,
    fontSize: 16,
    lineHeight: 25,
  },
  promptCard: {
    backgroundColor: COLORS.secondary,
    borderRadius: 18,
    padding: 20,
    marginBottom: 24,
    gap: 8,
  },
  promptLabel: {
    color: COLORS.accent,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  prompt: {
    color: COLORS.white,
    fontSize: 16,
    lineHeight: 25,
    fontStyle: 'italic',
  },
  noteSection: {
    marginBottom: 24,
  },
  completeBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  completeBtnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
});
