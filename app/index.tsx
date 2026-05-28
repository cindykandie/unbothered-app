import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { useRouter, useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { Header } from '@/components/Header';
import { DrawerMenu } from '@/components/DrawerMenu';
import { AffirmationCard } from '@/components/AffirmationCard';
import { ContinueChallengeCard } from '@/components/ContinueChallengeCard';
import { COLORS, GRADIENTS, RADIUS, SHADOWS, SPACING } from '@/constants/colors';
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
    if (!name) { router.replace('/onboarding'); return; }
    const [uDays, sProgress] = await Promise.all([
      getCompletedDays(),
      getCompetitionProgress(),
    ]);
    setUserName(name);
    setUnbotheredDays(uDays);
    setSofteningDays(sProgress.completedDays);
    setLoading(false);
  }

  useEffect(() => { load(); scheduleDailyReminder(); }, []);
  useFocusEffect(useCallback(() => { load(); }, []));

  const uDay = Math.min(unbotheredDays.length + 1, TOTAL);
  const sDay = Math.min(softeningDays.length + 1, TOTAL);

  if (loading) return <View style={styles.safe} />;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* Ambient background gradient */}
      <LinearGradient
        colors={GRADIENTS.screenMain}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
      />

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

        {/* Affirmation */}
        <AffirmationCard affirmation={affirmation} />

        {/* Journeys */}
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
          <QuickBtn
            icon="grid-outline"
            label="Challenges"
            color={COLORS.primary}
            onPress={() => router.push('/challenges' as any)}
          />
          <QuickBtn
            icon="leaf-outline"
            label="Return"
            color={COLORS.accentWarm}
            onPress={() => router.push('/return' as any)}
          />
          <QuickBtn
            icon="journal-outline"
            label="Notes"
            color={COLORS.textSecondary}
            onPress={() => router.push('/notes' as any)}
          />
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

function QuickBtn({
  icon,
  label,
  color,
  onPress,
}: {
  icon: any;
  label: string;
  color: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.quickBtn} onPress={onPress} activeOpacity={0.78}>
      <View style={[styles.quickIcon, { backgroundColor: color + '18' }]}>
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <Text style={styles.quickBtnText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  scroll: { paddingHorizontal: 24, paddingBottom: 56 },
  greeting: {
    marginTop: 6,
    marginBottom: 26,
  },
  greetingText: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.4,
    marginBottom: 5,
    lineHeight: 35,
  },
  date: {
    color: COLORS.textMuted,
    fontSize: 14,
    letterSpacing: 0.2,
  },
  sectionLabel: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 14,
    marginTop: 30,
  },
  sectionLabelSpaced: { marginTop: 34 },
  quickRow: {
    flexDirection: 'row',
    gap: 10,
  },
  quickBtn: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    paddingVertical: 18,
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  quickIcon: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickBtnText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
});
