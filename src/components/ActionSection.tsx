import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Swords, Zap, Crosshair, Target, Shield, Skull, Heart, BookOpen, MessageSquare, Film, Tv, Plus, Check, Star, Play } from 'lucide-react';
import { Movie, UserState } from '../types';
import TiltCard from './TiltCard';
import BlurUpImage from './BlurUpImage';

interface ActionSectionProps {
  catalog: Movie[];
  userState: UserState;
  handleMovieSelect: (id: string) => void;
  toggleWatchlist: (id: string) => void;
}

const LOCAL_TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    sectionTitle: "Adrenaline Arena",
    sectionSubtitle: "High-Octane Practical Stunts & Tactical Masterpieces",
    sectionDesc: "Fuel your thrill. Experience relentless action, bone-crunching choreography, and high-stakes cinematic thrillers handpicked from Netflix, Amazon Prime, and Disney+ Hotstar.",
    matchIndex: "Tactical Match Fit",
    quoteLabel: "Legendary Dialogue",
    getQuote: "Decode Heavy Punchline",
    quoteReady: "Combat Feed Decoded",
    directorsCut: "Critical Action Breakdown",
    quickView: "Launch Showcase & Trailer",
    watchlisted: "In Queue",
    addToQueue: "Add to Queue",
    actionPortal: "Action & Thrill Portal",
    adrenalineRating: "My Adrenaline Level",
    allPlatforms: "All Platforms",
    netflixOnly: "Netflix",
    primeOnly: "Amazon Prime",
    hotstarOnly: "Disney+ Hotstar"
  },
  es: {
    sectionTitle: "Arena de Adrenalina",
    sectionSubtitle: "Acrobacias Prácticas de Alto Octanaje y Obras Maestras Tácticas",
    sectionDesc: "Alimenta tu emoción. Experimenta acción implacable, coreografías contundentes y thrillers cinematográficos de alto riesgo seleccionados de Netflix, Amazon Prime y Disney+ Hotstar.",
    matchIndex: "Ajuste de Combate Táctico",
    quoteLabel: "Diálogo Legendario",
    getQuote: "Descifrar Frase Fuerte",
    quoteReady: "Transmisión de Combate Descifrada",
    directorsCut: "Análisis Crítico de Acción",
    quickView: "Ver Detalles y Tráiler",
    watchlisted: "En Cola",
    addToQueue: "Añadir a Cola",
    actionPortal: "Portal de Acción y Suspenso",
    adrenalineRating: "Mi Nivel de Adrenalina",
    allPlatforms: "Todas las Plataformas",
    netflixOnly: "Netflix",
    primeOnly: "Amazon Prime",
    hotstarOnly: "Disney+ Hotstar"
  },
  ja: {
    sectionTitle: "アドレナリン・アリーナ",
    sectionSubtitle: "緊迫のガチスタント＆最高峰の戦術アクション",
    sectionDesc: "アドレナリン全開。息もつかせぬ死闘、限界突破の肉体アクション、一瞬の油断も許さないサスペンス巨編を主要配信サービスから一挙お届けします。",
    matchIndex: "戦術シンクロ適合率",
    quoteLabel: "伝説の決めゼリフ",
    getQuote: "超名セリフを解読する",
    quoteReady: "戦闘ログ・デコード完了",
    directorsCut: "アクション専門家による徹底解説",
    quickView: "ショーケースと予告編を起動",
    watchlisted: "キューに追加済み",
    addToQueue: "キューに追加",
    actionPortal: "極限アクション・ポータル",
    adrenalineRating: "私の興奮バロメーター",
    allPlatforms: "すべての配信元",
    netflixOnly: "Netflix",
    primeOnly: "Amazon Prime",
    hotstarOnly: "Disney+ Hotstar"
  },
  hi: {
    sectionTitle: "एड्रेनालाईन अखाड़ा (Adrenaline Arena)",
    sectionSubtitle: "हाई-ऑक्टेन वास्तविक स्टंट और रणनीतिक उत्कृष्ट कृतियाँ",
    sectionDesc: "अपने रोमांच को बढ़ाएं। नेटफ्लिक्स, अमेज़ॅन प्राइम और डिज़नी+ हॉटस्टार से विशेष रूप से चुने गए अथक एक्शन, शानदार कोरियोग्राफी और उच्च-खतरे वाले सिनेमाई थ्रिलर का अनुभव करें।",
    matchIndex: "रणनीतिक मिलान फिट",
    quoteLabel: "शानदार संवाद",
    getQuote: "संवाद और पंचलाइन डिकोड करें",
    quoteReady: "मुकाबला संवाद प्रदर्शित",
    directorsCut: "महत्वपूर्ण एक्शन समीक्षा",
    quickView: "शोकेस और ट्रेलर लॉन्च करें",
    watchlisted: "कतार में सुरक्षित",
    addToQueue: "कतार में जोड़ें",
    actionPortal: "एक्शन और रोमांच पोर्टल",
    adrenalineRating: "मेरा रोमांच स्तर",
    allPlatforms: "सभी प्लेटफॉर्म",
    netflixOnly: "Netflix",
    primeOnly: "Amazon Prime",
    hotstarOnly: "Disney+ Hotstar"
  },
  ar: {
    sectionTitle: "ساحة الأدرينالين",
    sectionSubtitle: "حركات بهلوانية مذهلة وروائع تكتيكية عالية الإثارة",
    sectionDesc: "أشعل حماسك. اختبر الإثارة المستمرة، والقتال اليدوي المتقن، والتشويق السينمائي عالي المخاطر من نتفليكس وأمازون برايم وديزني+ هارتستار.",
    matchIndex: "التوافق التكتيكي القتالي",
    quoteLabel: "حوار أسطوري الخالد",
    getQuote: "فك تشفير العبارة القتالية",
    quoteReady: "تم فك تشفير البيانات القتالية",
    directorsCut: "التحليل النقدي للحركات القتالية",
    quickView: "شاهد العرض والترولر",
    watchlisted: "في قائمة الأدرينالين",
    addToQueue: "أضف إلى القائمة",
    actionPortal: "بوابة الحركة والإثارة القصوى",
    adrenalineRating: "مستوى الأدرينالين الخاص بي",
    allPlatforms: "جميع المنصات",
    netflixOnly: "Netflix",
    primeOnly: "Amazon Prime",
    hotstarOnly: "Disney+ Hotstar"
  }
};

