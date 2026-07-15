import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Flame, Sparkles, Trophy, BarChart3, RotateCcw, Play } from 'lucide-react';
import { Movie, UserState } from '../types';
import BlurUpImage from './BlurUpImage';

interface TrendingChartProps {
  catalog: Movie[];
  userState: UserState;
  handleMovieSelect: (id: string) => void;
}

const LOCAL_TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    title: "Trending Now",
    subtitle: "Real-Time CineWorld Click Engagement Analysis",
    description: "Live telemetry analyzing the top 5 most engaged cinematic titles based on real-time user session clicks. Interact with the chart or click titles below to instantly stream trailers.",
    clicks: "Session Interactions",
    rank: "Rank",
    movie: "Cinematic Title",
    engagementGlow: "Engagement Core Active",
    noData: "No interaction telemetry recorded yet. Click on movies above to train the dynamic model!",
    resetEngage: "Reset Telemetry Base",
    viewTrailer: "View Trailer"
  },
  es: {
    title: "Tendencias de Hoy",
    subtitle: "Análisis de clics en tiempo real",
    description: "Telemetría en vivo que analiza los 5 títulos cinematográficos con mayor interacción según los clics en tiempo real de la sesión del usuario. Haz clic para ver tráilers.",
    clicks: "Interacciones",
    rank: "Rango",
    movie: "Título",
    engagementGlow: "Núcleo de Interacción Activo",
    noData: "Aún no se ha registrado telemetría de interacción. ¡Haz clic en las películas de arriba para entrenar el modelo!",
    resetEngage: "Reiniciar Telemetría",
    viewTrailer: "Ver Tráiler"
  },
  ja: {
    title: "今急上昇中の作品",
    subtitle: "リアルタイム・クリック・エンゲージメント分析",
    description: "ユーザーセッション中のリアルタイムクリックに基づく、エンゲージメントの高い上位5作品を可視化したライブデータ。クリックすると予告編が再生されます。",
    clicks: "セッション操作数",
    rank: "順位",
    movie: "作品名",
    engagementGlow: "エンゲージメントコア作動中",
    noData: "インタラクションデータがまだ記録されていません。上の映画をクリックして、ダイナミックモデルをトレーニングしてください！",
    resetEngage: "テレメトリをリセット",
    viewTrailer: "予告編を見る"
  },
  hi: {
    title: "अभी ट्रेंडिंग में",
    subtitle: "वास्तविक समय सिनेवर्ल्ड क्लिक जुड़ाव विश्लेषण",
    description: "वास्तविक समय के उपयोगकर्ता सत्र क्लिक के आधार पर शीर्ष 5 सबसे आकर्षक सिनेमाई शीर्षकों का विश्लेषण करने वाली लाइव टेलीमेट्री। ट्रेलरों को तुरंत स्ट्रीम करने के लिए चार्ट के साथ बातचीत करें।",
    clicks: "सत्र बातचीत",
    rank: "रैंक",
    movie: "सिनेमाई शीर्षक",
    engagementGlow: "सक्रिय जुड़ाव कोर",
    noData: "अभी तक कोई बातचीत टेलीमेट्री दर्ज नहीं की गई है। गतिशील मॉडल को प्रशिक्षित करने के लिए ऊपर फिल्मों पर क्लिक करें!",
    resetEngage: "टेलीमेट्री रीसेट करें",
    viewTrailer: "ट्रेलर देखें"
  },
  ar: {
    title: "الأكثر شعبية الآن",
    subtitle: "تحليل تفاعل النقرات في الوقت الفعلي",
    description: "بيانات تتبع حية تحلل أكثر 5 أعمال سينمائية تفاعلاً بناءً على نقرات المستخدمين الحية خلال الجلسة الحالية. تفاعل مع المخطط البياني أو انقر لمشاهدة التريلر.",
    clicks: "التفاعلات",
    rank: "الترتيب",
    movie: "العنوان السينمائي",
    engagementGlow: "نواة التفاعل نشطة",
    noData: "لم يتم تسجيل أي تفاعلات بعد. انقر على الأفلام في الأعلى لتحديث المخطط البياني!",
    resetEngage: "إعادة تعيين البيانات",
    viewTrailer: "عرض التريلر"
  }
};

// Default high-fidelity baseline clicks so chart is populated on fresh load
const DEFAULT_BASE_CLICKS: Record<string, number> = {
  'shogun': 58,
  'stranger-things': 52,
  'queen-of-tears': 47,
  'crash-landing-on-you': 41,
  'past-lives': 36,
  'my-demon': 29,
  'loki': 25,
  'the-boys': 21,
  'fleabag': 18,
  'black-mirror': 15,
  'the-crown': 12,
  'rings-of-power': 9,
  'the-mandalorian': 7
};

