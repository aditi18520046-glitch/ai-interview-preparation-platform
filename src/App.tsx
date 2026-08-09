import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/interview" element={<MockInterview />} />
        <Route path="/dashboard/test" element={<MockTest />} />
        <Route path="/dashboard/coding" element={<CodingPractice />} />
        <Route path="/dashboard/companies-roles" element={<CompaniesRoles />} />
        <Route path="/dashboard/resume" element={<ResumeAnalyzer />} />
        <Route path="/dashboard/progress" element={<Progress />} />
        <Route path="/dashboard/leaderboard" element={<Leaderboard />} />
        <Route path="/dashboard/roadmap" element={<LearningRoadmap />} />
        <Route path="/dashboard/history" element={<InterviewHistory />} />
        <Route path="/dashboard/saved" element={<SavedQuestions />} />
        <Route path="/dashboard/notifications" element={<Notifications />} />
        <Route path="/dashboard/profile" element={<Profile />} />
        <Route path="/dashboard/settings" element={<Settings />} />
      </Routes>
      </BrowserRouter>
    </>
  );
}
