import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import PublicProfile from "./pages/public/Profile";
import DashboardLayout from "./components/layout/DashboardLayout";
import StudentDashboard from "./pages/student/StudentDashboard";
import AchievementsList from "./pages/student/AchievementsList";
import AddAchievement from "./pages/student/AddAchievement";
import EditAchievement from "./pages/student/EditAchievement";
import Portfolio from "./pages/student/Portfolio";
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import FacultyAnalyticsDashboard from "./pages/faculty/AnalyticsDashboard";
import { VerificationQueue } from "./pages/faculty/VerificationQueue";
import { ReviewAchievement } from "./pages/faculty/ReviewAchievement";
import ReviewSubmissions from "./pages/faculty/ReviewSubmissions";
import ManageStudents from "./pages/faculty/ManageStudents";
import GenerateReports from "./pages/faculty/GenerateReports";
import Messages from "./pages/faculty/Messages";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AnalyticsDashboard from "./pages/admin/AnalyticsDashboard";
import ImportStudents from "./pages/admin/ImportStudents";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminReports from "./pages/admin/AdminReports";
import AdminSettings from "./pages/admin/AdminSettings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile/:userId" element={<PublicProfile />} />
          
          {/* Student Routes */}
          <Route path="/student" element={<DashboardLayout requiredRole="student" />}>
            <Route index element={<StudentDashboard />} />
            <Route path="achievements" element={<AchievementsList />} />
            <Route path="add" element={<AddAchievement />} />
            <Route path="edit/:id" element={<EditAchievement />} />
            <Route path="portfolio" element={<Portfolio />} />
          </Route>
          
          {/* Faculty Routes */}
          <Route path="/faculty" element={<DashboardLayout requiredRole="faculty" />}>
            <Route index element={<FacultyDashboard />} />
            <Route path="analytics" element={<FacultyAnalyticsDashboard />} />
            <Route path="queue" element={<VerificationQueue />} />
            <Route path="review/:id" element={<ReviewAchievement />} />
            <Route path="reviews" element={<ReviewSubmissions />} />
            <Route path="students" element={<ManageStudents />} />
            <Route path="reports" element={<GenerateReports />} />
            <Route path="messages" element={<Messages />} />
          </Route>
          
          {/* Admin Routes */}
          <Route path="/admin" element={<DashboardLayout requiredRole="admin" />}>
            <Route index element={<AdminDashboard />} />
            <Route path="analytics" element={<AnalyticsDashboard />} />
            <Route path="import-students" element={<ImportStudents />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="reports" element={<AdminReports />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
