import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Header } from '@/components/Header';
import { DrawerMenu } from '@/components/DrawerMenu';
import { AffirmationCard } from '@/components/AffirmationCard';
import { ChallengeCard } from '@/components/ChallengeCard';
import { ProgressCard } from '@/components/ProgressCard';
import { COLORS } from '@/constants/colors';
import { challenges } from '@/constants/challenges';
import { getDailyAffirmation } from '@/constants/affirmations';
import { getUserName, getCompletedDays, saveCompletedDay } from '@/utils/storage';
import { getGreeting, getDateLabel } from '@/utils/greetings';
import { scheduleDailyReminder } from '@/utils/notifications';

const TOTAL = 21;

export default function HomeScreen() {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const affirmation = getDailyAffirmation();

  useEffect(() => {
    async function init() {
      const name = await getUserName();
      if (!name) {
        router.replace('/onboarding');
        return;
      }
      const days = await getCompletedDays();
      setUserName(name);
      setCompletedDays(days);
      setLoading(false);
      scheduleDailyReminder();
    }
    init();
  }, []);

  async function handleMarkComplete() {
    if (todayDone || allDone) return;
    const updated = [...completedDays, currentDay];
    setCompletedDays(updated);
    await saveCompletedDay(currentDay);
  }

  const currentDay = Math.min(completedDays.length + 1, TOTAL);
  const allDone = completedDays.length >= TOTAL;
  const todayDone = completedDays.includes(currentDay);
  const challenge = challenges[currentDay - 1];

  if (loading) return <View style={styles.safe} />;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <Header onMenuPress={() => setDrawerOpen(true)} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting */}
        <View style={styles.greeting}>
          <Text style={styles.greetingText}>{getGreeting(userName)}</Text>
          <Text style={styles.date}>{getDateLabel()}</Text>
        </View>

        {/* Daily affirmation */}
        <AffirmationCard affirmation={affirmation} />

        <View style={styles.spacer} />

        {/* Today's challenge */}
        {!allDone ? (
          <>
            <Text style={styles.sectionLabel}>Today's challenge</Text>
            <ChallengeCard
              challenge={challenge}
              isDone={todayDone}
              onPress={() => router.push(`/challenge/${currentDay}`)}
            />
          </>
        ) : (
          <View style={styles.completeCard}>
            <Text style={styles.completeSymbol}>✦</Text>
            <Text style={styles.completeTitle}>You did it.</Text>
            <Text style={styles.completeBody}>
              21 days of choosing your peace. That took real courage.
            </Text>
          </View>
        )}

        {/* Progress */}
        <ProgressCard completedDays={completedDays} totalDays={TOTAL} />

        {/* Actions */}
        {!allDone && (
          <TouchableOpacity
            style={[styles.primaryBtn, todayDone && styles.primaryBtnDone]}
            onPress={handleMarkComplete}
            disabled={todayDone}
            activeOpacity={0.8}
          >
            <Text style={[styles.primaryBtnText, todayDone && styles.primaryBtnTextDone]}>
              {todayDone ? '✓  Completed today' : 'Mark Complete'}
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
    paddingBottom: 48,
  },
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
  spacer: { height: 4 },
  sectionLabel: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    marginBottom: 12,
    marginTop: 24,
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
  completeSymbol: {
    color: COLORS.accent,
    fontSize: 30,
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
