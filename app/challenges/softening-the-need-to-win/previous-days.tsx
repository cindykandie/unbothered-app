import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { useRouter, useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Header } from '@/components/Header';
import { CompetitionDayCard } from '@/components/CompetitionDayCard';
import { COLORS } from '@/constants/colors';
import { competitionChallenges } from '@/constants/competitionChallenge';
import { getCompetitionProgress, getCompetitionReflection } from '@/utils/storage';

export default function SofteningPreviousDaysScreen() {
  const router = useRouter();
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [notes, setNotes] = useState<Record<number, string>>({});

  async function load() {
    const progress = await getCompetitionProgress();
    setCompletedDays(progress.completedDays);

    const noteEntries = await Promise.all(
      competitionChallenges.map(async (c) => {
        const text = await getCompetitionReflection(c.day);
        return [c.day, text] as [number, string];
      })
    );
    setNotes(Object.fromEntries(noteEntries));
  }

  useEffect(() => { load(); }, []);
  useFocusEffect(useCallback(() => { load(); }, []));

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <Header showBack />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Softening the{'\n'}Need to Win</Text>
        <Text style={styles.sub}>Tap any day to revisit or reflect.</Text>

        {competitionChallenges.map((challenge) => (
          <CompetitionDayCard
            key={challenge.day}
            challenge={challenge}
            isCompleted={completedDays.includes(challenge.day)}
            isLocked={false}
            onPress={() =>
              router.push(`/challenges/softening-the-need-to-win/${challenge.day}` as any)
            }
          />
        ))}

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  scroll: { paddingHorizontal: 24, paddingBottom: 32 },
  heading: {
    color: COLORS.text,
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: -0.3,
    marginTop: 4,
    marginBottom: 4,
    lineHeight: 33,
  },
  sub: {
    color: COLORS.textMuted,
    fontSize: 14,
    marginBottom: 24,
  },
  bottomSpacer: { height: 24 },
});
