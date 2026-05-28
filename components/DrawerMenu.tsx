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
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, GRADIENTS, RADIUS, SPACING } from '@/constants/colors';

const DRAWER_WIDTH = 290;

type DrawerItem = {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
  accent?: string;
};

const ITEMS: DrawerItem[] = [
  { label: 'Home', icon: 'home-outline', route: '/' },
  { label: 'Challenges', icon: 'grid-outline', route: '/challenges', accent: COLORS.primary },
  { label: 'Return', icon: 'leaf-outline', route: '/return', accent: COLORS.accentWarm },
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
        duration: isOpen ? 300 : 230,
        easing: isOpen ? Easing.out(Easing.cubic) : Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: isOpen ? 0.65 : 0,
        duration: isOpen ? 300 : 230,
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
      <Animated.View style={[StyleSheet.absoluteFill, styles.backdrop, { opacity }]}>
        <TouchableOpacity style={StyleSheet.absoluteFill} onPress={onClose} activeOpacity={1} />
      </Animated.View>

      <Animated.View
        style={[
          styles.panel,
          { paddingTop: insets.top + 20, paddingBottom: insets.bottom + 28 },
          { transform: [{ translateX }] },
        ]}
      >
        <LinearGradient
          colors={['#0F1A35', '#1C2541']}
          style={StyleSheet.absoluteFill}
        />

        {/* Brand */}
        <View style={styles.brand}>
          <Text style={styles.brandSymbol}>✦</Text>
          <Text style={styles.brandName}>You.</Text>
          {userName && <Text style={styles.brandUser}>{userName}</Text>}
        </View>

        <View style={styles.divider} />

        {/* Nav */}
        <View style={styles.nav}>
          {ITEMS.map((item) => {
            const active = pathname === item.route ||
              (item.route !== '/' && pathname.startsWith(item.route));
            const iconColor = active
              ? (item.accent ?? COLORS.primary)
              : COLORS.textSecondary;

            return (
              <TouchableOpacity
                key={item.label}
                style={[styles.navItem, active && styles.navItemActive]}
                onPress={() => navigate(item.route)}
                activeOpacity={0.7}
              >
                {active && (
                  <View
                    style={[
                      styles.activeGlow,
                      { backgroundColor: (item.accent ?? COLORS.primary) + '18' },
                    ]}
                  />
                )}
                <Ionicons name={item.icon} size={20} color={iconColor} />
                <Text style={[styles.navLabel, active && styles.navLabelActive, active && { color: item.accent ?? COLORS.primary }]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Choose peace, every day.</Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: { backgroundColor: '#000' },
  panel: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: DRAWER_WIDTH,
    borderRightWidth: 1,
    borderRightColor: COLORS.border,
    paddingHorizontal: 24,
    overflow: 'hidden',
  },
  brand: {
    marginBottom: 28,
    gap: 5,
  },
  brandSymbol: {
    color: COLORS.accent,
    fontSize: 20,
    marginBottom: 6,
  },
  brandName: {
    color: COLORS.text,
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: -0.4,
  },
  brandUser: {
    color: COLORS.textSecondary,
    fontSize: 14,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginBottom: 20,
  },
  nav: {
    flex: 1,
    gap: 4,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderRadius: RADIUS.md,
    overflow: 'hidden',
  },
  navItemActive: {},
  activeGlow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: RADIUS.md,
  },
  navLabel: {
    color: COLORS.textSecondary,
    fontSize: 16,
    fontWeight: '500',
  },
  navLabelActive: {
    fontWeight: '600',
  },
  footer: {
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  footerText: {
    color: COLORS.textMuted,
    fontSize: 13,
    fontStyle: 'italic',
    letterSpacing: 0.2,
  },
});
