import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '@/constants/colors';

type Props = {
  quote: string;
};

export function CalmReminderCard({ quote }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.mark}>"</Text>
      <Text style={styles.quote}>{quote}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 24,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.accent,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 8,
  },
  mark: {
    color: COLORS.accent,
    fontSize: 36,
    lineHeight: 30,
    fontWeight: '700',
    opacity: 0.6,
  },
  quote: {
    color: COLORS.textSecondary,
    fontSize: 15,
    lineHeight: 24,
    fontStyle: 'italic',
    letterSpacing: 0.1,
  },
});
