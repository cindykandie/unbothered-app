import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useEffect, useState, useCallback } from 'react';
import { useRouter, useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { Header } from '@/components/Header';
import { DrawerMenu } from '@/components/DrawerMenu';
import { ProgressTracker } from '@/components/ProgressTracker';
import { CompetitionDayCard } from '@/components/CompetitionDayCard';
import { COLORS } from '@/constants/colors';
import { competitionChallenges } from '@/constants/competitionChallenge';
import { getCompetitionProgress } from '@/utils/storage';
import { getUserName } from '@/utils/storage';
import type { CompetitionProgress } from '@/types';

export default function CompetitionResetScreen() {
  const router = useRouter();
  const [progress, setProgress] = useState<CompetitionProgress>({
    completedDays: [],
    streak: 0,
    lastCompletedDate: null,
  });
  const [userName, setUserName] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);

  async function load() {
    const [p, name] = await Promise.all([getCompetitionProgress(), getUserName()]);
    setProgress(p);
    setUserName(name ?? '');
  }

  useEffect(() => {
    load();
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [])
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <Header onMenuPress={() => setDrawerOpen(true)} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Header section */}
        <View style={styles.heroSection}>
          <View style={styles.iconCircle}>
            <Ionicons name="leaf-outline" size={28} color={COLORS.accent} />
          </View>
          <Text style={styles.heroTitle}>Softening the{'\n'}Need to Win</Text>
          <Text style={styles.heroSubtitle}>
            21 days of emotional regulation, non-participation, and inner calm.
          </Text>
        </View>

        {/* Emotional introduction */}
        <View style={styles.introCard}>
          <Text style={styles.introLabel}>About this challenge</Text>
          <Text style={styles.introText}>
            Hypercompetitiveness is often a survival strategy — a pattern built
            when being right, winning, or proving felt like safety. Over time, this
            wiring can turn ordinary conversations into emotional battles, and
            disagreement into something that feels threatening to your worth.
          </Text>
          <View style={styles.introDivider} />
          <Text style={styles.introText}>
            This 21-day practice is not about becoming passive. It is about
            learning to choose your engagement deliberately — to stop treating
            every interaction as something to win, and to discover that peace can
            sometimes be the most powerful response available to you.
          </Text>
          <View style={styles.introDivider} />
          <Text style={styles.introText}>
            Each day holds a lesson, an exercise, and a quiet invitation to
            practice something different. There is no pressure. There is only
            curiosity, and the willingness to look at yourself with honesty and care.
          </Text>
        </View>

        {/* Progress tracker */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>Your progress</Text>
        </View>
        <ProgressTracker
          completedDays={progress.completedDays}
          totalDays={21}
          streak={progress.streak}
        />

        {/* Day list */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionLabel}>21 Days</Text>
          {progress.completedDays.length > 0 && (
            <Text style={styles.sectionMeta}>
              {progress.completedDays.length} of 21 complete
            </Text>
          )}
        </View>

        {competitionChallenges.map((challenge) => {
          const isCompleted = progress.completedDays.includes(challenge.day);
          return (
            <CompetitionDayCard
              key={challenge.day}
              challenge={challenge}
              isCompleted={isCompleted}
              isLocked={false}
              onPress={() => router.push(`/competition-day/${challenge.day}` as any)}
            />
          );
        })}

        {/* Completion card */}
        {progress.completedDays.length === 21 && (
          <View style={styles.finishedCard}>
            <Text style={styles.finishedSymbol}>✦</Text>
            <Text style={styles.finishedTitle}>You finished.</Text>
            <Text style={styles.finishedBody}>
              21 days of choosing regulation over reaction. That is not a small
              thing. Carry this forward.
            </Text>
          </View>
        )}

        <View style={styles.bottomSpacer} />
      </ScrollView>

      <DrawerMenu
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        userName={userName}
      />
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
  heroSection: {
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 32,
    gap: 14,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  heroTitle: {
    color: COLORS.text,
    fontSize: 30,
    fontWeight: '700',
    letterSpacing: -0.6,
    textAlign: 'center',
    lineHeight: 38,
  },
  heroSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 12,
  },
  introCard: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 28,
    gap: 0,
  },
  introLabel: {
    color: COLORS.accent,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    marginBottom: 14,
  },
  introText: {
    color: COLORS.textSecondary,
    fontSize: 15,
    lineHeight: 24,
  },
  introDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
    marginTop: 4,
  },
  sectionLabel: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  sectionMeta: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: '500',
  },
  finishedCard: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    marginTop: 8,
    borderWidth: 1,
    borderColor: COLORS.primary + '44',
    gap: 10,
  },
  finishedSymbol: {
    color: COLORS.accent,
    fontSize: 28,
  },
  finishedTitle: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  finishedBody: {
    color: COLORS.textSecondary,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 23,
  },
  bottomSpacer: {
    height: 16,
  },
});
