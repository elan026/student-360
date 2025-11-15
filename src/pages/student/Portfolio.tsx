import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  Printer, 
  Download, 
  Share2, 
  Mail, 
  Phone, 
  Linkedin, 
  Globe, 
  GraduationCap, 
  Trophy, 
  Star, 
  FileText,
  Award
} from "lucide-react";
import { User } from "../Login";

interface Achievement {
  id: string;
  title: string;
  category: string;
  status: 'approved';
  date: string;
  description: string;
}

const Portfolio = () => {
  const [user, setUser] = useState<User | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    // Fetch user from local storage
    const storedUser = localStorage.getItem('student360_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Mock approved achievements
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
        id: '3',
        title: 'Community Service - 50 Hours',
        category: 'volunteering',
        status: 'approved',
        date: '2024-01-05',
        description: 'Completed 50 hours of community service at local shelter'
      },
      {
        id: '5',
        title: 'Certified JavaScript Developer',
        category: 'certification',
        status: 'approved',
        date: '2023-12-20',
        description: 'Official certification for advanced JavaScript skills'
      }
    ];
    setAchievements(mockAchievements.filter(a => a.status === 'approved'));
  }, []);

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: React.ElementType } = {
      academic: GraduationCap,
      cocurricular: Trophy,
      extracurricular: Star,
      certification: Award,
      internship: FileText,
      volunteering: Globe,
      leadership: Users
    };
    return icons[category] || Trophy;
  };

  const handlePrint = () => {
    window.print();
  };

  if (!user) {
    return <div>Loading user portfolio...</div>;
  }

  return (
    <div className="bg-muted/30 min-h-screen p-4 sm:p-8">
      <div className="max-w-4xl mx-auto bg-background shadow-lg print:shadow-none rounded-lg">
        {/* Toolbar */}
        <div className="p-4 border-b flex flex-wrap items-center justify-between print:hidden">
          <h2 className="text-lg font-semibold">Portfolio Preview</h2>
          <div className="flex items-center gap-2 mt-2 sm:mt-0">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Portfolio Content */}
        <div className="p-8 print:p-0">
          {/* Header */}
          <header className="flex flex-col sm:flex-row items-center gap-8 mb-8">
            <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-4 border-primary/10">
              <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${user.name}`} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <h1 className="text-3xl sm:text-4xl font-bold text-primary">{user.name}</h1>
              <p className="text-lg text-muted-foreground">Computer Science Student</p>
              <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4 mt-4 text-sm">
                <a href={`mailto:${user.email}`} className="flex items-center gap-2 hover:text-primary">
                  <Mail className="h-4 w-4" />
                  {user.email}
                </a>
                <a href="#" className="flex items-center gap-2 hover:text-primary">
                  <Linkedin className="h-4 w-4" />
                  LinkedIn Profile
                </a>
                <a href="#" className="flex items-center gap-2 hover:text-primary">
                  <Globe className="h-4 w-4" />
                  Personal Website
                </a>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column (Details) */}
            <div className="md:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <span>B.Tech Computer Science</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>+1 (234) 567-890</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <span>your-website.com</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  <Badge>JavaScript</Badge>
                  <Badge>React</Badge>
                  <Badge>Node.js</Badge>
                  <Badge>Python</Badge>
                  <Badge>SQL</Badge>
                  <Badge>Data Structures</Badge>
                  <Badge>Algorithms</Badge>
                </CardContent>
              </Card>
            </div>

            {/* Right Column (Achievements) */}
            <div className="md:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Career Objective</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Motivated and aspiring computer science student with a strong foundation in software development and problem-solving. Seeking to leverage my skills in a challenging role to contribute to innovative projects and grow as a professional.
                  </p>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Key Achievements</h3>
                {achievements.map(achievement => {
                  const Icon = getCategoryIcon(achievement.category);
                  return (
                    <div key={achievement.id} className="flex gap-4 pb-4 border-b last:border-b-0">
                      <div className="mt-1">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{achievement.title}</h4>
                        <p className="text-sm text-muted-foreground mb-1">
                          {new Date(achievement.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;