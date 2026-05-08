import type { Affirmation } from '@/types';

export const affirmations: Affirmation[] = [
  { id: '1', text: 'I am allowed to take up space.' },
  { id: '2', text: 'My peace is not negotiable.' },
  { id: '3', text: 'I am doing enough. I am enough.' },
  { id: '4', text: 'I choose what deserves my energy.' },
  { id: '5', text: 'My feelings are valid and worth honoring.' },
  { id: '6', text: 'Rest is productive. Rest is necessary.' },
  { id: '7', text: 'I release what I cannot control.' },
  { id: '8', text: 'I am worthy of love without having to earn it.' },
  { id: '9', text: 'I trust the pace of my own journey.' },
  { id: '10', text: 'I am allowed to change my mind.' },
  { id: '11', text: 'My needs matter and deserve to be met.' },
  { id: '12', text: 'I am not responsible for managing other people\'s emotions.' },
  { id: '13', text: 'Healing is not linear and that is okay.' },
  { id: '14', text: 'I am becoming who I am meant to be.' },
  { id: '15', text: 'Today I choose softness over struggle.' },
  { id: '16', text: 'Not everything deserves a reaction.' },
  { id: '17', text: 'I give myself permission to rest.' },
  { id: '18', text: 'My calm is my power.' },
  { id: '19', text: 'I don\'t have to fix everything today.' },
  { id: '20', text: 'I am safe in this present moment.' },
];

export function getDailyAffirmation(): Affirmation {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  return affirmations[seed % affirmations.length];
}

export function getRandomAffirmation(): Affirmation {
  return affirmations[Math.floor(Math.random() * affirmations.length)];
}
