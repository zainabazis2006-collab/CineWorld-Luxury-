import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Bell, BellOff, Hourglass, ShieldCheck, Flame, Tv, Play, Info } from 'lucide-react';
import { UpcomingMovie, UserState } from '../types';
import { UPCOMING_RELEASES } from '../upcomingData';
import BlurUpImage from './BlurUpImage';

interface ComingSoonSectionProps {
  userState: UserState;
  setUserState: React.Dispatch<React.SetStateAction<UserState>>;
  upcomingCatalog?: UpcomingMovie[];
}

const LOCAL_TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    comingSoon: "Coming Soon",
    subtitle: "High-Budget Upcoming Releases",
    description: "Unlock exclusive backstage telemetry and classified production parameters on the most anticipated cinematic blockbusters and prestige dramas. Secure your automated transmission alert below.",
    budget: "Estimated Budget",
    expectedRelease: "Expected Premiere",
    status: "Production Phase",
    hypeLevel: "Hype Index",
    remindMe: "Request Notification Reminders",
    reminderLocked: "✓ Reminder Synchronized",
    secretsTitle: "Classified Production Secrets",
    toastSuccess: "Premium notification package successfully locked for",
    hypeStatusMax: "Absolute Hype",
    hypeStatusHigh: "Critical Mass",
    metadataTitle: "Classified Backstage Telemetry",
    hypeGlow: "Hype Core Fully Charged"
  },
  es: {
    comingSoon: "Próximamente",
    subtitle: "Lanzamientos de Alto Presupuesto",
    description: "Desbloquee telemetría exclusiva detrás de escena y parámetros de producción clasificados de los éxitos de taquilla más esperados y dramas de prestigio. Asegure su alerta de transmisión automatizada a continuación.",
    budget: "Presupuesto Estimado",
    expectedRelease: "Estreno Previsto",
    status: "Fase de Producción",
    hypeLevel: "Índice de Expectación",
    remindMe: "Solicitar Recordatorio",
    reminderLocked: "✓ Recordatorio Sincronizado",
    secretsTitle: "Secretos de Producción Clasificados",
    toastSuccess: "Paquete de notificación premium bloqueado con éxito para",
    hypeStatusMax: "Hype Absoluto",
    hypeStatusHigh: "Masa Crítica",
    metadataTitle: "Telemetría Tras Bambalinas Clasificada",
    hypeGlow: "Núcleo de Expectación Cargado"
  },
  ja: {
    comingSoon: "近日公開",
    subtitle: "超大作・注目作の最新情報",
    description: "最も期待されるシネマティック・ブロックバスターや特別ドラマの、限定バックステージ情報や極秘の制作パラメータを解禁します。以下から公開時の自動通知リマインダーを有効にしてください。",
    budget: "推定予算",
    expectedRelease: "公開予定時期",
    status: "制作段階",
    hypeLevel: "期待度指数",
    remindMe: "配信リマインダーを設定する",
    reminderLocked: "✓ リマインダー設定完了",
    secretsTitle: "極秘プロダクション情報",
    toastSuccess: "のプレミアム通知パッケージの同期が完了しました",
    hypeStatusMax: "最大期待値",
    hypeStatusHigh: "臨界質量",
    metadataTitle: "極秘バックステージデータ",
    hypeGlow: "ハイクアコアフル充電"
  },
  hi: {
    comingSoon: "जल्द ही आ रहा है",
    subtitle: "उच्च बजट की आगामी रिलीज",
    description: "सर्वाधिक प्रतीक्षित सिनेमाई ब्लॉकबस्टर और प्रतिष्ठित नाटकों पर विशेष बैकस्टेज टेलीमेट्री और वर्गीकृत उत्पादन मानकों को अनलॉक करें। नीचे अपना स्वचालित अलर्ट सुरक्षित करें।",
    budget: "अनुमानित बजट",
    expectedRelease: "अपेक्षित प्रीमियर",
    status: "उत्पादन चरण",
    hypeLevel: "हाइप इंडेक्स",
    remindMe: "सूचना अनुस्मारक का अनुरोध करें",
    reminderLocked: "✓ अनुस्मारक सिंक हो गया",
    secretsTitle: "वर्गीकृत उत्पादन रहस्य",
    toastSuccess: "के लिए प्रीमियम अधिसूचना पैकेज सफलतापूर्वक लॉक किया गया",
    hypeStatusMax: "पूर्ण हाइप",
    hypeStatusHigh: "क्रिटिकल मास",
    metadataTitle: "वर्गीकृत बैकस्टेज टेलीमेट्री",
    hypeGlow: "हाइप कोर पूरी तरह चार्ज"
  },
  ar: {
    comingSoon: "قريباً",
    subtitle: "إصدارات قادمة بميزانيات ضخمة",
    description: "افتح بيانات التتبع الحصرية خلف الكواليس ومعايير الإنتاج السرية للغاية لأكثر الأفلام والمسلسلات انتظاراً. أمّن تذكيرك التلقائي عند الإصدار أدناه.",
    budget: "الميزانية المقدرة",
    expectedRelease: "العرض الأول المتوقع",
    status: "مرحلة الإنتاج",
    hypeLevel: "مؤشر الحماس",
    remindMe: "طلب تذكير بالإشعار",
    reminderLocked: "✓ تم مزامنة التذكير",
    secretsTitle: "أسرار إنتاجية سرية للغاية",
    toastSuccess: "تم قفل حزمة الإشعارات المميزة بنجاح لـ",
    hypeStatusMax: "حماس مطلق",
    hypeStatusHigh: "الكتلة الحرجة",
    metadataTitle: "بيانات تتبع خلف الكواليس المصنفة",
    hypeGlow: "نواة الحماس مشحونة بالكامل"
  }
};

