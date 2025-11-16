import { supabase } from "./client";

export interface StudentCSVRow {
  student_id: string;
  name: string;
  register_no: string;
  department: string;
  year: string;
  section: string;
  email: string;
  phone: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  role: "student";
  phone?: string;
  register_no?: string;
  department?: string;
  year?: string;
  section?: string;
}

/**
 * Parse CSV text data into an array of student objects
 */
export const parseStudentCSV = (csvText: string): StudentCSVRow[] => {
  const lines = csvText.trim().split("\n");
  const headers = lines[0].split(",").map((h) => h.trim());

  return lines.slice(1).map((line) => {
    const values = line.split(",").map((v) => v.trim());
    const row: Record<string, string> = {};

    headers.forEach((header, index) => {
      row[header] = values[index] || "";
    });

    return row as StudentCSVRow;
  });
};

/**
 * Convert CSV student data to profile format for database insertion
 */
export const convertToStudentProfile = (csvRow: StudentCSVRow): StudentProfile => {
  return {
    id: csvRow.student_id,
    name: csvRow.name,
    email: csvRow.email,
    role: "student" as const,
    phone: csvRow.phone,
    register_no: csvRow.register_no,
    department: csvRow.department,
    year: csvRow.year,
    section: csvRow.section,
  };
};

/**
 * Bulk insert students into the database
 * Note: The profiles table needs to be updated to include phone, register_no, department, year, section fields
 * Or we can use JSON storage for additional fields
 */
export const importStudents = async (csvText: string): Promise<{ success: number; failed: number; errors: string[] }> => {
  try {
    const csvRows = parseStudentCSV(csvText);
    const profiles = csvRows.map(convertToStudentProfile);

    // Insert in batches of 100 to avoid timeout
    const batchSize = 100;
    let successCount = 0;
    let failedCount = 0;
    const errors: string[] = [];

    for (let i = 0; i < profiles.length; i += batchSize) {
      const batch = profiles.slice(i, i + batchSize);

      const { error } = await supabase.from("profiles").upsert(
        batch.map((profile) => ({
          id: profile.id,
          name: profile.name,
          email: profile.email,
          role: profile.role,
          avatar_url: null,
        })),
        { onConflict: "id" }
      );

      if (error) {
        failedCount += batch.length;
        errors.push(`Batch ${i / batchSize + 1}: ${error.message}`);
      } else {
        successCount += batch.length;
      }
    }

    return { success: successCount, failed: failedCount, errors };
  } catch (error) {
    console.error("Error importing students:", error);
    throw error;
  }
};

/**
 * Get all students with their achievement counts
 */
export const getAllStudents = async () => {
  try {
    const { data: profiles, error: profileError } = await supabase
      .from("profiles")
      .select("id, name, email, role")
      .eq("role", "student")
      .order("name", { ascending: true });

    if (profileError) {
      throw new Error(`Error fetching students: ${profileError.message}`);
    }

    if (!profiles || profiles.length === 0) {
      return [];
    }

    // Get achievement counts for each student
    const { data: achievements, error: achievementError } = await supabase
      .from("achievements")
      .select("student_id, status");

    if (achievementError) {
      console.error("Error fetching achievements:", achievementError.message);
    }

    // Count achievements per student
    const achievementCounts = new Map<string, { total: number; verified: number }>();

    if (achievements) {
      achievements.forEach((achievement) => {
        const current = achievementCounts.get(achievement.student_id) || { total: 0, verified: 0 };
        current.total++;
        if (achievement.status === "verified") {
          current.verified++;
        }
        achievementCounts.set(achievement.student_id, current);
      });
    }

    // Combine profile and achievement data
    return profiles.map((profile) => {
      const counts = achievementCounts.get(profile.id) || { total: 0, verified: 0 };
      return {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        totalAchievements: counts.total,
        verifiedAchievements: counts.verified,
      };
    });
  } catch (error) {
    console.error("Error getting students:", error);
    throw error;
  }
};

/**
 * Search students by name, email, or ID
 */
export const searchStudents = async (query: string) => {
  try {
    const { data: profiles, error } = await supabase
      .from("profiles")
      .select("id, name, email, role")
      .eq("role", "student")
      .or(`name.ilike.%${query}%,email.ilike.%${query}%,id.ilike.%${query}%`)
      .order("name", { ascending: true })
      .limit(50);

    if (error) {
      throw new Error(`Error searching students: ${error.message}`);
    }

    if (!profiles || profiles.length === 0) {
      return [];
    }

    // Get achievement counts
    const { data: achievements } = await supabase
      .from("achievements")
      .select("student_id, status");

    const achievementCounts = new Map<string, { total: number; verified: number }>();

    if (achievements) {
      achievements.forEach((achievement) => {
        const current = achievementCounts.get(achievement.student_id) || { total: 0, verified: 0 };
        current.total++;
        if (achievement.status === "verified") {
          current.verified++;
        }
        achievementCounts.set(achievement.student_id, current);
      });
    }

    return profiles.map((profile) => {
      const counts = achievementCounts.get(profile.id) || { total: 0, verified: 0 };
      return {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        totalAchievements: counts.total,
        verifiedAchievements: counts.verified,
      };
    });
  } catch (error) {
    console.error("Error searching students:", error);
    throw error;
  }
};
