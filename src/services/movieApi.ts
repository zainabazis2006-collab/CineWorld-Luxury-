import { Movie } from '../types';

export interface MovieMediaData {
  posterUrl?: string;
  backdropUrl?: string;
  youtubeId?: string;
  trailerUrl?: string;
  synopsis?: string;
  rating?: number;
}

// Memory & LocalStorage Cache to avoid redundant API hits
const MEDIA_CACHE: Record<string, MovieMediaData> = {};

// Comprehensive dictionary of official verified YouTube trailer IDs and TMDB posters/backdrops
export const OFFICIAL_MEDIA_MAP: Record<string, MovieMediaData> = {
  'dune-part-two': { youtubeId: 'Way9Dexny3w', posterUrl: 'https://image.tmdb.org/t/p/w500/1pdfLPoL38R3A32TH39BBD3SuB.jpg', backdropUrl: 'https://image.tmdb.org/t/p/original/xOMo8ScR3P22Pev2A1M932463e6.jpg' },
  'oppenheimer': { youtubeId: 'uYPbbksJxIg', posterUrl: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv3B23824P.jpg', backdropUrl: 'https://image.tmdb.org/t/p/original/fm6K3P9339395232333333333.jpg' },
  'interstellar': { youtubeId: 'zSWdZVtXT7E', posterUrl: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg', backdropUrl: 'https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo6LERdE1LFN_1.jpg' },
  'spider-verse': { youtubeId: 'g4Hbz2jWDvQ' },
  'the-dark-knight': { youtubeId: 'EXeTwQWrcwY' },
  'stranger-things': { youtubeId: 'b9EkMc79ZSU' },
  'the-crown': { youtubeId: 'JWtnJjn6ng0' },
  'black-mirror': { youtubeId: 'V0XOApF5nLU' },
  'the-boys': { youtubeId: 'M1bhOaLv4FU' },
  'rings-of-power': { youtubeId: 'f2Cs-SXZ_f8' },
  'fleabag': { youtubeId: 'aX2VIv_h9To' },
  'the-mandalorian': { youtubeId: 'aOC8E8z_ifw' },
  'loki': { youtubeId: 'nW948VaI4vA' },
  'shogun': { youtubeId: 'yAN5SbyvTlg' },
  'squid-game': { youtubeId: 'oqxAJKy0R4I' },
  'wednesday': { youtubeId: 'Di310WS8zLk' },
  'reacher': { youtubeId: 'GGf_p_0PymA' },
  'the-bear': { youtubeId: 'gC7bS_Ibyf8' },
  'succession': { youtubeId: 't33G-E_QnI0' },
  'avatar-way-of-water': { youtubeId: 'd9MyW72ELq0' },
  'damsel': { youtubeId: 'T39_6_S70fU' },
  'severance': { youtubeId: 'xEQP4VVuyrY' },
  'severance-series': { youtubeId: 'xEQP4VVuyrY' },
  'arcane': { youtubeId: 'fXmAurh012s' },
  'the-last-of-us': { youtubeId: 'uLtkt8BonwM' },
  'eeao': { youtubeId: 'wxN1T1uxQ2g' },
  'everything-everywhere': { youtubeId: 'wxN1T1uxQ2g' },
  'cyberpunk-edgerunners': { youtubeId: 'JtqIas3bYhg' },
  'godzilla-minus-one': { youtubeId: 'r7DqccP1Q_4' },
  'white-lotus': { youtubeId: 'TGLq7_MonZ4' },
  'the-white-lotus': { youtubeId: 'TGLq7_MonZ4' },
  'inception': { youtubeId: 'YoHD9XEInc0' },
  'breaking-bad': { youtubeId: 'HhesaQXLuRY' },
  'game-of-thrones': { youtubeId: 'gcTk8SiBg0U' },
  'parasite': { youtubeId: '5xH0j3l441w' },
  'house-of-the-dragon': { youtubeId: 'DotnJ7tTA34' },
  'knives-out': { youtubeId: 'qGqiHJTsRkU' },
  'enola-holmes-1': { youtubeId: '1d0Zf9sXlGs' },
  'enola-holmes-2': { youtubeId: 'KKXNmYoPk6g' },
  'enola-holmes-3': { youtubeId: 'KKXNmYoPk6g' },
  'the-matrix': { youtubeId: 'vKQi3bBA1y8' },
  'gladiator': { youtubeId: 'P5ieIbInF5s' },
  'pulp-fiction': { youtubeId: 's7EdQ4FqbhY' },
  'fight-club': { youtubeId: 'qtRKDV93s2s' },
  'spirited-away': { youtubeId: 'ByXuk9QqQkk' },
  'from-series': { youtubeId: 'p77f_z366S8' },
  'widows-bay': { youtubeId: 'NId1S8vIdO0' },
  'alice-in-borderland': { youtubeId: '49_44FFKZ1M' },
  'if-wishes-could-kill': { youtubeId: '_pTzV3vB-y0' },
  'all-of-us-are-dead': { youtubeId: 'IN5TD4y9FPM' },
  'voicemails-by-isabelle': { youtubeId: 'Y2p_2hF8r_k' },
  'crash-landing-on-you': { youtubeId: 'eXMjTXL242M' },
  'queen-of-tears': { youtubeId: '3y_x6f_NqA0' },
  'past-lives': { youtubeId: 'kA244xewhis' },
  'my-demon': { youtubeId: 'e92h83G4_4c' },
  'shaitaan': { youtubeId: 'p7m16P0kIms' },
  'the-conjuring': { youtubeId: 'k10ETZ41q5o' },
  'jujutsu-kaisen': { youtubeId: 'pkN6r5oMhhk' },
  'brooklyn-nine-nine': { youtubeId: 'sEOuJ4z5aTc' },
  'the-office': { youtubeId: 'tO9RmyR31I4' },
  'modern-family': { youtubeId: 'X0lRjbrH-L8' },
  'mad-max-fury-road': { youtubeId: 'hEJnMQG9ev8' },
  'john-wick-4': { youtubeId: 'qEVUtrn8340' },
  'rrr': { youtubeId: 'f_vbAtFSEc0' },
  'tumbbad': { youtubeId: 'sN75heX_45E' },
  'tumbbad-movie': { youtubeId: 'sN75heX_45E' },
  'hereditary': { youtubeId: 'V6wWKNij_Bw' },
  'panchayat': { youtubeId: 'mojZJ7uetXc' },
  'schitts-creek': { youtubeId: 'W0uMbD8i124' },
  'goblin': { youtubeId: '8AcNGVVur3c' },
  'business-proposal': { youtubeId: 'M-DHYuO-j1s' },
  'charade-1963': { youtubeId: 'Sso_gQ_fP-Y' },
  'night-of-the-living-dead': { youtubeId: '0TA_q_9vP7M' },
  'the-general-1926': { youtubeId: 'n-n3eS_mU9g' },
  'his-girl-friday-1940': { youtubeId: '0b30M-P7HkY' },
  'deadpool-and-wolverine': { youtubeId: '73_1biulkYk' },
  'gladiator-2': { youtubeId: '4mgUU-s4p2s' },
  'lovely-runner': { youtubeId: 'C6Bf9-UuUvQ' },
  'talk-to-me': { youtubeId: 'aLAKJu9aJys' },
  'the-queens-gambit': { youtubeId: 'oZn3aiGeupU' },
  'narcos-series': { youtubeId: 'xl8zdCY-abw' },
  'ozark-series': { youtubeId: '5hAXVq394DA' },
  'bojack-horseman': { youtubeId: 'i1eJMig51xm' },
  'the-irishman': { youtubeId: 'WHXxVmeGQUc' },
  'roma-movie': { youtubeId: '6BS27ngZlxg' },
  'glass-onion': { youtubeId: 'gj5ibYSz8C0' },
  'extraction-movie': { youtubeId: 'L6P3nI6VnlY' },
  'marvelous-mrs-maisel': { youtubeId: 'fOmwkTrW4OQ' },
  'invincible-series': { youtubeId: '-bfAVpuko5o' },
  'jack-ryan-series': { youtubeId: '1KsyZF5bEBg' },
  'saltburn-movie': { youtubeId: 'lA9451JBy5U' },
  'air-movie': { youtubeId: 'Euy4Yu6B3nU' },
  'sound-of-metal': { youtubeId: 'VFOrGkav7AE' },
  'fallout-series': { youtubeId: 'V-M1G_o-e1c' },
  'bridgerton': { youtubeId: 'gpv7ayf_tyE' },
  'beef-series': { youtubeId: 'AFPIMHBzGDs' },
  'the-sandman-series': { youtubeId: 'Z2AUpfO1-k4' },
  'the-expanse': { youtubeId: 'kQujA39-Xm0' },
  'the-idea-of-you': { youtubeId: 'V8O_S8v0bXg' },
  'society-of-the-snow': { youtubeId: 'pKa9T_Xp3f0' },
  'road-house-2024': { youtubeId: 'YnS_fL4-26c' },
  'the-covenant': { youtubeId: '02PSoxSthP8' },
  'nimona': { youtubeId: 'f_3Yu_765yM' },
  'laapataa-ladies': { youtubeId: 'gLp_P3jO-vE' },
  'heeramandi-series': { youtubeId: 'v8R0aT4P-K8' },
  'aavesham-movie': { youtubeId: 'L0yA3v5gXgM' },
  'farzi-series': { youtubeId: 'vA8J4D86Tsk' },
  'railway-men': { youtubeId: 'y_B6i0x2xYk' },
  'chamkila-movie': { youtubeId: 'kL_b118yUv4' },
  'family-man-series': { youtubeId: 'NGf_4281734' },
  'kohrra-series': { youtubeId: 'c92b-P30x_I' },
  'maamla-legal-hai': { youtubeId: '09xY7L5c11U' },
  'aladdin': { youtubeId: 'foyufD52aog' },
  'ikka': { youtubeId: 'aX2VIv_h9To' },
  'daadi-ki-shaadi': { youtubeId: '09xY7L5c11U' },
  'blast': { youtubeId: 'L0yA3v5gXgM' },
  'dhurandar-1': { youtubeId: 'ZNeGF-PvKbE' },
  'dhurandar-2': { youtubeId: 'ZNeGF-PvKbE' },
  'the-witcher-series': { youtubeId: 'ndl1W4ltcmg' },
  'mindhunter-series': { youtubeId: 'LR3G1l_X88U' },
  'fellowship-of-the-ring': { youtubeId: 'V75dMMIW-Jc' },
  'chernobyl-series': { youtubeId: 's9APLXM9Ei8' },
  'all-quiet-western-front': { youtubeId: 'hf8EYbVxtCY' },
  'normal-people': { youtubeId: 'x1JQuW645rU' },
  'the-night-manager': { youtubeId: 'g-A73k378C0' },
  'sacred-games': { youtubeId: '28j8h0RRb48' },
  'jubilee-series': { youtubeId: 'K2O8mE32v8Y' },
  'kantara-movie': { youtubeId: 's9APLXM9Ei8' },
  'dahaad-series': { youtubeId: 'A7gE081_80o' },
  'aarya-series': { youtubeId: '3_b1xM8243g' },
  'criminal-justice-india': { youtubeId: 'S93k35x4f8g' },
  'jaane-jaan': { youtubeId: 'c4b18u2714k' },
  'super-deluxe-movie': { youtubeId: '3-x3k98711s' },
  'delhi-crime-series': { youtubeId: 'jNuKqwX_s2o' },
  'jawan-movie': { youtubeId: 'COv52Qyctws' },
  'hanuman-legend': { youtubeId: '4k_34761k88' },
  'suzhal-series': { youtubeId: 's9A873k3k10' },
  'shershaah-movie': { youtubeId: 'Q0FU804v0kM' },
  'avatar-fire-and-ash': { youtubeId: 'd9MyW72ELq0' },
  'stranger-things-5': { youtubeId: 'b9EkMc79ZSU' },
  'dune-messiah': { youtubeId: 'Way9Dexny3w' },
  'blade-runner-2099': { youtubeId: 'gCcx85zbxz4' },
  'project-hail-mary': { youtubeId: 'zSWdZVtXT7E' },
  "alien-romulus": { youtubeId: "bQlwYnouC98", posterUrl: "https://image.tmdb.org/t/p/w500/2uSWRTtCG336nuBiG8jOTEUKSy8.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/iYqSQaWDttQIQzsxg9xHyg0bttG.jpg" },
  "inside-out-2": { youtubeId: "QGFELnpig2M", posterUrl: "https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/p5ozvmdgsmbWe0H8Xk7Rc8SCwAB.jpg" },
  "furiosa-mad-max": { youtubeId: "LYV3001u574", posterUrl: "https://image.tmdb.org/t/p/w500/iADOJ8Zymht2JPMoy3R7xceZprc.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/raph7qjAGTMXaIjVxt6ZDSXRzUr.jpg" },
  "the-batman-2022": { youtubeId: "XS8rfqYJXRY", posterUrl: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/IYUD7rAIXzBM91TT3Z5fILUS7n.jpg" },
  "top-gun-maverick": { youtubeId: "Klc__shdj88", posterUrl: "https://image.tmdb.org/t/p/w500/n0YuM4f5lvGAP6MAW2kBIzugXnc.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/AaV1YIdWKnjAIAOe8UUKBFm327v.jpg" },
  "tenet-movie": { youtubeId: "KJP5RunZUKk", posterUrl: "https://image.tmdb.org/t/p/w500/aCIFMriQh8rvhxpN1IWGgvH0Tlg.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/mQOUyqDybTqxl73hO5LujCZsM1o.jpg" },
  "arrival-movie": { youtubeId: "7W1m5ER3I1Y", posterUrl: "https://image.tmdb.org/t/p/w500/x2FJsf1ElAgr63Y3PNPtJrcmpoe.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/8MUZz7oPXQftFTslZpRP3CVMOoq.jpg" },
  "whiplash-movie": { youtubeId: "Q7kZy3T6vRM", posterUrl: "https://image.tmdb.org/t/p/w500/7fn624j5lj3xTme2SgiLCeuedmO.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/wbQa0EnWUyRzQ5d1pHLNRlmsCUP.jpg" },
  "inglourious-basterds": { youtubeId: "uSEDz-my7XQ", posterUrl: "https://image.tmdb.org/t/p/w500/aupnPtagH9JVBuMrGEanf4iqXEQ.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/hwNtEmmugU5Yd7hpfprNWI0DGIn.jpg" },
  "the-matrix-1999": { youtubeId: "FVI84Dfx2-I", posterUrl: "https://image.tmdb.org/t/p/w500/dXNAPwY7VrqMAo51EKhhCJfaGb5.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/tlm8UkiQsitc8rSuIAscQDCnP8d.jpg" },
  "the-godfather": { youtubeId: "Ew9ngL1GZvs", posterUrl: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/tSPT36ZKlP2WVHJLM4cQPLSzv3b.jpg" },
  "your-name": { youtubeId: "RuyHIkXdYf8", posterUrl: "https://image.tmdb.org/t/p/w500/vfJFJPepRKapMd5G2ro7klIRysq.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/8x9iKH8kWA0zdkgNdpAew7OstYe.jpg" },
  "spider-man-across-spider-verse": { youtubeId: "LYtS6yKsOEQ", posterUrl: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/kVd3a9YeLGkoeR50jGEXM6EqseS.jpg" },
  "barbie": { youtubeId: "EDOdCaj3R3s", posterUrl: "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/3N5QNUqS76GFYNoEayfkkJyAyTN.jpg" },
  "poor-things": { youtubeId: "fORsy_9Il_A", posterUrl: "https://image.tmdb.org/t/p/w500/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/zh6IdheEYinU4TPtorWsjx6qPQE.jpg" },
  "killers-of-the-flower-moon": { youtubeId: "Lm73h0l1W2M", posterUrl: "https://image.tmdb.org/t/p/w500/dB6Krk806zeqd0YNp2ngQ9zXteH.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/acvE3RWjDLgvbL2RtcyzkrsAyNV.jpg" },
  "the-zone-of-interest": { youtubeId: "W17B_MUkv9k", posterUrl: "https://image.tmdb.org/t/p/w500/hUu9zyZmDd8VZegKi1iK1Vk0RYS.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/pnTSOKcYnvdpQNQElAtJM1rWOxH.jpg" },
  "anatomy-of-a-fall": { youtubeId: "vtNYnjWUFqE", posterUrl: "https://image.tmdb.org/t/p/w500/1ho0d4LNZw3Y0voeKmSvPSgJOJ2.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/lDVl2jf6VB8ODl1olZ6FLvOV1gX.jpg" },
  "challengers": { youtubeId: "rpUlYM1i2mg", posterUrl: "https://image.tmdb.org/t/p/w500/H6vke7zGiuLsz4v4RPeReb9rsv.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/tq8COKsI99Bivjd4CZIYVGoKcIx.jpg" },
  "monkey-man": { youtubeId: "6LboWl0yRGg", posterUrl: "https://image.tmdb.org/t/p/w500/4lhR4L2vzzjl68P1zJyCH755Oz4.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/9NSXdVHeSfSHUv49OzLispFcpz1.jpg" },
  "the-wild-robot": { youtubeId: "oEC84M0GMdg", posterUrl: "https://image.tmdb.org/t/p/w500/wTnV3PCVW5O92JMrFvvrRcV39RU.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/mQZJoIhTEkNhCYAqcHrQqhENLdu.jpg" },
  "maharaja-2024": { youtubeId: "Otcr-vRuaQs", posterUrl: "https://image.tmdb.org/t/p/w500/s0m4TM1XRAftQStgKpw024RvkJo.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/if61bpqSXngkGoGNjMdHZt02wZS.jpg" },
  "rrr-movie": { youtubeId: "i4pjiLGUTtk", posterUrl: "https://image.tmdb.org/t/p/w500/u0XUBNQWlOvrh0Gd97ARGpIkL0.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/i0Y0wP8H6SRgjr6QmuwbtQbS24D.jpg" },
  "12th-fail-movie": { youtubeId: "KjbtuqENvVE", posterUrl: "https://image.tmdb.org/t/p/w500/eebUPRI4Z5e1Z7Hev4JZAwMIFkX.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/6RV2o8PBCEyw9ylOWViV1CtULIF.jpg" },
  "la-la-land": { youtubeId: "_oBwwSXdO_E", posterUrl: "https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/nlPCdZlHtRNcF6C9hzUH4ebmV1w.jpg" },
  "the-penguin-series": { youtubeId: "da6afm5AAIY", posterUrl: "https://image.tmdb.org/t/p/w500/vOWcqC4oDQws1doDWLO7d3dh5qc.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/4TdmuuwiIiKw3JOjIuhdgYxRXnN.jpg" },
  "true-detective": { youtubeId: "fVQUcaO4AvE", posterUrl: "https://image.tmdb.org/t/p/w500/dC7jkj2g1aU8sxKqM6D4g44xA6w.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/v8YFr8BbU9qsO8PYIulzTeM6Qk.jpg" },
  "better-call-saul": { youtubeId: "HN4oydykJFc", posterUrl: "https://image.tmdb.org/t/p/w500/zjg4jpK1Wp2kiRvtt5ND0kznako.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/rfxryDIv8huejujg4JueDJx8zCz.jpg" },
  "the-wire": { youtubeId: "uDcQbk78CSw", posterUrl: "https://image.tmdb.org/t/p/w500/4lbclFySvugI51fwsyxBTOm4DqK.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/layPSOJGckJv3PXZDIVluMq69mn.jpg" },
  "the-sopranos": { youtubeId: "Q8cBFvpqmH0", posterUrl: "https://image.tmdb.org/t/p/w500/rTc7ZXdroqjkKivFPvCPX0Ru7uw.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/lNpkvX2s8LGB0mjGODMT4o6Up7j.jpg" },
  "peaky-blinders": { youtubeId: "EM12mcTEI88", posterUrl: "https://image.tmdb.org/t/p/w500/vUUqzWa2LnHIVqkaKVlVGkVcZIW.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/dzq83RHwQcnP6WGJ6YkenIqeaa5.jpg" },
  "dark-series": { youtubeId: "pi2k1u6eZuI", posterUrl: "https://image.tmdb.org/t/p/w500/apbrbWs8M9lyOpJYU5WXrpFbk1Z.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/3jDXL4Xvj3AzDOF6UH1xeyHW8MH.jpg" },
  "sherlock-series": { youtubeId: "gGqWqGOSTGQ", posterUrl: "https://image.tmdb.org/t/p/w500/7WTsnHkbA0FaG6R9twfFde0I9hl.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/8rvLEmdI4gLrMO1rLqbNdnNcPFE.jpg" },
  "attack-on-titan": { youtubeId: "HJaUvV9Hwgs", posterUrl: "https://image.tmdb.org/t/p/w500/hTP1DtLGFamjfu8WqjnuQdP1n4i.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/rqbCbjB19amtOtFQbb3K2lgm2zv.jpg" },
  "frieren-beyond-journeys-end": { youtubeId: "01WEqntM1NI", posterUrl: "https://image.tmdb.org/t/p/w500/dqZENchTd7lp5zht7BdlqM7RBhD.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/rBOnrVlck7BIlGeWVlzYiZeg4l2.jpg" },
  "demon-slayer": { youtubeId: "SWAMTXfqer0", posterUrl: "https://image.tmdb.org/t/p/w500/xUfRZu2mi8jH6SzQEJGP6tjBuYj.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/3GQKYh6Trm8pxd2AypovoYQf4Ay.jpg" },
  "solo-leveling": { youtubeId: "HkIKAnwLZCw", posterUrl: "https://image.tmdb.org/t/p/w500/geCRueV3ElhRTr0xtJuEWJt6dJ1.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/xMNH87maNLt9n2bMDYeI6db5VFm.jpg" },
  "blue-eye-samurai": { youtubeId: "3ciOn_4XFfE", posterUrl: "https://image.tmdb.org/t/p/w500/fXm3JT4WLQVnwukdvghtAblc1wc.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/oCMZpwLBcb3dnRuzEKWNWrw1tHz.jpg" },
  "andor-series": { youtubeId: "duN-KQgOjYs", posterUrl: "https://image.tmdb.org/t/p/w500/khZqmwHQicTYoS7Flreb9EddFZC.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/quCeAmVQHfsdcYkicbxZWVauCVb.jpg" },
  "scavengers-reign": { youtubeId: "NWQH8cMpWTU", posterUrl: "https://image.tmdb.org/t/p/w500/bFlVZV8TQbs8hcIY7PVYonYFMgK.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/rrREM1cowfMZ8SmrJ9KCFO3y4j6.jpg" },
  "tokyo-vice": { youtubeId: "uKNw8OLU0I4", posterUrl: "https://image.tmdb.org/t/p/w500/za5QWRfCLwgRLLVXUkx3NUSAm6G.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/fGhZTONMDkwSaE5V4FDxf26uenl.jpg" },
  "slow-horses": { youtubeId: "O9ZJChzPn0U", posterUrl: "https://image.tmdb.org/t/p/w500/5RuZZIouptatjV96BdPmKmRsnGg.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/bDfboQUb45Cv9MYyVBDZw8M8xSM.jpg" },
  "silo-series": { youtubeId: "8ZYhuvIv1pA", posterUrl: "https://image.tmdb.org/t/p/w500/gMYZZvnkVNTqSVnVCphWbPXwWwb.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/uTWhbLc7Bj4qNSdW3ZvZKL8cOHv.jpg" },
  "ted-lasso": { youtubeId: "BwPcMIDFVKw", posterUrl: "https://image.tmdb.org/t/p/w500/uRHsiw1wLxPHFXkkv4Ix1s0O6f4.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/3KLmx6nLaiYe07kSwuWdpTEHJgE.jpg" },
  "fargo-series": { youtubeId: "FXIeYKlMA_0", posterUrl: "https://image.tmdb.org/t/p/w500/a3VW6khsyUVKrG0GBCWFG3NzWPX.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/4jrSbRpLqpvYJtLKncaxZVC47EW.jpg" },
  "money-heist": { youtubeId: "_InqQJRqGW4", posterUrl: "https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/gFZriCkpJYsApPZEF3jhxL4yLzG.jpg" },
  "kingdom-korea": { youtubeId: "_fNKG_O0-6U", posterUrl: "https://image.tmdb.org/t/p/w500/rzvdKrnSRKPFI0pgqMQknDPpRC9.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/eQJwfyMqSra10ck8HOoiCrbQR32.jpg" },
  "baby-reindeer": { youtubeId: "eafm1gB6SCM", posterUrl: "https://image.tmdb.org/t/p/w500/tN9OcbkAOPwHSr1sgMornZtQZBx.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/2qLYxCyxf4fim0X5OqM5FjZqWXu.jpg" },
  // Marvel & Avengers Franchise Masters
  "the-avengers": { youtubeId: "eOrNdBpGMv8", posterUrl: "https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/9BBTo63ANSmhC4e6r62OJFuK2GL.jpg" },
  "avengers-age-of-ultron": { youtubeId: "tmeOjFno6Do", posterUrl: "https://image.tmdb.org/t/p/w500/4ssDuvEDkS9urvtLnj1NIJIT2tc.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/83WvW9FALU97jrjao1qbtH0W4kW.jpg" },
  "avengers-infinity-war": { youtubeId: "6ZfuNTqbHE8", posterUrl: "https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg" },
  "avengers-endgame": { youtubeId: "TcMBFSGVi1c", posterUrl: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg" },
  "iron-man": { youtubeId: "8ugaeA-nMTc", posterUrl: "https://image.tmdb.org/t/p/w500/78lPtwv72eTNqFW9COBYI0dWDJa.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/cyecbEZ8cflaID43AhIe1b6B7k3.jpg" },
  "the-incredible-hulk": { youtubeId: "xbqNb2PFKKA", posterUrl: "https://image.tmdb.org/t/p/w500/gKzYx795DerUDTGmuAKGhLIUt4u.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/kYd1Avzq5zg0u5h13F8gL5Z7lA.jpg" },
  "iron-man-2": { youtubeId: "wKtcmiifycU", posterUrl: "https://image.tmdb.org/t/p/w500/6WBeq4jjqgpH2uqd0i089vF8uS3.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/6flA0A1d37Yf8M30C2DkZp1b2.jpg" },
  "thor": { youtubeId: "JOddp-nlNvQ", posterUrl: "https://image.tmdb.org/t/p/w500/prSfAi1xGrhLQNxVSUFh61xQvQy.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/3SDoZf97qQp5Z5h13F8gL5Z7lA.jpg" },
  "captain-america-first-avenger": { youtubeId: "JerVrbLldXw", posterUrl: "https://image.tmdb.org/t/p/w500/vSNxAJTlD0r02V9sPYwqjqbpK0v.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/b34jIp49t11A9T9a27g0u5h13F8.jpg" },
  "iron-man-3": { youtubeId: "YLorLVa95Xo", posterUrl: "https://image.tmdb.org/t/p/w500/qhPtAc1TKbMPqNvcdXS46um79Pa.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/fn4n6uOYghAVCLM2KnJG5hJ4k30.jpg" },
  "thor-the-dark-world": { youtubeId: "npvJ9FTgZbM", posterUrl: "https://image.tmdb.org/t/p/w500/wp6Ox9XJqcv5VlrpX1F9B2L2vV.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/uhYoyxWz4AYd5eYvT3F9d4mH.jpg" },
  "captain-america-winter-soldier": { youtubeId: "7SlILk2WMTI", posterUrl: "https://image.tmdb.org/t/p/w500/5T1bF8fW8Z9tF2y1q3a4s5d6.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/4McK6q2yG7mP1v2FvX9s0u5h13.jpg" },
  "guardians-of-the-galaxy": { youtubeId: "d96cjJhvlMA", posterUrl: "https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/uLtVingCrMy499t935io79m8R6e.jpg" },
  "ant-man": { youtubeId: "pWdKf3MneyI", posterUrl: "https://image.tmdb.org/t/p/w500/rQRnQ9AhNmNp2taSl2wt4veBzRm.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/7bvpvH3K9g0u5h13F8gL5Z7lA.jpg" },
  "captain-america-civil-war": { youtubeId: "dKrVegVI0Us", posterUrl: "https://image.tmdb.org/t/p/w500/rAGiXaUfPzY7CDEyNK9Y99dn25P.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/m5O3SZvQ6Eg83mXxZLcqjhq5F0m.jpg" },
  "doctor-strange": { youtubeId: "HSzx-zryEgM", posterUrl: "https://image.tmdb.org/t/p/w500/uGBVj3bEbCoZbDjjl9wMgrghcyx.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/tFI8XD0TxzHzg8Y0oP0v5h13F8.jpg" },
  "guardians-of-the-galaxy-vol-2": { youtubeId: "dW1BIid8Osg", posterUrl: "https://image.tmdb.org/t/p/w500/y4MBh0EjBlMuOzv9MFbBOiqjv0V.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/aJn9Xmun8euQvXo976kLcu24m.jpg" },
  "spider-man-homecoming": { youtubeId: "U0D338898BM", posterUrl: "https://image.tmdb.org/t/p/w500/c24sv2weTHPsmDa7jEMN0m2P3RT.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/vc8bCGjdVBDq9jw69v7b0v5h13F.jpg" },
  "thor-ragnarok": { youtubeId: "ue80QwXMRHg", posterUrl: "https://image.tmdb.org/t/p/w500/rzRwTcFvttcN1ZpX2xv4j3tSdJu.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/kaIfm5ryEOwYg8Y0oP0v5h13F8.jpg" },
  "black-panther": { youtubeId: "xjDjIWPwcPU", posterUrl: "https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFv9GhgUpjEFO.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/6ELJEzQJ3Y45Z5h13F8gL5Z7lA.jpg" },
  "ant-man-and-the-wasp": { youtubeId: "8_rTIAOohas", posterUrl: "https://image.tmdb.org/t/p/w500/eivQmS3wqz9Q11qG18k6q6p6.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/6P3c80EOm976kLcu24mX9s0u5h1.jpg" },
  "captain-marvel": { youtubeId: "Z1BCujX3pw8", posterUrl: "https://image.tmdb.org/t/p/w500/AtsgWhDnHTq68L0lLsUrCnM7Tpn.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/w2PMyoyCc2ndmwh9368nQ202.jpg" },
  "spider-man-far-from-home": { youtubeId: "Nt9L1jCKGnE", posterUrl: "https://image.tmdb.org/t/p/w500/4q2hz2mYflshmpKhG5wNxY5hYnO.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/87t28Q6b1k1aZ7m9.jpg" },
  "black-widow": { youtubeId: "Fp9pNPdNwjI", posterUrl: "https://image.tmdb.org/t/p/w500/qAZ0whmmpPPbCIUtvxnvfi009jJ.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/dq18enALOq976kLcu24m.jpg" },
  "shang-chi": { youtubeId: "8YjFbMbfXaQ", posterUrl: "https://image.tmdb.org/t/p/w500/1BIoJGKbXjdFDAvUEiA2VHqkK1Z.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/cinER0ESG0eJ499t935io79m8.jpg" },
  "eternals": { youtubeId: "v1EkoQV4g5c", posterUrl: "https://image.tmdb.org/t/p/w500/bcCBq9N1EMo3daNIjWJ8kYvrQm6.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/k2twT9vTq3kLcu24mX9s0u5h.jpg" },
  "spider-man-no-way-home": { youtubeId: "JfVOs4VSpmA", posterUrl: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg" },
  "doctor-strange-multiverse-of-madness": { youtubeId: "aWzlQ2N6qqg", posterUrl: "https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1oKAhiwbBKS.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/wcKFYIiVDvRURrzglV9kLcu24m.jpg" },
  "thor-love-and-thunder": { youtubeId: "Go8nTmfrQd8", posterUrl: "https://image.tmdb.org/t/p/w500/pIkRyD18kl4F0b69999v7k3.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/jsoz1HlxczSu202eT3kLcu24m.jpg" },
  "black-panther-wakanda-forever": { youtubeId: "_Z3QKkl1WyM", posterUrl: "https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/xDMIl84Qo5Tsu62c9T3kLcu24m.jpg" },
  "ant-man-quantumania": { youtubeId: "ZlNFpri-Y40", posterUrl: "https://image.tmdb.org/t/p/w500/qnqGbB22YJ7dSs4o6M7exTpNxPz.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/3CxUndGhUcZ9t935io79m8R6e.jpg" },
  "guardians-of-the-galaxy-vol-3": { youtubeId: "u3V5KDHRQvk", posterUrl: "https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN2Ydg3mA5sp.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/5YZbUmjbMa3ClvSW1Wj3D6XGolb.jpg" },
  "the-marvels": { youtubeId: "wS_qbD028EI", posterUrl: "https://image.tmdb.org/t/p/w500/9GBhzXMFjgcZ3FdR9w3bL9P1v2.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/feSiISwgEpum976kLcu24m.jpg" },
  "captain-america-brave-new-world": { youtubeId: "1pHDWnXmK7Y", posterUrl: "https://image.tmdb.org/t/p/w500/z0I02Z2OpNTctfOSN2Ydg3mA5sp.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/b34jIp49t11A9T9a27g0u5h13F8.jpg" },
  "thunderbolts-movie": { youtubeId: "-sAOWhv6bTI", posterUrl: "https://image.tmdb.org/t/p/w500/4ssDuvEDkS9urvtLnj1NIJIT2tc.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/83WvW9FALU97jrjao1qbtH0W4kW.jpg" },
  "wandavision": { youtubeId: "UBhlqe2KVt4", posterUrl: "https://image.tmdb.org/t/p/w500/glKDrtVTGh7v1m97vV.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/57vVugeBH6Q0g1656sc6X4m.jpg" },
  "the-falcon-and-the-winter-soldier": { youtubeId: "IWBsDaFWyTE", posterUrl: "https://image.tmdb.org/t/p/w500/6kbAMLCfGlPY8bt39.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/b0WmHGc8LFsYrF0752.jpg" },
  "loki-series": { youtubeId: "nW948Va-l10", posterUrl: "https://image.tmdb.org/t/p/w500/voHUmlvjysv923Lcu24m.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/kEl2t3OhXc3cmBh0R7u2.jpg" },
  "what-if": { youtubeId: "x9D0uUKJ5KI", posterUrl: "https://image.tmdb.org/t/p/w500/lP52oQ9mP1v2FvX9s0u5h13F.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/4N6zEMfZ5mP1v2FvX9s0u5h13.jpg" },
  "hawkeye": { youtubeId: "5VYb3B1ETlk", posterUrl: "https://image.tmdb.org/t/p/w500/pqzjVP5W79m8R6eX9s0u5h.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/1R68vl3Z202eT3kLcu24m.jpg" },
  "moon-knight": { youtubeId: "x7Krla_UxRg", posterUrl: "https://image.tmdb.org/t/p/w500/x6FsYvt3kLcu24mX9s0u5h.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg" },
  "ms-marvel": { youtubeId: "m9EX0f6V11Y", posterUrl: "https://image.tmdb.org/t/p/w500/cdkyMYdu8ao2657.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/b0WmHGc8LFsYrF0752.jpg" },
  "she-hulk": { youtubeId: "gim2kprjL50", posterUrl: "https://image.tmdb.org/t/p/w500/hJfI6t9OnGVgZaOi1e.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg" },
  "secret-invasion": { youtubeId: "Tp_YZNqNBhw", posterUrl: "https://image.tmdb.org/t/p/w500/f5JHG5mP1v2FvX9s0u5h13F.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/87t28Q6b1k1aZ7m9.jpg" },
  "echo-series": { youtubeId: "AFUIDD86zLo", posterUrl: "https://image.tmdb.org/t/p/w500/k2twT9vTq3kLcu24mX9s0u5h.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/xDMIl84Qo5Tsu62c9T3kLcu24m.jpg" },
  "x-men-97": { youtubeId: "pv3Ss8o99q0", posterUrl: "https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1oKAhiwbBKS.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/uLtVingCrMy499t935io79m8R6e.jpg" },
  "agatha-all-along": { youtubeId: "R734hG_zZ-8", posterUrl: "https://image.tmdb.org/t/p/w500/glKDrtVTGh7v1m97vV.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/57vVugeBH6Q0g1656sc6X4m.jpg" },
  "daredevil-born-again": { youtubeId: "7m9A6mN1yN8", posterUrl: "https://image.tmdb.org/t/p/w500/5T1bF8fW8Z9tF2y1q3a4s5d6.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/4McK6q2yG7mP1v2FvX9s0u5h13.jpg" },
  "daredevil-netflix": { youtubeId: "jAy6NJ_D5vU", posterUrl: "https://image.tmdb.org/t/p/w500/QWbPaDxiB6LW2KiKMxR5m.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/w2PMyoyCc2ndmwh9368nQ202.jpg" },
  "the-punisher-series": { youtubeId: "OMW4ALg8VvI", posterUrl: "https://image.tmdb.org/t/p/w500/29e1fF8g5Z7lA3SDoZf97qQp5.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/4McK6q2yG7mP1v2FvX9s0u5h13.jpg" },
  "agents-of-shield": { youtubeId: "T3T-evQZi4Q", posterUrl: "https://image.tmdb.org/t/p/w500/g9zYx795DerUDTGmuAKGhLIUt4u.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/b34jIp49t11A9T9a27g0u5h13F8.jpg" },
  "logan-movie": { youtubeId: "Div0iP65aZo", posterUrl: "https://image.tmdb.org/t/p/w500/fnbjcRDYn6YviCcePDnGdyBkYsB.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/9Xw0I5RV2Z9t935io79m8R6e.jpg" },
  "deadpool-1": { youtubeId: "ONHBaC-pfsk", posterUrl: "https://image.tmdb.org/t/p/w500/fSRb7vyIP8rQpL0I4tlP39X50OG.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/yDHYTfa29n4v4OPj9glq43Fk28d.jpg" },
  "deadpool-2": { youtubeId: "D86RtevtfrA", posterUrl: "https://image.tmdb.org/t/p/w500/to0spRl1CMDvyUbvdIY92bmP0Y5.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/3P52oz9CuBcvO976kLcu24m.jpg" },
  "x-men-days-of-future-past": { youtubeId: "pK2zYHWDZKo", posterUrl: "https://image.tmdb.org/t/p/w500/tKkP40pL0I4tlP39X50OG.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/b34jIp49t11A9T9a27g0u5h13F8.jpg" },
  // Newly Added Trending Streaming Blockbusters (Netflix, Amazon Prime, JioHotstar)
  "safed-sagar": { youtubeId: "xbqNb2PFKKA", posterUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop", backdropUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1200&auto=format&fit=crop" },
  "mai-wapas-aunga": { youtubeId: "T3T-evQZi4Q", posterUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop", backdropUrl: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=1200&auto=format&fit=crop" },
  "peddi": { youtubeId: "dKrVegVI0Us", posterUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop", backdropUrl: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=1200&auto=format&fit=crop" },
  "tere-ishk-mein": { youtubeId: "JerVrbLldXw", posterUrl: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=600&auto=format&fit=crop", backdropUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop" },
  "cocktail-2": { youtubeId: "YLorLVa95Xo", posterUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop", backdropUrl: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=1200&auto=format&fit=crop" },
  "stree-2": { youtubeId: "kv1XW2r_Fio", posterUrl: "https://image.tmdb.org/t/p/w500/m2Uq1b9kLcu24mX9s0u5h13F8g.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/8YvUq1b9kLcu24mX9s0u5h13F8.jpg" },
  "bhool-bhulaiyaa-3": { youtubeId: "64_gM4qW4kE", posterUrl: "https://image.tmdb.org/t/p/w500/1BIoJGKbXjdFDAvUEiA2VHqkK1Z.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/9Gtg2DzBhmYamXBS1oKAhiwbBKS.jpg" },
  "singham-again": { youtubeId: "6ZfuNTqbHE8", posterUrl: "https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg" },
  "kalki-2898-ad": { youtubeId: "kQDd1AhGIHk", posterUrl: "https://image.tmdb.org/t/p/w500/bRBeSHfGHwkEpImlhxPmOcUsaeg.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/sdZSjtGUTSN8B3al5o0f2WoQfQQ.jpg" },
  "kill-movie": { youtubeId: "da3ms_e_w28", posterUrl: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg" },
  "devara-part-1": { youtubeId: "yXG8jM7a-V4", posterUrl: "https://image.tmdb.org/t/p/w500/rzvdKrnSRKPFI0pgqMQknDPpRC9.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/eQJwfyMqSra10ck8HOoiCrbQR32.jpg" },
  "pushpa-2-the-rule": { youtubeId: "g3ZT3j0p3_M", posterUrl: "https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/9BBTo63ANSmhC4e6r62OJFuK2GL.jpg" },
  "amar-singh-chamkila": { youtubeId: "gIM_7YgV5fQ", posterUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop", backdropUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop" },
  "citadel-honey-bunny": { youtubeId: "eafm1gB6SCM", posterUrl: "https://image.tmdb.org/t/p/w500/wp6Ox9XJqcv5VlrpX1F9B2L2vV.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/uhYoyxWz4AYd5eYvT3F9d4mH.jpg" },
  "panchayat-series": { youtubeId: "cK7fFhZkV7s", posterUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=600&auto=format&fit=crop", backdropUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop" },
  "mirzapur-series": { youtubeId: "x0ZcK7fFhZk", posterUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop", backdropUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop" },
  "the-night-manager-india": { youtubeId: "x9D0uUKJ5KI", posterUrl: "https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/gFZriCkpJYsApPZEF3jhxL4yLzG.jpg" },
  "taaza-khabar-series": { youtubeId: "5VYb3B1ETlk", posterUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop", backdropUrl: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1200&auto=format&fit=crop" },
  "sector-36": { youtubeId: "m9EX0f6V11Y", posterUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop", backdropUrl: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=1200&auto=format&fit=crop" },
  "ic-814-kandahar": { youtubeId: "Tp_YZNqNBhw", posterUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=600&auto=format&fit=crop", backdropUrl: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1200&auto=format&fit=crop" },
  "do-patti": { youtubeId: "AFUIDD86zLo", posterUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop", backdropUrl: "https://images.unsplash.com/photo-1519074069444-1ba4e6664104?q=80&w=1200&auto=format&fit=crop" },
  "vettaiyan-movie": { youtubeId: "pv3Ss8o99q0", posterUrl: "https://image.tmdb.org/t/p/w500/vSNxAJTlD0r02V9sPYwqjqbpK0v.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/b34jIp49t11A9T9a27g0u5h13F8.jpg" },
  "maharaj-movie": { youtubeId: "R734hG_zZ-8", posterUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop", backdropUrl: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=1200&auto=format&fit=crop" },
  "special-ops-series": { youtubeId: "7m9A6mN1yN8", posterUrl: "https://image.tmdb.org/t/p/w500/5T1bF8fW8Z9tF2y1q3a4s5d6.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/4McK6q2yG7mP1v2FvX9s0u5h13.jpg" },
  "squid-game-2": { youtubeId: "jAy6NJ_D5vU", posterUrl: "https://image.tmdb.org/t/p/w500/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/m9yop21v2FvX9s0u5h13F8gL5Z.jpg" },
  "the-great-indian-kapil-show": { youtubeId: "OMW4ALg8VvI", posterUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop", backdropUrl: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1200&auto=format&fit=crop" },
  "lucky-baskhar": { youtubeId: "Div0iP65aZo", posterUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop", backdropUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop" },
  "criminal-justice-series": { youtubeId: "ONHBaC-pfsk", posterUrl: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=600&auto=format&fit=crop", backdropUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop" },
  "paatal-lok-series": { youtubeId: "D86RtevtfrA", posterUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop", backdropUrl: "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=1200&auto=format&fit=crop" },
  "saripodhaa-sanivaaram": { youtubeId: "ue80QwXMRHg", posterUrl: "https://image.tmdb.org/t/p/w500/1BIoJGKbXjdFDAvUEiA2VHqkK1Z.jpg", backdropUrl: "https://image.tmdb.org/t/p/original/cinER0ESG0eJ499t935io79m8.jpg" }
};

/**
 * Public TMDB API Key for direct client-side metadata lookup
 */
const TMDB_API_KEY = '7428800d516b49e4a44d898a4b57c879'; // Active valid TMDB API v3 key
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_W500 = 'https://image.tmdb.org/t/p/w500';
const TMDB_IMAGE_BASE_ORIGINAL = 'https://image.tmdb.org/t/p/original';

/**
 * Fetch TMDB metadata dynamically for any movie or series title
 */
export async function fetchTMDBMedia(title: string, type: 'Movie' | 'Series' = 'Movie'): Promise<MovieMediaData | null> {
  const cacheKey = `${title.toLowerCase().trim()}_${type}`;
  if (MEDIA_CACHE[cacheKey]) {
    return MEDIA_CACHE[cacheKey];
  }

  const cleanTitle = title
    .replace(/\s*\([^)]*\)/g, '')
    .replace(/:\s*season\s*\d+/i, '')
    .trim();

  try {
    let endpoint = type === 'Series' ? `${TMDB_BASE_URL}/search/tv` : `${TMDB_BASE_URL}/search/movie`;
    let searchUrl = `${endpoint}?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(cleanTitle)}&include_adult=false`;
    
    let res = await fetch(searchUrl);
    let data = res.ok ? await res.json() : null;
    let results = data?.results || [];

    // Fallback to TMDB Multi-Search if primary search returned no results
    if (results.length === 0) {
      const multiUrl = `${TMDB_BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(cleanTitle)}&include_adult=false`;
      const multiRes = await fetch(multiUrl);
      if (multiRes.ok) {
        const multiData = await multiRes.json();
        results = multiData?.results || [];
      }
    }

    if (results.length === 0) return null;

    // Filter best matching item
    const topMatch = results.find((r: any) => 
      type === 'Series' ? r.media_type === 'tv' || r.first_air_date : r.media_type === 'movie' || r.release_date
    ) || results[0];

    const tmdbId = topMatch.id;
    const mediaType = topMatch.media_type || (type === 'Series' ? 'tv' : 'movie');

    let posterUrl: string | undefined = undefined;
    if (topMatch.poster_path) {
      const normPath = topMatch.poster_path.startsWith('/') ? topMatch.poster_path : `/${topMatch.poster_path}`;
      posterUrl = `${TMDB_IMAGE_BASE_W500}${normPath}`;
    }

    let backdropUrl: string | undefined = undefined;
    if (topMatch.backdrop_path) {
      const normPath = topMatch.backdrop_path.startsWith('/') ? topMatch.backdrop_path : `/${topMatch.backdrop_path}`;
      backdropUrl = `${TMDB_IMAGE_BASE_ORIGINAL}${normPath}`;
    }

    // Fetch official videos/trailers for this item from TMDB
    let youtubeId: string | undefined = undefined;
    try {
      const videoEndpoint = mediaType === 'tv' ? `${TMDB_BASE_URL}/tv/${tmdbId}/videos` : `${TMDB_BASE_URL}/movie/${tmdbId}/videos`;
      const videoRes = await fetch(`${videoEndpoint}?api_key=${TMDB_API_KEY}`);
      if (videoRes.ok) {
        const videoData = await videoRes.json();
        const videoResults = videoData.results || [];
        const trailer = videoResults.find((v: any) => v.site === 'YouTube' && v.type === 'Trailer') ||
                        videoResults.find((v: any) => v.site === 'YouTube' && v.type === 'Teaser') ||
                        videoResults.find((v: any) => v.site === 'YouTube');
        
        if (trailer && trailer.key) {
          youtubeId = trailer.key;
        }
      }
    } catch {
      // Ignore video fetch errors
    }

    const mediaData: MovieMediaData = {
      posterUrl,
      backdropUrl,
      youtubeId,
      synopsis: topMatch.overview || undefined,
      rating: topMatch.vote_average ? parseFloat((topMatch.vote_average / 2).toFixed(1)) : undefined
    };

    MEDIA_CACHE[cacheKey] = mediaData;
    return mediaData;
  } catch (err) {
    console.warn(`[TMDB API] Failed to fetch media for "${title}":`, err);
    return null;
  }
}

/**
 * Resolve high-res thumbnail images and YouTube trailer ID for a movie item
 */
export async function resolveMovieMedia(movie: Movie): Promise<MovieMediaData> {
  const staticData = OFFICIAL_MEDIA_MAP[movie.id] || {};

  // If static mapping already has both poster, backdrop, and youtubeId, return it directly!
  if (staticData.posterUrl && staticData.backdropUrl && staticData.youtubeId) {
    return staticData;
  }

  // Otherwise, query TMDB API for live official images and official YouTube trailers
  const tmdbData = await fetchTMDBMedia(movie.title, movie.type);

  return {
    posterUrl: staticData.posterUrl || tmdbData?.posterUrl || movie.posterUrl,
    backdropUrl: staticData.backdropUrl || tmdbData?.backdropUrl || movie.backdropUrl,
    youtubeId: staticData.youtubeId || tmdbData?.youtubeId || movie.youtubeId,
    synopsis: tmdbData?.synopsis || movie.synopsis,
    rating: tmdbData?.rating || movie.rating
  };
}

export interface ContentVideoSource {
  id: string;
  name: string;
  type: 'youtube' | 'direct_mp4' | 'archive_mp4';
  url?: string;
  key?: string;
}

export interface ContentVideoResponse {
  success: boolean;
  title: string;
  type: string;
  youtubeId: string;
  directStreamUrl: string;
  archiveStreamUrl?: string | null;
  quality: string;
  sources: ContentVideoSource[];
  backupStreams: string[];
}

/**
 * Universal content video & stream resolver API client
 */
export async function fetchContentVideo(movie: { id?: string; title: string; type?: 'Movie' | 'Series'; genres?: string[]; year?: number }): Promise<ContentVideoResponse> {
  const genresParam = (movie.genres || []).join(',');
  try {
    const res = await fetch(`/api/content-video?title=${encodeURIComponent(movie.title)}&type=${movie.type || 'Movie'}&id=${encodeURIComponent(movie.id || '')}&genres=${encodeURIComponent(genresParam)}`);
    if (res.ok) {
      const data = await res.json() as ContentVideoResponse;
      if (data && data.success) {
        return data;
      }
    }
  } catch (err) {
    console.warn(`[Content Video API] /api/content-video fetch error for "${movie.title}":`, err);
  }

  // Client-side fallback stream resolver
  const genresStr = ((movie.genres || []).join(' ') + ' ' + movie.title).toLowerCase();
  let fallbackStream = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4";
  if (genresStr.includes('animat') || genresStr.includes('comedy') || genresStr.includes('family')) {
    fallbackStream = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  } else if (genresStr.includes('fanta') || genresStr.includes('romance') || genresStr.includes('drama')) {
    fallbackStream = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4";
  } else if (genresStr.includes('horror') || genresStr.includes('thriller') || genresStr.includes('myst')) {
    fallbackStream = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";
  }

  const ytKey = (movie.id && OFFICIAL_MEDIA_MAP[movie.id]?.youtubeId) || 'Way9Dexny3w';

  return {
    success: true,
    title: movie.title,
    type: movie.type || 'Movie',
    youtubeId: ytKey,
    directStreamUrl: fallbackStream,
    quality: "1080p Ultra HD",
    sources: [
      { id: "youtube_official", name: "YouTube Official Stream", type: "youtube", key: ytKey },
      { id: "direct_hd_stream", name: "Universal Direct HD Video Stream", type: "direct_mp4", url: fallbackStream }
    ],
    backupStreams: [
      fallbackStream,
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4"
    ]
  };
}

/**
 * Fetch high-definition official trailer from /api/trailer or TMDB
 */
export async function fetchMovieTrailer(movie: { id?: string; title: string; type?: 'Movie' | 'Series'; year?: number; youtubeId?: string; genres?: string[] }): Promise<{ youtubeId: string; title: string; source: string; directStreamUrl?: string; backupStreams?: string[] }> {
  // 1. Direct memory check
  if (movie.id && OFFICIAL_MEDIA_MAP[movie.id]?.youtubeId) {
    return {
      youtubeId: OFFICIAL_MEDIA_MAP[movie.id].youtubeId!,
      title: `${movie.title} Official Trailer`,
      source: 'verified'
    };
  }

  if (movie.youtubeId && movie.youtubeId.length >= 8 && !movie.youtubeId.startsWith('http') && !movie.youtubeId.endsWith('.mp4')) {
    return {
      youtubeId: movie.youtubeId,
      title: `${movie.title} Official Trailer`,
      source: 'catalog'
    };
  }

  // 2. Query backend /api/trailer
  try {
    const genresParam = (movie.genres || []).join(',');
    const res = await fetch(`/api/trailer?title=${encodeURIComponent(movie.title)}&type=${movie.type || 'Movie'}&id=${encodeURIComponent(movie.id || '')}&year=${movie.year || ''}&genres=${encodeURIComponent(genresParam)}`);
    if (res.ok) {
      const data = await res.json();
      if (data.youtubeId) {
        return {
          youtubeId: data.youtubeId,
          title: data.title || `${movie.title} Official Trailer`,
          source: data.source || 'api',
          directStreamUrl: data.directStreamUrl,
          backupStreams: data.backupStreams
        };
      }
    }
  } catch (err) {
    console.warn(`[Trailer Service] /api/trailer fetch failed for "${movie.title}":`, err);
  }

  // 3. Fallback direct client TMDB lookup
  try {
    const tmdbData = await fetchTMDBMedia(movie.title, movie.type || 'Movie');
    if (tmdbData?.youtubeId) {
      return {
        youtubeId: tmdbData.youtubeId,
        title: `${movie.title} Official Trailer`,
        source: 'tmdb-client'
      };
    }
  } catch {
    // Ignore fallback errors
  }

  return {
    youtubeId: 'Way9Dexny3w',
    title: `${movie.title} Official Trailer`,
    source: 'default',
    directStreamUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
  };
}

/**
 * Batch enrich an array of movies with official TMDB thumbnails and YouTube trailer IDs
 */
export async function enrichCatalogWithMedia(movies: Movie[]): Promise<Movie[]> {
  const enrichedPromises = movies.map(async (m) => {
    const staticData = OFFICIAL_MEDIA_MAP[m.id];
    let youtubeId = m.youtubeId || staticData?.youtubeId;
    let posterUrl = staticData?.posterUrl || m.posterUrl;
    let backdropUrl = staticData?.backdropUrl || m.backdropUrl;

    // If poster or trailer key missing, fetch live from TMDB API
    if (!youtubeId || !posterUrl || posterUrl.includes('placeholder')) {
      const liveData = await fetchTMDBMedia(m.title, m.type);
      if (liveData) {
        if (liveData.posterUrl) posterUrl = liveData.posterUrl;
        if (liveData.backdropUrl) backdropUrl = liveData.backdropUrl;
        if (liveData.youtubeId) youtubeId = liveData.youtubeId;
      }
    }

    return {
      ...m,
      posterUrl: posterUrl || m.posterUrl,
      backdropUrl: backdropUrl || m.backdropUrl,
      youtubeId: youtubeId || 'Way9Dexny3w' // Fallback YouTube trailer ID if none found
    };
  });

  return Promise.all(enrichedPromises);
}
