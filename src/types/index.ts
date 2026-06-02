export type AppStep = 'landing' | 'questionnaire' | 'save' | 'results';

export type Virtue = 'Sagesse' | 'Courage' | 'Humanité' | 'Justice' | 'Tempérance' | 'Transcendance';

export interface Strength {
  id: string;
  name: string;
  virtue: Virtue;
  icon: string;
  description: string;
  tagline: string;
  actionWork: string;
  actionLife: string;
  color: string;
  lightColor: string;
}

export interface Question {
  id: number;
  text: string;
  strengthId: string;
  reversed: boolean;
}

export type LikertValue = 1 | 2 | 3 | 4 | 5;

export interface Answer {
  questionId: number;
  value: LikertValue;
}

export interface StrengthScore {
  strength: Strength;
  score: number;
  percentile: number;
}

export interface UserProfile {
  firstName: string;
  email: string;
  answers: Answer[];
  scores: StrengthScore[];
  createdAt: string;
}
