import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '@/constants/colors';

type Props = {
  text: string;
  variant?: 'default' | 'accent';
};

export function ReturnCard({ text, variant = 'default' }: Props) {
  return (
    <View style={[styles.card, variant === 'accent' && styles.cardAccent]}>
      <Text style={styles.mark}>—</Text>
      <Text style={[styles.text, variant === 'accent' && styles.textAccent]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 22,
    borderWidth: 1,
    borderColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
  },
  cardAccent: {
    backgroundColor: COLORS.secondary,
    borderColor: 'transparent',
  },
  mark: {
    color: COLORS.accent,
    fontSize: 18,
    fontWeight: '300',
    marginTop: 1,
  },
  text: {
    flex: 1,
    color: COLORS.textSecondary,
    fontSize: 15,
    lineHeight: 24,
    fontStyle: 'italic',
  },
  textAccent: {
    color: COLORS.white,
  },
});
