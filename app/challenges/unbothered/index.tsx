import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { useRouter, useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { Header } from '@/components/Header';
import { ProgressTracker } from '@/components/ProgressTracker';
import { COLORS } from '@/constants/colors';
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
      <Header showBack />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Text style={styles.heading}>Unbothered</Text>
        <Text style={styles.sub}>
          21 days of emotional regulation and nervous system calm.
        </Text>

        {/* Intro card */}
        <View style={styles.introCard}>
          <Text style={styles.introLabel}>About this challenge</Text>
          <Text style={styles.introText}>
            This journey invites you to practice presence, reduce reactivity, and
            build a daily relationship with your own calm. Each day offers a small,
            sustainable practice — not perfection, but direction.
          </Text>
        </View>

        {/* Progress */}
        <Text style={styles.sectionLabel}>Your progress</Text>
        <ProgressTracker
          completedDays={completedDays}
          totalDays={TOTAL}
          streak={0}
        />

        {/* Continue button */}
        <View style={styles.spacer} />

        {!allDone ? (
          <TouchableOpacity
            style={styles.continueBtn}
            onPress={() => router.push(`/challenges/unbothered/${currentDay}` as any)}
            activeOpacity={0.82}
          >
            <View style={styles.continueBtnLeft}>
              <Text style={styles.continueBtnLabel}>Continue · Day {currentDay}</Text>
              <Text style={styles.continueBtnTitle}>{currentChallenge.title}</Text>
            </View>
            <Ionicons name="arrow-forward" size={20} color={COLORS.white} />
          </TouchableOpacity>
        ) : (
          <View style={styles.completedBanner}>
            <Ionicons name="checkmark-circle" size={20} color={COLORS.primary} />
            <Text style={styles.completedBannerText}>Journey complete</Text>
          </View>
        )}

        {/* Previous days link */}
        <TouchableOpacity
          style={styles.prevBtn}
          onPress={() => router.push('/challenges/unbothered/previous-days' as any)}
          activeOpacity={0.7}
        >
          <Text style={styles.prevBtnText}>View all 21 days</Text>
          <Ionicons name="chevron-forward" size={14} color={COLORS.textMuted} />
        </TouchableOpacity>

        {/* Calming quote */}
        <View style={styles.quoteCard}>
          <Text style={styles.quoteMark}>"</Text>
          <Text style={styles.quoteText}>
            You don't have to earn your rest. You don't have to justify your peace.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  scroll: { paddingHorizontal: 24, paddingBottom: 56 },
  heading: {
    color: COLORS.text,
    fontSize: 30,
    fontWeight: '700',
    letterSpacing: -0.5,
    marginTop: 8,
    marginBottom: 6,
  },
  sub: {
    color: COLORS.textSecondary,
    fontSize: 15,
    lineHeight: 23,
    marginBottom: 24,
  },
  introCard: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
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
  spacer: { height: 20 },
  continueBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 14,
    elevation: 6,
  },
  continueBtnLeft: { gap: 3 },
  continueBtnLabel: {
    color: COLORS.white + 'cc',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  continueBtnTitle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  completedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: COLORS.card,
    borderRadius: 18,
    paddingVertical: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.primary + '55',
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
    borderRadius: 14,
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
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.accent,
    gap: 8,
  },
  quoteMark: {
    color: COLORS.accent,
    fontSize: 32,
    lineHeight: 26,
    fontWeight: '700',
    opacity: 0.6,
  },
  quoteText: {
    color: COLORS.textSecondary,
    fontSize: 15,
    lineHeight: 24,
    fontStyle: 'italic',
  },
});
