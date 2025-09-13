import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  CheckCircle, 
  Clock, 
  Users, 
  FileText, 
  TrendingUp,
  AlertCircle,
  MessageSquare,
  Eye
} from "lucide-react";
import { Link } from "react-router-dom";

interface PendingReview {
  id: string;
  studentName: string;
  studentId: string;
  title: string;
  category: string;
  submittedDate: string;
  priority: 'high' | 'medium' | 'low';
}

const FacultyDashboard = () => {
  const [pendingReviews, setPendingReviews] = useState<PendingReview[]>([]);

  useEffect(() => {
    // Mock data for demo
    const mockReviews: PendingReview[] = [
      {
        id: '1',
        studentName: 'Alex Johnson',
        studentId: 'ST001',
        title: 'Hackathon Winner - TechFest 2024',
        category: 'cocurricular',
        submittedDate: '2024-01-10',
        priority: 'high'
      },
      {
        id: '2',
        studentName: 'Sarah Davis',
        studentId: 'ST002',
        title: 'Research Paper Publication',
        category: 'academic',
        submittedDate: '2024-01-12',
        priority: 'medium'
      },
      {
        id: '3',
        studentName: 'Mike Wilson',
        studentId: 'ST003',
        title: 'Internship Completion Certificate',
        category: 'internship',
        submittedDate: '2024-01-14',
        priority: 'medium'
      }
    ];
    setPendingReviews(mockReviews);
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-destructive text-white';
      case 'medium':
        return 'bg-warning text-white';
      case 'low':
        return 'bg-muted text-muted-foreground';
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
    totalPending: pendingReviews.length,
    highPriority: pendingReviews.filter(r => r.priority === 'high').length,
    reviewsToday: 5,
    totalStudents: 125
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-primary p-6 rounded-lg text-white">
        <h1 className="text-2xl font-bold mb-2">Faculty Review Dashboard</h1>
        <p className="text-white/80">Review and approve student achievement submissions</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-card hover:shadow-hover transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Reviews</p>
                <p className="text-2xl font-bold text-warning">{stats.totalPending}</p>
              </div>
              <Clock className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-hover transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">High Priority</p>
                <p className="text-2xl font-bold text-destructive">{stats.highPriority}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-hover transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Reviews Today</p>
                <p className="text-2xl font-bold text-success">{stats.reviewsToday}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-hover transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Students</p>
                <p className="text-2xl font-bold">{stats.totalStudents}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Quick Actions
          </CardTitle>
          <CardDescription>
            Common review and management tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button asChild className="h-auto p-4 flex-col gap-2">
              <Link to="/faculty/reviews">
                <Clock className="h-6 w-6" />
                Review Submissions
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-auto p-4 flex-col gap-2">
              <Link to="/faculty/students">
                <Users className="h-6 w-6" />
                Manage Students
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-auto p-4 flex-col gap-2">
              <Link to="/faculty/reports">
                <FileText className="h-6 w-6" />
                Generate Reports
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-auto p-4 flex-col gap-2">
              <Link to="/faculty/messages">
                <MessageSquare className="h-6 w-6" />
                Messages
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Pending Reviews */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Pending Reviews
          </CardTitle>
          <CardDescription>
            Achievement submissions awaiting your review
          </CardDescription>
        </CardHeader>
        <CardContent>
          {pendingReviews.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>All caught up! No pending reviews.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingReviews.map((review) => (
                <div key={review.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {review.studentName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium">{review.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          by {review.studentName} ({review.studentId})
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Submitted: {new Date(review.submittedDate).toLocaleDateString()}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${getCategoryColor(review.category)}`} />
                        <Badge className={getPriorityColor(review.priority)}>
                          {review.priority} priority
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      Review
                    </Button>
                  </div>
                </div>
              ))}
              
              <div className="text-center pt-4">
                <Button asChild>
                  <Link to="/faculty/reviews">View All Pending Reviews</Link>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Review Statistics
            </CardTitle>
            <CardDescription>
              Your review activity this week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Approved this week</span>
                <span className="font-medium text-success">24</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Rejected this week</span>
                <span className="font-medium text-destructive">3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Average review time</span>
                <span className="font-medium">2.3 hours</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Student feedback score</span>
                <span className="font-medium text-primary">4.8/5</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Top Performing Students
            </CardTitle>
            <CardDescription>
              Students with most approved achievements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: 'Alex Johnson', achievements: 12 },
                { name: 'Sarah Davis', achievements: 9 },
                { name: 'Mike Wilson', achievements: 8 },
                { name: 'Emma Brown', achievements: 7 }
              ].map((student, index) => (
                <div key={student.name} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                    {index + 1}
                  </div>
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="text-xs">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{student.name}</p>
                  </div>
                  <Badge variant="outline">{student.achievements} achievements</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FacultyDashboard;