const QUOTE_DATA: Record<string, { quote: string; speaker: string; deliveryStyle: string }> = {
  'mad-max-fury-road': {
    quote: "Oh, what a day... what a lovely day!",
    speaker: "Nux",
    deliveryStyle: "Inhaling nitrous oxide while strapped to the hood of a supercharged rat-rod chasing an apocalyptic sandstorm..."
  },
  'john-wick-4': {
    quote: "I will need a gun. A lot of guns.",
    speaker: "John Wick",
    deliveryStyle: "Adjusting a custom Kevlar-reinforced three-piece suit collar while loading a tactical combat pistol..."
  },
  'rrr': {
    quote: "This friendship is forged in fire. Let us see if it survives the storm.",
    speaker: "Alluri Sitarama Raju",
    deliveryStyle: "Leaping off a burning motorcycle while locking arms with his blood brother in mid-air..."
  },
  'breaking-bad': {
    quote: "I am not in danger, Skyler. I am the danger. A guy opens his door and gets shot, and you think that of me? No. I am the one who knocks!",
    speaker: "Walter White",
    deliveryStyle: "Stepping closer to the camera, speaking in a low, terrifyingly controlled gravelly baritone..."
  },
  'all-of-us-are-dead': {
    quote: "Don't die. No matter what happens, promise me you won't get infected.",
    speaker: "Cheong-san",
    deliveryStyle: "Clinging to the outer school brick ledge while dozens of fast-moving infected crash against the window glass..."
  }
};