export default function ComingSoonSection({ userState, setUserState, upcomingCatalog }: ComingSoonSectionProps) {
  const lang = userState.preferredLanguage || 'en';
  const localT = LOCAL_TRANSLATIONS[lang] || LOCAL_TRANSLATIONS['en'];

  const releases = upcomingCatalog || UPCOMING_RELEASES;

  const [selectedUpcomingId, setSelectedUpcomingId] = useState<string>(releases[0]?.id || 'avatar-fire-and-ash');
  const [activeToast, setActiveToast] = useState<string | null>(null);

  const selectedRelease = releases.find(r => r.id === selectedUpcomingId) || releases[0];

  const listReminded = userState.remindedUpcomingIds || [];
  const isReminded = listReminded.includes(selectedRelease.id);

  const handleToggleReminder = (id: string, title: string) => {
    let nextReminded: string[];
    const currentlyReminded = listReminded.includes(id);

    if (currentlyReminded) {
      nextReminded = listReminded.filter(item => item !== id);
    } else {
      nextReminded = [...listReminded, id];
      // Show notification toast
      setActiveToast(`${localT.toastSuccess} "${title}"`);
      setTimeout(() => {
        setActiveToast(null);
      }, 4500);
    }

    setUserState(prev => ({
      ...prev,
      remindedUpcomingIds: nextReminded
    }));
  };

  return (
    <section className="relative z-10 max-w-7xl mx-auto px-6 py-12 border-t border-white/5" id="coming-soon-section">
      
      {/* Visual Accent Glows */}
      <div className="absolute top-[20%] right-[10%] w-[350px] h-[350px] rounded-full bg-[#00D1FF]/5 blur-[120px] pointer-events-none -z-10 animate-pulse"></div>
      
      {/* Header and Telemetry Dashboard Row */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#00D1FF] font-mono text-xs uppercase tracking-[0.3em] font-black">
            <Sparkles className="w-4 h-4 animate-spin-slow" />
            <span>Telemetry Feed: Upcoming Blockbusters</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black italic uppercase text-white tracking-tight leading-none mt-2">
            {localT.comingSoon}
          </h2>
          <p className="text-sm font-semibold uppercase tracking-wider text-white/55 font-mono">
            {localT.subtitle}
          </p>
          <p className="text-xs text-white/45 max-w-3xl leading-relaxed mt-2 font-sans">
            {localT.description}
          </p>
        </div>
        
        {/* Dynamic subscription counter badge */}
        <div className="bg-black/60 border border-white/10 rounded-2xl px-5 py-3 shrink-0 flex items-center gap-4 shadow-xl backdrop-blur-sm self-start lg:self-end">
          <div className="text-right">
            <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest font-mono">My Queue Subscriptions</p>
            <p className="text-lg font-black text-[#00D1FF] font-mono leading-none mt-1">
              {listReminded.length} <span className="text-xs text-white/40 font-normal">Active Alerts</span>
            </p>
          </div>
          <div className="p-2 bg-[#00D1FF]/10 text-[#00D1FF] rounded-lg border border-[#00D1FF]/20">
            <Bell className="w-5 h-5 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Main Interactive Workboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Deep Backstage Metadata Analysis Sheet for Selected Item */}
        <div className="lg:col-span-8 bg-[#0b0b12]/70 border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative backdrop-blur-md">
          
          {/* Main Cinematic Backdrop with dynamic aspect ratio */}
          <div className="h-64 sm:h-80 relative overflow-hidden group">
            <BlurUpImage 
              src={selectedRelease.backdropUrl} 
              alt={selectedRelease.title} 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-1000 scale-100 filter brightness-95 saturate-[1.05]"
            />
            {/* Soft gradient veil overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b12] via-transparent to-black/40"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b0b12]/70 via-transparent to-[#0b0b12]/50"></div>

            {/* Hot Hype indicator top floating */}
            <div className="absolute top-4 left-4 bg-black/85 border border-[#00D1FF]/30 rounded-xl px-3 py-1.5 flex items-center gap-2 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
              <span className="text-[10px] font-mono text-white/70 font-bold tracking-widest uppercase">
                {selectedRelease.hypeMeter >= 98 ? localT.hypeStatusMax : localT.hypeStatusHigh}
              </span>
            </div>

            {/* Float details bottom-left */}
            <div className="absolute bottom-4 left-6 right-6">
              <span className="px-2.5 py-0.5 bg-[#00D1FF]/20 text-[#00D1FF] border border-[#00D1FF]/30 text-[9px] font-mono rounded tracking-widest uppercase mb-1.5 inline-block">
                {selectedRelease.type} Release
              </span>
              <h3 className="text-2xl md:text-4xl font-black italic uppercase text-white tracking-tight drop-shadow-md">
                {selectedRelease.title}
              </h3>
            </div>
          </div>

          {/* Expanded Metadata parameters */}
          <div className="p-6 md:p-8 space-y-6">
            
            {/* Core telemetry details grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-6 border-b border-white/5 text-xs font-mono">
              <div className="space-y-1">
                <span className="text-white/40 block text-[10px] uppercase tracking-wider">{localT.budget}</span>
                <span className="text-yellow-400 font-bold text-sm">{selectedRelease.estimatedBudget}</span>
              </div>
              <div className="space-y-1">
                <span className="text-white/40 block text-[10px] uppercase tracking-wider">{localT.expectedRelease}</span>
                <span className="text-white font-bold text-sm">{selectedRelease.expectedRelease}</span>
              </div>
              <div className="space-y-1">
                <span className="text-white/40 block text-[10px] uppercase tracking-wider">{localT.status}</span>
                <span className="text-green-400 font-bold text-sm flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                  {selectedRelease.status}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-white/40 block text-[10px] uppercase tracking-wider">{localT.hypeLevel}</span>
                <span className="text-[#00D1FF] font-bold text-sm">{selectedRelease.hypeMeter}% Match</span>
              </div>
            </div>

            {/* Synopsis of upcoming show */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#00D1FF] font-mono">Briefing Synopsis</h4>
              <p className="text-sm text-white/70 leading-relaxed font-sans">
                {selectedRelease.synopsis}
              </p>
            </div>

            {/* Hype core visualization meter */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-2.5 backdrop-blur-sm">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold uppercase tracking-wider text-white/60 flex items-center gap-1.5 font-mono">
                  <Flame className="w-4 h-4 text-red-500 fill-red-500 animate-bounce" />
                  {localT.hypeLevel}
                </span>
                <span className="text-[#00D1FF] font-bold font-mono uppercase text-[10px] tracking-widest">{localT.hypeGlow} ({selectedRelease.hypeMeter}%)</span>
              </div>
              
              <div className="w-full h-3 bg-black rounded-full overflow-hidden border border-white/5 relative">
                <motion.div 
                  className="h-full bg-gradient-to-r from-red-600 via-orange-500 to-[#00D1FF] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${selectedRelease.hypeMeter}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </div>

            {/* Production Secret Notes */}
            <div className="space-y-3 pt-2">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/40 font-mono flex items-center gap-2">
                <Hourglass className="w-3.5 h-3.5 text-[#00D1FF]" />
                {localT.secretsTitle}
              </h4>
              <ul className="space-y-2">
                {selectedRelease.behindTheScenesSecrets.map((secret, i) => (
                  <li key={i} className="flex gap-2.5 items-start text-xs text-white/65 leading-relaxed font-sans">
                    <span className="p-1 bg-[#00D1FF]/10 text-[#00D1FF] rounded font-mono text-[9px] mt-0.5 shrink-0 select-none">B{i+1}</span>
                    <span>{secret}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action remind buttons */}
            <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-0.5">
                <p className="text-[10px] uppercase font-bold text-white/40 font-mono flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
                  Secured Telemetry
                </p>
                <p className="text-[11px] text-white/50 leading-snug">{selectedRelease.statusDetails}</p>
              </div>

              <button
                onClick={() => handleToggleReminder(selectedRelease.id, selectedRelease.title)}
                className={`px-5 py-3.5 rounded-xl font-bold uppercase text-xs tracking-wider transition-all duration-300 flex items-center justify-center gap-2.5 select-none ${
                  isReminded
                    ? 'bg-green-500/20 text-green-400 border border-green-500/40 hover:bg-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.15)]'
                    : 'bg-[#00D1FF]/10 text-[#00D1FF] border border-[#00D1FF]/20 hover:bg-[#00D1FF] hover:text-black hover:border-[#00D1FF] hover:shadow-[0_0_20px_rgba(0,209,255,0.45)]'
                }`}
              >
                {isReminded ? <BellOff className="w-4 h-4 text-green-400 fill-green-400" /> : <Bell className="w-4 h-4 animate-bounce" />}
                {isReminded ? localT.reminderLocked : localT.remindMe}
              </button>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Vertical Catalog of Upcoming Releases */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center justify-between text-xs uppercase tracking-widest font-mono text-white/40 pb-2 border-b border-white/5 px-1">
            <span>Choose Blockbuster</span>
            <span>({releases.length} Titles)</span>
          </div>

          <div className="space-y-3 max-h-[620px] overflow-y-auto pr-1">
            {releases.map((movie) => {
              const isSelected = movie.id === selectedUpcomingId;
              const hasAlert = listReminded.includes(movie.id);

              return (
                <div
                  key={movie.id}
                  onClick={() => setSelectedUpcomingId(movie.id)}
                  className={`relative p-4 rounded-xl cursor-pointer transition-all duration-300 border backdrop-blur-sm flex gap-4 group ${
                    isSelected
                      ? 'bg-[#00D1FF]/10 border-[#00D1FF] shadow-[0_0_15px_rgba(0,209,255,0.15)]'
                      : 'bg-black/30 border-white/5 hover:border-white/25 hover:bg-black/50'
                  }`}
                >
                  {/* Small Poster Frame */}
                  <div className="w-16 h-20 rounded-lg overflow-hidden border border-white/15 relative shrink-0">
                    <BlurUpImage 
                      src={movie.posterUrl} 
                      alt={movie.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                    />
                    {hasAlert && (
                      <div className="absolute top-1 right-1 bg-green-500 text-white p-0.5 rounded-full border border-black" title="Reminder Active">
                        <Bell className="w-2.5 h-2.5 fill-current" />
                      </div>
                    )}
                  </div>

                  {/* Quick textual summary */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                    <div className="space-y-0.5">
                      <p className="text-[9px] uppercase font-bold tracking-widest text-[#00D1FF] font-mono truncate">
                        {movie.expectedRelease} • {movie.estimatedBudget}
                      </p>
                      <h4 className="text-sm font-black uppercase text-white truncate group-hover:text-[#00D1FF] transition-colors leading-tight">
                        {movie.title}
                      </h4>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-white/40 uppercase">
                      <span className="truncate max-w-[60%]">By {movie.directorOrCreator.split(' ').slice(-1)[0]}</span>
                      <span className="text-[#00D1FF]/80 font-bold bg-white/5 px-1.5 py-0.5 rounded text-[9px]">
                        {movie.hypeMeter}% Match
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* FLY-IN TOAST ALERT FOR SUCCESSFUL SUBSCRIPTIONS */}
      <AnimatePresence>
        {activeToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[150] bg-[#050508] border-2 border-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.3)] rounded-2xl px-6 py-4 max-w-md w-[90%] text-center backdrop-blur-xl"
          >
            <div className="flex flex-col items-center gap-2">
              <div className="p-2 bg-yellow-400/20 text-yellow-400 rounded-full border border-yellow-400/40">
                <Bell className="w-5 h-5 fill-current animate-bounce" />
              </div>
              <p className="text-xs uppercase font-mono tracking-widest text-yellow-400 font-bold">Transmission Alerts Synchronized</p>
              <p className="text-xs text-white/80 font-medium leading-relaxed font-sans">
                {activeToast}
              </p>
              <p className="text-[9px] text-white/40 font-mono mt-1 uppercase tracking-widest">Global delivery guaranteed upon digital release</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
