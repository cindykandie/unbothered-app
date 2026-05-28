import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, RADIUS } from '@/constants/colors';

type Props = { prompt: string };

export function ReflectionPromptCard({ prompt }: Props) {
  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={['#1D3557', '#162032']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <View style={styles.dot} />
          <Text style={styles.label}>Reflect on this</Text>
        </View>
        <Text style={styles.prompt}>{prompt}</Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(91,192,190,0.15)',
  },
  gradient: {
    padding: 24,
    gap: 14,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.accent,
  },
  label: {
    color: COLORS.accent,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  prompt: {
    color: COLORS.text,
    fontSize: 17,
    lineHeight: 27,
    fontStyle: 'italic',
    letterSpacing: 0.1,
    fontWeight: '400',
  },
});
