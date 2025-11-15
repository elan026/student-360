
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAchievements, getAchievementWithHistory, Achievement, VerificationHistory } from "@/integrations/supabase/api";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Trophy, Search, Plus, Edit, Calendar, FileText } from "lucide-react";

export default function AchievementsList() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedAchievement, setSelectedAchievement] = useState<{ achievement: Achievement, history: VerificationHistory[] } | null>(null);

  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        setLoading(true);
        const data = await getAchievements();
        setAchievements(data);
      } catch (error: any) { 
        toast({ title: "Error fetching achievements", description: error.message, variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };
    fetchAchievements();
  }, [toast]);

  const handleViewDetails = async (achievement: Achievement) => {
    try {
        const { history } = await getAchievementWithHistory(achievement.id);
        setSelectedAchievement({ achievement, history: history as any });
    } catch (error: any) {
        toast({ title: "Error fetching details", description: error.message, variant: "destructive" });
    }
  };

  const getStatusVariant = (status: Achievement['status']) => {
    switch (status) {
      case 'verified': return 'success';
      case 'pending': return 'default';
      case 'under_review': return 'secondary';
      case 'rejected': return 'destructive';
      default: return 'outline';
    }
  };

  const filteredAchievements = achievements.filter(ach => {
    return (
      (searchTerm === "" || ach.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterCategory === "all" || ach.category === filterCategory) &&
      (filterStatus === "all" || ach.status === filterStatus)
    );
  });

  const canEdit = (status: Achievement['status']) => status === 'pending' || status === 'rejected';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-2"><Trophy /> My Achievements</h1>
        <Button asChild><Link to="/student/add"><Plus className="mr-2 h-4 w-4" /> Add New</Link></Button>
      </div>

      <Card>
        <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search by title..." className="pl-10" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
                </div>
                <Select value={filterCategory} onValueChange={setFilterCategory}><SelectTrigger className="w-full md:w-48"><SelectValue placeholder="All Categories" /></SelectTrigger><SelectContent><SelectItem value="all">All Categories</SelectItem>{[...new Set(achievements.map(a => a.category))].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent></Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}><SelectTrigger className="w-full md:w-48"><SelectValue placeholder="All Statuses" /></SelectTrigger><SelectContent><SelectItem value="all">All Statuses</SelectItem><SelectItem value="pending">Pending</SelectItem><SelectItem value="under_review">Under Review</SelectItem><SelectItem value="verified">Verified</SelectItem><SelectItem value="rejected">Rejected</SelectItem></SelectContent></Select>
            </div>
        </CardContent>
      </Card>

      {loading ? <p>Loading achievements...</p> : (
        <div className="space-y-4">
          {filteredAchievements.length > 0 ? (
            filteredAchievements.map(ach => (
              <Dialog key={ach.id} onOpenChange={() => setSelectedAchievement(null)}>
                <DialogTrigger asChild>
                    <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => handleViewDetails(ach)}>
                        <CardContent className="p-4 flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold">{ach.title}</h3>
                                <p className="text-sm text-muted-foreground">{ach.category}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <Badge variant={getStatusVariant(ach.status)}>{ach.status}</Badge>
                                <Button variant="outline" size="sm" disabled={!canEdit(ach.status)} onClick={(e) => { e.stopPropagation(); navigate(`/student/edit/${ach.id}`)}}><Edit className="h-4 w-4 mr-1"/> Edit</Button>
                            </div>
                        </CardContent>
                    </Card>
                </DialogTrigger>
                {selectedAchievement && selectedAchievement.achievement.id === ach.id && (
                    <DialogContent>
                        <DialogHeader><DialogTitle>{selectedAchievement.achievement.title}</DialogTitle></DialogHeader>
                        <div>
                            <p><strong>Status:</strong> <Badge variant={getStatusVariant(selectedAchievement.achievement.status)}>{selectedAchievement.achievement.status}</Badge></p>
                            <p className="mt-2">{selectedAchievement.achievement.description}</p>
                            <div className="my-4">
                                <h4 className="font-semibold mb-2">Verification History</h4>
                                <ul className="space-y-3">
                                    {selectedAchievement.history.map(h => (
                                        <li key={h.id} className="border-l-2 pl-3">
                                            <p className="font-bold">{h.to_status}</p>
                                            {h.comment && <p className="text-sm bg-muted p-2 rounded-md my-1">{h.comment}</p>}
                                            <p className="text-xs text-muted-foreground">by {h.actor?.name || 'System'} on {new Date(h.created_at).toLocaleDateString()}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </DialogContent>
                )}
              </Dialog>
            ))
          ) : (
            <p className="text-center text-muted-foreground py-8">No achievements match your criteria.</p>
          )}
        </div>
      )}
    </div>
  );
}
