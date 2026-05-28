export type Challenge = {
  day: number;
  title: string;
  description: string;
  reflectionPrompt: string;
};

export type Affirmation = {
  id: string;
  text: string;
};

export type UserProfile = {
  name: string;
};

export type UserProgress = {
  completedDays: number[];
};

export type UserNote = {
  challengeDay: number;
  text: string;
};

export type ChallengeDay = {
  day: number;
  title: string;
  description?: string;
  lesson?: string;
  exercise?: string;
  reflectionPrompt: string;
  quote?: string;
};

export type UserReflection = {
  day: number;
  challengeId: 'unbothered' | 'softening';
  challengeTitle: string;
  dayTitle: string;
  text: string;
};

export type CompetitionChallenge = {
  day: number;
  title: string;
  lesson: string;
  exercise: string;
  reflectionPrompt: string;
  quote: string;
};

export type CompetitionProgress = {
  completedDays: number[];
  streak: number;
  lastCompletedDate: string | null;
};

export type CompetitionReflection = {
  day: number;
  text: string;
  savedAt: string;
};
