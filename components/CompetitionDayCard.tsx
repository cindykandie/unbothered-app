import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS } from '@/constants/colors';
import type { CompetitionChallenge } from '@/types';

type Props = {
  challenge: CompetitionChallenge;
  isCompleted: boolean;
  isLocked: boolean;
  onPress: () => void;
};

export function CompetitionDayCard({ challenge, isCompleted, isLocked, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[styles.card, isCompleted && styles.cardCompleted, isLocked && styles.cardLocked]}
      onPress={onPress}
      activeOpacity={isLocked ? 1 : 0.78}
      disabled={isLocked}
    >
      <View style={[styles.badge, isCompleted && styles.badgeDone]}>
        {isCompleted
          ? <Ionicons name="checkmark" size={14} color={COLORS.primary} />
          : <Text style={[styles.badgeNum, isLocked && styles.badgeNumLocked]}>
              {challenge.day}
            </Text>
        }
      </View>

      <View style={styles.body}>
        <Text style={[styles.title, isLocked && styles.titleLocked]} numberOfLines={1}>
          {challenge.title}
        </Text>
        <Text style={styles.preview} numberOfLines={2}>
          {challenge.exercise}
        </Text>
      </View>

      <Ionicons
        name={isLocked ? 'lock-closed-outline' : 'chevron-forward'}
        size={15}
        color={COLORS.textMuted}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 14,
  },
  cardCompleted: {
    backgroundColor: COLORS.cardAccent,
    borderColor: 'rgba(91,192,190,0.2)',
  },
  cardLocked: { opacity: 0.4 },
  badge: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.cardElevated,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeDone: {
    backgroundColor: COLORS.primaryDim,
    borderColor: COLORS.borderAccent,
  },
  badgeNum: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: '700',
  },
  badgeNumLocked: { color: COLORS.textMuted },
  body: {
    flex: 1,
    gap: 4,
  },
  title: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: -0.1,
  },
  titleLocked: { color: COLORS.textMuted },
  preview: {
    color: COLORS.textSecondary,
    fontSize: 12,
    lineHeight: 17,
  },
});
