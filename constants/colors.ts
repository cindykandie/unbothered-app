import { Platform } from 'react-native';

// ─── Core Palette ─────────────────────────────────────────────────────────────
export const COLORS = {
  // Backgrounds
  background: '#0B132B',
  backgroundSecondary: '#1C2541',
  backgroundDeep: '#070E1F',

  // Cards — glassmorphic
  card: 'rgba(255,255,255,0.04)',
  cardElevated: 'rgba(255,255,255,0.07)',
  cardWarm: 'rgba(224,164,88,0.08)',
  cardAccent: 'rgba(91,192,190,0.08)',

  // Borders
  border: 'rgba(255,255,255,0.08)',
  borderWarm: 'rgba(224,164,88,0.25)',
  borderAccent: 'rgba(91,192,190,0.25)',

  // Primary calm teal
  primary: '#5BC0BE',
  primaryLight: '#7DCFCD',
  primaryDim: 'rgba(91,192,190,0.18)',

  // Warm golden accent
  accent: '#E0A458',
  accentDim: 'rgba(224,164,88,0.18)',

  // Soft optional accents
  accentSoft: '#FFB4A2',   // peach
  accentWarm: '#D4A373',   // warm tan
  accentGold: '#E9C46A',   // soft gold

  // Secondary surface (used for reflection/promo cards)
  secondary: '#1D3557',

  // Text
  text: '#F8F9FA',
  textSecondary: '#ADB5BD',
  textMuted: 'rgba(255,255,255,0.32)',

  white: '#ffffff',
};

// ─── Gradient Presets ─────────────────────────────────────────────────────────
export const GRADIENTS = {
  // Screen backgrounds
  screenMain: ['#0B132B', '#1C2541'] as const,
  screenDeep: ['#070E1F', '#0B132B'] as const,
  screenWarm: ['#0B132B', '#1A1A2E'] as const,

  // Card gradients
  cardTeal: ['rgba(91,192,190,0.12)', 'rgba(91,192,190,0.04)'] as const,
  cardWarm: ['rgba(224,164,88,0.12)', 'rgba(224,164,88,0.03)'] as const,
  cardDeep: ['rgba(28,37,65,0.9)', 'rgba(11,19,43,0.95)'] as const,
  cardElevated: ['rgba(255,255,255,0.06)', 'rgba(255,255,255,0.02)'] as const,

  // Affirmation card
  affirmation: ['#1D3557', '#162032'] as const,

  // Return screen
  returnScreen: ['#0B132B', '#1C2541', '#0D1B2A'] as const,

  // Progress fill
  progressFill: ['#5BC0BE', '#7DCFCD'] as const,

  // Warm completion
  completion: ['rgba(224,164,88,0.15)', 'rgba(224,164,88,0.05)'] as const,
};

// ─── Spacing Scale ────────────────────────────────────────────────────────────
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 14,
  lg: 20,
  xl: 28,
  xxl: 40,
  section: 32,
};

// ─── Border Radius Scale ──────────────────────────────────────────────────────
export const RADIUS = {
  sm: 12,
  md: 18,
  lg: 24,
  xl: 30,
  xxl: 36,
  full: 9999,
};

// ─── Shadow Presets ───────────────────────────────────────────────────────────
export const SHADOWS = {
  soft: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.22,
    shadowRadius: 14,
    elevation: 5,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.28,
    shadowRadius: 20,
    elevation: 8,
  },
  glow: (color: string) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 18,
    elevation: 8,
  }),
  glowSoft: (color: string) => ({
    shadowColor: color,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 14,
    elevation: 6,
  }),
};

// ─── Typography Scale ─────────────────────────────────────────────────────────
export const TYPE = {
  label: {
    fontSize: 11,
    fontWeight: '600' as const,
    letterSpacing: 1.5,
    textTransform: 'uppercase' as const,
  },
  caption: {
    fontSize: 13,
    fontWeight: '400' as const,
    lineHeight: 19,
  },
  body: {
    fontSize: 15,
    fontWeight: '400' as const,
    lineHeight: 24,
  },
  bodyMedium: {
    fontSize: 15,
    fontWeight: '500' as const,
    lineHeight: 24,
  },
  titleSm: {
    fontSize: 18,
    fontWeight: '600' as const,
    letterSpacing: -0.2,
  },
  titleMd: {
    fontSize: 22,
    fontWeight: '700' as const,
    letterSpacing: -0.3,
  },
  titleLg: {
    fontSize: 28,
    fontWeight: '700' as const,
    letterSpacing: -0.5,
    lineHeight: 35,
  },
  titleXl: {
    fontSize: 34,
    fontWeight: '700' as const,
    letterSpacing: -0.7,
    lineHeight: 41,
  },
};
