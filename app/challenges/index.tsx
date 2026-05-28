import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { useRouter, useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import { Header } from '@/components/Header';
import { DrawerMenu } from '@/components/DrawerMenu';
import { ChallengeCard } from '@/components/ChallengeCard';
import { COLORS, GRADIENTS, RADIUS } from '@/constants/colors';
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
      <LinearGradient
        colors={GRADIENTS.screenMain}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
      />

      <Header title="Challenges" onMenuPress={() => setDrawerOpen(true)} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Text style={styles.heading}>Your journeys</Text>
          <Text style={styles.sub}>
            Each challenge is a 21-day practice. Take them at your own pace.
          </Text>
        </View>

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

        {/* Coming soon teaser */}
        <View style={styles.comingSoon}>
          <Text style={styles.comingSoonSymbol}>◇</Text>
          <Text style={styles.comingSoonTitle}>More journeys on the way</Text>
          <Text style={styles.comingSoonBody}>
            New emotional regulation practices are being crafted with care.
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
  hero: {
    paddingTop: 6,
    paddingBottom: 28,
    gap: 8,
  },
  heading: {
    color: COLORS.text,
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.5,
    lineHeight: 35,
  },
  sub: {
    color: COLORS.textSecondary,
    fontSize: 15,
    lineHeight: 23,
  },
  spacer: { height: 14 },
  comingSoon: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.xl,
    padding: 28,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    gap: 10,
    opacity: 0.5,
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
