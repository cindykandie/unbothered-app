import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, RADIUS } from '@/constants/colors';

type Props = {
  value: string;
  onChange: (text: string) => void;
  onSave: () => void;
  saved?: boolean;
};

export function NoteInput({ value, onChange, onSave, saved = false }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Your reflection</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder="Write your thoughts here…"
        placeholderTextColor={COLORS.textMuted}
        multiline
        numberOfLines={5}
        textAlignVertical="top"
      />
      <TouchableOpacity
        style={[styles.btn, saved && styles.btnSaved]}
        onPress={onSave}
        activeOpacity={0.8}
      >
        <Text style={[styles.btnText, saved && styles.btnTextSaved]}>
          {saved ? '✓  Saved' : 'Save reflection'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 12 },
  label: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: COLORS.card,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 18,
    paddingVertical: 16,
    color: COLORS.text,
    fontSize: 15,
    lineHeight: 24,
    minHeight: 130,
  },
  btn: {
    backgroundColor: COLORS.cardElevated,
    borderRadius: RADIUS.md,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  btnSaved: {
    borderColor: COLORS.borderAccent,
    backgroundColor: COLORS.cardAccent,
  },
  btnText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: '500',
  },
  btnTextSaved: {
    color: COLORS.primary,
    fontWeight: '600',
  },
});
