import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, RADIUS, SHADOWS } from '@/constants/colors';

type Props = {
  completedDays: number[];
  totalDays: number;
  streak: number;
};

export function ProgressTracker({ completedDays, totalDays, streak }: Props) {
  const count = completedDays.length;
  const percent = Math.round((count / totalDays) * 100);

  return (
    <View style={[styles.card, SHADOWS.soft]}>
      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={[styles.statValue, { color: COLORS.primary }]}>{count}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.stat}>
          <Text style={styles.statValue}>{totalDays - count}</Text>
          <Text style={styles.statLabel}>Remaining</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.stat}>
          <Text style={[styles.statValue, { color: COLORS.accent }]}>{streak}</Text>
          <Text style={styles.statLabel}>Streak</Text>
        </View>
      </View>

      {/* Progress bar */}
      <View style={styles.barTrack}>
        <LinearGradient
          colors={[COLORS.primary, COLORS.primaryLight]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.barFill, { width: `${percent}%` as any }]}
        />
      </View>
      <Text style={styles.percent}>{percent}%</Text>

      {/* Dot grid */}
      <View style={styles.dotGrid}>
        {Array.from({ length: totalDays }, (_, i) => {
          const done = completedDays.includes(i + 1);
          return done ? (
            <LinearGradient
              key={i}
              colors={[COLORS.primary, COLORS.primaryLight]}
              style={styles.dot}
            />
          ) : (
            <View key={i} style={[styles.dot, styles.dotEmpty]} />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.xl,
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
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 3,
  },
  percent: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: -8,
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
  },
  dotEmpty: {
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
});
