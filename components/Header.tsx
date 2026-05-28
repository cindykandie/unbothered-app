import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { COLORS, RADIUS } from '@/constants/colors';
import { Logo } from './Logo';

type Props = {
  title?: string;
  showBack?: boolean;
  onMenuPress?: () => void;
};

export function Header({ title, showBack = false, onMenuPress }: Props) {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.iconBtn}
        onPress={showBack ? () => router.back() : onMenuPress}
        activeOpacity={0.7}
      >
        <Ionicons
          name={showBack ? 'arrow-back' : 'menu'}
          size={22}
          color={COLORS.text}
        />
      </TouchableOpacity>

      {title ? <Text style={styles.title}>{title}</Text> : <View />}

      <Logo />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  iconBtn: {
    width: 42,
    height: 42,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  title: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.1,
  },
});
