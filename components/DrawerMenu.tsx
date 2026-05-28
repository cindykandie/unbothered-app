import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
} from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '@/constants/colors';

const DRAWER_WIDTH = 280;

type DrawerItem = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
};

const ITEMS: DrawerItem[] = [
  { label: 'Home', icon: 'home-outline', route: '/' },
  { label: 'Challenges', icon: 'grid-outline', route: '/challenges' },
  { label: 'Return', icon: 'leaf-outline', route: '/return' },
  { label: 'Notes', icon: 'journal-outline', route: '/notes' },
];

type Props = {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
};

export function DrawerMenu({ isOpen, onClose, userName }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const translateX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isOpen) setMounted(true);
  }, [isOpen]);

  useEffect(() => {
    if (!mounted) return;
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: isOpen ? 0 : -DRAWER_WIDTH,
        duration: isOpen ? 280 : 220,
        easing: isOpen ? Easing.out(Easing.cubic) : Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: isOpen ? 0.6 : 0,
        duration: isOpen ? 280 : 220,
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished && !isOpen) setMounted(false);
    });
  }, [isOpen, mounted]);

  if (!mounted) return null;

  function navigate(route: string) {
    onClose();
    setTimeout(() => router.push(route as any), 50);
  }

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      {/* Backdrop */}
      <Animated.View style={[StyleSheet.absoluteFill, styles.backdrop, { opacity }]}>
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          onPress={onClose}
          activeOpacity={1}
        />
      </Animated.View>

      {/* Panel */}
      <Animated.View
        style={[
          styles.panel,
          { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 24 },
          { transform: [{ translateX }] },
        ]}
      >
        {/* Brand */}
        <View style={styles.brand}>
          <Text style={styles.brandSymbol}>✦</Text>
          <Text style={styles.brandName}>Unbothered</Text>
          {userName && (
            <Text style={styles.brandUser}>{userName}</Text>
          )}
        </View>

        <View style={styles.divider} />

        {/* Navigation items */}
        <View style={styles.nav}>
          {ITEMS.map((item) => {
            const active = pathname === item.route;
            return (
              <TouchableOpacity
                key={item.label}
                style={[styles.navItem, active && styles.navItemActive]}
                onPress={() => navigate(item.route)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={item.icon}
                  size={20}
                  color={active ? COLORS.primary : COLORS.textSecondary}
                />
                <Text style={[styles.navLabel, active && styles.navLabelActive]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Choose peace, every day.
          </Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    backgroundColor: '#000',
  },
  panel: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    backgroundColor: COLORS.card,
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
    paddingHorizontal: 24,
  },
  brand: {
    marginBottom: 24,
    gap: 4,
  },
  brandSymbol: {
    color: COLORS.accent,
    fontSize: 22,
    marginBottom: 4,
  },
  brandName: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  brandUser: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginBottom: 24,
  },
  nav: {
    flex: 1,
    gap: 4,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
  },
  navItemActive: {
    backgroundColor: COLORS.cardAlt,
  },
  navLabel: {
    color: COLORS.textSecondary,
    fontSize: 16,
    fontWeight: '500',
  },
  navLabelActive: {
    color: COLORS.text,
    fontWeight: '600',
  },
  footer: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  footerText: {
    color: COLORS.textMuted,
    fontSize: 13,
    fontStyle: 'italic',
  },
});
