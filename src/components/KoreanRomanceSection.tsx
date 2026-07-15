import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, BookOpen, Music, Film, Tv, Plus, Check, Star, Share2, Play } from 'lucide-react';
import { Movie, UserState } from '../types';
import TiltCard from './TiltCard';
import BlurUpImage from './BlurUpImage';

interface KoreanRomanceSectionProps {
  catalog: Movie[];
  userState: UserState;
  handleMovieSelect: (id: string) => void;
  toggleWatchlist: (id: string) => void;
}

const LOCAL_TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    sectionTitle: "Korean Romantic Masterpieces",
    sectionSubtitle: "Sensory Melodramas & Heart-Wrenching Chemistry",
    sectionDesc: "Immerse yourself in high-fashion corporate dynasties, star-crossed fantasy compacts, and poetic stories of destiny and time. Experience the ultimate emotional high-fidelity storytelling with premium global subtitles.",
    inYunScore: "In-Yun Destiny Fit",
    soundtrackLabel: "Signature Theme",
    listenOST: "Listen to OST Theme",
    ostPlaying: "OST Playing in Background",
    directorsCut: "Critical Director's Perspective",
    quickView: "Launch Showcase & Trailer",
    watchlisted: "In Queue",
    addToQueue: "Add to Queue",
    koreanWave: "Hallyu Romance Portal",
    heartRating: "My Devotion Level"
  },
  es: {
    sectionTitle: "Obras Maestras Románticas Coreanas",
    sectionSubtitle: "Melodramas Sensoriales y Química Desgarradora",
    sectionDesc: "Sumérgete en dinastías corporativas de alta costura, pactos de fantasía de amantes trágicos e historias poéticas de destino y tiempo. Experimenta la máxima fidelidad emocional.",
    inYunScore: "Ajuste de Destino In-Yun",
    soundtrackLabel: "Banda Sonora Distintiva",
    listenOST: "Escuchar OST Principal",
    ostPlaying: "Reproduciendo OST",
    directorsCut: "Perspectiva Crítica del Director",
    quickView: "Iniciar Showcase y Tráiler",
    watchlisted: "En Cola",
    addToQueue: "Añadir a Cola",
    koreanWave: "Portal de Romance Hallyu",
    heartRating: "Mi Nivel de Devoción"
  },
  ja: {
    sectionTitle: "韓国ロマンス傑作選",
    sectionSubtitle: "究極の愛と魂を揺さぶる運命の化学反応",
    sectionDesc: "華麗なる財閥の愛憎劇、魔王との禁断の契約、そして時空を超えた切ない運命の物語。極上の映像美と心震える音楽が織りなす、プレミアムな韓国ドラマの世界へ。",
    inYunScore: "因縁（イニョン）運命適合度",
    soundtrackLabel: "代表テーマ曲",
    listenOST: "OSTを試聴する",
    ostPlaying: "OSTバックグラウンド再生中",
    directorsCut: "監督のクリティカルな視点",
    quickView: "ショーケースと予告編を起動",
    watchlisted: "キューに追加済み",
    addToQueue: "キューに追加",
    koreanWave: "韓流ロマンスポータル",
    heartRating: "私の愛着度"
  },
  hi: {
    sectionTitle: "कोरियाई रोमांटिक उत्कृष्ट कृतियाँ",
    sectionSubtitle: "संवेदी मेलोड्रामा और दिल दहला देने वाली केमिस्ट्री",
    sectionDesc: "उच्च फैशन कॉर्पोरेट घरानों, प्रेमियों के बीच काल्पनिक समझौतों, और भाग्य और समय की काव्यात्मक कहानियों में खुद को डुबो दें। प्रीमियम वैश्विक उपशीर्षक के साथ परम भावनात्मक कहानी कहने का अनुभव करें।",
    inYunScore: "इन-यून डेस्टिनी फिट",
    soundtrackLabel: "सिग्नेचर थीम",
    listenOST: "ओएसटी थीम सुनें",
    ostPlaying: "बैकग्राउंड में बज रहा है",
    directorsCut: "निर्देशक का आलोचनात्मक दृष्टिकोण",
    quickView: "शोकेस और ट्रेलर लॉन्च करें",
    watchlisted: "कतार में सुरक्षित",
    addToQueue: "कतार में जोड़ें",
    koreanWave: "हॉल्यू रोमांस पोर्टल",
    heartRating: "मेरा भक्ति स्तर"
  },
  ar: {
    sectionTitle: "روائع الرومانسية الكورية",
    sectionSubtitle: "ميلودراما حسية وكيمياء عاطفية ساحرة",
    sectionDesc: "انغمس في صراعات العائلات الثرية الأنيقة، وعقود الفانتازيا الأسطورية، وقصص القدر والوقت الشاعرية. اختبر أعلى درجات التعبير العاطفي مع ترجمة احترافية كاملة.",
    inYunScore: "مقياس قدر 'إن-يون'",
    soundtrackLabel: "الموسيقى التصويرية الشهيرة",
    listenOST: "استمع إلى الأغنية الرئيسية",
    ostPlaying: "يتم تشغيل الموسيقى في الخلفية",
    directorsCut: "رؤية المخرج النقدية",
    quickView: "شاهد العرض الترويجي والترولر",
    watchlisted: "في قائمة الانتظار",
    addToQueue: "أضف إلى الانتظار",
    koreanWave: "بوابة الرومانسية الكورية",
    heartRating: "درجة إعجابي العاطفي"
  }
};

