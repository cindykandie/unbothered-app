import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '@/constants/colors';
import type { Affirmation } from '@/types';

type Props = {
  affirmation: Affirmation;
};

export function AffirmationCard({ affirmation }: Props) {
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
    paddingTop: 4,
    paddingBottom: 24,
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
  },
  text: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 27,
    marginTop: -8,
  },
});
