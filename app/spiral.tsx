import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Header } from '@/components/Header';
import { DrawerMenu } from '@/components/DrawerMenu';
import { COLORS } from '@/constants/colors';
import { getRandomAffirmation } from '@/constants/affirmations';
import { getUserName } from '@/utils/storage';
import type { Affirmation } from '@/types';

const PHASES = [
  { label: 'Breathe in', duration: 4 },
  { label: 'Hold', duration: 4 },
  { label: 'Breathe out', duration: 6 },
  { label: 'Rest', duration: 2 },
];

export default function SpiralScreen() {
  const [userName, setUserName] = useState('');
  const [affirmation] = useState<Affirmation>(getRandomAffirmation());
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [countdown, setCountdown] = useState(PHASES[0].duration);
  const [running, setRunning] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    getUserName().then((n) => setUserName(n ?? ''));
  }, []);

  useEffect(() => {
    if (!running) return;
    if (countdown > 0) {
      const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(t);
    }
    const next = (phaseIndex + 1) % PHASES.length;
    setPhaseIndex(next);
    setCountdown(PHASES[next].duration);
  }, [running, countdown]);

  function toggle() {
    if (running) {
      setRunning(false);
      setPhaseIndex(0);
      setCountdown(PHASES[0].duration);
    } else {
      setRunning(true);
    }
  }

  const phase = PHASES[phaseIndex];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <Header title="Spiral Reset" onMenuPress={() => setDrawerOpen(true)} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Grounding heading */}
        <Text style={styles.heading}>You're okay.</Text>
        <Text style={styles.sub}>You are safe. This moment will pass.</Text>

        {/* Affirmation */}
        <View style={styles.affirmCard}>
          <Text style={styles.affirmMark}>"</Text>
          <Text style={styles.affirmText}>{affirmation.text}</Text>
        </View>

        {/* Box breathing */}
        <View style={styles.breathSection}>
          <Text style={styles.breathTitle}>Box Breathing</Text>
          <TouchableOpacity
            style={[styles.circle, running && styles.circleActive]}
            onPress={toggle}
            activeOpacity={0.85}
          >
            <Text style={styles.circlePhase}>
              {running ? phase.label : 'Tap to begin'}
            </Text>
            {running && <Text style={styles.circleCount}>{countdown}</Text>}
          </TouchableOpacity>
          <Text style={styles.breathHint}>4 in · 4 hold · 6 out · 2 rest</Text>
        </View>

        {/* 5-4-3-2-1 grounding */}
        <View style={styles.groundCard}>
          <Text style={styles.groundTitle}>Ground yourself</Text>
          {[
            '5 things you can see',
            '4 things you can touch',
            '3 things you can hear',
            '2 things you can smell',
            '1 thing you can taste',
          ].map((item, i) => (
            <View key={i} style={styles.groundItem}>
              <Text style={styles.groundNum}>{5 - i}</Text>
              <Text style={styles.groundText}>{item}</Text>
            </View>
          ))}
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
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    paddingHorizontal: 24,
    paddingBottom: 48,
  },
  heading: {
    color: COLORS.text,
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: -0.5,
    marginTop: 8,
    marginBottom: 6,
  },
  sub: {
    color: COLORS.textSecondary,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 28,
  },
  affirmCard: {
    backgroundColor: COLORS.secondary,
    borderRadius: 20,
    padding: 24,
    marginBottom: 28,
  },
  affirmMark: {
    color: COLORS.accent,
    fontSize: 40,
    lineHeight: 36,
    fontWeight: '700',
    marginBottom: 6,
  },
  affirmText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 27,
  },
  breathSection: {
    alignItems: 'center',
    marginBottom: 28,
  },
  breathTitle: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 20,
  },
  circle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: COLORS.card,
    borderWidth: 2,
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    gap: 6,
  },
  circleActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.cardElevated,
  },
  circlePhase: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  circleCount: {
    color: COLORS.primary,
    fontSize: 30,
    fontWeight: '700',
  },
  breathHint: {
    color: COLORS.textMuted,
    fontSize: 13,
  },
  groundCard: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 14,
  },
  groundTitle: {
    color: COLORS.accent,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  groundItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  groundNum: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: '700',
    width: 24,
    textAlign: 'center',
  },
  groundText: {
    color: COLORS.textSecondary,
    fontSize: 15,
    lineHeight: 22,
  },
});
