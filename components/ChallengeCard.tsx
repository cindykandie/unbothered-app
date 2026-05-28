import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';

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

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.top}>
        <View style={styles.topLeft}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        {isFinished && (
          <View style={styles.finishedBadge}>
            <Text style={styles.finishedBadgeText}>✓</Text>
          </View>
        )}
      </View>

      <View style={styles.progressRow}>
        <View style={styles.barTrack}>
          <View style={[styles.barFill, { width: `${pct}%` as any }]} />
        </View>
        <Text style={styles.pct}>{pct}%</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerMeta}>
          {completedDays} of {totalDays} days complete
        </Text>
        <View style={styles.cta}>
          <Text style={styles.ctaText}>
            {isFinished ? 'Review' : completedDays === 0 ? 'Begin' : 'Continue'}
          </Text>
          <Ionicons name="arrow-forward" size={13} color={COLORS.primary} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 22,
    padding: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 4,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  topLeft: {
    flex: 1,
    gap: 5,
  },
  title: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
    lineHeight: 23,
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 19,
  },
  finishedBadge: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: COLORS.primary + '22',
    borderWidth: 1,
    borderColor: COLORS.primary + '55',
    alignItems: 'center',
    justifyContent: 'center',
  },
  finishedBadgeText: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
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
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: '600',
  },
});
