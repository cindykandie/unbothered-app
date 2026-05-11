import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { COLORS } from '@/constants/colors';

export function Logo() {
  const router = useRouter();
  const pathname = usePathname();

  function handlePress() {
    if (pathname !== '/') router.push('/');
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.65}
      style={styles.touch}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    >
      <Text style={styles.word}>
        You<Text style={styles.period}>.</Text>
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touch: {
    width: 64,
    alignItems: 'flex-end',
  },
  word: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: '300',
    fontStyle: 'italic',
    letterSpacing: 1.5,
  },
  period: {
    color: COLORS.accent,   // #b2967d — warm, intentional
    fontWeight: '600',
  },
});
