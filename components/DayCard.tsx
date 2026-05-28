import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS, SHADOWS } from '@/constants/colors';
import type { Challenge } from '@/types';

type Props = {
  challenge: Challenge;
  isCompleted: boolean;
  note?: string;
  onPress: () => void;
};

export function DayCard({ challenge, isCompleted, note, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[styles.card, isCompleted && styles.cardDone, SHADOWS.soft]}
      onPress={onPress}
      activeOpacity={0.78}
    >
      <View style={[styles.dayBadge, isCompleted && styles.dayBadgeDone]}>
        {isCompleted
          ? <Ionicons name="checkmark" size={14} color={COLORS.primary} />
          : <Text style={styles.dayNum}>{challenge.day}</Text>
        }
      </View>

      <View style={styles.body}>
        <Text style={styles.title}>{challenge.title}</Text>
        {note ? (
          <Text style={styles.notePreview} numberOfLines={1}>{note}</Text>
        ) : null}
      </View>

      <Ionicons name="chevron-forward" size={16} color={COLORS.textMuted} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: 18,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 14,
  },
  cardDone: {
    borderColor: 'rgba(91,192,190,0.22)',
    backgroundColor: COLORS.cardAccent,
  },
  dayBadge: {
    width: 38,
    height: 38,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.cardElevated,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayBadgeDone: {
    backgroundColor: COLORS.primaryDim,
    borderColor: COLORS.borderAccent,
  },
  dayNum: {
    color: COLORS.textSecondary,
    fontSize: 13,
    fontWeight: '700',
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
  notePreview: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 1,
  },
});
