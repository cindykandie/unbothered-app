import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '@/constants/colors';

type Props = {
  prompt: string;
};

export function ReflectionPromptCard({ prompt }: Props) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.symbol}>◆</Text>
        <Text style={styles.label}>Reflect on this</Text>
      </View>
      <Text style={styles.prompt}>{prompt}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.secondary,
    borderRadius: 20,
    padding: 22,
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  symbol: {
    color: COLORS.accent,
    fontSize: 11,
  },
  label: {
    color: COLORS.accent,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  prompt: {
    color: COLORS.white,
    fontSize: 16,
    lineHeight: 26,
    fontStyle: 'italic',
    letterSpacing: 0.1,
  },
});
