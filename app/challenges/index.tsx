import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { useRouter, useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Header } from '@/components/Header';
import { DrawerMenu } from '@/components/DrawerMenu';
import { ChallengeCard } from '@/components/ChallengeCard';
import { COLORS } from '@/constants/colors';
import { getCompletedDays, getCompetitionProgress, getUserName } from '@/utils/storage';

export default function ChallengesScreen() {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [unbotheredDays, setUnbotheredDays] = useState<number[]>([]);
  const [softeningDays, setSofteningDays] = useState<number[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  async function load() {
    const [name, uDays, sProgress] = await Promise.all([
      getUserName(),
      getCompletedDays(),
      getCompetitionProgress(),
    ]);
    setUserName(name ?? '');
    setUnbotheredDays(uDays);
    setSofteningDays(sProgress.completedDays);
  }

  useEffect(() => { load(); }, []);
  useFocusEffect(useCallback(() => { load(); }, []));

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <Header title="Challenges" onMenuPress={() => setDrawerOpen(true)} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Your journeys</Text>
        <Text style={styles.sub}>
          Each challenge is a 21-day practice. Take them at your own pace.
        </Text>

        <ChallengeCard
          title="Unbothered"
          subtitle="21 days of emotional regulation and nervous system calm."
          completedDays={unbotheredDays.length}
          totalDays={21}
          onPress={() => router.push('/challenges/unbothered' as any)}
        />

        <View style={styles.spacer} />

        <ChallengeCard
          title="Softening the Need to Win"
          subtitle="21 days of emotional restraint, peace, and non-participation."
          completedDays={softeningDays.length}
          totalDays={21}
          onPress={() => router.push('/challenges/softening-the-need-to-win' as any)}
        />

        <View style={styles.spacer} />

        {/* Teaser for future challenges */}
        <View style={styles.comingSoonCard}>
          <Text style={styles.comingSoonSymbol}>◇</Text>
          <Text style={styles.comingSoonTitle}>More on the way</Text>
          <Text style={styles.comingSoonBody}>
            New emotional regulation journeys are being crafted with care.
          </Text>
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
  heading: {
    color: COLORS.text,
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: -0.4,
    marginTop: 4,
    marginBottom: 6,
  },
  sub: {
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 28,
  },
  spacer: { height: 14 },
  comingSoonCard: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 28,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    gap: 10,
    opacity: 0.55,
  },
  comingSoonSymbol: {
    color: COLORS.textMuted,
    fontSize: 22,
  },
  comingSoonTitle: {
    color: COLORS.textSecondary,
    fontSize: 15,
    fontWeight: '600',
  },
  comingSoonBody: {
    color: COLORS.textMuted,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
  },
});
