export type TrainerType = 'language' | 'flag';

export interface UserScore {
  id: string;
  user_id: string;
  trainer_type: TrainerType;
  score: number;
  best_streak: number;
  total_attempts: number;
  correct_attempts: number;
  created_at: string;
  updated_at: string;
}

export interface LearningProgress {
  id: string;
  user_id: string;
  trainer_type: TrainerType;
  item_id: string;
  correct_attempts: number;
  wrong_attempts: number;
  last_attempt_at: string;
  created_at: string;
  updated_at: string;
}

export interface FlagAttempt {
  id: string;
  user_id: string;
  flag_code: string;
  is_correct: boolean;
  attempt_date: string;
  correct_answer: string;
  user_answer: string;
  created_at: string;
}

export interface LanguageAttempt {
  id: string;
  user_id: string;
  language_code: string;
  is_correct: boolean;
  attempt_date: string;
  created_at: string;
}

export interface PracticeSession {
  id: string;
  user_id: string;
  trainer_type: TrainerType;
  start_time: string;
  end_time: string | null;
  total_attempts: number;
  correct_attempts: number;
  created_at: string;
  updated_at: string;
}
