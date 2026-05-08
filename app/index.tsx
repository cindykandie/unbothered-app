import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ChallengeCard } from '@/components/ChallengeCard';
import { QuoteCard } from '@/components/QuoteCard';
import { ProgressCard } from '@/components/ProgressCard';
import { COLORS } from '@/constants/colors';
import { challenges } from '@/constants/challenges';
import { getDailyAffirmation } from '@/constants/affirmations';
import { loadCompletedDays, saveCompletedDay } from '@/utils/storage';
import { scheduleDailyReminder } from '@/utils/notifications';
import * as Notifications from 'expo-notifications';

const TOTAL_DAYS = 21;

export default function HomeScreen() {
  const router = useRouter();
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const affirmation = getDailyAffirmation();

  useEffect(() => {
    loadCompletedDays().then((days) => {
      setCompletedDays(days);
      setLoading(false);
    });
    requestAndSchedule();
  }, []);

  async function requestAndSchedule() {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status === 'granted') {
      await scheduleDailyReminder();
    }
  }

  async function handleMarkComplete() {
    if (completedDays.includes(currentDay)) return;
    const updated = [...completedDays, currentDay];
    setCompletedDays(updated);
    await saveCompletedDay(currentDay);
  }

  const currentDay = Math.min(completedDays.length + 1, TOTAL_DAYS);
  const allDone = completedDays.length >= TOTAL_DAYS;
  const todayDone = completedDays.includes(currentDay);
  const challenge = challenges[currentDay - 1];

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? 'Good morning.' : hour < 17 ? 'Good afternoon.' : 'Good evening.';

  if (loading) return <View style={styles.safe} />;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.dayCount}>
            {allDone ? 'Journey complete' : `Day ${currentDay} of ${TOTAL_DAYS}`}
          </Text>
          <Text style={styles.greeting}>{greeting}</Text>
        </View>

        {/* Daily affirmation */}
        <QuoteCard affirmation={affirmation} />

        {/* Today's challenge */}
        {!allDone && (
          <ChallengeCard challenge={challenge} isDone={todayDone} />
        )}

        {allDone && (
          <View style={styles.completeCard}>
            <Text style={styles.completeEmoji}>✦</Text>
            <Text style={styles.completeTitle}>You did it.</Text>
            <Text style={styles.completeBody}>
              21 days of choosing your peace. That took courage.
            </Text>
          </View>
        )}

        {/* Progress */}
        <ProgressCard completedDays={completedDays} totalDays={TOTAL_DAYS} />

        {/* Actions */}
        {!allDone && (
          <TouchableOpacity
            style={[styles.primaryBtn, todayDone && styles.primaryBtnDone]}
            onPress={handleMarkComplete}
            disabled={todayDone}
            activeOpacity={0.8}
          >
            <Text style={[styles.primaryBtnText, todayDone && styles.primaryBtnTextDone]}>
              {todayDone ? '✓  Completed' : 'Mark Complete'}
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.spiralBtn}
          onPress={() => router.push('/spiral')}
          activeOpacity={0.7}
        >
          <Text style={styles.spiralBtnText}>I'm Spiraling</Text>
        </TouchableOpacity>
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
    paddingTop: 20,
    paddingBottom: 48,
  },
  header: {
    marginBottom: 28,
  },
  dayCount: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  greeting: {
    color: COLORS.text,
    fontSize: 30,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  completeCard: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  completeEmoji: {
    color: COLORS.accent,
    fontSize: 32,
    marginBottom: 12,
  },
  completeTitle: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  completeBody: {
    color: COLORS.textSecondary,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
  primaryBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  primaryBtnDone: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.primary,
    shadowOpacity: 0,
    elevation: 0,
  },
  primaryBtnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  primaryBtnTextDone: {
    color: COLORS.primary,
  },
  spiralBtn: {
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  spiralBtnText: {
    color: COLORS.textSecondary,
    fontSize: 15,
    fontWeight: '500',
  },
});
