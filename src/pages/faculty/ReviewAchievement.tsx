
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAchievementWithHistory, updateAchievementStatus, Achievement, VerificationHistory, AchievementStatus } from "@/integrations/supabase/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function ReviewAchievement() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [achievement, setAchievement] = useState<Achievement | null>(null);
  const [history, setHistory] = useState<VerificationHistory[]>([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchDetails = async () => {
      try {
        setLoading(true);
        const { achievement: fetchedAchievement, history: fetchedHistory } = await getAchievementWithHistory(id);
        setAchievement(fetchedAchievement);
        setHistory(fetchedHistory as any);
      } catch (error: any) {
        toast({ title: "Error fetching details", description: error.message, variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id, toast]);

  const handleStatusUpdate = async (newStatus: AchievementStatus) => {
    if (!id) return;

    if (newStatus === 'rejected' && !comment.trim()) {
        toast({ title: "Rejection requires a comment", variant: "destructive" });
        return;
    }

    setIsSubmitting(true);
    try {
        await updateAchievementStatus(id, newStatus, comment);
        toast({ title: "Status updated successfully", description: `The achievement has been ${newStatus}.` });
        navigate("/faculty/queue");
    } catch (error: any) {
        toast({ title: "Error updating status", description: error.message, variant: "destructive" });
    } finally {
        setIsSubmitting(false);
    }
  };
  
  // A helper to decide the next primary action for the faculty member
  const getNextAction = (): { action: AchievementStatus, label: string } | null => {
    if (!achievement) return null;
    switch(achievement.status) {
        case 'pending':
            return { action: 'under_review', label: 'Start Review' };
        case 'under_review':
            return { action: 'verified', label: 'Approve' };
        default:
            return null;
    }
  }

  const primaryAction = getNextAction();

  if (loading) return <div>Loading achievement details...</div>;
  if (!achievement) return <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>Achievement not found.</AlertDescription></Alert>;

  const isLocked = achievement.status === 'verified';

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
                <div>
                    <CardTitle>{achievement.title}</CardTitle>
                    <CardDescription>Category: {achievement.category}</CardDescription>
                </div>
                <Badge variant={achievement.status === 'verified' ? 'success' : achievement.status === 'rejected' ? 'destructive' : 'secondary'}>
                    {achievement.status}
                </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{achievement.description || "No description provided."}</p>
            {achievement.file_url && (
              <a href={achievement.file_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                View Attached File
              </a>
            )}
          </CardContent>
          <CardFooter>
            <div className="w-full">
                <Label htmlFor="comment">Your Comment</Label>
                <Textarea 
                    id="comment"
                    value={comment} 
                    onChange={(e) => setComment(e.target.value)} 
                    placeholder="Provide feedback or reasons for your decision..." 
                    disabled={isLocked || isSubmitting}
                />
                <div className="flex justify-end gap-2 mt-4">
                    {primaryAction && !isLocked && (
                        <Button 
                            onClick={() => handleStatusUpdate(primaryAction.action)} 
                            disabled={isSubmitting}
                        >
                            {primaryAction.label}
                        </Button>
                    )}
                    {achievement.status === 'under_review' && !isLocked && (
                        <Button 
                            variant="destructive" 
                            onClick={() => handleStatusUpdate('rejected')} 
                            disabled={isSubmitting}
                        >
                            Reject
                        </Button>
                    )}
                </div>
            </div>
          </CardFooter>
        </Card>
      </div>

      <div className="md:col-span-1">
        <Card>
            <CardHeader>
                <CardTitle>Verification History</CardTitle>
            </CardHeader>
            <CardContent>
                {history.length > 0 ? (
                    <ul className="space-y-4">
                        {history.map(entry => (
                            <li key={entry.id} className="border-l-2 pl-4">
                                <p className="font-semibold">{entry.to_status}</p>
                                <p className="text-sm text-muted-foreground">
                                    by {entry.actor?.name || 'System'} ({entry.actor?.role})
                                </p>
                                {entry.comment && <p className="mt-1 text-sm bg-muted p-2 rounded-md">{entry.comment}</p>}
                                <p className="text-xs text-muted-foreground mt-1">
                                    {new Date(entry.created_at).toLocaleString()}
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No history for this achievement yet.</p>
                )}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
