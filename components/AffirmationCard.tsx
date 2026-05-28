import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, RADIUS, SHADOWS } from '@/constants/colors';
import type { Affirmation } from '@/types';

type Props = {
  affirmation: Affirmation;
};

export function AffirmationCard({ affirmation }: Props) {
  return (
    <View style={[styles.wrapper, SHADOWS.card]}>
      <LinearGradient
        colors={['#24426B', '#1D3557']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <Text style={styles.text}>{affirmation.text}</Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  gradient: {
    paddingHorizontal: 26,
    paddingTop: 18,
    paddingBottom: 26,
  },
  accentLine: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
    backgroundColor: COLORS.primary,
    opacity: 0.8,
  },
  mark: {
    color: COLORS.primary,
    fontSize: 52,
    lineHeight: 56,
    fontWeight: '700',
  },
  text: {
    color: '#F8F9FA',
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 28,
    marginTop: 2,
    letterSpacing: 0.1,
  },
});
