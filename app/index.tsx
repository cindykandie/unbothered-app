import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { useRouter, useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { Header } from '@/components/Header';
import { DrawerMenu } from '@/components/DrawerMenu';
import { AffirmationCard } from '@/components/AffirmationCard';
import { ContinueChallengeCard } from '@/components/ContinueChallengeCard';
import { COLORS } from '@/constants/colors';
import { challenges } from '@/constants/challenges';
import { competitionChallenges } from '@/constants/competitionChallenge';
import { getDailyAffirmation } from '@/constants/affirmations';
import {
  getUserName,
  getCompletedDays,
  getCompetitionProgress,
} from '@/utils/storage';
import { getGreeting, getDateLabel } from '@/utils/greetings';
import { scheduleDailyReminder } from '@/utils/notifications';

const TOTAL = 21;

export default function HomeScreen() {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [unbotheredDays, setUnbotheredDays] = useState<number[]>([]);
  const [softeningDays, setSofteningDays] = useState<number[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const affirmation = getDailyAffirmation();

  async function load() {
    const name = await getUserName();
    if (!name) {
      router.replace('/onboarding');
      return;
    }
    const [uDays, sProgress] = await Promise.all([
      getCompletedDays(),
      getCompetitionProgress(),
    ]);
    setUserName(name);
    setUnbotheredDays(uDays);
    setSofteningDays(sProgress.completedDays);
    setLoading(false);
  }

  useEffect(() => {
    load();
    scheduleDailyReminder();
  }, []);

  useFocusEffect(useCallback(() => { load(); }, []));

  const uDay = Math.min(unbotheredDays.length + 1, TOTAL);
  const sDay = Math.min(softeningDays.length + 1, TOTAL);

  if (loading) return <View style={styles.safe} />;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <Header onMenuPress={() => setDrawerOpen(true)} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Greeting */}
        <View style={styles.greeting}>
          <Text style={styles.greetingText}>{getGreeting(userName)}</Text>
          <Text style={styles.date}>{getDateLabel()}</Text>
        </View>

        {/* Affirmation */}
        <AffirmationCard affirmation={affirmation} />

        {/* Challenges */}
        <Text style={styles.sectionLabel}>Your journeys</Text>

        <ContinueChallengeCard
          challengeTitle="Unbothered"
          currentDay={uDay}
          totalDays={TOTAL}
          dayTitle={challenges[uDay - 1]?.title ?? 'Journey complete'}
          completedDays={unbotheredDays.length}
          onPress={() => router.push(`/challenges/unbothered/${uDay}` as any)}
        />

        <ContinueChallengeCard
          challengeTitle="Softening the Need to Win"
          currentDay={sDay}
          totalDays={TOTAL}
          dayTitle={competitionChallenges[sDay - 1]?.title ?? 'Journey complete'}
          completedDays={softeningDays.length}
          onPress={() => router.push(`/challenges/softening-the-need-to-win/${sDay}` as any)}
        />

        {/* Quick access */}
        <Text style={[styles.sectionLabel, styles.sectionLabelSpaced]}>Quick access</Text>
        <View style={styles.quickRow}>
          <TouchableOpacity
            style={styles.quickBtn}
            onPress={() => router.push('/challenges' as any)}
            activeOpacity={0.75}
          >
            <Ionicons name="grid-outline" size={20} color={COLORS.primary} />
            <Text style={styles.quickBtnText}>Challenges</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickBtn}
            onPress={() => router.push('/return' as any)}
            activeOpacity={0.75}
          >
            <Ionicons name="leaf-outline" size={20} color={COLORS.accent} />
            <Text style={styles.quickBtnText}>Return</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickBtn}
            onPress={() => router.push('/notes' as any)}
            activeOpacity={0.75}
          >
            <Ionicons name="journal-outline" size={20} color={COLORS.textSecondary} />
            <Text style={styles.quickBtnText}>Notes</Text>
          </TouchableOpacity>
        </View>
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
  safe: { flex: 1, backgroundColor: COLORS.background },
  scroll: { paddingHorizontal: 24, paddingBottom: 56 },
  greeting: {
    marginTop: 4,
    marginBottom: 24,
  },
  greetingText: {
    color: COLORS.text,
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: -0.3,
    marginBottom: 4,
  },
  date: {
    color: COLORS.textMuted,
    fontSize: 14,
  },
  sectionLabel: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    marginBottom: 14,
    marginTop: 28,
  },
  sectionLabelSpaced: {
    marginTop: 32,
  },
  quickRow: {
    flexDirection: 'row',
    gap: 10,
  },
  quickBtn: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  quickBtnText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '500',
  },
});
