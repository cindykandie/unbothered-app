import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, RADIUS, SHADOWS } from '@/constants/colors';

type Props = {
  isCompleted: boolean;
  onPress: () => void;
};

export function CompletionButton({ isCompleted, onPress }: Props) {
  if (isCompleted) {
    return (
      <View style={styles.doneBanner}>
        <Ionicons name="checkmark-circle" size={20} color={COLORS.primary} />
        <Text style={styles.doneText}>Day complete</Text>
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.wrapper, SHADOWS.glow(COLORS.primary)]}
      onPress={onPress}
      activeOpacity={0.84}
    >
      <LinearGradient
        colors={[COLORS.primary, COLORS.primaryLight]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.gradient}
      >
        <Text style={styles.btnText}>Mark Day Complete</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
  },
  gradient: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  btnText: {
    color: COLORS.backgroundDeep,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  doneBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: COLORS.cardAccent,
    borderRadius: RADIUS.lg,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: COLORS.borderAccent,
  },
  doneText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});
