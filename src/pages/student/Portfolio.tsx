
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import { getStudentPortfolio } from '@/integrations/supabase/portfolio';

// Assume we get the student ID from the user's session or props
const MOCK_STUDENT_ID = 'S001';

const getStatusIcon = (status: string) => {
  switch (status) {
    case "verified":
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case "pending":
      return <Clock className="h-5 w-5 text-yellow-500" />;
    case "rejected":
      return <XCircle className="h-5 w-5 text-red-500" />;
    default:
      return null;
  }
};

export default function Portfolio() {
  const [achievements, setAchievements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        const portfolioData = await getStudentPortfolio(MOCK_STUDENT_ID);
        setAchievements(portfolioData);
        setError(null);
      } catch (err) {
        setError('Failed to fetch portfolio. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  if (loading) {
    return <div>Loading portfolio...</div>;
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Portfolio</h1>
        <Button>Share Public Profile</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>My Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-semibold">{achievement.title}</p>
                  <p className="text-sm text-muted-foreground">{achievement.category} - {achievement.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(achievement.status)}
                  <span className="capitalize">{achievement.status}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
