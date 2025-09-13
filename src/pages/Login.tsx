import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, Users, Shield } from "lucide-react";

export interface User {
  id: string;
  email: string;
  role: 'student' | 'faculty' | 'admin';
  name: string;
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<'student' | 'faculty' | 'admin'>('student');
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock user data for demo
  const mockUsers = {
    'student@student360.edu': { role: 'student', name: 'Alex Johnson' },
    'faculty@student360.edu': { role: 'faculty', name: 'Dr. Sarah Wilson' },
    'admin@student360.edu': { role: 'admin', name: 'Michael Chen' }
  };

  const handleLogin = () => {
    if (!email || !password) {
      toast({
        title: "Missing credentials",
        description: "Please enter both email and password",
        variant: "destructive"
      });
      return;
    }

    const user = mockUsers[email as keyof typeof mockUsers];
    if (user && user.role === role) {
      const userData: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        role,
        name: user.name
      };
      
      localStorage.setItem('student360_user', JSON.stringify(userData));
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${user.name}!`
      });

      // Navigate based on role
      switch (role) {
        case 'student':
          navigate('/student');
          break;
        case 'faculty':
          navigate('/faculty');
          break;
        case 'admin':
          navigate('/admin');
          break;
      }
    } else {
      toast({
        title: "Login failed",
        description: "Invalid credentials or role mismatch",
        variant: "destructive"
      });
    }
  };

  const roleIcons = {
    student: BookOpen,
    faculty: Users,
    admin: Shield
  };

  const RoleIcon = roleIcons[role];

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Student360</h1>
          <p className="text-white/80">Centralized Student Achievement Hub</p>
        </div>

        <Card className="shadow-hover">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <RoleIcon className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle>Sign In to Your Dashboard</CardTitle>
            <CardDescription>
              Access your achievements and academic records
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={role} onValueChange={(value: 'student' | 'faculty' | 'admin') => setRole(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent className="bg-card">
                  <SelectItem value="student">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Student
                    </div>
                  </SelectItem>
                  <SelectItem value="faculty">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Faculty
                    </div>
                  </SelectItem>
                  <SelectItem value="admin">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Admin
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-card"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-card"
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>

            <Button onClick={handleLogin} className="w-full bg-gradient-primary hover:opacity-90">
              Sign In
            </Button>

            <div className="text-sm text-muted-foreground text-center">
              <p className="font-medium mb-2">Demo Credentials:</p>
              <div className="space-y-1 text-xs">
                <p>Student: student@student360.edu / password</p>
                <p>Faculty: faculty@student360.edu / password</p>
                <p>Admin: admin@student360.edu / password</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;