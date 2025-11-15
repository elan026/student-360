import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { 
  GraduationCap, 
  Trophy, 
  Users, 
  Shield, 
  BookOpen, 
  Award,
  BarChart3,
  FileText,
  ArrowRight,
  CheckCircle,
  Lightbulb
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Trophy,
      title: "Achievement Tracking",
      description: "Comprehensive system for recording and verifying student accomplishments across all categories"
    },
    {
      icon: Users,
      title: "Faculty Review System", 
      description: "Streamlined approval process with faculty oversight and feedback mechanisms"
    },
    {
      icon: BarChart3,
      title: "Analytics & Reports",
      description: "Generate accreditation-ready reports and track institutional progress"
    },
    {
      icon: FileText,
      title: "Portfolio Generation",
      description: "Automated creation of professional student portfolios and transcripts"
    },
    {
      icon: Lightbulb,
      title: "AI-Powered Analytics",
      description: "Skill gap analysis and career recommendations"
    }
  ];

  const benefits = [
    "Centralized student achievement records",
    "NAAC and AICTE compliance ready",
    "Real-time progress tracking",
    "Automated portfolio generation",
    "Multi-role access control",
    "Comprehensive reporting system"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <GraduationCap className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Student360</h1>
              <p className="text-xs text-muted-foreground">Achievement Hub</p>
            </div>
          </div>
          <Button asChild>
            <Link to="/login">Sign In</Link>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Centralized Student
            <br />
            <span className="text-white/90">Achievement Hub</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
            Comprehensive platform for tracking, verifying, and showcasing student accomplishments across academic, co-curricular, and extracurricular activities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-white text-primary hover:bg-white/90">
              <Link to="/login">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Platform Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage student achievements and generate comprehensive reports
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-card hover:shadow-hover transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Role-based Access Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Multi-Role Platform</h2>
            <p className="text-xl text-muted-foreground">
              Tailored dashboards for different user types
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="shadow-card hover:shadow-hover transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto p-3 bg-academic/10 rounded-full mb-4 w-fit">
                  <BookOpen className="h-8 w-8 text-academic" />
                </div>
                <CardTitle>Student Portal</CardTitle>
                <CardDescription>
                  Upload and track achievements, generate portfolios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Achievement management
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Portfolio generation
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Progress tracking
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-hover transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto p-3 bg-cocurricular/10 rounded-full mb-4 w-fit">
                  <Users className="h-8 w-8 text-cocurricular" />
                </div>
                <CardTitle>Faculty Portal</CardTitle>
                <CardDescription>
                  Review submissions and provide feedback
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Review submissions
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Approve/reject records
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Student analytics
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-hover transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto p-3 bg-leadership/10 rounded-full mb-4 w-fit">
                  <Shield className="h-8 w-8 text-leadership" />
                </div>
                <CardTitle>Admin Portal</CardTitle>
                <CardDescription>
                  System management and reporting
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    User management
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Analytics & reports
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-success" />
                    System configuration
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Choose Student360?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Streamline your institution's achievement tracking and accreditation process with our comprehensive platform.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <Card className="shadow-hover">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Ready to Get Started?
                </CardTitle>
                <CardDescription>
                  Join educational institutions already using Student360
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">1000+</p>
                    <p className="text-sm text-muted-foreground">Students Registered</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-success">98%</p>
                    <p className="text-sm text-muted-foreground">Approval Rate</p>
                  </div>
                  <Button asChild className="w-full">
                    <Link to="/login">Start Using Student360</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="p-2 bg-primary/10 rounded-lg">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold">Student360</h3>
                <p className="text-xs text-muted-foreground">Centralized Achievement Hub</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Student360. Transforming education through technology.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
