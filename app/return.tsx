import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Header } from '@/components/Header';
import { DrawerMenu } from '@/components/DrawerMenu';
import { ReturnCard } from '@/components/ReturnCard';
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

const GROUNDING_PROMPTS = [
  '5 things you can see',
  '4 things you can touch',
  '3 things you can hear',
  '2 things you can smell',
  '1 thing you can taste',
];

const CALMING_REMINDERS = [
  'You can return to yourself.',
  'Not everything deserves your nervous system.',
  'You do not need to solve everything right now.',
  'This feeling is temporary. You are safe.',
];

export default function ReturnScreen() {
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
      <Header title="Return" onMenuPress={() => setDrawerOpen(true)} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Opening */}
        <Text style={styles.heading}>Pause. Breathe. Return.</Text>
        <Text style={styles.sub}>
          You are here. That is enough. You can come back to yourself.
        </Text>

        {/* Affirmation */}
        <View style={styles.affirmCard}>
          <Text style={styles.affirmMark}>"</Text>
          <Text style={styles.affirmText}>{affirmation.text}</Text>
        </View>

        {/* Calming reminders */}
        <Text style={styles.sectionLabel}>Hold this</Text>
        <View style={styles.remindersGroup}>
          {CALMING_REMINDERS.map((text, i) => (
            <ReturnCard
              key={i}
              text={text}
              variant={i === 1 ? 'accent' : 'default'}
            />
          ))}
        </View>

        {/* Breathing */}
        <Text style={styles.sectionLabel}>Regulated breathing</Text>
        <View style={styles.breathSection}>
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

        {/* Grounding */}
        <Text style={styles.sectionLabel}>Ground yourself</Text>
        <View style={styles.groundCard}>
          <Text style={styles.groundIntro}>
            Bring your attention to this moment. Notice each one slowly.
          </Text>
          <View style={styles.groundList}>
            {GROUNDING_PROMPTS.map((item, i) => (
              <View key={i} style={styles.groundItem}>
                <View style={styles.groundDot} />
                <Text style={styles.groundText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Closing reminder */}
        <View style={styles.closingCard}>
          <Text style={styles.closingText}>
            You are allowed to step back. You are allowed to be quiet. You are
            allowed to choose yourself.
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
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    paddingHorizontal: 24,
    paddingBottom: 56,
  },
  heading: {
    color: COLORS.text,
    fontSize: 30,
    fontWeight: '700',
    letterSpacing: -0.5,
    marginTop: 8,
    marginBottom: 8,
    lineHeight: 38,
  },
  sub: {
    color: COLORS.textSecondary,
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 28,
  },
  affirmCard: {
    backgroundColor: COLORS.secondary,
    borderRadius: 20,
    padding: 24,
    marginBottom: 32,
    gap: 8,
  },
  affirmMark: {
    color: COLORS.accent,
    fontSize: 36,
    lineHeight: 30,
    fontWeight: '700',
    opacity: 0.7,
  },
  affirmText: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: '500',
    lineHeight: 26,
  },
  sectionLabel: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    marginBottom: 14,
    marginTop: 4,
  },
  remindersGroup: {
    gap: 10,
    marginBottom: 32,
  },
  breathSection: {
    alignItems: 'center',
    marginBottom: 32,
    gap: 16,
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
    gap: 6,
  },
  circleActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.cardAlt,
  },
  circlePhase: {
    color: COLORS.text,
    fontSize: 15,
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
    letterSpacing: 0.2,
  },
  groundCard: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 32,
    gap: 16,
  },
  groundIntro: {
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 22,
    fontStyle: 'italic',
  },
  groundList: {
    gap: 14,
  },
  groundItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  groundDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
    opacity: 0.7,
  },
  groundText: {
    color: COLORS.textSecondary,
    fontSize: 15,
    lineHeight: 22,
  },
  closingCard: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 24,
  },
  closingText: {
    color: COLORS.textMuted,
    fontSize: 15,
    lineHeight: 26,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
