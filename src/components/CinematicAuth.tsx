import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, User, Globe, ArrowRight, ShieldCheck, Play, Sparkles, Film, Compass, Tv } from 'lucide-react';
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
  const [isSignUp, setIsSignUp] = useState<boolean>(true);
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

  // Password strength checker
  const getPasswordStrength = () => {
    if (!password) return { label: '', color: 'bg-white/10', percent: 0 };
    if (password.length < 6) return { label: 'Weak', color: 'bg-red-500', percent: 30 };
    if (password.length < 10) return { label: 'Good', color: 'bg-amber-500', percent: 65 };
    return { label: 'Luxurious / Secure', color: 'bg-[#00D1FF]', percent: 100 };
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Basic validations
    if (!email.trim()) {
      setError('An email address is required to register your private screening pass.');
      return;
    }
    if (!email.includes('@')) {
      setError('Please provide a valid email format.');
      return;
    }
    if (!password) {
      setError('A secure passkey is required.');
      return;
    }
    if (password.length < 6) {
      setError('Passkey must be at least 6 characters long.');
      return;
    }

    if (isSignUp) {
      if (!name.trim()) {
        setError('Please enter your esteemed name.');
        return;
      }
      if (!agreeTerms) {
        setError('You must accept the CineWorld Luxury terms of private screening to unlock entry.');
        return;
      }
    }

    setIsLoading(true);

    // Simulate luxury credentials generation with cinematic delay
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(isSignUp ? 'Screening Account Activated!' : 'Welcome back, Cinephile!');
      
      setTimeout(() => {
        onAuthSuccess({
          isLoggedIn: true,
          userName: isSignUp ? name.trim() : email.split('@')[0],
          email: email.trim(),
          password: password, // For mock persistence
          selectedAvatar: selectedAvatar,
          region: region,
          preferredLanguage: language
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

            {/* Authentication tabs */}
            <div className="flex border-b border-white/5 mb-6">
              <button
                type="button"
                onClick={() => { setIsSignUp(true); setError(''); }}
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
                onClick={() => { setIsSignUp(false); setError(''); }}
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
                    className="p-3 bg-red-950/50 border border-red-500/20 rounded-xl text-xs text-red-400 font-medium leading-relaxed"
                  >
                    ⚠️ {error}
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

            <div className="mt-4 text-center">
              <span className="text-[11px] text-white/30 font-mono">
                {isSignUp ? "Already hold a screening pass?" : "Need a new private screening seat?"}{' '}
                <button
                  type="button"
                  onClick={() => { setIsSignUp(!isSignUp); setError(''); }}
                  className="text-[#00D1FF] hover:underline font-bold"
                >
                  {isSignUp ? 'Sign In Now' : 'Sign Up Now'}
                </button>
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
