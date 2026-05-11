import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '@/constants/colors';
import { saveUserName } from '@/utils/storage';

export default function OnboardingScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);

  async function handleContinue() {
    const trimmed = name.trim();
    if (!trimmed || saving) return;
    setSaving(true);
    await saveUserName(trimmed);
    router.replace('/');
  }

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.container}>
          {/* Brand */}
          <View style={styles.brand}>
            <Text style={styles.symbol}>✦</Text>
            <Text style={styles.appName}>Unbothered</Text>
            <Text style={styles.tagline}>
              Your personal emotional{'\n'}regulation companion
            </Text>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Name prompt */}
          <View style={styles.form}>
            <Text style={styles.prompt}>Hi, what should we call you?</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Your name"
              placeholderTextColor={COLORS.textMuted}
              autoCapitalize="words"
              autoCorrect={false}
              returnKeyType="done"
              onSubmitEditing={handleContinue}
            />
            <TouchableOpacity
              style={[styles.btn, !name.trim() && styles.btnDisabled]}
              onPress={handleContinue}
              disabled={!name.trim() || saving}
              activeOpacity={0.8}
            >
              <Text style={styles.btnText}>
                {saving ? 'Saving…' : 'Begin your journey →'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footnote */}
          <Text style={styles.footnote}>
            Your data stays on your device, always.
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  flex: { flex: 1 },
  container: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: 'center',
    gap: 32,
  },
  brand: {
    alignItems: 'center',
    gap: 10,
  },
  symbol: {
    color: COLORS.accent,
    fontSize: 36,
  },
  appName: {
    color: COLORS.text,
    fontSize: 34,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  tagline: {
    color: COLORS.textSecondary,
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginHorizontal: 16,
  },
  form: {
    gap: 16,
  },
  prompt: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 4,
  },
  input: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 20,
    paddingVertical: 16,
    color: COLORS.text,
    fontSize: 17,
    textAlign: 'center',
  },
  btn: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  btnDisabled: {
    opacity: 0.4,
    shadowOpacity: 0,
    elevation: 0,
  },
  btnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  footnote: {
    color: COLORS.textMuted,
    fontSize: 12,
    textAlign: 'center',
  },
});
