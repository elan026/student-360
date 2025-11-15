
import { supabase } from "./client";
import type { Database } from "./types";

// =================================================================
// Type Definitions
// =================================================================

export type Achievement = Database["public"]["Tables"]["achievements"]["Row"];
export type AchievementStatus = Database["public"]["Enums"]["achievement_status"];
export type VerificationHistory = Database["public"]["Tables"]["verification_history"]["Row"] & {
  actor: { name: string; role: string; }; // Join actor's name and role
};
export type AppNotification = Database["public"]["Tables"]["notifications"]["Row"];

// =================================================================
// Core API Functions
// =================================================================

/**
 * Fetches achievements based on user role.
 * - Students see their own achievements.
 * - Faculty and Admins see all achievements.
 */
export const getAchievements = async (): Promise<Achievement[]> => {
  const { data, error } = await supabase.from("achievements").select("*");
  if (error) throw new Error(`Error fetching achievements: ${error.message}`);
  return data || [];
};

/**
 * Fetches a single achievement by its ID, along with its verification history.
 * @param achievementId - The UUID of the achievement.
 */
export const getAchievementWithHistory = async (achievementId: string): Promise<{
  achievement: Achievement | null;
  history: VerificationHistory[];
}> => {
  const { data: achievement, error: achievementError } = await supabase
    .from("achievements")
    .select("*")
    .eq("id", achievementId)
    .single();

  if (achievementError) {
    console.error("Error fetching achievement:", achievementError.message);
    return { achievement: null, history: [] };
  }

  const { data: history, error: historyError } = await supabase
    .from("verification_history")
    .select("*, actor:profiles(name, role)")
    .eq("achievement_id", achievementId)
    .order("created_at", { ascending: false });

  if (historyError) {
    console.error("Error fetching verification history:", historyError.message);
  }

  return {
    achievement,
    history: (history as any) || [],
  };
};

/**
 * Calls the server-side function to update an achievement's status.
 * This is the primary function for faculty and admin to verify, reject, or move achievements to 'under_review'.
 * @param achievementId - The UUID of the achievement to update.
 * @param newStatus - The new status to set.
 * @param comment - An optional comment, required for rejections.
 */
export const updateAchievementStatus = async (
  achievementId: string,
  newStatus: AchievementStatus,
  comment?: string
) => {
  const { error } = await supabase.rpc("update_achievement_status", {
    p_achievement_id: achievementId,
    p_new_status: newStatus,
    p_comment: comment,
  });

  if (error) {
    throw new Error(`Error updating achievement status: ${error.message}`);
  }
  return { success: true };
};

/**
 * Allows a student to update the details of their own achievement, but only
 * if the status is 'pending' or 'rejected'.
 * @param achievementId - The UUID of the achievement to update.
 * @param updates - The fields to update (e.g., title, description).
 */
export const updateAchievementDetails = async (
  achievementId: string,
  updates: Partial<Pick<Achievement, "title" | "description" | "category" | "file_url">>
) => {
    const { data, error } = await supabase
        .from('achievements')
        .update(updates)
        .eq('id', achievementId)
        .select()
        .single();

    if (error) {
        throw new Error(`Error updating achievement details: ${error.message}`);
    }
    return data;
}

// =================================================================
// Notification Functions
// =================================================================

/**
 * Fetches all unread notifications for the currently authenticated user.
 */
export const getUnreadNotifications = async (): Promise<AppNotification[]> => {
    const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('is_read', false)
        .order('created_at', { ascending: false });

    if (error) {
        throw new Error(`Error fetching notifications: ${error.message}`);
    }
    return data || [];
};

/**
 * Marks a specific notification as read.
 * @param notificationId - The UUID of the notification to mark as read.
 */
export const markNotificationAsRead = async (notificationId: string) => {
    const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', notificationId);

    if (error) {
        throw new Error(`Error marking notification as read: ${error.message}`);
    }
    return { success: true };
};
