import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Search, Trash2, Download, ShieldCheck, Mail, Key, Globe, Layers, X, Calendar } from 'lucide-react';

interface UserRecord {
  email: string;
  password?: string;
  name: string;
  selectedAvatar: string;
  region: string;
  preferredLanguage: string;
  registeredAt?: string;
}

interface UserDatabaseConsoleProps {
  isOpen: boolean;
  onClose: () => void;
  onUserDeleted?: () => void;
}

export default function UserDatabaseConsole({ isOpen, onClose, onUserDeleted }: UserDatabaseConsoleProps) {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterRegion, setFilterRegion] = useState<string>('All');
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});

  // Load database from localStorage
  const loadDatabase = () => {
    const existing = localStorage.getItem('cineworld_registered_users_v1');
    if (existing) {
      try {
        const parsed = JSON.parse(existing);
        // Ensure every user has some default registration date if missing
        const sanitized = parsed.map((user: any, index: number) => ({
          ...user,
          registeredAt: user.registeredAt || new Date(Date.now() - index * 24 * 60 * 60 * 1000).toISOString()
        }));
        setUsers(sanitized);
      } catch (e) {
        console.error("Failed to parse user database", e);
        setUsers([]);
      }
    } else {
      setUsers([]);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadDatabase();
    }
  }, [isOpen]);

  // Export database as JSON file download
  const handleExportDatabase = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(users, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `cineworld_user_database_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Toggle single password visibility
  const togglePasswordVisibility = (email: string) => {
    setShowPasswords(prev => ({
      ...prev,
      [email]: !prev[email]
    }));
  };

  // Delete a user from the directory
  const handleDeleteUser = (emailToDelete: string) => {
    if (window.confirm(`Are you absolutely sure you want to revoke the luxury screening pass for: ${emailToDelete}? This action cannot be undone.`)) {
      const updated = users.filter(user => user.email.toLowerCase() !== emailToDelete.toLowerCase());
      localStorage.setItem('cineworld_registered_users_v1', JSON.stringify(updated));
      setUsers(updated);
      if (onUserDeleted) {
        onUserDeleted();
      }
    }
  };

  // Filters logic
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRegion = filterRegion === 'All' || user.region === filterRegion;
    return matchesSearch && matchesRegion;
  });

  const getAvatarEmoji = (id: string) => {
    switch (id) {
      case 'director': return '🎬';
      case 'critic': return '🧐';
      case 'scifi': return '🚀';
      case 'horror': return '👻';
      case 'romance': return '💖';
      case 'action': return '💥';
      default: return '👤';
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
        {/* Modal container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#0b0b12] border border-[#00D1FF]/30 rounded-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden shadow-[0_0_50px_rgba(0,209,255,0.25)] relative"
        >
          {/* Decorative multi-color top bar */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-500 via-[#00D1FF] to-red-600 z-30" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-all border border-white/10 z-30 cursor-pointer"
            title="Close Database Console"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header Section */}
          <div className="p-6 border-b border-white/5 bg-black/40 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="space-y-1 text-left">
              <span className="text-[10px] text-[#00D1FF] uppercase font-black tracking-widest font-mono flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> Authority Center
              </span>
              <h2 className="text-xl md:text-2xl font-black uppercase italic text-white flex items-center gap-2">
                <Users className="w-6 h-6 text-[#00D1FF]" /> VIP Registered Database
              </h2>
              <p className="text-xs text-white/40 font-mono">
                Real-time tracking of private screening licenses and user telemetry records
              </p>
            </div>

            {/* Quick stats and export */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-left font-mono">
                <p className="text-[9px] text-white/30 uppercase">Total Registered Passes</p>
                <p className="text-lg font-black text-[#00D1FF]">{users.length}</p>
              </div>

              <button
                onClick={handleExportDatabase}
                className="px-4 py-2.5 bg-gradient-to-r from-[#00D1FF] to-blue-600 hover:from-white hover:to-white text-black font-mono text-[10px] font-black uppercase tracking-wider rounded-lg flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(0,209,255,0.25)] cursor-pointer"
                title="Download entire user database in JSON format"
              >
                <Download className="w-3.5 h-3.5" /> Export DB
              </button>
            </div>
          </div>

          {/* Filter & Search Deck */}
          <div className="p-4 bg-black/20 border-b border-white/5 flex flex-col md:flex-row items-center gap-4">
            {/* Search inputs */}
            <div className="relative flex-1 w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search registered cinephiles by name or email ID..."
                className="w-full bg-[#050508] border border-white/10 focus:border-[#00D1FF] rounded-xl px-4 py-2.5 pl-11 text-xs text-white placeholder-white/30 outline-none transition-all"
              />
              <Search className="absolute left-4 top-3.5 w-4 h-4 text-white/30" />
            </div>

            {/* Region selection */}
            <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
              <span className="text-[10px] uppercase font-bold text-white/40 font-mono">Filter Region:</span>
              <div className="bg-[#050508] border border-white/10 rounded-xl px-3 py-1.5 flex items-center w-full md:w-44">
                <select
                  value={filterRegion}
                  onChange={(e) => setFilterRegion(e.target.value)}
                  className="bg-transparent border-none outline-none text-white font-mono cursor-pointer text-xs w-full"
                >
                  <option value="All" className="bg-[#0b0b12]">All Regions</option>
                  <option value="IN" className="bg-[#0b0b12]">IN (Hotstar)</option>
                  <option value="US" className="bg-[#0b0b12]">US (Global-West)</option>
                  <option value="UK" className="bg-[#0b0b12]">UK (Europe-HQ)</option>
                  <option value="JP" className="bg-[#0b0b12]">JP (Asia-East)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Database Grid/Table */}
          <div className="flex-1 overflow-auto p-6 scrollbar-thin scrollbar-thumb-white/10">
            {filteredUsers.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <p className="text-white/30 italic text-sm">No registered screening passes matching your criteria.</p>
                <button 
                  onClick={() => { setSearchQuery(''); setFilterRegion('All'); }}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-xs font-bold"
                >
                  Reset Criterias
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto border border-white/15 rounded-xl bg-black/30 backdrop-blur-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/[0.02] border-b border-white/10 text-[10px] font-mono uppercase tracking-wider text-white/40">
                      <th className="py-3 px-4">Est. Cinephile Profile</th>
                      <th className="py-3 px-4">Email Address</th>
                      <th className="py-3 px-4">Passkey / Password</th>
                      <th className="py-3 px-4">Region</th>
                      <th className="py-3 px-4">Avatar Role</th>
                      <th className="py-3 px-4">Signed Up At</th>
                      <th className="py-3 px-4 text-right">Pass Authority</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-xs text-white/80 font-sans">
                    {filteredUsers.map((user) => (
                      <tr 
                        key={user.email} 
                        className="hover:bg-white/[0.02] transition-colors"
                      >
                        {/* Name and Avatar */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2.5">
                            <span className="text-xl bg-white/5 w-8 h-8 rounded-full flex items-center justify-center border border-white/10 shrink-0">
                              {getAvatarEmoji(user.selectedAvatar)}
                            </span>
                            <span className="font-extrabold text-white uppercase tracking-tight truncate max-w-[140px]" title={user.name}>
                              {user.name}
                            </span>
                          </div>
                        </td>

                        {/* Email */}
                        <td className="py-3.5 px-4 font-mono">
                          <div className="flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5 text-white/30 shrink-0" />
                            <span className="text-white/70 select-all">{user.email}</span>
                          </div>
                        </td>

                        {/* Password */}
                        <td className="py-3.5 px-4 font-mono">
                          <div className="flex items-center gap-2">
                            <Key className="w-3.5 h-3.5 text-white/30 shrink-0" />
                            <span className="text-white/75 select-all">
                              {showPasswords[user.email] ? (
                                <span className="text-[#00D1FF] font-semibold">{user.password || 'password123'}</span>
                              ) : (
                                <span className="text-white/20 select-none">••••••••</span>
                              )}
                            </span>
                            <button
                              onClick={() => togglePasswordVisibility(user.email)}
                              className="text-[9px] uppercase tracking-widest text-white/30 hover:text-white px-1.5 py-0.5 rounded bg-white/5 hover:bg-white/10 border border-white/10 font-black"
                            >
                              {showPasswords[user.email] ? 'Hide' : 'Reveal'}
                            </button>
                          </div>
                        </td>

                        {/* Region */}
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-1.5 font-mono">
                            <Globe className="w-3.5 h-3.5 text-[#00D1FF]/60" />
                            <span className="bg-white/5 px-2 py-0.5 rounded text-white font-bold">{user.region}</span>
                          </div>
                        </td>

                        {/* Avatar */}
                        <td className="py-3.5 px-4 font-mono text-[10px] text-white/50 capitalize">
                          <span className="bg-white/5 px-2 py-0.5 rounded text-[#00D1FF] font-bold border border-white/5">
                            {user.selectedAvatar}
                          </span>
                        </td>

                        {/* Registration date */}
                        <td className="py-3.5 px-4 font-mono text-white/40 text-[10px]">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{user.registeredAt ? new Date(user.registeredAt).toLocaleDateString() : 'Curated Seed'}</span>
                          </div>
                        </td>

                        {/* Actions */}
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => handleDeleteUser(user.email)}
                            className="p-1.5 rounded-lg bg-red-600/10 hover:bg-red-600 border border-red-500/20 hover:border-transparent text-red-400 hover:text-black transition-all cursor-pointer inline-flex items-center justify-center"
                            title="Revoke Private Screening License"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Footer Deck */}
          <div className="bg-black/40 px-6 py-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
            <div className="text-left w-full">
              <p className="text-[9px] text-white/30 font-mono uppercase tracking-wider flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Database Storage Integrity Layer
              </p>
              <p className="text-[10px] text-white/50 leading-relaxed mt-0.5">
                License data is persisted in local browser storage. Any additions, updates, or deletions immediately synchronize with user sessions across portals.
              </p>
            </div>
            <button 
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white font-mono text-[10px] font-black uppercase tracking-[0.15em] rounded-lg border border-white/10 transition-all cursor-pointer"
            >
              Exit Database
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
