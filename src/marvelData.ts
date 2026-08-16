import { Movie } from './types';

export const MARVEL_MOVIES_CATALOG: Movie[] = [
  // --- THE AVENGERS TETRALOGY ---
  {
    id: 'the-avengers',
    title: "Marvel's The Avengers",
    type: 'Movie',
    year: 2012,
    runtimeOrSeasons: '143 min',
    rating: 4.9,
    genres: ['Action', 'Sci-Fi', 'Adventure', 'Superhero'],
    directorOrCreator: 'Joss Whedon',
    cast: ['Robert Downey Jr.', 'Chris Evans', 'Mark Ruffalo', 'Chris Hemsworth', 'Scarlett Johansson', 'Jeremy Renner', 'Tom Hiddleston'],
    synopsis: "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
    criticalAnalysis: 'A groundbreaking cinematic milestone that proved the viability of interconnected universe storytelling, marked by razor-sharp ensemble banter and the iconic 360-degree circling hero shot in New York City.',
    trivia: [
      'The iconic post-credits shawarma scene was filmed only one day after the world premiere, requiring Chris Evans to cover his beard with prosthetic makeup.',
      'The film became the first Marvel production to cross the $1.5 billion worldwide box office benchmark.',
      'Mark Ruffalo was the first actor to perform both the motion capture and voice for the Hulk on set simultaneously.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/9BBTo63ANSmhC4e6r62OJFuK2GL.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg',
    streamingLinks: [
      { platform: 'Disney+ Hotstar', url: 'https://www.hotstar.com/movies/the-avengers/1260014766', availableRegions: ['US', 'UK', 'IN', 'JP'], priceTier: 'Included' },
      { platform: 'Amazon Prime', url: 'https://www.amazon.com/dp/avengers', availableRegions: ['US', 'UK'], priceTier: 'Premium Rent' }
    ],
    productionTrivia: 'Joss Whedon wrote the famous "Puny God" beat on his first script draft after envisioning Hulk ragdolling Loki across Stark Tower.',
    trailerYoutubeId: 'eOrNdBpGMv8'
  },
  {
    id: 'avengers-age-of-ultron',
    title: 'Avengers: Age of Ultron',
    type: 'Movie',
    year: 2015,
    runtimeOrSeasons: '141 min',
    rating: 4.7,
    genres: ['Action', 'Sci-Fi', 'Adventure', 'Superhero'],
    directorOrCreator: 'Joss Whedon',
    cast: ['Robert Downey Jr.', 'Chris Hemsworth', 'Mark Ruffalo', 'Chris Evans', 'Scarlett Johansson', 'Jeremy Renner', 'James Spader', 'Elizabeth Olsen', 'Aaron Taylor-Johnson'],
    synopsis: 'When Tony Stark and Bruce Banner try to jump-start a dormant peacekeeping program called Ultron, things go horribly wrong and it is up to Earth’s mightiest heroes to stop the villainous artificial intelligence.',
    criticalAnalysis: 'A philosophically dense chapter exploring the hubris of artificial intelligence and preemptive warfare, introducing Scarlet Witch, Quicksilver, and Vision to the MCU roster.',
    trivia: [
      'James Spader received a standing ovation from the cast and crew on his very first day performing Ultron in a motion-capture suit.',
      'Scarlett Johansson was pregnant during filming; three stunt doubles wearing dotted tracking dots were utilized for action scenes.',
      'The Hulkbuster vs. Hulk sequence in Johannesburg required over a year of specialized physics simulation.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/83WvW9FALU97jrjao1qbtH0W4kW.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/4ssDuvEDkS9urvtLnj1NIJIT2tc.jpg',
    streamingLinks: [
      { platform: 'Disney+ Hotstar', url: 'https://www.hotstar.com/movies/avengers-age-of-ultron/1260014767', availableRegions: ['US', 'UK', 'IN', 'JP'], priceTier: 'Included' },
      { platform: 'Amazon Prime', url: 'https://www.amazon.com/dp/age-of-ultron', availableRegions: ['US', 'UK'], priceTier: 'Premium Rent' }
    ],
    productionTrivia: 'Vision lifting Mjolnir was kept a tight secret on set, with only five crew members knowing the reveal until filming.',
    trailerYoutubeId: 'tmeOjFno6Do'
  },
  {
    id: 'avengers-infinity-war',
    title: 'Avengers: Infinity War',
    type: 'Movie',
    year: 2018,
    runtimeOrSeasons: '149 min',
    rating: 4.9,
    genres: ['Action', 'Sci-Fi', 'Adventure', 'Superhero', 'Fantasy'],
    directorOrCreator: 'Anthony Russo, Joe Russo',
    cast: ['Robert Downey Jr.', 'Chris Hemsworth', 'Mark Ruffalo', 'Chris Evans', 'Scarlett Johansson', 'Benedict Cumberbatch', 'Tom Holland', 'Chadwick Boseman', 'Josh Brolin'],
    synopsis: 'The Avengers and their allies must be willing to sacrifice all in an attempt to defeat the powerful Thanos before his blitz of devastation and ruin puts an end to the universe.',
    criticalAnalysis: 'A breathless, operatic masterclass in blockbuster pacing and emotional devastation. Josh Brolin’s Thanos anchors the narrative as an unstoppable tragic protagonist who executes the fateful snap.',
    trivia: [
      'Tom Holland was not given the full script to prevent accidental spoiler leaks; he only received his specific dialogue pages.',
      'The iconic line "Mr. Stark, I don\'t feel so good" was improvised by Tom Holland after the Russo brothers instructed him to act like he didn\'t want to go.',
      'Shot entirely with digital IMAX cameras, making it the first Hollywood feature film shot 100% in the format.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg',
    streamingLinks: [
      { platform: 'Disney+ Hotstar', url: 'https://www.hotstar.com/movies/avengers-infinity-war/1260014768', availableRegions: ['US', 'UK', 'IN', 'JP'], priceTier: 'Included' },
      { platform: 'Amazon Prime', url: 'https://www.amazon.com/dp/infinity-war', availableRegions: ['US', 'UK'], priceTier: 'Premium Rent' }
    ],
    productionTrivia: 'Over 2,900 VFX shots were crafted across 14 visual effects studios worldwide to render the battles on Titan and Wakanda.',
    trailerYoutubeId: '6ZfuNTqbHE8'
  },
  {
    id: 'avengers-endgame',
    title: 'Avengers: Endgame',
    type: 'Movie',
    year: 2019,
    runtimeOrSeasons: '181 min',
    rating: 5.0,
    genres: ['Action', 'Sci-Fi', 'Adventure', 'Drama', 'Superhero'],
    directorOrCreator: 'Anthony Russo, Joe Russo',
    cast: ['Robert Downey Jr.', 'Chris Evans', 'Mark Ruffalo', 'Chris Hemsworth', 'Scarlett Johansson', 'Jeremy Renner', 'Don Cheadle', 'Paul Rudd', 'Brie Larson', 'Karen Gillan', 'Josh Brolin'],
    synopsis: 'After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more to reverse Thanos\' actions and restore balance.',
    criticalAnalysis: 'A towering emotional crescendo delivering an unprecedented payoff to a 22-film cinematic saga, featuring time-travel nostalgia, sacrifice, and the monumental "Avengers... Assemble" portal charge.',
    trivia: [
      'Robert Downey Jr. was the only actor granted permission to read the complete Endgame script in its entirety.',
      'The "I am Iron Man" final snap dialogue was conceived by editor Jeff Ford during post-production reshoots in January 2019.',
      'Endgame became the highest-grossing film of all time upon theatrical release, shattering global opening weekend records.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
    streamingLinks: [
      { platform: 'Disney+ Hotstar', url: 'https://www.hotstar.com/movies/avengers-endgame/1260014769', availableRegions: ['US', 'UK', 'IN', 'JP'], priceTier: 'Included' },
      { platform: 'Amazon Prime', url: 'https://www.amazon.com/dp/endgame', availableRegions: ['US', 'UK'], priceTier: 'Premium Rent' }
    ],
    productionTrivia: 'The climactic Battle of Earth featured over 35 distinct Marvel heroes interacting simultaneously across a computer-rendered rubble field.',
    trailerYoutubeId: 'TcMBFSGVi1c'
  },

  // --- INFINITY SAGA PHASE 1 CLASSICS ---
  {
    id: 'iron-man',
    title: 'Iron Man',
    type: 'Movie',
    year: 2008,
    runtimeOrSeasons: '126 min',
    rating: 4.9,
    genres: ['Action', 'Sci-Fi', 'Adventure', 'Superhero'],
    directorOrCreator: 'Jon Favreau',
    cast: ['Robert Downey Jr.', 'Gwyneth Paltrow', 'Jeff Bridges', 'Terrence Howard', 'Jon Favreau'],
    synopsis: 'After being held captive in an Afghan cave, billionaire industrialist Tony Stark creates a unique weaponized suit of armor to fight evil and revolutionize the modern world.',
    criticalAnalysis: 'The lightning-in-a-bottle genesis of the MCU. Robert Downey Jr.’s charismatic, improvisational portrayal of Tony Stark created the gold standard for contemporary superhero cinema.',
    trivia: [
      'Most of the dialogue was improvised on set because the script was incomplete when production started.',
      'Jon Favreau fought relentlessly for Robert Downey Jr. to be cast when the studio initially considered other candidates.',
      'The post-credits scene featuring Samuel L. Jackson as Nick Fury introducing the "Avengers Initiative" was kept top secret.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/cyecbEZ8cflaID43AhIe1b6B7k3.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/78lPtwv72eTNqFW9COBYI0dWDJa.jpg',
    streamingLinks: [
      { platform: 'Disney+ Hotstar', url: 'https://www.hotstar.com/movies/iron-man/1260014770', availableRegions: ['US', 'UK', 'IN', 'JP'], priceTier: 'Included' },
      { platform: 'Amazon Prime', url: 'https://www.amazon.com/dp/ironman', availableRegions: ['US', 'UK'], priceTier: 'Premium Rent' }
    ],
    productionTrivia: 'Stan Winston Studios built physical fiberglass and metal Mark III suit segments for RDJ to wear during close-up shots.',
    trailerYoutubeId: '8ugaeA-nMTc'
  },
  {
    id: 'the-incredible-hulk',
    title: 'The Incredible Hulk',
    type: 'Movie',
    year: 2008,
    runtimeOrSeasons: '112 min',
    rating: 4.5,
    genres: ['Action', 'Sci-Fi', 'Adventure', 'Superhero'],
    directorOrCreator: 'Louis Leterrier',
    cast: ['Edward Norton', 'Liv Tyler', 'Tim Roth', 'William Hurt', 'Tim Blake Nelson'],
    synopsis: 'Scientist Bruce Banner scours the planet for an antidote to the unbridled force of rage within him while evading General Ross and battling the monstrous Abomination.',
    criticalAnalysis: 'A gritty, chase-heavy monster thriller paying homage to classic fugitive narratives and 1970s television serials, culminating in a raw Harlem showdown.',
    trivia: [
      'Edward Norton rewrote significant portions of the screenplay to deepen Bruce Banner\'s psychological dilemma.',
      'Lou Ferrigno, who played the Hulk in the 1970s TV series, voiced the Hulk and made a cameo appearance as a security guard.',
      'The climax in Harlem was shot on actual streets in Toronto converted into Manhattan thoroughfares.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/kYd1Avzq5zg0u5h13F8gL5Z7lA.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/gKzYx795DerUDTGmuAKGhLIUt4u.jpg',
    streamingLinks: [
      { platform: 'Disney+ Hotstar', url: 'https://www.hotstar.com/movies/the-incredible-hulk/1260014771', availableRegions: ['US', 'UK', 'IN', 'JP'], priceTier: 'Included' },
      { platform: 'Amazon Prime', url: 'https://www.amazon.com/dp/incredible-hulk', availableRegions: ['US', 'UK'], priceTier: 'Premium Rent' }
    ],
    productionTrivia: 'The pulse rate monitor worn by Banner was inspired by biometric monitors used by free-divers.',
    trailerYoutubeId: 'xbqNb2PFKKA'
  },
  {
    id: 'iron-man-2',
    title: 'Iron Man 2',
    type: 'Movie',
    year: 2010,
    runtimeOrSeasons: '124 min',
    rating: 4.6,
    genres: ['Action', 'Sci-Fi', 'Adventure', 'Superhero'],
    directorOrCreator: 'Jon Favreau',
    cast: ['Robert Downey Jr.', 'Gwyneth Paltrow', 'Don Cheadle', 'Scarlett Johansson', 'Sam Rockwell', 'Mickey Rourke'],
    synopsis: 'With the world now aware of his identity as Iron Man, Tony Stark must contend with his declining health and a vengeful Russian physicist wielding electric whips.',
    criticalAnalysis: 'Introduced Scarlett Johansson as Natasha Romanoff / Black Widow with legendary hallway combat, alongside Don Cheadle as War Machine in the Japanese Expo duel.',
    trivia: [
      'Scarlett Johansson dyed her hair red before officially landing the role of Black Widow to demonstrate her dedication.',
      'Mickey Rourke visited a high-security Moscow prison to research Russian prison tattoos and accent for Whiplash.',
      'Sam Rockwell danced his way onto the Stark Expo stage in an unscripted moment of comedic flair.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/6flA0A1d37Yf8M30C2DkZp1b2.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/6WBeq4jjqgpH2uqd0i089vF8uS3.jpg',
    streamingLinks: [
      { platform: 'Disney+ Hotstar', url: 'https://www.hotstar.com/movies/iron-man-2/1260014772', availableRegions: ['US', 'UK', 'IN', 'JP'], priceTier: 'Included' }
    ],
    productionTrivia: 'The Monaco Grand Prix race track sequence was recreated with life-size replica Formula 1 cars crashing on studio parking lots.',
    trailerYoutubeId: 'wKtcmiifycU'
  },
  {
    id: 'thor',
    title: 'Thor',
    type: 'Movie',
    year: 2011,
    runtimeOrSeasons: '115 min',
    rating: 4.6,
    genres: ['Action', 'Fantasy', 'Adventure', 'Superhero'],
    directorOrCreator: 'Kenneth Branagh',
    cast: ['Chris Hemsworth', 'Natalie Portman', 'Tom Hiddleston', 'Stellan Skarsgård', 'Anthony Hopkins', 'Idris Elba'],
    synopsis: 'The powerful but arrogant god Thor is cast out of Asgard to live amongst humans on Earth, where he becomes one of humanity\'s finest defenders when a dark threat emerges.',
    criticalAnalysis: 'Kenneth Branagh infused Shakespearean royal court drama into Asgard’s golden architecture, launching Chris Hemsworth and Tom Hiddleston as generational pop-culture icons.',
    trivia: [
      'Chris Hemsworth gained 20 pounds of muscle for the role by eating high-protein meals every two hours.',
      'Tom Hiddleston initially auditioned for the role of Thor, training and bulking up before Kenneth Branagh cast him as Loki.',
      'The Rainbow Bridge Bifrost design was modeled after quantum wormhole theory visualized through prism optics.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/3SDoZf97qQp5Z5h13F8gL5Z7lA.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/prSfAi1xGrhLQNxVSUFh61xQvQy.jpg',
    streamingLinks: [
      { platform: 'Disney+ Hotstar', url: 'https://www.hotstar.com/movies/thor/1260014773', availableRegions: ['US', 'UK', 'IN', 'JP'], priceTier: 'Included' }
    ],
    productionTrivia: 'Mjolnir prop hammers were constructed from aerated rubber and resin for stunt safety and metallic resonance.',
    trailerYoutubeId: 'JOddp-nlNvQ'
  },
  {
    id: 'captain-america-first-avenger',
    title: 'Captain America: The First Avenger',
    type: 'Movie',
    year: 2011,
    runtimeOrSeasons: '124 min',
    rating: 4.7,
    genres: ['Action', 'Adventure', 'Sci-Fi', 'War', 'Superhero'],
    directorOrCreator: 'Joe Johnston',
    cast: ['Chris Evans', 'Hayley Atwell', 'Sebastian Stan', 'Tommy Lee Jones', 'Hugo Weaving', 'Dominic Cooper'],
    synopsis: 'Steve Rogers, a rejected military soldier, transforms into Captain America after taking a dose of a Super-Soldier serum, leading the fight against the Nazi-backed HYDRA.',
    criticalAnalysis: 'A stylish, heartfelt World War II pulp adventure that established Steve Rogers’ moral compass and immortal romance with Peggy Carter.',
    trivia: [
      'Skinny Steve was created using digital body-shrinking technology combining Chris Evans’ facial performance with body double Leander Deeny.',
      'Chris Evans turned down the role of Captain America three times due to fears over a 9-movie commitment before agreeing.',
      'Hayley Atwell spontaneously touched Chris Evans’ chest during the transformation scene; the reaction was genuine and kept in the film.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/b34jIp49t11A9T9a27g0u5h13F8.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/vSNxAJTlD0r02V9sPYwqjqbpK0v.jpg',
    streamingLinks: [
      { platform: 'Disney+ Hotstar', url: 'https://www.hotstar.com/movies/captain-america-the-first-avenger/1260014774', availableRegions: ['US', 'UK', 'IN', 'JP'], priceTier: 'Included' }
    ],
    productionTrivia: 'The vibranium shield went through 50 different prototype designs to match the sheen of 1940s spun aircraft aluminum.',
    trailerYoutubeId: 'JerVrbLldXw'
  },

  // --- INFINITY SAGA PHASE 2 & 3 MASTERPIECES ---
  {
    id: 'iron-man-3',
    title: 'Iron Man 3',
    type: 'Movie',
    year: 2013,
    runtimeOrSeasons: '130 min',
    rating: 4.6,
    genres: ['Action', 'Sci-Fi', 'Adventure', 'Superhero'],
    directorOrCreator: 'Shane Black',
    cast: ['Robert Downey Jr.', 'Gwyneth Paltrow', 'Don Cheadle', 'Guy Pearce', 'Rebecca Hall', 'Ben Kingsley'],
    synopsis: 'When Tony Stark’s world is torn apart by a formidable terrorist called the Mandarin, he starts an odyssey of rebuilding and retribution while dealing with PTSD.',
    criticalAnalysis: 'Shane Black stripped Tony Stark of his armor, forcing the hero to rely purely on his wits, engineering acumen, and mechanics to survive.',
    trivia: [
      'The skydiving rescue of 13 passengers from Air Force One was performed by the Red Bull skydiving team with minimal CGI.',
      'Robert Downey Jr. injured his ankle during an on-set stunt jump, pausing production for six weeks.',
      'Ben Kingsley’s dual performance as Trevor Slattery and the Mandarin shocked audiences and subverted expectations.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/fn4n6uOYghAVCLM2KnJG5hJ4k30.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/qhPtAc1TKbMPqNvcdXS46um79Pa.jpg',
    streamingLinks: [
      { platform: 'Disney+ Hotstar', url: 'https://www.hotstar.com/movies/iron-man-3/1260014775', availableRegions: ['US', 'UK', 'IN', 'JP'], priceTier: 'Included' }
    ],
    productionTrivia: 'The "House Party Protocol" featured 34 individually conceptualized Iron Man suit variants in the shipping yard finale.',
    trailerYoutubeId: 'YLorLVa95Xo'
  },
  {
    id: 'thor-the-dark-world',
    title: 'Thor: The Dark World',
    type: 'Movie',
    year: 2013,
    runtimeOrSeasons: '112 min',
    rating: 4.4,
    genres: ['Action', 'Fantasy', 'Adventure', 'Superhero'],
    directorOrCreator: 'Alan Taylor',
    cast: ['Chris Hemsworth', 'Natalie Portman', 'Tom Hiddleston', 'Anthony Hopkins', 'Christopher Eccleston', 'Rene Russo'],
    synopsis: 'When the Dark Elves attempt to plunge the universe into darkness, Thor must embark on a perilous journey that forces him to ally with treacherous brother Loki.',
    criticalAnalysis: 'Explored the mystical cosmologies of the Nine Realms and introduced the Aether / Reality Stone into the broader Infinity Saga lore.',
    trivia: [
      'Tom Hiddleston and Chris Hemsworth improvised several comedic sibling banter scenes during the escape from Asgard.',
      'Filmed on location among the dramatic volcanic terrain of Iceland to represent Svartalfheim.',
      'Features a surprise cameo by Chris Evans as Loki shape-shifting into Captain America.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/uhYoyxWz4AYd5eYvT3F9d4mH.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/wp6Ox9XJqcv5VlrpX1F9B2L2vV.jpg',
    streamingLinks: [
      { platform: 'Disney+ Hotstar', url: 'https://www.hotstar.com/movies/thor-the-dark-world/1260014776', availableRegions: ['US', 'UK', 'IN', 'JP'], priceTier: 'Included' }
    ],
    productionTrivia: 'The portal convergence sequence in Greenwich utilized dynamic spatial perspective cameras.',
    trailerYoutubeId: 'npvJ9FTgZbM'
  },
  {
    id: 'captain-america-winter-soldier',
    title: 'Captain America: The Winter Soldier',
    type: 'Movie',
    year: 2014,
    runtimeOrSeasons: '136 min',
    rating: 4.9,
    genres: ['Action', 'Sci-Fi', 'Thriller', 'Superhero'],
    directorOrCreator: 'Anthony Russo, Joe Russo',
    cast: ['Chris Evans', 'Scarlett Johansson', 'Sebastian Stan', 'Anthony Mackie', 'Cobie Smulders', 'Robert Redford', 'Samuel L. Jackson'],
    synopsis: 'As Steve Rogers struggles to embrace his role in the modern world, he teams up with Natasha Romanoff and the Falcon to uncover a massive conspiracy within S.H.I.E.L.D.',
    criticalAnalysis: 'A masterwork 1970s political paranoia thriller disguised as a superhero movie, boasting visceral hand-to-hand knife combat and the iconic elevator fight.',
    trivia: [
      'The elevator fight sequence took seven full days to shoot, with Chris Evans performing nearly all combat moves in tight confines.',
      'Robert Redford agreed to appear because his grandchildren were passionate Marvel comic book fans.',
      'Sebastian Stan practiced knife-flipping maneuvers for months using plastic butter knives during down time.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/4McK6q2yG7mP1v2FvX9s0u5h13.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/5T1bF8fW8Z9tF2y1q3a4s5d6.jpg',
    streamingLinks: [
      { platform: 'Disney+ Hotstar', url: 'https://www.hotstar.com/movies/captain-america-the-winter-soldier/1260014777', availableRegions: ['US', 'UK', 'IN', 'JP'], priceTier: 'Included' }
    ],
    productionTrivia: 'The highway brawl between Steve Rogers and the Winter Soldier used Indonesian Silat and Krav Maga martial arts styles.',
    trailerYoutubeId: '7SlILk2WMTI'
  },
  {
    id: 'guardians-of-the-galaxy',
    title: 'Guardians of the Galaxy',
    type: 'Movie',
    year: 2014,
    runtimeOrSeasons: '121 min',
    rating: 4.8,
    genres: ['Action', 'Sci-Fi', 'Adventure', 'Comedy', 'Superhero'],
    directorOrCreator: 'James Gunn',
    cast: ['Chris Pratt', 'Zoe Saldana', 'Dave Bautista', 'Vin Diesel', 'Bradley Cooper', 'Lee Pace', 'Michael Rooker', 'Karen Gillan'],
    synopsis: 'A group of intergalactic criminals must pull together to stop a fanatical warrior with plans to purge the universe using a mysterious orb.',
    criticalAnalysis: 'James Gunn breathed riotous punk-rock vitality into space opera, pairing a legendary 1970s pop soundtrack with a talking raccoon and tree.',
    trivia: [
      'Chris Pratt lost 60 pounds in six months through intense CrossFit and nutrition to portray Star-Lord.',
      'Vin Diesel recorded the line "I am Groot" over a thousand times in 15 different languages for global dubs.',
      'The Awesome Mix Vol. 1 cassette soundtrack reached #1 on the US Billboard 200 chart.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/uLtVingCrMy499t935io79m8R6e.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg',
    streamingLinks: [
      { platform: 'Disney+ Hotstar', url: 'https://www.hotstar.com/movies/guardians-of-the-galaxy/1260014778', availableRegions: ['US', 'UK', 'IN', 'JP'], priceTier: 'Included' }
    ],
    productionTrivia: 'James Gunn played the retro pop songs live on set via loudspeakers so actors could match their timing and swagger.',
    trailerYoutubeId: 'd96cjJhvlMA'
  },
  {
    id: 'ant-man',
    title: 'Ant-Man',
    type: 'Movie',
    year: 2015,
    runtimeOrSeasons: '117 min',
    rating: 4.7,
    genres: ['Action', 'Sci-Fi', 'Comedy', 'Superhero'],
    directorOrCreator: 'Peyton Reed',
    cast: ['Paul Rudd', 'Michael Douglas', 'Evangeline Lilly', 'Corey Stoll', 'Bobby Cannavale', 'Michael Peña'],
    synopsis: 'Armed with a super-suit with the astonishing ability to shrink in scale but increase in strength, cat burglar Scott Lang must help his mentor pull off a high-stakes heist.',
    criticalAnalysis: 'A breezy, inventive macro-lens heist comedy that delivered some of the MCU’s most playful visual gags, notably the climactic toy Thomas the Tank Engine brawl.',
    trivia: [
      'Paul Rudd engaged in intense physical conditioning, joking that he ate nothing but carbs-free air for a year.',
      'Michael Peña’s legendary rapid-fire montage voiceovers were scripted with exact phonetic rhythms.',
      'Macro photography cameras were specifically built to capture real textures like carpet fibers and dust at insect scale.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/7bvpvH3K9g0u5h13F8gL5Z7lA.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/rQRnQ9AhNmNp2taSl2wt4veBzRm.jpg',
    streamingLinks: [
      { platform: 'Disney+ Hotstar', url: 'https://www.hotstar.com/movies/ant-man/1260014779', availableRegions: ['US', 'UK', 'IN', 'JP'], priceTier: 'Included' }
    ],
    productionTrivia: 'The quantum realm visual effects were inspired by electron microscope scans and fractal mathematical geometry.',
    trailerYoutubeId: 'pWdKf3MneyI'
  },
  {
    id: 'captain-america-civil-war',
    title: 'Captain America: Civil War',
    type: 'Movie',
    year: 2016,
    runtimeOrSeasons: '147 min',
    rating: 4.9,
    genres: ['Action', 'Sci-Fi', 'Adventure', 'Drama', 'Superhero'],
    directorOrCreator: 'Anthony Russo, Joe Russo',
    cast: ['Chris Evans', 'Robert Downey Jr.', 'Scarlett Johansson', 'Sebastian Stan', 'Anthony Mackie', 'Don Cheadle', 'Jeremy Renner', 'Chadwick Boseman', 'Paul Bettany', 'Elizabeth Olsen', 'Paul Rudd', 'Tom Holland'],
    synopsis: 'Political involvement in the Avengers’ affairs causes a rift between Captain America and Iron Man, fracturing the team into opposing factions when the Sokovia Accords are introduced.',
    criticalAnalysis: 'Essentially Avengers 2.5, balancing 12 headlining heroes in the celebrated Leipzig/Halle airport splash-panel battle while introducing Black Panther and Spider-Man.',
    trivia: [
      'Chadwick Boseman made his MCU debut as T’Challa, performing extensive African martial arts routines.',
      'Tom Holland filmed his audition tape with Chris Evans, performing backflips to prove his gymnastic background.',
      'The final shield-against-repulsor clash in the Siberian bunker was lifted directly from the iconic Marvel comic cover by Steve McNiven.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/m5O3SZvQ6Eg83mXxZLcqjhq5F0m.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/rAGiXaUfPzY7CDEyNK9Y99dn25P.jpg',
    streamingLinks: [
      { platform: 'Disney+ Hotstar', url: 'https://www.hotstar.com/movies/captain-america-civil-war/1260014780', availableRegions: ['US', 'UK', 'IN', 'JP'], priceTier: 'Included' }
    ],
    productionTrivia: 'The airport fight was shot on open-air tarmac in Atlanta under blazing heat with custom IMAX cameras.',
    trailerYoutubeId: 'dKrVegVI0Us'
  },
  {
    id: 'doctor-strange',
    title: 'Doctor Strange',
    type: 'Movie',
    year: 2016,
    runtimeOrSeasons: '115 min',
    rating: 4.7,
    genres: ['Action', 'Fantasy', 'Sci-Fi', 'Adventure', 'Superhero'],
    directorOrCreator: 'Scott Derrickson',
    cast: ['Benedict Cumberbatch', 'Chiwetel Ejiofor', 'Rachel McAdams', 'Benedict Wong', 'Mads Mikkelsen', 'Tilda Swinton'],
    synopsis: 'While on a journey of physical and spiritual healing, a brilliant neurosurgeon is drawn into the world of the mystic arts and multiverse dimensions.',
    criticalAnalysis: 'Mind-bending kaleidoscope visuals inspired by M.C. Escher and Steve Ditko comic art, featuring the brilliant time-loop bargain with Dormammu.',
    trivia: [
      'Benedict Cumberbatch walked into a Manhattan comic book store in full Doctor Strange costume during filming.',
      'The kaleidoscope mirror dimension city shifts required months of geometric ray-tracing shaders.',
      'The "Dormammu, I\'ve come to bargain" scene was motion-captured by Cumberbatch himself playing the cosmic entity.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/tFI8XD0TxzHzg8Y0oP0v5h13F8.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/uGBVj3bEbCoZbDjjl9wMgrghcyx.jpg',
    streamingLinks: [
      { platform: 'Disney+ Hotstar', url: 'https://www.hotstar.com/movies/doctor-strange/1260014781', availableRegions: ['US', 'UK', 'IN', 'JP'], priceTier: 'Included' }
    ],
    productionTrivia: 'The Cloak of Levitation was given an expressive personality by animators, acting like an obedient magical familiar.',
    trailerYoutubeId: 'HSzx-zryEgM'
  },
  {
    id: 'guardians-of-the-galaxy-vol-2',
    title: 'Guardians of the Galaxy Vol. 2',
    type: 'Movie',
    year: 2017,
    runtimeOrSeasons: '136 min',
    rating: 4.7,
    genres: ['Action', 'Sci-Fi', 'Adventure', 'Comedy', 'Superhero'],
    directorOrCreator: 'James Gunn',
    cast: ['Chris Pratt', 'Zoe Saldana', 'Dave Bautista', 'Vin Diesel', 'Bradley Cooper', 'Michael Rooker', 'Karen Gillan', 'Pom Klementieff', 'Kurt Russell'],
    synopsis: 'The Guardians struggle to keep their newfound family together as they unravel the mystery of Peter Quill’s true celestial parentage.',
    criticalAnalysis: 'A deeply emotional character study beneath neon space operatics, culminating in Michael Rooker’s heart-wrenching Yondu sacrifice.',
    trivia: [
      'Baby Groot’s dancing intro scene took over two years for the animation team to craft, using James Gunn’s own reference dance.',
      'Kurt Russell was cast as Ego the Living Planet at the direct suggestion of Chris Pratt.',
      'Over 400 pounds of biodegradable metallic glitter was used for the Sovereign civilization scenes.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/aJn9Xmun8euQvXo976kLcu24m.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/y4MBh0EjBlMuOzv9MFbBOiqjv0V.jpg',
    streamingLinks: [
      { platform: 'Disney+ Hotstar', url: 'https://www.hotstar.com/movies/guardians-of-the-galaxy-vol-2/1260014782', availableRegions: ['US', 'UK', 'IN', 'JP'], priceTier: 'Included' }
    ],
    productionTrivia: 'The funeral scene featured the famous Ravager fireworks salute, rendered in over a million colorful particle emitters.',
    trailerYoutubeId: 'dW1BIid8Osg'
  },
  {
    id: 'spider-man-homecoming',
    title: 'Spider-Man: Homecoming',
    type: 'Movie',
    year: 2017,
    runtimeOrSeasons: '133 min',
    rating: 4.8,
    genres: ['Action', 'Adventure', 'Sci-Fi', 'Comedy', 'Superhero'],
    directorOrCreator: 'Jon Watts',
    cast: ['Tom Holland', 'Michael Keaton', 'Robert Downey Jr.', 'Marisa Tomei', 'Jon Favreau', 'Zendaya', 'Jacob Batalon'],
    synopsis: 'Peter Parker balances his life as an ordinary high school student in Queens with his superhero alter-ego Spider-Man, finding himself on the trail of a new villain called the Vulture.',
    criticalAnalysis: 'A delightful John Hughes-inspired high-school coming-of-age comedy anchored by Michael Keaton’s menacing Vulture and the shocking front-door twist.',
    trivia: [
      'Tom Holland went undercover at The Bronx High School of Science under a fake name to prepare for American high school life.',
      'The car conversation between Peter Parker and Adrian Toomes was praised by critics as one of the tense masterclasses in Marvel history.',
      'The Washington Monument elevator rescue was shot on a 1:1 scale physical replica of the monument’s spire.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/vc8bCGjdVBDq9jw69v7b0v5h13F.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/c24sv2weTHPsmDa7jEMN0m2P3RT.jpg',
    streamingLinks: [
      { platform: 'Disney+ Hotstar', url: 'https://www.hotstar.com/movies/spider-man-homecoming/1260014783', availableRegions: ['US', 'UK', 'IN', 'JP'], priceTier: 'Included' },
      { platform: 'Netflix', url: 'https://www.netflix.com/title/80166369', availableRegions: ['US', 'IN'], priceTier: 'Included' }
    ],
    productionTrivia: 'The ferry split sequence was filmed using high-pressure hydraulic rigs tearing a life-size Staten Island ferry replica in half.',
    trailerYoutubeId: 'U0D338898BM'
  },
  {
    id: 'thor-ragnarok',
    title: 'Thor: Ragnarok',
    type: 'Movie',
    year: 2017,
    runtimeOrSeasons: '130 min',
    rating: 4.9,
    genres: ['Action', 'Adventure', 'Comedy', 'Sci-Fi', 'Superhero'],
    directorOrCreator: 'Taika Waititi',
    cast: ['Chris Hemsworth', 'Tom Hiddleston', 'Cate Blanchett', 'Idris Elba', 'Jeff Goldblum', 'Tessa Thompson', 'Karl Urban', 'Mark Ruffalo', 'Anthony Hopkins'],
    synopsis: 'Imprisoned on the planet Sakaar, Thor must race against time to return to Asgard and stop Ragnarök, the destruction of his world at the hands of the ruthless Hela.',
    criticalAnalysis: 'Taika Waititi revitalized the Thor franchise with vibrant Jack Kirby color palettes, synthwave energy, Led Zeppelin’s Immigrant Song, and improvised deadpan comedy.',
    trivia: [
      'Over 80% of the dialogue in the film was improvised by the cast on set under Waititi\'s loose direction.',
      'The line "He\'s a friend from work!" was suggested to Chris Hemsworth by a Make-A-Wish child visiting the set that day.',
      'Cate Blanchett learned the Brazilian martial art Capoeira to give Hela a unique, serpentine combat posture.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/kaIfm5ryEOwYg8Y0oP0v5h13F8.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/rzRwTcFvttcN1ZpX2xv4j3tSdJu.jpg',
    streamingLinks: [
      { platform: 'Disney+ Hotstar', url: 'https://www.hotstar.com/movies/thor-ragnarok/1260014784', availableRegions: ['US', 'UK', 'IN', 'JP'], priceTier: 'Included' }
    ],
    productionTrivia: 'Korg’s rocks were modeled after volcanic basalt and voiced entirely by director Taika Waititi in a gray motion-capture onesie.',
    trailerYoutubeId: 'ue80QwXMRHg'
  },
  {
    id: 'black-panther',
    title: 'Black Panther',
    type: 'Movie',
    year: 2018,
    runtimeOrSeasons: '134 min',
    rating: 4.9,
    genres: ['Action', 'Sci-Fi', 'Adventure', 'Superhero', 'Drama'],
    directorOrCreator: 'Ryan Coogler',
    cast: ['Chadwick Boseman', 'Michael B. Jordan', 'Lupita Nyong\'o', 'Danai Gurira', 'Martin Freeman', 'Daniel Kaluuya', 'Letitia Wright', 'Winston Duke', 'Angela Bassett', 'Forest Whitaker'],
    synopsis: 'T’Challa, heir to the hidden kingdom of Wakanda, must step forward to lead his people into a new future and confront a challenger from his country’s past.',
    criticalAnalysis: 'A cultural phenomenon and Academy Award-winning masterwork weaving Afrofuturism, anticolonial philosophy, and Michael B. Jordan’s indelible Killmonger.',
    trivia: [
      'Costume designer Ruth E. Carter won an Academy Award for blending traditional Maasai, Zulu, and Dogon garments with high-tech armor.',
      'The cast spoke isiXhosa, one of South Africa’s official languages, for Wakandan royal dialogues.',
      'It became the first superhero film in history to receive an Academy Award nomination for Best Picture.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/6ELJEzQJ3Y45Z5h13F8gL5Z7lA.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFv9GhgUpjEFO.jpg',
    streamingLinks: [
      { platform: 'Disney+ Hotstar', url: 'https://www.hotstar.com/movies/black-panther/1260014785', availableRegions: ['US', 'UK', 'IN', 'JP'], priceTier: 'Included' }
    ],
    productionTrivia: 'The Warrior Falls challenge combat took place on a 36-foot-high cliff set containing 25,000 gallons of recirculated heated water.',
    trailerYoutubeId: 'xjDjIWPwcPU'
  },
  {
    id: 'ant-man-and-the-wasp',
    title: 'Ant-Man and the Wasp',
    type: 'Movie',
    year: 2018,
    runtimeOrSeasons: '118 min',
    rating: 4.6,
    genres: ['Action', 'Adventure', 'Sci-Fi', 'Comedy', 'Superhero'],
    directorOrCreator: 'Peyton Reed',
    cast: ['Paul Rudd', 'Evangeline Lilly', 'Michael Peña', 'Walton Goggins', 'Bobby Cannavale', 'Michelle Pfeiffer', 'Laurence Fishburne', 'Michael Douglas'],
    synopsis: 'As Scott Lang balances being both a superhero and a father, Hope van Dyne and Dr. Hank Pym present an urgent new mission to rescue Janet from the Quantum Realm.',
    criticalAnalysis: 'A high-speed San Francisco car-chase romp featuring dynamic scale-shifting combat and the quantum mechanics that paved the way for Endgame’s time heist.',
    trivia: [
      'Evangeline Lilly worked with choreographers to give the Wasp fluid, graceful fighting techniques distinct from Ant-Man.',
      'The car chase scene through San Francisco utilized custom shrinking and enlarging prop cars pulled on motorized cables.',
      'The post-credits scene directly ties into Thanos\' snap, leaving Scott trapped in the Quantum Realm.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/6P3c80EOm976kLcu24mX9s0u5h1.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/eivQmS3wqz9Q11qG18k6q6p6.jpg',
    streamingLinks: [
      { platform: 'Disney+ Hotstar', url: 'https://www.hotstar.com/movies/ant-man-and-the-wasp/1260014786', availableRegions: ['US', 'UK', 'IN', 'JP'], priceTier: 'Included' }
    ],
    productionTrivia: 'Michelle Pfeiffer was cast after Paul Rudd and Peyton Reed stated she was their singular dream choice for Janet van Dyne.',
    trailerYoutubeId: '8_rTIAOohas'
  },
  {
    id: 'captain-marvel',
    title: 'Captain Marvel',
    type: 'Movie',
    year: 2019,
    runtimeOrSeasons: '124 min',
    rating: 4.6,
    genres: ['Action', 'Sci-Fi', 'Adventure', 'Superhero'],
    directorOrCreator: 'Anna Boden, Ryan Fleck',
    cast: ['Brie Larson', 'Samuel L. Jackson', 'Ben Mendelsohn', 'Djimon Hounsou', 'Lee Pace', 'Lashana Lynch', 'Gemma Chan', 'Annette Bening', 'Jude Law'],
    synopsis: 'Carol Danvers becomes one of the universe’s most powerful heroes when Earth is caught in the middle of a galactic war between two alien races in 1995.',
    criticalAnalysis: 'A 1990s retro buddy-cop sci-fi adventure featuring groundbreaking de-aging visual effects for Samuel L. Jackson and the origin of the Avengers pager.',
    trivia: [
      'Brie Larson spent nine months training in judo, boxing, and wrestled an actual 5,000-pound Jeep up a hill.',
      'Samuel L. Jackson was digitally de-aged by 25 years for the entire runtime using Lola VFX frame-by-frame skin tracking.',
      'Goose the Flerken was portrayed by four different trained orange tabby cats named Reggie, Archie, Rizzo, and Gonzo.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/w2PMyoyCc2ndmwh9368nQ202.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/AtsgWhDnHTq68L0lLsUrCnM7Tpn.jpg',
    streamingLinks: [
      { platform: 'Disney+ Hotstar', url: 'https://www.hotstar.com/movies/captain-marvel/1260014787', availableRegions: ['US', 'UK', 'IN', 'JP'], priceTier: 'Included' }
    ],
    productionTrivia: 'Stan Lee recorded a heartwarming cameo riding a 1990s LA subway reading the script for Mallrats.',
    trailerYoutubeId: 'Z1BCujX3pw8'
  },
  {
    id: 'spider-man-far-from-home',
    title: 'Spider-Man: Far From Home',
    type: 'Movie',
    year: 2019,
    runtimeOrSeasons: '129 min',
    rating: 4.8,
    genres: ['Action', 'Adventure', 'Sci-Fi', 'Comedy', 'Superhero'],
    directorOrCreator: 'Jon Watts',
    cast: ['Tom Holland', 'Samuel L. Jackson', 'Zendaya', 'Cobie Smulders', 'Jon Favreau', 'JB Smoove', 'Jacob Batalon', 'Martin Starr', 'Marisa Tomei', 'Jake Gyllenhaal'],
    synopsis: 'Following the events of Avengers: Endgame, Peter Parker goes on a school trip to Europe, where he is recruited by Nick Fury to face elemental creatures alongside Mysterio.',
    criticalAnalysis: 'The official epilogue to the Infinity Saga, delivering dazzling illusion drone battles in Berlin and London, ending on the shocking J. Jonah Jameson identity unmasking.',
    trivia: [
      'Jake Gyllenhaal and Tom Holland formed an instant friendship on set, frequently ruining takes with uncontrollable laughter.',
      'The Berlin illusion graveyard sequence was inspired by classic surrealist Steve Ditko artwork and Salvador Dalí dreamscapes.',
      'J.K. Simmons made a surprise return as J. Jonah Jameson, marking the first cross-franchise legacy casting in the MCU.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/87t28Q6b1k1aZ7m9.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/4q2hz2mYflshmpKhG5wNxY5hYnO.jpg',
    streamingLinks: [
      { platform: 'Disney+ Hotstar', url: 'https://www.hotstar.com/movies/spider-man-far-from-home/1260014788', availableRegions: ['US', 'UK', 'IN', 'JP'], priceTier: 'Included' },
      { platform: 'Netflix', url: 'https://www.netflix.com/title/81055822', availableRegions: ['US', 'IN'], priceTier: 'Included' }
    ],
    productionTrivia: 'Over 200 high-speed stunt drones were physically flown through the Tower Bridge set for practical lighting interaction.',
    trailerYoutubeId: 'Nt9L1jCKGnE'
  },

  // --- MULTIVERSE SAGA BLOCKBUSTERS (PHASES 4-5) ---
  {
    id: 'black-widow',
    title: 'Black Widow',
    type: 'Movie',
    year: 2021,
    runtimeOrSeasons: '134 min',
    rating: 4.6,
    genres: ['Action', 'Adventure', 'Thriller', 'Superhero'],
    directorOrCreator: 'Cate Shortland',
    cast: ['Scarlett Johansson', 'Florence Pugh', 'David Harbour', 'O-T Fagbenle', 'Olga Kurylenko', 'William Hurt', 'Ray Winstone', 'Rachel Weisz'],
    synopsis: 'Natasha Romanoff confronts the darker parts of her ledger when a dangerous conspiracy with ties to her past arises, reuniting her with her estranged Russian spy family.',
    criticalAnalysis: 'A gritty espionage thriller exploring trauma, sisterhood, and the Red Room, featuring Florence Pugh’s breakout role as the hilarious, deadly Yelena Belova.',
    trivia: [
      'Scarlett Johansson served as an executive producer and personally handpicked Cate Shortland to direct.',
      'Florence Pugh performed her own motorcycle stunts through the historic streets of Budapest.',
      'David Harbour gained and lost weight dynamically across production to portray Red Guardian’s prison era.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/dq18enALOq976kLcu24m.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/qAZ0whmmpPPbCIUtvxnvfi009jJ.jpg',
    streamingLinks: [
      { platform: 'Disney+ Hotstar', url: 'https://www.hotstar.com/movies/black-widow/1260014789', availableRegions: ['US', 'UK', 'IN', 'JP'], priceTier: 'Included' }
    ],
    productionTrivia: 'The skydiving chimney free-fall sequence used wind-tunnel simulation rigs matching 120 mph terminal velocity.',
    trailerYoutubeId: 'Fp9pNPdNwjI'
  },
  {
    id: 'shang-chi',
    title: 'Shang-Chi and the Legend of the Ten Rings',
    type: 'Movie',
    year: 2021,
    runtimeOrSeasons: '132 min',
    rating: 4.8,
    genres: ['Action', 'Adventure', 'Fantasy', 'Superhero'],
    directorOrCreator: 'Destin Daniel Cretton',
    cast: ['Simu Liu', 'Awkwafina', 'Meng\'er Zhang', 'Fala Chen', 'Florian Munteanu', 'Benedict Wong', 'Michelle Yeoh', 'Tony Leung'],
    synopsis: 'Shang-Chi must confront the past he thought he left behind when he is drawn into the web of the mysterious Ten Rings organization led by his immortal father Wenwu.',
    criticalAnalysis: 'Wuxia martial arts elegance meets cinematic mythology. Simu Liu’s bus brawl and Tony Leung’s soulful, villainous performance redefined MCU action choreography.',
    trivia: [
      'Simu Liu famously tweeted Marvel in 2014 and 2018 asking to play Shang-Chi years before being cast.',
      'The stunt team was led by veterans of the Jackie Chan Stunt Team and the late legendary coordinator Brad Allan.',
      'Tony Leung accepted the role because he viewed Wenwu as a broken, grieving father rather than an evil warlord.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/cinER0ESG0eJ499t935io79m8.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/1BIoJGKbXjdFDAvUEiA2VHqkK1Z.jpg',
    streamingLinks: [
      { platform: 'Disney+ Hotstar', url: 'https://www.hotstar.com/movies/shang-chi-and-the-legend-of-the-ten-rings/1260014790', availableRegions: ['US', 'UK', 'IN', 'JP'], priceTier: 'Included' }
    ],
    productionTrivia: 'The San Francisco bendy bus fight was filmed on a physical mechanical gimbal capable of tilting 45 degrees.',
    trailerYoutubeId: '8YjFbMbfXaQ'
  },
  {
    id: 'eternals',
    title: 'Eternals',
    type: 'Movie',
    year: 2021,
    runtimeOrSeasons: '156 min',
    rating: 4.4,
    genres: ['Action', 'Adventure', 'Drama', 'Sci-Fi', 'Fantasy', 'Superhero'],
    directorOrCreator: 'Chloé Zhao',
    cast: ['Gemma Chan', 'Richard Madden', 'Kumail Nanjiani', 'Lia McHugh', 'Brian Tyree Henry', 'Lauren Ridloff', 'Barry Keoghan', 'Don Lee', 'Kit Harington', 'Salma Hayek', 'Angelina Jolie'],
    synopsis: 'The saga of the Eternals, a race of immortal beings who lived on Earth and shaped its history and civilizations, reuniting to protect mankind from the Deviants.',
    criticalAnalysis: 'Academy Award-winner Chloé Zhao brought natural golden-hour cinematography and philosophical scope to a 7,000-year myth of cosmic gods and human morality.',
    trivia: [
      'Chloé Zhao insisted on shooting almost exclusively on real locations in the Canary Islands and UK at golden hour rather than soundstages.',
      'Lauren Ridloff made history as Makkari, portraying the first deaf superhero in the Marvel Cinematic Universe.',
      'Kumail Nanjiani trained for a full year with bodybuilders to transform for the role of Kingo.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/k2twT9vTq3kLcu24mX9s0u5h.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/bcCBq9N1EMo3daNIjWJ8kYvrQm6.jpg',
    streamingLinks: [
      { platform: 'Disney+ Hotstar', url: 'https://www.hotstar.com/movies/eternals/1260014791', availableRegions: ['US', 'UK', 'IN', 'JP'], priceTier: 'Included' }
    ],
    productionTrivia: 'The Celestial Arishem was designed to be over 2,000 miles tall, with surface geometry resembling volcanic planetary crusts.',
    trailerYoutubeId: 'v1EkoQV4g5c'
  },
  {
    id: 'spider-man-no-way-home',
    title: 'Spider-Man: No Way Home',
    type: 'Movie',
    year: 2021,
    runtimeOrSeasons: '148 min',
    rating: 5.0,
    genres: ['Action', 'Adventure', 'Sci-Fi', 'Fantasy', 'Superhero'],
    directorOrCreator: 'Jon Watts',
    cast: ['Tom Holland', 'Zendaya', 'Benedict Cumberbatch', 'Jacob Batalon', 'Jon Favreau', 'Jamie Foxx', 'Willem Dafoe', 'Alfred Molina', 'Tobey Maguire', 'Andrew Garfield'],
    synopsis: 'With Spider-Man\'s identity now revealed, Peter asks Doctor Strange for help. When a spell goes wrong, dangerous foes from other worlds start to appear, forcing Peter to discover what it truly means to be Spider-Man.',
    criticalAnalysis: 'A generational cinematic triumph uniting three eras of Spider-Man cinema. Willem Dafoe’s Green Goblin delivers chilling menace while Tobey Maguire and Andrew Garfield offer profound redemption.',
    trivia: [
      'Andrew Garfield and Tobey Maguire wore cloaks on set to keep their historic return secret from the public for over a year.',
      'Willem Dafoe agreed to return as Green Goblin only if he could perform all his own physical combat and stunts at age 66.',
      'The film grossed over $1.92 billion worldwide, becoming the sixth highest-grossing movie in box office history.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
    streamingLinks: [
      { platform: 'Disney+ Hotstar', url: 'https://www.hotstar.com/movies/spider-man-no-way-home/1260014792', availableRegions: ['US', 'UK', 'IN', 'JP'], priceTier: 'Included' },
      { platform: 'Netflix', url: 'https://www.netflix.com/title/81442111', availableRegions: ['US', 'IN'], priceTier: 'Included' }
    ],
    productionTrivia: 'The Statue of Liberty battle scaffold was constructed across two soundstages with over 100 motion sensors tracking digital doubles.',
    trailerYoutubeId: 'JfVOs4VSpmA'
  },
  {
    id: 'doctor-strange-multiverse-of-madness',
    title: 'Doctor Strange in the Multiverse of Madness',
    type: 'Movie',
    year: 2022,
    runtimeOrSeasons: '126 min',
    rating: 4.7,
    genres: ['Action', 'Fantasy', 'Horror', 'Sci-Fi', 'Superhero'],
    directorOrCreator: 'Sam Raimi',
    cast: ['Benedict Cumberbatch', 'Elizabeth Olsen', 'Chiwetel Ejiofor', 'Benedict Wong', 'Xochitl Gomez', 'Michael Stuhlbarg', 'Rachel McAdams'],
    synopsis: 'Doctor Strange teams up with a mysterious teenage girl from his dreams who can travel across the multiverse, battling multiple threats including alternate-universe versions of himself and the Scarlet Witch.',
    criticalAnalysis: 'Sam Raimi unleashed signature gothic horror into the MCU, featuring zombie incarnations, demonic music-note combat, and Elizabeth Olsen’s terrifying rampage as the corrupted Scarlet Witch.',
    trivia: [
      'Sam Raimi returned to superhero directing for the first time in 15 years since Spider-Man 3 (2007).',
      'The Illuminati sequence featured John Krasinski as Mr. Fantastic and Patrick Stewart returning as Professor Charles Xavier.',
      'The musical note duel between Doctor Strange and Sinister Strange took over a year to score and animate with Danny Elfman.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/wcKFYIiVDvRURrzglV9kLcu24m.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1oKAhiwbBKS.jpg',
    streamingLinks: [
      { platform: 'Disney+ Hotstar', url: 'https://www.hotstar.com/movies/doctor-strange-in-the-multiverse-of-madness/1260014793', availableRegions: ['US', 'UK', 'IN', 'JP'], priceTier: 'Included' }
    ],
    productionTrivia: 'The Darkhold possession transitions used practical makeup effects enhanced with digital black vein tracking.',
    trailerYoutubeId: 'aWzlQ2N6qqg'
  },
  {
    id: 'thor-love-and-thunder',
    title: 'Thor: Love and Thunder',
    type: 'Movie',
    year: 2022,
    runtimeOrSeasons: '119 min',
    rating: 4.5,
    genres: ['Action', 'Adventure', 'Comedy', 'Fantasy', 'Superhero'],
    directorOrCreator: 'Taika Waititi',
    cast: ['Chris Hemsworth', 'Christian Bale', 'Tessa Thompson', 'Jaimie Alexander', 'Taika Waititi', 'Russell Crowe', 'Natalie Portman'],
    synopsis: 'Thor enlists the help of Valkyrie, Korg and ex-girlfriend Jane Foster, who can now wield Mjolnir as the Mighty Thor, to fight Gorr the God Butcher, who intends to make the gods extinct.',
    criticalAnalysis: 'A high-energy rock opera featuring Guns N’ Roses anthems, Christian Bale’s sinister black-and-white Shadow Realm aesthetics, and Natalie Portman’s heroic return.',
    trivia: [
      'Christian Bale spent three and a half hours each morning getting makeup and prosthetics applied for Gorr the God Butcher.',
      'Natalie Portman gained significant muscle mass for the role, lifting weights and drinking protein shakes daily.',
      'The Shadow Realm sequence was filmed inside the cutting-edge Volume LED stage with real-time black-and-white lighting.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/jsoz1HlxczSu202eT3kLcu24m.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/pIkRyD18kl4F0b69999v7k3.jpg',
    streamingLinks: [
      { platform: 'Disney+ Hotstar', url: 'https://www.hotstar.com/movies/thor-love-and-thunder/1260014794', availableRegions: ['US', 'UK', 'IN', 'JP'], priceTier: 'Included' }
    ],
    productionTrivia: 'The screaming goats Toothgnasher and Toothgrinder were voiced using sound recordings of actual screaming goats and Taika Waititi.',
    trailerYoutubeId: 'Go8nTmfrQd8'
  },
  {
    id: 'black-panther-wakanda-forever',
    title: 'Black Panther: Wakanda Forever',
    type: 'Movie',
    year: 2022,
    runtimeOrSeasons: '161 min',
    rating: 4.8,
    genres: ['Action', 'Adventure', 'Drama', 'Sci-Fi', 'Superhero'],
    directorOrCreator: 'Ryan Coogler',
    cast: ['Letitia Wright', 'Lupita Nyong\'o', 'Danai Gurira', 'Winston Duke', 'Florence Kasumba', 'Dominique Thorne', 'Michaela Coel', 'Tenoch Huerta', 'Martin Freeman', 'Angela Bassett'],
    synopsis: 'The people of Wakanda fight to protect their home from intervening world powers and an ancient underwater kingdom as they mourn the death of King T\'Challa.',
    criticalAnalysis: 'A deeply moving eulogy to Chadwick Boseman that transformed into a monumental conflict between Wakanda and Tenoch Huerta’s Mayan-inspired Talokan.',
    trivia: [
      'Angela Bassett became the first actor in an MCU film to earn an Academy Award acting nomination for her performance as Queen Ramonda.',
      'Tenoch Huerta learned how to free-dive and hold his breath underwater for five minutes to play Namor.',
      'The silent Marvel Studios opening tribute with zero music and only Chadwick Boseman footage brought audiences to tears.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/xDMIl84Qo5Tsu62c9T3kLcu24m.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg',
    streamingLinks: [
      { platform: 'Disney+ Hotstar', url: 'https://www.hotstar.com/movies/black-panther-wakanda-forever/1260014795', availableRegions: ['US', 'UK', 'IN', 'JP'], priceTier: 'Included' }
    ],
    productionTrivia: 'Over 2.5 million gallons of water tanks were constructed at Trilith Studios for underwater combat filming.',
    trailerYoutubeId: '_Z3QKkl1WyM'
  },
  {
    id: 'ant-man-quantumania',
    title: 'Ant-Man and the Wasp: Quantumania',
    type: 'Movie',
    year: 2023,
    runtimeOrSeasons: '124 min',
    rating: 4.5,
    genres: ['Action', 'Adventure', 'Sci-Fi', 'Comedy', 'Superhero'],
    directorOrCreator: 'Peyton Reed',
    cast: ['Paul Rudd', 'Evangeline Lilly', 'Jonathan Majors', 'Kathryn Newton', 'David Dastmalchian', 'Katy O\'Brian', 'William Jackson Harper', 'Bill Murray', 'Michelle Pfeiffer', 'Michael Douglas'],
    synopsis: 'Scott Lang and Hope van Dyne, along with Hank Pym and Janet van Dyne, explore the Quantum Realm, where they interact with strange creatures and face the multiversal warlord Kang the Conqueror.',
    criticalAnalysis: 'Kicked off MCU Phase 5 with expansive subatomic world-building and an army of giant hyper-evolved ants.',
    trivia: [
      'Paul Rudd’s son visited the set and praised the bizarre design of M.O.D.O.K., played by Corey Stoll.',
      'The Quantum Realm creatures were inspired by microscopic deep-sea plankton and electron microscope scans of tartigrades.',
      'Kathryn Newton took over the role of Cassie Lang, learning martial arts and wirework.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/3CxUndGhUcZ9t935io79m8R6e.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/qnqGbB22YJ7dSs4o6M7exTpNxPz.jpg',
    streamingLinks: [
      { platform: 'Disney+ Hotstar', url: 'https://www.hotstar.com/movies/ant-man-and-the-wasp-quantumania/1260014796', availableRegions: ['US', 'UK', 'IN', 'JP'], priceTier: 'Included' }
    ],
    productionTrivia: 'The probability storm scene featured hundreds of Paul Rudd clones cascading down a giant subatomic crater.',
    trailerYoutubeId: 'ZlNFpri-Y40'
  },
  {
    id: 'guardians-of-the-galaxy-vol-3',
    title: 'Guardians of the Galaxy Vol. 3',
    type: 'Movie',
    year: 2023,
    runtimeOrSeasons: '150 min',
    rating: 4.9,
    genres: ['Action', 'Adventure', 'Sci-Fi', 'Comedy', 'Drama', 'Superhero'],
    directorOrCreator: 'James Gunn',
    cast: ['Chris Pratt', 'Zoe Saldana', 'Dave Bautista', 'Karen Gillan', 'Pom Klementieff', 'Vin Diesel', 'Bradley Cooper', 'Will Poulter', 'Chukwudi Iwuji', 'Maria Bakalova'],
    synopsis: 'Still reeling from the loss of Gamora, Peter Quill rallies his team to defend the universe and save Rocket’s life on a mission that could lead to the end of the Guardians as we know them.',
    criticalAnalysis: 'A masterclass emotional farewell to James Gunn’s beloved found family, centered on the tragic, heartbreaking origin story of Rocket Raccoon and the legendary hallway one-shot brawl.',
    trivia: [
      'The continuous hallway action scene took weeks of choreography and utilized a custom robotic arm camera rig.',
      'The film set the world record for the most makeup prosthetics used in a single production, surpassing The Grinch.',
      'Bradley Cooper provided an intensely vulnerable voice performance for Rocket, recording his lines in solitary sessions.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/5YZbUmjbMa3ClvSW1Wj3D6XGolb.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN2Ydg3mA5sp.jpg',
    streamingLinks: [
      { platform: 'Disney+ Hotstar', url: 'https://www.hotstar.com/movies/guardians-of-the-galaxy-vol-3/1260014797', availableRegions: ['US', 'UK', 'IN', 'JP'], priceTier: 'Included' }
    ],
    productionTrivia: 'The organic Counter-Earth meat ship Orgoscope was built physically using thousands of pounds of silicone and latex prosthetics.',
    trailerYoutubeId: 'u3V5KDHRQvk'
  },
  {
    id: 'the-marvels',
    title: 'The Marvels',
    type: 'Movie',
    year: 2023,
    runtimeOrSeasons: '105 min',
    rating: 4.5,
    genres: ['Action', 'Adventure', 'Sci-Fi', 'Comedy', 'Superhero'],
    directorOrCreator: 'Nia DaCosta',
    cast: ['Brie Larson', 'Teyonah Parris', 'Iman Vellani', 'Zawe Ashton', 'Gary Lewis', 'Park Seo-joon', 'Zenobia Shroff', 'Mohan Kapur', 'Samuel L. Jackson'],
    synopsis: 'Carol Danvers, Kamala Khan, and Monica Rambeau begin swapping places every time they use their powers, forcing the trio to team up to save the universe from a vengeful Kree revolutionary.',
    criticalAnalysis: 'A kinetic, fast-paced cosmic comedy propelled by Iman Vellani’s infectious enthusiasm as Ms. Marvel, feline Flerken chaos, and dynamic power-switching combat choreography.',
    trivia: [
      'Iman Vellani is a well-known Marvel superfan who brought a notebook full of MCU lore questions to Nia DaCosta and Kevin Feige.',
      'The fight scene swapping the three heroes between Jersey City, SABER space station, and Aladna was timed using synchronized metronomes.',
      'The post-credits scene introduced Kelsey Grammer as Beast, setting up the X-Men integration into the MCU.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/feSiISwgEpum976kLcu24m.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/9GBhzXMFjgcZ3FdR9w3bL9P1v2.jpg',
    streamingLinks: [
      { platform: 'Disney+ Hotstar', url: 'https://www.hotstar.com/movies/the-marvels/1260014798', availableRegions: ['US', 'UK', 'IN', 'JP'], priceTier: 'Included' }
    ],
    productionTrivia: 'Over 50 kittens were brought to set for the iconic "Memory" musical rescue sequence in the SABER station.',
    trailerYoutubeId: 'wS_qbD028EI'
  },
  {
    id: 'deadpool-and-wolverine',
    title: 'Deadpool & Wolverine',
    type: 'Movie',
    year: 2024,
    runtimeOrSeasons: '128 min',
    rating: 4.9,
    genres: ['Action', 'Comedy', 'Sci-Fi', 'Superhero'],
    directorOrCreator: 'Shawn Levy',
    cast: ['Ryan Reynolds', 'Hugh Jackman', 'Emma Corrin', 'Morena Baccarin', 'Rob Delaney', 'Leslie Uggams', 'Aaron Stanford', 'Matthew Macfadyen', 'Dafne Keen', 'Channing Tatum', 'Wesley Snipes', 'Jennifer Garner'],
    synopsis: 'Wolverine is recovering from his injuries when he crosses paths with the loudmouth Deadpool. They team up to defeat a common enemy and save the multiverse in the MCU’s first R-rated spectacle.',
    criticalAnalysis: 'An electrifying, record-breaking multiversal blast blending R-rated meta comedy, nostalgic Fox-era tributes (Gambit, Blade, Elektra), and Hugh Jackman’s comic-accurate yellow-and-blue suit.',
    trivia: [
      'Hugh Jackman donned the iconic comic-accurate yellow and blue Wolverine cowl for the first time in his 24-year tenure as the character.',
      'The film shattered box office records, becoming the highest-grossing R-rated movie of all time with over $1.33 billion worldwide.',
      'Channing Tatum finally got to play Gambit after 15 years in development hell, delivering viral Creole dialogue that captivated audiences.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/yDHYTfa29n4v4OPj9glq43Fk28d.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
    streamingLinks: [
      { platform: 'Disney+ Hotstar', url: 'https://www.hotstar.com/movies/deadpool-and-wolverine/1260014799', availableRegions: ['US', 'UK', 'IN', 'JP'], priceTier: 'Included' }
    ],
    productionTrivia: 'The opening NSYNC "Bye Bye Bye" dance sequence was performed by professional dancer Nick Pauley in the Deadpool suit.',
    trailerYoutubeId: '73_1biulkYk'
  },
  {
    id: 'captain-america-brave-new-world',
    title: 'Captain America: Brave New World',
    type: 'Movie',
    year: 2025,
    runtimeOrSeasons: '125 min',
    rating: 4.8,
    genres: ['Action', 'Thriller', 'Sci-Fi', 'Superhero'],
    directorOrCreator: 'Julius Onah',
    cast: ['Anthony Mackie', 'Harrison Ford', 'Danny Ramirez', 'Shira Haas', 'Carl Lumbly', 'Giancarlo Esposito', 'Liv Tyler', 'Tim Blake Nelson'],
    synopsis: 'Sam Wilson, officially wielding the shield as Captain America, finds himself in the middle of an international crisis after meeting newly elected U.S. President Thaddeus Ross, uncovering a global conspiracy and the Red Hulk.',
    criticalAnalysis: 'Returns Captain America to grounded political espionage thrillers, pitting Sam Wilson’s aerial tactical vibranium wings against Harrison Ford’s towering Red Hulk.',
    trivia: [
      'Harrison Ford took over the role of Thaddeus "Thunderbolt" Ross following the passing of legendary actor William Hurt.',
      'Anthony Mackie trained in aerial wirework to perform 360-degree shield-throw flight routines.',
      'Features the long-awaited return of Tim Blake Nelson as Samuel Sterns / The Leader after 17 years since The Incredible Hulk (2008).'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/b34jIp49t11A9T9a27g0u5h13F8.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/z0I02Z2OpNTctfOSN2Ydg3mA5sp.jpg',
    streamingLinks: [
      { platform: 'Disney+ Hotstar', url: 'https://www.hotstar.com/movies/captain-america-brave-new-world/1260014800', availableRegions: ['US', 'UK', 'IN', 'JP'], priceTier: 'Included' }
    ],
    productionTrivia: 'The Red Hulk motion capture utilized high-definition muscle contraction sensors mapped to Harrison Ford’s facial expressions.',
    trailerYoutubeId: '1pHDWnXmK7Y'
  },
  {
    id: 'thunderbolts-movie',
    title: 'Thunderbolts*',
    type: 'Movie',
    year: 2025,
    runtimeOrSeasons: '128 min',
    rating: 4.8,
    genres: ['Action', 'Thriller', 'Adventure', 'Superhero', 'Comedy'],
    directorOrCreator: 'Jake Schreier',
    cast: ['Florence Pugh', 'Sebastian Stan', 'David Harbour', 'Wyatt Russell', 'Olga Kurylenko', 'Hannah John-Kamen', 'Julia Louis-Dreyfus', 'Lewis Pullman'],
    synopsis: 'An irreverent team of antiheroes and reformed villains—including Yelena Belova, Bucky Barnes, Red Guardian, and US Agent—are deployed by the government on covert black-ops missions.',
    criticalAnalysis: 'A character-driven, darkly comedic tactical espionage adventure focusing on mental health, redemption, and the lethal dynamic of Marvel’s misfit operatives.',
    trivia: [
      'Florence Pugh and Sebastian Stan bonded over their shared history of playing brainwashed assassins in the MCU.',
      'Lewis Pullman was cast as "Bob" / Sentry, bringing cosmic powerhouse energy to the street-level roster.',
      'The asterisk in the title was teased by Kevin Feige as an essential plot twist that will be explained in the film.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/83WvW9FALU97jrjao1qbtH0W4kW.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/4ssDuvEDkS9urvtLnj1NIJIT2tc.jpg',
    streamingLinks: [
      { platform: 'Disney+ Hotstar', url: 'https://www.hotstar.com/movies/thunderbolts/1260014801', availableRegions: ['US', 'UK', 'IN', 'JP'], priceTier: 'Included' }
    ],
    productionTrivia: 'The tactical combat was supervised by former special forces advisors for military CQC accuracy.',
    trailerYoutubeId: '-sAOWhv6bTI'
  },

  // --- MARVEL DISNEY+ & TELEVISION SERIES ---
  {
    id: 'wandavision',
    title: 'WandaVision',
    type: 'Series',
    year: 2021,
    runtimeOrSeasons: '1 Season (9 Episodes)',
    seasonsCount: 1,
    rating: 4.9,
    genres: ['Drama', 'Mystery', 'Sci-Fi', 'Fantasy', 'Comedy', 'Superhero'],
    directorOrCreator: 'Matt Shakman, Jac Schaeffer',
    cast: ['Elizabeth Olsen', 'Paul Bettany', 'Kathryn Hahn', 'Teyonah Parris', 'Randall Park', 'Kat Dennings', 'Evan Peters'],
    synopsis: 'Living idealized suburban lives, super-powered beings Wanda and Vision begin to suspect that everything is not as it seems in the bizarre town of Westview.',
    criticalAnalysis: 'An Emmy-winning tour-de-force exploring grief through the lens of classic television sitcom decades (50s, 60s, 70s, 80s, 90s, 00s), culminating in Agatha Harkness and the birth of the Scarlet Witch.',
    trivia: [
      'The premiere episode was filmed in front of a live studio audience in period-accurate 1950s costumes and lighting.',
      'The hit villain song "Agatha All Along" topped the iTunes charts and won an Emmy Award for Original Music.',
      'Paul Bettany was painted blue for the black-and-white 1950s episodes because red Vision makeup looked washed out in grayscale.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/57vVugeBH6Q0g1656sc6X4m.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/glKDrtVTGh7v1m97vV.jpg',
    streamingLinks: [
      { platform: 'Disney+ Hotstar', url: 'https://www.hotstar.com/shows/wandavision/1260051325', availableRegions: ['US', 'UK', 'IN', 'JP'], priceTier: 'Included' }
    ],
    productionTrivia: 'Every sitcom era utilized authentic period camera lenses, aspect ratio shifts (4:3 to 16:9 to 2.39:1), and lighting rigs.',
    trailerYoutubeId: 'UBhlqe2KVt4'
  },
  {
    id: 'the-falcon-and-the-winter-soldier',
    title: 'The Falcon and the Winter Soldier',
    type: 'Series',
    year: 2021,
    runtimeOrSeasons: '1 Season (6 Episodes)',
    seasonsCount: 1,
    rating: 4.7,
    genres: ['Action', 'Adventure', 'Drama', 'Sci-Fi', 'Superhero'],
    directorOrCreator: 'Kari Skogland, Malcolm Spellman',
    cast: ['Anthony Mackie', 'Sebastian Stan', 'Wyatt Russell', 'Erin Kellyman', 'Danny Ramirez', 'Georges St-Pierre', 'Adepero Oduye', 'Don Cheadle', 'Daniel Brühl', 'Emily VanCamp'],
    synopsis: 'Following the events of Avengers: Endgame, Sam Wilson and Bucky Barnes team up in a global adventure that tests their abilities and their patience as they confront the Flag Smashers.',
    criticalAnalysis: 'Tackled race, legacy, and systemic veterans\' trauma with intense geopolitical action, featuring Daniel Brühl’s viral dancing Zemo and Sam Wilson accepting the shield.',
    trivia: [
      'Daniel Brühl improvised his now-legendary club dance in Madripoor, which became a global internet sensation.',
      'Wyatt Russell received death threats from fans for portraying John Walker, which he took as a compliment to his villainous performance.',
      'The aerial canyon chase in the pilot episode was filmed using wingsuit skydivers with helmet-mounted 4K RED cameras.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/b0WmHGc8LFsYrF0752.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/6kbAMLCfGlPY8bt39.jpg',
    streamingLinks: [
      { platform: 'Disney+ Hotstar', url: 'https://www.hotstar.com/shows/the-falcon-and-the-winter-soldier/1260055890', availableRegions: ['US', 'UK', 'IN', 'JP'], priceTier: 'Included' }
    ],
    productionTrivia: 'Sam Wilson’s final comic-accurate white-and-blue Captain America suit was engineered from 3D-printed carbon fiber polymers.',
    trailerYoutubeId: 'IWBsDaFWyTE'
  },
  {
    id: 'loki-series',
    title: 'Loki',
    type: 'Series',
    year: 2021,
    runtimeOrSeasons: '2 Seasons (12 Episodes)',
    seasonsCount: 2,
    rating: 4.9,
    genres: ['Action', 'Adventure', 'Fantasy', 'Sci-Fi', 'Superhero'],
    directorOrCreator: 'Michael Waldron, Kate Herron, Justin Benson, Aaron Moorhead',
    cast: ['Tom Hiddleston', 'Gugu Mbatha-Raw', 'Wunmi Mosaku', 'Eugene Cordero', 'Tara Strong', 'Owen Wilson', 'Sophia Di Martino', 'Ke Huy Quan', 'Jonathan Majors'],
    synopsis: 'The mercurial villain Loki resumes his role as the God of Mischief in a mind-bending time travel thriller alongside the Time Variance Authority, eventually weaving the branches of the multiverse into Yggdrasil.',
    criticalAnalysis: 'Widely hailed as the crown jewel of Marvel television. Tom Hiddleston delivered the performance of his career across two seasons, transforming from a self-absorbed villain to the God of Stories holding the multiverse together.',
    trivia: [
      'Tom Hiddleston held a legendary "Loki School" seminar on set, lecturing the cast and crew on 10 years of MCU history with PowerPoint slides.',
      'Academy Award-winner Ke Huy Quan joined Season 2 as Ouroboros (O.B.), building sets with functional retro-futuristic props.',
      'The Season 2 finale climax where Loki ascends the Throne of Time at the End of Time was filmed with practical yarn and glowing fiber-optics.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/kEl2t3OhXc3cmBh0R7u2.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/voHUmlvjysv923Lcu24m.jpg',
    streamingLinks: [
      { platform: 'Disney+ Hotstar', url: 'https://www.hotstar.com/shows/loki/1260064332', availableRegions: ['US', 'UK', 'IN', 'JP'], priceTier: 'Included' }
    ],
    productionTrivia: 'The TVA brutalist interior was built as a 360-degree practical set with working amber fluorescent tubes.',
    trailerYoutubeId: 'nW948Va-l10'
  },
  {
    id: 'what-if',
    title: 'What If...?',
    type: 'Series',
    year: 2021,
    runtimeOrSeasons: '3 Seasons (27 Episodes)',
    seasonsCount: 3,
    rating: 4.7,
    genres: ['Animation', 'Action', 'Adventure', 'Sci-Fi', 'Superhero'],
    directorOrCreator: 'Bryan Andrews, A.C. Bradley',
    cast: ['Jeffrey Wright', 'Chadwick Boseman', 'Hayley Atwell', 'Benedict Cumberbatch', 'Samuel L. Jackson', 'Jeremy Renner', 'Mark Ruffalo'],
    synopsis: 'Exploring pivotal moments from the Marvel Cinematic Universe and turning them on their head, leading the audience into uncharted territory guided by the cosmic Watcher.',
    criticalAnalysis: 'Stunning cel-shaded animation bringing boundless comic multiverse scenarios to life, featuring Captain Carter, Doctor Strange Supreme, and Chadwick Boseman’s final performance as Star-Lord T’Challa.',
    trivia: [
      'Chadwick Boseman recorded his lines for four episodes of Season 1 shortly before his passing, winning a posthumous Emmy Award.',
      'The art style was inspired by classic American golden-age illustrators like J.C. Leyendecker and Norman Rockwell.',
      'Jeffrey Wright voiced The Watcher with a resonant, cosmic cadence that anchors the multiverse anthology.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/4N6zEMfZ5mP1v2FvX9s0u5h13.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/lP52oQ9mP1v2FvX9s0u5h13F.jpg',
    streamingLinks: [
      { platform: 'Disney+ Hotstar', url: 'https://www.hotstar.com/shows/what-if/1260066989', availableRegions: ['US', 'UK', 'IN', 'JP'], priceTier: 'Included' }
    ],
    productionTrivia: 'The cel-shading was achieved by combining 3D character rigs with hand-painted 2D light gouache backgrounds.',
    trailerYoutubeId: 'x9D0uUKJ5KI'
  },
  {
    id: 'hawkeye',
    title: 'Hawkeye',
    type: 'Series',
    year: 2021,
    runtimeOrSeasons: '1 Season (6 Episodes)',
    seasonsCount: 1,
    rating: 4.7,
    genres: ['Action', 'Adventure', 'Comedy', 'Crime', 'Superhero'],
    directorOrCreator: 'Jonathan Igla, Rhys Thomas',
    cast: ['Jeremy Renner', 'Hailee Steinfeld', 'Tony Dalton', 'Fra Fee', 'Brian d\'Arcy James', 'Aleks Paunovic', 'Piotr Adamczyk', 'Linda Cardellini', 'Simon Callow', 'Vera Farmiga', 'Alaqua Cox', 'Florence Pugh', 'Vincent D\'Onofrio'],
    synopsis: 'Series based on the Marvel Comics superhero Hawkeye, centering on the adventures of Clint Barton and his protégé Kate Bishop as they navigate a holiday-season conspiracy in New York City.',
    criticalAnalysis: 'A festive, grounded holiday adventure adapted from Matt Fraction’s celebrated comic run, introducing Hailee Steinfeld’s charismatic Kate Bishop and Vincent D’Onofrio’s return as Kingpin.',
    trivia: [
      'Hailee Steinfeld was the only actress offered the role of Kate Bishop; Marvel did not audition anyone else.',
      'Lucky the Pizza Dog was portrayed by a golden retriever named Jolt, who became a beloved cast favorite.',
      'The car chase scene in Episode 3 was filmed with a 360-degree rotating camera inside a moving vintage sedan.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/1R68vl3Z202eT3kLcu24m.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/pqzjVP5W79m8R6eX9s0u5h.jpg',
    streamingLinks: [
      { platform: 'Disney+ Hotstar', url: 'https://www.hotstar.com/shows/hawkeye/1260073673', availableRegions: ['US', 'UK', 'IN', 'JP'], priceTier: 'Included' }
    ],
    productionTrivia: 'Rogers: The Musical was staged on Broadway with real Tony Award-winning theatrical composers Marc Shaiman and Scott Wittman.',
    trailerYoutubeId: '5VYb3B1ETlk'
  },
  {
    id: 'moon-knight',
    title: 'Moon Knight',
    type: 'Series',
    year: 2022,
    runtimeOrSeasons: '1 Season (6 Episodes)',
    seasonsCount: 1,
    rating: 4.8,
    genres: ['Action', 'Adventure', 'Fantasy', 'Horror', 'Mystery', 'Superhero'],
    directorOrCreator: 'Jeremy Slater, Mohamed Diab',
    cast: ['Oscar Isaac', 'Ethan Hawke', 'May Calamawy', 'Khalid Abdalla', 'Ann Akinjirin', 'David Ganly', 'Antonia Salib', 'F. Murray Abraham'],
    synopsis: 'Steven Grant discovers he has dissociative identity disorder and shares a body with mercenary Marc Spector. As Steven/Marc\'s enemies converge upon them, they must navigate their complex identities while thrust into a deadly mystery involving Egyptian gods.',
    criticalAnalysis: 'A psychological tour-de-force showcasing Oscar Isaac’s masterful dual performance as Steven Grant and Marc Spector, blending Indiana Jones archaeological thrills with Egyptian mythology.',
    trivia: [
      'Oscar Isaac hired his brother Michael Benjamin Hernandez to act as his body double for the mirror reflection scenes.',
      'Ethan Hawke based his villainous cult leader Arthur Harrow on real-life cult leader David Koresh and Carl Jung.',
      'Egyptian director Mohamed Diab ensured authentic Middle Eastern casting and modern Cairo musical scores.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/x6FsYvt3kLcu24mX9s0u5h.jpg',
    streamingLinks: [
      { platform: 'Disney+ Hotstar', url: 'https://www.hotstar.com/shows/moon-knight/1260086961', availableRegions: ['US', 'UK', 'IN', 'JP'], priceTier: 'Included' }
    ],
    productionTrivia: 'The ceremonial Moon Knight suit wraps were animated to look like ancient Egyptian mummification bandages manifesting out of thin air.',
    trailerYoutubeId: 'x7Krla_UxRg'
  },
  {
    id: 'ms-marvel',
    title: 'Ms. Marvel',
    type: 'Series',
    year: 2022,
    runtimeOrSeasons: '1 Season (6 Episodes)',
    seasonsCount: 1,
    rating: 4.6,
    genres: ['Action', 'Adventure', 'Comedy', 'Family', 'Sci-Fi', 'Superhero'],
    directorOrCreator: 'Bisha K. Ali, Adil El Arbi, Bilall Fallah',
    cast: ['Iman Vellani', 'Matt Lintz', 'Yasmeen Fletcher', 'Zenobia Shroff', 'Mohan Kapur', 'Saagar Shaikh', 'Rish Shah', 'Laurel Marsden', 'Arian Moayed', 'Mehwish Hayat'],
    synopsis: 'Kamala Khan, a Muslim American teen growing up in Jersey City and a mega-fan of the Avengers, gains superpowers of her own from an ancient family heirloom bangle.',
    criticalAnalysis: 'A visually dynamic, heartfelt coming-of-age story celebrating South Asian heritage, family dynamics, and the Partition of India through vibrant pop-art animation overlays.',
    trivia: [
      'Iman Vellani was cast directly out of a high school drama class in Markham, Ontario after submitting a self-tape.',
      'The directors incorporated colorful street graffiti murals and texting graphics directly onto city buildings.',
      'The finale revealed Kamala Khan is a mutant, featuring the classic 1990s X-Men animated theme music sting.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/b0WmHGc8LFsYrF0752.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/cdkyMYdu8ao2657.jpg',
    streamingLinks: [
      { platform: 'Disney+ Hotstar', url: 'https://www.hotstar.com/shows/ms-marvel/1260096238', availableRegions: ['US', 'UK', 'IN', 'JP'], priceTier: 'Included' }
    ],
    productionTrivia: 'Kamala’s hard-light "noor" crystalline powers were designed with lavender-blue refractive refraction shaders.',
    trailerYoutubeId: 'm9EX0f6V11Y'
  },
  {
    id: 'she-hulk',
    title: 'She-Hulk: Attorney at Law',
    type: 'Series',
    year: 2022,
    runtimeOrSeasons: '1 Season (9 Episodes)',
    seasonsCount: 1,
    rating: 4.4,
    genres: ['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Superhero'],
    directorOrCreator: 'Jessica Gao, Kat Coiro',
    cast: ['Tatiana Maslany', 'Jameela Jamil', 'Ginger Gonzaga', 'Mark Ruffalo', 'Josh Segarra', 'Jon Bass', 'Renée Elise Goldsberry', 'Tim Roth', 'Benedict Wong', 'Charlie Cox'],
    synopsis: 'Jennifer Walters navigates the complicated life of a single, 30-something attorney who also happens to be a green 6-foot-7-inch superpowered hulk.',
    criticalAnalysis: 'A fourth-wall-breaking legal sitcom paying homage to Fleabag and Ally McBeal, culminating in Jennifer Walters climbing out of Disney+ menu screens into Marvel Studios HQ.',
    trivia: [
      'Tatiana Maslany performed all her scenes wearing a 6-foot-7 helmet with an eye-line ball for other actors.',
      'Charlie Cox made his much-anticipated MCU return in his yellow-and-red comic Daredevil suit in Episode 8.',
      'The finale featured an AI robotic robot named K.E.V.I.N. wearing a black baseball cap mimicking Kevin Feige.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/hJfI6t9OnGVgZaOi1e.jpg',
    streamingLinks: [
      { platform: 'Disney+ Hotstar', url: 'https://www.hotstar.com/shows/she-hulk-attorney-at-law/1260103788', availableRegions: ['US', 'UK', 'IN', 'JP'], priceTier: 'Included' }
    ],
    productionTrivia: 'The courtroom sequences were staged in real working municipal courthouses with elevated judge benches.',
    trailerYoutubeId: 'gim2kprjL50'
  },
  {
    id: 'secret-invasion',
    title: 'Secret Invasion',
    type: 'Series',
    year: 2023,
    runtimeOrSeasons: '1 Season (6 Episodes)',
    seasonsCount: 1,
    rating: 4.3,
    genres: ['Action', 'Adventure', 'Drama', 'Sci-Fi', 'Thriller', 'Superhero'],
    directorOrCreator: 'Kyle Bradstreet, Ali Selim',
    cast: ['Samuel L. Jackson', 'Ben Mendelsohn', 'Kingsley Ben-Adir', 'Killian Scott', 'Samuel Adewunmi', 'Dermot Mulroney', 'Richard Dormer', 'Emilia Clarke', 'Olivia Colman', 'Don Cheadle', 'Charlayne Woodard'],
    synopsis: 'Nick Fury learns of a clandestine invasion of Earth by a faction of shape-shifting Skrulls. Fury joins his allies to race against time to thwart an imminent Skrull invasion and save humanity.',
    criticalAnalysis: 'A cold-war espionage spy thriller starring Samuel L. Jackson in a vulnerable, eyepatch-free performance alongside Olivia Colman’s delightfully ruthless MI6 agent Sonya Falsworth.',
    trivia: [
      'Olivia Colman declared playing a smiling, ruthless interrogator in the MCU was a lifelong dream.',
      'Filmed across historical locations in Leeds, Halifax, and London to give a grounded European political atmosphere.',
      'Don Cheadle revealed that Rhodey had been replaced by a Skrull operative named Raava since the events of Civil War.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/87t28Q6b1k1aZ7m9.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/f5JHG5mP1v2FvX9s0u5h13F.jpg',
    streamingLinks: [
      { platform: 'Disney+ Hotstar', url: 'https://www.hotstar.com/shows/secret-invasion/1260141026', availableRegions: ['US', 'UK', 'IN', 'JP'], priceTier: 'Included' }
    ],
    productionTrivia: 'The Harvest DNA vial contained genetic samples of Captain Marvel, Thanos, Hulk, and 20 other heroes.',
    trailerYoutubeId: 'Tp_YZNqNBhw'
  },
  {
    id: 'echo-series',
    title: 'Echo',
    type: 'Series',
    year: 2024,
    runtimeOrSeasons: '1 Season (5 Episodes)',
    seasonsCount: 1,
    rating: 4.6,
    genres: ['Action', 'Crime', 'Drama', 'Mystery', 'Superhero'],
    directorOrCreator: 'Marion Dayre, Sydney Freeland',
    cast: ['Alaqua Cox', 'Chaske Spencer', 'Tantoo Cardinal', 'Devery Jacobs', 'Zahn McClarnon', 'Cody Lightning', 'Graham Greene', 'Vincent D\'Onofrio'],
    synopsis: 'Maya Lopez must face her past, reconnect with her Native American Choctaw roots, and embrace the meaning of family and community if she ever hopes to move forward while hunted by Wilson Fisk.',
    criticalAnalysis: 'Launched the TV-MA "Marvel Spotlight" banner with gritty street-level violence, raw practical martial arts, and profound indigenous Choctaw ancestral storytelling.',
    trivia: [
      'Alaqua Cox is deaf and an amputee in real life, performing almost all of Maya Lopez’s high-intensity fight stunts.',
      'The production worked hand-in-hand with the Choctaw Nation of Oklahoma to ensure linguistic and cultural authenticity.',
      'Features a breathtaking, uninterrupted 6-minute single-take brawl between Maya Lopez and Daredevil.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/xDMIl84Qo5Tsu62c9T3kLcu24m.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/k2twT9vTq3kLcu24mX9s0u5h.jpg',
    streamingLinks: [
      { platform: 'Disney+ Hotstar', url: 'https://www.hotstar.com/shows/echo/1260161472', availableRegions: ['US', 'UK', 'IN', 'JP'], priceTier: 'Included' }
    ],
    productionTrivia: 'The roller-skating rink fight scene in Tamaha was filmed with physical roller-skating stunt specialists.',
    trailerYoutubeId: 'AFUIDD86zLo'
  },
  {
    id: 'x-men-97',
    title: 'X-Men \'97',
    type: 'Series',
    year: 2024,
    runtimeOrSeasons: '1 Season (10 Episodes)',
    seasonsCount: 1,
    rating: 5.0,
    genres: ['Animation', 'Action', 'Adventure', 'Drama', 'Sci-Fi', 'Superhero'],
    directorOrCreator: 'Beau DeMayo, Jake Castorena',
    cast: ['Ray Chase', 'Jennifer Hale', 'Lenore Zann', 'George Buza', 'AJ LoCascio', 'Holly Chou', 'Alison Sealy-Smith', 'Chris Potter', 'Cal Dodd', 'Matthew Waterson'],
    synopsis: 'A band of mutants use their uncanny gifts to protect a world that hates and fears them, challenged like never before following the loss of Professor Charles Xavier.',
    criticalAnalysis: 'A phenomenal critical masterpiece achieving 99% on Rotten Tomatoes. Picked up the legendary 1992 animated series with modern cinematic animation, gut-wrenching drama in Genosha, and classic rock guitar riffs.',
    trivia: [
      'The original voice actors for Wolverine (Cal Dodd), Rogue (Lenore Zann), and Beast (George Buza) reprised their iconic roles after 27 years.',
      'Episode 5 "Remember It" was praised by critics as one of the greatest episodes of television in superhero history.',
      'The iconic synthesizer and electric guitar theme song was restored and re-recorded with modern orchestral fidelity.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/uLtVingCrMy499t935io79m8R6e.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/9Gtg2DzBhmYamXBS1oKAhiwbBKS.jpg',
    streamingLinks: [
      { platform: 'Disney+ Hotstar', url: 'https://www.hotstar.com/shows/x-men-97/1260163351', availableRegions: ['US', 'UK', 'IN', 'JP'], priceTier: 'Included' }
    ],
    productionTrivia: 'The Genosha destruction sequence was hand-animated with over 40 distinct mutant cameos across 12 minutes.',
    trailerYoutubeId: 'pv3Ss8o99q0'
  },
  {
    id: 'agatha-all-along',
    title: 'Agatha All Along',
    type: 'Series',
    year: 2024,
    runtimeOrSeasons: '1 Season (9 Episodes)',
    seasonsCount: 1,
    rating: 4.8,
    genres: ['Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Superhero'],
    directorOrCreator: 'Jac Schaeffer',
    cast: ['Kathryn Hahn', 'Joe Locke', 'Sasheer Zamata', 'Ali Ahn', 'Maria Dizzia', 'Paul Adelstein', 'Miles Gutierrez-Riley', 'Okwui Okpokwasili', 'Debra Jo Rupp', 'Patti LuPone', 'Aubrey Plaza'],
    synopsis: 'A spell-bound Agatha Harkness regains freedom thanks to a mysterious goth teen\'s help. Intrigued by his plea, she embarks on the trials of the legendary Witches\' Road to reclaim her powers.',
    criticalAnalysis: 'A darkly comedic, gothic folk-horror adventure featuring Broadway icon Patti LuPone, Aubrey Plaza as Rio Vidal / Death, and Kathryn Hahn’s sensational charismatic witchcraft.',
    trivia: [
      'The cast recorded the viral harmony ballad "The Ballad of the Witches\' Road" live in studio together.',
      'Jac Schaeffer avoided computer-generated visual effects wherever possible, building physical sets for the Witches\' Road with real moss and practical makeup.',
      'Joe Locke\'s character was revealed as Billy Maximoff / Wiccan, son of the Scarlet Witch.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/57vVugeBH6Q0g1656sc6X4m.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/glKDrtVTGh7v1m97vV.jpg',
    streamingLinks: [
      { platform: 'Disney+ Hotstar', url: 'https://www.hotstar.com/shows/agatha-all-along/1260178349', availableRegions: ['US', 'UK', 'IN', 'JP'], priceTier: 'Included' }
    ],
    productionTrivia: 'Aubrey Plaza’s Green Witch look was inspired by 1970s occult cinema and Tarot arcana iconography.',
    trailerYoutubeId: 'R734hG_zZ-8'
  },
  {
    id: 'daredevil-born-again',
    title: 'Daredevil: Born Again',
    type: 'Series',
    year: 2025,
    runtimeOrSeasons: '1 Season (9 Episodes)',
    seasonsCount: 1,
    rating: 4.9,
    genres: ['Action', 'Crime', 'Drama', 'Superhero', 'Thriller'],
    directorOrCreator: 'Dario Scardapane, Justin Benson, Aaron Moorhead',
    cast: ['Charlie Cox', 'Vincent D\'Onofrio', 'Margarita Levieva', 'Michael Gandolfini', 'Genneya Walton', 'Arty Froushan', 'Deborah Ann Woll', 'Elden Henson', 'Jon Bernthal'],
    synopsis: 'Blind lawyer Matt Murdock fights for justice in the courtroom while crime lord Wilson Fisk pursues his political ambitions as Mayor of New York City, leading to an inevitable collision in Hell\'s Kitchen.',
    criticalAnalysis: 'The definitive return of the Man Without Fear. Brings back Charlie Cox, Vincent D’Onofrio, and Jon Bernthal’s Punisher with brutal practical fight choreography.',
    trivia: [
      'Marvel completely retooled the series midway through production to bring back the gritty R-rated tone of the original Netflix show.',
      'Deborah Ann Woll and Elden Henson returned as Karen Page and Foggy Nelson following passionate fan petitions.',
      'Filmed on location throughout New York City, including Harlem, Brooklyn, and Manhattan courthouses.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/4McK6q2yG7mP1v2FvX9s0u5h13.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/5T1bF8fW8Z9tF2y1q3a4s5d6.jpg',
    streamingLinks: [
      { platform: 'Disney+ Hotstar', url: 'https://www.hotstar.com/shows/daredevil-born-again/1260189421', availableRegions: ['US', 'UK', 'IN', 'JP'], priceTier: 'Included' }
    ],
    productionTrivia: 'The stunt coordinator Philip Silvera returned from the original Netflix series to design bone-crunching one-take hallway fights.',
    trailerYoutubeId: '7m9A6mN1yN8'
  },
  {
    id: 'daredevil-netflix',
    title: "Marvel's Daredevil",
    type: 'Series',
    year: 2015,
    runtimeOrSeasons: '3 Seasons (39 Episodes)',
    seasonsCount: 3,
    rating: 5.0,
    genres: ['Action', 'Crime', 'Drama', 'Superhero', 'Thriller'],
    directorOrCreator: 'Drew Goddard, Steven S. DeKnight, Erik Oleson',
    cast: ['Charlie Cox', 'Deborah Ann Woll', 'Elden Henson', 'Toby Leonard Moore', 'Vondie Curtis-Hall', 'Bob Gunton', 'Ayelet Zurer', 'Rosario Dawson', 'Vincent D\'Onofrio', 'Jon Bernthal', 'Elodie Yung', 'Wilson Bethel'],
    synopsis: 'A blind lawyer by day, vigilante by night. Matt Murdock fights the crime of New York as Daredevil, engaging in a bloody turf war against kingpin Wilson Fisk.',
    criticalAnalysis: 'Considered one of the greatest superhero television series ever made, famous for its unbroken hallway single-take fights, complex Catholic guilt, and legendary performances.',
    trivia: [
      'The Season 1 Episode 2 hallway fight was shot in a single uninterrupted 3-minute take with no hidden cuts.',
      'Season 3 featured an even more ambitious 11-minute continuous prison riot fight scene with live pyrotechnics.',
      'Charlie Cox was awarded the Helen Keller Achievement Award by the American Foundation for the Blind for his authentic portrayal.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/w2PMyoyCc2ndmwh9368nQ202.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/QWbPaDxiB6LW2KiKMxR5m.jpg',
    streamingLinks: [
      { platform: 'Disney+ Hotstar', url: 'https://www.hotstar.com/shows/marvels-daredevil/1260086962', availableRegions: ['US', 'UK', 'IN', 'JP'], priceTier: 'Included' }
    ],
    productionTrivia: 'The red suit was designed with real Kevlar and carbon-fiber plates to allow Charlie Cox full boxing mobility.',
    trailerYoutubeId: 'jAy6NJ_D5vU'
  },
  {
    id: 'the-punisher-series',
    title: "Marvel's The Punisher",
    type: 'Series',
    year: 2017,
    runtimeOrSeasons: '2 Seasons (26 Episodes)',
    seasonsCount: 2,
    rating: 4.9,
    genres: ['Action', 'Crime', 'Drama', 'Thriller', 'Superhero'],
    directorOrCreator: 'Steve Lightfoot',
    cast: ['Jon Bernthal', 'Ebon Moss-Bachrach', 'Ben Barnes', 'Amber Rose Revah', 'Daniel Webber', 'Paul Schulze', 'Jason R. Moore', 'Michael Nathanson', 'Jaime Ray Newman', 'Floriana Lima', 'Giorgia Whigham'],
    synopsis: 'After exacting revenge on those responsible for the death of his wife and children, Frank Castle uncovers a military conspiracy that runs far deeper than New York’s criminal underworld.',
    criticalAnalysis: 'Jon Bernthal’s guttural, unsparing, and fiercely emotional portrayal of Frank Castle established him as the definitive live-action Punisher.',
    trivia: [
      'Jon Bernthal trained with real military veterans and isolated himself in Brooklyn to channel Frank Castle’s intense PTSD.',
      'The gym and bar fight sequences were shot with practical weapons handling and tactical reload authenticity.',
      'Ebon Moss-Bachrach (later Richie in The Bear) gave an exceptional performance as Micro / David Lieberman.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/4McK6q2yG7mP1v2FvX9s0u5h13.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/29e1fF8g5Z7lA3SDoZf97qQp5.jpg',
    streamingLinks: [
      { platform: 'Disney+ Hotstar', url: 'https://www.hotstar.com/shows/marvels-the-punisher/1260086963', availableRegions: ['US', 'UK', 'IN', 'JP'], priceTier: 'Included' }
    ],
    productionTrivia: 'The tactical combat was choreographed with actual CQB close-quarters battle protocols.',
    trailerYoutubeId: 'OMW4ALg8VvI'
  },
  {
    id: 'agents-of-shield',
    title: "Marvel's Agents of S.H.I.E.L.D.",
    type: 'Series',
    year: 2013,
    runtimeOrSeasons: '7 Seasons (136 Episodes)',
    seasonsCount: 7,
    rating: 4.8,
    genres: ['Action', 'Adventure', 'Drama', 'Sci-Fi', 'Superhero'],
    directorOrCreator: 'Joss Whedon, Jed Whedon, Maurissa Tancharoen',
    cast: ['Clark Gregg', 'Ming-Na Wen', 'Brett Dalton', 'Chloe Bennet', 'Iain De Caestecker', 'Elizabeth Henstridge', 'Henry Simmons', 'Natalia Cordova-Buckley'],
    synopsis: 'Agent Phil Coulson leads a small, highly select team of S.H.I.E.L.D. agents from around the globe to investigate strange occurrences, Inhumans, Hydra traitors, and time anomalies.',
    criticalAnalysis: 'The longest-running Marvel television series, famous for the shocking Season 1 Hydra reveal and introducing Ghost Rider (Robbie Reyes), Daisy Johnson / Quake, and LMD synthetic life.',
    trivia: [
      'The show had to keep the Hydra infiltration a secret from the cast until Captain America: The Winter Soldier hit theaters.',
      'Chloe Bennet underwent martial arts training to perform Daisy Johnson’s single-take hallway fight in Season 2.',
      'Clark Gregg reprised Agent Coulson for 136 episodes, evolving into a Life Model Decoy with chronicled MCU history.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/b34jIp49t11A9T9a27g0u5h13F8.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/g9zYx795DerUDTGmuAKGhLIUt4u.jpg',
    streamingLinks: [
      { platform: 'Disney+ Hotstar', url: 'https://www.hotstar.com/shows/marvels-agents-of-shield/1260086964', availableRegions: ['US', 'UK', 'IN', 'JP'], priceTier: 'Included' }
    ],
    productionTrivia: 'The flying command airplane "The Bus" (Boeing C-17 Globemaster variant) set was constructed in Culver City.',
    trailerYoutubeId: 'T3T-evQZi4Q'
  },

  // --- LEGACY X-MEN & SONY MARVEL CLASSICS ---
  {
    id: 'logan-movie',
    title: 'Logan',
    type: 'Movie',
    year: 2017,
    runtimeOrSeasons: '137 min',
    rating: 5.0,
    genres: ['Action', 'Drama', 'Sci-Fi', 'Superhero', 'Thriller'],
    directorOrCreator: 'James Mangold',
    cast: ['Hugh Jackman', 'Patrick Stewart', 'Richard E. Grant', 'Boyd Holbrook', 'Stephen Merchant', 'Dafne Keen'],
    synopsis: 'In a dystopian 2029, an aging, weary Logan cares for an ailing Professor X in a hideout on the Mexican border. But his plan to hide from the world is upended when a young mutant closely resembling him arrives.',
    criticalAnalysis: 'An Academy Award-nominated neo-western and raw, heartbreaking farewell that redefined comic book cinema into high tragic art.',
    trivia: [
      'Hugh Jackman took a pay cut to ensure the film received an R rating with total artistic freedom.',
      'Dafne Keen improvised Spanish dialogue during her fiery emotional confrontation with Hugh Jackman.',
      'It became the first live-action superhero film nominated for an Academy Award for Best Adapted Screenplay.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/9Xw0I5RV2Z9t935io79m8R6e.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/fnbjcRDYn6YviCcePDnGdyBkYsB.jpg',
    streamingLinks: [
      { platform: 'Disney+ Hotstar', url: 'https://www.hotstar.com/movies/logan/1260014802', availableRegions: ['US', 'UK', 'IN', 'JP'], priceTier: 'Included' }
    ],
    productionTrivia: 'The climax in the North Dakota forest was shot in Louisiana pine forests with natural rain and mud.',
    trailerYoutubeId: 'Div0iP65aZo'
  },
  {
    id: 'deadpool-1',
    title: 'Deadpool',
    type: 'Movie',
    year: 2016,
    runtimeOrSeasons: '108 min',
    rating: 4.8,
    genres: ['Action', 'Comedy', 'Sci-Fi', 'Superhero'],
    directorOrCreator: 'Tim Miller',
    cast: ['Ryan Reynolds', 'Morena Baccarin', 'Ed Skrein', 'T.J. Miller', 'Gina Carano', 'Brianna Hildebrand'],
    synopsis: 'A wisecracking mercenary gets experimented on and becomes immortal but ugly, setting out to track down the syndicate who ruined his looks and abducted his fiancé.',
    criticalAnalysis: 'The R-rated comedy phenomenon that changed superhero movies forever through razor-sharp fourth-wall breaks and Ryan Reynolds’ decade-long passion project.',
    trivia: [
      'Ryan Reynolds paid for the script writers Rhett Reese and Paul Wernick to be on set out of his own pocket when the studio refused.',
      'The film was made on a modest budget of $58 million and grossed over $782 million worldwide.',
      'Ryan Reynolds kept his full Deadpool suit after production wrapped without asking permission.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/yDHYTfa29n4v4OPj9glq43Fk28d.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/fSRb7vyIP8rQpL0I4tlP39X50OG.jpg',
    streamingLinks: [
      { platform: 'Disney+ Hotstar', url: 'https://www.hotstar.com/movies/deadpool/1260014803', availableRegions: ['US', 'UK', 'IN', 'JP'], priceTier: 'Included' }
    ],
    productionTrivia: 'The highway overpass opening credits fight was animated frame-by-frame with practical freeze-frame camera rigs.',
    trailerYoutubeId: 'ONHBaC-pfsk'
  },
  {
    id: 'deadpool-2',
    title: 'Deadpool 2',
    type: 'Movie',
    year: 2018,
    runtimeOrSeasons: '119 min',
    rating: 4.8,
    genres: ['Action', 'Comedy', 'Sci-Fi', 'Superhero'],
    directorOrCreator: 'David Leitch',
    cast: ['Ryan Reynolds', 'Josh Brolin', 'Morena Baccarin', 'Julian Dennison', 'Zazie Beetz', 'T.J. Miller', 'Brianna Hildebrand', 'Jack Kesy'],
    synopsis: 'Foul-mouthed mutant mercenary Wade Wilson assembles a team of fellow mutant rogues named X-Force to protect a young boy with supernatural abilities from the time-traveling cyborg Cable.',
    criticalAnalysis: 'Packed with jaw-dropping practical stunt choreography by Atomic Blonde director David Leitch, hilarious X-Force parachuting mishaps, and Josh Brolin’s stoic Cable.',
    trivia: [
      'Brad Pitt made a hilarious half-second blink-and-you-miss-it cameo as the Vanisher in exchange for a cup of coffee delivered by Ryan Reynolds.',
      'Matt Damon and Alan Tudyk appeared in heavy redneck prosthetic makeup discussing toilet paper in a scene where neither was recognized by crew.',
      'Celine Dion recorded the original power ballad "Ashes" for the opening James Bond-style credits.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/3P52oz9CuBcvO976kLcu24m.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/to0spRl1CMDvyUbvdIY92bmP0Y5.jpg',
    streamingLinks: [
      { platform: 'Disney+ Hotstar', url: 'https://www.hotstar.com/movies/deadpool-2/1260014804', availableRegions: ['US', 'UK', 'IN', 'JP'], priceTier: 'Included' }
    ],
    productionTrivia: 'The prison convoy truck flip was performed practically using nitrogen air cannons in downtown Vancouver.',
    trailerYoutubeId: 'D86RtevtfrA'
  },
  {
    id: 'x-men-days-of-future-past',
    title: 'X-Men: Days of Future Past',
    type: 'Movie',
    year: 2014,
    runtimeOrSeasons: '132 min',
    rating: 4.9,
    genres: ['Action', 'Adventure', 'Sci-Fi', 'Superhero', 'Thriller'],
    directorOrCreator: 'Bryan Singer',
    cast: ['Hugh Jackman', 'James McAvoy', 'Michael Fassbender', 'Jennifer Lawrence', 'Halle Berry', 'Nicholas Hoult', 'Anna Paquin', 'Elliot Page', 'Peter Dinklage', 'Ian McKellen', 'Patrick Stewart'],
    synopsis: 'The X-Men send Wolverine to the past in a desperate effort to change history and prevent an apocalyptic event that dooms both humans and mutants.',
    criticalAnalysis: 'A monumental time-travel triumph uniting original 2000s cast members with First Class stars, featuring the iconic Quicksilver "Time in a Bottle" Pentagon kitchen scene.',
    trivia: [
      'The Quicksilver Pentagon kitchen scene took nearly a month to film using phantom high-speed cameras shooting at 3,200 frames per second.',
      'Michael Fassbender and James McAvoy performed intense emotional philosophical debates regarding mutant civil rights.',
      'Peter Dinklage was cast as Bolivar Trask, giving the villain a grounded corporate and military demeanor.'
    ],
    backdropUrl: 'https://image.tmdb.org/t/p/original/b34jIp49t11A9T9a27g0u5h13F8.jpg',
    posterUrl: 'https://image.tmdb.org/t/p/w500/tKkP40pL0I4tlP39X50OG.jpg',
    streamingLinks: [
      { platform: 'Disney+ Hotstar', url: 'https://www.hotstar.com/movies/x-men-days-of-future-past/1260014805', availableRegions: ['US', 'UK', 'IN', 'JP'], priceTier: 'Included' }
    ],
    productionTrivia: 'The RFK Stadium levitation sequence was calculated with architectural physics software.',
    trailerYoutubeId: 'pK2zYHWDZKo'
  }
];
