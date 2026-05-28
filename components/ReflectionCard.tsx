import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '@/constants/colors';

type Props = {
  challengeLabel: string;
  challengeId: 'unbothered' | 'softening';
  day: number;
  text: string;
};

export function ReflectionCard({ challengeLabel, challengeId, day, text }: Props) {
  const accentColor = challengeId === 'unbothered' ? COLORS.primary : COLORS.accent;

  return (
    <View style={[styles.card, { borderLeftColor: accentColor }]}>
      <View style={styles.meta}>
        <Text style={[styles.challengeTag, { color: accentColor }]}>
          {challengeLabel}
        </Text>
        <Text style={styles.dayTag}>· Day {day}</Text>
      </View>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderLeftWidth: 4,
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
    letterSpacing: 0.5,
  },
  text: {
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 22,
  },
});
