import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Laugh, Smile, Sparkles, BookOpen, MessageSquare, Film, Tv, Plus, Check, Heart, HelpCircle, Star, Play } from 'lucide-react';
import { Movie, UserState } from '../types';
import TiltCard from './TiltCard';
import BlurUpImage from './BlurUpImage';

interface ComedySectionProps {
  catalog: Movie[];
  userState: UserState;
  handleMovieSelect: (id: string) => void;
  toggleWatchlist: (id: string) => void;
}

const LOCAL_TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    sectionTitle: "Laughter Lounge",
    sectionSubtitle: "Workplace Mockumentaries & High-Spirited Comedies",
    sectionDesc: "Lighten the mood. Experience highly acclaimed workplace mockumentaries, dark satirical comedies, and cozy family sitcoms curated exclusively from Netflix, Amazon Prime, and Disney+ Hotstar.",
    joyIndex: "Joy & Humor Match Fit",
    quoteLabel: "Iconic Highlight",
    getQuote: "Generate Iconic Punchline",
    quoteReady: "Active Quote Decoded",
    directorsCut: "Critical Comedic Evaluation",
    quickView: "Launch Showcase & Trailer",
    watchlisted: "In Queue",
    addToQueue: "Add to Queue",
    comedyPortal: "Hilarity & Satire Portal",
    humorRating: "My Amusement Level",
    allPlatforms: "All Platforms",
    netflixOnly: "Netflix",
    primeOnly: "Amazon Prime",
    hotstarOnly: "Disney+ Hotstar"
  },
  es: {
    sectionTitle: "Salón de la Risa",
    sectionSubtitle: "Falsos Documentales y Comedias de Gran Espíritu",
    sectionDesc: "Aligera el ambiente. Disfruta de falsos documentales aclamados, comedias de sátira oscura y comedias familiares acogedoras de Netflix, Amazon Prime y Disney+ Hotstar.",
    joyIndex: "Ajuste de Alegría y Humor",
    quoteLabel: "Frase Icónica",
    getQuote: "Generar Frase Graciosa",
    quoteReady: "Frase Activa Decodificada",
    directorsCut: "Evaluación Crítica de Comedia",
    quickView: "Ver Detalles y Tráiler",
    watchlisted: "En Cola",
    addToQueue: "Añadir a Cola",
    comedyPortal: "Portal de Comedia y Sátira",
    humorRating: "Mi Nivel de Diversión",
    allPlatforms: "Todas las Plataformas",
    netflixOnly: "Netflix",
    primeOnly: "Amazon Prime",
    hotstarOnly: "Disney+ Hotstar"
  },
  ja: {
    sectionTitle: "コメディ・ラウンジ",
    sectionSubtitle: "抱腹絶倒のモキュメンタリー＆快活コメディ",
    sectionDesc: "気分をリフレッシュ。Netflix、Amazon Prime、Disney+ Hotstarから厳選された、大人気の職場風刺劇、ダークなブラックコメディ、心温まるホームコメディをお楽しみください。",
    joyIndex: "お笑い・ユーモア適合指数",
    quoteLabel: "名セリフ紹介",
    getQuote: "名セリフを生成する",
    quoteReady: "名言デコーダー起動中",
    directorsCut: "コメディ専門家の批評評価",
    quickView: "ショーケースと予告編を起動",
    watchlisted: "キューに追加済み",
    addToQueue: "キューに追加",
    comedyPortal: "爆笑コメディ・ポータル",
    humorRating: "私の爆笑レベル",
    allPlatforms: "すべての配信元",
    netflixOnly: "Netflix",
    primeOnly: "Amazon Prime",
    hotstarOnly: "Disney+ Hotstar"
  },
  hi: {
    sectionTitle: "हँसी का अड्डा (Laughter Lounge)",
    sectionSubtitle: "कार्यालयी मॉक्युमेंट्रीज़ और उच्च-ऊर्जा हास्य नाटक",
    sectionDesc: "मन को हल्का करें। नेटफ्लिक्स, अमेज़ॅन प्राइम और डिज़नी+ हॉटस्टार से विशेष रूप से तैयार की गई अत्यधिक प्रशंसित कार्यस्थल मॉक्युमेंट्रीज़, डार्क व्यंग्य और आरामदायक पारिवारिक सिटकॉम का अनुभव करें।",
    joyIndex: "हँसी और हास्य मिलान",
    quoteLabel: "प्रतिष्ठित संवाद",
    getQuote: "संवाद और पंचलाइन प्राप्त करें",
    quoteReady: "सक्रिय संवाद प्रदर्शित",
    directorsCut: "गहन हास्य विश्लेषण",
    quickView: "शोकेस और ट्रेलर लॉन्च करें",
    watchlisted: "कतार में सुरक्षित",
    addToQueue: "कतार में जोड़ें",
    comedyPortal: "हास्य और व्यंग्य पोर्टल",
    humorRating: "मेरा मनोरंजन स्तर",
    allPlatforms: "सभी प्लेटफॉर्म",
    netflixOnly: "Netflix",
    primeOnly: "Amazon Prime",
    hotstarOnly: "Disney+ Hotstar"
  },
  ar: {
    sectionTitle: "صالة الكوميديا",
    sectionSubtitle: "وثائقيات كاذبة هزلية وكوميديا مبهجة",
    sectionDesc: "خفف عن نفسك. اختبر الوثائقيات الهزلية المليئة بالمرح، والكوميديا الساخرة المظلمة، والمسلسلات العائلية الدافئة من نتفليكس، وأمازون برايم، وديزني+ هارتستار.",
    joyIndex: "مؤشر المتعة والبهجة والملائمة",
    quoteLabel: "مقولة شهيرة",
    getQuote: "توليد قفشة كوميدية",
    quoteReady: "تم فك تشفير المقولة النشطة",
    directorsCut: "التحليل النقدي الكوميدي",
    quickView: "شاهد العرض والترولر",
    watchlisted: "في قائمة الكوميديا",
    addToQueue: "أضف إلى القائمة",
    comedyPortal: "بوابة المرح والكوميديا الساخرة",
    humorRating: "مستوى بهجتي وإعجابي",
    allPlatforms: "جميع المنصات",
    netflixOnly: "Netflix",
    primeOnly: "Amazon Prime",
    hotstarOnly: "Disney+ Hotstar"
  }
};

