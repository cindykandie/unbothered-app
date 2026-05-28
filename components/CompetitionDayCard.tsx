import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';
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
      style={[
        styles.card,
        isCompleted && styles.cardCompleted,
        isLocked && styles.cardLocked,
      ]}
      onPress={onPress}
      activeOpacity={isLocked ? 1 : 0.75}
      disabled={isLocked}
    >
      <View style={styles.left}>
        <View style={[styles.dayBadge, isCompleted && styles.dayBadgeCompleted]}>
          {isCompleted ? (
            <Ionicons name="checkmark" size={14} color={COLORS.primary} />
          ) : (
            <Text style={[styles.dayNumber, isLocked && styles.dayNumberLocked]}>
              {challenge.day}
            </Text>
          )}
        </View>
      </View>

      <View style={styles.body}>
        <Text style={[styles.title, isLocked && styles.titleLocked]} numberOfLines={1}>
          {challenge.title}
        </Text>
        <Text style={styles.preview} numberOfLines={2}>
          {challenge.exercise}
        </Text>
      </View>

      {!isLocked && (
        <Ionicons
          name="chevron-forward"
          size={16}
          color={isCompleted ? COLORS.primary : COLORS.textMuted}
          style={styles.arrow}
        />
      )}
      {isLocked && (
        <Ionicons name="lock-closed-outline" size={16} color={COLORS.textMuted} style={styles.arrow} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 14,
  },
  cardCompleted: {
    borderColor: COLORS.primary + '55',
    backgroundColor: COLORS.cardAlt,
  },
  cardLocked: {
    opacity: 0.45,
  },
  left: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.cardAlt,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayBadgeCompleted: {
    backgroundColor: COLORS.primary + '22',
    borderColor: COLORS.primary + '66',
  },
  dayNumber: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: '700',
  },
  dayNumberLocked: {
    color: COLORS.textMuted,
  },
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
  titleLocked: {
    color: COLORS.textMuted,
  },
  preview: {
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 18,
  },
  arrow: {
    marginLeft: 4,
  },
});
