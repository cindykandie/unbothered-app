import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';

type Props = {
  challengeTitle: string;
  currentDay: number;
  totalDays: number;
  dayTitle: string;
  completedDays: number;
  onPress: () => void;
};

export function ContinueChallengeCard({
  challengeTitle,
  currentDay,
  totalDays,
  dayTitle,
  completedDays,
  onPress,
}: Props) {
  const pct = Math.round((completedDays / totalDays) * 100);
  const isFinished = completedDays >= totalDays;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.header}>
        <Text style={styles.challengeLabel}>{challengeTitle}</Text>
        {isFinished ? (
          <View style={styles.donePill}>
            <Text style={styles.donePillText}>✓ Complete</Text>
          </View>
        ) : (
          <Text style={styles.dayLabel}>Day {currentDay} of {totalDays}</Text>
        )}
      </View>

      <Text style={styles.dayTitle} numberOfLines={2}>
        {isFinished ? 'Journey complete' : dayTitle}
      </Text>

      <View style={styles.barRow}>
        <View style={styles.barTrack}>
          <View style={[styles.barFill, { width: `${pct}%` as any }]} />
        </View>
        <Ionicons
          name={isFinished ? 'checkmark-circle' : 'arrow-forward-circle-outline'}
          size={22}
          color={COLORS.primary}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 10,
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  challengeLabel: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  dayLabel: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  donePill: {
    backgroundColor: COLORS.primary + '22',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: COLORS.primary + '44',
  },
  donePillText: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: '600',
  },
  dayTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.1,
    lineHeight: 22,
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 2,
  },
  barTrack: {
    flex: 1,
    height: 4,
    backgroundColor: COLORS.cardAlt,
    borderRadius: 2,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
});
