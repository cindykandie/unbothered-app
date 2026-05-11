import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Header } from '@/components/Header';
import { DrawerMenu } from '@/components/DrawerMenu';
import { COLORS } from '@/constants/colors';
import { challenges } from '@/constants/challenges';
import { getUserName, getAllNotes } from '@/utils/storage';

type NoteEntry = {
  day: number;
  title: string;
  text: string;
};

export default function NotesScreen() {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [entries, setEntries] = useState<NoteEntry[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    async function load() {
      const [name, allNotes] = await Promise.all([getUserName(), getAllNotes()]);
      setUserName(name ?? '');
      const list = Object.entries(allNotes)
        .filter(([, text]) => text.trim().length > 0)
        .map(([day, text]) => ({
          day: parseInt(day),
          title: challenges[parseInt(day) - 1]?.title ?? '',
          text,
        }))
        .sort((a, b) => a.day - b.day);
      setEntries(list);
    }
    load();
  }, []);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <Header title="Reflections" onMenuPress={() => setDrawerOpen(true)} />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.heading}>Your Reflections</Text>

        {entries.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptySymbol}>◇</Text>
            <Text style={styles.emptyTitle}>Nothing here yet</Text>
            <Text style={styles.emptyBody}>
              Your reflections will appear here as you write them on each challenge day.
            </Text>
          </View>
        ) : (
          entries.map((entry) => (
            <View key={entry.day} style={styles.card}>
              <Text style={styles.cardDay}>Day {entry.day}</Text>
              <Text style={styles.cardTitle}>{entry.title}</Text>
              <Text style={styles.cardText}>{entry.text}</Text>
            </View>
          ))
        )}
      </ScrollView>

      <DrawerMenu
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        userName={userName}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    paddingHorizontal: 24,
    paddingBottom: 48,
  },
  heading: {
    color: COLORS.text,
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: -0.3,
    marginTop: 4,
    marginBottom: 24,
  },
  empty: {
    marginTop: 60,
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 24,
  },
  emptySymbol: {
    color: COLORS.textMuted,
    fontSize: 36,
    marginBottom: 4,
  },
  emptyTitle: {
    color: COLORS.textSecondary,
    fontSize: 18,
    fontWeight: '600',
  },
  emptyBody: {
    color: COLORS.textMuted,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 18,
    padding: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.accent,
    gap: 6,
  },
  cardDay: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  cardTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
  },
  cardText: {
    color: COLORS.textSecondary,
    fontSize: 14,
    lineHeight: 22,
    marginTop: 4,
  },
});
