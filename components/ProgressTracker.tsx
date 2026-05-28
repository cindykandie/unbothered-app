import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '@/constants/colors';

type Props = {
  completedDays: number[];
  totalDays: number;
  streak: number;
};

export function ProgressTracker({ completedDays, totalDays, streak }: Props) {
  const count = completedDays.length;
  const percent = Math.round((count / totalDays) * 100);

  return (
    <View style={styles.card}>
      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{count}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.stat}>
          <Text style={styles.statValue}>{totalDays - count}</Text>
          <Text style={styles.statLabel}>Remaining</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.stat}>
          <Text style={styles.statValue}>{streak}</Text>
          <Text style={styles.statLabel}>Day streak</Text>
        </View>
      </View>

      <View style={styles.barTrack}>
        <View style={[styles.barFill, { width: `${percent}%` as any }]} />
      </View>

      <Text style={styles.percent}>{percent}% complete</Text>

      <View style={styles.dotGrid}>
        {Array.from({ length: totalDays }, (_, i) => {
          const done = completedDays.includes(i + 1);
          return <View key={i} style={[styles.dot, done && styles.dotDone]} />;
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 16,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  statValue: {
    color: COLORS.text,
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  statLabel: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  divider: {
    width: 1,
    height: 36,
    backgroundColor: COLORS.border,
  },
  barTrack: {
    height: 5,
    backgroundColor: COLORS.cardAlt,
    borderRadius: 3,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },
  percent: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  dotGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.cardAlt,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  dotDone: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
});
