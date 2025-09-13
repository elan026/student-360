import { useState, useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { User, LogOut, Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { User as UserType } from "@/pages/Login";

interface DashboardLayoutProps {
  requiredRole?: 'student' | 'faculty' | 'admin';
}

const DashboardLayout = ({ requiredRole }: DashboardLayoutProps) => {
  const [user, setUser] = useState<UserType | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const userData = localStorage.getItem('student360_user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      if (requiredRole && parsedUser.role !== requiredRole) {
        toast({
          title: "Access Denied",
          description: "You don't have permission to access this page",
          variant: "destructive"
        });
        navigate('/login');
        return;
      }
      setUser(parsedUser);
    } else {
      navigate('/login');
    }
  }, [requiredRole, navigate, toast]);

  const handleLogout = () => {
    localStorage.removeItem('student360_user');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out"
    });
    navigate('/login');
  };

  if (!user) return null;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar userRole={user.role} />
        
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="h-16 border-b border-border bg-card/50 flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-muted" />
              <div>
                <h1 className="text-lg font-semibold">Student360</h1>
                <p className="text-sm text-muted-foreground capitalize">
                  {user.role} Dashboard
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-warning rounded-full text-xs"></span>
              </Button>
              
              <div className="flex items-center gap-2 text-sm">
                <div className="p-2 bg-primary/10 rounded-full">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div className="hidden md:block">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>

              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                <span className="hidden md:inline ml-2">Logout</span>
              </Button>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1 p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;