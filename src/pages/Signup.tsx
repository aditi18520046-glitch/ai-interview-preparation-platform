import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { User, Lock, Eye, EyeOff, Loader2, Mail, CheckCircle2, XCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import Navbar from '../components/Navbar';
import { getAuthUsers, hashPassword, saveAuthUsers } from '../lib/auth';
import { useAuthStore } from '../store/authStore';

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [reqLength, setReqLength] = useState(false);
  const [reqUpper, setReqUpper] = useState(false);
  const [reqLower, setReqLower] = useState(false);
  const [reqNumber, setReqNumber] = useState(false);
  const [reqSpecial, setReqSpecial] = useState(false);

  useEffect(() => {
    setReqLength(password.length >= 8);
    setReqUpper(/[A-Z]/.test(password));
    setReqLower(/[a-z]/.test(password));
    setReqNumber(/[0-9]/.test(password));
    setReqSpecial(/[^A-Za-z0-9]/.test(password));
  }, [password]);

  const passwordStrength = [reqLength, reqUpper, reqLower, reqNumber, reqSpecial].filter(Boolean).length;
  const isPasswordValid = passwordStrength === 5;

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    if (!isPasswordValid) {
      toast.error('Please meet all password requirements');
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      const users = getAuthUsers();
      
      if (users.find(u => u.email === email)) {
        toast.error('Email is already registered.');
        return;
      }
      
      const newUser = {
        id: Math.random().toString(36).substring(2, 15),
        name,
        email,
        passwordHash: hashPassword(password),
      };
      
      saveAuthUsers([...users, newUser]);
      login({ id: newUser.id, name: newUser.name, email: newUser.email });
      
      toast.success('Account created successfully');
      navigate('/dashboard');
    }, 800);
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 2) return 'bg-rose-500';
    if (passwordStrength <= 4) return 'bg-yellow-500';
    return 'bg-emerald-500';
  };

  const renderRequirement = (met: boolean, text: string) => (
    <div className={`flex items-center gap-2 text-xs ${met ? 'text-emerald-400' : 'text-slate-500'}`}>
      {met ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
      <span>{text}</span>
    </div>
  );

  return (
    <div className="min-h-[100dvh] bg-slate-950 text-slate-50 font-sans flex flex-col relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px]"></div>
      <div className="absolute top-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px]"></div>

      <Navbar />

      <div className="flex-1 flex flex-col md:flex-row items-center justify-center p-6 gap-12 max-w-7xl mx-auto w-full z-10">
        
        {/* Left Side: Hero Text */}
        <div className="hidden md:flex flex-col max-w-md">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
              Start your journey with <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                InterviewAI
              </span>
            </h1>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Create an account to access personalized mock interviews, AI-driven feedback, and a tailored learning roadmap.
            </p>
          </motion.div>
        </div>

        {/* Right Side: Auth Form */}
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 to-emerald-500"></div>
            
            <h2 className="text-2xl font-bold mb-2 text-white">Create Account</h2>
            <Link to="/" className="text-indigo-400 hover:text-indigo-300 text-sm font-medium mb-6 inline-block transition-colors">
              &larr; Back to Home
            </Link>
            <p className="text-slate-400 text-sm mb-8">Join us and start preparing today.</p>

            <form onSubmit={handleSignup} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5 ml-1">Full Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-indigo-400 transition-colors">
                    <User className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-950/50 border border-white/10 text-white rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all placeholder:text-slate-600"
                    placeholder="John Doe"
                  />
                </div>
              </div>
              
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
                    placeholder="john@example.com"
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
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                
                {/* Password Strength Meter */}
                {password.length > 0 && (
                  <div className="mt-3">
                    <div className="flex gap-1 h-1.5 mb-2">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div 
                          key={level} 
                          className={`flex-1 rounded-full transition-colors duration-300 ${passwordStrength >= level ? getStrengthColor() : 'bg-slate-800'}`} 
                        />
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-y-1">
                      {renderRequirement(reqLength, 'At least 8 characters')}
                      {renderRequirement(reqUpper, 'One uppercase letter')}
                      {renderRequirement(reqLower, 'One lowercase letter')}
                      {renderRequirement(reqNumber, 'One number')}
                      {renderRequirement(reqSpecial, 'One special character')}
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white rounded-xl py-3.5 font-semibold transition-all shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account 
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </>
                )}
              </button>
            </form>
            
            <div className="mt-8 text-center">
              <p className="text-slate-400 text-sm">
                Already have an account?{' '}
                <button onClick={() => navigate('/login')} className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                  Sign In
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
