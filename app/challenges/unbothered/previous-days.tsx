import { ScrollView, View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Header } from '@/components/Header';
import { DayCard } from '@/components/DayCard';
import { COLORS } from '@/constants/colors';
import { challenges } from '@/constants/challenges';
import { getCompletedDays, getAllNotes, clearProgress } from '@/utils/storage';

export default function UnbotheredPreviousDaysScreen() {
  const router = useRouter();
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [notes, setNotes] = useState<Record<number, string>>({});

  useEffect(() => {
    async function load() {
      const [days, allNotes] = await Promise.all([getCompletedDays(), getAllNotes()]);
      setCompletedDays(days);
      setNotes(allNotes);
    }
    load();
  }, []);

  function handleRestart() {
    Alert.alert(
      'Restart Unbothered?',
      'Your completed days will reset to zero. Notes are kept.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Restart',
          style: 'destructive',
          onPress: async () => {
            await clearProgress();
            setCompletedDays([]);
          },
        },
      ]
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <Header showBack />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Unbothered</Text>
        <Text style={styles.sub}>Tap any day to revisit or reflect.</Text>

        {challenges.map((challenge) => (
          <DayCard
            key={challenge.day}
            challenge={challenge}
            isCompleted={completedDays.includes(challenge.day)}
            note={notes[challenge.day]}
            onPress={() => router.push(`/challenges/unbothered/${challenge.day}` as any)}
          />
        ))}

        <View style={styles.restartSection}>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.restartBtn} onPress={handleRestart} activeOpacity={0.7}>
            <Text style={styles.restartText}>Restart from Day 1</Text>
          </TouchableOpacity>
          <Text style={styles.restartHint}>Resets progress only — your notes are kept</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  scroll: { paddingHorizontal: 24, paddingBottom: 56 },
  heading: {
    color: COLORS.text,
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: -0.3,
    marginTop: 4,
    marginBottom: 4,
  },
  sub: {
    color: COLORS.textMuted,
    fontSize: 14,
    marginBottom: 24,
  },
  restartSection: {
    alignItems: 'center',
    marginTop: 24,
    gap: 10,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.border,
    marginBottom: 8,
  },
  restartBtn: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  restartText: {
    color: COLORS.textMuted,
    fontSize: 14,
    fontWeight: '500',
  },
  restartHint: {
    color: COLORS.textMuted,
    fontSize: 12,
    opacity: 0.6,
  },
});
