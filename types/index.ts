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
