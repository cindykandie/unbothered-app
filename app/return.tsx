import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import { Header } from '@/components/Header';
import { DrawerMenu } from '@/components/DrawerMenu';
import { ReturnCard } from '@/components/ReturnCard';
import { COLORS, GRADIENTS, RADIUS, SHADOWS } from '@/constants/colors';
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
      {/* Deep ambient gradient */}
      <LinearGradient
        colors={['#070E1F', '#0B132B', '#1C2541']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      <Header title="Return" onMenuPress={() => setDrawerOpen(true)} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heading}>Pause. Breathe.{'\n'}Return.</Text>
          <Text style={styles.sub}>
            You are here. That is enough. Come back to yourself.
          </Text>
        </View>

        {/* Affirmation */}
        <View style={[styles.affirmWrapper, SHADOWS.card]}>
          <LinearGradient
            colors={['#1D3557', '#0B1D35']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.affirmGradient}
          >
            <Text style={styles.affirmText}>{affirmation.text}</Text>
          </LinearGradient>
        </View>

        {/* Reminders */}
        <Text style={styles.sectionLabel}>Hold this</Text>
        <View style={styles.remindersGroup}>
          {CALMING_REMINDERS.map((text, i) => (
            <ReturnCard key={i} text={text} variant={i % 2 === 1 ? 'accent' : 'default'} />
          ))}
        </View>

        {/* Breathing circle */}
        <Text style={styles.sectionLabel}>Regulated breathing</Text>
        <View style={styles.breathSection}>
          <TouchableOpacity onPress={toggle} activeOpacity={0.88}>
            <View style={[styles.circleOuter, running && styles.circleOuterActive]}>
              <LinearGradient
                colors={running
                  ? [COLORS.primary + '30', COLORS.primary + '08']
                  : ['rgba(255,255,255,0.05)', 'rgba(255,255,255,0.02)']}
                style={styles.circleGradient}
              >
                <Text style={styles.circlePhase}>
                  {running ? phase.label : 'Tap to begin'}
                </Text>
                {running && (
                  <Text style={styles.circleCount}>{countdown}</Text>
                )}
              </LinearGradient>
            </View>
          </TouchableOpacity>
          <Text style={styles.breathHint}>4 in · 4 hold · 6 out · 2 rest</Text>
        </View>

        {/* Grounding */}
        <Text style={styles.sectionLabel}>Ground yourself</Text>
        <View style={[styles.groundCard, SHADOWS.soft]}>
          <Text style={styles.groundIntro}>
            Bring your attention here. Notice each one slowly.
          </Text>
          <View style={styles.groundList}>
            {GROUNDING_PROMPTS.map((item, i) => (
              <View key={i} style={styles.groundItem}>
                <LinearGradient
                  colors={[COLORS.primary, COLORS.primaryLight]}
                  style={styles.groundDot}
                />
                <Text style={styles.groundText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Closing */}
        <View style={styles.closingCard}>
          <Text style={styles.closingText}>
            You are allowed to step back.{'\n'}
            You are allowed to be quiet.{'\n'}
            You are allowed to choose yourself.
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
  scroll: { paddingHorizontal: 24, paddingBottom: 60 },
  hero: {
    paddingTop: 10,
    paddingBottom: 30,
    gap: 10,
  },
  heading: {
    color: COLORS.text,
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: -0.6,
    lineHeight: 42,
  },
  sub: {
    color: COLORS.textSecondary,
    fontSize: 16,
    lineHeight: 25,
  },
  affirmWrapper: {
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(91,192,190,0.15)',
    marginBottom: 36,
  },
  affirmGradient: {
    paddingHorizontal: 26,
    paddingTop: 6,
    paddingBottom: 26,
    gap: 8,
  },
  affirmText: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 28,
    marginTop: 10,
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
    marginBottom: 36,
  },
  breathSection: {
    alignItems: 'center',
    marginBottom: 36,
    gap: 18,
  },
  circleOuter: {
    width: 170,
    height: 170,
    borderRadius: 85,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  circleOuterActive: {
    borderColor: COLORS.primary + '60',
  },
  circleGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  circlePhase: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  circleCount: {
    color: COLORS.primary,
    fontSize: 34,
    fontWeight: '700',
  },
  breathHint: {
    color: COLORS.textMuted,
    fontSize: 13,
    letterSpacing: 0.3,
  },
  groundCard: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.xl,
    padding: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 36,
    gap: 18,
  },
  groundIntro: {
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 22,
    fontStyle: 'italic',
  },
  groundList: { gap: 16 },
  groundItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  groundDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    opacity: 0.75,
  },
  groundText: {
    color: COLORS.textSecondary,
    fontSize: 15,
    lineHeight: 22,
  },
  closingCard: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 28,
    alignItems: 'center',
  },
  closingText: {
    color: COLORS.textMuted,
    fontSize: 16,
    lineHeight: 30,
    fontStyle: 'italic',
    textAlign: 'center',
    letterSpacing: 0.1,
  },
});
