import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS, SHADOWS } from '@/constants/colors';

type Props = {
  title: string;
  subtitle: string;
  completedDays: number;
  totalDays: number;
  onPress: () => void;
};

export function ChallengeCard({ title, subtitle, completedDays, totalDays, onPress }: Props) {
  const pct = Math.round((completedDays / totalDays) * 100);
  const isFinished = completedDays >= totalDays;
  const isStarted = completedDays > 0;

  return (
    <TouchableOpacity
      style={[styles.wrapper, SHADOWS.card]}
      onPress={onPress}
      activeOpacity={0.82}
    >
      <LinearGradient
        colors={['rgba(255,255,255,0.07)', 'rgba(255,255,255,0.02)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.top}>
          <View style={styles.topLeft}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
          {isFinished && (
            <View style={styles.finishedBadge}>
              <Ionicons name="checkmark" size={14} color={COLORS.primary} />
            </View>
          )}
        </View>

        {/* Progress bar */}
        <View style={styles.barRow}>
          <View style={styles.barTrack}>
            <LinearGradient
              colors={[COLORS.primary, COLORS.primaryLight]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.barFill, { width: `${Math.max(pct, pct > 0 ? 4 : 0)}%` as any }]}
            />
          </View>
          <Text style={styles.pct}>{pct}%</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerMeta}>
            {completedDays} of {totalDays} days
          </Text>
          <View style={styles.cta}>
            <Text style={[styles.ctaText, { color: COLORS.primary }]}>
              {isFinished ? 'Review' : isStarted ? 'Continue' : 'Begin'}
            </Text>
            <Ionicons name="arrow-forward" size={13} color={COLORS.primary} />
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  gradient: {
    padding: 24,
    gap: 16,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  topLeft: { flex: 1, gap: 5 },
  title: {
    color: COLORS.text,
    fontSize: 19,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 19,
  },
  finishedBadge: {
    width: 30,
    height: 30,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.primaryDim,
    borderWidth: 1,
    borderColor: COLORS.borderAccent,
    alignItems: 'center',
    justifyContent: 'center',
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  barTrack: {
    flex: 1,
    height: 5,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 3,
  },
  pct: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: '600',
    minWidth: 34,
    textAlign: 'right',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  footerMeta: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: '500',
  },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  ctaText: {
    fontSize: 13,
    fontWeight: '600',
  },
});
