
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  getDepartmentalStats,
  getStudentLeaderboard,
  getVerificationTimeliness,
} from '@/integrations/supabase/facultyAnalytics';

// Assume we get the department ID from the user's session or props
const MOCK_DEPARTMENT_ID = 'D001';

export default function FacultyAnalyticsDashboard() {
  const [stats, setStats] = useState<{ [key: string]: number }>({});
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [timeliness, setTimeliness] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [statsData, leaderboardData, timelinessData] = await Promise.all([
          getDepartmentalStats(MOCK_DEPARTMENT_ID),
          getStudentLeaderboard(MOCK_DEPARTMENT_ID),
          getVerificationTimeliness(MOCK_DEPARTMENT_ID),
        ]);

        setStats(statsData);
        setLeaderboard(leaderboardData);
        setTimeliness(timelinessData);
        setError(null);
      } catch (err: any) {
        setError('Failed to fetch faculty analytics data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading faculty analytics...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Faculty & Department Analytics</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader><CardTitle>Department Achievements</CardTitle></CardHeader>
          <CardContent><p className="text-4xl font-bold">{stats.total || 0}</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Verified</CardTitle></CardHeader>
          <CardContent><p className="text-4xl font-bold text-green-500">{stats.verified || 0}</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Pending</CardTitle></CardHeader>
          <CardContent><p className="text-4xl font-bold text-yellow-500">{stats.pending || 0}</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Rejected</CardTitle></CardHeader>
          <CardContent><p className="text-4xl font-bold text-red-500">{stats.rejected || 0}</p></CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Top Performing Students</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {leaderboard.map((student, index) => (
                <li key={index} className="flex justify-between">
                  <span>{student.name}</span>
                  <span className="font-bold">{student.achievements} achievements</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Average Verification Time (Days)</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={timeliness}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="days" fill="#8884d8" name="Avg. Days"/>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