const QUOTE_DATA: Record<string, { quote: string; speaker: string; deliveryStyle: string }> = {
  'the-office': {
    quote: "I'm not superstitious, but I am a little stitious.",
    speaker: "Michael Scott",
    deliveryStyle: "Deadpan look directly at the office camera, followed by an awkward chuckle..."
  },
  'brooklyn-nine-nine': {
    quote: "Cool, cool, cool, cool, cool. No doubt, no doubt, no doubt. Oh, okay, cool, cool.",
    speaker: "Jake Peralta",
    deliveryStyle: "High-speed rapid panic-muttering while facing a full precinct criminal lineup..."
  },
  'modern-family': {
    quote: "I'm the cool dad, that's my thing. I'm hip, I surf the web, I text. 'LOL': laugh out loud, 'OMG': oh my god, 'WTF': why the face?",
    speaker: "Phil Dunphy",
    deliveryStyle: "Enthusiastic hand gestures while sitting on the family living room testimonial couch..."
  },
  'fleabag': {
    quote: "Hair is everything. We wish it weren't so we could actually think about something else occasionally. But it is. It's the difference between a good day and a bad day.",
    speaker: "Fleabag",
    deliveryStyle: "Direct, intimate breaking of the fourth-wall, leaning closer to the viewer with a knowing sigh..."
  },
  'spider-verse': {
    quote: "I love you guys! ...Wait, are we doing a group hug, or are we just standing very close to each other in spandex?",
    speaker: "Peter B. Parker",
    deliveryStyle: "Exhausted mentor posture, covered in cookie crumbs while dangling from a web string..."
  },
  'the-boys': {
    quote: "Well, well, well, if it isn't the invisible... well, you know who.",
    speaker: "Billy Butcher",
    deliveryStyle: "Gritty, mischievous East London smirk layered with sheer disregard for corporate rules..."
  },
  'wednesday': {
    quote: "I find social media to be a soul-sucking void of meaningless affirmation. It ruins lives and promotes digital narcissistic attention decay.",
    speaker: "Wednesday Addams",
    deliveryStyle: "Completely static, unblinking glare with hands folded perfectly behind her black dress..."
  }
};

