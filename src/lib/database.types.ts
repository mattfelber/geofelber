Need to install the following packages:
supabase@2.15.8

export type TrainerType = 'language' | 'flag';

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
