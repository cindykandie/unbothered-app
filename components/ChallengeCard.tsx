import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';
import type { Challenge } from '@/types';

type Props = {
  challenge: Challenge;
  isDone: boolean;
  onPress?: () => void;
};

export function ChallengeCard({ challenge, isDone, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[styles.card, isDone && styles.cardDone]}
      onPress={onPress}
      activeOpacity={onPress ? 0.75 : 1}
    >
      <View style={styles.top}>
        <Text style={styles.day}>Day {challenge.day}</Text>
        {isDone && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>✓ Done</Text>
          </View>
        )}
      </View>
      <Text style={styles.title}>{challenge.title}</Text>
      <Text style={styles.description}>{challenge.description}</Text>
      {onPress && (
        <View style={styles.readMore}>
          <Text style={styles.readMoreText}>Read & reflect</Text>
          <Ionicons name="arrow-forward" size={14} color={COLORS.primary} />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
    gap: 8,
  },
  cardDone: {
    borderColor: COLORS.primary,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 2,
  },
  day: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.3,
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
  },
  title: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  description: {
    color: COLORS.textSecondary,
    fontSize: 15,
    lineHeight: 23,
  },
  readMore: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
  },
  readMoreText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '500',
  },
});
