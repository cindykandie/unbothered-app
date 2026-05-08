import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '@/constants/colors';
import type { Affirmation } from '@/types';

type Props = {
  affirmation: Affirmation;
};

export function QuoteCard({ affirmation }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.mark}>"</Text>
      <Text style={styles.text}>{affirmation.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardAlt,
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.accent,
  },
  mark: {
    color: COLORS.accent,
    fontSize: 52,
    lineHeight: 56,
    fontWeight: '700',
    marginBottom: -4,
  },
  text: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 27,
  },
});