export default function ComedySection({
  catalog,
  userState,
  handleMovieSelect,
  toggleWatchlist
}: ComedySectionProps) {
  const lang = userState.preferredLanguage || 'en';
  const localT = LOCAL_TRANSLATIONS[lang] || LOCAL_TRANSLATIONS['en'];

  // Filter shows that contain 'Comedy' genre
  const comedyItems = catalog.filter(movie => 
    movie.genres.includes('Comedy') && 
    movie.streamingLinks.some(link => 
      ['Netflix', 'Amazon Prime', 'Disney+ Hotstar'].includes(link.platform)
    )
  );

  const [activePlatformFilter, setActivePlatformFilter] = useState<string>('All');
  const [selectedId, setSelectedId] = useState<string>(comedyItems[0]?.id || 'the-office');
  const [shownQuoteId, setShownQuoteId] = useState<string | null>(null);

  if (comedyItems.length === 0) return null;

  const filteredComedy = activePlatformFilter === 'All'
    ? comedyItems
    : comedyItems.filter(movie =>
        movie.streamingLinks.some(link => link.platform === activePlatformFilter)
      );

  const activeMovie = filteredComedy.find(m => m.id === selectedId) || filteredComedy[0] || comedyItems[0];
  const isWatchlisted = userState.watchlist.includes(activeMovie.id);
  const activeQuote = QUOTE_DATA[activeMovie.id];

  const calculateJoyScore = (movieId: string): number => {
    let base = 88;
    const clicks = userState.clicks[movieId] || 0;
    const rating = userState.ratings[movieId] || 0;
    const isComedyLover = userState.genreClicks['Comedy'] || 0;

    base += Math.min(6, clicks * 2);
    if (rating > 0) base += (rating - 3) * 3;
    base += Math.min(6, isComedyLover * 1.5);
    return Math.min(100, Math.max(75, Math.floor(base)));
  };

  const currentScore = calculateJoyScore(activeMovie.id);

  const handleQuoteToggle = (id: string) => {
    if (shownQuoteId === id) {
      setShownQuoteId(null);
    } else {
      setShownQuoteId(id);
    }
  };

  return (
    <section className="relative z-20 max-w-7xl mx-auto px-6 py-16 border-t border-white/5" id="comedy-lounge-section">
      
      {/* Playful Yellow and Orange Soft Mood Lighting Glows */}
      <div className="absolute top-[30%] left-[5%] w-[380px] h-[380px] rounded-full bg-amber-500/5 blur-[130px] pointer-events-none -z-10"></div>
      <div className="absolute bottom-[20%] right-[10%] w-[420px] h-[420px] rounded-full bg-orange-600/5 blur-[150px] pointer-events-none -z-10 animate-pulse-slow"></div>

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-amber-500 font-mono text-xs uppercase tracking-[0.3em] font-bold">
            <Laugh className="w-4 h-4 text-amber-500 animate-spin-slow" />
            <span>{localT.comedyPortal}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black italic uppercase text-white tracking-tight leading-none mt-2">
            {localT.sectionTitle}
          </h2>
          <p className="text-xs md:text-sm font-semibold uppercase tracking-wider text-amber-400/60 font-mono">
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
                  const matching = comedyItems.filter(movie => 
                    plat === 'All' || movie.streamingLinks.some(link => link.platform === plat)
                  );
                  if (matching.length > 0) {
                    setSelectedId(matching[0].id);
                  }
                  if (shownQuoteId !== null) setShownQuoteId(null);
                }}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-mono uppercase tracking-wider transition-all ${
                  isActive 
                    ? 'bg-amber-950/40 text-amber-400 border border-amber-900/50 shadow-[0_0_10px_rgba(245,158,11,0.15)]' 
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
        
        {/* LEFT COLUMN: Hero Comedy Spotlight Display */}
        <div className="lg:col-span-8 bg-gradient-to-br from-[#0c0903] to-[#040301] border border-amber-950/30 rounded-2xl overflow-hidden shadow-2xl relative flex flex-col justify-between">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[90px] pointer-events-none"></div>

          {/* Active backdrop */}
          <div className="h-72 sm:h-96 relative overflow-hidden">
            <BlurUpImage 
              src={activeMovie.backdropUrl} 
              alt={activeMovie.title} 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter brightness-[0.7] contrast-[1.05] transition-all duration-1000 scale-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040301] via-transparent to-black/30"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#0c0903]/85 via-transparent to-black/40"></div>

            {/* Joy match score */}
            <div className="absolute top-4 left-4 bg-black/90 border border-amber-950/60 rounded-xl px-3 py-1.5 flex items-center gap-2.5 backdrop-blur-md">
              <Smile className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              <div>
                <p className="text-[8px] font-mono uppercase text-white/40 leading-none tracking-widest">{localT.joyIndex}</p>
                <p className="text-sm font-black text-amber-400 font-mono leading-none mt-1">{currentScore}% Match</p>
              </div>
            </div>

            {/* Streaming platforms badge */}
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
                <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[9px] font-mono rounded tracking-widest uppercase">
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
                    <span className="text-white/40 block text-[9px] uppercase tracking-wider">Creator / Director</span>
                    <span className="text-white font-bold">{activeMovie.directorOrCreator}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block text-[9px] uppercase tracking-wider">Starring Ensemble</span>
                    <p className="text-white/80 leading-relaxed text-[11px] mt-0.5">
                      {activeMovie.cast.slice(0, 4).join(', ')}
                    </p>
                  </div>
                </div>

                {/* Synopsis */}
                <div className="md:col-span-8 space-y-2">
                  <span className="text-amber-500 font-bold uppercase tracking-widest text-[9px] font-mono block">Plot Premise</span>
                  <p className="text-sm text-white/70 leading-relaxed font-sans">
                    {activeMovie.synopsis}
                  </p>
                </div>
              </div>

              {/* Playful Interactive Punchline Card */}
              {activeQuote && (
                <div className="bg-amber-950/10 border border-amber-500/20 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 backdrop-blur-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full blur-xl pointer-events-none"></div>
                  <div className="flex items-center gap-3.5">
                    <div className={`p-3 rounded-xl border transition-all shrink-0 ${
                      shownQuoteId === activeMovie.id 
                        ? 'bg-amber-500 text-black border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.4)]' 
                        : 'bg-white/5 text-amber-500 border-white/10'
                    }`}>
                      <MessageSquare className={`w-5 h-5 ${shownQuoteId === activeMovie.id ? 'animate-bounce text-black' : ''}`} />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[8px] uppercase font-bold tracking-widest text-white/40 block font-mono">{localT.quoteLabel}</span>
                      <p className="text-sm font-black text-white leading-tight mt-0.5">"{activeQuote.speaker}"</p>
                      <p className="text-[10px] text-amber-400/80 font-mono mt-0.5">Mockumentary Highlight Dialogue</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end w-full sm:w-auto shrink-0">
                    <button
                      onClick={() => handleQuoteToggle(activeMovie.id)}
                      className={`w-full sm:w-auto px-4 py-2 rounded-lg font-bold text-[10px] uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-1.5 ${
                        shownQuoteId === activeMovie.id
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                          : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                      }`}
                    >
                      {shownQuoteId === activeMovie.id ? (
                        <>
                          <Sparkles className="w-3 h-3 text-amber-500 animate-spin-slow shrink-0" />
                          <span>{localT.quoteReady}</span>
                        </>
                      ) : (
                        localT.getQuote
                      )}
                    </button>
                    {shownQuoteId === activeMovie.id && (
                      <div className="text-[11px] text-amber-100 bg-amber-950/40 border border-amber-500/25 p-2 rounded-lg mt-2 text-left max-w-xs leading-relaxed font-sans shadow-lg animate-fade-in block">
                        <span className="text-amber-400 font-serif text-lg leading-none">“</span>
                        {activeQuote.quote}
                        <span className="text-amber-400 font-serif text-lg leading-none">”</span>
                        <p className="text-[9px] text-white/50 italic mt-1 font-mono text-right">— Delivery: {activeQuote.deliveryStyle}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Critic Analysis View */}
              <div className="space-y-2 border-t border-white/5 pt-4">
                <span className="text-white/40 font-bold uppercase tracking-widest text-[9px] font-mono flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                  {localT.directorsCut}
                </span>
                <p className="text-xs text-white/60 leading-relaxed font-sans italic border-l-2 border-amber-500/30 pl-3">
                  {activeMovie.criticalAnalysis}
                </p>
              </div>
            </div>

            {/* Interactive User Amusement Rating Panel */}
            <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6">
              
              {/* Laughter / Smiley Star ratings */}
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-bold text-white/40 font-mono flex items-center gap-1">
                  {localT.humorRating}
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
                          const updatedGenreClicks = { ...userState.genreClicks, Comedy: (userState.genreClicks['Comedy'] || 0) + 1 };
                          const nextState = { ...userState, ratings: updatedRatings, genreClicks: updatedGenreClicks };
                          localStorage.setItem('cineworld_user_state_v1', JSON.stringify(nextState));
                          window.location.reload();
                        }}
                        className={`p-1 transition-all transform hover:scale-125 ${
                          active ? 'text-amber-500' : 'text-white/25 hover:text-amber-400/60'
                        }`}
                        title={`Rate ${stars} Laughs`}
                      >
                        <Smile className={`w-4 h-4 ${active ? 'fill-current text-amber-400' : ''}`} />
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
                  className="flex-grow sm:flex-initial px-5 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold uppercase text-[10px] tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(217,119,6,0.35)] hover:shadow-[0_0_25px_rgba(217,119,6,0.55)] flex items-center justify-center gap-2"
                >
                  <Film className="w-3.5 h-3.5 text-white" />
                  {localT.quickView}
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: Sidebar listing matching comedies */}
        <div className="lg:col-span-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs uppercase tracking-widest font-mono text-white/40 pb-2 border-b border-white/5 px-1">
              <span>Spotlight Comedies</span>
              <span>({filteredComedy.length} Titles)</span>
            </div>

            <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
              {filteredComedy.map((movie) => {
                const isSelected = movie.id === activeMovie.id;
                const inWatchlist = userState.watchlist.includes(movie.id);
                const score = calculateJoyScore(movie.id);

                return (
                  <TiltCard
                    key={movie.id}
                    onClick={() => {
                      setSelectedId(movie.id);
                      if (shownQuoteId !== null) setShownQuoteId(null);
                    }}
                    className={`relative p-4 rounded-xl cursor-pointer transition-all duration-300 border backdrop-blur-sm flex gap-4 group ${
                      isSelected
                        ? 'bg-amber-950/10 border-amber-900/60 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                        : 'bg-black/30 border-white/5 hover:border-amber-950/45 hover:bg-black/50'
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
                        <div className="absolute top-1 right-1 bg-amber-500 text-black p-0.5 rounded-full border border-black z-10" title="Watchlist Queue Active">
                          <Check className="w-2 h-2 stroke-[3]" />
                        </div>
                      )}
                    </div>

                    {/* Quick textual summary */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                      <div className="space-y-0.5">
                        <p className="text-[9px] uppercase font-bold tracking-widest text-amber-400 font-mono truncate">
                          {movie.year} • {movie.runtimeOrSeasons}
                        </p>
                        <h4 className="text-xs font-black uppercase text-white truncate group-hover:text-amber-400 transition-colors leading-tight">
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
                          <span className="text-amber-400 font-bold bg-white/5 px-1.5 py-0.5 rounded text-[9px] flex items-center gap-1">
                            <Smile className="w-2.5 h-2.5 text-amber-400" />
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
          <div className="mt-6 p-4 rounded-xl border border-amber-950/10 bg-gradient-to-r from-amber-950/10 to-stone-950/10 text-[11px] leading-relaxed text-white/55 font-mono">
            <span className="text-amber-500 font-bold uppercase tracking-wider block mb-1 font-sans">Aesthetic Tip: Mockumentaries</span>
            The Mockumentary genre relies heavily on breaking the fourth wall (direct glance at the lens) to invite viewers into a shared conspiracy with the character, making the humor twice as intimate and relatable.
          </div>
        </div>

      </div>

    </section>
  );
}
