import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '@/constants/colors';
import type { Challenge } from '@/types';

type Props = {
  challenge: Challenge;
  isDone: boolean;
};

export function ChallengeCard({ challenge, isDone }: Props) {
  return (
    <View style={[styles.card, isDone && styles.cardDone]}>
      <View style={styles.topRow}>
        <Text style={styles.dayBadge}>Day {challenge.day}</Text>
        {isDone && <Text style={styles.doneBadge}>✓ Done</Text>}
      </View>
      <Text style={styles.title}>{challenge.title}</Text>
      <Text style={styles.description}>{challenge.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 4,
  },
  cardDone: {
    borderColor: COLORS.primary,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dayBadge: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  doneBadge: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  title: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.3,
    marginBottom: 10,
  },
  description: {
    color: COLORS.textSecondary,
    fontSize: 15,
    lineHeight: 23,
  },
});
