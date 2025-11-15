
import { supabase } from './client';
import type { Achievement } from './types';

// =================================================================
// Student Portfolio & Public Profile Functions
// =================================================================

/**
 * Fetches all achievements for a specific student, regardless of status.
 * This is intended for the student's own portfolio view.
 * @param studentId - The UUID of the student.
 */
export const getStudentPortfolio = async (studentId: string): Promise<Achievement[]> => {
  const { data, error } = await supabase
    .from('achievements')
    .select('*')
    .eq('student_id', studentId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Error fetching student portfolio: ${error.message}`);
  }
  return data || [];
};

/**
 * Fetches the public profile of a student, including their name, bio, avatar, and ONLY verified achievements.
 * @param userId - The UUID of the user whose public profile is being fetched.
 */
export const getPublicProfile = async (userId: string) => {
  // Fetch profile and verified achievements in parallel
  const [profileRes, achievementsRes] = await Promise.all([
    supabase.from('profiles').select('name, bio, avatar_url').eq('id', userId).single(),
    supabase
      .from('achievements')
      .select('id, title, description, category, file_url, created_at')
      .eq('student_id', userId)
      .eq('status', 'verified')
      .order('created_at', { ascending: false }),
  ]);

  if (profileRes.error) {
    throw new Error(`Error fetching public profile: ${profileRes.error.message}`);
  }

  if (achievementsRes.error) {
    throw new Error(`Error fetching verified achievements: ${achievementsRes.error.message}`);
  }

  return {
    ...(profileRes.data || {}),
    achievements: achievementsRes.data || [],
  };
};
