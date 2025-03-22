import { supabase } from './supabase';
import type { TrainerType, UserScore, LearningProgress } from './database.types';

export class DatabaseService {
  private static getGuestKey(trainerType: TrainerType) {
    return `guest_${trainerType}_score`;
  }

  static async getUserScore(userId: string | 'guest', trainerType: TrainerType): Promise<UserScore | null> {
    if (userId === 'guest') {
      const guestData = localStorage.getItem(this.getGuestKey(trainerType));
      if (guestData) {
        return JSON.parse(guestData);
      }
      return null;
    }

    const { data, error } = await supabase
      .from('user_scores')
      .select('*')
      .eq('user_id', userId)
      .eq('trainer_type', trainerType)
      .single();

    if (error) throw error;
    return data;
  }

  static async updateUserScore(userId: string | 'guest', trainerType: TrainerType, score: number, bestStreak: number) {
    if (userId === 'guest') {
      const guestScore: UserScore = {
        user_id: 'guest',
        trainer_type: trainerType,
        score,
        best_streak: bestStreak,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      localStorage.setItem(this.getGuestKey(trainerType), JSON.stringify(guestScore));
      return;
    }

    const { data: existingScore } = await supabase
      .from('user_scores')
      .select('*')
      .eq('user_id', userId)
      .eq('trainer_type', trainerType)
      .single();

    if (!existingScore) {
      const { error } = await supabase
        .from('user_scores')
        .insert([{ user_id: userId, trainer_type: trainerType, score, best_streak: bestStreak }]);
      if (error) throw error;
    } else {
      const { error } = await supabase
        .from('user_scores')
        .update({ score, best_streak: bestStreak })
        .eq('user_id', userId)
        .eq('trainer_type', trainerType);
      if (error) throw error;
    }
  }

  static async getLearningProgress(userId: string | 'guest', trainerType: TrainerType, itemId: string): Promise<LearningProgress | null> {
    if (userId === 'guest') {
      const key = `guest_${trainerType}_progress_${itemId}`;
      const guestData = localStorage.getItem(key);
      if (guestData) {
        return JSON.parse(guestData);
      }
      return null;
    }

    const { data, error } = await supabase
      .from('learning_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('trainer_type', trainerType)
      .eq('item_id', itemId)
      .single();

    if (error) throw error;
    return data;
  }

  static async updateLearningProgress(userId: string | 'guest', trainerType: TrainerType, itemId: string, correctCount: number, incorrectCount: number) {
    if (userId === 'guest') {
      const key = `guest_${trainerType}_progress_${itemId}`;
      const progress: LearningProgress = {
        user_id: 'guest',
        trainer_type: trainerType,
        item_id: itemId,
        correct_count: correctCount,
        incorrect_count: incorrectCount,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      localStorage.setItem(key, JSON.stringify(progress));
      return;
    }

    const { data: existingProgress } = await supabase
      .from('learning_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('trainer_type', trainerType)
      .eq('item_id', itemId)
      .single();

    if (!existingProgress) {
      const { error } = await supabase
        .from('learning_progress')
        .insert([{
          user_id: userId,
          trainer_type: trainerType,
          item_id: itemId,
          correct_count: correctCount,
          incorrect_count: incorrectCount
        }]);
      if (error) throw error;
    } else {
      const { error } = await supabase
        .from('learning_progress')
        .update({
          correct_count: correctCount,
          incorrect_count: incorrectCount,
          updated_at: new Date()
        })
        .eq('user_id', userId)
        .eq('trainer_type', trainerType)
        .eq('item_id', itemId);
      if (error) throw error;
    }
  }

  static async createPracticeSession(
    userId: string,
    trainerType: TrainerType,
    itemsAttempted: number,
    itemsCorrect: number,
    durationSeconds: number
  ): Promise<void> {
    const { error } = await supabase
      .from('practice_sessions')
      .insert([{
        user_id: userId,
        trainer_type: trainerType,
        items_attempted: itemsAttempted,
        items_correct: itemsCorrect,
        session_duration_seconds: durationSeconds
      }]);
    if (error) throw error;
  }

  static async getUserStats(userId: string, trainerType: TrainerType) {
    const { data: score } = await supabase
      .from('user_scores')
      .select('*')
      .eq('user_id', userId)
      .eq('trainer_type', trainerType)
      .single();

    const { data: progress } = await supabase
      .from('learning_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('trainer_type', trainerType);

    const { data: recentSessions } = await supabase
      .from('practice_sessions')
      .select('*')
      .eq('user_id', userId)
      .eq('trainer_type', trainerType)
      .order('created_at', { ascending: false })
      .limit(10);

    return {
      score,
      progress,
      recentSessions
    };
  }

  static async createFlagAttempt(userId: string, flagCode: string, isCorrect: boolean, correctAnswer: string, userAnswer: string) {
    const { data, error } = await supabase
      .from('flag_attempts')
      .insert({
        user_id: userId,
        flag_code: flagCode,
        is_correct: isCorrect,
        attempt_date: new Date().toISOString(),
        correct_answer: correctAnswer,
        user_answer: userAnswer
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async createLanguageAttempt(userId: string, languageCode: string, isCorrect: boolean) {
    const { data, error } = await supabase
      .from('language_attempts')
      .insert({
        user_id: userId,
        language_code: languageCode,
        is_correct: isCorrect,
        attempt_date: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async insertFlagAttempt(
    userId: string,
    flagCode: string,
    isCorrect: boolean,
    correctAnswer: string,
    userAnswer: string
  ): Promise<void> {
    const { error } = await supabase
      .from('flag_attempts')
      .insert([{
        user_id: userId,
        flag_code: flagCode,
        is_correct: isCorrect,
        correct_answer: correctAnswer,
        user_answer: userAnswer
      }]);
    
    if (error) throw error;
  }
}
