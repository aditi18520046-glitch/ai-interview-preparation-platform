import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MockInterview from './pages/MockInterview';
import MockTest from './pages/MockTest';
import CodingPractice from './pages/CodingPractice';
import CompaniesRoles from './pages/CompaniesRoles';
import Signup from './pages/Signup';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import Progress from './pages/Progress';
import Leaderboard from './pages/Leaderboard';
import LearningRoadmap from './pages/LearningRoadmap';
import InterviewHistory from './pages/InterviewHistory';
import SavedQuestions from './pages/SavedQuestions';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <>
      <Toaster position="top-right" />
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        
        {/* Protected Dashboard Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/dashboard/interview" element={<ProtectedRoute><MockInterview /></ProtectedRoute>} />
        <Route path="/dashboard/test" element={<ProtectedRoute><MockTest /></ProtectedRoute>} />
        <Route path="/dashboard/coding" element={<ProtectedRoute><CodingPractice /></ProtectedRoute>} />
        <Route path="/dashboard/companies-roles" element={<ProtectedRoute><CompaniesRoles /></ProtectedRoute>} />
        <Route path="/dashboard/resume" element={<ProtectedRoute><ResumeAnalyzer /></ProtectedRoute>} />
        <Route path="/dashboard/progress" element={<ProtectedRoute><Progress /></ProtectedRoute>} />
        <Route path="/dashboard/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
        <Route path="/dashboard/roadmap" element={<ProtectedRoute><LearningRoadmap /></ProtectedRoute>} />
        <Route path="/dashboard/history" element={<ProtectedRoute><InterviewHistory /></ProtectedRoute>} />
        <Route path="/dashboard/saved" element={<ProtectedRoute><SavedQuestions /></ProtectedRoute>} />
        <Route path="/dashboard/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
        <Route path="/dashboard/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/dashboard/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </BrowserRouter>
    </>
  );
}