export default function ActionSection({
  catalog,
  userState,
  handleMovieSelect,
  toggleWatchlist
}: ActionSectionProps) {
  const lang = userState.preferredLanguage || 'en';
  const localT = LOCAL_TRANSLATIONS[lang] || LOCAL_TRANSLATIONS['en'];

  // Filter shows that contain 'Action' genre
  const actionItems = catalog.filter(movie => 
    movie.genres.includes('Action') && 
    movie.streamingLinks.some(link => 
      ['Netflix', 'Amazon Prime', 'Disney+ Hotstar'].includes(link.platform)
    )
  );

  const [activePlatformFilter, setActivePlatformFilter] = useState<string>('All');
  const [selectedId, setSelectedId] = useState<string>(actionItems[0]?.id || 'mad-max-fury-road');
  const [shownQuoteId, setShownQuoteId] = useState<string | null>(null);

  if (actionItems.length === 0) return null;

  const filteredAction = activePlatformFilter === 'All'
    ? actionItems
    : actionItems.filter(movie =>
        movie.streamingLinks.some(link => link.platform === activePlatformFilter)
      );

  const activeMovie = filteredAction.find(m => m.id === selectedId) || filteredAction[0] || actionItems[0];
  const isWatchlisted = userState.watchlist.includes(activeMovie.id);
  const activeQuote = QUOTE_DATA[activeMovie.id];

  const calculateTacticalScore = (movieId: string): number => {
    let base = 89;
    const clicks = userState.clicks[movieId] || 0;
    const rating = userState.ratings[movieId] || 0;
    const isActionLover = userState.genreClicks['Action'] || 0;

    base += Math.min(5, clicks * 2);
    if (rating > 0) base += (rating - 3) * 3;
    base += Math.min(6, isActionLover * 1.5);
    return Math.min(100, Math.max(75, Math.floor(base)));
  };

  const currentScore = calculateTacticalScore(activeMovie.id);

  const handleQuoteToggle = (id: string) => {
    if (shownQuoteId === id) {
      setShownQuoteId(null);
    } else {
      setShownQuoteId(id);
    }
  };

  return (
    <section className="relative z-20 max-w-7xl mx-auto px-6 py-16 border-t border-white/5" id="adrenaline-arena-section">
      
      {/* High-Octane Crimson Soft Aura Ambient Lighting Glows */}
      <div className="absolute top-[25%] left-[8%] w-[400px] h-[400px] rounded-full bg-red-600/5 blur-[140px] pointer-events-none -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-[25%] right-[5%] w-[450px] h-[450px] rounded-full bg-rose-700/5 blur-[160px] pointer-events-none -z-10"></div>

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-rose-500 font-mono text-xs uppercase tracking-[0.3em] font-bold">
            <Flame className="w-4 h-4 text-rose-500 animate-pulse" />
            <span>{localT.actionPortal}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black italic uppercase text-white tracking-tight leading-none mt-2">
            {localT.sectionTitle}
          </h2>
          <p className="text-xs md:text-sm font-semibold uppercase tracking-wider text-rose-400/60 font-mono">
            {localT.sectionSubtitle}
          </p>
          <p className="text-xs text-white/55 max-w-3xl leading-relaxed mt-2">
            {localT.sectionDesc}
          </p>
        </div>

        {/* Platform Filter Tabs */}
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
                  const matching = actionItems.filter(movie => 
                    plat === 'All' || movie.streamingLinks.some(link => link.platform === plat)
                  );
                  if (matching.length > 0) {
                    setSelectedId(matching[0].id);
                  }
                  if (shownQuoteId !== null) setShownQuoteId(null);
                }}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-all ${
                  isActive 
                    ? 'bg-rose-950/40 text-rose-400 border border-rose-900/50 shadow-[0_0_10px_rgba(244,63,94,0.15)]' 
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
        
        {/* LEFT COLUMN: Hero Action Spotlight Display */}
        <div className="lg:col-span-8 bg-gradient-to-br from-[#0c0303] to-[#040101] border border-rose-950/30 rounded-2xl overflow-hidden shadow-2xl relative flex flex-col justify-between">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600/5 blur-[90px] pointer-events-none"></div>

          {/* Active backdrop */}
          <div className="h-72 sm:h-96 relative overflow-hidden">
            <BlurUpImage 
              src={activeMovie.backdropUrl} 
              alt={activeMovie.title} 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter brightness-[0.7] contrast-[1.05] transition-all duration-1000 scale-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040101] via-transparent to-black/30"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#0c0303]/85 via-transparent to-black/40"></div>

            {/* Tactical match score */}
            <div className="absolute top-4 left-4 bg-black/90 border border-rose-950/60 rounded-xl px-3 py-1.5 flex items-center gap-2.5 backdrop-blur-md">
              <Crosshair className="w-3.5 h-3.5 text-rose-500 animate-spin-slow" />
              <div>
                <p className="text-[8px] font-mono uppercase text-white/40 leading-none tracking-widest">{localT.matchIndex}</p>
                <p className="text-sm font-black text-rose-400 font-mono leading-none mt-1">{currentScore}% Match</p>
              </div>
            </div>

            {/* Streaming platforms badge */}
            <div className="absolute top-4 right-4 flex gap-2">
              {activeMovie.streamingLinks.map(link => (
                <span key={link.platform} className="px-2 py-1 bg-black/80 border border-white/10 rounded text-[9px] font-mono font-black uppercase text-[#FF007F]">
                  {link.platform}
                </span>
              ))}
            </div>

            {/* Bottom-left metadata */}
            <div className="absolute bottom-4 left-6 right-6">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="px-2 py-0.5 bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[9px] font-mono rounded tracking-widest uppercase">
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

          {/* Movie/Series Info and Interaction */}
          <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Director and Cast */}
                <div className="md:col-span-4 space-y-4 border-b md:border-b-0 md:border-r border-white/5 pb-4 md:pb-0 md:pr-4 font-mono text-xs">
                  <div>
                    <span className="text-white/40 block text-[9px] uppercase tracking-wider">Director / Creator</span>
                    <span className="text-white font-bold">{activeMovie.directorOrCreator}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block text-[9px] uppercase tracking-wider">Starring Cast</span>
                    <p className="text-white/80 leading-relaxed text-[11px] mt-0.5">
                      {activeMovie.cast.slice(0, 4).join(', ')}
                    </p>
                  </div>
                </div>

                {/* Synopsis */}
                <div className="md:col-span-8 space-y-2">
                  <span className="text-rose-500 font-bold uppercase tracking-widest text-[9px] font-mono block">Plot Premise</span>
                  <p className="text-sm text-white/70 leading-relaxed font-sans">
                    {activeMovie.synopsis}
                  </p>
                </div>
              </div>

              {/* Playful Interactive Tactical Quote Card */}
              {activeQuote && (
                <div className="bg-rose-950/10 border border-rose-500/20 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 backdrop-blur-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-full blur-xl pointer-events-none"></div>
                  <div className="flex items-center gap-3.5">
                    <div className={`p-3 rounded-xl border transition-all shrink-0 ${
                      shownQuoteId === activeMovie.id 
                        ? 'bg-rose-500 text-black border-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.4)]' 
                        : 'bg-white/5 text-rose-500 border-white/10'
                    }`}>
                      <MessageSquare className={`w-5 h-5 ${shownQuoteId === activeMovie.id ? 'animate-bounce text-black' : ''}`} />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[8px] uppercase font-bold tracking-widest text-white/40 block font-mono">{localT.quoteLabel}</span>
                      <p className="text-sm font-black text-white leading-tight mt-0.5">"{activeQuote.speaker}"</p>
                      <p className="text-[10px] text-rose-400/80 font-mono mt-0.5">Tactical Action Highlight Dialogue</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end w-full sm:w-auto shrink-0">
                    <button
                      onClick={() => handleQuoteToggle(activeMovie.id)}
                      className={`w-full sm:w-auto px-4 py-2 rounded-lg font-bold text-[10px] uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 ${
                        shownQuoteId === activeMovie.id
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                          : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                      }`}
                    >
                      {shownQuoteId === activeMovie.id ? (
                        <>
                          <Zap className="w-3 h-3 text-rose-500 animate-spin-slow shrink-0" />
                          <span>{localT.quoteReady}</span>
                        </>
                      ) : (
                        localT.getQuote
                      )}
                    </button>
                    {shownQuoteId === activeMovie.id && (
                      <div className="text-[11px] text-rose-100 bg-rose-950/40 border border-rose-500/25 p-2 rounded-lg mt-2 text-left max-w-xs leading-relaxed font-sans shadow-lg animate-fade-in block">
                        <span className="text-rose-400 font-serif text-lg leading-none">“</span>
                        {activeQuote.quote}
                        <span className="text-rose-400 font-serif text-lg leading-none">”</span>
                        <p className="text-[9px] text-white/50 italic mt-1 font-mono text-right">— Situation: {activeQuote.deliveryStyle}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Critic Analysis View */}
              <div className="space-y-2 border-t border-white/5 pt-4">
                <span className="text-white/40 font-bold uppercase tracking-widest text-[9px] font-mono flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-rose-500" />
                  {localT.directorsCut}
                </span>
                <p className="text-xs text-white/60 leading-relaxed font-sans italic border-l-2 border-rose-500/30 pl-3">
                  {activeMovie.criticalAnalysis}
                </p>
              </div>
            </div>

            {/* Interactive User Adrenaline Rating Panel */}
            <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6">
              
              {/* Adrenaline level ratings */}
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-bold text-white/40 font-mono flex items-center gap-1">
                  {localT.adrenalineRating}
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
                          const updatedGenreClicks = { ...userState.genreClicks, Action: (userState.genreClicks['Action'] || 0) + 1 };
                          const nextState = { ...userState, ratings: updatedRatings, genreClicks: updatedGenreClicks };
                          localStorage.setItem('cineworld_user_state_v1', JSON.stringify(nextState));
                          window.location.reload();
                        }}
                        className={`p-1 transition-all transform hover:scale-125 ${
                          active ? 'text-rose-500' : 'text-white/25 hover:text-rose-400/60'
                        }`}
                        title={`Rate ${stars} Sabers`}
                      >
                        <Swords className={`w-4 h-4 ${active ? 'fill-current text-rose-400' : ''}`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleWatchlist(activeMovie.id)}
                  className={`flex-1 sm:flex-initial px-4 py-3 rounded-xl font-bold uppercase text-[10px] tracking-wider border transition-all duration-300 flex items-center justify-center gap-2 ${
                    isWatchlisted
                      ? 'bg-rose-950/20 text-rose-400 border-rose-900/40 hover:bg-rose-950/30'
                      : 'bg-white/5 hover:bg-white/10 text-white border-white/10'
                  }`}
                >
                  {isWatchlisted ? <Check className="w-3.5 h-3.5 text-rose-500" /> : <Plus className="w-3.5 h-3.5" />}
                  {isWatchlisted ? localT.watchlisted : localT.addToQueue}
                </button>

                <button
                  onClick={() => {
                    handleMovieSelect(activeMovie.id);
                    document.getElementById("hero-showcase")?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold uppercase text-[10px] tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(225,29,72,0.35)] hover:shadow-[0_0_25px_rgba(225,29,72,0.55)] flex items-center justify-center gap-2"
                >
                  <Film className="w-3.5 h-3.5 text-white" />
                  {localT.quickView}
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: Sidebar listing matching action titles */}
        <div className="lg:col-span-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs uppercase tracking-widest font-mono text-white/40 pb-2 border-b border-white/5 px-1">
              <span>Spotlight Action</span>
              <span>({filteredAction.length} Titles)</span>
            </div>

            <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
              {filteredAction.map((movie) => {
                const isSelected = movie.id === activeMovie.id;
                const inWatchlist = userState.watchlist.includes(movie.id);
                const score = calculateTacticalScore(movie.id);

                return (
                  <TiltCard
                    key={movie.id}
                    onClick={() => {
                      setSelectedId(movie.id);
                      if (shownQuoteId !== null) setShownQuoteId(null);
                    }}
                    className={`relative p-4 rounded-xl cursor-pointer transition-all duration-300 border backdrop-blur-sm flex gap-4 group ${
                      isSelected
                        ? 'bg-rose-950/10 border-rose-900/60 shadow-[0_0_15px_rgba(244,63,94,0.15)]'
                        : 'bg-black/30 border-white/5 hover:border-rose-950/45 hover:bg-black/50'
                    }`}
                  >
                    {/* Tiny Poster frame */}
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
                        <div className="absolute top-1 right-1 bg-rose-500 text-black p-0.5 rounded-full border border-black z-10" title="Watchlist Queue Active">
                          <Check className="w-2 h-2 stroke-[3]" />
                        </div>
                      )}
                    </div>

                    {/* Quick textual summary */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                      <div className="space-y-0.5">
                        <p className="text-[9px] uppercase font-bold tracking-widest text-rose-400 font-mono truncate">
                          {movie.year} • {movie.runtimeOrSeasons}
                        </p>
                        <h4 className="text-xs font-black uppercase text-white truncate group-hover:text-rose-400 transition-colors leading-tight">
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
                          <span className="text-rose-400 font-bold bg-white/5 px-1.5 py-0.5 rounded text-[9px] flex items-center gap-1">
                            <Target className="w-2.5 h-2.5 text-rose-400" />
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

          {/* Quick aesthetic tip block */}
          <div className="mt-6 p-4 rounded-xl border border-rose-950/10 bg-gradient-to-r from-rose-950/10 to-stone-950/10 text-[11px] leading-relaxed text-white/55 font-mono">
            <span className="text-rose-500 font-bold uppercase tracking-wider block mb-1 font-sans">Aesthetic Tip: Practical Stunts</span>
            Action cinema achieves maximum visceral resonance when relying on real practical stunts over heavy CGI, where real-world inertia, authentic fireballs, and actual physics build unparalleled immersion.
          </div>
        </div>

      </div>

    </section>
  );
}
