import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Ghost, Skull, Sparkles, BookOpen, Volume2, Film, Tv, Plus, Check, Eye, Heart, HeartPulse, Play } from 'lucide-react';
import { Movie, UserState } from '../types';
import TiltCard from './TiltCard';
import BlurUpImage from './BlurUpImage';

interface HorrorShowcaseSectionProps {
  catalog: Movie[];
  userState: UserState;
  handleMovieSelect: (id: string) => void;
  toggleWatchlist: (id: string) => void;
}

const LOCAL_TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    sectionTitle: "Chamber of Horrors",
    sectionSubtitle: "Spine-Chilling Selections & Paranormal Thrillers",
    sectionDesc: "Step into the dark. Explore highly acclaimed psychological dread, supernatural curses, and visceral survival horrors curated exclusively from Netflix, Amazon Prime, and Disney+ Hotstar.",
    terrorIndex: "Terror Match Index",
    soundtrackLabel: "Ambient Terror",
    listenOST: "Simulate Eerie Ambient",
    ostPlaying: "Static Whispers Active",
    directorsCut: "Critical Horror Analysis",
    quickView: "Launch Showcase & Trailer",
    watchlisted: "In Queue",
    addToQueue: "Add to Queue",
    horrorPortal: "Void Dimension Portal",
    fearRating: "My Terror Level",
    allPlatforms: "All Platforms",
    netflixOnly: "Netflix",
    primeOnly: "Amazon Prime",
    hotstarOnly: "Disney+ Hotstar"
  },
  es: {
    sectionTitle: "Cámara de Horrores",
    sectionSubtitle: "Selecciones Escalofriantes y Suspenso Paranormal",
    sectionDesc: "Entra en la oscuridad. Explora el aclamado pavor psicológico, las maldiciones sobrenaturales y los horrores viscerales de supervivencia de Netflix, Amazon Prime y Disney+ Hotstar.",
    terrorIndex: "Ajuste de Terror",
    soundtrackLabel: "Terror Ambiental",
    listenOST: "Simular Ambiente Siniestro",
    ostPlaying: "Susurros Estáticos Activos",
    directorsCut: "Análisis Crítico de Terror",
    quickView: "Ver Detalles y Tráiler",
    watchlisted: "En Cola",
    addToQueue: "Añadir a Cola",
    horrorPortal: "Portal de la Dimensión Vacía",
    fearRating: "Mi Nivel de Terror",
    allPlatforms: "Todas las Plataformas",
    netflixOnly: "Netflix",
    primeOnly: "Amazon Prime",
    hotstarOnly: "Disney+ Hotstar"
  },
  ja: {
    sectionTitle: "ホラー・チェンバー",
    sectionSubtitle: "身の毛もよだつ恐怖と超常現象のスリラー",
    sectionDesc: "暗闇の中へ。Netflix、Amazon Prime、Disney+ Hotstarから厳選された、心理的恐怖、超自然的な呪い、そして迫真のサバイバルホラーをお楽しみください。",
    terrorIndex: "恐怖適合指数",
    soundtrackLabel: "アンビエント・ホラー",
    listenOST: "不気味な音響をシミュレート",
    ostPlaying: "囁き声バックグラウンド有効",
    directorsCut: "ホラー専門家のクリティカル分析",
    quickView: "ショーケースと予告編を起動",
    watchlisted: "キューに追加済み",
    addToQueue: "キューに追加",
    horrorPortal: "虚空次元のポータル",
    fearRating: "私の恐怖レベル",
    allPlatforms: "すべての配信元",
    netflixOnly: "Netflix",
    primeOnly: "Amazon Prime",
    hotstarOnly: "Disney+ Hotstar"
  },
  hi: {
    sectionTitle: "भय का तहखाना (Horror Chamber)",
    sectionSubtitle: "रोंगटे खड़े कर देने वाले अलौकिक रोमांचक नाटक",
    sectionDesc: "अंधेरे में कदम रखें। नेटफ्लिक्स, अमेज़ॅन प्राइम और डिज़नी+ हॉटस्टार से विशेष रूप से तैयार किए गए अत्यधिक प्रशंसित मनोवैज्ञानिक भय, अलौकिक श्रापों और जीवित रहने के भयानक अनुभवों का अन्वेषण करें।",
    terrorIndex: "भय सूचकांक मिलान",
    soundtrackLabel: "डरावनी पृष्ठभूमि ध्वनि",
    listenOST: "डरावनी ध्वनि सिमुलेट करें",
    ostPlaying: "रहस्यमयी फुसफुसाहट सक्रिय",
    directorsCut: "गहन डरावना विश्लेषण",
    quickView: "शोकेस और ट्रेलर लॉन्च करें",
    watchlisted: "कतार में सुरक्षित",
    addToQueue: "कतार में जोड़ें",
    horrorPortal: "शून्य आयाम पोर्टल",
    fearRating: "मेरा भय स्तर",
    allPlatforms: "सभी प्लेटफॉर्म",
    netflixOnly: "Netflix",
    primeOnly: "Amazon Prime",
    hotstarOnly: "Disney+ Hotstar"
  },
  ar: {
    sectionTitle: "غرفة الرعب",
    sectionSubtitle: "مجموعة تحبس الأنفاس وإثارة خارقة للطبيعة",
    sectionDesc: "اخطُ في الظلام. استكشف الرعب النفسي المشاد به، واللعنات الخارقة للطبيعة، ورعب البقاء من نتفليكس، وأمازون برايم، وديزني+ هارتستار.",
    terrorIndex: "مؤشر الرعب والملائمة",
    soundtrackLabel: "المؤثرات الصوتية المرعبة",
    listenOST: "محاكاة أصوات الرعب",
    ostPlaying: "الهمسات الغامضة نشطة",
    directorsCut: "التحليل النقدي لسينما الرعب",
    quickView: "شاهد العرض والترولر",
    watchlisted: "في قائمة الرعب",
    addToQueue: "أضف إلى القائمة",
    horrorPortal: "بوابة البعد المظلم",
    fearRating: "مستوى الرعب الخاص بي",
    allPlatforms: "جميع المنصات",
    netflixOnly: "Netflix",
    primeOnly: "Amazon Prime",
    hotstarOnly: "Disney+ Hotstar"
  }
};

