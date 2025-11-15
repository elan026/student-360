
import { supabase } from './client';

// =================================================================
// Admin & Faculty Analytics Functions
// =================================================================

/**
 * Fetches overall achievement statistics (verified, pending, rejected).
 * This can be used for both Admin and Faculty dashboards.
 */
export const getOverallStats = async () => {
  const { data, error } = await supabase.rpc('get_overall_achievement_stats');
  if (error) {
    throw new Error(`Error fetching overall stats: ${error.message}`);
  }
  return data;
};

/**
 * Fetches the number of unique students who have submitted achievements over time (e.g., monthly).
 * This is intended for the Admin dashboard.
 */
export const getStudentParticipationOverTime = async () => {
  const { data, error } = await supabase.rpc('get_student_participation_over_time');
  if (error) {
    throw new Error(`Error fetching student participation: ${error.message}`);
  }
  return data;
};

/**
 * Fetches the distribution of achievements across different categories.
 * This can be used for both Admin and Faculty dashboards.
 */
export const getAchievementDistribution = async () => {
  const { data, error } = await supabase.rpc('get_achievement_distribution');
  if (error) {
    throw new Error(`Error fetching achievement distribution: ${error.message}`);
  }
  return data;
};
