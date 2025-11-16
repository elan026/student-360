import { useLocation, NavLink } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  BookOpen,
  Trophy,
  FileText,
  Users,
  CheckCircle,
  MessageSquare,
  BarChart3,
  Settings,
  UserCheck,
  GraduationCap,
  Award,
  PlusCircle,
  ClipboardList,
  AreaChart // For analytics
} from "lucide-react";

interface AppSidebarProps {
  userRole: 'student' | 'faculty' | 'admin';
}

export function AppSidebar({ userRole }: AppSidebarProps) {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  
  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary text-primary-foreground font-medium shadow-sm" 
      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground";

  const studentItems = [
    { title: "Dashboard", url: "/student", icon: BookOpen },
    { title: "My Achievements", url: "/student/achievements", icon: Trophy },
    { title: "Add Achievement", url: "/student/add", icon: PlusCircle },
    { title: "Portfolio", url: "/student/portfolio", icon: FileText },
    { title: "Profile", url: "/student/profile", icon: UserCheck },
  ];

  const facultyItems = [
    { title: "Dashboard", url: "/faculty", icon: BarChart3 },
    { title: "Analytics", url: "/faculty/analytics", icon: AreaChart },
    { title: "Verification Queue", url: "/faculty/queue", icon: ClipboardList },
    { title: "Review Submissions", url: "/faculty/reviews", icon: CheckCircle },
    { title: "Students", url: "/faculty/students", icon: Users },
    { title: "Reports", url: "/faculty/reports", icon: FileText },
    { title: "Messages", url: "/faculty/messages", icon: MessageSquare },
  ];

  const adminItems = [
    { title: "Dashboard", url: "/admin", icon: BarChart3 },
    { title: "Analytics", url: "/admin/analytics", icon: AreaChart },
    { title: "Import Students", url: "/admin/import-students", icon: Users },
    { title: "Users Management", url: "/admin/users", icon: Users },
    { title: "Reports", url: "/admin/reports", icon: FileText },
    { title: "Settings", url: "/admin/settings", icon: Settings },
  ];

  const getMenuItems = () => {
    switch (userRole) {
      case 'student':
        return studentItems;
      case 'faculty':
        return facultyItems;
      case 'admin':
        return adminItems;
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className={isCollapsed ? "w-16" : "w-64"}>
      <SidebarContent className="gap-0">
        {/* Logo section */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="font-bold text-lg">Student360</h2>
                <p className="text-xs text-muted-foreground capitalize">{userRole} Portal</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup className="flex-1">
          <SidebarGroupLabel className={isCollapsed ? "sr-only" : ""}>
            Navigation
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClass}>
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick stats or role indicator */}
        {!isCollapsed && (
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-2 text-sm">
              <Award className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">
                {userRole === 'student' && 'Achievement Tracker'}
                {userRole === 'faculty' && 'Review Portal'}
                {userRole === 'admin' && 'Admin Panel'}
              </span>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
