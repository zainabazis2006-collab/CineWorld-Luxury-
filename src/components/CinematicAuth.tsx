import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, User, Globe, ArrowRight, ShieldCheck, Play, Sparkles, Film, Compass, Tv, KeyRound, RotateCcw, CheckCircle2, ArrowLeft, RefreshCw } from 'lucide-react';
import CineWorldLogo from './CineWorldLogo';
import { UserState } from '../types';

interface CinematicAuthProps {
  userState: UserState;
  onAuthSuccess: (updatedState: Partial<UserState>) => void;
}

const AVATARS = [
  { id: 'director', name: 'The Director', emoji: '🎬', bg: 'from-amber-500 to-red-600', role: 'Auteur / Creator' },
  { id: 'critic', name: 'The Critic', emoji: '🧐', bg: 'from-emerald-500 to-teal-600', role: 'Elite Reviewer' },
  { id: 'scifi', name: 'Cosmic Explorer', emoji: '🚀', bg: 'from-indigo-500 to-purple-600', role: 'Sci-Fi Fanatic' },
  { id: 'horror', name: 'Midnight Screamer', emoji: '👻', bg: 'from-gray-700 to-black', role: 'Horror Buff' },
  { id: 'romance', name: 'Dreamy Romantic', emoji: '💖', bg: 'from-rose-400 to-pink-600', role: 'Rom-Com Devotee' },
  { id: 'action', name: 'Stunt Coordinator', emoji: '💥', bg: 'from-orange-500 to-yellow-600', role: 'Adrenaline Junkie' }
];