const OST_DATA: Record<string, { title: string; artist: string; audioHint: string }> = {
  'crash-landing-on-you': {
    title: "Here I Am Again",
    artist: "Yerin Baek",
    audioHint: "Melancholic piano chords layered with soft acoustic strings..."
  },
  'queen-of-tears': {
    title: "Love You With All My Heart",
    artist: "Crush",
    audioHint: "Sweeping orchestral violins carrying an emotionally powerful, high-note crescendo..."
  },
  'past-lives': {
    title: "Quiet Eyes",
    artist: "Sharon Van Etten",
    audioHint: "Quiet, minimal acoustic guitar chords and deep, breathing vocal reverbs..."
  },
  'my-demon': {
    title: "Our Love",
    artist: "Seventeen's Seungkwan",
    audioHint: "Bright, sparkling retro pop synths interlaced with classical harp progressions..."
  }
};

export default function KoreanRomanceSection({ 
  catalog, 
  userState, 
  handleMovieSelect, 
  toggleWatchlist 
}: KoreanRomanceSectionProps) {
  const lang = userState.preferredLanguage || 'en';
  const localT = LOCAL_TRANSLATIONS[lang] || LOCAL_TRANSLATIONS['en'];

  // Filter Korean Romance titles from the catalog
  const romanceKoreanItems = catalog.filter(movie => 
    movie.genres.includes('Korean') && movie.genres.includes('Romance')
  );

  const [selectedId, setSelectedId] = useState<string>(romanceKoreanItems[0]?.id || 'crash-landing-on-you');
  const [playingOstId, setPlayingOstId] = useState<string | null>(null);

  if (romanceKoreanItems.length === 0) return null;

  const activeMovie = romanceKoreanItems.find(m => m.id === selectedId) || romanceKoreanItems[0];
  const isWatchlisted = userState.watchlist.includes(activeMovie.id);
  const ost = OST_DATA[activeMovie.id];

  // Calculate customized "In-Yun" alignment score for the luxury vibe
  const calculateInYunScore = (movieId: string): number => {
    let base = 88;
    const clicks = userState.clicks[movieId] || 0;
    const rating = userState.ratings[movieId] || 0;
    const isLoved = userState.genreClicks['Romance'] || 0;
    
    base += Math.min(6, clicks * 2);
    if (rating > 0) base += (rating - 3) * 2.5;
    base += Math.min(5, isLoved * 1.5);
    return Math.min(100, Math.max(75, Math.floor(base)));
  };

  const currentScore = calculateInYunScore(activeMovie.id);

  const handleOstToggle = (id: string) => {
    if (playingOstId === id) {
      setPlayingOstId(null);
    } else {
      setPlayingOstId(id);
    }
  };

  return (
    <section className="relative z-20 max-w-7xl mx-auto px-6 py-16 border-t border-white/5" id="korean-romance-section">
      
      {/* Luxury Floral Rose-Gold/Lavender Background Accents */}
      <div className="absolute top-[30%] left-[5%] w-[400px] h-[400px] rounded-full bg-pink-500/5 blur-[130px] pointer-events-none -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-[20%] right-[10%] w-[450px] h-[450px] rounded-full bg-violet-600/5 blur-[150px] pointer-events-none -z-10"></div>

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-pink-400 font-mono text-xs uppercase tracking-[0.3em] font-bold">
            <Heart className="w-4 h-4 fill-pink-500 text-pink-500 animate-pulse" />
            <span>{localT.koreanWave}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black italic uppercase text-white tracking-tight leading-none mt-2">
            {localT.sectionTitle}
          </h2>
          <p className="text-xs md:text-sm font-semibold uppercase tracking-wider text-pink-300/60 font-mono">
            {localT.sectionSubtitle}
          </p>
          <p className="text-xs text-white/55 max-w-3xl leading-relaxed mt-2">
            {localT.sectionDesc}
          </p>
        </div>

        {/* Total Badge counts */}
        <div className="text-right shrink-0 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 backdrop-blur-sm self-start md:self-end">
          <p className="text-[9px] font-bold text-white/45 uppercase tracking-widest font-mono">Master Selection</p>
          <p className="text-base font-black text-pink-400 font-mono leading-none mt-1">
            {romanceKoreanItems.length} <span className="text-xs text-white/40 font-normal">Sensory Masterpieces</span>
          </p>
        </div>
      </div>

      {/* Main Interactive Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* LEFT COLUMN: Highly Styled Cinematic Interactive Card */}
        <div className="lg:col-span-8 bg-gradient-to-br from-[#0c050d] to-[#050308] border border-pink-500/10 rounded-2xl overflow-hidden shadow-2xl relative flex flex-col justify-between">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/5 blur-[80px] pointer-events-none"></div>

          {/* Master backdrop preview screen */}
          <div className="h-72 sm:h-96 relative overflow-hidden">
            <BlurUpImage 
              src={activeMovie.backdropUrl} 
              alt={activeMovie.title} 
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter brightness-[0.85] saturate-[1.1] transition-all duration-1000 scale-100"
            />
            {/* Visual styling gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050308] via-transparent to-black/30"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#0c050d]/80 via-transparent to-black/40"></div>

            {/* floating In-Yun Affinity score badge */}
            <div className="absolute top-4 left-4 bg-black/85 border border-pink-500/30 rounded-xl px-3 py-1.5 flex items-center gap-2.5 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-spin-slow" />
              <div>
                <p className="text-[8px] font-mono uppercase text-white/40 leading-none tracking-widest">{localT.inYunScore}</p>
                <p className="text-sm font-black text-pink-400 font-mono leading-none mt-1">{currentScore}% Match</p>
              </div>
            </div>

            {/* Bottom-left title metadata block */}
            <div className="absolute bottom-4 left-6 right-6">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="px-2 py-0.5 bg-pink-500/20 text-pink-300 border border-pink-500/30 text-[9px] font-mono rounded tracking-widest uppercase">
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

          {/* Deep Information Deck */}
          <div className="p-6 sm:p-8 space-y-6 flex-1 flex flex-col justify-between">
            
            <div className="space-y-6">
              {/* Creator & Cast and Synopsis */}
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
                      {activeMovie.cast.join(', ')}
                    </p>
                  </div>
                </div>

                {/* Synopsis (8 cols) */}
                <div className="md:col-span-8 space-y-2">
                  <span className="text-pink-400 font-bold uppercase tracking-widest text-[9px] font-mono block">Logline Synopsis</span>
                  <p className="text-sm text-white/70 leading-relaxed font-sans">
                    {activeMovie.synopsis}
                  </p>
                </div>
              </div>

              {/* Special interactive Soundtrack & Theme Player Simulation */}
              {ost && (
                <div className="bg-pink-950/10 border border-pink-500/20 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 backdrop-blur-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/5 rounded-full blur-xl pointer-events-none"></div>
                  <div className="flex items-center gap-3.5">
                    <div className={`p-3 rounded-xl border transition-all shrink-0 ${
                      playingOstId === activeMovie.id 
                        ? 'bg-pink-500 text-white border-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.3)] animate-pulse' 
                        : 'bg-white/5 text-pink-400 border-white/10'
                    }`}>
                      <Music className={`w-5 h-5 ${playingOstId === activeMovie.id ? 'animate-bounce' : ''}`} />
                    </div>
                    <div>
                      <span className="text-[8px] uppercase font-bold tracking-widest text-white/40 block font-mono">{localT.soundtrackLabel}</span>
                      <p className="text-sm font-black text-white leading-tight mt-0.5">"{ost.title}"</p>
                      <p className="text-[10px] text-pink-300/70 font-mono mt-0.5">By {ost.artist}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end w-full sm:w-auto shrink-0">
                    <button
                      onClick={() => handleOstToggle(activeMovie.id)}
                      className={`w-full sm:w-auto px-4 py-2 rounded-lg font-bold text-[10px] uppercase tracking-wider transition-all duration-300 ${
                        playingOstId === activeMovie.id
                          ? 'bg-pink-500/20 text-pink-400 border border-pink-500/40'
                          : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                      }`}
                    >
                      {playingOstId === activeMovie.id ? localT.ostPlaying : localT.listenOST}
                    </button>
                    {playingOstId === activeMovie.id && (
                      <span className="text-[8px] text-pink-400/80 font-mono mt-1 text-right italic max-w-[180px] leading-tight animate-pulse block">
                        {ost.audioHint}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Critical Director's Cuts Perspective */}
              <div className="space-y-2 border-t border-white/5 pt-4">
                <span className="text-white/40 font-bold uppercase tracking-widest text-[9px] font-mono flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-pink-400" />
                  {localT.directorsCut}
                </span>
                <p className="text-xs text-white/60 leading-relaxed font-sans italic border-l-2 border-pink-500/30 pl-3">
                  {activeMovie.criticalAnalysis}
                </p>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6">
              
              {/* Devotion / Rating Selector with customized hearts */}
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-bold text-white/40 font-mono flex items-center gap-1">
                  {localT.heartRating}
                </p>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((stars) => {
                    const currentRating = userState.ratings[activeMovie.id] || 0;
                    const active = stars <= currentRating;
                    return (
                      <button
                        key={stars}
                        onClick={() => {
                          // Submit rating dynamically
                          const updatedRatings = { ...userState.ratings, [activeMovie.id]: stars };
                          // booster genre clicks
                          const updatedGenreClicks = { ...userState.genreClicks, Romance: (userState.genreClicks['Romance'] || 0) + 1 };
                          // trigger update
                          const nextState = { ...userState, ratings: updatedRatings, genreClicks: updatedGenreClicks };
                          localStorage.setItem('cineworld_user_state_v1', JSON.stringify(nextState));
                          window.location.reload(); // Quick refresh to synchronize recommendation matrix
                        }}
                        className={`p-1 transition-all transform hover:scale-125 ${
                          active ? 'text-pink-500' : 'text-white/25 hover:text-pink-400/60'
                        }`}
                        title={`Rate ${stars} Hearts`}
                      >
                        <Heart className={`w-4 h-4 ${active ? 'fill-current' : ''}`} />
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
                  className="flex-grow sm:flex-initial px-5 py-3 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-bold uppercase text-[10px] tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_25px_rgba(236,72,153,0.5)] flex items-center justify-center gap-2"
                >
                  <Film className="w-3.5 h-3.5 text-white" />
                  {localT.quickView}
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Vertical Catalog of Korean Romance */}
        <div className="lg:col-span-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs uppercase tracking-widest font-mono text-white/40 pb-2 border-b border-white/5 px-1">
              <span>Hallyu Selection</span>
              <span>({romanceKoreanItems.length} Titles)</span>
            </div>

            <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
              {romanceKoreanItems.map((movie) => {
                const isSelected = movie.id === selectedId;
                const inWatchlist = userState.watchlist.includes(movie.id);
                const score = calculateInYunScore(movie.id);

                return (
                  <TiltCard
                    key={movie.id}
                    onClick={() => {
                      setSelectedId(movie.id);
                      if (playingOstId !== null) setPlayingOstId(null);
                    }}
                    className={`relative p-4 rounded-xl cursor-pointer transition-all duration-300 border backdrop-blur-sm flex gap-4 group ${
                      isSelected
                        ? 'bg-pink-500/10 border-pink-500/60 shadow-[0_0_15px_rgba(236,72,153,0.15)]'
                        : 'bg-black/30 border-white/5 hover:border-pink-500/25 hover:bg-black/50'
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
                        <div className="absolute top-1 right-1 bg-pink-500 text-white p-0.5 rounded-full border border-black z-10" title="Watchlist Queue Active">
                          <Check className="w-2 h-2 stroke-[3]" />
                        </div>
                      )}
                    </div>

                    {/* Quick textual summary */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                      <div className="space-y-0.5">
                        <p className="text-[9px] uppercase font-bold tracking-widest text-pink-400 font-mono truncate">
                          {movie.year} • {movie.runtimeOrSeasons}
                        </p>
                        <h4 className="text-xs font-black uppercase text-white truncate group-hover:text-pink-400 transition-colors leading-tight">
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
                          <span className="text-pink-400/90 font-bold bg-white/5 px-1.5 py-0.5 rounded text-[9px] flex items-center gap-1">
                            <Heart className="w-2.5 h-2.5 fill-pink-500 text-pink-500" />
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

          {/* Quick cultural tip of Romance */}
          <div className="mt-6 p-4 rounded-xl border border-pink-500/10 bg-gradient-to-r from-pink-950/10 to-violet-950/10 text-[11px] leading-relaxed text-white/55 font-mono">
            <span className="text-pink-400 font-bold uppercase tracking-wider block mb-1">Cultural Telemetry: 인연 (In-Yun)</span>
            "In-Yun" represents the concept of providential fate. In Korea, it is believed that if two people brush past each other in the street and their clothes collide, it means they have completed over 8,000 layers of In-Yun across past lives.
          </div>
        </div>

      </div>

    </section>
  );
}
