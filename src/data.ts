import { Movie } from './types';

function getProxiedUrl(url: string): string {
  if (!url) return '';
  if (url.includes('unsplash.com')) {
    return url;
  }
  // Use images.weserv.nl proxy for any non-Unsplash images (Wikipedia, Britannica, Nerdist, etc.)
  // to 100% bypass 403 Forbidden hotlinking protections in the iframe environment.
  return `https://images.weserv.nl/?url=${encodeURIComponent(url)}`;
}

const RAW_CATALOG: Movie[] = [
  {
    id: 'dune-part-two',
    title: 'Dune: Part Two',
    type: 'Movie',
    year: 2024,
    runtimeOrSeasons: '166 min',
    rating: 4.9,
    genres: ['Sci-Fi', 'Adventure', 'Drama'],
    directorOrCreator: 'Denis Villeneuve',
    cast: ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson', 'Austin Butler'],
    synopsis: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
    criticalAnalysis: 'A visual and sonic triumph that translates Frank Herbert\'s complex interstellar politics and religious messianism into majestic, sprawling desert cinematography.',
    trivia: [
      'Austin Butler trained for five months with a military knife instructor to perfect Feyd-Rautha\'s predatory fighting style.',
      'The production shot in remote areas of Abu Dhabi during peak summer temperatures to capture the heat shimmer of Arrakis.',
      'Denis Villeneuve refused to use green screens, opting for massive physical sets built in the deserts.'
    ],
    backdropUrl: 'https://nerdist.com/wp-content/uploads/2023/12/Dune-Part-Two-Sandworm.jpg',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/7/72/Dune_Part_Two_poster.jpeg',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com/title/dune2',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      },
      {
        platform: 'Amazon Prime',
        url: 'https://www.amazon.com/dp/dune2',
        availableRegions: ['US', 'UK'],
        priceTier: 'Premium Rent'
      }
    ],
    productionTrivia: 'Leveraged custom IMAX 15/70mm cameras to capture over 90% of the film\'s expansive visual effects shots.'
  },
  {
    id: 'oppenheimer',
    title: 'Oppenheimer',
    type: 'Movie',
    year: 2023,
    runtimeOrSeasons: '180 min',
    rating: 4.8,
    genres: ['Biography', 'Drama', 'History'],
    directorOrCreator: 'Christopher Nolan',
    cast: ['Cillian Murphy', 'Emily Blunt', 'Matt Damon', 'Robert Downey Jr.'],
    synopsis: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
    criticalAnalysis: 'A kinetic, devastating psychological portrait that turns mathematical theory into a cinematic fever dream of fire, sound, and historical accountability.',
    trivia: [
      'Shot on a combination of IMAX 65mm and 70mm large-format film, including custom-developed IMAX black-and-white film.',
      'Cillian Murphy read extensively about Oppenheimer\'s lifestyle, including his diet of mostly cigarettes and black coffee.',
      'The Trinity test explosion scene was simulated with real physical materials rather than computer-generated imagery.'
    ],
    backdropUrl: 'https://cdn.britannica.com/48/252948-050-4E26F3E4/Cillian-Murphy-Oppenheimer-movie.jpg',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/4/4a/Oppenheimer_%28film%29_poster.jpg',
    streamingLinks: [
      {
        platform: 'Amazon Prime',
        url: 'https://www.amazon.com/dp/oppenheimer',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Premium Rent'
      }
    ],
    productionTrivia: 'Employed specialized large-format chemistry processing to create custom high-contrast black and white cinematic segments.'
  },
  {
    id: 'interstellar',
    title: 'Interstellar',
    type: 'Movie',
    year: 2014,
    runtimeOrSeasons: '169 min',
    rating: 4.9,
    genres: ['Sci-Fi', 'Adventure', 'Drama'],
    directorOrCreator: 'Christopher Nolan',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain', 'Michael Caine'],
    synopsis: 'When Earth becomes uninhabitable, a team of explorers travels through a wormhole in space in an attempt to ensure humanity\'s survival.',
    criticalAnalysis: 'A rare modern masterpiece that successfully balances hard cosmological physics with an emotionally devastating father-daughter dynamic across spacetime.',
    trivia: [
      'Theoretical physicist Kip Thorne wrote pages of complex gravitational equations to ensure the black hole Gargantua was scientifically accurate.',
      'The production planted over 500 acres of real corn fields in Alberta, Canada, just to burn them for the dust storm scenes.',
      'The ticking sound heard on the water planet corresponds to exactly one day passing on Earth for every tick.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg',
    streamingLinks: [
      {
        platform: 'Amazon Prime',
        url: 'https://www.amazon.com/dp/interstellar',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'The black hole CGI data files took up to 800 terabytes of storage and required weeks to render each sequence.'
  },
  {
    id: 'spider-verse',
    title: 'Spider-Man: Into the Spider-Verse',
    type: 'Movie',
    year: 2018,
    runtimeOrSeasons: '117 min',
    rating: 4.9,
    genres: ['Sci-Fi', 'Action', 'Comedy'],
    directorOrCreator: 'Bob Persichetti & Peter Ramsey',
    cast: ['Shameik Moore', 'Jake Johnson', 'Hailee Steinfeld', 'Mahershala Ali'],
    synopsis: 'Teen Miles Morales becomes the Spider-Man of his universe and must join with five spider-powered individuals from other dimensions to stop a threat for all realities.',
    criticalAnalysis: 'A visual masterpiece that revolutionized modern theatrical animation by merging standard 3D CGI with traditional hand-drawn comic book techniques, halftone dots, and active chromatic aberration.',
    trivia: [
      'The movie required up to four times as many animators as a typical animated movie, with each animator producing only two seconds of footage per week.',
      'To make it look like a comic book, animators avoided using motion blur, instead choosing to draw static motion lines.',
      'Miles Morales\' suit features hand-painted graffiti textures representing his Brooklyn roots.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Spider-Man_Into_the_Spider-Verse_poster.png',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com/title/spiderverse',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'Utilized custom-designed machine learning filters to help hand-draw ink lines directly on top of 3D animated character rigs.'
  },
  {
    id: 'the-dark-knight',
    title: 'The Dark Knight',
    type: 'Movie',
    year: 2008,
    runtimeOrSeasons: '152 min',
    rating: 4.9,
    genres: ['Action', 'Thriller', 'Drama'],
    directorOrCreator: 'Christopher Nolan',
    cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart', 'Maggie Gyllenhaal'],
    synopsis: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    criticalAnalysis: 'The absolute gold standard of comic book cinema. It elevates superhero dynamics into a gritty, neo-noir crime thriller that dissects the fragility of human morality under the weight of chaotic anarchy.',
    trivia: [
      'Heath Ledger lived alone in a hotel room for a month to formulate the Joker\'s posture, voice, and chaotic personality.',
      'The IMAX cameras used for key action sequences were extremely heavy and noisy, requiring the actors to re-record much of their dialogue afterwards.',
      'The scene where the hospital is blown up was shot on location at an abandoned candy factory in Chicago slated for real demolition.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29_poster.jpg',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com/title/darkknight',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      },
      {
        platform: 'Amazon Prime',
        url: 'https://www.amazon.com/dp/darkknight',
        availableRegions: ['US', 'UK'],
        priceTier: 'Premium Rent'
      }
    ],
    productionTrivia: 'First major feature film to utilize high-resolution 15/70mm IMAX cameras for key cinematic sequences.'
  },
  {
    id: 'stranger-things',
    title: 'Stranger Things',
    type: 'Series',
    year: 2022,
    runtimeOrSeasons: '4 Seasons',
    rating: 4.8,
    genres: ['Sci-Fi', 'Horror', 'Drama'],
    directorOrCreator: 'The Duffer Brothers',
    cast: ['Millie Bobby Brown', 'Winona Ryder', 'David Harbour', 'Finn Wolfhard'],
    synopsis: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.',
    criticalAnalysis: 'A masterful homage to 1980s genre filmmaking, balancing nostalgic aesthetic fidelity with genuinely rich character ensembles and a dark, escalating cosmic threat.',
    trivia: [
      'The Duffer Brothers auditioned 906 boys and 313 girls for the main child roles.',
      'The show was originally titled "Montauk" and set in Long Island.',
      'The soundtrack features real vintage analog synthesizers to achieve its classic 80s warmth.'
    ],
    backdropUrl: 'https://images.squarespace-cdn.com/content/v1/51b3dc8ee4b051db9641261d/1507052989182-3A6QZNDCHH9Q121CDI9Z/Stranger+Things+2.jpg',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/1/18/Stranger_Things_season_2.jpg',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com/title/80057281',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      },
      {
        platform: 'Amazon Prime',
        url: 'https://www.amazon.com/dp/B0BYTEST1',
        availableRegions: ['US', 'UK'],
        priceTier: 'Premium Rent'
      }
    ],
    productionTrivia: 'Leveraged custom RED Monstro 8K cameras fitted with vintage Leica Summilux lenses to forge its distinct shallow depth-of-field vintage atmosphere.'
  },
  {
    id: 'the-crown',
    title: 'The Crown',
    type: 'Series',
    year: 2023,
    runtimeOrSeasons: '6 Seasons',
    rating: 4.7,
    genres: ['Drama', 'History', 'Biography'],
    directorOrCreator: 'Peter Morgan',
    cast: ['Claire Foy', 'Olivia Colman', 'Imelda Staunton', 'Matt Smith'],
    synopsis: 'Based on award-winning play "The Audience", this lavish drama details the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the 20th century.',
    criticalAnalysis: 'An immaculate balance of public political duty and private domestic conflict. The show serves as a high-fidelity cinematic chronicle of institutional survival in a modernizing world.',
    trivia: [
      'Each episode had an estimated budget of over $13 million, making it one of the most expensive television series ever produced.',
      'The production recreated Buckingham Palace interiors inside Elstree Studios with near-perfect spatial accuracy.',
      'The crown replica used in coronation scenes is made of authentic gold plating and handset Swarovski crystals.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1543728716-80975210d477?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/2/2c/The_Crown_season_1_poster.jpg',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com/title/80025678',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'Every piece of royal wardrobe was hand-stitched by traditional Savile Row costumers over months of historical pattern research.'
  },
  {
    id: 'black-mirror',
    title: 'Black Mirror',
    type: 'Series',
    year: 2023,
    runtimeOrSeasons: '6 Seasons',
    rating: 4.6,
    genres: ['Sci-Fi', 'Thriller', 'Anthology'],
    directorOrCreator: 'Charlie Brooker',
    cast: ['Bryce Dallas Howard', 'Jon Hamm', 'Aaron Paul', 'Salma Hayek'],
    synopsis: 'An anthology series exploring a twisted, high-tech multiverse where humanity\'s greatest innovations and darkest instincts collide.',
    criticalAnalysis: 'A biting, contemporary satire that uses near-future speculative technology as a reflective mirror for our current systemic and psychological vulnerabilities.',
    trivia: [
      'The title "Black Mirror" refers to the cold, dark screen of a television, smart device, or computer monitor staring back at you.',
      'The episode "Bandersnatch" was a ground-breaking interactive film with over 5 hours of total filmed footage.',
      'Many technology concepts introduced in early seasons have since emerged in commercial real-world applications.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/b/bd/Black_Mirror_season_6_poster.png',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com/title/70264888',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'Employed specialized digital color grading curves to deliberately shift hues toward a metallic, sterile aesthetic representing the technological canvas.'
  },
  {
    id: 'the-boys',
    title: 'The Boys',
    type: 'Series',
    year: 2024,
    runtimeOrSeasons: '4 Seasons',
    rating: 4.7,
    genres: ['Action', 'Sci-Fi', 'Comedy'],
    directorOrCreator: 'Eric Kripke',
    cast: ['Karl Urban', 'Jack Quaid', 'Antony Starr', 'Erin Moriarty'],
    synopsis: 'A fun and irreverent take on what happens when superheroes—who are as popular as celebrities—abuse their superpowers rather than use them for good.',
    criticalAnalysis: 'A brilliant, visceral deconstruction of modern corporate hegemony, superhero worship culture, and media saturation masquerading as popcorn entertainment.',
    trivia: [
      'The character of Homelander is an intentional, dark amalgamation of Superman and Captain America, representing absolute corporate power.',
      'Karl Urban\'s character, Billy Butcher, frequently refers to characters as "diabolical", a direct nod to the original comic book series.',
      'The show\'s visual effects team processes over 1,500 highly complex fluid-dynamics shots per season.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/6/6d/The_Boys_TV_series_poster.jpg',
    streamingLinks: [
      {
        platform: 'Amazon Prime',
        url: 'https://www.amazon.com/dp/B087597032',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'Shot entirely on anamorphic lenses to deliver extremely wide aspect ratios with expressive, flared background highlights.'
  },
  {
    id: 'rings-of-power',
    title: 'The Lord of the Rings: The Rings of Power',
    type: 'Series',
    year: 2024,
    runtimeOrSeasons: '2 Seasons',
    rating: 4.2,
    genres: ['Fantasy', 'Action', 'Adventure'],
    directorOrCreator: 'J.D. Payne & Patrick McKay',
    cast: ['Morfydd Clark', 'Mike Wood', 'Robert Aramayo', 'Ismael Cruz Córdova'],
    synopsis: 'Epic drama set thousands of years before the events of J.R.R. Tolkien\'s The Hobbit and The Lord of the Rings, following an ensemble cast as they confront the re-emergence of evil in Middle-earth.',
    criticalAnalysis: 'An ambitious, high-budget fantasy canvas that attempts to give visual shape to the expansive mythopoeic lore of the Second Age with breathtaking scope.',
    trivia: [
      'With a production budget of $465 million for its first season alone, it is officially the most expensive television season ever created.',
      'The elven city of Lindon featured massive physical sets built with actual timber and living gold-painted foliage.',
      'The linguists on set spent years refining the spoken dialects of Quenya, Sindarin, and Khuzdul.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/2/22/The_Lord_of_the_Rings_The_Rings_of_Power_season_1_poster.jpg',
    streamingLinks: [
      {
        platform: 'Amazon Prime',
        url: 'https://www.amazon.com/dp/B09QH8N29B',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'Utilized ultra-high speed Phantom cameras for slow-motion spellweaving sequences, capturing particles at 1,000 frames per second under specialized LED grids.'
  },
  {
    id: 'fleabag',
    title: 'Fleabag',
    type: 'Series',
    year: 2019,
    runtimeOrSeasons: '2 Seasons',
    rating: 4.9,
    genres: ['Comedy', 'Drama'],
    directorOrCreator: 'Phoebe Waller-Bridge',
    cast: ['Phoebe Waller-Bridge', 'Sian Clifford', 'Andrew Scott', 'Olivia Colman'],
    synopsis: 'A dry-witted woman, known only as Fleabag, navigates life and love in London while trying to cope with a recent tragedy.',
    criticalAnalysis: 'A masterclass in fourth-wall disruption. It uses structural theatrical mechanisms to build a dark, intensely intimate psychological compact directly with the viewer.',
    trivia: [
      'The series originated as a one-woman show performed at the Edinburgh Fringe Festival in 2013.',
      'The "Hot Priest" character (Andrew Scott) was written specifically to test Fleabag\'s emotional isolation barrier.',
      'The final bus-stop scene was shot in a single take to capture the raw, unrepeatable natural afternoon sunlight.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/b/b6/Fleabag_UK_poster.jpg',
    streamingLinks: [
      {
        platform: 'Amazon Prime',
        url: 'https://www.amazon.com/dp/B01GEW9B62',
        availableRegions: ['US', 'UK', 'IN'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'The script was written with explicit stage directions instructing the actress where to look into the camera lens with millisecond accuracy.'
  },
  {
    id: 'the-mandalorian',
    title: 'The Mandalorian',
    type: 'Series',
    year: 2023,
    runtimeOrSeasons: '3 Seasons',
    rating: 4.7,
    genres: ['Action', 'Sci-Fi', 'Adventure'],
    directorOrCreator: 'Jon Favreau',
    cast: ['Pedro Pascal', 'Carl Weathers', 'Katee Sackhoff', 'Giancarlo Esposito'],
    synopsis: 'The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.',
    criticalAnalysis: 'A gorgeous space-western that revitalized a historic franchise by returning to its elemental cinematic roots: sparse dialogue, clear moral frontiers, and high-fidelity physical realism.',
    trivia: [
      'The series was the first major production to use Industrial Light & Magic\'s StageCraft virtual production technology.',
      'The puppet for "Grogu" cost approximately $2 million to design and requires three puppeteers to operate in real-time.',
      'Werner Herzog was so enamored with the physical Grogu puppet that he pleaded with the directors not to replace it with CGI.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/2/23/The_Mandalorian_poster.jpg',
    streamingLinks: [
      {
        platform: 'Disney+ Hotstar',
        url: 'https://www.hotstar.com/in/shows/the-mandalorian/1260021071',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'The virtual sets on the 20-foot tall LED "Volume" are synchronized dynamically in real-time using Unreal Engine\'s GPU rendering pipeline matching camera parallax.'
  },
  {
    id: 'loki',
    title: 'Loki',
    type: 'Series',
    year: 2023,
    runtimeOrSeasons: '2 Seasons',
    rating: 4.8,
    genres: ['Sci-Fi', 'Fantasy', 'Adventure'],
    directorOrCreator: 'Michael Waldron',
    cast: ['Tom Hiddleston', 'Owen Wilson', 'Sophia Di Martino', 'Gugu Mbatha-Raw'],
    synopsis: 'The mercurial villain Loki resumes his role as the God of Mischief in a series that takes place after the events of "Avengers: Endgame".',
    criticalAnalysis: 'An incredibly imaginative, retro-futuristic temporal odyssey that successfully merges complex quantum-physics themes with rich psychological redemption arcs.',
    trivia: [
      'The visual style of the Time Variance Authority (TVA) was heavily inspired by the brutalist architecture of mid-century government complexes.',
      'The soundtrack features the theremin, a unique electronic instrument played without physical touch, to represent temporal displacement.',
      'Tom Hiddleston actually held a "Loki School" lecture on set for all co-stars to explain his character\'s decade-long MCU history.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/b/b5/Loki_season_1_poster.jpg',
    streamingLinks: [
      {
        platform: 'Disney+ Hotstar',
        url: 'https://www.hotstar.com/in/shows/loki/1260064332',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'The TVA archives were populated with authentic, heavy vintage typewriters, mechanical rotary clocks, and vacuum-sealed tubes procured from retro industrial depots.'
  },
  {
    id: 'shogun',
    title: 'Shōgun',
    type: 'Series',
    year: 2024,
    runtimeOrSeasons: '1 Season',
    rating: 4.9,
    genres: ['Drama', 'History', 'War'],
    directorOrCreator: 'Rachel Kondo & Justin Marks',
    cast: ['Hiroyuki Sanada', 'Cosmo Jarvis', 'Anna Sawai', 'Tadanobu Asano'],
    synopsis: 'Set in feudal Japan in the year 1600, Lord Yoshii Toranaga fights for his life as his enemies on the Council of Regents unite against him.',
    criticalAnalysis: 'A colossal, highly immersive historical masterwork. Shōgun treats its subject matter with extraordinary linguistic, cultural, and political respect, setting a new high watermark for television.',
    trivia: [
      'The production employed specialized historical advisors to teach actors the exact gestures, posture, and speech patterns of 17th-century samurai.',
      'Hiroyuki Sanada, who plays Toranaga, also served as a full-time producer to ensure absolute historical and cultural authenticity.',
      'Over 90% of the dialogue is spoken in traditional Japanese, with high-fidelity English translation subtitles mapped frame-by-frame.'
    ],
    backdropUrl: 'https://www.motionpictures.org/wp-content/uploads/2024/02/SHOGUN_101_06822R2-H-2024.jpg',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/c/cb/Shogun_2024_TV_series_poster.jpg',
    streamingLinks: [
      {
        platform: 'Disney+ Hotstar',
        url: 'https://www.hotstar.com/in/shows/shogun/1260163801',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'Every traditional armor set used in battle was individually crafted by contemporary armorers in Japan using authentic lacquerware and silk lacing techniques.'
  },
  {
    id: 'squid-game',
    title: 'Squid Game',
    type: 'Series',
    year: 2021,
    runtimeOrSeasons: '1 Season',
    rating: 4.8,
    genres: ['Thriller', 'Drama', 'Mystery'],
    directorOrCreator: 'Hwang Dong-hyuk',
    cast: ['Lee Jung-jae', 'Park Hae-soo', 'Wi Ha-jun', 'Jung Ho-yeon'],
    synopsis: 'Hundreds of cash-strapped players accept a strange invitation to compete in children\'s games. Inside, a tempting prize awaits with deadly high stakes.',
    criticalAnalysis: 'A savage, beautifully realized dystopian allegory on modern capitalism and social survival. The show translates classic playground activities into nail-biting survival suspense punctuated by vivid primary color palettes and impeccable geometric production design.',
    trivia: [
      'The creator, Hwang Dong-hyuk, first conceived the idea in 2008 but was rejected by studios for over 10 years because the concept was deemed too bizarre and violent.',
      'The giant creepy doll seen in the first episode is actually a real doll that can be visited at a horse carriage museum in Jincheon County, South Korea.',
      'To increase tension, the actors didn\'t know the rules of the sugar honeycomb game until the cameras started rolling.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1627856013091-fed6e4e30025?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/d/df/Squid_Game_key_art.jpg',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com/title/81040344',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'The production constructed life-sized sets for the playground arenas to capture authentic echoes, scale, and actor claustrophobia.'
  },
  {
    id: 'wednesday',
    title: 'Wednesday',
    type: 'Series',
    year: 2022,
    runtimeOrSeasons: '1 Season',
    rating: 4.7,
    genres: ['Comedy', 'Fantasy', 'Mystery'],
    directorOrCreator: 'Tim Burton',
    cast: ['Jenna Ortega', 'Gwendoline Christie', 'Riki Lindhome', 'Christina Ricci'],
    synopsis: 'While attending Nevermore Academy, Wednesday Addams attempts to master her emerging psychic ability, thwart a monstrous killing spree, and solve a supernatural mystery.',
    criticalAnalysis: 'A beautifully dark, deadpan coming-of-age gothic fantasy. Tim Burton\'s visual flair combines effortlessly with Jenna Ortega\'s iconic, unblinking performance to deliver a contemporary updates to a classic franchise.',
    trivia: [
      'Jenna Ortega took cello, fencing, archery, German, and canoeing lessons to prepare for her role as Wednesday.',
      'The infamous dance scene was choreographed by Jenna Ortega herself, drawing inspiration from retro goth club footage from the 1980s.',
      'To play Wednesday, Jenna Ortega practiced holding her eyes wide open for entire takes, training herself not to blink on camera.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/8/85/Wednesday_Netflix_series_poster.png',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com/title/81231974',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'Shot entirely on Location in Romania, using historic castles and gothic mountain landscapes as the visual framework for Nevermore Academy.'
  },
  {
    id: 'reacher',
    title: 'Reacher',
    type: 'Series',
    year: 2024,
    runtimeOrSeasons: '2 Seasons',
    rating: 4.8,
    genres: ['Action', 'Thriller', 'Drama'],
    directorOrCreator: 'Nick Santora',
    cast: ['Alan Ritchson', 'Malcolm Goodwin', 'Willa Fitzgerald', 'Maria Sten'],
    synopsis: 'Veteran military police investigator Jack Reacher is falsely accused of murder and finds himself in the middle of a deadly conspiracy full of dirty cops, shady businessmen, and scheming politicians.',
    criticalAnalysis: 'An exceptionally satisfying, heavy-hitting procedural thriller. Reacher stays incredibly true to the literary roots of Lee Child\'s protagonist, combining massive physical combat choreography with sharp deductive detective logic.',
    trivia: [
      'Alan Ritchson gained 30 pounds of lean muscle to accurately match Jack Reacher\'s imposing 6-foot-5 book description.',
      'The fighting style featured in the show uses Keysi Combat Method, prioritizing close-quarters defense, elbows, and brutal efficiency.',
      'Lee Child, the original author, makes a cameo appearance in the season one finale inside the diner.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d4/Reacher_season_2_poster.jpg',
    streamingLinks: [
      {
        platform: 'Amazon Prime',
        url: 'https://www.amazon.com/dp/B09G96791S',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'The entire town of Margrave, Georgia was built from scratch on a massive open-air farm in Ontario, Canada to maintain precise set control.'
  },
  {
    id: 'the-bear',
    title: 'The Bear',
    type: 'Series',
    year: 2024,
    runtimeOrSeasons: '3 Seasons',
    rating: 4.9,
    genres: ['Drama', 'Comedy'],
    directorOrCreator: 'Christopher Storer',
    cast: ['Jeremy Allen White', 'Ebon Moss-Bachrach', 'Ayo Edebiri', 'Lionel Boyce'],
    synopsis: 'A young chef from the fine dining world returns to Chicago to run his family\'s sandwich shop after a heartbreaking death.',
    criticalAnalysis: 'An incredibly high-stress, kinetic masterpiece that turns the culinary arts into a relentless psychological battlefield. The show utilizes whip-pans, claustrophobic close-ups, and overlapping dialogue to create a pitch-perfect atmosphere of creative obsession.',
    trivia: [
      'Jeremy Allen White and Ayo Edebiri attended intense professional culinary school classes to learn how to prep, chop, and move like elite Michelin-starred chefs.',
      'The famous episode "Review" in season one was filmed in one single, continuous 20-minute take without any hidden cuts.',
      'Real-world star chefs, including Matty Matheson, not only produced the series but also played major recurring acting roles.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/a/ad/The_Bear_season_2_poster.jpg',
    streamingLinks: [
      {
        platform: 'Disney+ Hotstar',
        url: 'https://www.hotstar.com/in/shows/the-bear/1260113872',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'The sound design actively blends low-frequency ticket printer sounds, sizzling pans, and kitchen hums to deliberately evoke high-stress chef responses.'
  },
  {
    id: 'succession',
    title: 'Succession',
    type: 'Series',
    year: 2023,
    runtimeOrSeasons: '4 Seasons',
    rating: 4.9,
    genres: ['Drama'],
    directorOrCreator: 'Jesse Armstrong',
    cast: ['Brian Cox', 'Jeremy Strong', 'Sarah Snook', 'Kieran Culkin'],
    synopsis: 'The Roy family is known for controlling the biggest media and entertainment company in the world. However, their world changes when their father steps down.',
    criticalAnalysis: 'A Shakespearean tragedy dressed in corporate suits. Succession is a biting, brutally hilarious satire of wealth, power, and generational trauma, fueled by incredible ensemble performances and dynamic hand-held camera work.',
    trivia: [
      'To capture authentic reactions, director Mark Mylod had the camera operators behave as uninvited documentary observers, filming actors even when they weren\'t speaking.',
      'Jeremy Strong practiced extreme method acting, refusing to rehearse with cast members and isolating himself to match Kendall\'s inner depression.',
      'The iconic theme music, composed by Nicholas Britell, blends classical strings with distorted hip-hop beats to represent corporate chaos.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/c/ca/Succession_season_4_poster.jpg',
    streamingLinks: [
      {
        platform: 'Disney+ Hotstar',
        url: 'https://www.hotstar.com/in/shows/succession/1260021070',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'Shot entirely on Kodak 35mm film to achieve a rich, textured, high-contrast look reminiscent of traditional wealth and classic family dynasties.'
  },
  {
    id: 'avatar-way-of-water',
    title: 'Avatar: The Way of Water',
    type: 'Movie',
    year: 2022,
    runtimeOrSeasons: '192 min',
    rating: 4.6,
    genres: ['Sci-Fi', 'Action', 'Adventure'],
    directorOrCreator: 'James Cameron',
    cast: ['Sam Worthington', 'Zoe Saldaña', 'Sigourney Weaver', 'Kate Winslet'],
    synopsis: 'Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Na\'vi race to protect their home.',
    criticalAnalysis: 'An unprecedented cinematic marvel that pushes water simulation, motion capture, and 3D visual density to absolute technological limits. It stands as a stunning testament to James Cameron\'s unparalleled environmental scope.',
    trivia: [
      'The cast had to train extensively in free-diving, with Kate Winslet breaking the record for the longest breath-hold on a film set at an astonishing 7 minutes and 15 seconds.',
      'James Cameron refused to use traditional simulation methods, building a massive 120-foot-long tank capable of holding 250,000 gallons of churning water to capture real wave physics.',
      'Every single underwater motion capture shot required special markers and suits that wouldn\'t interfere with infrared light reflection under water.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/5/54/Avatar_The_Way_of_Water_poster.jpg',
    streamingLinks: [
      {
        platform: 'Disney+ Hotstar',
        url: 'https://www.hotstar.com/in/movies/avatar-the-way-of-water/1260143890',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'Pioneered custom high-frame-rate underwater stereo camera rigs to synchronize performance capture with active water refractions.'
  },
  {
    id: 'damsel',
    title: 'Damsel',
    type: 'Movie',
    year: 2024,
    runtimeOrSeasons: '110 min',
    rating: 4.5,
    genres: ['Fantasy', 'Action', 'Adventure'],
    directorOrCreator: 'Juan Carlos Fresnadillo',
    cast: ['Millie Bobby Brown', 'Ray Winstone', 'Nick Robinson', 'Robin Wright', 'Angela Bassett'],
    synopsis: 'A dutiful damsel agrees to marry a handsome prince, only to find the royal family has recruited her as a sacrifice to repay an ancient debt. Thrown into a cavern with a fire-breathing dragon, she must rely on her wits and survival instincts.',
    criticalAnalysis: 'A clever, action-packed subversion of classical fairy tales. Instead of waiting for a knight in shining armor, the protagonist undergoes a grueling physical and psychological journey, with stunning visual design capturing the terrifying scale of the subterranean dragon lair.',
    trivia: [
      'Millie Bobby Brown performed almost all of her own stunts, including scaling steep cavern walls and navigating narrow rocky chambers.',
      'The design of the dragon was intentionally inspired by traditional feline movements to make its prowling behavior feel organic and predatory.',
      'The cave sets were so vast and complex that cast members frequently got disoriented and lost during the first weeks of shooting.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/0/07/Damsel_2024_film_poster.jpg',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com/title/80991090',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'The film utilized state-of-the-art virtual production LED stages alongside real-world cavern recreations to capture authentic flame illumination.'
  },
  {
    id: 'enola-holmes-1',
    title: 'Enola Holmes',
    type: 'Movie',
    year: 2020,
    runtimeOrSeasons: '123 min',
    rating: 4.6,
    genres: ['Mystery', 'Adventure', 'Comedy'],
    directorOrCreator: 'Harry Bradbeer',
    cast: ['Millie Bobby Brown', 'Henry Cavill', 'Sam Claflin', 'Helena Bonham Carter'],
    synopsis: 'While searching for her missing mother, intrepid teen Enola Holmes uses her sleuthing skills to outsmart big brother Sherlock and help a runaway lord.',
    criticalAnalysis: 'An energetic, highly entertaining spin on Victorian mystery literature. Millie Bobby Brown brings an infectious, fourth-wall-breaking charm that updates the Holmesian legacy with fresh feminist perspective, dynamic pacing, and gorgeous period details.',
    trivia: [
      'Enola regularly breaks the fourth wall, a technique director Harry Bradbeer famously refined in his work on the critically acclaimed series Fleabag.',
      'Millie Bobby Brown was a major force behind the camera as well, serving as an active producer at just 16 years old.',
      'The name "Enola" is "alone" spelled backwards, which serves as a central philosophical theme for her character growth throughout the story.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/e/e6/Enola_Holmes_poster.jpeg',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com/title/81277950',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'The Victorian-era London streets were painstakingly recreated in Greenwich, London, complete with vintage horse carriages and period-accurate storefronts.'
  },
  {
    id: 'enola-holmes-2',
    title: 'Enola Holmes 2',
    type: 'Movie',
    year: 2022,
    runtimeOrSeasons: '129 min',
    rating: 4.7,
    genres: ['Mystery', 'Adventure', 'Crime'],
    directorOrCreator: 'Harry Bradbeer',
    cast: ['Millie Bobby Brown', 'Henry Cavill', 'David Thewlis', 'Louis Partridge'],
    synopsis: 'Now a detective-for-hire, Enola Holmes takes on her first official case to find a missing girl, as the sparks of a dangerous conspiracy ignite a mystery that requires the help of friends — and Sherlock himself — to unravel.',
    criticalAnalysis: 'An exceptional sequel that expands both the emotional stakes and political depth of the franchise. It successfully ties its central mystery to the real-world historical Matchgirls\' Strike of 1888, creating a rich narrative tapestry of mystery and labor rights.',
    trivia: [
      'The movie features the historic Matchgirls Strike, celebrating Sarah Chapman, a pioneer for women\'s trade unionism in late 19th-century London.',
      'Henry Cavill\'s Sherlock Holmes plays a much larger role in this film, showcasing a warmer, more collaborative sibling dynamic.',
      'The chaotic dance sequence was rehearsed for weeks to perfect Millie Bobby Brown and Louis Partridge\'s playful, clumsy chemistry.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/f/f9/Enola_Holmes_2_poster.jpg',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com/title/81406266',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'The Match Factory scenes were filmed inside historic industrial warehouses in Hull, England, providing an authentic, gritty atmosphere.'
  },
  {
    id: 'enola-holmes-3',
    title: 'Enola Holmes 3',
    type: 'Movie',
    year: 2025,
    runtimeOrSeasons: '120 min',
    rating: 4.8,
    genres: ['Mystery', 'Adventure', 'Drama'],
    directorOrCreator: 'Harry Bradbeer',
    cast: ['Millie Bobby Brown', 'Henry Cavill', 'Louis Partridge', 'Helena Bonham Carter'],
    synopsis: 'Returning for her most sophisticated caper yet, Enola Holmes establishes her professional agency in the heart of London, decoding high-society espionage and industrial secrets alongside Sherlock, testing her brilliance against a rising criminal syndicate.',
    criticalAnalysis: 'A masterful evolution of the beloved series. It elevates Enola\'s investigative prowess into international espionage, blending witty drawing-room drama with high-stakes street chases while further deepening the brother-sister sleuthing relationship.',
    trivia: [
      'This film introduces several iconic characters from the classic Arthur Conan Doyle mythos in exciting, revised roles.',
      'The screenwriters consulted extensively with historians to depict the evolving espionage networks of the Victorian era with precision.',
      'Millie Bobby Brown described the physical demands of this film as the most rigorous in the entire trilogy.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=400&q=80',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'Production expanded into premium historic estates across Scotland to represent the opulent country homes of the high-society suspect pool.'
  },
  {
    id: 'from-series',
    title: 'FROM',
    type: 'Series',
    year: 2024,
    runtimeOrSeasons: '3 Seasons',
    rating: 4.9,
    genres: ['Thriller', 'Horror', 'Mystery', 'Sci-Fi'],
    directorOrCreator: 'John Griffin',
    cast: ['Harold Perrineau', 'Catalina Sandino Moreno', 'Eion Bailey', 'David Alpay'],
    synopsis: 'Unravel the mystery of a nightmarish town in middle America that traps everyone who enters. As the unwilling residents fight to keep a sense of normalcy and search for a way out, they must also survive the threats of the surrounding forest – including the terrifying creatures that come out when the sun goes down.',
    criticalAnalysis: 'A phenomenal, pulse-pounding supernatural thriller that evokes the best elements of Lost and classic Stephen King. It masterfully balances high-concept mystery boxes, psychological trauma, and visceral, terrifying monster encounters inside a claustrophobic town.',
    trivia: [
      'The series shares several executive producers with Lost, including Jack Bender, who directed multiple episodes.',
      'The eerie creatures do not run; their slow, smiling, deliberate walk was a creative choice to maximize psychological dread and highlight their total confidence.',
      'The town of FROM was constructed in its entirety on a custom set in Halifax, Nova Scotia, creating an incredibly creepy, real-world village.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/c/cb/From_TV_series_poster.jpg',
    streamingLinks: [
      {
        platform: 'Amazon Prime',
        url: 'https://www.amazon.com',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'The production team designed the surrounding forest with deep, dense pathways to make the daylight scenery feel just as imposing as the night.'
  },
  {
    id: 'widows-bay',
    title: 'Widow\'s Bay',
    type: 'Series',
    year: 2025,
    runtimeOrSeasons: '1 Season',
    rating: 4.8,
    genres: ['Horror', 'Thriller', 'Mystery', 'Drama'],
    directorOrCreator: 'Robert Eggers',
    cast: ['Willem Dafoe', 'Robert Pattinson', 'Florence Pugh', 'Mia Goth'],
    synopsis: 'A chilling maritime mystery set in a desolate New England coastal town where residents are haunted by deep-ocean anomalies and a historic curse. When an investigative journalist uncovers a century-old conspiracy linked to the local lighthouse, the boundary between local folklore and terrifying reality dissolves.',
    criticalAnalysis: 'A brilliantly atmospheric, slow-burn gothic masterpiece. With a focus on maritime folklore, sound-driven paranoia, and outstanding performances, the series delivers a haunting, visually stunning dissection of isolation and deep-sea mystery.',
    trivia: [
      'The show is shot using vintage anamorphic lenses to capture the soft, misty, dreamlike atmosphere of the seaside harbor.',
      'Willem Dafoe learned authentic late 19th-century sailors\' slang and shanties to add rugged realism to his performance as the lighthouse keeper.',
      'Sound designers spent weeks capturing real sounds of coastal winds, grinding tides, and harbor foghorns to create an immersive, unsettling audio landscape.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?auto=format&fit=crop&w=400&q=80',
    streamingLinks: [
      {
        platform: 'Amazon Prime',
        url: 'https://www.amazon.com',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'Shot on location along the rugged, windswept coastlines of Nova Scotia under actual stormy weather conditions to achieve maximum realism.'
  },
  {
    id: 'alice-in-borderland',
    title: 'Alice in Borderland',
    type: 'Series',
    year: 2023,
    runtimeOrSeasons: '2 Seasons',
    rating: 4.8,
    genres: ['Sci-Fi', 'Thriller', 'Drama', 'Mystery'],
    directorOrCreator: 'Shinsuke Sato',
    cast: ['Kento Yamazaki', 'Tao Tsuchiya', 'Nijiro Murakami', 'Ayaka Miyoshi'],
    synopsis: 'An aimless gamer and his two friends find themselves in a parallel Tokyo, where they are forced to compete in a series of sadistic games to survive.',
    criticalAnalysis: 'A phenomenal, high-octane adaptation of Haro Aso\'s manga. It elevates survival suspense into a philosophical examination of life\'s value, framed by spectacular CGI and complex physical puzzles.',
    trivia: [
      'The massive empty Shibuya Crossing in the opening episode was actually a massive open-air studio set built in Ashikaga City, Tochigi Prefecture.',
      'The difficulty levels and categories of the games are decided by playing cards, with Spades representing physical games, Clubs representing team cooperation, Diamonds representing mental intelligence, and Hearts representing psychological betrayal.',
      'The director, Shinsuke Sato, spent several months supervising the 3D green screen compositing to ensure that the physical shadows and ambient light matched Tokyo\'s actual solar angles.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/1/1d/Alice_in_Borderland_Season_1_poster.jpg',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com/title/80200575',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'Utilized specialized slow-motion Phantom cameras to capture the high-velocity shockwaves and debris during the major game arena explosions.'
  },
  {
    id: 'if-wishes-could-kill',
    title: 'If Wishes Could Kill',
    type: 'Series',
    year: 2025,
    runtimeOrSeasons: '1 Season',
    rating: 4.7,
    genres: ['Thriller', 'Mystery', 'Fantasy', 'Horror'],
    directorOrCreator: 'Mike Flanagan',
    cast: ['Victoria Pedretti', 'Oliver Jackson-Cohen', 'Carla Gugino', 'Rahul Kohli'],
    synopsis: 'In a quaint Pacific Northwest town, a cursed wishing well starts turning residents\' darkest subconscious wishes into terrifying, lethal realities. An investigative podcaster races against time to stop the supernatural carnage before the town consumes itself.',
    criticalAnalysis: 'A chilling, intellectually stimulating thriller that turns human desire into a weapon of horror. Directed with trademark emotional depth, it combines classic gothic horror tropes with modern psychological suspense.',
    trivia: [
      'To achieve the creepy wishing well animations, the designers blended organic water physics with state-of-the-art volumetric fluid simulations.',
      'The script is loosely inspired by old folklore tales about cursed wells and the psychological concept of intrusive thoughts.',
      'Each episode focuses on a different town resident\'s subconscious wish, revealing their deepest regrets and hidden sins.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1519074002996-a69e7ac46a42?auto=format&fit=crop&w=400&q=80',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'The sound design incorporates subtle whispers backwards in the background of wishing scenes to elevate auditory paranoia.'
  },
  {
    id: 'all-of-us-are-dead',
    title: 'All of Us Are Dead',
    type: 'Series',
    year: 2022,
    runtimeOrSeasons: '1 Season',
    rating: 4.7,
    genres: ['Horror', 'Action', 'Drama'],
    directorOrCreator: 'Lee Jq-kyu',
    cast: ['Park Ji-hu', 'Yoon Chan-young', 'Cho Yi-hyun', 'Lomon', 'Yoo In-soo'],
    synopsis: 'A high school becomes ground zero for a zombie virus outbreak. Trapped students must fight their way out — or turn into one of the rabid infected.',
    criticalAnalysis: 'A blistering, high-energy zombie horror that uses its high school setting to explore intense social dynamics, bullying, and systemic failure. The choreography of the fast-moving infected is exceptional, paired with creative use of school terrain for survival set-pieces.',
    trivia: [
      'The production built a massive, four-story school set that was nearly 100 meters long to allow the camera to follow actors during long, continuous combat and chase sequences.',
      'The infected actors underwent three months of rigorous physical training and bone-breaking choreography lessons under movement directors to master the terrifying jerky movements.',
      'The iconic cafeteria sequence was shot in one take, requiring perfect synchronization between over 200 actors, stunt performers, and camera operators.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/2/24/All_of_Us_Are_Dead_Netflix_poster.jpg',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com/title/81237994',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'Over 1,000 liters of synthetic blood and elaborate prosthetics were utilized on set, requiring a dedicated team of 40 makeup artists working on rotation.'
  },
  {
    id: 'voicemails-by-isabelle',
    title: 'Voicemails by Isabelle',
    type: 'Series',
    year: 2025,
    runtimeOrSeasons: '1 Season',
    rating: 4.8,
    genres: ['Mystery', 'Drama', 'Thriller'],
    directorOrCreator: 'Charlotte Wells',
    cast: ['Isabelle Huppert', 'Paul Mescal', 'Saoirse Ronan'],
    synopsis: 'After her sudden, unexplained disappearance, a daughter leaves behind a series of cryptic, haunting voicemails on her mother\'s phone. As her mother decodes the hidden references, she is drawn into a dark, elegant web of secrets, art forgery, and deep-seated family trauma across Paris.',
    criticalAnalysis: 'An exquisitely shot, deeply emotional mystery drama. The series treats sound as an active protagonist, where the haunting voice recordings guide the visual narrative through beautiful, melancholic European landscapes.',
    trivia: [
      'All the voicemails heard in the show were recorded live on real vintage tape and answering machine devices to capture authentic, analog audio degradation.',
      'The series was shot on location in Paris and the French Riviera during autumn to capture the cool, moody natural lighting.',
      'Charlotte Wells directed every episode, focusing heavily on quiet spaces, unspoken tensions, and the burden of grief.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=400&q=80',
    streamingLinks: [
      {
        platform: 'Disney+ Hotstar',
        url: 'https://www.hotstar.com',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'The production collaborated with modern classical composers to weave the answering machine sound frequencies directly into the orchestral score.'
  },
  {
    id: 'crash-landing-on-you',
    title: 'Crash Landing on You',
    type: 'Series',
    year: 2019,
    runtimeOrSeasons: '1 Season',
    rating: 4.9,
    genres: ['Romance', 'Comedy', 'Drama', 'Korean'],
    directorOrCreator: 'Lee Jeong-hyo',
    cast: ['Hyun Bin', 'Son Ye-jin', 'Seo Ji-hye', 'Kim Jung-hyun'],
    synopsis: 'The top-secret love story of a South Korean fashion heiress who accidentally paraglides into North Korea during a sudden windstorm, and a dedicated military officer who decides to hide and protect her.',
    criticalAnalysis: 'A cultural phenomenon that brilliantly balances geopolitical tension with heart-wrenching, operatic romance and high-stakes comedy. The genuine emotional chemistry between the lead actors Hyun Bin and Son Ye-jin elevated the series to a historic global classic.',
    trivia: [
      'The lead actors Hyun Bin and Son Ye-jin actually fell in love during the production of this series and later got married in real life, to the delight of millions of fans.',
      'North Korean defectors were hired on set as active consultants to ensure the accuracy of the dialects, domestic settings, and cultural behaviors depicted in the border village.',
      'The beautiful paragliding scenes and scenic romantic reunions were shot on location in the high peaks and lakes of Switzerland, specifically around Lake Brienz.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1531315630201-bb15abeb1653?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/6/64/Crash_Landing_on_You_poster.jpg',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com/title/81159258',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'The scriptwriter spent over a year researching defector testimonies to create a highly humanized, non-stereotypical depiction of North Korean village life and communities.'
  },
  {
    id: 'queen-of-tears',
    title: 'Queen of Tears',
    type: 'Series',
    year: 2024,
    runtimeOrSeasons: '1 Season',
    rating: 4.8,
    genres: ['Romance', 'Drama', 'Comedy', 'Korean'],
    directorOrCreator: 'Jang Young-woo, Kim Hee-won',
    cast: ['Kim Soo-hyun', 'Kim Ji-won', 'Park Sung-hoon', 'Kwak Dong-yeon'],
    synopsis: 'A miraculous love story of a married couple facing a critical crisis. The queen of department stores and her small-town husband must navigate marital dissolution, corporate greed, and terminal illness to rediscover their love.',
    criticalAnalysis: 'A stunningly acted and emotionally resonant melodrama that deconstructs the post-marriage disillusionment cycle with humor, high-stakes corporate intrigue, and exquisite emotional payoffs.',
    trivia: [
      'The series surpassed Crash Landing on You as the highest-rated drama series in tvN network history, reaching a peak viewership of 24.8%.',
      'Director Kim Hee-won utilizes sophisticated split-diopter camera techniques to capture both husband and wife in sharp focus during scenes of intense emotional distance.',
      'Much of the lavish corporate mansion scenes and romantic memories were filmed on location in Germany, including Berlin and Sanssouci Palace.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/5/52/Queen_of_Tears_poster.jpg',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com/title/81707950',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'The high-fashion corporate styling for actress Kim Ji-won involved custom pieces from Chanel, Dior, and Cartier, symbolizing her icy corporate shield.'
  },
  {
    id: 'past-lives',
    title: 'Past Lives',
    type: 'Movie',
    year: 2023,
    runtimeOrSeasons: '105 min',
    rating: 4.9,
    genres: ['Romance', 'Drama', 'Korean'],
    directorOrCreator: 'Celine Song',
    cast: ['Greta Lee', 'Teo Yoo', 'John Magaro'],
    synopsis: 'Two deeply connected childhood friends, Nora and Hae Sung, are wrest apart after Nora\'s family emigrates from South Korea. Two decades later, they are reunited in New York for one fateful week as they confront notions of destiny, love, and the choices that make a life.',
    criticalAnalysis: 'An incredibly elegant, quiet masterpiece that captures the philosophical concept of \'In-Yun\' (providence or fate) with profound restraint, outstanding cinematography, and devastating romantic yearning.',
    trivia: [
      'The film was nominated for Best Picture and Best Original Screenplay at the 96th Academy Awards, representing a triumph for director Celine Song\'s debut feature.',
      'To preserve genuine tension, Teo Yoo and John Magaro (playing the two rival love interests) were kept completely separated and did not meet in person until their characters met on-camera.',
      'The childhood scenes in Seoul were shot on location in real residential alleys, utilizing warm natural golden hours to signify childhood nostalgia.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/5/5f/Past_Lives_poster.jpeg',
    streamingLinks: [
      {
        platform: 'Amazon Prime',
        url: 'https://www.amazon.com/dp/past-lives',
        availableRegions: ['US', 'UK', 'IN'],
        priceTier: 'Premium Rent'
      }
    ],
    productionTrivia: 'Shot on premium 35mm film by cinematographer Shabier Kirchner to capture a soft, deeply textured grain that mirrors memory and time.'
  },
  {
    id: 'my-demon',
    title: 'My Demon',
    type: 'Series',
    year: 2023,
    runtimeOrSeasons: '1 Season',
    rating: 4.7,
    genres: ['Romance', 'Fantasy', 'Comedy', 'Korean'],
    directorOrCreator: 'Kim Jang-han',
    cast: ['Kim Yoo-jung', 'Song Kang', 'Lee Sang-yi'],
    synopsis: 'A devilish romance about a heartless demon who loses his powers overnight when they are accidentally transferred to a cold-hearted, wealthy heiress. The two must enter a contract marriage to protect her life and restore his supernatural abilities.',
    criticalAnalysis: 'A highly entertaining, visually stunning urban fantasy. Song Kang and Kim Yoo-jung provide superb bickering chemistry backed by stellar visual effects, gorgeous gothic styling, and high-fashion aesthetics.',
    trivia: [
      'Actor Song Kang trained in classical ballet and weight loss regimens to emphasize the elegant, razor-sharp, and supernatural physique of the demon Jeong Gu-won.',
      'The contract marriage contract written in the show features legalistic clauses written in ancient demonic sigils created by the prop design department.',
      'The series features a beautiful ambient score, with original soundtracks composed by prominent K-pop artists including NewJeans.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d4/My_Demon_poster.jpg',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com/title/81716168',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'The production leveraged complex real-time lighting arrays on set during supernatural time-stop sequences to capture organic reflections in the actor\'s eyes without heavy CGI post-processing.'
  },
  {
    id: 'shaitaan',
    title: 'Shaitaan',
    type: 'Movie',
    year: 2024,
    runtimeOrSeasons: '132 min',
    rating: 4.7,
    genres: ['Horror', 'Thriller', 'Mystery'],
    directorOrCreator: 'Vikas Bahl',
    cast: ['Ajay Devgn', 'R. Madhavan', 'Jyotika', 'Janki Bodiwala'],
    synopsis: 'A family vacation turns into a living nightmare when a mysterious stranger is invited into their home, slowly seizing control of their teenage daughter’s mind and body through sinister black magic.',
    criticalAnalysis: 'A phenomenal, nail-biting supernatural thriller that breathes new life into psychological horror. Driven by R. Madhavan’s absolutely terrifying, magnetic performance as the titular force of evil, the movie masterfully ratchets up tension using claustrophobic house settings and chilling puppet-master mechanics.',
    trivia: [
      'R. Madhavan spent weeks studying behavioral patterns of hypnosis and psychological suggestion to make his character’s manipulation feel eerily authentic.',
      'The haunting background chants and ambient score were recorded using raw, traditional wind instruments and tribal drums to maximize dread.',
      'The film is an official adaptation of the acclaimed Gujarati horror-thriller "Vash" but significantly escalates the visual effects and sound design.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/9/90/Shaitaan_2024_poster.jpg',
    streamingLinks: [
      {
        platform: 'Disney+ Hotstar',
        url: 'https://www.hotstar.com',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'Leveraged high-contrast, shadow-rich red and amber lighting schemes on set to symbolize the insidious, hot-blooded nature of the black magic possession.'
  },
  {
    id: 'the-last-of-us',
    title: 'The Last of Us',
    type: 'Series',
    year: 2023,
    runtimeOrSeasons: '1 Season',
    rating: 4.8,
    genres: ['Horror', 'Action', 'Drama', 'Sci-Fi'],
    directorOrCreator: 'Craig Mazin & Neil Druckmann',
    cast: ['Pedro Pascal', 'Bella Ramsey', 'Gabriel Luna', 'Anna Torv'],
    synopsis: 'After a global pandemic destroys civilization, a hardened survivor takes charge of a 14-year-old girl who may be humanity\'s last hope.',
    criticalAnalysis: 'Widely considered the greatest video game adaptation ever made. Pedro Pascal and Bella Ramsey provide stunning emotional depth, supported by unmatched practical makeup and a hauntingly beautiful cello soundtrack by Gustavo Santaolalla.',
    trivia: [
      'The infected Clickers were performed by real contortionists and dancers who spent weeks practicing jerky, non-human movements.',
      'To recreate the post-apocalyptic, overgrown cityscapes, the production team used millions of dollars worth of real flora placed across locations in Alberta.',
      'The third episode, "Long, Long Time", was hailed by critics as one of the finest hours of television drama in the last decade.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/c/c5/The_Last_of_Us_Season_1_poster.png',
    streamingLinks: [
      {
        platform: 'Disney+ Hotstar',
        url: 'https://www.hotstar.com',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'The sound team blended recordings of clicking dolphins and ancient door hinges to create the signature sound of the Clickers.'
  },
  {
    id: 'the-conjuring',
    title: 'The Conjuring',
    type: 'Movie',
    year: 2013,
    runtimeOrSeasons: '112 min',
    rating: 4.6,
    genres: ['Horror', 'Mystery', 'Thriller'],
    directorOrCreator: 'James Wan',
    cast: ['Vera Farmiga', 'Patrick Wilson', 'Lili Taylor', 'Ron Livingston'],
    synopsis: 'Paranormal investigators Ed and Lorraine Warren work to help a family confronting an extremely dark, demonic presence in their newly purchased farmhouse.',
    criticalAnalysis: 'A phenomenal classic of supernatural horror. James Wan demonstrates absolute mastery over timing, camera movement, and suspense, relying heavily on creeping dread rather than cheap jump scares.',
    trivia: [
      'The real-life Lorraine Warren served as a consultant on set and made sure the physical details of their paranormal museum were accurately represented.',
      'Vera Farmiga experienced unexplained phenomena during the shoot, including wakeful claw marks appearing on her computer screen.',
      'The film was so terrifying that the MPAA gave it an R rating purely for dread, without any significant blood or gore.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/1/18/The_Conjuring_poster.jpg',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com',
        availableRegions: ['US', 'UK', 'IN'],
        priceTier: 'Included'
      },
      {
        platform: 'Amazon Prime',
        url: 'https://www.amazon.com',
        availableRegions: ['US', 'IN'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'Filmed on location in a 19th-century farmhouse in North Carolina, with the cinematographic lights kept low to simulate oil-lamps.'
  },
  {
    id: 'jujutsu-kaisen',
    title: 'Jujutsu Kaisen',
    type: 'Series',
    year: 2023,
    runtimeOrSeasons: '2 Seasons',
    rating: 4.8,
    genres: ['Action', 'Fantasy', 'Anime'],
    directorOrCreator: 'Sunghoo Park / Shota Goshozono',
    cast: ['Junya Enoki', 'Yuma Uchida', 'Asami Seto', 'Yuichi Nakamura'],
    synopsis: 'A high school student swallows a cursed finger to save his classmates, becoming the vessel for the King of Curses. He is subsequently inducted into a secret society of Jujutsu Sorcerers to purge curses.',
    criticalAnalysis: 'An absolute tour de force of modern animation. Studio MAPPA delivers breathtaking, movie-quality kinetic fight choreography, paired with a complex, dark philosophical magic system and unforgettable characters.',
    trivia: [
      'The creator, Gege Akutami, drew major inspiration from legendary anime such as "Bleach", "Yu Yu Hakusho", and "Neon Genesis Evangelion".',
      'The "Shibuya Incident" arc took several years of planning and custom storyboarding to synchronize multiple intersecting combat sequences.',
      'The musical score masterfully blends hard electronic rock, jazz, and heavy orchestral pieces to complement the fast-paced action.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/4/46/Jujutsu_kaisen_poster.png',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      },
      {
        platform: 'Disney+ Hotstar',
        url: 'https://www.hotstar.com',
        availableRegions: ['IN'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'MAPPA applied custom digital paint techniques to simulate 90s ink-and-paint aesthetics for Gojo\'s hollow purple sequence.'
  },
  {
    id: 'parasite',
    title: 'Parasite',
    type: 'Movie',
    year: 2019,
    runtimeOrSeasons: '132 min',
    rating: 4.9,
    genres: ['Thriller', 'Drama', 'Korean'],
    directorOrCreator: 'Bong Joon Ho',
    cast: ['Song Kang-ho', 'Lee Sun-kyun', 'Cho Yeo-jeong', 'Choi Woo-shik'],
    synopsis: 'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
    criticalAnalysis: 'The historic winner of four Academy Awards, including Best Picture. Bong Joon Ho crafts an immaculate dark satirical thriller that is simultaneously hilarious, deeply unsettling, and tragically profound.',
    trivia: [
      'The ultra-modern house of the Park family was completely constructed from scratch by the production designers as a massive multi-million dollar set.',
      'Bong Joon Ho paced his screenplay so specifically that he knew exactly how many steps characters took up and down stairs to symbolize social mobility.',
      'The iconic "Ram-don" dish became a global culinary phenomenon shortly after the movie\'s release.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/5/53/Parasite2019poster.gif',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com',
        availableRegions: ['US', 'UK', 'IN'],
        priceTier: 'Included'
      },
      {
        platform: 'Amazon Prime',
        url: 'https://www.amazon.com',
        availableRegions: ['US', 'IN'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'Over 60% of the Kim family’s flooded neighborhood set was built inside an enormous water tank to perfectly control the water levels.'
  },
  {
    id: 'breaking-bad',
    title: 'Breaking Bad',
    type: 'Series',
    year: 2013,
    runtimeOrSeasons: '5 Seasons',
    rating: 4.9,
    genres: ['Drama', 'Thriller', 'Action'],
    directorOrCreator: 'Vince Gilligan',
    cast: ['Bryan Cranston', 'Aaron Paul', 'Anna Gunn', 'Bob Odenkirk'],
    synopsis: 'A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine with a former student to secure his family\'s future.',
    criticalAnalysis: 'Universally acclaimed as one of the greatest television series of all time. It is a immaculate study of character evolution and moral decay, with breathtaking tension and peerless desert cinematography.',
    trivia: [
      'Bryan Cranston actually learned how to chemically synthesize methamphetamine from a real DEA agent to ensure his hand actions on camera were 100% correct.',
      'The character of Jesse Pinkman was originally scheduled to be killed off in the ninth episode of Season 1, but Aaron Paul\'s incredible chemistry with Cranston saved the character.',
      'Vince Gilligan designed the wardrobe of each character to shift in color as their moral compass degraded over the seasons.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/7/7a/Breaking_Bad_title_card.png',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com/title/70143825',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'The show was shot on gorgeous 35mm film, giving the New Mexico deserts a gritty, organic warmth that feels incredibly cinematic.'
  },
  {
    id: 'brooklyn-nine-nine',
    title: 'Brooklyn Nine-Nine',
    type: 'Series',
    year: 2021,
    runtimeOrSeasons: '8 Seasons',
    rating: 4.8,
    genres: ['Comedy', 'Crime'],
    directorOrCreator: 'Dan Goor & Michael Schur',
    cast: ['Andy Samberg', 'Stephanie Beatriz', 'Terry Crews', 'Melissa Fumero', 'Andre Braugher'],
    synopsis: 'Jake Peralta, a talented but immature NYPD detective in Brooklyn\'s 99th Precinct, conflicts with his new stern commanding officer, Captain Raymond Holt.',
    criticalAnalysis: 'An absolute masterpiece of workplace comedy. Brooklyn Nine-Nine successfully blends rapid-fire, highly intelligent jokes with progressive social commentary and deeply compassionate, endearing characters.',
    trivia: [
      'Andy Samberg and Chelsea Peretti (Gina Linetti) actually went to the same elementary school in real life.',
      'Stephanie Beatriz (Rosa Diaz) originally auditioned for the role of Amy Santiago, but when she didn\'t get it, the creators wrote Rosa specifically for her.',
      'Captain Holt\'s signature unexpressive, deadpan demeanor was meticulously developed by Andre Braugher to highlight his dry intelligence.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/2/23/Brooklyn_Nine-Nine_season_8_poster.jpg',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'The cast was highly encouraged to improvise during takes, with many of the precinct\'s funniest cold opens being completely unscripted.'
  },
  {
    id: 'the-office',
    title: 'The Office',
    type: 'Series',
    year: 2013,
    runtimeOrSeasons: '9 Seasons',
    rating: 4.9,
    genres: ['Comedy'],
    directorOrCreator: 'Greg Daniels',
    cast: ['Steve Carell', 'Rainn Wilson', 'John Krasinski', 'Jenna Fischer', 'B.J. Novak'],
    synopsis: 'A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior, and tedium at a paper company in Scranton, Pennsylvania.',
    criticalAnalysis: 'The definitive workplace mockumentary. Steve Carell\'s brilliant portrayal of Michael Scott perfectly balances cringe comedy with unexpected moments of profound vulnerability and emotional resonance.',
    trivia: [
      'To make the mockumentary style authentic, the cameras were completely hidden behind physical office partitions, and the cast often didn\'t know which camera was actively filming them.',
      'John Krasinski (Jim) and B.J. Novak (Ryan) went to the same high school and played Little League baseball together.',
      'The theme song was chosen by a democratic vote among the cast members after listening to several options.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/5/58/TheOfficeS9Poster.jpg',
    streamingLinks: [
      {
        platform: 'Amazon Prime',
        url: 'https://www.amazon.com',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'The production team actually heated or cooled the office set to match Scranton weather so that the actors\' physical reactions to winter or summer felt natural.'
  },
  {
    id: 'modern-family',
    title: 'Modern Family',
    type: 'Series',
    year: 2020,
    runtimeOrSeasons: '11 Seasons',
    rating: 4.8,
    genres: ['Comedy', 'Romance'],
    directorOrCreator: 'Christopher Lloyd & Steven Levitan',
    cast: ['Ed O\'Neill', 'Sofía Vergara', 'Julie Bowen', 'Ty Burrell', 'Jesse Tyler Ferguson', 'Eric Stonestreet'],
    synopsis: 'Three different but related families face trials and tribulations in their own uniquely comedic ways in Los Angeles.',
    criticalAnalysis: 'An incredibly warm, witty, and fast-paced mockumentary that redefined the modern television family. By exploring diverse household structures with humor and deep empathy, it captured the universal, messy beauty of familial love.',
    trivia: [
      'The character of Phil Dunphy was written specifically for Ty Burrell after the creators worked with him on a previous pilot.',
      'Nolan Gould (Luke Dunphy) is actually a member of Mensa in real life, with an IQ of 150.',
      'Julie Bowen was pregnant with twins during the filming of the pilot episode, which required creative camera angles and cereal box placement to hide.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/a/ad/Modern_Family_Season_11_Poster.jpg',
    streamingLinks: [
      {
        platform: 'Disney+ Hotstar',
        url: 'https://www.hotstar.com',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'Leveraged high-mobility handheld camera rigs to capture split-second reaction shots, zoom-ins, and direct character looks that drive the mockumentary humor.'
  },
  {
    id: 'mad-max-fury-road',
    title: 'Mad Max: Fury Road',
    type: 'Movie',
    year: 2015,
    runtimeOrSeasons: '120 min',
    rating: 4.9,
    genres: ['Action', 'Sci-Fi', 'Adventure'],
    directorOrCreator: 'George Miller',
    cast: ['Tom Hardy', 'Charlize Theron', 'Nicholas Hoult', 'Hugh Keays-Byrne'],
    synopsis: 'In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search of her homeland with the aid of a group of female prisoners, a psychotic worshiper, and a drifter named Max.',
    criticalAnalysis: 'A masterful symphony of pure action. George Miller delivers one of the greatest action masterpieces in cinema history, boasting incredible real-world practical stunts, saturated desert palettes, and a relentless pace.',
    trivia: [
      'Over 80% of the visual effects in the film are real practical effects, including explosions, car crashes, and physical combat stunts.',
      'Charlize Theron shaved her head completely for the role of Imperator Furiosa and refused to wear a wig.',
      'The dynamic soundtrack was composed by Junkie XL (Tom Holkenborg) utilizing massive mechanical war drums.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/6/6e/Mad_Max_Fury_Road_poster.jpg',
    streamingLinks: [
      {
        platform: 'Amazon Prime',
        url: 'https://www.amazon.com',
        availableRegions: ['US', 'IN', 'JP'],
        priceTier: 'Included'
      },
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com',
        availableRegions: ['UK'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'Filmed primarily in the barren deserts of Namibia after unexpected rainfall turned the Australian outback green.'
  },
  {
    id: 'john-wick-4',
    title: 'John Wick: Chapter 4',
    type: 'Movie',
    year: 2023,
    runtimeOrSeasons: '169 min',
    rating: 4.8,
    genres: ['Action', 'Thriller', 'Crime'],
    directorOrCreator: 'Chad Stahelski',
    cast: ['Keanu Reeves', 'Donnie Yen', 'Bill Skarsgård', 'Laurence Fishburne'],
    synopsis: 'John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe.',
    criticalAnalysis: 'A glorious epic of bullet-ballet choreography. Keanu Reeves and Donnie Yen engage in incredibly designed combat sequences that raise action cinema to high fine-art status, framed by neon-soaked cinematography.',
    trivia: [
      'Keanu Reeves spent nearly twelve weeks in intense tactical gun-fu and driving training to execute the complex Paris Arc de Triomphe sequences.',
      'The legendary overhead Dragon\'s Breath shotgun sequence was inspired by the gameplay of top-down video games.',
      'Donnie Yen designed his own character\'s posture and combat details as a tribute to classic blind-swordsman cinema.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/9/90/John_Wick_Chapter_4_poster.jpg',
    streamingLinks: [
      {
        platform: 'Amazon Prime',
        url: 'https://www.amazon.com',
        availableRegions: ['US', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'The production took over five months of night-shoots across Berlin, Paris, and Tokyo to capture the dark, neon-soaked aesthetic.'
  },
  {
    id: 'rrr',
    title: 'RRR',
    type: 'Movie',
    year: 2022,
    runtimeOrSeasons: '187 min',
    rating: 4.9,
    genres: ['Action', 'Drama', 'History'],
    directorOrCreator: 'S.S. Rajamouli',
    cast: ['N.T. Rama Rao Jr.', 'Ram Charan', 'Ajay Devgn', 'Alia Bhatt'],
    synopsis: 'A fearless warrior on a secret rescue mission clashes with a brilliant police officer serving the British crown in 1920s India, forging an unbreakable bond of brotherhood.',
    criticalAnalysis: 'An incredibly grand, uninhibited celebration of maximalist action cinema. S.S. Rajamouli combines mythological grandeur, gravity-defying action, and sensational musical dance sequences into a global phenomenon.',
    trivia: [
      'The high-energy dance sequence "Naatu Naatu" won the Academy Award for Best Original Song, a historic first for an Indian production.',
      'The opening sequence introducing Ram Charan\'s character took over 30 days to shoot and featured thousands of real background actors.',
      'The two lead actors, Ram Charan and Jr. NTR, are real-life close friends, which made their intense screen chemistry incredibly natural.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d7/RRR_Poster.jpg',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      },
      {
        platform: 'Disney+ Hotstar',
        url: 'https://www.hotstar.com',
        availableRegions: ['IN'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'The production designed custom camera-rigs and heavy wireframes to handle the sensational double-action sequences where both leads are suspended in mid-air.'
  },
  {
    id: 'tumbbad',
    title: 'Tumbbad',
    type: 'Movie',
    year: 2018,
    runtimeOrSeasons: '104 min',
    rating: 4.8,
    genres: ['Horror', 'Fantasy', 'Mystery', 'Thriller'],
    directorOrCreator: 'Rahi Anil Barve',
    cast: ['Sohum Shah', 'Jyoti Malshe', 'Anita Date-Kelkar'],
    synopsis: 'A mythological story about a goddess who created the entire universe, her greedy firstborn son Hastar, and a family who builds a shrine to him in a rainy, cursed village, leading to catastrophic consequences.',
    criticalAnalysis: 'A phenomenal, visually breathtaking Indian horror masterpiece. Tumbbad is an atmospheric masterclass that blends folklore mythology, rich metaphorical greed, and spine-chilling creature design in endless rain.',
    trivia: [
      'The film took over six years to complete, as the directors insisted on filming the village of Tumbbad only during real, heavy monsoon seasons to get authentic rain lighting.',
      'Hastar’s design was sculpted entirely by hand, with CGI only used to enhance the terrifying movements in the womb chamber.',
      'The soundtrack was recorded in Budapest using live orchestral wind instruments to create a heavy, mythological soundscape.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/4/41/Tumbbad_poster.jpg',
    streamingLinks: [
      {
        platform: 'Amazon Prime',
        url: 'https://www.amazon.com',
        availableRegions: ['IN', 'US', 'UK'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'Filmed with ancient high-contrast lantern arrays inside real underground stone vaults to reflect the raw texture of historic rock.'
  },
  {
    id: 'hereditary',
    title: 'Hereditary',
    type: 'Movie',
    year: 2018,
    runtimeOrSeasons: '127 min',
    rating: 4.7,
    genres: ['Horror', 'Mystery', 'Drama'],
    directorOrCreator: 'Ari Aster',
    cast: ['Toni Collette', 'Alex Wolff', 'Milly Shapiro', 'Ann Dowd'],
    synopsis: 'When the matriarch of the Graham family passes away, her daughter and grandchildren begin to unravel cryptic and increasingly terrifying secrets about their ancestry.',
    criticalAnalysis: 'A devastating psychological tragedy disguised as a terrifying occult horror. Toni Collette’s powerhouse performance and Ari Aster’s precise, slow-creeping cinematography make it one of the most disturbing experiences in modern horror.',
    trivia: [
      'To make the family house feel uncannily artificial, the interior sets were completely built from scratch on a soundstage and shot with miniature-like camera movements.',
      'Alex Wolff actually insisted on smashing his head into the school desk for the classroom scene to make the sound and impact feel real.',
      'The clicking sound made by Charlie was written into the script to act as a Pavlovian trigger for absolute audience dread.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d9/Hereditary_poster.png',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com',
        availableRegions: ['US', 'IN'],
        priceTier: 'Included'
      },
      {
        platform: 'Amazon Prime',
        url: 'https://www.amazon.com',
        availableRegions: ['UK'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'The sound team used ultra-low 18Hz bass frequencies in the climax sequences to induce physical feelings of nausea and anxiety in theater audiences.'
  },
  {
    id: 'panchayat',
    title: 'Panchayat',
    type: 'Series',
    year: 2024,
    runtimeOrSeasons: '3 Seasons',
    rating: 4.8,
    genres: ['Comedy', 'Drama'],
    directorOrCreator: 'Deepak Kumar Mishra',
    cast: ['Jitendra Kumar', 'Raghubir Yadav', 'Neena Gupta', 'Faisal Malik'],
    synopsis: 'An engineering graduate, unable to find a suitable job, takes up the position of a secretary in a remote, underdeveloped panchayat office in rural India, confronting hilarious daily village issues.',
    criticalAnalysis: 'An incredibly charming, heartwarming, and realistic slice-of-life comedy. Panchayat relies on subtle, intelligent humor, stellar ensemble acting, and a beautiful depiction of rural Indian administrative quirks.',
    trivia: [
      'The village of Phulera is a real village in Madhya Pradesh where the entire crew lived and shot during peak summers.',
      'Neena Gupta and Raghubir Yadav, playing the village pradhan couple, have worked together for over 30 years across theater and television.',
      'The iconic office chair and the local handpump became major pop-culture memes following the series premiere.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/1/18/Panchayat_season_3_poster.jpg',
    streamingLinks: [
      {
        platform: 'Amazon Prime',
        url: 'https://www.amazon.com',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'Filmed on real locations with natural sunlight and ambient sounds of rural livestock, avoiding artificial studio acoustics to preserve the pure village atmosphere.'
  },
  {
    id: 'schitts-creek',
    title: "Schitt's Creek",
    type: 'Series',
    year: 2020,
    runtimeOrSeasons: '6 Seasons',
    rating: 4.8,
    genres: ['Comedy', 'Romance'],
    directorOrCreator: 'Daniel Levy & Eugene Levy',
    cast: ['Eugene Levy', 'Catherine O\'Hara', 'Dan Levy', 'Annie Murphy'],
    synopsis: 'When the wealthy Rose family suddenly finds themselves broke, they are forced to rebuild their empire in Schitt\'s Creek, a small, quirky town they once bought as a joke.',
    criticalAnalysis: 'A masterclass in character redemption and warm, compassionate humor. What starts as a satire of spoiled multi-millionaires evolves into one of the most loving, inclusive, and emotionally satisfying comedies on television.',
    trivia: [
      'Catherine O\'Hara (Moira Rose) personally designed her character\'s iconic, bizarre accent, combining various transatlantic vowel sounds and obsolete historical words.',
      'Dan Levy (David) and Eugene Levy (Johnny) are real-life father and son who co-created and wrote the entire series together.',
      'The luxury outfits worn by the Rose family were sourced from real high-end consignment stores and eBay on a tight budget.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/a/a3/Schitt%27s_Creek_logo.png',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com',
        availableRegions: ['US', 'UK', 'IN'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'Shot with high-definition digital cameras but stylized with warm, pastel color grades to emphasize the cozy town aesthetic against the family\'s monochrome wardrobe.'
  },
  {
    id: 'goblin',
    title: 'Goblin (Guardian: The Lonely and Great God)',
    type: 'Series',
    year: 2016,
    runtimeOrSeasons: '1 Season',
    rating: 4.9,
    genres: ['Korean', 'Romance', 'Fantasy', 'Drama'],
    directorOrCreator: 'Lee Eung-bok',
    cast: ['Gong Yoo', 'Kim Go-eun', 'Lee Dong-wook', 'Yoo In-na'],
    synopsis: 'An immortal goblin, seeking to end his eternal life, must find his human bride. Along the way, he cohabitates with a grim reaper who has forgotten his past life, leading to intersecting fated romances.',
    criticalAnalysis: 'An absolute masterpiece of fantasy romance. Boasting legendary screen chemistry between Gong Yoo and Kim Go-eun, stunning cinematography in Quebec and Seoul, and one of the highest-rated television soundtracks in Korean history.',
    trivia: [
      'The iconic soundtrack "Stay With Me" by Chanyeol and Punch became the first K-drama OST music video to surpass 400 million views on YouTube.',
      'The production shot gorgeous autumn foliage scenes on location in Quebec City, Canada, which became a popular tourist landmark for fans.',
      'Writer Kim Eun-sook spent over three years trying to cast Gong Yoo, who kept turning down drama roles before finally accepting this script.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/a/a2/Guardian_The_Lonely_and_Great_God_poster.png',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      },
      {
        platform: 'Disney+ Hotstar',
        url: 'https://www.hotstar.com',
        availableRegions: ['IN'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'Utilized state-of-the-art volumetric lighting and digital particle effects to animate the Goblin\'s magical sword and real-time temporal-stop sequences.'
  },
  {
    id: 'business-proposal',
    title: 'Business Proposal',
    type: 'Series',
    year: 2022,
    runtimeOrSeasons: '1 Season',
    rating: 4.8,
    genres: ['Korean', 'Romance', 'Comedy'],
    directorOrCreator: 'Park Seon-ho',
    cast: ['Ahn Hyo-seop', 'Kim Se-jeong', 'Kim Min-kyu', 'Seol In-ah'],
    synopsis: 'Shin Ha-ri goes on a blind date in place of her wealthy friend to scare the suitor away. But her plans unravel when he turns out to be her company\'s handsome, workaholic CEO, who proposes marriage.',
    criticalAnalysis: 'A delightful, high-speed romantic comedy that celebrates classic K-drama tropes. Driven by Kim Se-jeong\'s brilliant physical comedy and electric double-couple chemistry, the series became a global sensation for its sheer warmth and upbeat humor.',
    trivia: [
      'The show is based on the extremely popular web novel and webtoon of the same name, incorporating direct 2D comic animations in key transitions.',
      'Kim Se-jeong improvised the iconic scene where her character tries to act wild during the initial blind date to scare the CEO.',
      'The secondary romance couple (Kim Min-kyu and Seol In-ah) became just as popular as the leads, with their viral glasses-removal kiss scene trending globally.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/e/ed/Business_Proposal_TV_series.jpg',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'The production team hired real culinary food stylists to design the beautiful gourmet corporate meals featured in the food company development labs.'
  },
  {
    id: 'charade-1963',
    title: 'Charade',
    type: 'Movie',
    year: 1963,
    runtimeOrSeasons: '113 min',
    rating: 4.8,
    genres: ['Mystery', 'Romance', 'Thriller'],
    directorOrCreator: 'Stanley Donen',
    cast: ['Audrey Hepburn', 'Cary Grant', 'Walter Matthau', 'James Coburn'],
    synopsis: 'Romance and suspense ensue in Paris as Regina Lampert is pursued by several men who want a fortune her murdered husband stole, whilst she is aided by a charming stranger of questionable identity.',
    criticalAnalysis: 'Stanley Donen\'s thrilling, suspenseful, and glamorous cinematic classic. Widely known as "the best Hitchcock film that Alfred Hitchcock never made", it masterfully pairs Hepburn\'s wide-eyed elegance with Cary Grant\'s effortless charisma against a gorgeous Parisian backdrop.',
    trivia: [
      'Cary Grant was initially concerned about the 25-year age difference between himself and Audrey Hepburn, so the screenwriters adjusted the script to make her character pursue him.',
      'Because the film lacked a proper copyright notice in the credits, it entered the public domain in the United States immediately upon release in 1963.',
      'The movie\'s legendary Henry Mancini score was nominated for an Academy Award and features iconic Parisian accordion themes.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Charade_poster_1.jpg',
    streamingLinks: [
      {
        platform: 'Free Cinema',
        url: 'https://www.youtube.com/watch?v=W3i60M-k2wY',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'The opening titles, designed by legendary artist Maurice Binder, utilized continuous hand-made spirograph patterns to symbolize dizzying deception.',
    isPublicDomain: true,
    fullMovieYoutubeId: 'W3i60M-k2wY'
  },
  {
    id: 'night-of-the-living-dead',
    title: 'Night of the Living Dead',
    type: 'Movie',
    year: 1968,
    runtimeOrSeasons: '96 min',
    rating: 4.7,
    genres: ['Horror', 'Sci-Fi'],
    directorOrCreator: 'George A. Romero',
    cast: ['Duane Jones', 'Judith O\'Dea', 'Karl Hardman', 'Marilyn Eastman'],
    synopsis: 'A diverse, ragtag group of survivors barricade themselves inside an isolated Pennsylvania farmhouse to withstand the relentless assault of reanimated, flesh-eating ghouls.',
    criticalAnalysis: 'An absolute landmark of horror cinema. George A. Romero\'s gritty, raw, and low-budget masterpiece revolutionized the horror genre, birthing the modern zombie archetype and delivering deep, powerful subtexts regarding racial and social tension of 1960s America.',
    trivia: [
      'The film entered the public domain because the original theatrical distributor forgot to include a copyright notice on the prints after changing the film\'s title from "Night of the Flesh Eaters".',
      'The "blood" used during shooting was actually Bosco Chocolate Syrup, which showed up as perfect dark fluids on high-contrast black-and-white film.',
      'Duane Jones was cast purely because he gave the best audition, making the film highly revolutionary for featuring an African-American lead actor in a non-stereotypical role.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Night_of_the_living_dead_poster.jpg',
    streamingLinks: [
      {
        platform: 'Free Cinema',
        url: 'https://www.youtube.com/watch?v=h8s8P9LCHV8',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'Filmed on an ultra-lean $114,000 budget using a hand-cranked 35mm camera, utilizing natural outdoor fog and headlights for atmospheric lighting.',
    isPublicDomain: true,
    fullMovieYoutubeId: 'h8s8P9LCHV8'
  },
  {
    id: 'the-general-1926',
    title: 'The General',
    type: 'Movie',
    year: 1926,
    runtimeOrSeasons: '79 min',
    rating: 4.9,
    genres: ['Action', 'Comedy'],
    directorOrCreator: 'Buster Keaton & Clyde Bruckman',
    cast: ['Buster Keaton', 'Marion Mack', 'Glen Cavender'],
    synopsis: 'When Union spies steal his beloved locomotive, a brave Confederate engineer chases them single-handedly through enemy lines, performing death-defying stunts along the way.',
    criticalAnalysis: 'Widely celebrated as one of the greatest movies ever made. Buster Keaton\'s silent comedy masterpiece features flawless physical humor, meticulous visual framing, and some of the most complex, spectacular, and dangerous stunts in film history.',
    trivia: [
      'Buster Keaton performed all of his own legendary stunts, including riding on the massive moving side-rods of the locomotive steam engine.',
      'The scene where a real steam locomotive falls through a burning wooden bridge was the most expensive single shot in silent film history, costing $42,000 in 1926.',
      'Under United States copyright laws, silent films made before 1929 have expired and entered the public domain, allowing legal public viewing worldwide.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/The_General_%281926_film_poster%29.jpg',
    streamingLinks: [
      {
        platform: 'Free Cinema',
        url: 'https://www.youtube.com/watch?v=iH7H8wYp_D8',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'The crew laid real, fully-functioning narrow-gauge railway tracks in the Oregon wilderness to capture authentic moving high-speed train perspectives.',
    isPublicDomain: true,
    fullMovieYoutubeId: 'iH7H8wYp_D8'
  },
  {
    id: 'his-girl-friday-1940',
    title: 'His Girl Friday',
    type: 'Movie',
    year: 1940,
    runtimeOrSeasons: '92 min',
    rating: 4.8,
    genres: ['Comedy', 'Romance'],
    directorOrCreator: 'Howard Hawks',
    cast: ['Cary Grant', 'Rosalind Russell', 'Ralph Bellamy'],
    synopsis: 'A flamboyant newspaper editor uses every sneaky trick in the book to prevent his star reporter and ex-wife from marrying another man and retiring from the news business.',
    criticalAnalysis: 'The absolute pinnacle of screwball comedy. Famous for its lightning-fast, overlapping dialogue (spoken at an average of 240 words per minute), Howard Hawks\' film is a hilarious, cynical, and incredibly witty commentary on yellow journalism and romance.',
    trivia: [
      'To achieve the overlapping dialogue, Hawks had his actors start speaking their lines before the previous actor finished, using custom multi-mic sound recording arrays.',
      'The film is an adaptation of the stage play "The Front Page". Hawks had the revolutionary idea to change the male lead reporter character into a woman, creating a high-energy romance.',
      'A failure to renew the film\'s copyright in 1967 caused it to enter the public domain, leading to its widespread distribution and legendary cult status.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/23/His_Girl_Friday_poster.jpg',
    streamingLinks: [
      {
        platform: 'Free Cinema',
        url: 'https://www.youtube.com/watch?v=9eB3N6e0Sdg',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'Utilized real high-density carbon-arc spotlights inside the simulated newsrooms to recreate the high-contrast atmosphere of busy 1940s printing offices.',
    isPublicDomain: true,
    fullMovieYoutubeId: '9eB3N6e0Sdg'
  }
];

export const CURATED_CATALOG: Movie[] = RAW_CATALOG.map(movie => ({
  ...movie,
  posterUrl: getProxiedUrl(movie.posterUrl),
  backdropUrl: getProxiedUrl(movie.backdropUrl)
}));

export const TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    title: 'CineWorld Luxury Edition',
    subtitle: 'Premium Luxury Entertainment Encyclopedia',
    searchPlaceholder: 'Search catalog or command...',
    speakTooltip: 'Voice commands (Press and speak e.g. "show action", "reset")',
    suggestedForYou: 'Suggested For You',
    personalizedMatrix: 'Personalized Matrix',
    streamingHub: 'Centralized Streaming Integration Hub',
    allShows: 'Curated Master Catalog',
    watchlist: 'Your Watchlist',
    ratingsAndReviews: 'Ratings & Critical Reviews',
    writeReview: 'Write a critical review...',
    submitReview: 'Submit Review',
    regionLabel: 'Your Geolocation Telemetry:',
    languageLabel: 'Language Setting:',
    genresLabel: 'Genres:',
    creatorLabel: 'Creator:',
    castLabel: 'Cast Ensemble:',
    synopsisLabel: 'Synopsis:',
    criticalAnalysisLabel: 'Critical Analysis:',
    triviaLabel: 'Production Secrets & Trivia:',
    streamBadgeLabel: 'Launch Stream',
    noStreamRegion: 'Unavailable in selected region',
    ratingSubmitted: 'Rating saved to recommendation matrix.',
    reviewSubmitted: 'Critical review recorded in local ledger.',
    addedToWatchlist: 'Added to your exclusive luxury queue.',
    removedFromWatchlist: 'Removed from your exclusive queue.',
    chatbotTitle: 'CineWorld Discovery Chatbot',
    chatbotSubtitle: 'AI Assistant • Connected to Live Metadata',
    chatPlaceholder: 'Ask CineWorld AI (e.g. "What is Stranger Things?")',
    voiceActive: 'Voice listening...',
    voiceInstruction: 'Click Mic, then speak commands like "show Sci-Fi", "Netflix", "reset", "view Loki"',
    emptyWatchlist: 'Your exclusive watchlist queue is empty. Bookmark content below.',
    highlyRecommended: 'Highly Recommended Correlation',
    suggestedMatch: 'Matching index based on rating patterns and genre click frequency.'
  },
  hi: {
    title: 'सिनेवर्ल्ड लक्जरी संस्करण',
    subtitle: 'प्रीमियम लक्जरी मनोरंजन विश्वकोश',
    searchPlaceholder: 'कैटलॉग या कमांड खोजें...',
    speakTooltip: 'आवाज आदेश (दबाएं और बोलें जैसे "show action", "reset")',
    suggestedForYou: 'आपके लिए अनुशंसित',
    personalizedMatrix: 'व्यक्तिगत सिफ़ारिश मैट्रिक्स',
    streamingHub: 'केंद्रीकृत स्ट्रीमिंग एकीकरण हब',
    allShows: 'क्यूरेटेड मास्टर कैटलॉग',
    watchlist: 'आपकी वॉचलिस्ट',
    ratingsAndReviews: 'रेटिंग और गंभीर समीक्षाएं',
    writeReview: 'एक गंभीर समीक्षा लिखें...',
    submitReview: 'समीक्षा सबमिट करें',
    regionLabel: 'आपका भू-स्थान टेलीमेट्री:',
    languageLabel: 'भाषा सेटिंग:',
    genresLabel: 'शैलियां:',
    creatorLabel: 'निर्माता:',
    castLabel: 'कलाकार समूह:',
    synopsisLabel: 'सारांश:',
    criticalAnalysisLabel: 'महत्वपूर्ण विश्लेषण:',
    triviaLabel: 'उत्पादन रहस्य और सामान्य ज्ञान:',
    streamBadgeLabel: 'स्ट्रीम लॉन्च करें',
    noStreamRegion: 'चयनित क्षेत्र में अनुपलब्ध',
    ratingSubmitted: 'रेटिंग सिफ़ारिश मैट्रिक्स में सहेजी गई।',
    reviewSubmitted: 'स्थानीय बहीखाते में दर्ज की गई समीक्षा।',
    addedToWatchlist: 'आपकी विशेष लक्जरी कतार में जोड़ा गया।',
    removedFromWatchlist: 'आपकी विशेष कतार से हटा दिया गया।',
    chatbotTitle: 'सिनेवर्ल्ड खोज चैटबॉट',
    chatbotSubtitle: 'एआई सहायक • लाइव मेटाडेटा से जुड़ा हुआ',
    chatPlaceholder: 'सिनेवर्ल्ड एआई से पूछें (जैसे "What is Stranger Things?")',
    voiceActive: 'आवाज सुनी जा रही है...',
    voiceInstruction: 'माइक पर क्लिक करें, फिर "show Sci-Fi", "Netflix", "reset", "view Loki" जैसे कमांड बोलें',
    emptyWatchlist: 'आपकी वॉचलिस्ट कतार खाली है। नीचे से बुकमार्क करें।',
    highlyRecommended: 'अत्यधिक अनुशंसित सहसंबंध',
    suggestedMatch: 'रेटिंग पैटर्न और शैली क्लिक आवृत्ति के आधार पर मिलान सूचकांक।'
  },
  ar: {
    title: 'سينما العالم النسخة الفاخرة',
    subtitle: 'موسوعة الترفيه الفاخرة المتميزة',
    searchPlaceholder: 'البحث في الكتالوج أو الأوامر...',
    speakTooltip: 'الأوامر الصوتية (اضغط وتحدث مثل "show action", "reset")',
    suggestedForYou: 'مقترح لك',
    personalizedMatrix: 'مصفوفة التوصيات الشخصية',
    streamingHub: 'مركز التكامل الموحد للبث المباشر',
    allShows: 'الكتالوج الرئيسي المنسق',
    watchlist: 'قائمة المشاهدة الخاصة بك',
    ratingsAndReviews: 'التقييمات والمراجعات النقدية',
    writeReview: 'اكتب مراجعة نقدية...',
    submitReview: 'إرسال المراجعة',
    regionLabel: 'قياس التتبع الجغرافي الخاص بك:',
    languageLabel: 'إعداد اللغة:',
    genresLabel: 'الأنواع:',
    creatorLabel: 'المبدع:',
    castLabel: 'طاقم العمل والتمثيل:',
    synopsisLabel: 'ملخص القصة:',
    criticalAnalysisLabel: 'التحليل النقدي:',
    triviaLabel: 'أسرار الإنتاج والحقائق:',
    streamBadgeLabel: 'بدء البث',
    noStreamRegion: 'غير متوفر في المنطقة المحددة',
    ratingSubmitted: 'تم حفظ التقييم في مصفوفة التوصيات.',
    reviewSubmitted: 'تم تسجيل المراجعة النقدية في الدفتر المحلي.',
    addedToWatchlist: 'تمت الإضافة إلى طابور المشاهدة الفاخر الخاص بك.',
    removedFromWatchlist: 'تمت الإزالة من طابور المشاهدة الفاخر الخاص بك.',
    chatbotTitle: 'روبوت ديسكفري الذكي',
    chatbotSubtitle: 'مساعد ذكاء اصطناعي • متصل ببيانات حية',
    chatPlaceholder: 'اسأل ذكاء سينما العالم الاصطناعي...',
    voiceActive: 'جاري الاستماع للصوت...',
    voiceInstruction: 'انقر فوق الميكروفون، ثم تحدث بأوامر مثل "show Sci-Fi" أو "Netflix" أو "reset" أو "view Loki"',
    emptyWatchlist: 'قائمة المشاهدة الخاصة بك فارغة. احفظ المحتوى من الأسفل.',
    highlyRecommended: 'ارتباط موصى به للغاية',
    suggestedMatch: 'مؤشر المطابقة بناءً على أنماط التقييم وتكرار النقر على الأنواع.'
  },
  ja: {
    title: 'CineWorld ラグジュアリー・エディション',
    subtitle: 'プレミアム・ラグジュアリー・エンターテインメント百科事典',
    searchPlaceholder: 'カタログやコマンドを検索...',
    speakTooltip: '音声コマンド (「show action」、「reset」など長押しして話します)',
    suggestedForYou: 'あなたへのおすすめ',
    personalizedMatrix: 'パーソナライズ推奨マトリクス',
    streamingHub: '集中型ストリーミング統合ハブ',
    allShows: '厳選マスターカタログ',
    watchlist: 'ウィッシュリスト',
    ratingsAndReviews: '評価と批評レビュー',
    writeReview: '批評レビューを書く...',
    submitReview: 'レビューを送信',
    regionLabel: '現在地テレメトリ:',
    languageLabel: '言語設定:',
    genresLabel: 'ジャンル:',
    creatorLabel: 'クリエイター:',
    castLabel: 'メインキャスト:',
    synopsisLabel: 'あらすじ:',
    criticalAnalysisLabel: '批評的分析:',
    triviaLabel: '制作の裏話とトリビア:',
    streamBadgeLabel: '配信を起動',
    noStreamRegion: '選択された地域では利用できません',
    ratingSubmitted: '評価がレコメンデーションマトリクスに保存されました。',
    reviewSubmitted: '批評レビューがローカルレジャーに記録されました。',
    addedToWatchlist: '高級ウォッチリストに追加されました。',
    removedFromWatchlist: 'ウォッチリストから削除されました。',
    chatbotTitle: 'CineWorld 発見チャットボット',
    chatbotSubtitle: 'AIアシスタント • ライブメタデータ接続',
    chatPlaceholder: 'AIに質問する (例: "Stranger Thingsとは何ですか？")',
    voiceActive: '音声を認識中...',
    voiceInstruction: 'マイクをクリックして、「show Sci-Fi」「Netflix」「reset」「view Loki」などの音声コマンドを話します。',
    emptyWatchlist: 'ウィッシュリストは空です。以下の作品をブックマークしてください。',
    highlyRecommended: '非常におすすめの相関関係',
    suggestedMatch: '評価パターンとジャンルクリック頻度に基づくマッチング指数。'
  },
  es: {
    title: 'CineWorld Edición de Lujo',
    subtitle: 'Enciclopedia de Entretenimiento Premium de Lujo',
    searchPlaceholder: 'Buscar catálogo o comando...',
    speakTooltip: 'Comandos de voz (Presione y hable, ej: "show action", "reset")',
    suggestedForYou: 'Sugerido Para Ti',
    personalizedMatrix: 'Matriz de Recomendaciones Personalizadas',
    streamingHub: 'Hub Centralizado de Integración de Streaming',
    allShows: 'Catálogo Maestro Curado',
    watchlist: 'Tu Lista de Seguimiento',
    ratingsAndReviews: 'Calificaciones y Reseñas Críticas',
    writeReview: 'Escribir una reseña crítica...',
    submitReview: 'Enviar Reseña',
    regionLabel: 'Telemetría de Geolocalización:',
    languageLabel: 'Configuración de Idioma:',
    genresLabel: 'Géneros:',
    creatorLabel: 'Creador:',
    castLabel: 'Reparto Principal:',
    synopsisLabel: 'Sinopsis:',
    criticalAnalysisLabel: 'Análisis Crítico:',
    triviaLabel: 'Secretos de Producción y Trivia:',
    streamBadgeLabel: 'Iniciar Streaming',
    noStreamRegion: 'No disponible en la región seleccionada',
    ratingSubmitted: 'Calificación guardada en la matriz de recomendación.',
    reviewSubmitted: 'Reseña crítica registrada en el libro local.',
    addedToWatchlist: 'Agregado a tu lista exclusiva de lujo.',
    removedFromWatchlist: 'Eliminado de tu lista exclusiva.',
    chatbotTitle: 'Chatbot de Descubrimiento CineWorld',
    chatbotSubtitle: 'Asistente de IA • Conectado a Metadatos',
    chatPlaceholder: 'Preguntar a CineWorld AI (ej: "¿Qué es Stranger Things?")',
    voiceActive: 'Escuchando voz...',
    voiceInstruction: 'Haz clic en el micrófono y habla comandos como "show Sci-Fi", "Netflix", "reset", "view Loki"',
    emptyWatchlist: 'Tu lista exclusiva está vacía. Añade marcadores abajo.',
    highlyRecommended: 'Correlación Altamente Recomendada',
    suggestedMatch: 'Índice de coincidencia basado en patrones de calificación y frecuencia de clics de género.'
  }
};
