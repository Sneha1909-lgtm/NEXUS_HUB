import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import Login from './pages/Login.jsx';
import DashboardLayout from './layouts/DashboardLayout.jsx';
import StudentAcademic from './pages/student/Academic';
import StudentAttendance from './pages/student/Attendance';
import StudentResults from './pages/student/Results.jsx';
import FacultyMarkAttendance from './pages/faculty/MarkAttendance';
import LmsMyCourses from './pages/lms/MyCourses';
import LmsAssignments from './pages/lms/Assignments';
import LmsCourseList from './pages/lms/CourseList';
import LmsCoursePlayer from './pages/lms/CoursePlayer';
import LmsQuiz from './pages/lms/Quiz';
import LmsInstructorCourses from './pages/lms/InstructorCourses';
import FacultyEnterMarks from './pages/faculty/EnterMarks';
import AdminUserManagement from './pages/admin/Users';
import { ThemeProvider } from './context/ThemeContext.jsx';
import HomePage from './pages/HomePage.jsx';
import Register from './pages/Register.jsx';

import Overview from './pages/Overview';
import Profile from './pages/Profile.jsx';
import AssignmentDetail from './pages/lms/AssignmentDetail.jsx';
import ModuleExplorer from './pages/lms/ModuleExplorer.jsx';

const PortalIndex = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) return <Navigate to="/login" />;
  
  return <Navigate to="/portal/overview" />;
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/portal/*" element={<DashboardLayout />}>
            <Route index element={<PortalIndex />} />
            <Route path="overview" element={<Overview />} />
            <Route path="profile" element={<Profile />} />
            <Route path="student/academic" element={<StudentAcademic />} />
            <Route path="student/attendance" element={<StudentAttendance />} />
            <Route path="student/results" element={<StudentResults />} />
            
            <Route path="faculty/attendance" element={<FacultyMarkAttendance />} />
            <Route path="faculty/marks" element={<FacultyEnterMarks />} />
            
            <Route path="admin/users" element={<AdminUserManagement />} />
            
            <Route path="lms/student/courses" element={<LmsMyCourses />} />
            <Route path="lms/student/assignments" element={<LmsAssignments />} />
            <Route path="lms/global/courses" element={<LmsCourseList />} />
            <Route path="lms/module/:id" element={<ModuleExplorer />} />
            <Route path="lms/assignment/:id" element={<AssignmentDetail />} />
            <Route path="lms/player/:id" element={<LmsCoursePlayer />} />
            <Route path="lms/quiz/:id" element={<LmsQuiz />} />
            <Route path="lms/instructor/courses" element={<LmsInstructorCourses />} />
          </Route>
        </Routes>
        <Analytics />
      </Router>
    </ThemeProvider>
  );
}

export default App;
