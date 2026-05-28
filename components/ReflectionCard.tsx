import { View, Text, StyleSheet } from 'react-native';
import { COLORS, RADIUS } from '@/constants/colors';

type Props = {
  challengeLabel: string;
  challengeId: 'unbothered' | 'softening';
  day: number;
  text: string;
};

export function ReflectionCard({ challengeLabel, challengeId, day, text }: Props) {
  const accentColor = challengeId === 'unbothered' ? COLORS.primary : COLORS.accent;
  const bgColor = challengeId === 'unbothered'
    ? 'rgba(91,192,190,0.06)'
    : 'rgba(224,164,88,0.06)';
  const borderColor = challengeId === 'unbothered'
    ? 'rgba(91,192,190,0.18)'
    : 'rgba(224,164,88,0.18)';

  return (
    <View style={[styles.card, { backgroundColor: bgColor, borderColor }]}>
      <View style={[styles.accentBar, { backgroundColor: accentColor }]} />
      <View style={styles.inner}>
        <View style={styles.meta}>
          <Text style={[styles.challengeTag, { color: accentColor }]}>{challengeLabel}</Text>
          <Text style={styles.dayTag}>· Day {day}</Text>
        </View>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: RADIUS.lg,
    marginBottom: 12,
    borderWidth: 1,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  accentBar: {
    width: 3,
    opacity: 0.7,
  },
  inner: {
    flex: 1,
    padding: 18,
    gap: 8,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  challengeTag: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.1,
    textTransform: 'uppercase',
  },
  dayTag: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 0.4,
  },
  text: {
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },
});
