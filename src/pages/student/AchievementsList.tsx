import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Trophy, 
  Search, 
  Filter, 
  Plus,
  Edit,
  Trash2,
  Calendar,
  Tag,
  FileText
} from "lucide-react";
import { Link } from "react-router-dom";

interface Achievement {
  id: string;
  title: string;
  category: string;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
  description: string;
  documents: string[];
}

const AchievementsList = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    // Mock data
    const mockAchievements: Achievement[] = [
      {
        id: '1',
        title: 'Data Structures Course Completion',
        category: 'academic',
        status: 'approved',
        date: '2024-01-15',
        description: 'Completed advanced data structures course with 95% grade',
        documents: ['certificate.pdf']
      },
      {
        id: '2',
        title: 'Hackathon Winner - TechFest 2024',
        category: 'cocurricular',
        status: 'pending',
        date: '2024-01-10',
        description: 'First place in university hackathon competition',
        documents: ['winner_certificate.pdf', 'project_demo.mp4']
      },
      {
        id: '3',
        title: 'Community Service - 50 Hours',
        category: 'volunteering',
        status: 'approved',
        date: '2024-01-05',
        description: 'Completed 50 hours of community service at local shelter',
        documents: ['service_certificate.pdf']
      },
      {
        id: '4',
        title: 'Research Paper Publication',
        category: 'academic',
        status: 'rejected',
        date: '2024-01-20',
        description: 'Published research paper on machine learning algorithms',
        documents: ['paper.pdf', 'publication_proof.pdf']
      },
      {
        id: '5',
        title: 'Sports Championship - Basketball',
        category: 'extracurricular',
        status: 'pending',
        date: '2024-01-25',
        description: 'Won inter-college basketball championship',
        documents: ['trophy_photo.jpg', 'certificate.pdf']
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

  const getCategoryName = (category: string) => {
    const names: { [key: string]: string } = {
      academic: 'Academic',
      cocurricular: 'Co-curricular',
      extracurricular: 'Extracurricular',
      certification: 'Certification',
      internship: 'Internship',
      volunteering: 'Volunteering',
      leadership: 'Leadership'
    };
    return names[category] || category;
  };

  const filteredAchievements = achievements.filter(achievement => {
    const matchesSearch = achievement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         achievement.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || achievement.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || achievement.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const stats = {
    total: achievements.length,
    approved: achievements.filter(a => a.status === 'approved').length,
    pending: achievements.filter(a => a.status === 'pending').length,
    rejected: achievements.filter(a => a.status === 'rejected').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Trophy className="h-6 w-6" />
            My Achievements
          </h1>
          <p className="text-muted-foreground">Manage and track all your accomplishments</p>
        </div>
        <Button asChild>
          <Link to="/student/add">
            <Plus className="h-4 w-4 mr-2" />
            Add New Achievement
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">{stats.total}</p>
            <p className="text-sm text-muted-foreground">Total</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-success">{stats.approved}</p>
            <p className="text-sm text-muted-foreground">Approved</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-warning">{stats.pending}</p>
            <p className="text-sm text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-destructive">{stats.rejected}</p>
            <p className="text-sm text-muted-foreground">Rejected</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="shadow-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search achievements..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent className="bg-card">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="academic">Academic</SelectItem>
                <SelectItem value="cocurricular">Co-curricular</SelectItem>
                <SelectItem value="extracurricular">Extracurricular</SelectItem>
                <SelectItem value="certification">Certification</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
                <SelectItem value="volunteering">Volunteering</SelectItem>
                <SelectItem value="leadership">Leadership</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-card">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Achievements List */}
      <div className="space-y-4">
        {filteredAchievements.length === 0 ? (
          <Card className="shadow-card">
            <CardContent className="p-12 text-center">
              <Trophy className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-medium mb-2">No achievements found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || filterCategory !== 'all' || filterStatus !== 'all' 
                  ? "Try adjusting your filters or search terms"
                  : "Start by adding your first achievement"
                }
              </p>
              <Button asChild>
                <Link to="/student/add">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Achievement
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          filteredAchievements.map((achievement) => (
            <Card key={achievement.id} className="shadow-card hover:shadow-hover transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold">{achievement.title}</h3>
                      <Badge className={getStatusColor(achievement.status)}>
                        {achievement.status}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground mb-3">{achievement.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${getCategoryColor(achievement.category)}`} />
                        <span>{getCategoryName(achievement.category)}</span>
                      </div>
                      
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {new Date(achievement.date).toLocaleDateString()}
                      </div>
                      
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <FileText className="h-4 w-4" />
                        {achievement.documents.length} document{achievement.documents.length !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" className="text-destructive hover:bg-destructive hover:text-white">
                      <Trash2 className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Results summary */}
      {filteredAchievements.length > 0 && (
        <div className="text-center text-sm text-muted-foreground">
          Showing {filteredAchievements.length} of {achievements.length} achievements
        </div>
      )}
    </div>
  );
};

export default AchievementsList;