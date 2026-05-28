import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import { Header } from '@/components/Header';
import { DrawerMenu } from '@/components/DrawerMenu';
import { ReflectionCard } from '@/components/ReflectionCard';
import { COLORS, GRADIENTS, RADIUS } from '@/constants/colors';
import { getUserName, getCombinedNotes } from '@/utils/storage';
import type { CombinedNote } from '@/utils/storage';

type Filter = 'all' | 'unbothered' | 'softening';

export default function NotesScreen() {
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
      <LinearGradient
        colors={GRADIENTS.screenMain}
        style={StyleSheet.absoluteFill}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
      />

      <Header title="Reflections" onMenuPress={() => setDrawerOpen(true)} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Your Reflections</Text>

        {/* Filter pills */}
        <View style={styles.filterRow}>
          {(['all', 'unbothered', 'softening'] as Filter[]).map((f) => {
            const active = filter === f;
            const color = f === 'unbothered' ? COLORS.primary : f === 'softening' ? COLORS.accent : COLORS.textSecondary;
            return (
              <TouchableOpacity
                key={f}
                style={[styles.pill, active && { borderColor: color + '55', backgroundColor: color + '14' }]}
                onPress={() => setFilter(f)}
                activeOpacity={0.78}
              >
                <Text style={[styles.pillText, active && { color }]}>
                  {f === 'all' ? 'All' : f === 'unbothered' ? 'Unbothered' : 'Softening'}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {filtered.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptySymbol}>◇</Text>
            <Text style={styles.emptyTitle}>Nothing here yet</Text>
            <Text style={styles.emptyBody}>
              Your reflections will appear here as you write them across both journeys.
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
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: -0.4,
    marginTop: 6,
    marginBottom: 20,
    lineHeight: 35,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  pillText: {
    color: COLORS.textMuted,
    fontSize: 13,
    fontWeight: '500',
  },
  empty: {
    marginTop: 70,
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 24,
  },
  emptySymbol: {
    color: COLORS.textMuted,
    fontSize: 30,
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
