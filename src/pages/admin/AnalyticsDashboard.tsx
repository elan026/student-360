
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  getOverallStats,
  getStudentParticipationOverTime,
  getAchievementDistribution,
} from '@/integrations/supabase/analytics';

export default function AnalyticsDashboard() {
  const [stats, setStats] = useState<{ [key: string]: number }>({});
  const [participation, setParticipation] = useState<any[]>([]);
  const [distribution, setDistribution] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [statsData, participationData, distributionData] = await Promise.all([
          getOverallStats(),
          getStudentParticipationOverTime(),
          getAchievementDistribution(),
        ]);

        const formattedStats = statsData.reduce((acc, item) => {
          acc[item.status] = item.count;
          return acc;
        }, {} as { [key: string]: number });

        formattedStats.total = statsData.reduce((sum, item) => sum + item.count, 0);

        setStats(formattedStats);
        setParticipation(participationData.map(p => ({ ...p, name: p.month }))); // Map month to name for chart
        setDistribution(distributionData.map(d => ({ ...d, name: d.category }))); // Map category to name for chart
        setError(null);
      } catch (err: any) {
        setError('Failed to fetch analytics data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading analytics...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Analytics Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader><CardTitle>Total Achievements</CardTitle></CardHeader>
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
          <CardHeader><CardTitle>Student Participation Over Time</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={participation}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="student_count" fill="#8884d8" name="Unique Students" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Achievement Distribution by Category</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={distribution} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#82ca9d" name="Achievements"/>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
