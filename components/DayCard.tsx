import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';
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
      style={[styles.card, isCompleted && styles.cardDone]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      <View style={styles.left}>
        <View style={styles.topRow}>
          <Text style={styles.dayNum}>Day {challenge.day}</Text>
          {isCompleted && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>✓ Complete</Text>
            </View>
          )}
        </View>
        <Text style={styles.title}>{challenge.title}</Text>
        {note ? (
          <Text style={styles.notePreview} numberOfLines={1}>
            {note}
          </Text>
        ) : null}
      </View>
      <Ionicons name="chevron-forward" size={18} color={COLORS.textMuted} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 18,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 12,
  },
  cardDone: {
    borderColor: COLORS.primary,
  },
  left: {
    flex: 1,
    gap: 4,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 2,
  },
  dayNum: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  badge: {
    backgroundColor: COLORS.cardAlt,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeText: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  title: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
  },
  notePreview: {
    color: COLORS.textMuted,
    fontSize: 13,
    fontStyle: 'italic',
    marginTop: 2,
  },
});
