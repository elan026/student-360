import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Chrome } from "lucide-react";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signInWithGoogle, profile, user } = useAuth();

  // Redirect if already logged in
  useEffect(() => {
    if (user && profile) {
      const roleRoutes = {
        student: '/student',
        faculty: '/faculty',
        admin: '/admin'
      };
      navigate(roleRoutes[profile.role]);
    }
  }, [user, profile, navigate]);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
      toast({
        title: "Login successful",
        description: "Welcome to Student360!"
      });
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Failed to sign in with Google",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

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
                <Chrome className="h-8 w-8 text-primary" />
              </div>
            </div>
            <CardTitle>Sign In to Your Dashboard</CardTitle>
            <CardDescription>
              Access your achievements and academic records
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <Button 
              onClick={handleGoogleLogin} 
              disabled={loading}
              className="w-full bg-gradient-primary hover:opacity-90"
            >
              <Chrome className="mr-2 h-4 w-4" />
              {loading ? "Signing in..." : "Continue with Google"}
            </Button>

            <div className="text-sm text-muted-foreground text-center">
              <p className="font-medium mb-2">New users automatically get 'Student' role</p>
              <p className="text-xs">Admins can update roles after signup</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;