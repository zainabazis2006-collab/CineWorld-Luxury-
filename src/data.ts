import { Movie } from './types';

export function getProxiedUrl(url: string): string {
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
  },
  {
    id: 'deadpool-and-wolverine',
    title: 'Deadpool & Wolverine',
    type: 'Movie',
    year: 2024,
    runtimeOrSeasons: '128 min',
    rating: 4.8,
    genres: ['Action', 'Comedy', 'Sci-Fi'],
    directorOrCreator: 'Shawn Levy',
    cast: ['Ryan Reynolds', 'Hugh Jackman', 'Emma Corrin', 'Matthew Macfadyen'],
    synopsis: 'A listless Wade Wilson toils in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.',
    criticalAnalysis: 'A high-octane, self-referential multiverse romp that brilliantly pairs Ryan Reynolds\' sharp-tongued humor with Hugh Jackman\'s raw, iconic physical intensity. It serves as both a love letter and a cheeky satire of comic book cinema.',
    trivia: [
      'Hugh Jackman underwent a rigorous six-month physical training and diet regimen to get back into peak Wolverine shape.',
      'The movie is the first R-rated film in the Marvel Cinematic Universe.',
      'Numerous cameos were kept completely secret during filming by using closed sets, fake script pages, and elaborate body-cloaking ponchos.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/4/4c/Deadpool_%26_Wolverine_poster.jpg',
    streamingLinks: [
      {
        platform: 'Disney+ Hotstar',
        url: 'https://www.disneyplus.com',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'Utilized state-of-the-art virtual production stages combined with extensive practical location shoots in London and Vancouver.'
  },
  {
    id: 'gladiator-2',
    title: 'Gladiator II',
    type: 'Movie',
    year: 2024,
    runtimeOrSeasons: '148 min',
    rating: 4.6,
    genres: ['Action', 'Drama', 'History'],
    directorOrCreator: 'Ridley Scott',
    cast: ['Paul Mescal', 'Pedro Pascal', 'Denzel Washington', 'Connie Nielsen'],
    synopsis: 'Years after witnessing the death of the revered hero Maximus at the hands of his uncle, Lucius is forced to enter the Colosseum after his home is conquered by the tyrannical Emperors who now lead Rome with an iron fist.',
    criticalAnalysis: 'Ridley Scott returns to the sand and blood with a breathtaking visual spectacle of imperial corruption and gladiatorial combat. Paul Mescal delivers a powerful, physical performance, while Denzel Washington steals the show with his magnetic, manipulative charisma.',
    trivia: [
      'Paul Mescal gained over 18 pounds of muscle to prepare for the physically demanding combat sequences in the arena.',
      'A massive, fully-functional replica of the Roman Colosseum was constructed at Malta to film the crowd and battle scenes practically.',
      'The movie features elaborate naval battles inside a flooded Colosseum, recreating historical "naumachia" spectacles with outstanding realism.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/e/e3/Gladiator_II_theatrical_poster.jpg',
    streamingLinks: [
      {
        platform: 'Amazon Prime',
        url: 'https://www.amazon.com',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Premium Rent'
      }
    ],
    productionTrivia: 'Employed sophisticated AI crowd-generation systems to realistically render over 50,000 active, reactive spectators in the Colosseum seats.'
  },
  {
    id: 'severance-series',
    title: 'Severance',
    type: 'Series',
    year: 2022,
    runtimeOrSeasons: '2 Seasons',
    rating: 4.9,
    genres: ['Sci-Fi', 'Drama', 'Mystery'],
    directorOrCreator: 'Ben Stiller',
    cast: ['Adam Scott', 'Patricia Arquette', 'John Turturro', 'Christopher Walken'],
    synopsis: 'Mark leads a team of office workers whose memories have been surgically divided between their work and personal lives. When a mysterious colleague appears outside of work, it begins a journey to discover the truth about their jobs.',
    criticalAnalysis: 'A masterclass in dystopian mystery and mid-century corporate satire. Ben Stiller\'s precise, sterile visual framing perfectly matches the spine-chilling existential dread of the narrative, supported by spectacular ensemble performances.',
    trivia: [
      'The striking, endless white corridors of Lumon Industries were constructed on a massive soundstage to allow for continuous, uninterrupted walking shots.',
      'Actors had to practice a specific, slightly robotic walking style to emphasize the unnatural nature of the "severed" office space.',
      'The mysterious, colorful abstract art pieces shown in the hallways were custom-painted by a team of production designers to feel subtly unsettling.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/e/e0/Severance_TV_series_poster.jpg',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://tv.apple.com',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'Used a highly controlled color palette, strictly forbidding any natural green or warm orange tones inside the Lumon office sets to heighten the sterile aesthetic.',
    seasonsCount: 2
  },
  {
    id: 'house-of-the-dragon',
    title: 'House of the Dragon',
    type: 'Series',
    year: 2022,
    runtimeOrSeasons: '2 Seasons',
    rating: 4.8,
    genres: ['Drama', 'Fantasy', 'Action'],
    directorOrCreator: 'Ryan Condal',
    cast: ['Emma D\'Arcy', 'Matt Smith', 'Olivia Cooke', 'Rhys Ifans'],
    synopsis: 'An internal succession war within House Targaryen, set 200 years before the events of Game of Thrones, during the height of their reign with dragons.',
    criticalAnalysis: 'A magnificent, character-driven political tragedy that recaptures the intricate backstabbing and soaring scale of Westeros at its peak. The incredible conflict between Rhaenyra Targaryen and Alicent Hightower is beautifully realized with intense emotional depth.',
    trivia: [
      'Each of the dragons in the show was designed with a unique personality, color scheme, and aerodynamic flight style to make them instantly recognizable.',
      'The massive King\'s Landing court set was built as a multi-level practical structure to allow actors to navigate the red keep naturally.',
      'Matt Smith performed many of his sword-fighting stunts himself, working extensively with stunt coordinators to craft Daemon Targaryen\'s brutal combat style.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/d/di/House_of_the_Dragon_season_2_poster.jpg',
    streamingLinks: [
      {
        platform: 'Amazon Prime',
        url: 'https://www.max.com',
        availableRegions: ['US', 'UK'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'Utilized cutting-edge LED volume screens (The StageCraft) to simulate realistic sky, clouds, and lighting environments for the complex dragon-riding sequences.',
    seasonsCount: 2
  },
  {
    id: 'lovely-runner',
    title: 'Lovely Runner',
    type: 'Series',
    year: 2024,
    runtimeOrSeasons: '1 Season',
    rating: 4.9,
    genres: ['Romance', 'Comedy', 'Fantasy'],
    directorOrCreator: 'Yoon Jong-ho',
    cast: ['Byeon Woo-seok', 'Kim Hye-yoon', 'Song Geon-hee', 'Lee Seung-hyub'],
    synopsis: 'A passionate fan of a top star travels back in time to his high school days after his tragic demise, determined to change his fate and save him from his future.',
    criticalAnalysis: 'A brilliant, heartfelt blend of time-travel mystery, youthful nostalgia, and sparkling romantic comedy. The remarkable chemistry between Byeon Woo-seok and Kim Hye-yoon creates an emotionally gripping and incredibly charming masterpiece that became a global phenomenon.',
    trivia: [
      'Byeon Woo-seok sang the lead vocals for the tracks performed by his fictional band Eclipse, which went on to top real-world music charts in Korea.',
      'Kim Hye-yoon had to portray her character across three different age periods (teenager, 20s, and 30s), subtly adjusting her speech and posture for each.',
      'The iconic yellow umbrella scene was filmed during a real cherry blossom shower to capture the perfect dreamy, romantic aesthetic.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/e/e0/Lovely_Runner_poster.png',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      },
      {
        platform: 'Amazon Prime',
        url: 'https://www.amazon.com',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'Utilized high-speed anamorphic lenses during the time-travel sequences to evoke a warm, nostalgic retro feeling reminiscent of the early 2000s.',
    seasonsCount: 1
  },
  {
    id: 'talk-to-me',
    title: 'Talk to Me',
    type: 'Movie',
    year: 2023,
    runtimeOrSeasons: '95 min',
    rating: 4.7,
    genres: ['Horror', 'Thriller'],
    directorOrCreator: 'Danny & Michael Philippou',
    cast: ['Sophie Wilde', 'Alexandra Jensen', 'Joe Bird', 'Otis Dhanji'],
    synopsis: 'When a group of friends discover how to conjure spirits using an embalmed hand, they become hooked on the new thrill, until one of them goes too far and opens the door to terrifying supernatural forces.',
    criticalAnalysis: 'A relentlessly terrifying, modern supernatural thriller that uses possession as a brilliant, haunting metaphor for teenage addiction and grief. Sophie Wilde delivers a stunning, visceral performance in a film packed with genuine dread and innovative horror choreography.',
    trivia: [
      'The directors, Danny and Michael Philippou, are famous Australian YouTubers (RackaRacka) who financed a major portion of the movie independently to maintain full creative control.',
      'The creepy ceramic hand used in the movie was custom-designed with subtle, disturbing inscriptions carved into its surface.',
      'To make the possession scenes feel raw and believable, the directors instructed actors to avoid typical cinematic head-twisting and focus on erratic, physical body language.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/2/22/Talk_to_Me_poster.jpg',
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
        availableRegions: ['US', 'UK', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'Captured using special wide-angle lenses paired with ultra-realistic practical makeup and prosthetic effects, minimizing CGI to maximize visceral, real-world horror.'
  },
  {
    id: 'the-queens-gambit',
    title: "The Queen's Gambit",
    type: 'Series',
    year: 2020,
    runtimeOrSeasons: '1 Season',
    rating: 4.8,
    genres: ['Drama'],
    directorOrCreator: 'Scott Frank',
    cast: ['Anya Taylor-Joy', 'Bill Camp', 'Marielle Heller', 'Thomas Brodie-Sangster'],
    synopsis: 'Orphaned at the tender age of nine, prodigious introvert Beth Harmon discovers and masters the game of chess in 1960s USA. But child stardom comes at a price.',
    criticalAnalysis: 'A visually breathtaking, meticulously paced character study that turns the cerebral game of chess into an edge-of-your-seat thriller. Anya Taylor-Joy is magnetic, supported by a rich mid-century aesthetic and brilliant costume design.',
    trivia: [
      'Garry Kasparov and Bruce Pandolfini served as chess consultants to ensure every single chess board and move shown on screen was historically accurate.',
      'Anya Taylor-Joy had never played chess competitively before taking the role, learning the choreography of the pieces minutes before each scene was shot.',
      'Following the series launch, search queries for "how to play chess" hit a nine-year peak, and chess set sales increased by over 125% globally.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/1/12/The_Queen%27s_Gambit_%28miniseries%29.png',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com/title/81040344',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'The chess games were filmed using real tournaments as blueprints, with actors learning the precise rhythm of piece-captures like a musical score.',
    seasonsCount: 1
  },
  {
    id: 'narcos-series',
    title: 'Narcos',
    type: 'Series',
    year: 2015,
    runtimeOrSeasons: '3 Seasons',
    rating: 4.8,
    genres: ['Crime', 'Drama', 'Action'],
    directorOrCreator: 'Carlo Bernard',
    cast: ['Wagner Moura', 'Boyd Holbrook', 'Pedro Pascal', 'Joanna Christie'],
    synopsis: 'A chronicled look at the criminal exploits of Colombian drug lord Pablo Escobar, as well as the many other drug kingpins who plagued the country through the years.',
    criticalAnalysis: 'A gritty, fast-paced, and highly informative docu-drama that masterfully blends historical archive footage with intense dramatic tension. Wagner Moura delivers a towering, chillingly human performance as Pablo Escobar.',
    trivia: [
      'Wagner Moura had to gain over 40 pounds and move to Medellín to learn Paisa Spanish from scratch to accurately portray Pablo Escobar.',
      'The real DEA agents Javier Peña and Steve Murphy served as story consultants on the production, explaining the exact intelligence-gathering methods used in the 1980s.',
      'All of the location shoots were filmed directly in Colombia, giving the show an incredibly authentic, highly atmospheric visual style.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/1/10/Narcos_season_1_artwork.jpg',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com/title/80025172',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'Used handheld cameras and real Colombian actors to create a gritty, high-contrast, documentary-style aesthetic that mimics news broadcasts of the era.',
    seasonsCount: 3
  },
  {
    id: 'ozark-series',
    title: 'Ozark',
    type: 'Series',
    year: 2017,
    runtimeOrSeasons: '4 Seasons',
    rating: 4.7,
    genres: ['Drama', 'Thriller'],
    directorOrCreator: 'Bill Dubuque',
    cast: ['Jason Bateman', 'Laura Linney', 'Julia Garner', 'Sofia Hublitz'],
    synopsis: 'A financial adviser drags his family from Chicago to the Missouri Ozarks, where he must launder $500 million in five years to appease a ruthless drug cartel boss.',
    criticalAnalysis: 'A grim, incredibly tense thriller driven by unmatched performances from Laura Linney and Julia Garner. Its cold, blue-tinted visual style perfectly mirrors the ethical decay of its lead characters.',
    trivia: [
      'Jason Bateman directed many of the episodes himself, establishing the show\'s signature slow-burn tension and high-contrast, deeply shadowed lighting.',
      'The series was mostly shot in Georgia rather than Missouri, using Lake Allatoona and Lake Lanier to stand in for the Ozarks.',
      'Julia Garner practiced her highly-praised Southern accent by speaking in it constantly during pre-production, even when ordering food at restaurants.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Ozark_season_4_poster.jpg',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com/title/80117552',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'The entire series is shot with a prominent, cool-blue color grade to underscore the constant sense of dread, coldness, and moral ambiguity of the Byrde family.',
    seasonsCount: 4
  },
  {
    id: 'bojack-horseman',
    title: 'BoJack Horseman',
    type: 'Series',
    year: 2014,
    runtimeOrSeasons: '6 Seasons',
    rating: 4.8,
    genres: ['Comedy', 'Drama'],
    directorOrCreator: 'Raphael Bob-Waksberg',
    cast: ['Will Arnett', 'Amy Sedaris', 'Alison Brie', 'Aaron Paul', 'Paul F. Tompkins'],
    synopsis: 'BoJack Horseman, the washed-up star of the 1990s sitcom "Horsin\' Around," navigates his personal crises, mental health struggles, and dysfunctional relationships in an anthropomorphic Hollywood.',
    criticalAnalysis: 'Widely regarded as one of the greatest animated series of all time. Underneath its hilarious, animal-pun-filled exterior lies a devastatingly honest, incredibly deep exploration of depression, addiction, and existential dread.',
    trivia: [
      'The show\'s unique visual style was created by cartoonist Lisa Hanawalt, a high school friend of series creator Raphael Bob-Waksberg.',
      'The episode "Fish Out of Water" features virtually no spoken dialogue, relying entirely on visual storytelling and an ambient underwater score.',
      'Every season features a recurring narrative climax in Episode 11, which invariably centers on a deeply emotional, reality-shattering breakdown for BoJack.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/5/5c/Bojack_Horseman_Season_6_Poster.jpg',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com/title/70300800',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'Voice actors recorded their lines individually rather than in a group, allowing Will Arnett to deliver highly intimate, nuanced vocal performances.',
    seasonsCount: 6
  },
  {
    id: 'the-irishman',
    title: 'The Irishman',
    type: 'Movie',
    year: 2019,
    runtimeOrSeasons: '209 min',
    rating: 4.5,
    genres: ['Drama', 'Crime'],
    directorOrCreator: 'Martin Scorsese',
    cast: ['Robert De Niro', 'Al Pacino', 'Joe Pesci', 'Harvey Keitel'],
    synopsis: 'An old truck driver, Frank Sheeran, looks back at his life as a hitman for a mob syndicate and his close association with the infamous teamster president Jimmy Hoffa.',
    criticalAnalysis: 'A somber, deeply reflective elegiac masterpiece that serves as a quiet postscript to Martin Scorsese\'s career of crime epics. Instead of glorifying the mafia, it strips away the glamour, leaving behind a devastating portrait of loneliness, aging, and regret.',
    trivia: [
      'The film made pioneering use of digital "de-aging" technology developed by Industrial Light & Magic to allow the actors to play characters across several decades.',
      'Joe Pesci came out of unofficial retirement to play Russell Bufalino after being asked by Martin Scorsese and Robert De Niro over fifty times.',
      'At 209 minutes, it is the longest film of Martin Scorsese\'s illustrious directing career.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/8/80/The_Irishman_poster.jpg',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com/title/80175798',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'Filmed on over 117 different locations with 319 separate scenes, requiring a highly sophisticated multi-camera rig with specialized infrared sensors for de-aging.'
  },
  {
    id: 'roma-movie',
    title: 'Roma',
    type: 'Movie',
    year: 2018,
    runtimeOrSeasons: '135 min',
    rating: 4.6,
    genres: ['Drama'],
    directorOrCreator: 'Alfonso Cuarón',
    cast: ['Yalitza Aparicio', 'Marina de Tavira', 'Diego Cortina Autrey'],
    synopsis: 'A year in the life of a middle-class family\'s live-in housekeeper in Mexico City during the turbulent early 1970s, paying tribute to the women who raised the director.',
    criticalAnalysis: 'A monumental achievement in cinematic art. Shot in stunning, high-contrast black-and-white, Alfonso Cuarón\'s deeply personal, sweeping, and intimate portrait of domestic life and social upheaval is nothing short of a visual masterpiece.',
    trivia: [
      'Yalitza Aparicio had no formal acting training before being cast as Cleo; she was a local pre-school teacher in Oaxaca who went to the audition on a whim.',
      'Alfonso Cuarón served as his own director of photography, filming the entire movie chronologically to let the actors naturally experience the emotional journey.',
      'The house featured in the movie was an exact replica of Cuarón\'s childhood home, furnished with many of his actual childhood belongings.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/f/f3/Roma_poster.png',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com/title/80240715',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'Used a state-of-the-art Dolby Atmos mix to capture the highly immersive, hyper-realistic, and multi-dimensional ambient sounds of 1970s Mexico City.'
  },
  {
    id: 'glass-onion',
    title: 'Glass Onion: A Knives Out Mystery',
    type: 'Movie',
    year: 2022,
    runtimeOrSeasons: '139 min',
    rating: 4.6,
    genres: ['Comedy', 'Mystery'],
    directorOrCreator: 'Rian Johnson',
    cast: ['Daniel Craig', 'Edward Norton', 'Janelle Monáe', 'Kathryn Hahn', 'Leslie Odom Jr.'],
    synopsis: 'Famed Southern detective Benoit Blanc travels to a private Greek island owned by a tech billionaire, where a playful murder-mystery game among friends turns deadly.',
    criticalAnalysis: 'A sparklingly witty, brilliantly layered, and socially sharp whodunit. Rian Johnson crafts a puzzle-box movie that is as much a hilarious satire of modern tech-billionaire hubris as it is an incredibly satisfying puzzle.',
    trivia: [
      'The stunning Glass Onion dome featured on the billionaire\'s island was constructed as a combination of a massive practical set piece and seamless VFX.',
      'Hugh Grant makes a brief, highly talked-about cameo appearance as Benoit Blanc\'s live-in partner, Phillip.',
      'The movie\'s title is a direct homage to the famous 1968 Beatles song "Glass Onion" of the same name.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/6/62/Glass_Onion_A_Knives_Out_Mystery_poster.jpg',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com/title/81458417',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'Shot on location on the picturesque Peloponnese peninsula in Greece, using a luxurious, sun-drenched architectural villa as the main set.'
  },
  {
    id: 'extraction-movie',
    title: 'Extraction',
    type: 'Movie',
    year: 2020,
    runtimeOrSeasons: '116 min',
    rating: 4.6,
    genres: ['Action', 'Thriller'],
    directorOrCreator: 'Sam Hargrave',
    cast: ['Chris Hemsworth', 'Rudhraksh Jaiswal', 'Randeep Hooda', 'Golshifteh Farahani'],
    synopsis: 'Tyler Rake, a fearless black-market mercenary, embarks on the most deadly extraction of his career when he is enlisted to rescue the kidnapped son of an imprisoned international crime lord.',
    criticalAnalysis: 'An adrenaline-fueled, action-heavy powerhouse that features some of the most impressive, jaw-dropping stunt choreography in modern action cinema. Its crown jewel is an incredible, seamless 12-minute "one-take" action sequence.',
    trivia: [
      'Director Sam Hargrave, a veteran stunt coordinator, strapped himself to the hoods of speeding cars to personally shoot the high-speed chase sequences.',
      'The filming took place heavily in Ahmedabad, India, and Dhaka, Bangladesh, offering a highly vibrant, bustling, and realistic urban backdrop.',
      'Chris Hemsworth performed over 85% of his own highly complex physical stunts, undergoing intense martial arts and tactical training.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/8/89/Extraction_%282020_film%29_poster.jpg',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com/title/80230399',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'Utilized highly advanced camera stabilization rigs combined with practical car-chase stunts to capture fluid, continuous action without relying on heavy CGI cuts.'
  },
  {
    id: 'marvelous-mrs-maisel',
    title: 'The Marvelous Mrs. Maisel',
    type: 'Series',
    year: 2017,
    runtimeOrSeasons: '5 Seasons',
    rating: 4.8,
    genres: ['Comedy', 'Drama'],
    directorOrCreator: 'Amy Sherman-Palladino',
    cast: ['Rachel Brosnahan', 'Alex Borstein', 'Michael Zegen', 'Marin Hinkle', 'Tony Shalhoub'],
    synopsis: 'In 1958 New York, Midge Maisel\'s life is on track- husband, kids, and elegant Upper West Side dinners. But when her life takes an unexpected turn, she discovers a previously unknown talent for stand-up comedy.',
    criticalAnalysis: 'A sparkling, incredibly fast-talking, and gorgeously styled comedic triumph. Amy Sherman-Palladino\'s signature rapid-fire dialogue pairs perfectly with a candy-colored, hyper-vibrant recreation of late-1950s Manhattan.',
    trivia: [
      'The stand-up routines performed by Rachel Brosnahan were written to mimic the rhythm and social commentary of legendary comic Joan Rivers.',
      'Virtually every episode features highly complex, sweeping, theatrical camera movements that were rehearsed for days like a Broadway dance number.',
      'The series won an outstanding total of 20 Primetime Emmy Awards over its highly successful five-season run.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/e/eb/The_Marvelous_Mrs._Maisel_Season_1_Poster.jpg',
    streamingLinks: [
      {
        platform: 'Amazon Prime',
        url: 'https://www.amazon.com/dp/B06VY146CB',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'Every single costume, shop window, and classic car was custom-selected to match the historic, highly romanticized Upper West Side aesthetic of 1950s New York.',
    seasonsCount: 5
  },
  {
    id: 'invincible-series',
    title: 'Invincible',
    type: 'Series',
    year: 2021,
    runtimeOrSeasons: '2 Seasons',
    rating: 4.8,
    genres: ['Action', 'Sci-Fi'],
    directorOrCreator: 'Robert Kirkman',
    cast: ['Steven Yeun', 'Sandra Oh', 'J.K. Simmons', 'Gillian Jacobs'],
    synopsis: 'An adult animated superhero show that revolves around seventeen-year-old Mark Grayson, who\'s just like every other guy his age- except his father is the most powerful superhero on the planet, Omni-Man.',
    criticalAnalysis: 'A shocking, subvertive, and highly emotional masterpiece of superhero deconstruction. Combining standard comic book tropes with shocking, earth-shattering violence and deeply rich family drama, it is a magnificent character-driven triumph.',
    trivia: [
      'The creator, Robert Kirkman, also wrote the legendary comic series "The Walking Dead," which he adapted into the historic live-action TV show.',
      'The pilot episode famously hides its extremely dark and bloody true nature until the shocking post-credits climax, catching casual viewers completely off-guard.',
      'An incredible roster of veteran actors, including many alumni from "The Walking Dead," provide voices for the extensive ensemble cast.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d4/Invincible_TV_Series_Poster.jpg',
    streamingLinks: [
      {
        platform: 'Amazon Prime',
        url: 'https://www.amazon.com',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'The animators studied martial arts choreography and real-world weight physics to make the devastating, super-powered fights feel heavy and bone-crunching.',
    seasonsCount: 2
  },
  {
    id: 'jack-ryan-series',
    title: "Tom Clancy's Jack Ryan",
    type: 'Series',
    year: 2018,
    runtimeOrSeasons: '4 Seasons',
    rating: 4.6,
    genres: ['Action', 'Thriller', 'Drama'],
    directorOrCreator: 'Carlton Cuse',
    cast: ['John Krasinski', 'Wendell Pierce', 'Abbie Cornish', 'Michael Kelly'],
    synopsis: 'An up-and-coming CIA analyst, Jack Ryan, is thrust into a dangerous field assignment for the first time as he uncovers a pattern in terrorist communication.',
    criticalAnalysis: 'A sleek, contemporary, and incredibly high-budget geopolitical action-thriller. John Krasinski shines as a modernized, highly capable yet grounded Jack Ryan, supported by intense, realistic action sequences set across a global stage.',
    trivia: [
      'John Krasinski is the fifth actor to portray the iconic literary character Jack Ryan, following Alec Baldwin, Harrison Ford, Ben Affleck, and Chris Pine.',
      'To prepare for the role, Krasinski worked closely with former Navy SEALs and active CIA officers to understand tactical movements and intelligence tradecraft.',
      'The series was filmed across several international locations, including Morocco, France, Colombia, Russia, and Canada, utilizing authentic backdrops.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/e/e8/Jack_Ryan_season_1_poster.jpg',
    streamingLinks: [
      {
        platform: 'Amazon Prime',
        url: 'https://www.amazon.com',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'Employed active military equipment, including real Black Hawk helicopters and military-grade armored vehicles, with permissions from global defense ministries.',
    seasonsCount: 4
  },
  {
    id: 'saltburn-movie',
    title: 'Saltburn',
    type: 'Movie',
    year: 2023,
    runtimeOrSeasons: '131 min',
    rating: 4.4,
    genres: ['Drama', 'Thriller', 'Comedy'],
    directorOrCreator: 'Emerald Fennell',
    cast: ['Barry Keoghan', 'Jacob Elordi', 'Rosamund Pike', 'Richard E. Grant'],
    synopsis: 'Struggling to find his place at Oxford University, student Oliver Quick finds himself drawn into the world of the charming and aristocratic Felix Catton, who invites him to Saltburn, his eccentric family\'s sprawling estate, for a summer never to be forgotten.',
    criticalAnalysis: 'A deliciously wicked, visually intoxicating, and highly controversial dark satire of wealth, privilege, and obsession. Emerald Fennell crafts a gothic, sun-drenched thriller packed with jaw-dropping, unforgettable moments and an incredible breakout performance by Barry Keoghan.',
    trivia: [
      'The entire movie was filmed in a real, privately owned 127-room Elizabethan country house in Northamptonshire, which had never been captured on film before.',
      'The final, highly talked-about dancing sequence featuring Barry Keoghan was filmed in eleven continuous takes, with Keoghan dancing completely naked through the real estate rooms.',
      'To emphasize the classical, highly framed, painting-like look of the sprawling estate, the movie was shot in a boxy 1.33:1 aspect ratio.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1543728716-80975210d477?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/8/84/Saltburn_poster.jpg',
    streamingLinks: [
      {
        platform: 'Amazon Prime',
        url: 'https://www.amazon.com',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'Shot on high-contrast 35mm film, creating a warm, lush, and incredibly saturated color palette that feels like a dreamy, slightly decayed aristocratic summer.'
  },
  {
    id: 'air-movie',
    title: 'Air',
    type: 'Movie',
    year: 2023,
    runtimeOrSeasons: '111 min',
    rating: 4.7,
    genres: ['Drama', 'History'],
    directorOrCreator: 'Ben Affleck',
    cast: ['Matt Damon', 'Jason Bateman', 'Ben Affleck', 'Viola Davis', 'Chris Tucker'],
    synopsis: 'The unbelievable, game-changing partnership between a then-rookie Michael Jordan and Nike\'s fledgling basketball division, which revolutionized the world of sports and contemporary culture with the Air Jordan brand.',
    criticalAnalysis: 'A classic, incredibly entertaining, and highly inspiring crowd-pleaser. Ben Affleck directs with superb, breezy confidence, turning a corporate business negotiation into an extremely tense, emotionally resonant sports drama. Viola Davis is spectacular as Michael\'s formidable mother.',
    trivia: [
      'Michael Jordan personally gave Ben Affleck his blessing to direct the movie, but had one absolute condition: Viola Davis had to play his mother, Deloris Jordan.',
      'Despite the movie revolving entirely around Michael Jordan, Jordan\'s face is never shown on camera during the film to maintain his legendary, larger-than-life status.',
      'The production crew meticulously sourced authentic, functional late-1980s office machinery, computers, and retro soda cans to establish the period\'s nostalgic aesthetic.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/3/30/Air_2023_film_poster.jpg',
    streamingLinks: [
      {
        platform: 'Amazon Prime',
        url: 'https://www.amazon.com',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'Filmed in a digital-to-film process where the digital capture was transferred to actual 35mm film and then scanned back, giving it a soft, grain-filled 1980s texture.'
  },
  {
    id: 'sound-of-metal',
    title: 'Sound of Metal',
    type: 'Movie',
    year: 2019,
    runtimeOrSeasons: '120 min',
    rating: 4.8,
    genres: ['Drama'],
    directorOrCreator: 'Darius Marder',
    cast: ['Riz Ahmed', 'Olivia Cooke', 'Paul Raci', 'Lauren Ridloff'],
    synopsis: 'A heavy-metal drummer\'s life is thrown into freefall when he begins to lose his hearing. He must choose between accepting his new reality inside a deaf community or chasing his past life.',
    criticalAnalysis: 'An extraordinary, profoundly moving cinematic achievement. Driven by an incredibly raw, deeply vulnerable, and Oscar-nominated performance by Riz Ahmed, the movie uses groundbreaking sound design to put the viewer directly into the disorienting, silent world of its protagonist.',
    trivia: [
      'Riz Ahmed spent six months learning American Sign Language (ASL) and practicing the drums for four hours every single day to prepare for the role.',
      'Actor Paul Raci, who plays the deaf community leader Joe, is a child of deaf adults (CODA) who is completely fluent in ASL and has worked extensively with deaf veterans.',
      'To simulate real hearing loss on set, Riz Ahmed wore specialized, custom-fitted in-ear monitors that emitted varying levels of white noise.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/t/t9/Sound_of_Metal_poster.jpeg',
    streamingLinks: [
      {
        platform: 'Amazon Prime',
        url: 'https://www.amazon.com',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'Used a highly sophisticated audio post-production process that manipulated individual frequencies to replicate the precise, mechanical sensations of receiving a cochlear implant.'
  },
  {
    id: 'fallout-series',
    title: 'Fallout',
    type: 'Series',
    year: 2024,
    runtimeOrSeasons: '1 Season',
    rating: 4.8,
    genres: ['Sci-Fi', 'Action', 'Adventure'],
    directorOrCreator: 'Graham Wagner, Geneva Robertson-Dworet',
    cast: ['Ella Purnell', 'Walton Goggins', 'Aaron Moten', 'Kyle MacLachlan'],
    synopsis: 'Based on one of the greatest video game series of all time, Fallout is the story of haves and have-nots in a world in which there\'s almost nothing left to have. 200 years after the apocalypse, the gentle denizens of luxury fallout shelters are forced to return to the irradiated hellscape their ancestors left behind.',
    criticalAnalysis: 'An absolute masterpiece of adaptation. Fallout captures the game\'s unique retro-futuristic aesthetic, grim post-apocalyptic survivalist themes, and morbidly satirical dark humor with astonishing fidelity. Walton Goggins delivers a career-defining performance as The Ghoul, perfectly embodying the tragic, irradiated soul of the wasteland.',
    trivia: [
      'The power armor suits seen in the series were mostly built as functional, heavy-duty practical suits by Legacy Effects rather than relying entirely on CGI.',
      'The Vault-Tec mascot\'s iconic "thumbs up" is famously explained in the show\'s opening episode as a method for measuring distance from a nuclear blast.',
      'Jonathan Nolan, who directed several episodes, is a massive fan of the games and personally pushed to keep the production design incredibly close to the original game assets.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/a/a3/Fallout_TV_series_poster.jpg',
    streamingLinks: [
      {
        platform: 'Amazon Prime',
        url: 'https://www.amazon.com',
        availableRegions: ['US', 'UK', 'IN', 'JP', 'DE'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'The production team shot on location at the skeleton coast in Namibia, using real abandoned shipwrecks and salt flats to construct the desolate, hauntingly beautiful wasteland landscapes.'
  },
  {
    id: 'bridgerton',
    title: 'Bridgerton',
    type: 'Series',
    year: 2020,
    runtimeOrSeasons: '3 Seasons',
    rating: 4.7,
    genres: ['Romance', 'Drama', 'History'],
    directorOrCreator: 'Chris Van Dusen',
    cast: ['Nicola Coughlan', 'Luke Newton', 'Jonathan Bailey', 'Phoebe Devine'],
    synopsis: 'During the Regency era in England, eight close-knit siblings of the powerful Bridgerton family look for love and happiness in London high society, guided and criticized by the mysterious newsletter writer Lady Whistledown.',
    criticalAnalysis: 'A beautifully lavish, wildly addictive historical romance. By blending vibrant modern music covers, gorgeous high-society fashion, and steam-filled chemistry, Bridgerton revitalized the costume drama genre for a younger generation. Its diverse casting and dazzling color palette make it a visual feast.',
    trivia: [
      'The show\'s incredible, classical-style pop music covers are performed by the Vitamin String Quartet and Duomo, covering artists like Billie Eilish, Ariana Grande, and Taylor Swift.',
      'To prepare for the demanding high-society ball scenes, the cast underwent extensive Regency etiquette training, learning how to dance, hold teacups, bow, and walk.',
      'Over 7,500 custom-made costume pieces were designed and created from scratch for the first season alone.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1518887570146-0612132dd618?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/c/cb/Bridgerton_poster.jpg',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com',
        availableRegions: ['US', 'UK', 'IN', 'JP', 'BR'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'The production rented several historic English estates, including the breathtaking Ranger\'s House in Greenwich, London, which served as the elegant brick exterior of the Bridgerton family home.'
  },
  {
    id: 'beef-series',
    title: 'Beef',
    type: 'Series',
    year: 2023,
    runtimeOrSeasons: '1 Season',
    rating: 4.8,
    genres: ['Comedy', 'Drama'],
    directorOrCreator: 'Lee Sung Jin',
    cast: ['Steven Yeun', 'Ali Wong', 'Joseph Lee', 'Young Mazino'],
    synopsis: 'A road rage incident between two strangers—a failing contractor and an unfulfilled entrepreneur—sparks a bitter feud that unleashes their darkest impulses, gradually unraveling their relationships and careers.',
    criticalAnalysis: 'A kinetic, brilliant, and hilariously toxic examination of modern existential dread, class divide, and repressed anger. Lee Sung Jin masterfully paces the conflict as it escalates from trivial vandalism to existential warfare. Steven Yeun and Ali Wong share an incredible, destructive magnetic energy.',
    trivia: [
      'The title card for each episode features custom surrealist paintings created by co-star Joseph Lee, who plays George Nakai.',
      'The show is named Beef, representing the slang term for a grudge or conflict, and serves as a literal metaphor for consuming toxic rage.',
      'The series swept the 75th Primetime Emmy Awards, winning 8 awards including Outstanding Limited or Anthology Series, and lead acting awards for Yeun and Wong.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/1/15/Beef_Netflix_series_poster.jpg',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com',
        availableRegions: ['US', 'UK', 'IN', 'JP', 'KR'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'Shot entirely in and around Los Angeles, California, utilizing high-contrast lighting and tight lenses to emphasize the characters\' feelings of claustrophobia and modern alienation.'
  },
  {
    id: 'the-sandman-series',
    title: 'The Sandman',
    type: 'Series',
    year: 2022,
    runtimeOrSeasons: '1 Season',
    rating: 4.6,
    genres: ['Fantasy', 'Drama', 'Sci-Fi'],
    directorOrCreator: 'Neil Gaiman, David S. Goyer, Allan Heinberg',
    cast: ['Tom Sturridge', 'Boyd Holbrook', 'Patton Oswalt', 'Vivienne Acheampong'],
    synopsis: 'Upon escaping after decades of imprisonment by a mortal wizard, Dream, the personification of dreams and king of the Dreaming, sets out to reclaim his lost tools of power and rebuild his crumbling kingdom.',
    criticalAnalysis: 'An atmospheric, imaginative adaptation that respects Neil Gaiman\'s legendary comic source material. Sturridge is spectacular as the brooding, pale Lord of Dreams. The series beautifully balances philosophical standalone tales with overarching mythic fantasy, creating a dark, lyrical, and visually stunning world.',
    trivia: [
      'Tom Sturridge beat out over a thousand actors who auditioned for the role of Dream, after Gaiman felt his voice and posture perfectly mirrored the comic books.',
      'The episode "24 Hours" is widely considered one of the most terrifying hours of television, shot like a bottle film inside a retro diner.',
      'The voice of Matthew the Raven is provided by Patton Oswalt, who is a massive lifelong fan of the comic books.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/9/95/The_Sandman_Netflix_poster.jpg',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com',
        availableRegions: ['US', 'UK', 'IN', 'JP', 'FR'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'The Dreaming\'s surreal landscapes were crafted using a blend of physical gothic architectural sets built in Pinewood Studios and expansive CGI landscapes.'
  },
  {
    id: 'the-expanse',
    title: 'The Expanse',
    type: 'Series',
    year: 2015,
    runtimeOrSeasons: '6 Seasons',
    rating: 4.8,
    genres: ['Sci-Fi', 'Drama', 'Mystery'],
    directorOrCreator: 'Mark Fergus, Hawk Ostby',
    cast: ['Steven Strait', 'Dominique Tipper', 'Wes Chatham', 'Shohreh Aghdashloo'],
    synopsis: 'In a highly colonized solar system where Earth, Mars, and the outer asteroid belt are on the brink of war, a hardened detective and a rogue spaceship captain find themselves in a race across the galaxy to expose the greatest conspiracy in human history.',
    criticalAnalysis: 'Arguably the greatest hard sci-fi television series ever created. The Expanse stands tall for its meticulous adherence to orbital mechanics, realistic gravity physics, and exceptionally rich geopolitical writing. The complex, morally gray characters and deep world-building provide a deeply intellectual sci-fi experience.',
    trivia: [
      'The series was famously cancelled by Syfy after three seasons, but a massive fan campaign (including flying a "Save The Expanse" banner over Amazon headquarters) led Jeff Bezos, a massive fan of the books, to personally acquire the series for Prime Video.',
      'The fictional language Belter Creole was meticulously designed by professional linguist Nick Farmer, drawing roots from English, Spanish, Chinese, German, and Swahili.',
      'Actor Wes Chatham, who plays Amos Burton, worked closely with writers Ty Franck and Daniel Abraham to ensure his character\'s complex trauma-induced psychology was perfectly portrayed.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/d/db/The_Expanse_poster.jpg',
    streamingLinks: [
      {
        platform: 'Amazon Prime',
        url: 'https://www.amazon.com',
        availableRegions: ['US', 'UK', 'IN', 'JP', 'CA'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'Utilized ultra-high definition cameras and state-of-the-art physics simulation engines to render accurate zero-gravity thrusts, thruster plumes, and kinetic weaponry battles.'
  },
  {
    id: 'the-idea-of-you',
    title: 'The Idea of You',
    type: 'Movie',
    year: 2024,
    runtimeOrSeasons: '115 min',
    rating: 4.5,
    genres: ['Romance', 'Drama'],
    directorOrCreator: 'Michael Showalter',
    cast: ['Anne Hathaway', 'Nicholas Galitzine', 'Ella Rubin', 'Reid Scott'],
    synopsis: 'Solène, a chic 40-year-old art gallery owner and single mother, begins an unexpected, whirlwind romance with 24-year-old Hayes Campbell, the lead singer of August Moon, the hottest boy band on earth, after a chance meeting at Coachella.',
    criticalAnalysis: 'A delightful, sophisticated, and mature entry in the romantic drama genre. Led by Anne Hathaway\'s radiating, elegant charm and an exceptionally charismatic Nicholas Galitzine, the film transcends standard romance tropes by honestly exploring age gaps, public scrutiny, and the complexities of motherhood.',
    trivia: [
      'The fictional boy band August Moon recorded an entire EP of original pop songs written by acclaimed songwriters Savan Kotecha and Carl Falk, who have written real hits for One Direction.',
      'The film is adapted from the bestselling novel by Robinne Lee, which was widely rumored to be inspired by Harry Styles fan fiction, though the author notes it is a general commentary on women reclaiming their sexuality.',
      'Anne Hathaway and Nicholas Galitzine underwent a rigorous chemistry read that involved listening to music and dancing together to prove their on-screen spark.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/a/ad/The_Idea_of_You_poster.jpg',
    streamingLinks: [
      {
        platform: 'Amazon Prime',
        url: 'https://www.amazon.com',
        availableRegions: ['US', 'UK', 'IN', 'JP', 'DE'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'The spectacular festival performance scenes were shot on a massive custom stage setup, recreating the scale of the Coachella festival with hundreds of enthusiastic live extras.'
  },
  {
    id: 'society-of-the-snow',
    title: 'Society of the Snow',
    type: 'Movie',
    year: 2023,
    runtimeOrSeasons: '144 min',
    rating: 4.8,
    genres: ['Biography', 'Drama', 'Adventure'],
    directorOrCreator: 'J.A. Bayona',
    cast: ['Enzo Vogrincic', 'Agustín Pardella', 'Matías Recalt', 'Esteban Bigliardi'],
    synopsis: 'In 1972, a Uruguayan rugby team\'s flight crashes onto a glacier in the heart of the Andes. To survive one of the world\'s toughest environments, the remaining passengers are forced to stick together and make unimaginably difficult decisions.',
    criticalAnalysis: 'A masterpiece of survival cinema. J.A. Bayona treats this legendary tragedy with profound respect, shifting the narrative focus from mere sensational survival horror to an deeply spiritual, poetic tribute to human solidarity, friendship, and sacrificial love. The cinematography of the towering Andes is breathtakingly terrifying.',
    trivia: [
      'The actors spent months in close contact with the real survivors of the crash and the families of those who perished, aiming for complete historical accuracy and emotional honesty.',
      'To capture the harsh physical toll of the ordeal, the actors underwent a strict supervised diet to safely lose significant weight over the course of the chronological shoot.',
      'The film was nominated for Best International Feature Film and Best Makeup and Hairstyling at the 96th Academy Awards.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/9/9d/Society_of_the_Snow_poster.jpg',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com',
        availableRegions: ['US', 'UK', 'IN', 'JP', 'ES', 'UY'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'Bayona shot the film in the Sierra Nevada mountains in Spain, but also captured actual plates and background footage at the real Crash Site (Valley of the Tears) in the Andes to stitch together seamless, realistic backdrops.'
  },
  {
    id: 'road-house-2024',
    title: 'Road House',
    type: 'Movie',
    year: 2024,
    runtimeOrSeasons: '121 min',
    rating: 4.4,
    genres: ['Action', 'Thriller'],
    directorOrCreator: 'Doug Liman',
    cast: ['Jake Gyllenhaal', 'Daniela Melchior', 'Conor McGregor', 'JD Pardo'],
    synopsis: 'In this adrenaline-fueled reimagining of the 80s classic, an ex-UFC fighter Dalton takes a job as a bouncer at a rough Florida Keys roadhouse, only to discover that this tropical paradise is under threat from a ruthless crime syndicate.',
    criticalAnalysis: 'A highly entertaining, bone-crunching modern action-comedy. Jake Gyllenhaal brings a charming, laid-back yet lethally dangerous energy to Dalton, while real-life UFC legend Conor McGregor makes a cartoonish, delightfully unhinged acting debut. Doug Liman directs the action with an inventive, hyper-kinetic camera style.',
    trivia: [
      'To capture the high-impact bar fights, the stunt team developed a custom multi-pass camera technique where fighters would make actual contact at a slow, safe speed, which was then speed-ramped to look incredibly brutal.',
      'Jake Gyllenhaal maintained an extremely strict training and dieting regime to achieve the physique of a professional middleweight fighter, shooting several weigh-in scenes during real UFC events.',
      'Conor McGregor\'s character Knox is an entirely original creation, designed to match the fighter\'s real-life explosive persona.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/a/af/Road_House_2024_poster.jpg',
    streamingLinks: [
      {
        platform: 'Amazon Prime',
        url: 'https://www.amazon.com',
        availableRegions: ['US', 'UK', 'IN', 'JP', 'BR'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'The production built a massive, fully functional "Road House" bar set on a beach in the Dominican Republic, which withstood several real tropical storms during filming.'
  },
  {
    id: 'the-covenant',
    title: 'The Covenant',
    type: 'Movie',
    year: 2023,
    runtimeOrSeasons: '123 min',
    rating: 4.7,
    genres: ['Action', 'Thriller', 'War'],
    directorOrCreator: 'Guy Ritchie',
    cast: ['Jake Gyllenhaal', 'Dar Salim', 'Sean Sagar', 'Jason Wong'],
    synopsis: 'During the war in Afghanistan, local interpreter Ahmed risks his life to carry injured US Army Sergeant John Kinley across miles of hostile terrain. When Kinley learns that Ahmed was denied safe passage to America, he returns to the active war zone to rescue his savior.',
    criticalAnalysis: 'A tense, gripping, and deeply emotional war thriller. Stepping away from his signature stylized crime capers, Guy Ritchie delivers a grounded, mature, and deeply respectful story of brotherhood, honor, and a debt of survival. Jake Gyllenhaal and Dar Salim share an exceptionally powerful, non-verbal connection that anchors the film.',
    trivia: [
      'The film was titled "Guy Ritchie\'s The Covenant" to distinguish it from the 2006 horror-fantasy film "The Covenant" and to reflect the director\'s deeply personal commitment to the story.',
      'Dar Salim, a highly acclaimed Iraqi-Danish actor, brought his real-life experiences and cultural insights to the character of Ahmed, ensuring a respectful, authentic portrayal.',
      'The filming took place in Alicante, Spain, which served as an incredibly convincing stand-in for the mountainous landscapes of Afghanistan\'s Hindu Kush.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/e/ee/The_Covenant_poster.jpg',
    streamingLinks: [
      {
        platform: 'Amazon Prime',
        url: 'https://www.amazon.com',
        availableRegions: ['US', 'UK', 'IN', 'JP'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'Used advanced military technical consultants on set to ensure all squad movements, communication codes, weapon handling, and medical procedures were highly accurate.'
  },
  {
    id: 'nimona',
    title: 'Nimona',
    type: 'Movie',
    year: 2023,
    runtimeOrSeasons: '101 min',
    rating: 4.7,
    genres: ['Animation', 'Action', 'Adventure'],
    directorOrCreator: 'Nick Bruno, Troy Quane',
    cast: ['Chloë Grace Moretz', 'Riz Ahmed', 'Eugene Lee Yang', 'Frances Conroy'],
    synopsis: 'In a futuristic medieval world, a knight is framed for a tragic crime he didn\'t commit. The only person who can help him prove his innocence is Nimona, a mischievous, punk-rock, shape-shifting teenager whom he has been trained to destroy.',
    criticalAnalysis: 'A vibrant, heartwarming, and beautifully rebellious animated film. Nimona is a masterclass in modern storytelling, blending stunning "futuristic-medieval" aesthetics with a powerful, deeply moving allegory about acceptance, identity, and the danger of institutional prejudice. Moretz and Ahmed are a match made in voice-acting heaven.',
    trivia: [
      'The film was famously over 75% complete at Blue Sky Studios when Disney shut the studio down in 2021, canceling the project. However, Annapurna Pictures rescued the film, partnering with DNEG Animation to finish it for Netflix.',
      'Nimona was nominated for Best Animated Feature at the 96th Academy Awards, representing a massive triumph for its creators and rescuers.',
      'The film is based on ND Stevenson\'s critically acclaimed, award-winning webcomic and graphic novel of the same name.'
    ],
    backdropUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80',
    posterUrl: 'https://upload.wikimedia.org/wikipedia/en/1/1a/Nimona_poster.jpeg',
    streamingLinks: [
      {
        platform: 'Netflix',
        url: 'https://www.netflix.com',
        availableRegions: ['US', 'UK', 'IN', 'JP', 'CA'],
        priceTier: 'Included'
      }
    ],
    productionTrivia: 'The animators developed a highly distinct, hand-drawn digital 2D-looking style mapped onto complex 3D assets, giving the movie its timeless, painted illustration feel.'
  }
];

const SAFE_POSTERS: Record<string, string> = {
  'dune-part-two': 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop',
  'oppenheimer': 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=600&auto=format&fit=crop',
  'interstellar': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop',
  'spider-verse': 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=600&auto=format&fit=crop',
  'the-dark-knight': 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop',
  'stranger-things': 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=600&auto=format&fit=crop',
  'the-crown': 'https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=600&auto=format&fit=crop',
  'black-mirror': 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop',
  'the-boys': 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=600&auto=format&fit=crop',
  'rings-of-power': 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop',
  'fleabag': 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop',
  'the-mandalorian': 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?q=80&w=600&auto=format&fit=crop',
  'loki': 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=600&auto=format&fit=crop',
  'shogun': 'https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=600&auto=format&fit=crop',
  'squid-game': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop',
  'wednesday': 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=600&auto=format&fit=crop',
  'reacher': 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=600&auto=format&fit=crop',
  'the-bear': 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=600&auto=format&fit=crop',
  'succession': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop',
  'avatar-way-of-water': 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=600&auto=format&fit=crop',
  'damsel': 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop',
  'enola-holmes-1': 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=600&auto=format&fit=crop',
  'enola-holmes-2': 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=600&auto=format&fit=crop',
  'enola-holmes-3': 'https://images.unsplash.com/photo-1511108690759-009324a90311?q=80&w=600&auto=format&fit=crop',
  'from-series': 'https://images.unsplash.com/photo-1518887570146-0612132dd618?q=80&w=600&auto=format&fit=crop',
  'widows-bay': 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600&auto=format&fit=crop',
  'alice-in-borderland': 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop',
  'if-wishes-could-kill': 'https://images.unsplash.com/photo-1519074002996-a69e7ac46a42?q=80&w=600&auto=format&fit=crop',
  'all-of-us-are-dead': 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop',
  'voicemails-by-isabelle': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600&auto=format&fit=crop',
  'crash-landing-on-you': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop',
  'queen-of-tears': 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600&auto=format&fit=crop',
  'past-lives': 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=600&auto=format&fit=crop',
  'my-demon': 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=600&auto=format&fit=crop',
  'shaitaan': 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop',
  'the-last-of-us': 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=600&auto=format&fit=crop',
  'the-conjuring': 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=600&auto=format&fit=crop',
  'jujutsu-kaisen': 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=600&auto=format&fit=crop',
  'parasite': 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop',
  'breaking-bad': 'https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?q=80&w=600&auto=format&fit=crop',
  'brooklyn-nine-nine': 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=600&auto=format&fit=crop',
  'the-office': 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop',
  'modern-family': 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=600&auto=format&fit=crop',
  'mad-max-fury-road': 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop',
  'john-wick-4': 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?q=80&w=600&auto=format&fit=crop',
  'rrr': 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop',
  'tumbbad': 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=600&auto=format&fit=crop',
  'hereditary': 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=600&auto=format&fit=crop',
  'panchayat': 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&auto=format&fit=crop',
  'schitts-creek': 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop',
  'goblin': 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600&auto=format&fit=crop',
  'business-proposal': 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?q=80&w=600&auto=format&fit=crop',
  'charade-1963': 'https://images.unsplash.com/photo-1601513525393-495387c24a31?q=80&w=600&auto=format&fit=crop',
  'night-of-the-living-dead': 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=600&auto=format&fit=crop',
  'the-general-1926': 'https://images.unsplash.com/photo-1519074002996-a69e7ac46a42?q=80&w=600&auto=format&fit=crop',
  'his-girl-friday-1940': 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=600&auto=format&fit=crop',
  'deadpool-and-wolverine': 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=600&auto=format&fit=crop',
  'gladiator-2': 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=600&auto=format&fit=crop',
  'severance-series': 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop',
  'house-of-the-dragon': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop',
  'lovely-runner': 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=600&auto=format&fit=crop',
  'talk-to-me': 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=600&auto=format&fit=crop',
  'the-queens-gambit': 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=600&auto=format&fit=crop',
  'narcos-series': 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=600&auto=format&fit=crop',
  'ozark-series': 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=600&auto=format&fit=crop',
  'bojack-horseman': 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop',
  'the-irishman': 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?q=80&w=600&auto=format&fit=crop',
  'roma-movie': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600&auto=format&fit=crop',
  'glass-onion': 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop',
  'extraction-movie': 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop',
  'marvelous-mrs-maisel': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop',
  'invincible-series': 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=600&auto=format&fit=crop',
  'jack-ryan-series': 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=600&auto=format&fit=crop',
  'saltburn-movie': 'https://images.unsplash.com/photo-1543728716-80975210d477?q=80&w=600&auto=format&fit=crop',
  'air-movie': 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=600&auto=format&fit=crop',
  'sound-of-metal': 'https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=600&auto=format&fit=crop',
  'fallout-series': 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop',
  'bridgerton': 'https://images.unsplash.com/photo-1518887570146-0612132dd618?q=80&w=600&auto=format&fit=crop',
  'beef-series': 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop',
  'the-sandman-series': 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=600&auto=format&fit=crop',
  'the-expanse': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop',
  'the-idea-of-you': 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600&auto=format&fit=crop',
  'society-of-the-snow': 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=600&auto=format&fit=crop',
  'road-house-2024': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600&auto=format&fit=crop',
  'the-covenant': 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop',
  'nimona': 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=600&auto=format&fit=crop'
};

const SAFE_BACKDROPS: Record<string, string> = {
  'dune-part-two': 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop',
  'oppenheimer': 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=1200&auto=format&fit=crop',
  'interstellar': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
  'spider-verse': 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1200&auto=format&fit=crop',
  'the-dark-knight': 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=1200&auto=format&fit=crop',
  'stranger-things': 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1200&auto=format&fit=crop',
  'the-crown': 'https://images.unsplash.com/photo-1543728716-80975210d477?q=80&w=1200&auto=format&fit=crop',
  'black-mirror': 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop',
  'the-boys': 'https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=1200&auto=format&fit=crop',
  'rings-of-power': 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop',
  'fleabag': 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop',
  'deadpool-and-wolverine': 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1200&auto=format&fit=crop',
  'gladiator-2': 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?q=80&w=1200&auto=format&fit=crop',
  'severance-series': 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop',
  'house-of-the-dragon': 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
  'lovely-runner': 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1200&auto=format&fit=crop',
  'talk-to-me': 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=1200&auto=format&fit=crop',
  'the-queens-gambit': 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=1200&auto=format&fit=crop',
  'narcos-series': 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=1200&auto=format&fit=crop',
  'ozark-series': 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=1200&auto=format&fit=crop',
  'bojack-horseman': 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop',
  'the-irishman': 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?q=80&w=1200&auto=format&fit=crop',
  'roma-movie': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop',
  'glass-onion': 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop',
  'extraction-movie': 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop',
  'marvelous-mrs-maisel': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
  'invincible-series': 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1200&auto=format&fit=crop',
  'jack-ryan-series': 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1200&auto=format&fit=crop',
  'saltburn-movie': 'https://images.unsplash.com/photo-1543728716-80975210d477?q=80&w=1200&auto=format&fit=crop',
  'air-movie': 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1200&auto=format&fit=crop',
  'sound-of-metal': 'https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=1200&auto=format&fit=crop',
  'fallout-series': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
  'bridgerton': 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=1200&auto=format&fit=crop',
  'beef-series': 'https://images.unsplash.com/photo-1533929736458-ca588d08c8be?q=80&w=1200&auto=format&fit=crop',
  'the-sandman-series': 'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?q=80&w=1200&auto=format&fit=crop',
  'the-expanse': 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1200&auto=format&fit=crop',
  'the-idea-of-you': 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop',
  'society-of-the-snow': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop',
  'road-house-2024': 'https://images.unsplash.com/photo-1519074002996-a69e7ac46a42?q=80&w=1200&auto=format&fit=crop',
  'the-covenant': 'https://images.unsplash.com/photo-1501530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
  'nimona': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop'
};

export const CURATED_CATALOG: Movie[] = RAW_CATALOG.map(movie => {
  const safePoster = SAFE_POSTERS[movie.id] || movie.posterUrl;
  const safeBackdrop = SAFE_BACKDROPS[movie.id] || movie.backdropUrl;
  return {
    ...movie,
    posterUrl: getProxiedUrl(movie.posterUrl),
    backdropUrl: getProxiedUrl(movie.backdropUrl),
    safePosterUrl: getProxiedUrl(safePoster),
    safeBackdropUrl: getProxiedUrl(safeBackdrop)
  };
});

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
    suggestedMatch: 'Matching index based on rating patterns and genre click frequency.',
    exploreByTalent: 'Explore by Talent',
    allInOneSearch: 'All-in-One',
    talentSearchPlaceholder: 'Search directors, creators, cast...'
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
    suggestedMatch: 'रेटिंग पैटर्न और शैली क्लिक आवृत्ति के आधार पर मिलान सूचकांक।',
    exploreByTalent: 'टैलेंट खोज',
    allInOneSearch: 'ऑल-इन-वन',
    talentSearchPlaceholder: 'निर्देशक, निर्माता, कलाकारों की खोज करें...'
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
    suggestedMatch: 'مؤشر المطابقة بناءً على أنماط التقييم وتكرار النقر على الأنواع.',
    exploreByTalent: 'استكشاف المواهب',
    allInOneSearch: 'الكل في واحد',
    talentSearchPlaceholder: 'ابحث عن المخرجين والمبدعين وطاقم العمل...'
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
    suggestedMatch: '評価パターンとジャンルクリック頻度に基づくマッチング指数。',
    exploreByTalent: 'タレントで探索',
    allInOneSearch: 'オールインワン',
    talentSearchPlaceholder: '監督、クリエイター、キャストを検索...'
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
    suggestedMatch: 'Índice de coincidencia basado en patrones de calificación y frecuencia de clics de género.',
    exploreByTalent: 'Explorar por talento',
    allInOneSearch: 'Todo en uno',
    talentSearchPlaceholder: 'Buscar directores, creadores, reparto...'
  }
};
