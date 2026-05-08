import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '@/constants/colors';
import { getRandomAffirmation } from '@/constants/affirmations';
import type { Affirmation } from '@/types';

const BREATH_PHASES = [
  { label: 'Breathe in', duration: 4 },
  { label: 'Hold', duration: 4 },
  { label: 'Breathe out', duration: 6 },
  { label: 'Rest', duration: 2 },
];

export default function SpiralScreen() {
  const router = useRouter();
  const [affirmation] = useState<Affirmation>(getRandomAffirmation());
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [countdown, setCountdown] = useState(BREATH_PHASES[0].duration);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    if (countdown > 0) {
      const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(t);
    }
    const nextIndex = (phaseIndex + 1) % BREATH_PHASES.length;
    setPhaseIndex(nextIndex);
    setCountdown(BREATH_PHASES[nextIndex].duration);
  }, [running, countdown]);

  function toggleBreath() {
    if (running) {
      setRunning(false);
      setPhaseIndex(0);
      setCountdown(BREATH_PHASES[0].duration);
    } else {
      setRunning(true);
    }
  }

  const phase = BREATH_PHASES[phaseIndex];

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Back */}
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backText}>← Return to Home</Text>
        </TouchableOpacity>

        {/* Grounding heading */}
        <View style={styles.top}>
          <Text style={styles.heading}>You're okay.</Text>
          <Text style={styles.subheading}>
            You are safe. This moment will pass.
          </Text>
        </View>

        {/* Affirmation */}
        <View style={styles.affirmationCard}>
          <Text style={styles.affirmationMark}>"</Text>
          <Text style={styles.affirmationText}>{affirmation.text}</Text>
        </View>

        {/* Breathing guide */}
        <View style={styles.breathSection}>
          <Text style={styles.breathLabel}>Box Breathing</Text>

          <TouchableOpacity
            style={[styles.breathCircle, running && styles.breathCircleActive]}
            onPress={toggleBreath}
            activeOpacity={0.85}
          >
            <Text style={styles.breathPhase}>
              {running ? phase.label : 'Tap to begin'}
            </Text>
            {running && (
              <Text style={styles.breathCount}>{countdown}</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.breathHint}>
            4 in · 4 hold · 6 out · 2 rest
          </Text>
        </View>

        {/* Grounding reminder */}
        <View style={styles.groundingCard}>
          <Text style={styles.groundingTitle}>Ground yourself</Text>
          <Text style={styles.groundingText}>
            Name 5 things you can see.{'\n'}
            Name 4 things you can touch.{'\n'}
            Name 3 things you can hear.{'\n'}
            Name 2 things you can smell.{'\n'}
            Name 1 thing you can taste.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
  },
  backBtn: {
    alignSelf: 'flex-start',
    marginBottom: 28,
  },
  backText: {
    color: COLORS.textSecondary,
    fontSize: 15,
  },
  top: {
    marginBottom: 28,
  },
  heading: {
    color: COLORS.text,
    fontSize: 36,
    fontWeight: '700',
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  subheading: {
    color: COLORS.textSecondary,
    fontSize: 16,
    lineHeight: 24,
  },
  affirmationCard: {
    backgroundColor: COLORS.secondary,
    borderRadius: 20,
    padding: 24,
    marginBottom: 28,
  },
  affirmationMark: {
    color: COLORS.accent,
    fontSize: 40,
    lineHeight: 36,
    fontWeight: '700',
    marginBottom: 6,
  },
  affirmationText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 26,
  },
  breathSection: {
    alignItems: 'center',
    marginBottom: 28,
  },
  breathLabel: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  breathCircle: {
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
  breathCircleActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.cardAlt,
  },
  breathPhase: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  breathCount: {
    color: COLORS.primary,
    fontSize: 28,
    fontWeight: '700',
  },
  breathHint: {
    color: COLORS.textMuted,
    fontSize: 13,
  },
  groundingCard: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  groundingTitle: {
    color: COLORS.accent,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  groundingText: {
    color: COLORS.textSecondary,
    fontSize: 15,
    lineHeight: 26,
  },
});