const SOUND_DATA: Record<string, { title: string; hint: string; bpm: number }> = {
  'stranger-things': {
    title: "Upside Down Clock Chimes",
    hint: "Heavy mechanical ticking layered with low, ominous grandfather clock chimes...",
    bpm: 85
  },
  'from-series': {
    title: "Forest Whispers & Screams",
    hint: "Distant wind howling carrying soft, smiling whispers that suddenly turn into high-pitched screeches...",
    bpm: 110
  },
  'widows-bay': {
    title: "Lighthouse Foghorn Paranoia",
    hint: "A deep, vibrating maritime foghorn echoing across dark tides and wet cavern rocks...",
    bpm: 72
  },
  'if-wishes-could-kill': {
    title: "Reverse Well Whispers",
    hint: "Eerie backwards-talking voices reflecting off deep stone-well waters...",
    bpm: 95
  },
  'all-of-us-are-dead': {
    title: "School Hallway Scratching",
    hint: "Sound of fast, jagged bone movements and terrifying snarling echoes in the distance...",
    bpm: 130
  },
  'shaitaan': {
    title: "Hypnotic Vash Chants",
    hint: "Sinister, low-frequency black magic whispers and dark metallic rattle sounds...",
    bpm: 120
  },
  'the-last-of-us': {
    title: "Post-Apocalyptic Clicker Groans",
    hint: "Subtle, rhythmic dry clicks of cordyceps head plates interspersed with distant guttural groans...",
    bpm: 60
  },
  'the-conjuring': {
    title: "Creaking Music Box Chimes",
    hint: "Distant, out-of-tune music box chiming paired with heavy cellar door wood creaks...",
    bpm: 78
  }
};