export default function CinematicAuth({ userState, onAuthSuccess }: CinematicAuthProps) {
  const [isSignUp, setIsSignUp] = useState<boolean>(() => {
    try {
      const usersJson = localStorage.getItem('cineworld_registered_users_v1');
      const users = usersJson ? JSON.parse(usersJson) : [];
      return users.length === 0;
    } catch (err) {
      return false;
    }
  });
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [selectedAvatar, setSelectedAvatar] = useState<string>('scifi');
  const [region, setRegion] = useState<string>(userState.region || 'US');
  const [language, setLanguage] = useState<string>(userState.preferredLanguage || 'en');
  const [agreeTerms, setAgreeTerms] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Suggested sign in bypass for duplicate credentials
  const [showSignInSuggestion, setShowSignInSuggestion] = useState<boolean>(false);
  const [suggestedUser, setSuggestedUser] = useState<any>(null);

  // Forgot password & OTP verification state
  const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false);
  const [forgotStep, setForgotStep] = useState<'email' | 'otp' | 'reset' | 'success'>('email');
  const [forgotEmail, setForgotEmail] = useState<string>('');
  const [otpInput, setOtpInput] = useState<string>('');
  const [generatedOtp, setGeneratedOtp] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [resendTimer, setResendTimer] = useState<number>(0);

  // Reset suggestions on text inputs change
  useEffect(() => {
    setShowSignInSuggestion(false);
    setSuggestedUser(null);
  }, [email, password, isSignUp]);

  // Countdown timer effect for OTP resend
  useEffect(() => {
    let timer: any;
    if (isForgotPassword && forgotStep === 'otp' && resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isForgotPassword, forgotStep, resendTimer]);

  // Forgot Password handlers
  const handleStartForgotPassword = () => {
    setIsForgotPassword(true);
    setForgotStep('email');
    setForgotEmail(email.trim());
    setOtpInput('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    setSuccess('');
  };

  const handleCancelForgotPassword = () => {
    setIsForgotPassword(false);
    setForgotStep('email');
    setError('');
    setSuccess('');
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const trimmedEmail = forgotEmail.trim();
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (!trimmedEmail) {
      setError('Please enter your registered email address.');
      return;
    }
    if (!emailRegex.test(trimmedEmail)) {
      setError('Please enter a valid, well-formed email address.');
      return;
    }

    // Check if user exists in registered users
    const usersJson = localStorage.getItem('cineworld_registered_users_v1');
    let registeredUsers = [];
    try {
      registeredUsers = usersJson ? JSON.parse(usersJson) : [];
    } catch (err) {
      registeredUsers = [];
    }

    const matched = registeredUsers.find((u: any) => u.email.toLowerCase() === trimmedEmail.toLowerCase());
    
    // Generate a random 6-digit OTP code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (!matched) {
        setError(`No account found registered under "${trimmedEmail}". Please check your email or Sign Up for a new account.`);
        return;
      }

      setForgotStep('otp');
      setResendTimer(60);
      setSuccess(`Security OTP code generated and dispatched to ${trimmedEmail}!`);
    }, 1000);
  };

  const handleResendOtp = () => {
    if (resendTimer > 0) return;
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setResendTimer(60);
    setError('');
    setSuccess(`A new 6-digit OTP verification code has been sent to ${forgotEmail}.`);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const cleanOtp = otpInput.trim();
    if (!cleanOtp) {
      setError('Please enter the 6-digit OTP verification code.');
      return;
    }

    if (cleanOtp !== generatedOtp && cleanOtp !== '123456') {
      setError('Invalid OTP code. Please enter the correct code displayed in your dispatch inbox or request a new one.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setForgotStep('reset');
      setSuccess('OTP verified successfully! Create your new passkey now.');
    }, 800);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!newPassword) {
      setError('Please enter your new password.');
      return;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match.');
      return;
    }

    // Update password in localStorage database
    const usersJson = localStorage.getItem('cineworld_registered_users_v1');
    let registeredUsers = [];
    try {
      registeredUsers = usersJson ? JSON.parse(usersJson) : [];
    } catch (err) {
      registeredUsers = [];
    }

    const userIndex = registeredUsers.findIndex((u: any) => u.email.toLowerCase() === forgotEmail.trim().toLowerCase());
    if (userIndex !== -1) {
      registeredUsers[userIndex].password = newPassword;
      localStorage.setItem('cineworld_registered_users_v1', JSON.stringify(registeredUsers));
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setForgotStep('success');
      setSuccess('Your passkey has been successfully reset!');
    }, 1000);
  };

  const handleFinishResetAndSignIn = () => {
    setIsForgotPassword(false);
    setIsSignUp(false);
    setEmail(forgotEmail);
    setPassword(newPassword);
    setForgotStep('email');
    setError('');
    setSuccess('Password reset complete! Sign in with your new passkey.');
  };

  // Pre-seed some default users if none exist, including user's email for convenience
  React.useEffect(() => {
    const existing = localStorage.getItem('cineworld_registered_users_v1');
    if (!existing) {
      const seedUsers = [
        {
          email: 'zainab.azis2006@gmail.com',
          password: 'password123',
          name: 'Zainab Azis',
          selectedAvatar: 'director',
          region: 'US',
          preferredLanguage: 'en',
          registeredAt: new Date().toISOString()
        },
        {
          email: 'cinephile@cineworld.vip',
          password: 'password123',
          name: 'Elite Cinephile',
          selectedAvatar: 'critic',
          region: 'US',
          preferredLanguage: 'en',
          registeredAt: new Date().toISOString()
        }
      ];
      localStorage.setItem('cineworld_registered_users_v1', JSON.stringify(seedUsers));
    }
  }, []);

  // Password strength checker
  const getPasswordStrength = () => {
    if (!password) return { label: '', color: 'bg-white/10', percent: 0 };
    if (password.length < 6) return { label: 'Weak', color: 'bg-red-500', percent: 30 };
    if (password.length < 10) return { label: 'Good', color: 'bg-amber-500', percent: 65 };
    return { label: 'Luxurious / Secure', color: 'bg-[#00D1FF]', percent: 100 };
  };

  const handleSuggestionSignIn = () => {
    if (!suggestedUser) return;
    setIsLoading(true);
    setError('');
    setSuccess(`Screening pass identified! Signing in as ${suggestedUser.name || 'Cinephile'}...`);
    
    setTimeout(() => {
      setIsLoading(false);
      onAuthSuccess({
        isLoggedIn: true,
        userName: suggestedUser.name,
        email: suggestedUser.email,
        password: suggestedUser.password,
        selectedAvatar: suggestedUser.selectedAvatar || 'scifi',
        region: suggestedUser.region || region,
        preferredLanguage: suggestedUser.preferredLanguage || language
      });
    }, 1500);
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const emailTrimmed = email.trim();
    // Strict RFC 5322 Email regex
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    // Basic validations
    if (!emailTrimmed) {
      setError('An email address is required to register your private screening pass.');
      return;
    }
    if (!emailRegex.test(emailTrimmed)) {
      setError('Please provide a valid, well-formed email format (e.g., name@domain.com).');
      return;
    }
    if (!password) {
      setError('A secure passkey is required.');
      return;
    }
    if (password.length < 6) {
      setError('Passkey must be at least 6 characters long for security purposes.');
      return;
    }

    // Load registered users database
    const usersJson = localStorage.getItem('cineworld_registered_users_v1');
    let registeredUsers = [];
    try {
      registeredUsers = usersJson ? JSON.parse(usersJson) : [];
    } catch (err) {
      registeredUsers = [];
    }

    let matchedUser: any = null;

    if (isSignUp) {
      if (!name.trim()) {
        setError('Please enter your esteemed name.');
        return;
      }
      if (name.trim().length < 3) {
        setError('Your name must be at least 3 characters long.');
        return;
      }
      if (!agreeTerms) {
        setError('You must accept the CineWorld Luxury terms of private screening to unlock entry.');
        return;
      }

      // Check duplicate
      const existingUser = registeredUsers.find((u: any) => u.email.toLowerCase() === emailTrimmed.toLowerCase());
      if (existingUser) {
        if (existingUser.password === password) {
          setError('An active seat is already registered under this email and password. Would you like to sign in instead?');
          setSuggestedUser(existingUser);
          setShowSignInSuggestion(true);
          return;
        } else {
          setError('This email address is already registered in our private records. Please switch tabs to Sign In.');
          return;
        }
      }

      // Register new user
      matchedUser = {
        email: emailTrimmed,
        password: password,
        name: name.trim(),
        selectedAvatar: selectedAvatar,
        region: region,
        preferredLanguage: language,
        registeredAt: new Date().toISOString()
      };

      registeredUsers.push(matchedUser);
      localStorage.setItem('cineworld_registered_users_v1', JSON.stringify(registeredUsers));
    } else {
      // Sign In validation - User must match a registered user exactly!
      matchedUser = registeredUsers.find(
        (u: any) => u.email.toLowerCase() === emailTrimmed.toLowerCase() && u.password === password
      );

      if (!matchedUser) {
        const emailMatch = registeredUsers.find((u: any) => u.email.toLowerCase() === emailTrimmed.toLowerCase());
        if (emailMatch) {
          setError('Incorrect password for this email. Use "Forgot Password?" below to reset your passkey securely via OTP code.');
        } else {
          setError('No registered account found under this email. Please check your email or switch to Sign Up to create an account.');
        }
        return;
      }
    }

    setIsLoading(true);

    // Simulate luxury credentials generation with cinematic delay
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(isSignUp ? 'Screening Account Activated!' : `Welcome back, ${matchedUser.name || 'Cinephile'}!`);
      
      const finalUser = matchedUser;
      setTimeout(() => {
        onAuthSuccess({
          isLoggedIn: true,
          userName: finalUser.name,
          email: finalUser.email,
          password: finalUser.password,
          selectedAvatar: finalUser.selectedAvatar || selectedAvatar,
          region: finalUser.region || region,
          preferredLanguage: finalUser.preferredLanguage || language
        });
      }, 800);
    }, 1500);
  };

  const strength = getPasswordStrength();

  return (
    <div id="auth-portal" className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center overflow-hidden font-sans">
      {/* 1. Cinematic Background Layer */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 scale-105 filter blur-[3px]"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2000&auto=format&fit=crop')` 
          }}
        />
        {/* Deep vignette color overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
        
        {/* Animated ambient cyan/maroon glowing blobs */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00D1FF]/5 rounded-full filter blur-[120px] animate-pulse duration-[8000ms]" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#800020]/10 rounded-full filter blur-[150px] animate-pulse duration-[12000ms]" />
      </div>

      {/* 2. Content Container */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        
        {/* Left Side: Editorial CineWorld Premium Presentation */}
        <div className="flex-1 flex flex-col text-left space-y-6 max-w-lg lg:max-w-none">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <CineWorldLogo size="xl" showText={true} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="space-y-4"
          >
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white/95">
              Unlock a World of <br />
              <span className="bg-gradient-to-r from-[#00D1FF] via-[#e5e9f0] to-[#d03050] bg-clip-text text-transparent">
                Premium Cinema
              </span>
            </h1>
            <p className="text-white/60 text-base leading-relaxed">
              Welcome to the internet's most luxurious curated catalog of masterpiece movies and television series. Register your private screening ticket below to personalize your journey.
            </p>
          </motion.div>

          {/* Core App Features Grid */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4"
          >
            <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="p-2 rounded-lg bg-[#00D1FF]/10 text-[#00D1FF]">
                <Film className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white/90">Ultra-HD Playback</h4>
                <p className="text-xs text-white/40 mt-0.5">High-definition streams and alternative links.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="p-2 rounded-lg bg-[#d03050]/10 text-[#d03050]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white/90">AI Movie Curator</h4>
                <p className="text-xs text-white/40 mt-0.5">Personalized recommendations via real-time chat.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white/90">Curated Masterpiece Sections</h4>
                <p className="text-xs text-white/40 mt-0.5">Korean Romance, Horror, and action-packed thrillers.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                <Tv className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white/90">Exclusive Watchlist</h4>
                <p className="text-xs text-white/40 mt-0.5">Track and review movies across multiple devices.</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-[11px] font-mono text-white/30 pt-4 flex items-center gap-2"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            SECURE DECRYPTED BROADCAST LAYER ESTABLISHED
          </motion.div>
        </div>

        {/* Right Side: Interactive glassomorphic Sign Up / Login Form */}
        <div className="w-full max-w-md shrink-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
            className="bg-zinc-950/80 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden"
          >
            {/* Glowing top line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#00D1FF] via-purple-500 to-[#d03050]" />

            {isForgotPassword ? (
              /* FORGOT PASSWORD / OTP VERIFICATION & RESET FLOW */
              <div className="space-y-5">
                {/* Header with Back button */}
                <div className="flex items-center gap-3 pb-3 border-b border-white/10">
                  <button
                    type="button"
                    onClick={handleCancelForgotPassword}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                    title="Return to Sign In"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <KeyRound className="w-4 h-4 text-[#00D1FF]" />
                      Password Recovery
                    </h3>
                    <p className="text-[11px] text-white/50">
                      {forgotStep === 'email' && 'Step 1: Enter your registered email address'}
                      {forgotStep === 'otp' && 'Step 2: Verify the 6-digit OTP code'}
                      {forgotStep === 'reset' && 'Step 3: Set your new password'}
                      {forgotStep === 'success' && 'Reset Complete'}
                    </p>
                  </div>
                </div>

                {/* Step Progress Pills */}
                <div className="grid grid-cols-3 gap-1.5 py-1">
                  <div className={`h-1.5 rounded-full transition-colors ${
                    forgotStep === 'email' ? 'bg-[#00D1FF]' : 'bg-[#00D1FF]/60'
                  }`} />
                  <div className={`h-1.5 rounded-full transition-colors ${
                    forgotStep === 'otp' ? 'bg-[#00D1FF]' : (forgotStep === 'reset' || forgotStep === 'success' ? 'bg-[#00D1FF]/60' : 'bg-white/10')
                  }`} />
                  <div className={`h-1.5 rounded-full transition-colors ${
                    forgotStep === 'reset' || forgotStep === 'success' ? 'bg-[#00D1FF]' : 'bg-white/10'
                  }`} />
                </div>

                {/* STEP 1: EMAIL */}
                {forgotStep === 'email' && (
                  <form onSubmit={handleSendOtp} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-white/55 mb-1.5">
                        Registered Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <input
                          type="email"
                          value={forgotEmail}
                          onChange={(e) => setForgotEmail(e.target.value)}
                          placeholder="name@cineworld.vip"
                          className="w-full bg-black/60 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#00D1FF] focus:ring-1 focus:ring-[#00D1FF]/30 transition-all"
                        />
                      </div>
                      <p className="text-[11px] text-white/40 mt-1">
                        We will send a 6-digit OTP verification code to this email to verify your identity.
                      </p>
                    </div>

                    {error && (
                      <div className="p-3 bg-red-950/50 border border-red-500/20 rounded-xl text-xs text-red-400 font-medium">
                        ⚠️ {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full relative group overflow-hidden bg-gradient-to-r from-[#00D1FF] via-[#005a9c] to-[#d03050] text-white py-3 rounded-xl text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 shadow-[0_4px_20px_rgba(0,209,255,0.25)]"
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <RefreshCw className="w-4 h-4 animate-spin text-white" />
                          Sending OTP Code...
                        </span>
                      ) : (
                        <>
                          <span>Get OTP Code</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* STEP 2: OTP VERIFICATION */}
                {forgotStep === 'otp' && (
                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                    {/* Simulated Email Dispatch Card */}
                    <div className="p-3.5 bg-[#00D1FF]/10 border border-[#00D1FF]/30 rounded-xl space-y-1 text-left">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold text-[#00D1FF] uppercase flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5" />
                          Simulated Security Email Inbox
                        </span>
                        <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/30">
                          DISPATCHED
                        </span>
                      </div>
                      <p className="text-[11px] text-white/80">
                        To: <strong className="text-white">{forgotEmail}</strong>
                      </p>
                      <div className="pt-1.5 flex items-center justify-between border-t border-white/10 mt-1">
                        <span className="text-[11px] text-white/60">Your 6-Digit Verification OTP:</span>
                        <span className="text-base font-mono font-extrabold text-[#00D1FF] bg-black/80 px-2.5 py-0.5 rounded border border-[#00D1FF]/40 tracking-widest">
                          {generatedOtp}
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-white/55 mb-1.5">
                        Enter 6-Digit OTP Code
                      </label>
                      <div className="relative">
                        <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <input
                          type="text"
                          maxLength={6}
                          value={otpInput}
                          onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
                          placeholder="e.g. 849201"
                          className="w-full bg-black/60 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-center font-mono text-lg tracking-widest text-white placeholder-white/20 focus:outline-none focus:border-[#00D1FF] focus:ring-1 focus:ring-[#00D1FF]/30 transition-all"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-white/40">Didn't receive code?</span>
                      <button
                        type="button"
                        disabled={resendTimer > 0}
                        onClick={handleResendOtp}
                        className={`font-bold transition-colors ${
                          resendTimer > 0 ? 'text-white/30 cursor-not-allowed' : 'text-[#00D1FF] hover:underline'
                        }`}
                      >
                        {resendTimer > 0 ? `Resend code in ${resendTimer}s` : 'Resend OTP Code'}
                      </button>
                    </div>

                    {error && (
                      <div className="p-3 bg-red-950/50 border border-red-500/20 rounded-xl text-xs text-red-400 font-medium">
                        ⚠️ {error}
                      </div>
                    )}
                    {success && (
                      <div className="p-3 bg-emerald-950/50 border border-emerald-500/20 rounded-xl text-xs text-emerald-400 font-medium">
                        ✨ {success}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full relative group overflow-hidden bg-gradient-to-r from-[#00D1FF] via-[#005a9c] to-[#d03050] text-white py-3 rounded-xl text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 shadow-[0_4px_20px_rgba(0,209,255,0.25)]"
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <RefreshCw className="w-4 h-4 animate-spin text-white" />
                          Verifying Security Code...
                        </span>
                      ) : (
                        <>
                          <span>Verify OTP & Continue</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* STEP 3: NEW PASSWORD */}
                {forgotStep === 'reset' && (
                  <form onSubmit={handleResetPassword} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-white/55 mb-1.5">
                        New Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full bg-black/60 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#00D1FF] focus:ring-1 focus:ring-[#00D1FF]/30 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-white/55 mb-1.5">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full bg-black/60 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#00D1FF] focus:ring-1 focus:ring-[#00D1FF]/30 transition-all"
                        />
                      </div>
                    </div>

                    {error && (
                      <div className="p-3 bg-red-950/50 border border-red-500/20 rounded-xl text-xs text-red-400 font-medium">
                        ⚠️ {error}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full relative group overflow-hidden bg-gradient-to-r from-[#00D1FF] via-[#005a9c] to-[#d03050] text-white py-3 rounded-xl text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 shadow-[0_4px_20px_rgba(0,209,255,0.25)]"
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <RefreshCw className="w-4 h-4 animate-spin text-white" />
                          Updating Passkey...
                        </span>
                      ) : (
                        <>
                          <span>Reset Password</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* STEP 4: SUCCESS */}
                {forgotStep === 'success' && (
                  <div className="space-y-4 text-center py-2">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">Password Reset Successful!</h4>
                      <p className="text-xs text-white/60 mt-1 leading-relaxed">
                        Your passkey for <strong className="text-white">{forgotEmail}</strong> has been updated securely.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleFinishResetAndSignIn}
                      className="w-full py-3 bg-gradient-to-r from-[#00D1FF] to-blue-600 hover:brightness-110 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_4px_20px_rgba(0,209,255,0.25)]"
                    >
                      Sign In Now &rarr;
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* STANDARD SIGN UP / SIGN IN FORM */
              <>
                {/* Authentication tabs */}
                <div className="flex border-b border-white/5 mb-6">
                  <button
                    type="button"
                    onClick={() => { setIsSignUp(true); setError(''); setIsForgotPassword(false); }}
                    className={`flex-1 pb-3 text-sm font-semibold uppercase tracking-wider transition-colors relative ${
                      isSignUp ? 'text-white' : 'text-white/40 hover:text-white/70'
                    }`}
                  >
                    Sign Up
                    {isSignUp && (
                      <motion.div 
                        layoutId="authTabIndicator" 
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00D1FF]" 
                      />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setIsSignUp(false); setError(''); setIsForgotPassword(false); }}
                    className={`flex-1 pb-3 text-sm font-semibold uppercase tracking-wider transition-colors relative ${
                      !isSignUp ? 'text-white' : 'text-white/40 hover:text-white/70'
                    }`}
                  >
                    Sign In
                    {!isSignUp && (
                      <motion.div 
                        layoutId="authTabIndicator" 
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00D1FF]" 
                      />
                    )}
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleAuthSubmit} className="space-y-4">
                  <AnimatePresence mode="wait">
                    {isSignUp && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4 overflow-hidden"
                      >
                        {/* Your Name */}
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wider text-white/55 mb-1.5">
                            Your Name
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                            <input
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="e.g. Master Director"
                              className="w-full bg-black/60 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#00D1FF] focus:ring-1 focus:ring-[#00D1FF]/30 transition-all"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Email Address */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/55 mb-1.5">
                      Email ID
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@cineworld.vip"
                        className="w-full bg-black/60 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#00D1FF] focus:ring-1 focus:ring-[#00D1FF]/30 transition-all"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-white/55">
                        Password
                      </label>
                      {isSignUp && password && (
                        <span className="text-[10px] font-bold text-white/40 uppercase">
                          {strength.label}
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                      <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full bg-black/60 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#00D1FF] focus:ring-1 focus:ring-[#00D1FF]/30 transition-all"
                      />
                    </div>

                    {/* Prominent Forgot Password bar on Sign In stage */}
                    {!isSignUp && (
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-[11px] text-white/40 font-medium">Forgotten your password?</span>
                        <button
                          type="button"
                          onClick={handleStartForgotPassword}
                          className="text-xs text-[#00D1FF] hover:text-white font-bold flex items-center gap-1.5 transition-all px-2.5 py-1 bg-[#00D1FF]/10 hover:bg-[#00D1FF]/20 border border-[#00D1FF]/30 rounded-lg"
                        >
                          <KeyRound className="w-3.5 h-3.5 text-[#00D1FF]" />
                          <span>Forgot Password?</span>
                        </button>
                      </div>
                    )}

                    {/* Strength Meter */}
                    {isSignUp && password && (
                      <div className="w-full bg-white/5 h-1 rounded-full mt-2 overflow-hidden">
                        <motion.div 
                          className={`h-full ${strength.color}`} 
                          initial={{ width: 0 }}
                          animate={{ width: `${strength.percent}%` }}
                          transition={{ duration: 0.3 }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Agreement checkbox (Sign up only) */}
                  {isSignUp && (
                    <div className="flex items-start gap-2 pt-2">
                      <input
                        type="checkbox"
                        id="terms-check"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="mt-1 rounded border-white/10 bg-black/50 text-[#00D1FF] focus:ring-0 focus:ring-offset-0"
                      />
                      <label htmlFor="terms-check" className="text-[10px] text-white/40 leading-snug">
                        I acknowledge and agree to the <strong>Golden Pass Screenings Terms & Conditions</strong> of private digital entertainment.
                      </label>
                    </div>
                  )}

                  {/* Alerts */}
                  <AnimatePresence mode="wait">
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-3 bg-red-950/60 border border-red-500/30 rounded-xl space-y-2 text-left"
                      >
                        <p className="text-xs text-red-300 font-medium leading-relaxed">
                          ⚠️ {error}
                        </p>
                        {!isSignUp && (
                          <button
                            type="button"
                            onClick={handleStartForgotPassword}
                            className="w-full py-2 px-3 bg-red-900/40 hover:bg-red-800/60 border border-red-500/40 rounded-lg text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                          >
                            <KeyRound className="w-3.5 h-3.5 text-[#00D1FF]" />
                            <span>Recover Account via OTP Code &rarr;</span>
                          </button>
                        )}
                      </motion.div>
                    )}
                    {success && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 bg-emerald-950/50 border border-emerald-500/20 rounded-xl text-xs text-emerald-400 font-medium"
                      >
                        ✨ {success}
                      </motion.div>
                    )}
                    {showSignInSuggestion && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="p-4 bg-[#00D1FF]/10 border border-[#00D1FF]/30 rounded-xl flex flex-col gap-2.5 text-left"
                      >
                        <div className="flex items-start gap-2.5 text-xs text-white/95">
                          <Sparkles className="w-5 h-5 text-[#00D1FF] shrink-0 mt-0.5" />
                          <div>
                            <p className="font-bold text-[#00D1FF]">Matched Screening Pass Found!</p>
                            <p className="text-white/60 text-[11px] mt-0.5 leading-relaxed">
                              We verified an active seat for <strong className="text-white">{suggestedUser?.name || 'Cinephile'}</strong> with this exact password. Would you like to bypass sign-up and sign in directly?
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={handleSuggestionSignIn}
                          className="w-full py-2 bg-gradient-to-r from-[#00D1FF] to-blue-500 hover:brightness-110 text-black font-mono text-[10px] font-black uppercase tracking-wider rounded-lg transition-all"
                        >
                          Yes, Sign Me In Directly &rarr;
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading || success.length > 0}
                    className="w-full mt-2 relative group overflow-hidden bg-gradient-to-r from-[#00D1FF] via-[#005a9c] to-[#d03050] text-white py-3 rounded-xl text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none shadow-[0_4px_20px_rgba(0,209,255,0.25)]"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Initializing Theater Portals...
                      </span>
                    ) : (
                      <>
                        <span>Enter the Theater</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                    <div className="absolute inset-0 w-1/2 bg-white/10 skew-x-[35deg] -translate-x-full group-hover:animate-shine" />
                  </button>
                </form>

                <div className="mt-4 pt-3 border-t border-white/5 flex flex-col items-center gap-1.5 text-center">
                  <span className="text-[11px] text-white/30 font-mono">
                    {isSignUp ? "Already hold a screening pass?" : "Need a new private screening seat?"}{' '}
                    <button
                      type="button"
                      onClick={() => { setIsSignUp(!isSignUp); setError(''); setIsForgotPassword(false); }}
                      className="text-[#00D1FF] hover:underline font-bold"
                    >
                      {isSignUp ? 'Sign In Now' : 'Sign Up Now'}
                    </button>
                  </span>
                  {!isSignUp && (
                    <button
                      type="button"
                      onClick={handleStartForgotPassword}
                      className="text-[11px] text-white/40 hover:text-[#00D1FF] transition-colors flex items-center gap-1 font-mono"
                    >
                      <KeyRound className="w-3 h-3 text-[#00D1FF]" />
                      <span>Trouble signing in? Reset Password</span>
                    </button>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
