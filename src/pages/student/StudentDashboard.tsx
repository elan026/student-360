import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Trophy, 
  TrendingUp, 
  FileText, 
  Calendar, 
  Plus,
  Award,
  GraduationCap,
  Users,
  BookOpen,
  Target
} from "lucide-react";
import { Link } from "react-router-dom";

interface Achievement {
  id: string;
  title: string;
  category: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
  description: string;
}

const StudentDashboard = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    // Mock data for demo
    const mockAchievements: Achievement[] = [
      {
        id: '1',
        title: 'Data Structures Course Completion',
        category: 'academic',
        status: 'approved',
        date: '2024-01-15',
        description: 'Completed advanced data structures course with 95% grade'
      },
      {
        id: '2', 
        title: 'Hackathon Winner - TechFest 2024',
        category: 'cocurricular',
        status: 'pending',
        date: '2024-01-10',
        description: 'First place in university hackathon competition'
      },
      {
        id: '3',
        title: 'Community Service - 50 Hours',
        category: 'volunteering',
        status: 'approved',
        date: '2024-01-05',
        description: 'Completed 50 hours of community service at local shelter'
      }
    ];
    setAchievements(mockAchievements);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-success text-white';
      case 'pending':
        return 'bg-warning text-white';
      case 'rejected':
        return 'bg-destructive text-white';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      academic: 'bg-academic',
      cocurricular: 'bg-cocurricular',
      extracurricular: 'bg-extracurricular',
      certification: 'bg-certification',
      internship: 'bg-internship',
      volunteering: 'bg-volunteering',
      leadership: 'bg-leadership'
    };
    return colors[category] || 'bg-muted';
  };

  const stats = {
    totalAchievements: achievements.length,
    approvedAchievements: achievements.filter(a => a.status === 'approved').length,
    pendingAchievements: achievements.filter(a => a.status === 'pending').length,
    completionRate: Math.round((achievements.filter(a => a.status === 'approved').length / achievements.length) * 100) || 0
  };

  const recentAchievements = achievements.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-primary p-6 rounded-lg text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome to Your Dashboard</h1>
        <p className="text-white/80">Track your achievements and build your academic portfolio</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-card transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Achievements</p>
                <p className="text-2xl font-bold">{stats.totalAchievements}</p>
              </div>
              <Trophy className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Approved</p>
                <p className="text-2xl font-bold text-success">{stats.approvedAchievements}</p>
              </div>
              <Award className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Review</p>
                <p className="text-2xl font-bold text-warning">{stats.pendingAchievements}</p>
              </div>
              <Calendar className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                <p className="text-2xl font-bold">{stats.completionRate}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Quick Actions
          </CardTitle>
          <CardDescription>
            Common tasks to manage your achievements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button asChild className="h-auto p-4 flex-col gap-2">
              <Link to="/student/add">
                <Plus className="h-6 w-6" />
                Add New Achievement
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-auto p-4 flex-col gap-2">
              <Link to="/student/portfolio">
                <FileText className="h-6 w-6" />
                Generate Portfolio
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-auto p-4 flex-col gap-2">
              <Link to="/student/achievements">
                <Trophy className="h-6 w-6" />
                View All Achievements
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Recent Achievements
            </CardTitle>
            <CardDescription>
              Your latest accomplishments
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentAchievements.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No achievements yet</p>
                <Button asChild className="mt-4">
                  <Link to="/student/add">Add Your First Achievement</Link>
                </Button>
              </div>
            ) : (
              recentAchievements.map((achievement) => (
                <div key={achievement.id} className="flex items-start gap-3 p-3 border rounded-lg transition-colors">
                  <div className={`w-3 h-3 rounded-full mt-2 ${getCategoryColor(achievement.category)}`} />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{achievement.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {achievement.description}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {new Date(achievement.date).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge className={getStatusColor(achievement.status)}>
                        {achievement.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Progress Overview */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Achievement Progress
            </CardTitle>
            <CardDescription>
              Your progress across different categories
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Overall Completion</span>
                  <span>{stats.completionRate}%</span>
                </div>
                <Progress value={stats.completionRate} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Academic Achievements</span>
                  <span>80%</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Co-curricular Activities</span>
                  <span>60%</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Community Service</span>
                  <span>90%</span>
                </div>
                <Progress value={90} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;