export default function TrendingChart({ catalog, userState, handleMovieSelect }: TrendingChartProps) {
  const lang = userState.preferredLanguage || 'en';
  const localT = LOCAL_TRANSLATIONS[lang] || LOCAL_TRANSLATIONS['en'];

  // Calculate engagement value for each movie
  const chartData = catalog.map(movie => {
    const baseClicks = DEFAULT_BASE_CLICKS[movie.id] || 0;
    const userClicks = userState.clicks[movie.id] || 0;
    return {
      id: movie.id,
      title: movie.title,
      type: movie.type,
      genres: movie.genres,
      posterUrl: movie.posterUrl,
      value: baseClicks + userClicks, // Beautiful incremental math
      rawUserClicks: userClicks
    };
  })
  // Sort descending by engagement clicks
  .sort((a, b) => b.value - a.value)
  // Take top 5
  .slice(0, 5)
  // Inject ranking 1-indexed
  .map((item, index) => ({
    ...item,
    rank: index + 1
  }));

  const topMovie = chartData[0];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-black/95 border-2 border-[#00D1FF]/40 rounded-xl p-4 shadow-[0_0_30px_rgba(0,209,255,0.25)] backdrop-blur-xl">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1 bg-[#00D1FF]/10 text-[#00D1FF] rounded font-mono text-[9px] font-bold">
              RANK #{data.rank}
            </span>
            <span className="text-[10px] font-mono text-white/40 uppercase">
              {data.type}
            </span>
          </div>
          <p className="text-xs font-black text-white uppercase italic tracking-tight">{data.title}</p>
          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-white/5 font-mono text-xs">
            <span className="text-white/40">{localT.clicks}:</span>
            <span className="text-[#00D1FF] font-bold">{data.value}</span>
          </div>
          {data.rawUserClicks > 0 && (
            <div className="text-[9px] font-mono text-green-400 mt-0.5 animate-pulse">
              + {data.rawUserClicks} from your interactions
            </div>
          )}
          <p className="text-[9px] text-white/50 italic mt-1.5 max-w-[180px] truncate">
            {data.genres.join(' • ')}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <section className="relative z-20 max-w-7xl mx-auto px-6 py-14 border-t border-white/5" id="trending-chart-section">
      
      {/* Background Visual Flare Glow */}
      <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-violet-500/5 blur-[150px] pointer-events-none -z-10"></div>

      {/* Header telemetry info bar */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#00D1FF] font-mono text-xs uppercase tracking-[0.3em] font-bold">
            <BarChart3 className="w-4 h-4 text-violet-400" />
            <span>Interactive Telemetry Engine</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black italic uppercase text-white tracking-tight leading-none mt-2">
            {localT.title}
          </h2>
          <p className="text-xs md:text-sm font-semibold uppercase tracking-wider text-white/50 font-mono">
            {localT.subtitle}
          </p>
          <p className="text-xs text-white/45 max-w-3xl leading-relaxed mt-2">
            {localT.description}
          </p>
        </div>

        {/* Dynamic active user click-count showcase */}
        <div className="bg-black/60 border border-white/10 rounded-2xl px-5 py-3 shrink-0 flex items-center gap-4 shadow-xl backdrop-blur-sm self-start lg:self-end">
          <div className="text-right">
            <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest font-mono">Telemetry Status</p>
            <p className="text-xs font-black text-[#00D1FF] font-mono leading-none mt-1">
              {localT.engagementGlow}
            </p>
          </div>
          <div className="p-2 bg-violet-500/10 text-violet-400 rounded-lg border border-violet-500/20">
            <Flame className="w-4 h-4 animate-bounce" />
          </div>
        </div>
      </div>

      {/* Grid: 8 columns for Bar Chart and 4 columns for Side Detail Podium */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* LEFT COLUMN: Premium Customized Recharts Area */}
        <div className="lg:col-span-8 bg-[#0a0a0f]/80 border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden backdrop-blur-md">
          
          {/* Subtle neon horizontal line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-violet-500/40 to-transparent"></div>

          {/* Recharts Wrapper */}
          <div className="w-full h-80 min-h-[300px] mt-4 relative">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 10, right: 30, left: 10, bottom: 5 }}
                onClick={(e: any) => {
                  if (e && e.activePayload && e.activePayload.length) {
                    const id = e.activePayload[0].payload.id;
                    handleMovieSelect(id);
                    document.getElementById("hero-showcase")?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {/* SVG Color Gradients Definition to paint bars beautifully */}
                <defs>
                  <linearGradient id="gradient-rank-1" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#EC4899" stopOpacity={0.85} />
                    <stop offset="100%" stopColor="#F43F5E" stopOpacity={0.95} />
                  </linearGradient>
                  <linearGradient id="gradient-rank-2" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.85} />
                    <stop offset="100%" stopColor="#EC4899" stopOpacity={0.95} />
                  </linearGradient>
                  <linearGradient id="gradient-rank-3" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#06B6D4" stopOpacity={0.85} />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0.95} />
                  </linearGradient>
                  <linearGradient id="gradient-rank-4" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.75} />
                    <stop offset="100%" stopColor="#06B6D4" stopOpacity={0.85} />
                  </linearGradient>
                  <linearGradient id="gradient-rank-5" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#1F2937" stopOpacity={0.65} />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.80} />
                  </linearGradient>
                </defs>

                {/* Grid guidelines */}
                <XAxis type="number" hide />
                
                <YAxis 
                  dataKey="title" 
                  type="category" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 11, fontWeight: 'bold', fontFamily: 'monospace' }}
                  width={140}
                />

                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)', radius: 8 }} />

                <Bar 
                  dataKey="value" 
                  radius={[0, 8, 8, 0]} 
                  barSize={24}
                  cursor="pointer"
                >
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={`url(#gradient-rank-${entry.rank})`} 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Interactive footer note */}
          <p className="text-[10px] text-white/30 text-center font-mono mt-4 uppercase tracking-widest flex items-center justify-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#00D1FF]" />
            Tip: Click directly on any bar or title to trigger showcase streaming
          </p>

        </div>

        {/* RIGHT COLUMN: The Top Ranked Podium Spotlight */}
        <div className="lg:col-span-4 flex flex-col justify-between bg-gradient-to-b from-violet-950/15 via-[#0c050d]/25 to-black/40 border border-white/5 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
          
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D1FF]/5 blur-2xl pointer-events-none"></div>

          {/* Spotlight Podium header */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-yellow-400 font-mono text-[10px] uppercase tracking-widest font-bold">
              <Trophy className="w-4 h-4 text-yellow-400 animate-pulse" />
              <span>CineWorld Spotlight #1</span>
            </div>

            {/* Spotlight Banner frame */}
            {topMovie && (
              <div className="space-y-4 mt-2">
                <div className="aspect-[4/3] rounded-xl overflow-hidden border border-white/10 relative group shadow-lg">
                  <BlurUpImage 
                    src={topMovie.posterUrl} 
                    alt={topMovie.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Glassmorphic rank medal in center */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors"></div>
                  <div className="absolute top-4 right-4 bg-yellow-400/20 text-yellow-400 border-2 border-yellow-400/50 rounded-full w-10 h-10 flex items-center justify-center text-sm font-black font-mono shadow-xl backdrop-blur-md">
                    #1
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="px-1.5 py-0.5 bg-yellow-400 text-black text-[8px] font-mono font-black rounded tracking-widest uppercase">
                      Trending Leader
                    </span>
                    <h3 className="text-lg font-black uppercase text-white truncate drop-shadow-md leading-none mt-1">
                      {topMovie.title}
                    </h3>
                  </div>
                </div>

                {/* Stats indicators */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-white/5 border border-white/5 rounded-xl p-3 text-center">
                    <span className="text-white/40 block text-[8px] font-mono uppercase tracking-wider">Gross Clicks</span>
                    <span className="text-white font-black text-lg font-mono leading-none block mt-1">{topMovie.value}</span>
                  </div>
                  <div className="bg-white/5 border border-white/5 rounded-xl p-3 text-center">
                    <span className="text-white/40 block text-[8px] font-mono uppercase tracking-wider">Your Input</span>
                    <span className="text-green-400 font-black text-lg font-mono leading-none block mt-1">+{topMovie.rawUserClicks}</span>
                  </div>
                </div>

                {/* Streaming action shortcut */}
                <button
                  onClick={() => {
                    handleMovieSelect(topMovie.id);
                    document.getElementById("hero-showcase")?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-pink-600 hover:from-violet-700 hover:to-pink-700 text-white font-bold uppercase text-[10px] tracking-wider transition-all duration-300 shadow-xl flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current text-white group-hover:scale-110 transition-transform" />
                  {localT.viewTrailer}
                </button>
              </div>
            )}
          </div>

          {/* Micro telemetry description footer */}
          <div className="text-[10px] text-white/40 font-mono mt-6 leading-relaxed border-t border-white/5 pt-4">
            * Session telemetry captures physical interactions, ratings, and selections within your local browser cache and integrates them securely with standard CineWorld default weights.
          </div>
        </div>

      </div>

    </section>
  );
}
