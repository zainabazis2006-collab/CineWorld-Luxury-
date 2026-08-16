import { Movie } from './types';

export const RECENT_STREAMING_CATALOG: Movie[] = [
  // 1. User Specific: Safed Sagar
  {
    id: 'safed-sagar',
    title: 'Safed Sagar',
    type: 'Movie',
    year: 2025,
    runtimeOrSeasons: '148 min',
    rating: 4.8,
    genres: ['Action', 'Thriller', 'Drama'],
    directorOrCreator: 'Abhishek Chaubey',
    cast: ['Jaideep Ahlawat', 'Vijay Varma', 'Radhika Apte', 'Manoj Pahwa'],
    synopsis: 'Amidst the blinding white expanse of the Rann of Kutch salt desert, a high-stakes cross-border smuggling network unravels when an undercover operative turns rogue to expose a ruthless political cartel.',
    criticalAnalysis: 'A visually breathtaking desert thriller that contrasts the hypnotic, pristine beauty of the Great Rann with raw, visceral tension and career-best performances by Jaideep Ahlawat and Vijay Varma.',
    trivia: [
      'Filmed on location in sub-zero winter temperatures across the salt flats of Kutch, requiring specialized camera lenses to handle extreme salt glare.',
      'The stunt choreography utilizes real desert combat techniques developed with specialized desert border commandos.',
      'Sound design features authentic Gujarati folk instruments blended into an ominous electronic drone score.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1200&auto=format&fit=crop',
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com/title/safedsagar',
        availableRegions: ['IN', 'US', 'UK', 'AE'],
        priceTier: 'Included'
      },
      {
        platform: 'Amazon Prime',
        url: 'https://www.amazon.com/dp/safedsagar',
        availableRegions: ['IN', 'US'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'The production team had to construct eco-friendly mobile tracks across the protected salt desert to ensure zero ecological footprint.'
  },

  // 2. User Specific: Main Wapas Aaunga
  {
    id: 'mai-wapas-aunga',
    title: 'Main Wapas Aaunga',
    type: 'Series',
    year: 2025,
    runtimeOrSeasons: '1 Season (8 Eps)',
    rating: 4.7,
    genres: ['Action', 'Thriller', 'Crime'],
    directorOrCreator: 'Neeraj Pandey',
    cast: ['Kay Kay Menon', 'Avinash Tiwary', 'Karan Tacker', 'Saiyami Kher'],
    synopsis: 'Wrongfully convicted and buried in a high-security black site prison, an elite counter-terrorism specialist orchestrates an audacious escape to dismantle the shadow syndicate that framed him.',
    criticalAnalysis: 'A relentless edge-of-the-seat revenge thriller featuring Neeraj Pandey’s trademark airtight procedural pacing, complex espionage tradecraft, and explosive hand-to-hand combat.',
    trivia: [
      'Kay Kay Menon performed several complex underwater escape sequences without a stunt double.',
      'Shot across 6 international locations including Istanbul, Budapest, Mumbai, and the high-altitude mountains of Ladakh.',
      'Features a continuous 14-minute one-take tactical siege sequence in Episode 4.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=1200&auto=format&fit=crop',
    posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop',
    streamingLinks: [
      {
        platform: 'Disney+ Hotstar',
        url: 'https://www.hotstar.com/main-wapas-aaunga',
        availableRegions: ['IN', 'US', 'UK', 'CA'],
        priceTier: 'Included'
      },
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com/title/main-wapas-aaunga',
        availableRegions: ['US', 'UK', 'IN'],
        priceTier: 'Included'
      }
    ],
    seasonsCount: 1,
    productionTrivia: 'The prison set was constructed inside an abandoned textile mill in Mumbai, taking over 3 months to erect with working hydraulic cell doors.'
  },

  // 3. User Specific: Peddi
  {
    id: 'peddi',
    title: 'Peddi',
    type: 'Movie',
    year: 2025,
    runtimeOrSeasons: '164 min',
    rating: 4.9,
    genres: ['Action', 'Drama'],
    directorOrCreator: 'Buchi Babu Sana',
    cast: ['Ram Charan', 'Janhvi Kapoor', 'Shiva Rajkumar', 'Jagapathi Babu'],
    synopsis: 'Set against the rustic coastal backdrop of Andhra Pradesh, a rebellious rural athlete rises through generational feudal oppression to challenge corrupt regional cartels on the grand sports battleground.',
    criticalAnalysis: 'A massive rural sports powerhouse fueled by Ram Charan’s ferocious physical metamorphosis, A.R. Rahman’s electrifying folk-symphonic soundtrack, and Buchi Babu Sana’s evocative grassroots storytelling.',
    trivia: [
      'Ram Charan underwent an intense 6-month traditional wrestling and sprinting regimen to build an authentic rural athlete physique.',
      'Kannada superstar Shiva Rajkumar plays a pivotal mentor figure in his highly anticipated Telugu-language collaboration.',
      'Features over 3,000 local village residents as background artists in the grand championship climax.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=1200&auto=format&fit=crop',
    posterUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com/title/peddi',
        availableRegions: ['IN', 'US', 'UK', 'AU'],
        priceTier: 'Included'
      },
      {
        platform: 'Amazon Prime',
        url: 'https://www.amazon.com/dp/peddi',
        availableRegions: ['IN', 'US'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'Oscar winner A.R. Rahman composed a 7-track traditional folk album recorded live with indigenous rural percussion ensembles.'
  },

  // 4. User Specific: Tere Ishk Mein
  {
    id: 'tere-ishk-mein',
    title: 'Tere Ishk Mein',
    type: 'Movie',
    year: 2025,
    runtimeOrSeasons: '155 min',
    rating: 4.8,
    genres: ['Romantic', 'Drama', 'Action'],
    directorOrCreator: 'Aanand L. Rai',
    cast: ['Dhanush', 'Kriti Sanon', 'Priyanshu Painyuli', 'Pavan Malhotra'],
    synopsis: 'A volatile, fiery saga of unyielding passion and tragic redemption set across the misty ghats of Varanasi and the corridors of Delhi, as Shankar wages an all-consuming battle for love.',
    criticalAnalysis: 'A ferocious, soul-stirring spiritual successor to Raanjhanaa where Aanand L. Rai and Dhanush tap into raw emotional frenzy, elevated by A.R. Rahman’s haunting musical canvas and Irshad Kamil’s poetic verses.',
    trivia: [
      'Reunites director Aanand L. Rai, actor Dhanush, and composer A.R. Rahman after their historic successes on Raanjhanaa and Atrangi Re.',
      'Dhanush performed high-intensity action sequences along the steep stone staircases of Varanasi ghats in a single unbroken take.',
      'Kriti Sanon plays an assertive civil rights lawyer whose ideals clash head-on with Shankar’s chaotic world.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
    posterUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=600&auto=format&fit=crop',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com/title/tere-ishk-mein',
        availableRegions: ['IN', 'US', 'UK', 'AE'],
        priceTier: 'Included'
      },
      {
        platform: 'Amazon Prime',
        url: 'https://www.amazon.com/dp/tere-ishk-mein',
        availableRegions: ['IN', 'US'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'The title song sequence was shot during the vibrant Dev Deepawali festival with over one hundred thousand oil lamps illuminating the river.'
  },

  // 5. User Specific: Cocktail 2
  {
    id: 'cocktail-2',
    title: 'Cocktail 2',
    type: 'Movie',
    year: 2025,
    runtimeOrSeasons: '142 min',
    rating: 4.6,
    genres: ['Romantic', 'Comedy', 'Drama'],
    directorOrCreator: 'Homi Adajania',
    cast: ['Shahid Kapoor', 'Rashmika Mandanna', 'Kriti Sanon', 'Aparshakti Khurana'],
    synopsis: 'A stylish, heartwarming contemporary romantic triangle unfolds across the sun-drenched beaches of Barcelona and the nightlife of London, questioning modern fidelity, friendship, and independence.',
    criticalAnalysis: 'A sparkling, emotionally nuanced relationship drama that captures modern dating dilemmas with sharp comedic wit, lavish European cinematography, and magnetic chemistry among its stellar trio.',
    trivia: [
      'Follows in the footsteps of the 2012 cult classic, updating the narrative for contemporary digital-age relationships.',
      'Features a high-energy dance track sung by Diljit Dosanjh and composed by Pritam.',
      'Shot across iconic European destinations including Ibiza, Barcelona, and Soho London.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=1200&auto=format&fit=crop',
    posterUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com/title/cocktail2',
        availableRegions: ['IN', 'US', 'UK', 'SG'],
        priceTier: 'Included'
      },
      {
        platform: 'Disney+ Hotstar',
        url: 'https://www.hotstar.com/cocktail-2',
        availableRegions: ['IN', 'US'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'Costume designer Anaita Shroff Adajania curated over 120 custom designer outfits reflecting high street London chic and Mediterranean bohemian fashion.'
  },

  // 6. Stree 2: Sarkate Ka Aatank
  {
    id: 'stree-2',
    title: 'Stree 2: Sarkate Ka Aatank',
    type: 'Movie',
    year: 2024,
    runtimeOrSeasons: '147 min',
    rating: 4.9,
    genres: ['Horror', 'Comedy'],
    directorOrCreator: 'Amar Kaushik',
    cast: ['Shraddha Kapoor', 'Rajkummar Rao', 'Pankaj Tripathi', 'Abhishek Banerjee', 'Aparshakti Khurana'],
    synopsis: 'When the headless demon Sarkata terrorizes Chanderi and abducts progressive women, Vicky, Bittu, Janna, and Rudra must join forces with the enigmatic Stree to vanquish the ancient evil.',
    criticalAnalysis: 'A monumental box-office juggernaut that flawlessly balances uproarious indigenous satire with genuinely chilling horror lore, anchored by Rajkummar Rao and Pankaj Tripathi’s flawless comedic timing.',
    trivia: [
      'Became the highest-grossing Hindi film of all time in India, crossing ₹800+ crores worldwide.',
      'Features surprise appearances by Akshay Kumar as Sarkata’s descendant and Varun Dhawan as Bhediya, expanding the Maddock Supernatural Universe.',
      'Pankaj Tripathi improvised several of Rudra Bhaiya’s most viral philosophical dialogues during shooting in Chanderi.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/8YvUq1b9kLcu24mX9s0u5h13F8.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/m2Uq1b9kLcu24mX9s0u5h13F8g.jpg',
    streamingLinks: [
      {
        platform: 'Amazon Prime',
        url: 'https://www.amazon.com/dp/stree-2',
        availableRegions: ['IN', 'US', 'UK', 'CA'],
        priceTier: 'Included'
      },
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com/title/stree2',
        availableRegions: ['IN', 'US'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'The VFX team created the headless Sarkata using full CGI body-tracking with motion capture performed by a 7-foot tall athlete.'
  },

  // 7. Bhool Bhulaiyaa 3
  {
    id: 'bhool-bhulaiyaa-3',
    title: 'Bhool Bhulaiyaa 3',
    type: 'Movie',
    year: 2024,
    runtimeOrSeasons: '158 min',
    rating: 4.7,
    genres: ['Comedy', 'Horror'],
    directorOrCreator: 'Anees Bazmee',
    cast: ['Kartik Aaryan', 'Vidya Balan', 'Madhuri Dixit', 'Triptii Dimri', 'Rajpal Yadav'],
    synopsis: 'Rooh Baba travels to the royal kingdom of Raktaghat in Bengal to perform an exorcism, only to find himself trapped between two rival spirits claiming to be the vengeful Manjulika.',
    criticalAnalysis: 'A grand festive horror-comedy celebration headlined by an iconic dance-off between Vidya Balan and Madhuri Dixit, powered by Kartik Aaryan’s charismatic swagger and Anees Bazmee’s laugh-a-minute misdirections.',
    trivia: [
      'Brings original Manjulika Vidya Balan back to the franchise after 17 years alongside dance legend Madhuri Dixit.',
      'The "Ami Je Tomar 3.0" musical face-off was choreographed by Chinni Prakash and Shiamak Davar, filmed over 10 consecutive nights.',
      'Shot inside authentic ancestral heritage palaces across Kolkata and Orchha.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/9Gtg2DzBhmYamXBS1oKAhiwbBKS.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/1BIoJGKbXjdFDAvUEiA2VHqkK1Z.jpg',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com/title/bhool-bhulaiyaa-3',
        availableRegions: ['IN', 'US', 'UK', 'SG'],
        priceTier: 'Included'
      },
      {
        platform: 'Disney+ Hotstar',
        url: 'https://www.hotstar.com/bhool-bhulaiyaa-3',
        availableRegions: ['IN'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'The climatic courtroom revelation sequence underwent 4 different alternate endings before Anees Bazmee locked the theatrical cut.'
  },

  // 8. Singham Again
  {
    id: 'singham-again',
    title: 'Singham Again',
    type: 'Movie',
    year: 2024,
    runtimeOrSeasons: '169 min',
    rating: 4.8,
    genres: ['Action', 'Thriller', 'Crime'],
    directorOrCreator: 'Rohit Shetty',
    cast: ['Ajay Devgn', 'Kareena Kapoor Khan', 'Deepika Padukone', 'Ranveer Singh', 'Akshay Kumar', 'Tiger Shroff', 'Arjun Kapoor'],
    synopsis: 'When Avni is kidnapped by the international warlord Danger Lanka, DCP Bajirao Singham mobilizes the entire Cop Universe—including Lady Singham, Simmba, Sooryavanshi, and Satya—for a monumental rescue mission.',
    criticalAnalysis: 'A colossal superhero-scale cop epic blending Ramayana mythology with Rohit Shetty’s high-octane vehicular carnage, explosive star power, and relentless crowd-pleasing action spectacle.',
    trivia: [
      'Introduces Deepika Padukone as Shakti Shetty (Lady Singham) and Tiger Shroff as ACP Satya into the Rohit Shetty Cop Universe.',
      'Features a record-breaking cameo by Salman Khan reprising his legendary Inspector Chulbul Pandey.',
      'Shot across 11 diverse locations including Sri Lanka, Kashmir, Hyderabad, and the Arabian Sea.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg',
    streamingLinks: [
      {
        platform: 'Amazon Prime',
        url: 'https://www.amazon.com/dp/singham-again',
        availableRegions: ['IN', 'US', 'UK', 'CA'],
        priceTier: 'Included'
      },
      {
        platform: 'Disney+ Hotstar',
        url: 'https://www.hotstar.com/singham-again',
        availableRegions: ['IN'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'Over 85 custom Mahindra Scorpios and tactical armored assault vehicles were used and destroyed across the explosive action sequences.'
  },

  // 9. Kalki 2898 AD
  {
    id: 'kalki-2898-ad',
    title: 'Kalki 2898 AD',
    type: 'Movie',
    year: 2024,
    runtimeOrSeasons: '181 min',
    rating: 4.9,
    genres: ['Sci-Fi', 'Action', 'Adventure'],
    directorOrCreator: 'Nag Ashwin',
    cast: ['Prabhas', 'Amitabh Bachchan', 'Deepika Padukone', 'Kamal Haasan', 'Disha Patani'],
    synopsis: 'In the dystopian post-apocalyptic year 2898, the immortal warrior Ashwatthama emerges to protect SUM-80, the pregnant mother carrying the tenth avatar of Vishnu, from the god-king Supreme Yaskin.',
    criticalAnalysis: 'A groundbreaking landmark for Indian cinema that seamlessly marries Hindu Mahabharata lore with futuristic Blade Runner-grade sci-fi worldbuilding, powered by Amitabh Bachchan’s titanic performance.',
    trivia: [
      'Amitabh Bachchan performed intense physical hand-to-hand fight sequences at age 81 as the 8-foot tall Ashwatthama.',
      'Kamal Haasan underwent 4 hours of prosthetic aging every day to portray the withered, sinister dictator Supreme Yaskin.',
      'Bhairava’s custom AI supercar "Bujji" was built as a fully drivable 6-ton vehicle engineered by Mahindra and Jayem Automotives.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/sdZSjtGUTSN8B3al5o0f2WoQfQQ.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/bRBeSHfGHwkEpImlhxPmOcUsaeg.jpg',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com/title/kalki2898ad',
        availableRegions: ['IN', 'US', 'UK', 'AU'],
        priceTier: 'Included'
      },
      {
        platform: 'Amazon Prime',
        url: 'https://www.amazon.com/dp/kalki2898ad',
        availableRegions: ['IN', 'US'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'Spent over four years in VFX development involving 20 global visual effects studios and 4,000 CGI shots.'
  },

  // 10. Kill (Disney+ Hotstar / JioHotstar)
  {
    id: 'kill-movie',
    title: 'Kill',
    type: 'Movie',
    year: 2024,
    runtimeOrSeasons: '105 min',
    rating: 4.9,
    genres: ['Action', 'Thriller'],
    directorOrCreator: 'Nikhil Nagesh Bhat',
    cast: ['Lakshya', 'Raghav Juyal', 'Tanya Maniktala', 'Ashish Vidyarthi'],
    synopsis: 'When a gang of 40 armed dacoits hijacks the New Delhi-bound Rajdhani Express, an elite NSG commando turns the speeding train into a relentless, bone-crunching slaughterhouse to protect his true love.',
    criticalAnalysis: 'A game-changing ultra-violent masterpiece hailed by global critics as India’s answer to John Wick and The Raid, featuring breathtaking close-quarters choreography and a breakout villainous turn by Raghav Juyal.',
    trivia: [
      'Premiered at the Toronto International Film Festival’s Midnight Madness, securing Hollywood remake rights from John Wick director Chad Stahelski.',
      'Shot inside a life-size replica of Indian Railways train compartments mounted on pneumatic motion gimbals.',
      'The stunt performers underwent 8 months of Krav Maga and close-quarters blade training.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
    streamingLinks: [
      {
        platform: 'Disney+ Hotstar',
        url: 'https://www.hotstar.com/kill',
        availableRegions: ['IN', 'US', 'UK', 'CA'],
        priceTier: 'Included'
      },
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com/title/kill',
        availableRegions: ['US', 'UK'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'Over 100 liters of synthetic theatrical blood was used across the tight corridor fight sequences.'
  },

  // 11. Devara: Part 1
  {
    id: 'devara-part-1',
    title: 'Devara: Part 1',
    type: 'Movie',
    year: 2024,
    runtimeOrSeasons: '170 min',
    rating: 4.8,
    genres: ['Action', 'Drama', 'Thriller'],
    directorOrCreator: 'Koratala Siva',
    cast: ['N.T. Rama Rao Jr.', 'Janhvi Kapoor', 'Saif Ali Khan', 'Shruti Marathe', 'Prakash Raj'],
    synopsis: 'A fearless chieftain of a coastal smuggling enclave fights to keep his people from walking the path of destruction, triggering a multi-generational blood feud across red seas.',
    criticalAnalysis: 'A high-sea action epic driven by Jr. NTR’s magnetic double role, Anirudh Ravichander’s booming score, and visceral underwater combat sequences.',
    trivia: [
      'Jr. NTR performed extensive underwater sword-fighting scenes without a body double in a custom 30-foot deep water tank in Hyderabad.',
      'Marks the Telugu-language debut of Bollywood stars Janhvi Kapoor and Saif Ali Khan.',
      'Anirudh’s soundtrack tracks "Fear Song" and "Chuttamalle" crossed 500 million views within weeks.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/eQJwfyMqSra10ck8HOoiCrbQR32.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/rzvdKrnSRKPFI0pgqMQknDPpRC9.jpg',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com/title/devara-part-1',
        availableRegions: ['IN', 'US', 'UK', 'JP'],
        priceTier: 'Included'
      },
      {
        platform: 'Amazon Prime',
        url: 'https://www.amazon.com/dp/devara-part-1',
        availableRegions: ['IN', 'US'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'The production team constructed four life-size cargo ships on hydraulic rigs to simulate rough ocean storms.'
  },

  // 12. Pushpa 2: The Rule
  {
    id: 'pushpa-2-the-rule',
    title: 'Pushpa 2: The Rule',
    type: 'Movie',
    year: 2024,
    runtimeOrSeasons: '175 min',
    rating: 4.9,
    genres: ['Action', 'Crime', 'Thriller'],
    directorOrCreator: 'Sukumar',
    cast: ['Allu Arjun', 'Rashmika Mandanna', 'Fahadh Faasil', 'Jagapathi Babu', 'Sunil'],
    synopsis: 'Pushpa Raj expands his red sandalwood smuggling empire globally while facing the relentless wrath of SP Bhanwar Singh Shekhawat in an explosive showdown of ego and power.',
    criticalAnalysis: 'An unprecedented cinematic storm powered by Allu Arjun’s National Award-winning swagger, Fahadh Faasil’s unhinged intensity, and Sukumar’s grand visual storytelling.',
    trivia: [
      'The "Jathara" sequence featuring Allu Arjun in Ardhanarishvara attire took 35 days of continuous night shoots with 2,000 traditional dancers.',
      'Broke all pre-release worldwide theatrical and digital rights records in Indian cinema history.',
      'Devi Sri Prasad composed over 14 distinct theme leitmotifs for Pushpa Raj and Shekhawat.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/9BBTo63ANSmhC4e6r62OJFuK2GL.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com/title/pushpa2',
        availableRegions: ['IN', 'US', 'UK', 'JP', 'AE'],
        priceTier: 'Included'
      },
      {
        platform: 'Amazon Prime',
        url: 'https://www.amazon.com/dp/pushpa2',
        availableRegions: ['IN', 'US'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'Filmed deep in the Maredumilli forests with real timber logging operations coordinated under environmental supervision.'
  },

  // 13. Amar Singh Chamkila (Netflix)
  {
    id: 'amar-singh-chamkila',
    title: 'Amar Singh Chamkila',
    type: 'Movie',
    year: 2024,
    runtimeOrSeasons: '145 min',
    rating: 4.9,
    genres: ['Biography', 'Drama'],
    directorOrCreator: 'Imtiaz Ali',
    cast: ['Diljit Dosanjh', 'Parineeti Chopra', 'Apinderdeep Singh', 'Nisha Bano'],
    synopsis: 'The untold true story of Punjab’s original rockstar who rose from humble poverty to record-breaking musical stardom before his tragic, unsolved assassination at age 27.',
    criticalAnalysis: 'A lyrical, visually inventive masterpiece from Imtiaz Ali featuring live on-set musical vocals by Diljit Dosanjh, animated graphic overlays, and A.R. Rahman’s transcendent score.',
    trivia: [
      'All folk akhada songs in the film were sung live on location by Diljit Dosanjh and Parineeti Chopra without studio playback recording.',
      'Imtiaz Ali spent five years researching Chamkila’s surviving dholak players and villagers in Malwa.',
      'Features real archival photographs and cassette recordings seamlessly woven into cinematic reconstructions.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop',
    posterUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com/title/chamkila',
        availableRegions: ['IN', 'US', 'UK', 'CA', 'AU'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'A.R. Rahman used 40-year-old analog tube microphones to recreate the exact tape-hiss warmth of 1980s Punjabi cassette audio.'
  },

  // 14. Citadel: Honey Bunny (Amazon Prime)
  {
    id: 'citadel-honey-bunny',
    title: 'Citadel: Honey Bunny',
    type: 'Series',
    year: 2024,
    runtimeOrSeasons: '1 Season (6 Eps)',
    rating: 4.8,
    genres: ['Action', 'Thriller', 'Sci-Fi'],
    directorOrCreator: 'Raj & DK',
    cast: ['Varun Dhawan', 'Samantha Ruth Prabhu', 'Kay Kay Menon', 'Saqib Saleem', 'Sikandar Kher'],
    synopsis: 'In 1990s Mumbai, stuntman Bunny recruits struggling actress Honey for a high-risk espionage side gig. Years later, their dangerous past returns to hunt down their young daughter Nadia.',
    criticalAnalysis: 'A stylish, retro-infused spy thrill ride from Raj & DK showcasing Samantha’s fierce action mastery, nostalgic 90s cassette-pop flair, and jaw-dropping long-take fight sequences.',
    trivia: [
      'Samantha performed all of her complex hotel room and train corridor stunt sequences while undergoing recovery from myositis.',
      'Connects directly into the global Citadel franchise as the origin story of Priyanka Chopra Jonas’s character Nadia Sinh.',
      'Features authentic 1990s audio cassettes, Sony Walkmans, and vintage rotary phone technology as espionage devices.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/uhYoyxWz4AYd5eYvT3F9d4mH.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/wp6Ox9XJqcv5VlrpX1F9B2L2vV.jpg',
    streamingLinks: [
      {
        platform: 'Amazon Prime',
        url: 'https://www.amazon.com/dp/citadel-honey-bunny',
        availableRegions: ['IN', 'US', 'UK', 'JP', 'DE'],
        priceTier: 'Included'
      }
    ],
    seasonsCount: 1,
    productionTrivia: 'The 10-minute continuous one-shot shootout in a Belgrade tenement took 14 days of rigorous choreography rehearsal.'
  },

  // 15. Panchayat: Season 3 & 4 (Amazon Prime)
  {
    id: 'panchayat-series',
    title: 'Panchayat',
    type: 'Series',
    year: 2024,
    runtimeOrSeasons: '3 Seasons (24 Eps)',
    rating: 4.9,
    genres: ['Comedy', 'Drama'],
    directorOrCreator: 'Deepak Kumar Mishra',
    cast: ['Jitendra Kumar', 'Neena Gupta', 'Raghubir Yadav', 'Chandan Roy', 'Faisal Malik', 'Sunita Rajwar'],
    synopsis: 'An engineering graduate continues his bittersweet journey as Panchayat Secretary in the rural village of Phulera, dealing with quirky local politics, village rivalries, and heartfelt camaraderie.',
    criticalAnalysis: 'India’s most beloved slice-of-life comedy series that finds deep emotional resonance in rural simplicity, village eccentricities, and the warm bonds of human community.',
    trivia: [
      'The village of Mahodiya in Madhya Pradesh serves as the real-life Phulera, and has become a major tourist attraction.',
      'Faisal Malik’s poignant performance in the Season 2 & 3 finales moved viewers across the globe to tears.',
      'Jitendra Kumar genuinely lived in a rural gram panchayat office during pre-production to understand the rhythm of village administration.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop',
    posterUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=600&auto=format&fit=crop',
    streamingLinks: [
      {
        platform: 'Amazon Prime',
        url: 'https://www.amazon.com/dp/panchayat',
        availableRegions: ['IN', 'US', 'UK', 'AU'],
        priceTier: 'Included'
      }
    ],
    seasonsCount: 3,
    productionTrivia: 'The iconic overhead water tank in Phulera was specially renovated and waterproofed by the production team to allow filming atop its platform.'
  },

  // 16. Mirzapur: Season 3 (Amazon Prime)
  {
    id: 'mirzapur-series',
    title: 'Mirzapur',
    type: 'Series',
    year: 2024,
    runtimeOrSeasons: '3 Seasons (29 Eps)',
    rating: 4.8,
    genres: ['Crime', 'Action', 'Thriller'],
    directorOrCreator: 'Gurmmeet Singh & Anand Iyer',
    cast: ['Pankaj Tripathi', 'Ali Fazal', 'Shweta Tripathi', 'Rasika Dugal', 'Vijay Varma', 'Isha Talwar'],
    synopsis: 'With Munna Tripathi dead and Kaleen Bhaiya incapacitated in hiding, Guddu Pandit and Golu seize the throne of Mirzapur, sparking fierce rebellions across the lawless districts of Purvanchal.',
    criticalAnalysis: 'The undisputed monarch of Indian crime drama delivers a sprawling game of thrones across Uttar Pradesh, fueled by ruthless betrayals, Machiavellian politics, and gritty action.',
    trivia: [
      'Ali Fazal gained 14kg of muscle to portray an even more imposing and battle-hardened Guddu Pandit.',
      'Vijay Varma plays twin brothers Shatrughan and Bharat Tyagi with distinct dialectical variations.',
      'Pankaj Tripathi’s nuanced, understated portrayal of an injured lion in Kaleen Bhaiya redefined crime boss archetypes.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
    posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop',
    streamingLinks: [
      {
        platform: 'Amazon Prime',
        url: 'https://www.amazon.com/dp/mirzapur',
        availableRegions: ['IN', 'US', 'UK', 'CA'],
        priceTier: 'Included'
      }
    ],
    seasonsCount: 3,
    productionTrivia: 'Over 60 real heritage havelis across Lucknow, Varanasi, and Jaunpur were utilized as royal crime mansions.'
  },

  // 17. The Night Manager: Season 2 (Disney+ Hotstar / JioHotstar)
  {
    id: 'the-night-manager-india',
    title: 'The Night Manager',
    type: 'Series',
    year: 2024,
    runtimeOrSeasons: '2 Seasons (7 Eps)',
    rating: 4.8,
    genres: ['Thriller', 'Crime', 'Drama'],
    directorOrCreator: 'Sandeep Modi',
    cast: ['Anil Kapoor', 'Aditya Roy Kapur', 'Sobhita Dhulipala', 'Tillotama Shome', 'Saswata Chatterjee'],
    synopsis: 'Former Indian Navy lieutenant Shaan Sengupta infiltrates the inner circle of charming international arms dealer Shailendra Rungta, orchestrating a high-stakes sting across Dhaka and Sri Lanka.',
    criticalAnalysis: 'A slick, high-budget international espionage thriller adapted from John le Carré, powered by Anil Kapoor’s chilling charisma and Aditya Roy Kapur’s magnetic undercover gravitas.',
    trivia: [
      'Received an International Emmy Award nomination for Best Drama Series, the only Indian series nominated in 2024.',
      'Anil Kapoor took inspiration from real geopolitical arms brokers to craft his charming yet lethal billionaire persona.',
      'Filmed in luxury desert palaces in Rajasthan, coastal fortresses in Galle, Sri Lanka, and five-star resorts in the Maldives.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/gFZriCkpJYsApPZEF3jhxL4yLzG.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg',
    streamingLinks: [
      {
        platform: 'Disney+ Hotstar',
        url: 'https://www.hotstar.com/the-night-manager',
        availableRegions: ['IN', 'US', 'UK'],
        priceTier: 'Included'
      },
      {
        platform: 'Amazon Prime',
        url: 'https://www.amazon.com/dp/the-night-manager',
        availableRegions: ['US', 'UK'],
        priceTier: 'Included'
      }
    ],
    seasonsCount: 2,
    productionTrivia: 'The luxury super-yacht used for Rungta’s ocean operations is a multi-million dollar private vessel chartered off the coast of Dubai.'
  },

  // 18. Taaza Khabar: Season 2 (Disney+ Hotstar / JioHotstar)
  {
    id: 'taaza-khabar-series',
    title: 'Taaza Khabar',
    type: 'Series',
    year: 2024,
    runtimeOrSeasons: '2 Seasons (12 Eps)',
    rating: 4.7,
    genres: ['Comedy', 'Drama', 'Fantasy'],
    directorOrCreator: 'Himank Gaur',
    cast: ['Bhuvan Bam', 'Shriya Pilgaonkar', 'Jaaved Jaaferi', 'Deven Bhojani', 'Prathamesh Parab'],
    synopsis: 'Vasant Gawde, a humble public toilet attendant who discovered a supernatural power to receive future news alerts on his phone, faces a ruthless debt tycoon who threatens to destroy everything he built.',
    criticalAnalysis: 'A thrilling, heartwarming fantasy caper that showcases YouTube superstar Bhuvan Bam’s dramatic range alongside legendary veteran Jaaved Jaaferi as a cold, calculating antagonist.',
    trivia: [
      'Bhuvan Bam co-produced the series and composed several original songs featured in the background score.',
      'Jaaved Jaaferi joined Season 2 as Yusuf Akhtar, a charismatic yet menacing underworld loan shark.',
      'Shot on authentic locations in South Mumbai chawls, docks, and high-rise luxury penthouses.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1200&auto=format&fit=crop',
    posterUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop',
    streamingLinks: [
      {
        platform: 'Disney+ Hotstar',
        url: 'https://www.hotstar.com/taaza-khabar',
        availableRegions: ['IN', 'US', 'UK', 'CA'],
        priceTier: 'Included'
      }
    ],
    seasonsCount: 2,
    productionTrivia: 'The retro phone interface used for the divine notifications was custom-coded to look like an old Symbian SMS notification with glowing blue luminescent text.'
  },

  // 19. Sector 36 (Netflix)
  {
    id: 'sector-36',
    title: 'Sector 36',
    type: 'Movie',
    year: 2024,
    runtimeOrSeasons: '124 min',
    rating: 4.8,
    genres: ['Thriller', 'Crime'],
    directorOrCreator: 'Aditya Nimbalkar',
    cast: ['Vikrant Massey', 'Deepak Dobriyal', 'Akash Khurana', 'Darshan Jariwala'],
    synopsis: 'Inspired by harrowing real events, when several children mysteriously vanish from a slum in Sector 36, a corrupt police sub-inspector is forced to confront a sinister serial predator hiding in plain sight.',
    criticalAnalysis: 'A chilling, uncompromising psychological crime drama featuring a terrifying, career-defining performance by Vikrant Massey and Deepak Dobriyal’s relentless moral crusade.',
    trivia: [
      'Vikrant Massey studied psychological profiles of real-life serial offenders to capture the chillingly normal demeanor of his character Prem.',
      'Deepak Dobriyal spent weeks shadowing local Delhi and Noida police officers to master authentic North Indian police mannerisms.',
      'Premiered at the 15th Indian Film Festival of Melbourne to unanimous critical acclaim.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=1200&auto=format&fit=crop',
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com/title/sector36',
        availableRegions: ['IN', 'US', 'UK', 'AU'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'The production constructed a hyper-realistic replica of a suburban Delhi canal and industrial junkyard under strict atmospheric lighting.'
  },

  // 20. IC 814: The Kandahar Hijack (Netflix)
  {
    id: 'ic-814-kandahar',
    title: 'IC 814: The Kandahar Hijack',
    type: 'Series',
    year: 2024,
    runtimeOrSeasons: '1 Season (6 Eps)',
    rating: 4.9,
    genres: ['Thriller', 'History', 'Drama'],
    directorOrCreator: 'Anubhav Sinha',
    cast: ['Vijay Varma', 'Naseeruddin Shah', 'Pankaj Kapur', 'Dia Mirza', 'Patralekhaa', 'Kumud Mishra', 'Manoj Pahwa'],
    synopsis: 'On Christmas Eve 1999, Indian Airlines Flight 814 is hijacked en route to Delhi. Captain Sharan Dev and government negotiators navigate a harrowing 7-day hostage crisis on the tarmac of Kandahar.',
    criticalAnalysis: 'An authoritative, masterclass geopolitical thriller boasting an ensemble of Indian cinema’s greatest acting titans, capturing the claustrophobia, political gridlock, and human bravery of the 1999 crisis.',
    trivia: [
      'Features a rare reunion of legends Naseeruddin Shah and Pankaj Kapur on screen as the Crisis Management Group cabinet chiefs.',
      'Vijay Varma trained in flight simulators for months to accurately depict Airbus A300 cockpit operations under high stress.',
      'The aircraft interior was built as an exact 1:1 replica of the Indian Airlines Airbus A300.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?q=80&w=1200&auto=format&fit=crop',
    posterUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=600&auto=format&fit=crop',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com/title/ic814',
        availableRegions: ['IN', 'US', 'UK', 'AE', 'SG'],
        priceTier: 'Included'
      }
    ],
    seasonsCount: 1,
    productionTrivia: 'Anubhav Sinha referenced over 2,000 pages of declassified Ministry of External Affairs negotiation cables and passenger survivor diaries.'
  },

  // 21. Do Patti (Netflix)
  {
    id: 'do-patti',
    title: 'Do Patti',
    type: 'Movie',
    year: 2024,
    runtimeOrSeasons: '127 min',
    rating: 4.7,
    genres: ['Thriller', 'Mystery', 'Drama'],
    directorOrCreator: 'Shashanka Chaturvedi',
    cast: ['Kriti Sanon', 'Kajol', 'Shaheer Sheikh', 'Tanvi Azmi'],
    synopsis: 'In the misty hill town of Devikund, a relentless police inspector investigates an attempted murder case that pits two estranged twin sisters with deeply buried secrets against a charismatic, abusive heir.',
    criticalAnalysis: 'A gripping, socially pertinent psychological mystery marked by Kriti Sanon’s compelling double turn and Kajol’s commanding debut as a hardened police investigator.',
    trivia: [
      'Marks Kriti Sanon’s debut as a feature film producer under her banner Blue Butterfly Films.',
      'Reunites Kajol and Kriti Sanon on screen nine years after Dilwale (2015).',
      'Shot amidst the pine forests and colonial heritage estates of Manali and Shimla.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1519074069444-1ba4e6664104?q=80&w=1200&auto=format&fit=crop',
    posterUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com/title/dopatti',
        availableRegions: ['IN', 'US', 'UK', 'CA'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'The classic Punjabi folk track "Akhiyaan De Kol" was recreated with modern bassline rhythms sung by Shilpa Rao and Mellow D.'
  },

  // 22. Vettaiyan (Amazon Prime)
  {
    id: 'vettaiyan-movie',
    title: 'Vettaiyan',
    type: 'Movie',
    year: 2024,
    runtimeOrSeasons: '163 min',
    rating: 4.8,
    genres: ['Action', 'Drama', 'Crime'],
    directorOrCreator: 'T.J. Gnanavel',
    cast: ['Rajinikanth', 'Amitabh Bachchan', 'Fahadh Faasil', 'Manju Warrier', 'Rana Daggubati'],
    synopsis: 'An encounter specialist SP Athiyan known for summary justice faces an ideological and legal trial by Justice Sathyadev after an innocent teacher is caught in a staged police shootout.',
    criticalAnalysis: 'A high-impact social drama that questions encounter killings through the clash of two titans—Superstar Rajinikanth and Amitabh Bachchan—infused with Anirudh’s sensational "Manasilaayo" beats.',
    trivia: [
      'Reunites Indian cinema legends Rajinikanth and Amitabh Bachchan on screen after 33 years (since Hum in 1991).',
      'Fahadh Faasil plays the comic relief tech hacker Battery, adding infectious wit to the investigative narrative.',
      'The viral song "Manasilaayo" incorporated AI-generated vocals of late legendary singer Malaysia Vasudevan with his family\'s blessing.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/b34jIp49t11A9T9a27g0u5h13F8.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/vSNxAJTlD0r02V9sPYwqjqbpK0v.jpg',
    streamingLinks: [
      {
        platform: 'Amazon Prime',
        url: 'https://www.amazon.com/dp/vettaiyan',
        availableRegions: ['IN', 'US', 'UK', 'JP', 'SG'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'Filmed across Kanyakumari, Trivandrum, Chennai, and Mumbai with custom courtroom set construction.'
  },

  // 23. Maharaj (Netflix)
  {
    id: 'maharaj-movie',
    title: 'Maharaj',
    type: 'Movie',
    year: 2024,
    runtimeOrSeasons: '131 min',
    rating: 4.8,
    genres: ['Biography', 'Drama', 'History'],
    directorOrCreator: 'Siddharth P. Malhotra',
    cast: ['Junaid Khan', 'Jaideep Ahlawat', 'Sharvari', 'Shalini Pandey'],
    synopsis: 'Based on the historic 1862 Maharaj Libel Case, fearless reformist journalist Karsandas Mulji takes on a powerful religious sect leader who exploits female devotees under the guise of devotion.',
    criticalAnalysis: 'A gripping historical courtroom drama showcasing a phenomenal debut by Junaid Khan and a chillingly charismatic, menacing performance by Jaideep Ahlawat.',
    trivia: [
      'Marks the acting debut of Junaid Khan (son of Aamir Khan) after three years of intensive theatre training.',
      'Based on the real-life 1862 court proceedings presided over by Chief Justice Sir Matthew Sausse in the Supreme Court of Bombay.',
      'Sharvari delivers an energetic performance as Viraaj, providing key investigative support.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=1200&auto=format&fit=crop',
    posterUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com/title/maharaj',
        availableRegions: ['IN', 'US', 'UK', 'CA'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'The 19th-century Victorian Bombay courtroom was painstakingly recreated using vintage teak wood, hand-pulled punkha fans, and parchment legal records.'
  },

  // 24. Special OPS 2.0 (Disney+ Hotstar / JioHotstar)
  {
    id: 'special-ops-series',
    title: 'Special OPS 2.0',
    type: 'Series',
    year: 2024,
    runtimeOrSeasons: '2 Seasons (12 Eps)',
    rating: 4.9,
    genres: ['Action', 'Thriller', 'Crime'],
    directorOrCreator: 'Neeraj Pandey & Shivam Nair',
    cast: ['Kay Kay Menon', 'Vinay Pathak', 'Karan Tacker', 'Saiyami Kher', 'Muzamil Ibrahim'],
    synopsis: 'RAW operative Himmat Singh unleashes his covert intelligence unit across international terror financing hubs to preempt a catastrophic strike against India’s financial capitals.',
    criticalAnalysis: 'India’s benchmark espionage franchise delivering razor-sharp procedural tradecraft, heart-stopping tactical operations, and Kay Kay Menon’s iconic Himmat Singh.',
    trivia: [
      'Kay Kay Menon’s dialogue delivery and tactical chalkboard briefings have become widely acclaimed in modern Indian television.',
      'Filmed across 4 continents including Turkey, Azerbaijan, UAE, and Georgia.',
      'Military consultants who served in Special Forces oversaw the tactical breaching and close-quarters battle scenes.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/4McK6q2yG7mP1v2FvX9s0u5h13.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/5T1bF8fW8Z9tF2y1q3a4s5d6.jpg',
    streamingLinks: [
      {
        platform: 'Disney+ Hotstar',
        url: 'https://www.hotstar.com/special-ops',
        availableRegions: ['IN', 'US', 'UK', 'CA'],
        priceTier: 'Included'
      }
    ],
    seasonsCount: 2,
    productionTrivia: 'Over 50 real diplomatic cables and declassified intelligence reports inspired the intricate multi-tier sting operations.'
  },

  // 25. Squid Game: Season 2 (Netflix)
  {
    id: 'squid-game-2',
    title: 'Squid Game: Season 2',
    type: 'Series',
    year: 2024,
    runtimeOrSeasons: '2 Seasons (15 Eps)',
    rating: 4.9,
    genres: ['Thriller', 'Drama', 'Mystery'],
    directorOrCreator: 'Hwang Dong-hyuk',
    cast: ['Lee Jung-jae', 'Lee Byung-hun', 'Wi Ha-jun', 'Yim Si-wan', 'Kang Ha-neul', 'Park Gyu-young'],
    synopsis: 'Player 456 Seong Gi-hun abandons his flight to America and re-enters the deadly island games with a singular mission: to expose the VIP organizers and tear down the sadistic system from within.',
    criticalAnalysis: 'A masterclass psychological spectacle expanding Hwang Dong-hyuk’s global phenomenon with deadlier new games, voting dilemmas between rounds, and electrifying battle-of-wits between Gi-hun and the Front Man.',
    trivia: [
      'The new season introduced interactive voting between each game where players could vote with O or X to split the pot or keep playing.',
      'New cast members include Korean superstars Yim Si-wan, Kang Ha-neul, and BIGBANG’s T.O.P. (Choi Seung-hyun).',
      'The multi-colored staircase set was expanded to three times its original size to accommodate larger practical camera crane maneuvers.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/m9yop21v2FvX9s0u5h13F8gL5Z.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/dDlEmu3EZ0Pgg93K2SVNLCjCSvE.jpg',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com/title/81040344',
        availableRegions: ['IN', 'US', 'UK', 'KR', 'JP'],
        priceTier: 'Included'
      }
    ],
    seasonsCount: 2,
    productionTrivia: 'Director Hwang Dong-hyuk wrote the entirety of Season 2 & 3 simultaneously to ensure airtight thematic continuity.'
  },

  // 26. The Great Indian Kapil Show: Season 2 (Netflix)
  {
    id: 'the-great-indian-kapil-show',
    title: 'The Great Indian Kapil Show',
    type: 'Series',
    year: 2024,
    runtimeOrSeasons: '2 Seasons (26 Eps)',
    rating: 4.7,
    genres: ['Comedy'],
    directorOrCreator: 'Kapil Sharma',
    cast: ['Kapil Sharma', 'Sunil Grover', 'Krushna Abhishek', 'Kiku Sharda', 'Archana Puran Singh'],
    synopsis: 'Kapil Sharma and his eccentric airport lounge family host global superstars, Bollywood royalty, and cricket legends for riotous sketch comedy, unscripted banter, and musical madness.',
    criticalAnalysis: 'The ultimate weekend family comedy feast celebrating the iconic reunion of Kapil Sharma and Sunil Grover, reaching top 10 streaming charts across 25+ countries globally.',
    trivia: [
      'Reunites Kapil Sharma and Sunil Grover on screen after six years of anticipation.',
      'Guest appearances include international icons like Ed Sheeran alongside Bollywood titans and India’s T20 World Cup champions.',
      'Filmed on an airport-themed mega soundstage inside Mumbai’s Film City.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1200&auto=format&fit=crop',
    posterUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=600&auto=format&fit=crop',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com/title/kapilshow',
        availableRegions: ['IN', 'US', 'UK', 'CA', 'AE'],
        priceTier: 'Included'
      }
    ],
    seasonsCount: 2,
    productionTrivia: 'Over 200 live studio audience members participate in each taping with real-time improvisational crowd interactions.'
  },

  // 27. Lucky Baskhar (Netflix)
  {
    id: 'lucky-baskhar',
    title: 'Lucky Baskhar',
    type: 'Movie',
    year: 2024,
    runtimeOrSeasons: '150 min',
    rating: 4.8,
    genres: ['Crime', 'Drama', 'Thriller'],
    directorOrCreator: 'Venky Atluri',
    cast: ['Dulquer Salmaan', 'Meenakshi Chaudhary', 'Ramki', 'Hyper Aadi'],
    synopsis: 'In 1992 Bombay, a humble, underpaid bank cashier trapped in mountain of debt discovers a lucrative banking loophole, spiraling into the high-stakes world of money laundering and the stock market scam.',
    criticalAnalysis: 'A phenomenal financial crime drama elevated by Dulquer Salmaan’s magnetic common-man charm, razor-sharp period writing, and G.V. Prakash Kumar’s pulse-pounding 90s score.',
    trivia: [
      'Dulquer Salmaan learned conversational Telugu nuances specifically for the role to perform his own dubbing.',
      'The banking computer systems and ledgers were accurately sourced from early 1990s banking hardware in Mumbai.',
      'Achieved critical acclaim and blockbuster status simultaneously in Telugu, Malayalam, and Hindi releases.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
    posterUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&auto=format&fit=crop',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com/title/lucky-baskhar',
        availableRegions: ['IN', 'US', 'UK', 'SG', 'MY'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'The 1990s Fort business district of Bombay was faithfully recreated using practical architectural facades and vintage Fiat Premier Padmini taxi fleets.'
  },

  // 28. Criminal Justice: Season 4 (Disney+ Hotstar / JioHotstar)
  {
    id: 'criminal-justice-series',
    title: 'Criminal Justice: Adhura Sach',
    type: 'Series',
    year: 2024,
    runtimeOrSeasons: '4 Seasons (32 Eps)',
    rating: 4.8,
    genres: ['Thriller', 'Crime', 'Drama'],
    directorOrCreator: 'Rohan Sippy',
    cast: ['Pankaj Tripathi', 'Shweta Basu Prasad', 'Swastika Mukherjee', 'Purab Kohli', 'Adinath Kothare'],
    synopsis: 'Unassuming yet brilliantly shrewd advocate Madhav Mishra takes on the legal defense of complex, morally gray criminal trials where the truth is never black and white.',
    criticalAnalysis: 'India’s gold standard courtroom drama anchored by Pankaj Tripathi’s endearing, razor-sharp Madhav Mishra, delivering gripping legal twists and deep social empathy.',
    trivia: [
      'Pankaj Tripathi considers Madhav Mishra one of his all-time favorite career characters, returning for four acclaimed seasons.',
      'The courtroom arguments were vetted by active High Court advocates for authentic legal procedure.',
      'Each season tackles a distinct contemporary forensic and criminal law controversy.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1200&auto=format&fit=crop',
    posterUrl: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=600&auto=format&fit=crop',
    streamingLinks: [
      {
        platform: 'Disney+ Hotstar',
        url: 'https://www.hotstar.com/criminal-justice',
        availableRegions: ['IN', 'US', 'UK'],
        priceTier: 'Included'
      }
    ],
    seasonsCount: 4,
    productionTrivia: 'The sessions court set was constructed with authentic vintage woodwork and functional acoustic microphones.'
  },

  // 29. Paatal Lok: Season 2 (Amazon Prime)
  {
    id: 'paatal-lok-series',
    title: 'Paatal Lok',
    type: 'Series',
    year: 2025,
    runtimeOrSeasons: '2 Seasons (18 Eps)',
    rating: 4.9,
    genres: ['Crime', 'Thriller', 'Drama'],
    directorOrCreator: 'Avinash Arun & Prosit Roy',
    cast: ['Jaideep Ahlawat', 'Ishwak Singh', 'Tillotama Shome', 'Jahangir Khan', 'Gul Panag'],
    synopsis: 'Inspector Hathiram Chaudhary is pulled into a dark, sprawling nexus of inter-state human trafficking, mining cartels, and political assassinations reaching from the valleys of Nagaland to the badlands of Haryana.',
    criticalAnalysis: 'The raw, uncompromising zenith of Indian noir neo-realism that delves into the darkest sociological corridors of power, driven by Jaideep Ahlawat’s immortal Hathiram Chaudhary.',
    trivia: [
      'Jaideep Ahlawat’s performance as Hathiram Chaudhary won every major Indian streaming best actor award.',
      'Season 2 expands the investigative scope into the northeast tribal borders and industrial corridors of Bengal.',
      'Creator Sudip Sharma wrote the script over three years of intensive investigative research.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?q=80&w=1200&auto=format&fit=crop',
    posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop',
    streamingLinks: [
      {
        platform: 'Amazon Prime',
        url: 'https://www.amazon.com/dp/paatal-lok',
        availableRegions: ['IN', 'US', 'UK', 'CA'],
        priceTier: 'Included'
      }
    ],
    seasonsCount: 2,
    productionTrivia: 'Shot on location in over 120 authentic urban and rural environments with non-professional local actors.'
  },

  // 30. Saripodhaa Sanivaaram (Netflix)
  {
    id: 'saripodhaa-sanivaaram',
    title: 'Saripodhaa Sanivaaram',
    type: 'Movie',
    year: 2024,
    runtimeOrSeasons: '174 min',
    rating: 4.8,
    genres: ['Action', 'Thriller'],
    directorOrCreator: 'Vivek Athreya',
    cast: ['Nani', 'S.J. Suryah', 'Priyanka Mohan', 'Abhirami', 'Aditi Balan'],
    synopsis: 'Surya controls his uncontrollable rage by venting it only on one designated day of the week—Saturday. When a ruthless, psychopathic police inspector terrorizes innocent villagers, Surya’s Saturday justice awakens.',
    criticalAnalysis: 'A high-concept vigilante action spectacle energized by Nani’s charismatic restraint, S.J. Suryah’s unhinged madness, and Jakes Bejoy’s electrifying background score.',
    trivia: [
      'Features an intense clash between Natural Star Nani and versatile villain S.J. Suryah.',
      'The red diary rage mechanism was inspired by ancient martial vows of anger management.',
      'Jakes Bejoy’s heavy brass and bass themes topped streaming charts across South India.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/cinER0ESG0eJ499t935io79m8.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/1BIoJGKbXjdFDAvUEiA2VHqkK1Z.jpg',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com/title/saripodhaa-sanivaaram',
        availableRegions: ['IN', 'US', 'UK', 'AU'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'The Sokulapalem marketplace rain-fight sequence was filmed over seven consecutive nights with six high-pressure rain guns.'
  }
];
