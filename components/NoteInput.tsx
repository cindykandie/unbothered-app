import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '@/constants/colors';

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
          {saved ? '✓  Reflection saved' : 'Save reflection'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  label: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 18,
    paddingVertical: 16,
    color: COLORS.text,
    fontSize: 15,
    lineHeight: 22,
    minHeight: 120,
  },
  btn: {
    backgroundColor: COLORS.cardAlt,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  btnSaved: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.card,
  },
  btnText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    fontWeight: '500',
  },
  btnTextSaved: {
    color: COLORS.primary,
  },
});
