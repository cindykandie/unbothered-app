import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { useRouter, useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { Header } from '@/components/Header';
import { ProgressTracker } from '@/components/ProgressTracker';
import { COLORS, RADIUS, SHADOWS } from '@/constants/colors';
import { challenges } from '@/constants/challenges';
import { getCompletedDays } from '@/utils/storage';

const TOTAL = 21;

export default function UnbotheredOverviewScreen() {
  const router = useRouter();
  const [completedDays, setCompletedDays] = useState<number[]>([]);

  async function load() {
    const days = await getCompletedDays();
    setCompletedDays(days);
  }

  useEffect(() => { load(); }, []);
  useFocusEffect(useCallback(() => { load(); }, []));

  const currentDay = Math.min(completedDays.length + 1, TOTAL);
  const allDone = completedDays.length >= TOTAL;
  const currentChallenge = challenges[currentDay - 1];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <LinearGradient
        colors={['#070E1F', '#0B132B', '#1C2541']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.3, y: 0 }}
        end={{ x: 0.7, y: 1 }}
      />
      <Header showBack />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Text style={styles.heading}>Unbothered</Text>
          <Text style={styles.sub}>21 days of emotional regulation and nervous system calm.</Text>
        </View>

        <View style={[styles.introCard, SHADOWS.soft]}>
          <Text style={styles.introLabel}>About this challenge</Text>
          <Text style={styles.introText}>
            This journey invites you to practice presence, reduce reactivity, and
            build a daily relationship with your own calm. Each day offers a small,
            sustainable practice — not perfection, but direction.
          </Text>
        </View>

        <Text style={styles.sectionLabel}>Your progress</Text>
        <ProgressTracker completedDays={completedDays} totalDays={TOTAL} streak={0} />

        <View style={styles.spacer} />

        {!allDone ? (
          <TouchableOpacity
            style={[styles.continueBtn, SHADOWS.glow(COLORS.primary)]}
            onPress={() => router.push(`/challenges/unbothered/${currentDay}` as any)}
            activeOpacity={0.84}
          >
            <LinearGradient
              colors={[COLORS.primary, COLORS.primaryLight]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.continueBtnInner}
            >
              <View>
                <Text style={styles.continueBtnLabel}>Continue · Day {currentDay}</Text>
                <Text style={styles.continueBtnTitle}>{currentChallenge.title}</Text>
              </View>
              <Ionicons name="arrow-forward" size={20} color={COLORS.backgroundDeep} />
            </LinearGradient>
          </TouchableOpacity>
        ) : (
          <View style={styles.completedBanner}>
            <Ionicons name="checkmark-circle" size={20} color={COLORS.primary} />
            <Text style={styles.completedBannerText}>Journey complete</Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.prevBtn}
          onPress={() => router.push('/challenges/unbothered/previous-days' as any)}
          activeOpacity={0.75}
        >
          <Text style={styles.prevBtnText}>View all 21 days</Text>
          <Ionicons name="chevron-forward" size={14} color={COLORS.textMuted} />
        </TouchableOpacity>

        <View style={[styles.quoteCard]}>
          <Text style={styles.quoteMark}>"</Text>
          <Text style={styles.quoteText}>
            You don't have to earn your rest. You don't have to justify your peace.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const { backgroundDeep, primary, primaryLight } = COLORS;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  scroll: { paddingHorizontal: 24, paddingBottom: 56 },
  hero: { paddingTop: 8, paddingBottom: 24, gap: 8 },
  heading: {
    color: COLORS.text,
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -0.6,
  },
  sub: {
    color: COLORS.textSecondary,
    fontSize: 15,
    lineHeight: 23,
  },
  introCard: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.xl,
    padding: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 28,
    gap: 10,
  },
  introLabel: {
    color: COLORS.accent,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  introText: {
    color: COLORS.textSecondary,
    fontSize: 15,
    lineHeight: 24,
  },
  sectionLabel: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    marginBottom: 14,
  },
  spacer: { height: 22 },
  continueBtn: {
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    marginBottom: 12,
  },
  continueBtnInner: {
    paddingVertical: 18,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  continueBtnLabel: {
    color: COLORS.backgroundDeep + 'cc',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  continueBtnTitle: {
    color: COLORS.backgroundDeep,
    fontSize: 16,
    fontWeight: '700',
    marginTop: 3,
  },
  completedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: COLORS.cardAccent,
    borderRadius: RADIUS.lg,
    paddingVertical: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.borderAccent,
  },
  completedBannerText: {
    color: COLORS.primary,
    fontSize: 15,
    fontWeight: '600',
  },
  prevBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 14,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 28,
  },
  prevBtnText: {
    color: COLORS.textMuted,
    fontSize: 14,
    fontWeight: '500',
  },
  quoteCard: {
    backgroundColor: COLORS.cardWarm,
    borderRadius: RADIUS.xl,
    padding: 22,
    borderWidth: 1,
    borderColor: COLORS.borderWarm,
    gap: 8,
  },
  quoteMark: {
    color: COLORS.accent,
    fontSize: 32,
    lineHeight: 28,
    fontWeight: '700',
    opacity: 0.65,
  },
  quoteText: {
    color: COLORS.textSecondary,
    fontSize: 15,
    lineHeight: 24,
    fontStyle: 'italic',
  },
});
