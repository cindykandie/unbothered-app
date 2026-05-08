export type Challenge = {
  day: number;
  title: string;
  description: string;
};

export type Affirmation = {
  id: string;
  text: string;
};

export type Progress = {
  completedDays: number[];
};
