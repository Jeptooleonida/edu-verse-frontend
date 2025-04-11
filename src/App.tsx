
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { UserProvider } from "@/contexts/UserContext";
import { CourseProvider } from "@/contexts/CourseContext";

// Page imports
import Login from "./pages/Login";

// Student pages
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentCourses from "./pages/student/StudentCourses";
import StudentCourseDetail from "./pages/student/StudentCourseDetail";

// Instructor pages
import InstructorDashboard from "./pages/instructor/InstructorDashboard";
import InstructorResources from "./pages/instructor/InstructorResources";

// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";

// Create a new QueryClient instance
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <UserProvider>
        <CourseProvider>
          <SidebarProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Auth routes */}
                <Route path="/login" element={<Login />} />

                {/* Student routes */}
                <Route path="/student/dashboard" element={<StudentDashboard />} />
                <Route path="/student/courses" element={<StudentCourses />} />
                <Route path="/student/courses/:courseId" element={<StudentCourseDetail />} />
                
                {/* Instructor routes */}
                <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
                <Route path="/instructor/resources" element={<InstructorResources />} />
                
                {/* Admin routes */}
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                
                {/* Redirect root to login */}
                <Route path="/" element={<Navigate to="/login" replace />} />
                
                {/* Redirect any other routes to login */}
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            </BrowserRouter>
          </SidebarProvider>
        </CourseProvider>
      </UserProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
