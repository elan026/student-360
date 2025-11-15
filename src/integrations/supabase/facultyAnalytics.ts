
import { supabase } from './client';

// =================================================================
// Faculty-Specific Analytics Functions
// =================================================================

// Mock data for faculty analytics
const mockDepartmentalStats = {
  total: 450,
  verified: 380,
  pending: 50,
  rejected: 20,
};

const mockStudentLeaderboard = [
  { name: 'Viswanathan Anand', achievements: 32 },
  { name: 'Sundar Pichai', achievements: 28 },
  { name: 'A. P. J. Abdul Kalam', achievements: 25 },
  { name: 'Kamal Haasan', achievements: 21 },
  { name: 'Rajinikanth', achievements: 18 },
];

const mockVerificationTimeliness = [
  { month: 'Jan', days: 3.2 },
  { month: 'Feb', days: 2.9 },
  { month: 'Mar', days: 3.5 },
  { month: 'Apr', days: 3.0 },
  { month: 'May', days: 2.8 },
];

// API functions
export const getDepartmentalStats = async (departmentId: string) => {
  console.log(`Using mock getDepartmentalStats for department: ${departmentId}`);
  return Promise.resolve(mockDepartmentalStats);
};

export const getStudentLeaderboard = async (departmentId: string) => {
  console.log(`Using mock getStudentLeaderboard for department: ${departmentId}`);
  return Promise.resolve(mockStudentLeaderboard);
};

export const getVerificationTimeliness = async (departmentId: string) => {
  console.log(`Using mock getVerificationTimeliness for department: ${departmentId}`);
  return Promise.resolve(mockVerificationTimeliness);
};
