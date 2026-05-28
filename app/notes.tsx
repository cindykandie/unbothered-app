import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { useRouter, useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Header } from '@/components/Header';
import { DrawerMenu } from '@/components/DrawerMenu';
import { ReflectionCard } from '@/components/ReflectionCard';
import { COLORS } from '@/constants/colors';
import { getUserName, getCombinedNotes } from '@/utils/storage';
import type { CombinedNote } from '@/utils/storage';

type Filter = 'all' | 'unbothered' | 'softening';

export default function NotesScreen() {
  const router = useRouter();
  const [userName, setUserName] = useState('');
  const [allNotes, setAllNotes] = useState<CombinedNote[]>([]);
  const [filter, setFilter] = useState<Filter>('all');
  const [drawerOpen, setDrawerOpen] = useState(false);

  async function load() {
    const [name, notes] = await Promise.all([getUserName(), getCombinedNotes()]);
    setUserName(name ?? '');
    setAllNotes(notes);
  }

  useEffect(() => { load(); }, []);
  useFocusEffect(useCallback(() => { load(); }, []));

  const filtered = filter === 'all'
    ? allNotes
    : allNotes.filter((n) => n.challengeId === filter);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <Header title="Reflections" onMenuPress={() => setDrawerOpen(true)} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Your Reflections</Text>

        {/* Filter pills */}
        <View style={styles.filterRow}>
          {(['all', 'unbothered', 'softening'] as Filter[]).map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.filterPill, filter === f && styles.filterPillActive]}
              onPress={() => setFilter(f)}
              activeOpacity={0.75}
            >
              <Text style={[styles.filterPillText, filter === f && styles.filterPillTextActive]}>
                {f === 'all' ? 'All' : f === 'unbothered' ? 'Unbothered' : 'Softening'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {filtered.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptySymbol}>◇</Text>
            <Text style={styles.emptyTitle}>Nothing here yet</Text>
            <Text style={styles.emptyBody}>
              Your reflections will appear here as you write them across both challenges.
            </Text>
          </View>
        ) : (
          filtered.map((entry, i) => (
            <ReflectionCard
              key={`${entry.challengeId}-${entry.day}-${i}`}
              challengeLabel={entry.challengeLabel}
              challengeId={entry.challengeId}
              day={entry.day}
              text={entry.text}
            />
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
  safe: { flex: 1, backgroundColor: COLORS.background },
  scroll: { paddingHorizontal: 24, paddingBottom: 56 },
  heading: {
    color: COLORS.text,
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: -0.3,
    marginTop: 4,
    marginBottom: 20,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  filterPill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterPillActive: {
    backgroundColor: COLORS.primary + '22',
    borderColor: COLORS.primary + '66',
  },
  filterPillText: {
    color: COLORS.textMuted,
    fontSize: 13,
    fontWeight: '500',
  },
  filterPillTextActive: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  empty: {
    marginTop: 60,
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 24,
  },
  emptySymbol: {
    color: COLORS.textMuted,
    fontSize: 32,
    marginBottom: 4,
  },
  emptyTitle: {
    color: COLORS.textSecondary,
    fontSize: 17,
    fontWeight: '600',
  },
  emptyBody: {
    color: COLORS.textMuted,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
  },
});
