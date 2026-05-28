import { View, Text, StyleSheet } from 'react-native';
import { COLORS, RADIUS } from '@/constants/colors';

type Props = {
  text: string;
  variant?: 'default' | 'accent';
};

export function ReturnCard({ text, variant = 'default' }: Props) {
  const isAccent = variant === 'accent';
  return (
    <View style={[styles.card, isAccent && styles.cardAccent]}>
      <View style={[styles.bar, isAccent && styles.barAccent]} />
      <Text style={[styles.text, isAccent && styles.textAccent]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    overflow: 'hidden',
  },
  cardAccent: {
    backgroundColor: 'rgba(91,192,190,0.07)',
    borderColor: 'rgba(91,192,190,0.18)',
  },
  bar: {
    width: 3,
    alignSelf: 'stretch',
    backgroundColor: COLORS.accent,
    borderRadius: 2,
    opacity: 0.7,
  },
  barAccent: {
    backgroundColor: COLORS.primary,
    opacity: 0.8,
  },
  text: {
    flex: 1,
    color: COLORS.textSecondary,
    fontSize: 15,
    lineHeight: 24,
    fontStyle: 'italic',
  },
  textAccent: {
    color: COLORS.text,
  },
});
