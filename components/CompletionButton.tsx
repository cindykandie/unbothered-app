import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/colors';

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
    <TouchableOpacity style={styles.btn} onPress={onPress} activeOpacity={0.82}>
      <Text style={styles.btnText}>Mark Day Complete</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: COLORS.primary,
    borderRadius: 18,
    paddingVertical: 20,
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 14,
    elevation: 6,
  },
  btnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  doneBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: COLORS.card,
    borderRadius: 18,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: COLORS.primary + '66',
  },
  doneText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});