export default function HorrorShowcaseSection({
  catalog,
  userState,
  handleMovieSelect,
  toggleWatchlist
}: HorrorShowcaseSectionProps) {
  const lang = userState.preferredLanguage || 'en';
  const localT = LOCAL_TRANSLATIONS[lang] || LOCAL_TRANSLATIONS['en'];

  // Identify horror titles streaming on Netflix, Amazon Prime, or Disney+ Hotstar
  const horrorItems = catalog.filter(movie => 
    movie.genres.includes('Horror') && 
    movie.streamingLinks.some(link => 
      ['Netflix', 'Amazon Prime', 'Disney+ Hotstar'].includes(link.platform)
    )
  );

  const [activePlatformFilter, setActivePlatformFilter] = useState<string>('All');
  const [selectedId, setSelectedId] = useState<string>(horrorItems[0]?.id || 'from-series');
  const [playingSfxId, setPlayingSfxId] = useState<string | null>(null);

  if (horrorItems.length === 0) return null;

  // Filter horror items by selected platform if applicable
  const filteredHorror = activePlatformFilter === 'All' 
    ? horrorItems 
    : horrorItems.filter(movie => 
        movie.streamingLinks.some(link => link.platform === activePlatformFilter)
      );

  // Auto-correct active movie if current selectedId is not in filtered list
  const activeMovie = filteredHorror.find(m => m.id === selectedId) || filteredHorror[0] || horrorItems[0];
  const isWatchlisted = userState.watchlist.includes(activeMovie.id);
  const sfx = SOUND_DATA[activeMovie.id];

  const calculateTerrorScore = (movieId: string): number => {
    let base = 85;
    const clicks = userState.clicks[movieId] || 0;
    const rating = userState.ratings[movieId] || 0;
    const isHorrorLover = userState.genreClicks['Horror'] || 0;
    
    base += Math.min(8, clicks * 2.5);
    if (rating > 0) base += (rating - 3) * 2;
    base += Math.min(7, isHorrorLover * 2);
    return Math.min(100, Math.max(70, Math.floor(base)));
  };

  const currentScore = calculateTerrorScore(activeMovie.id);

  const handleSfxToggle = (id: string) => {
    if (playingSfxId === id) {
      setPlayingSfxId(null);
    } else {
      setPlayingSfxId(id);
    }
  };

  return (
    <section className="relative z-20 max-w-7xl mx-auto px-6 py-16 border-t border-white/5" id="horror-showcase-section">
      
      {/* Immersive Spooky Blood-Red & Mist Accents */}
      <div className="absolute top-[20%] right-[5%] w-[400px] h-[400px] rounded-full bg-red-950/15 blur-[120px] pointer-events-none -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-[10%] left-[10%] w-[450px] h-[450px] rounded-full bg-stone-900/40 blur-[150px] pointer-events-none -z-10"></div>

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-red-500 font-mono text-xs uppercase tracking-[0.3em] font-bold">
            <Ghost className="w-4 h-4 text-red-500 animate-bounce" />
            <span>{localT.horrorPortal}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black italic uppercase text-white tracking-tight leading-none mt-2">
            {localT.sectionTitle}
          </h2>
          <p className="text-xs md:text-sm font-semibold uppercase tracking-wider text-red-400/60 font-mono">
            {localT.sectionSubtitle}
          </p>
          <p className="text-xs text-white/55 max-w-3xl leading-relaxed mt-2">
            {localT.sectionDesc}
          </p>
        </div>

        {/* Platform Selector Tabs */}
        <div className="flex flex-wrap gap-2 self-start md:self-end bg-black/40 border border-white/5 rounded-xl p-1 backdrop-blur-sm">
          {['All', 'Netflix', 'Amazon Prime', 'Disney+ Hotstar'].map((plat) => {
            const labelMap: Record<string, string> = {
              'All': localT.allPlatforms,
              'Netflix': localT.netflixOnly,
              'Amazon Prime': localT.primeOnly,
              'Disney+ Hotstar': localT.hotstarOnly
            };
            const isActive = activePlatformFilter === plat;
            return (
              <button
                key={plat}
                onClick={() => {
                  setActivePlatformFilter(plat);
                  const matching = horrorItems.filter(movie => 
                    plat === 'All' || movie.streamingLinks.some(link => link.platform === plat)
                  );
                  if (matching.length > 0) {
                    setSelectedId(matching[0].id);
                  }
                  if (playingSfxId !== null) setPlayingSfxId(null);
                }}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-all ${
                  isActive 
                    ? 'bg-red-950/40 text-red-400 border border-red-900/50 shadow-[0_0_10px_rgba(239,68,68,0.15)]' 
                    : 'text-white/40 hover:text-white/75'
                }`}
              >
                {labelMap[plat]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* LEFT COLUMN: Hero Horror Display with deep dark vibe */}
        <div className="lg:col-span-8 bg-gradient-to-br from-[#0d0303] to-[#040101] border border-red-950/40 rounded-2xl overflow-hidden shadow-2xl relative flex flex-col justify-between">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-950/10 blur-[90px] pointer-events-none"></div>

          {/* Active backdrop */}
          <div className="h-72 sm:h-96 relative overflow-hidden">
            <BlurUpImage 
              src={activeMovie.backdropUrl} 
              alt={activeMovie.title} 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter brightness-[0.7] contrast-[1.1] transition-all duration-1000 scale-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040101] via-transparent to-black/30"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#0d0303]/85 via-transparent to-black/40"></div>

            {/* Terror match score */}
            <div className="absolute top-4 left-4 bg-black/90 border border-red-950/60 rounded-xl px-3 py-1.5 flex items-center gap-2.5 backdrop-blur-md">
              <Skull className="w-3.5 h-3.5 text-red-500 animate-pulse" />
              <div>
                <p className="text-[8px] font-mono uppercase text-white/40 leading-none tracking-widest">{localT.terrorIndex}</p>
                <p className="text-sm font-black text-red-500 font-mono leading-none mt-1">{currentScore}% Match</p>
              </div>
            </div>

            {/* Platforms badge row */}
            <div className="absolute top-4 right-4 flex gap-2">
              {activeMovie.streamingLinks.map(link => (
                <span key={link.platform} className="px-2 py-1 bg-black/80 border border-white/10 rounded text-[9px] font-mono font-black uppercase text-[#00D1FF]">
                  {link.platform}
                </span>
              ))}
            </div>

            {/* Bottom-left metadata */}
            <div className="absolute bottom-4 left-6 right-6">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="px-2 py-0.5 bg-red-500/20 text-red-400 border border-red-500/30 text-[9px] font-mono rounded tracking-widest uppercase">
                  {activeMovie.type}
                </span>
                <span className="px-2 py-0.5 bg-white/5 text-white/70 border border-white/10 text-[9px] font-mono rounded tracking-widest uppercase">
                  {activeMovie.year}
                </span>
                <span className="px-2 py-0.5 bg-white/5 text-white/70 border border-white/10 text-[9px] font-mono rounded tracking-widest uppercase">
                  {activeMovie.runtimeOrSeasons}
                </span>
              </div>
              <h3 className="text-2xl md:text-4xl font-black italic uppercase text-white tracking-tight leading-none drop-shadow-md">
                {activeMovie.title}
              </h3>
            </div>
          </div>

          {/* Deep Details Block */}
          <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Creator and Cast (4 cols) */}
                <div className="md:col-span-4 space-y-4 border-b md:border-b-0 md:border-r border-white/5 pb-4 md:pb-0 md:pr-4 font-mono text-xs">
                  <div>
                    <span className="text-white/40 block text-[9px] uppercase tracking-wider">Director / Creator</span>
                    <span className="text-white font-bold">{activeMovie.directorOrCreator}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block text-[9px] uppercase tracking-wider">Cast Ensemble</span>
                    <p className="text-white/80 leading-relaxed text-[11px] mt-0.5">
                      {activeMovie.cast.slice(0, 4).join(', ')}
                    </p>
                  </div>
                </div>

                {/* Synopsis (8 cols) */}
                <div className="md:col-span-8 space-y-2">
                  <span className="text-red-500 font-bold uppercase tracking-widest text-[9px] font-mono block">Logline Synopsis</span>
                  <p className="text-sm text-white/70 leading-relaxed font-sans">
                    {activeMovie.synopsis}
                  </p>
                </div>
              </div>

              {/* Spooky Soundboard Simulation */}
              {sfx && (
                <div className="bg-red-950/10 border border-red-500/20 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 backdrop-blur-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full blur-xl pointer-events-none"></div>
                  <div className="flex items-center gap-3.5">
                    <div className={`p-3 rounded-xl border transition-all shrink-0 ${
                      playingSfxId === activeMovie.id 
                        ? 'bg-red-600 text-white border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]' 
                        : 'bg-white/5 text-red-500 border-white/10'
                    }`}>
                      <Volume2 className={`w-5 h-5 ${playingSfxId === activeMovie.id ? 'animate-pulse text-white' : ''}`} />
                    </div>
                    <div>
                      <span className="text-[8px] uppercase font-bold tracking-widest text-white/40 block font-mono">{localT.soundtrackLabel}</span>
                      <p className="text-sm font-black text-white leading-tight mt-0.5">"{sfx.title}"</p>
                      <p className="text-[10px] text-red-400/80 font-mono mt-0.5">{sfx.bpm} BPM Rhythm</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end w-full sm:w-auto shrink-0">
                    <button
                      onClick={() => handleSfxToggle(activeMovie.id)}
                      className={`w-full sm:w-auto px-4 py-2 rounded-lg font-bold text-[10px] uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 ${
                        playingSfxId === activeMovie.id
                          ? 'bg-red-600/20 text-red-400 border border-red-500/40'
                          : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                      }`}
                    >
                      {playingSfxId === activeMovie.id ? (
                        <>
                          <HeartPulse className="w-3 h-3 text-red-500 animate-ping shrink-0" />
                          <span>{localT.ostPlaying}</span>
                        </>
                      ) : (
                        localT.listenOST
                      )}
                    </button>
                    {playingSfxId === activeMovie.id && (
                      <span className="text-[8px] text-red-400/80 font-mono mt-1 text-right italic max-w-[200px] leading-tight animate-pulse block">
                        {sfx.hint}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Critical Analysis Perspective */}
              <div className="space-y-2 border-t border-white/5 pt-4">
                <span className="text-white/40 font-bold uppercase tracking-widest text-[9px] font-mono flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-red-500" />
                  {localT.directorsCut}
                </span>
                <p className="text-xs text-white/60 leading-relaxed font-sans italic border-l-2 border-red-500/30 pl-3">
                  {activeMovie.criticalAnalysis}
                </p>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6">
              
              {/* Fear / Skull rating */}
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-bold text-white/40 font-mono flex items-center gap-1">
                  {localT.fearRating}
                </p>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((stars) => {
                    const currentRating = userState.ratings[activeMovie.id] || 0;
                    const active = stars <= currentRating;
                    return (
                      <button
                        key={stars}
                        onClick={() => {
                          const updatedRatings = { ...userState.ratings, [activeMovie.id]: stars };
                          const updatedGenreClicks = { ...userState.genreClicks, Horror: (userState.genreClicks['Horror'] || 0) + 1 };
                          const nextState = { ...userState, ratings: updatedRatings, genreClicks: updatedGenreClicks };
                          localStorage.setItem('cineworld_user_state_v1', JSON.stringify(nextState));
                          window.location.reload();
                        }}
                        className={`p-1 transition-all transform hover:scale-125 ${
                          active ? 'text-red-500' : 'text-white/25 hover:text-red-400/60'
                        }`}
                        title={`Rate ${stars} Skulls`}
                      >
                        <Skull className={`w-4 h-4 ${active ? 'fill-current' : ''}`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    handleMovieSelect(activeMovie.id);
                    document.getElementById("hero-showcase")?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex-grow sm:flex-initial px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold uppercase text-[10px] tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(220,38,38,0.35)] hover:shadow-[0_0_25px_rgba(220,38,38,0.55)] flex items-center justify-center gap-2"
                >
                  <Film className="w-3.5 h-3.5 text-white" />
                  {localT.quickView}
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: Scrolling interactive sidebar list of Horror titles */}
        <div className="lg:col-span-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs uppercase tracking-widest font-mono text-white/40 pb-2 border-b border-white/5 px-1">
              <span>Selected Horror</span>
              <span>({filteredHorror.length} Titles)</span>
            </div>

            <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
              {filteredHorror.map((movie) => {
                const isSelected = movie.id === activeMovie.id;
                const inWatchlist = userState.watchlist.includes(movie.id);
                const score = calculateTerrorScore(movie.id);

                return (
                  <TiltCard
                    key={movie.id}
                    onClick={() => {
                      setSelectedId(movie.id);
                      if (playingSfxId !== null) setPlayingSfxId(null);
                    }}
                    className={`relative p-4 rounded-xl cursor-pointer transition-all duration-300 border backdrop-blur-sm flex gap-4 group ${
                      isSelected
                        ? 'bg-red-950/10 border-red-900/60 shadow-[0_0_15px_rgba(239,68,68,0.15)]'
                        : 'bg-black/30 border-white/5 hover:border-red-950/45 hover:bg-black/50'
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
                      {/* Play Hover Overlay */}
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Play className="w-4 h-4 text-[#00D1FF] fill-[#00D1FF] animate-pulse" />
                      </div>
                      {inWatchlist && (
                        <div className="absolute top-1 right-1 bg-red-600 text-white p-0.5 rounded-full border border-black z-10" title="Watchlist Queue Active">
                          <Check className="w-2 h-2 stroke-[3]" />
                        </div>
                      )}
                    </div>

                    {/* Quick textual summary */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                      <div className="space-y-0.5">
                        <p className="text-[9px] uppercase font-bold tracking-widest text-red-400 font-mono truncate">
                          {movie.year} • {movie.runtimeOrSeasons}
                        </p>
                        <h4 className="text-xs font-black uppercase text-white truncate group-hover:text-red-400 transition-colors leading-tight">
                          {movie.title}
                        </h4>
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-mono text-white/40 uppercase">
                        <span className="truncate max-w-[45%]">By {movie.directorOrCreator.split(' ').slice(-1)[0]}</span>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMovieSelect(movie.id);
                            }}
                            className="bg-[#00D1FF]/20 hover:bg-[#00D1FF] text-[#00D1FF] hover:text-black font-sans font-bold text-[9px] px-2 py-0.5 rounded border border-[#00D1FF]/30 hover:border-transparent transition-all flex items-center gap-1 uppercase"
                            title="Play Movie"
                          >
                            <Play className="w-2 h-2 fill-current" />
                            Play
                          </button>
                          <span className="text-red-400 font-bold bg-white/5 px-1.5 py-0.5 rounded text-[9px] flex items-center gap-1">
                            <Skull className="w-2.5 h-2.5 text-red-500" />
                            {score}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                );
              })}
            </div>
          </div>

          {/* Quick cultural tip of Horror */}
          <div className="mt-6 p-4 rounded-xl border border-red-950/10 bg-gradient-to-r from-red-950/10 to-stone-950/10 text-[11px] leading-relaxed text-white/55 font-mono">
            <span className="text-red-500 font-bold uppercase tracking-wider block mb-1">Atmospheric Tip: Sound Design</span>
            In premium horror cinema, much of the dread is constructed in frequencies below 20Hz (infrasound). While human ears cannot consciously register these sounds, they trigger natural physical sensations of anxiety, rapid pulse, and goosebumps.
          </div>
        </div>

      </div>

    </section>
  );
}
