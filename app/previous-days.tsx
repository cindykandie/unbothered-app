import { ScrollView, View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Header } from '@/components/Header';
import { DrawerMenu } from '@/components/DrawerMenu';
import { DayCard } from '@/components/DayCard';
import { COLORS } from '@/constants/colors';
import { challenges } from '@/constants/challenges';
import { getUserName, getCompletedDays, getAllNotes, clearProgress } from '@/utils/storage';

export default function PreviousDaysScreen() {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [notes, setNotes] = useState<Record<number, string>>({});
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    async function load() {
      const [name, days, allNotes] = await Promise.all([
        getUserName(),
        getCompletedDays(),
        getAllNotes(),
      ]);
      setUserName(name ?? '');
      setCompletedDays(days);
      setNotes(allNotes);
    }
    load();
  }, []);

  const currentDay = Math.min(completedDays.length + 1, 21);

  function handleRestart() {
    Alert.alert(
      'Restart journey?',
      'Your completed days will be reset to zero. Your notes and reflections will be kept.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Restart',
          style: 'destructive',
          onPress: async () => {
            await clearProgress();
            setCompletedDays([]);
          },
        },
      ]
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <Header
        title="Your Journey"
        onMenuPress={() => setDrawerOpen(true)}
      />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>21-Day Journey</Text>
        <Text style={styles.sub}>Tap any day to revisit or reflect</Text>

        {challenges.map((challenge) => {
          const isCompleted = completedDays.includes(challenge.day);
          const isFuture = challenge.day > currentDay;
          return (
            <View key={challenge.day} style={isFuture && styles.future}>
              <DayCard
                challenge={challenge}
                isCompleted={isCompleted}
                note={notes[challenge.day]}
                onPress={() => router.push(`/challenge/${challenge.day}`)}
              />
            </View>
          );
        })}

        <View style={styles.restartSection}>
          <View style={styles.restartDivider} />
          <TouchableOpacity
            style={styles.restartBtn}
            onPress={handleRestart}
            activeOpacity={0.7}
          >
            <Text style={styles.restartText}>Restart from Day 1</Text>
          </TouchableOpacity>
          <Text style={styles.restartHint}>Resets progress only — your notes are kept</Text>
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
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: -0.3,
    marginTop: 4,
    marginBottom: 4,
  },
  sub: {
    color: COLORS.textMuted,
    fontSize: 14,
    marginBottom: 24,
  },
  future: {
    opacity: 0.4,
  },
  restartSection: {
    alignItems: 'center',
    marginTop: 24,
    gap: 10,
  },
  restartDivider: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.border,
    marginBottom: 8,
  },
  restartBtn: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  restartText: {
    color: COLORS.textMuted,
    fontSize: 14,
    fontWeight: '500',
  },
  restartHint: {
    color: COLORS.textMuted,
    fontSize: 12,
    opacity: 0.6,
  },
});
