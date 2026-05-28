import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { useRouter, useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import { Header } from '@/components/Header';
import { CompetitionDayCard } from '@/components/CompetitionDayCard';
import { COLORS, GRADIENTS } from '@/constants/colors';
import { competitionChallenges } from '@/constants/competitionChallenge';
import { getCompetitionProgress } from '@/utils/storage';

export default function SofteningPreviousDaysScreen() {
  const router = useRouter();
  const [completedDays, setCompletedDays] = useState<number[]>([]);

  async function load() {
    const progress = await getCompetitionProgress();
    setCompletedDays(progress.completedDays);
  }

  useEffect(() => { load(); }, []);
  useFocusEffect(useCallback(() => { load(); }, []));

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <LinearGradient
        colors={GRADIENTS.screenMain}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
      />
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

        <View style={styles.spacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  scroll: { paddingHorizontal: 24, paddingBottom: 32 },
  heading: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.4,
    marginTop: 6,
    marginBottom: 4,
    lineHeight: 35,
  },
  sub: {
    color: COLORS.textMuted,
    fontSize: 14,
    marginBottom: 24,
    letterSpacing: 0.1,
  },
  spacer: { height: 24 },
});
