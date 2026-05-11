import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '@/constants/colors';

type Props = {
  completedDays: number[];
  totalDays: number;
};

export function ProgressCard({ completedDays, totalDays }: Props) {
  const completed = completedDays.length;
  const currentDay = Math.min(completed + 1, totalDays);
  const streak = computeStreak(completedDays);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.label}>Progress</Text>
        <Text style={styles.fraction}>
          <Text style={styles.fractionCount}>{completed}</Text>
          <Text style={styles.fractionTotal}> / {totalDays} days</Text>
        </Text>
      </View>

      {/* 21-dot grid: 3 rows × 7 */}
      <View style={styles.dots}>
        {Array.from({ length: totalDays }, (_, i) => {
          const day = i + 1;
          const done = completedDays.includes(day);
          const current = day === currentDay && completed < totalDays;
          return (
            <View
              key={day}
              style={[styles.dot, done && styles.dotDone, current && styles.dotCurrent]}
            />
          );
        })}
      </View>

      {/* Stats */}
      <View style={styles.stats}>
        <Stat value={completed} label="done" color={COLORS.primary} />
        <View style={styles.div} />
        <Stat value={totalDays - completed} label="remaining" color={COLORS.textSecondary} />
        <View style={styles.div} />
        <Stat value={streak} label="streak" color={COLORS.accent} />
      </View>
    </View>
  );
}

function Stat({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <View style={styles.stat}>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function computeStreak(completedDays: number[]): number {
  if (completedDays.length === 0) return 0;
  const sorted = [...completedDays].sort((a, b) => b - a);
  let streak = 0;
  let expected = sorted[0];
  for (const day of sorted) {
    if (day === expected) { streak++; expected--; }
    else break;
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
    marginTop: 8,
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
    fontSize: 15,
    fontWeight: '700',
  },
  fractionTotal: {
    color: COLORS.textMuted,
    fontSize: 13,
  },
  dots: {
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
  stats: {
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
    fontSize: 24,
    fontWeight: '700',
  },
  statLabel: {
    color: COLORS.textMuted,
    fontSize: 11,
    letterSpacing: 0.4,
  },
  div: {
    width: 1,
    height: 36,
    backgroundColor: COLORS.border,
  },
});
