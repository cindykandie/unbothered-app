import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS, SHADOWS } from '@/constants/colors';

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
    <TouchableOpacity
      style={[styles.wrapper, SHADOWS.card]}
      onPress={onPress}
      activeOpacity={0.82}
    >
      <LinearGradient
        colors={['#1A2744', '#151E38']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Top row */}
        <View style={styles.header}>
          <Text style={styles.challengeLabel}>{challengeTitle}</Text>
          {isFinished ? (
            <View style={styles.donePill}>
              <Ionicons name="checkmark" size={10} color={COLORS.primary} />
              <Text style={styles.donePillText}>Complete</Text>
            </View>
          ) : (
            <View style={styles.dayPill}>
              <Text style={styles.dayCount}>Day {currentDay} · {totalDays}</Text>
            </View>
          )}
        </View>

        {/* Title + arrow */}
        <View style={styles.titleRow}>
          <Text style={styles.dayTitle} numberOfLines={1}>
            {isFinished ? 'Journey complete' : dayTitle}
          </Text>
          <Ionicons
            name={isFinished ? 'checkmark-circle' : 'arrow-forward'}
            size={18}
            color={COLORS.primary}
          />
        </View>

        {/* Progress bar */}
        <View style={styles.barTrack}>
          <LinearGradient
            colors={[COLORS.primary, COLORS.primaryLight]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.barFill, { width: `${Math.max(pct, pct > 0 ? 3 : 0)}%` as any }]}
          />
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
    borderColor: 'rgba(255,255,255,0.1)',
    marginBottom: 12,
  },
  gradient: {
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 20,
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  challengeLabel: {
    color: COLORS.textSecondary,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  dayPill: {
    backgroundColor: 'rgba(91,192,190,0.15)',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: 'rgba(91,192,190,0.25)',
  },
  dayCount: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  donePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(91,192,190,0.15)',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: 'rgba(91,192,190,0.25)',
  },
  donePillText: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: '600',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  dayTitle: {
    flex: 1,
    color: COLORS.text,
    fontSize: 10,
    fontWeight: '400',
    letterSpacing: -0.2,
    lineHeight: 23,
  },
  barTrack: {
    height: 3,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 2,
  },
});
