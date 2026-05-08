import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '@/constants/colors';

type Props = {
  completedDays: number[];
  totalDays: number;
};

export function ProgressCard({ completedDays, totalDays }: Props) {
  const completed = completedDays.length;
  const currentDay = Math.min(completed + 1, totalDays);
  const streakDays = computeStreak(completedDays, totalDays);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.label}>Progress</Text>
        <Text style={styles.fraction}>
          <Text style={styles.fractionCount}>{completed}</Text>
          <Text style={styles.fractionTotal}> / {totalDays}</Text>
        </Text>
      </View>

      {/* 21-dot grid: 3 rows × 7 */}
      <View style={styles.dotGrid}>
        {Array.from({ length: totalDays }, (_, i) => {
          const day = i + 1;
          const done = completedDays.includes(day);
          const isCurrent = day === currentDay && completed < totalDays;
          return (
            <View
              key={day}
              style={[
                styles.dot,
                done && styles.dotDone,
                isCurrent && styles.dotCurrent,
              ]}
            />
          );
        })}
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{completed}</Text>
          <Text style={styles.statLabel}>days done</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.stat}>
          <Text style={styles.statValue}>{totalDays - completed}</Text>
          <Text style={styles.statLabel}>remaining</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.stat}>
          <Text style={styles.statValue}>{streakDays}</Text>
          <Text style={styles.statLabel}>streak</Text>
        </View>
      </View>
    </View>
  );
}

function computeStreak(completedDays: number[], total: number): number {
  const sorted = [...completedDays].sort((a, b) => b - a);
  if (sorted.length === 0) return 0;
  let streak = 0;
  let expected = Math.min(sorted[0], total);
  for (const day of sorted) {
    if (day === expected) {
      streak++;
      expected--;
    } else {
      break;
    }
  }
  return streak;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  fraction: {},
  fractionCount: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '700',
  },
  fractionTotal: {
    color: COLORS.textMuted,
    fontSize: 14,
  },
  dotGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  dot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.cardAlt,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  dotDone: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  dotCurrent: {
    borderColor: COLORS.accent,
    borderWidth: 2,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    gap: 3,
  },
  statValue: {
    color: COLORS.text,
    fontSize: 24,
    fontWeight: '700',
  },
  statLabel: {
    color: COLORS.textMuted,
    fontSize: 11,
    letterSpacing: 0.5,
  },
  statDivider: {
    width: 1,
    height: 36,
    backgroundColor: COLORS.border,
  },
});
