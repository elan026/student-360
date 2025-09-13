import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  Users, 
  TrendingUp, 
  FileText, 
  GraduationCap,
  Award,
  Clock,
  Target,
  Settings,
  Download
} from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 1247,
    activeStudents: 1050,
    facultyMembers: 75,
    totalAchievements: 3420,
    pendingReviews: 45,
    approvalRate: 87,
    monthlyGrowth: 12
  });

  useEffect(() => {
    // Mock real-time data updates
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        totalAchievements: prev.totalAchievements + Math.floor(Math.random() * 3),
        pendingReviews: Math.max(0, prev.pendingReviews + Math.floor(Math.random() * 5) - 2)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const categoryData = [
    { name: 'Academic', count: 1420, percentage: 41.5, color: 'academic' },
    { name: 'Co-curricular', count: 890, percentage: 26.0, color: 'cocurricular' },
    { name: 'Extracurricular', count: 650, percentage: 19.0, color: 'extracurricular' },
    { name: 'Internships', count: 280, percentage: 8.2, color: 'internship' },
    { name: 'Volunteering', count: 180, percentage: 5.3, color: 'volunteering' }
  ];

  const recentActivity = [
    { action: 'New student registration', user: 'Alex Johnson', time: '2 minutes ago' },
    { action: 'Achievement approved', user: 'Dr. Sarah Wilson', time: '5 minutes ago' },
    { action: 'Report generated', user: 'Admin System', time: '10 minutes ago' },
    { action: 'Faculty member added', user: 'Michael Chen', time: '15 minutes ago' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-primary p-6 rounded-lg text-white">
        <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-white/80">Comprehensive overview of Student360 platform</p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-card hover:shadow-hover transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
                <p className="text-xs text-success">+{stats.monthlyGrowth}% this month</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-hover transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Achievements</p>
                <p className="text-2xl font-bold">{stats.totalAchievements.toLocaleString()}</p>
                <p className="text-xs text-primary">Live count</p>
              </div>
              <Award className="h-8 w-8 text-academic" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-hover transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Reviews</p>
                <p className="text-2xl font-bold text-warning">{stats.pendingReviews}</p>
                <p className="text-xs text-muted-foreground">Requires attention</p>
              </div>
              <Clock className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card hover:shadow-hover transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Approval Rate</p>
                <p className="text-2xl font-bold text-success">{stats.approvalRate}%</p>
                <p className="text-xs text-success">Above target</p>
              </div>
              <TrendingUp className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Administrative Actions
          </CardTitle>
          <CardDescription>
            Common management and reporting tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button asChild className="h-auto p-4 flex-col gap-2">
              <Link to="/admin/users">
                <Users className="h-6 w-6" />
                Manage Users
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-auto p-4 flex-col gap-2">
              <Link to="/admin/reports">
                <FileText className="h-6 w-6" />
                Generate Reports
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-auto p-4 flex-col gap-2">
              <Link to="/admin/analytics">
                <BarChart3 className="h-6 w-6" />
                View Analytics
              </Link>
            </Button>
            <Button variant="outline" asChild className="h-auto p-4 flex-col gap-2">
              <Link to="/admin/settings">
                <Settings className="h-6 w-6" />
                System Settings
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Achievement Categories
            </CardTitle>
            <CardDescription>
              Distribution of achievements by category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryData.map((category) => (
                <div key={category.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full bg-${category.color}`} />
                      <span className="text-sm font-medium">{category.name}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {category.count} ({category.percentage}%)
                    </div>
                  </div>
                  <Progress value={category.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Platform Overview
            </CardTitle>
            <CardDescription>
              Key performance indicators
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Active Students</span>
                  <span className="text-sm text-muted-foreground">
                    {stats.activeStudents} / {stats.totalUsers}
                  </span>
                </div>
                <Progress value={(stats.activeStudents / stats.totalUsers) * 100} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Faculty Engagement</span>
                  <span className="text-sm text-muted-foreground">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">System Uptime</span>
                  <span className="text-sm text-muted-foreground">99.9%</span>
                </div>
                <Progress value={99.9} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Storage Usage</span>
                  <span className="text-sm text-muted-foreground">67%</span>
                </div>
                <Progress value={67} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity and Quick Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest system events and user actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">by {activity.user}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Quick Reports
            </CardTitle>
            <CardDescription>
              Generate commonly requested reports
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-between">
                <span>Monthly Achievement Report</span>
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="w-full justify-between">
                <span>Student Engagement Analytics</span>
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="w-full justify-between">
                <span>Faculty Performance Report</span>
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="w-full justify-between">
                <span>NAAC Accreditation Report</span>
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="w-full justify-between">
                <span>System Usage Statistics</span>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;