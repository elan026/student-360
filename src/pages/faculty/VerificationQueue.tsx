
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAchievements, Achievement } from "@/integrations/supabase/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export function VerificationQueue() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQueue = async () => {
      try {
        setLoading(true);
        const allAchievements = await getAchievements();
        // Filter for achievements needing review
        const pendingReview = allAchievements.filter(
          (a) => a.status === "pending" || a.status === "under_review"
        );
        setAchievements(pendingReview);
      } catch (error: any) {
        toast({
          title: "Error fetching verification queue",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchQueue();
  }, [toast]);

  const handleRowClick = (achievementId: string) => {
    navigate(`/faculty/review/${achievementId}`);
  };

  const getStatusVariant = (status: Achievement['status']) => {
    switch (status) {
      case "pending":
        return "default";
      case "under_review":
        return "secondary";
      case "verified":
        return "success";
      case "rejected":
        return "destructive";
      default:
        return "outline";
    }
  };


  if (loading) {
    return <div>Loading achievements...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Verification Queue</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Submitted On</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {achievements.length > 0 ? (
              achievements.map((achievement) => (
                <TableRow
                  key={achievement.id}
                  onClick={() => handleRowClick(achievement.id)}
                  className="cursor-pointer hover:bg-muted/50"
                >
                  <TableCell className="font-medium">{achievement.title}</TableCell>
                  <TableCell>{achievement.category}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(achievement.status)}>
                      {achievement.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(achievement.created_at).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No achievements are currently pending review.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
