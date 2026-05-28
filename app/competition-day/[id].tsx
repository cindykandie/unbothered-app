import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { Header } from '@/components/Header';
import { ReflectionPromptCard } from '@/components/ReflectionPromptCard';
import { CalmReminderCard } from '@/components/CalmReminderCard';
import { CompletionButton } from '@/components/CompletionButton';
import { COLORS } from '@/constants/colors';
import { competitionChallenges } from '@/constants/competitionChallenge';
import {
  getCompetitionProgress,
  saveCompetitionDayComplete,
  getCompetitionReflection,
  saveCompetitionReflection,
} from '@/utils/storage';

export default function CompetitionDayScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const day = parseInt(id as string, 10);
  const challenge = competitionChallenges[day - 1];

  const [isCompleted, setIsCompleted] = useState(false);
  const [reflection, setReflection] = useState('');
  const [reflectionSaved, setReflectionSaved] = useState(false);

  useEffect(() => {
    async function load() {
      const [progress, saved] = await Promise.all([
        getCompetitionProgress(),
        getCompetitionReflection(day),
      ]);
      setIsCompleted(progress.completedDays.includes(day));
      setReflection(saved);
    }
    load();
  }, [day]);

  async function handleMarkComplete() {
    if (isCompleted) return;
    setIsCompleted(true);
    await saveCompetitionDayComplete(day);
  }

  async function handleSaveReflection() {
    await saveCompetitionReflection(day, reflection);
    setReflectionSaved(true);
    setTimeout(() => setReflectionSaved(false), 3000);
  }

  if (!challenge) return null;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <Header showBack />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Day meta */}
          <View style={styles.meta}>
            <Text style={styles.dayLabel}>Day {challenge.day} · 21-Day Challenge</Text>
            {isCompleted && (
              <View style={styles.doneBadge}>
                <Ionicons name="checkmark" size={11} color={COLORS.primary} />
                <Text style={styles.doneBadgeText}>Complete</Text>
              </View>
            )}
          </View>

          {/* Title */}
          <Text style={styles.title}>{challenge.title}</Text>

          {/* Lesson */}
          <View style={styles.card}>
            <Text style={styles.cardLabel}>Emotional lesson</Text>
            <Text style={styles.cardText}>{challenge.lesson}</Text>
          </View>

          {/* Exercise */}
          <View style={[styles.card, styles.exerciseCard]}>
            <View style={styles.exerciseHeader}>
              <Ionicons name="body-outline" size={16} color={COLORS.primary} />
              <Text style={[styles.cardLabel, styles.exerciseLabel]}>Today's practice</Text>
            </View>
            <Text style={styles.cardText}>{challenge.exercise}</Text>
          </View>

          {/* Reflection prompt */}
          <ReflectionPromptCard prompt={challenge.reflectionPrompt} />

          {/* Notes */}
          <View style={styles.notesSection}>
            <Text style={styles.notesLabel}>Your reflection</Text>
            <TextInput
              style={styles.notesInput}
              placeholder="Write what came up for you today…"
              placeholderTextColor={COLORS.textMuted}
              multiline
              textAlignVertical="top"
              value={reflection}
              onChangeText={(text) => {
                setReflection(text);
                setReflectionSaved(false);
              }}
            />
            <TouchableOpacity
              style={[styles.saveBtn, reflectionSaved && styles.saveBtnDone]}
              onPress={handleSaveReflection}
              activeOpacity={0.75}
            >
              <Text style={[styles.saveBtnText, reflectionSaved && styles.saveBtnTextDone]}>
                {reflectionSaved ? '✓  Saved' : 'Save reflection'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Completion */}
          <CompletionButton isCompleted={isCompleted} onPress={handleMarkComplete} />

          {/* Calm reminder */}
          <View style={styles.reminderWrapper}>
            <CalmReminderCard quote={challenge.quote} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  flex: {
    flex: 1,
  },
  scroll: {
    paddingHorizontal: 24,
    paddingBottom: 56,
    gap: 16,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 8,
  },
  dayLabel: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.3,
    textTransform: 'uppercase',
  },
  doneBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: COLORS.cardElevated,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: COLORS.primary + '55',
  },
  doneBadgeText: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: '600',
  },
  title: {
    color: COLORS.text,
    fontSize: 30,
    fontWeight: '700',
    letterSpacing: -0.6,
    lineHeight: 37,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 10,
  },
  exerciseCard: {
    borderColor: COLORS.primary + '33',
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardLabel: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  exerciseLabel: {
    color: COLORS.primary,
  },
  cardText: {
    color: COLORS.text,
    fontSize: 16,
    lineHeight: 26,
  },
  notesSection: {
    gap: 12,
  },
  notesLabel: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  notesInput: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 18,
    color: COLORS.text,
    fontSize: 15,
    lineHeight: 24,
    minHeight: 130,
  },
  saveBtn: {
    alignSelf: 'flex-end',
    backgroundColor: COLORS.cardElevated,
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  saveBtnDone: {
    borderColor: COLORS.primary + '55',
    backgroundColor: COLORS.card,
  },
  saveBtnText: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  saveBtnTextDone: {
    color: COLORS.primary,
  },
  reminderWrapper: {
    marginTop: 4,
  },
});
