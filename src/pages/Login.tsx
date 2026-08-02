import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { User, Lock, Eye, EyeOff, Loader2, Mail, Github } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Navbar from '../components/Navbar';
import { getAuthUsers, checkPassword } from '../lib/auth';
import { useAuthStore } from '../store/authStore';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter email and password');
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      const users = getAuthUsers();
      const user = users.find(u => u.email === email);
      
      if (!user) {
        toast.error('Incorrect email or password. Please try again.');
        return;
      }
      
      const isValid = checkPassword(password, user.passwordHash);
      if (!isValid) {
        toast.error('Incorrect email or password. Please try again.');
        return;
      }

      login({ id: user.id, name: user.name, email: user.email });
      toast.success('Logged in successfully');
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div className="min-h-[100dvh] bg-slate-950 text-slate-50 font-sans flex flex-col relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px]"></div>
      <div className="absolute top-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]"></div>

      <Navbar />

      <div className="flex-1 flex flex-col md:flex-row items-center justify-center p-6 gap-12 max-w-7xl mx-auto w-full z-10">
        
        <div className="hidden md:flex flex-col max-w-md">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Welcome back to <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                InterviewAI
              </span>
            </h1>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Continue your preparation journey. Access your mock interviews, analyze your progress, and master your next tech interview.
            </p>
            
            <div className="flex items-center gap-4 text-sm font-medium text-slate-300">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className={`w-10 h-10 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center shadow-lg z-${4-i}0`}>
                    <User className="w-5 h-5 text-slate-400" />
                  </div>
                ))}
              </div>
              <p>Join <span className="text-white">10,000+</span> developers mastering interviews</p>
            </div>
          </motion.div>
        </div>

        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
            
            <h2 className="text-2xl font-bold mb-2 text-white">Welcome Back</h2>
            <Link to="/" className="text-indigo-400 hover:text-indigo-300 text-sm font-medium mb-6 inline-block transition-colors">
              &larr; Back to Home
            </Link>
            <p className="text-slate-400 text-sm mb-8">Sign in to continue your preparation.</p>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950/50 border border-white/10 text-white rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-slate-600"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-950/50 border border-white/10 text-white rounded-xl py-3 pl-11 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-slate-600"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm pt-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative flex items-center justify-center w-4 h-4 rounded border border-slate-600 group-hover:border-indigo-400 transition-colors">
                    <input type="checkbox" className="peer sr-only" />
                    <div className="peer-checked:bg-indigo-500 absolute inset-0 rounded-[3px] transition-colors" />
                  </div>
                  <span className="text-slate-400 group-hover:text-slate-300 transition-colors">Remember Me</span>
                </label>
                <a href="#" className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white rounded-xl py-3.5 font-semibold transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Login 
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </>
                )}
              </button>
            </form>
            
            <div className="mt-8 relative flex items-center">
              <div className="flex-grow border-t border-white/10"></div>
              <span className="flex-shrink-0 mx-4 text-xs font-medium text-slate-500 uppercase tracking-widest">OR Continue With</span>
              <div className="flex-grow border-t border-white/10"></div>
            </div>

            <div className="mt-8 space-y-3">
              <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl py-3 text-sm font-medium transition-all flex items-center justify-center gap-3">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>
              
              <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl py-3 text-sm font-medium transition-all flex items-center justify-center gap-3">
                <svg className="w-5 h-5" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 0H0V10H10V0Z" fill="#F25022"/>
                  <path d="M21 0H11V10H21V0Z" fill="#7FBA00"/>
                  <path d="M10 11H0V21H10V11Z" fill="#00A4EF"/>
                  <path d="M21 11H11V21H21V11Z" fill="#FFB900"/>
                </svg>
                Continue with Microsoft
              </button>

              <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl py-3 text-sm font-medium transition-all flex items-center justify-center gap-3">
                <Github className="w-5 h-5" />
                Continue with GitHub
              </button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-slate-400 text-sm">
                Don't have an account?{' '}
                <button onClick={() => navigate('/signup')} className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                  Create Account
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
