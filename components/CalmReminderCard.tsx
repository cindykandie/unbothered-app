import { View, Text, StyleSheet } from 'react-native';
import { COLORS, RADIUS } from '@/constants/colors';

type Props = { quote: string };

export function CalmReminderCard({ quote }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.quote}>{quote}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardWarm,
    borderRadius: RADIUS.xl,
    padding: 24,
    borderWidth: 1,
    borderColor: COLORS.borderWarm,
    gap: 8,
  },
  quote: {
    color: COLORS.textSecondary,
    fontSize: 15,
    lineHeight: 25,
    fontStyle: 'italic',
    letterSpacing: 0.1,
  },
});
