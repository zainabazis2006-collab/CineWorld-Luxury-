import { Movie } from './types';

export interface Episode {
  number: number;
  title: string;
  synopsis: string;
  runtime: string;
  youtubeId?: string; // Optional episode-specific preview/clip
}

export interface Season {
  seasonNumber: number;
  episodes: Episode[];
}

// High-fidelity handcrafted episode listings for major series
const DETAILED_SERIES_EPISODES: Record<string, Record<number, Episode[]>> = {
  'the-last-of-us': {
    1: [
      { number: 1, title: 'When You\'re Lost in the Darkness', runtime: '81 min', synopsis: 'Twenty years after a fungal outbreak devastates humanity, survivors Joel and Tess are tasked with smuggling 14-year-old Ellie out of a quarantine zone.' },
      { number: 2, title: 'Infected', runtime: '53 min', synopsis: 'Joel, Tess, and Ellie travel through an overgrown and dangerous Boston, encountering terrifying Clickers for the first time.' },
      { number: 3, title: 'Long, Long Time', runtime: '75 min', synopsis: 'Bill, a survivalist living in an isolated town, meets Frank, a traveler seeking shelter. Their bond evolves over two decades in a post-apocalyptic world.' },
      { number: 4, title: 'Please Hold to My Hand', runtime: '46 min', synopsis: 'Joel and Ellie travel through Kansas City by truck but are forced to navigate a hostile territory run by a ruthless revolutionary leader.' },
      { number: 5, title: 'Endure and Survive', runtime: '59 min', synopsis: 'While attempting to escape Kansas City, Joel and Ellie team up with Henry and Sam, but must survive an ambush of infected and a massive underground horde.' },
      { number: 6, title: 'Kin', runtime: '59 min', synopsis: 'Joel is reunited with his brother Tommy in a thriving community in Wyoming, but struggles with growing fear and self-doubt about protecting Ellie.' },
      { number: 7, title: 'Left Behind', runtime: '56 min', synopsis: 'Flashback: Ellie remembers the fateful night she spent with her best friend Riley inside an abandoned shopping mall, before her immunity was discovered.' },
      { number: 8, title: 'When We Are in Need', runtime: '51 min', synopsis: 'While Joel is gravely wounded, Ellie must defend herself against a suspicious religious cult led by a magnetic and sinister preacher.' },
      { number: 9, title: 'Look for the Light', runtime: '43 min', synopsis: 'Joel and Ellie finally reach the Firefly hospital, but Joel faces a devastating moral decision when he learns what their cure requires.' }
    ]
  },
  'breaking-bad': {
    1: [
      { number: 1, title: 'Pilot', runtime: '58 min', synopsis: 'Walter White, a high school chemistry teacher diagnosed with terminal lung cancer, teams up with former student Jesse Pinkman to cook meth.' },
      { number: 2, title: 'Cat\'s in the Bag...', runtime: '48 min', synopsis: 'Walt and Jesse attempt to dispose of two bodies, leading to complications when one of the drug dealers unexpectedly survives.' },
      { number: 3, title: '...And the Bag\'s in the River', runtime: '48 min', synopsis: 'Walt is forced to decide whether to kill the captive drug dealer, Krazy-8, while Jesse tries to clean up a gruesome chemical spill.' },
      { number: 4, title: 'Cancer Man', runtime: '48 min', synopsis: 'Walt reveals his cancer diagnosis to his family, while Jesse attempts to start a new life but is sucked back into the drug trade.' },
      { number: 5, title: 'Gray Matter', runtime: '48 min', synopsis: 'Walt is offered financial help for his treatment by former colleagues, but pride drives him to refuse and continue cooking with Jesse.' },
      { number: 6, title: 'Crazy Handful of Nothin\'', runtime: '48 min', synopsis: 'As his chemotherapy begins, Walt adopts the persona of "Heisenberg" and makes a terrifying deal with local kingpin Tuco Salamanca.' },
      { number: 7, title: 'A No-Rough-Stuff-Type Deal', runtime: '48 min', synopsis: 'Walt and Jesse must pull off a daring chemical heist to meet Tuco\'s massive production demands, leading to a high-tension finale.' }
    ],
    2: [
      { number: 1, title: 'Seven Thirty-Seven', runtime: '47 min', synopsis: 'Following the brutal beatdown in the junkyard, Walt and Jesse realize Tuco has become completely unstable and they might be next.' },
      { number: 2, title: 'Grilled', runtime: '48 min', synopsis: 'Walt and Jesse are kidnapped by a paranoid Tuco and taken to a remote house in the desert, where they must outwit his senile uncle Hector.' },
      { number: 3, title: 'Bit by a Dead Bee', runtime: '47 min', synopsis: 'Walt concocts an elaborate fugue state alibi to explain his disappearance, while Jesse attempts to hide his drug money from the DEA.' },
      { number: 4, title: 'Down', runtime: '47 min', synopsis: 'Walt\'s lies create severe tension with Skyler, while Jesse gets kicked out of his house by his parents and hits rock bottom.' },
      { number: 5, title: 'Breakage', runtime: '47 min', synopsis: 'Walt and Jesse establish their own distribution network, but local dealers soon face violent pushback on the streets.' },
      { number: 6, title: 'Peekaboo', runtime: '47 min', synopsis: 'Jesse goes to collect money from drug addicts who robbed one of his dealers, discovering a neglected child in a squalid house.' },
      { number: 7, title: 'Negro y Azul', runtime: '47 min', synopsis: 'The legend of Heisenberg grows with a custom narcocorrido ballad, while Hank is transferred to El Paso and faces cartel violence.' },
      { number: 8, title: 'Better Call Saul', runtime: '47 min', synopsis: 'When one of their dealers is arrested, Walt and Jesse hire a flamboyant, corrupt criminal defense attorney named Saul Goodman.' }
    ]
  },
  'stranger-things': {
    1: [
      { number: 1, title: 'Chapter One: The Vanishing of Will Byers', runtime: '48 min', synopsis: 'In 1983 Indiana, a young boy disappears. On the same night, a mysterious girl with a shaved head and telekinetic powers is discovered in the woods.' },
      { number: 2, title: 'Chapter Two: The Weirdo on Maple Street', runtime: '55 min', synopsis: 'Mike, Dustin, and Lucas hide the strange girl in Mike\'s basement, while Chief Hopper investigates Will\'s vanishing and Nancy searches for Barb.' },
      { number: 3, title: 'Chapter Three: Holly, Jolly', runtime: '51 min', synopsis: 'Joyce believes Will is communicating with her through Christmas lights, while Nancy discovers a dark secret about the creature in the woods.' },
      { number: 4, title: 'Chapter Four: The Body', runtime: '50 min', synopsis: 'Unwilling to accept the state\'s finding of Will\'s body, Joyce conducts her own search, while Eleven demonstrates her connection to Will.' }
    ]
  },
  'the-office': {
    1: [
      { number: 1, title: 'Pilot', runtime: '23 min', synopsis: 'The mockumentary begins. Branch manager Michael Scott leads his staff through a normal workday, while rumors of downsizing start to circulate.' },
      { number: 2, title: 'Diversity Day', runtime: '23 min', synopsis: 'Michael conducts an inappropriate and chaotic racial diversity seminar, while Jim struggles to secure an annual sales commission.' },
      { number: 3, title: 'Health Care', runtime: '22 min', synopsis: 'Michael tasks Dwight with selecting a cheap healthcare plan, leading to severe cutbacks and an office-wide revolt.' },
      { number: 4, title: 'The Alliance', runtime: '22 min', synopsis: 'Dwight forms a paranoid alliance with Jim to protect their jobs from downsizing, leading to hilarious office pranks.' },
      { number: 5, title: 'Basketball', runtime: '22 min', synopsis: 'Michael challenges the warehouse staff to a high-stakes basketball game, with the losers forced to work on the weekend.' },
      { number: 6, title: 'Hot Girl', runtime: '22 min', synopsis: 'A beautiful handbag saleswoman sets up shop in the conference room, sparking intense competition among the male office staff.' }
    ]
  },
  'jujutsu-kaisen': {
    1: [
      { number: 1, title: 'Ryomen Sukuna', runtime: '24 min', synopsis: 'High schooler Yuji Itadori swallows a cursed object to protect his friends, hosting the legendary demon king Ryomen Sukuna.' },
      { number: 2, title: 'For Myself', runtime: '24 min', synopsis: 'Yuji is taken to Tokyo Jujutsu High by sorcerer Satoru Gojo, where he is presented with a choice regarding his execution.' },
      { number: 3, title: 'Girl of Steel', runtime: '24 min', synopsis: 'Yuji and Megumi meet Nobara Kugisaki, the third first-year student, and are sent to purge curses in an abandoned building.' },
      { number: 4, title: 'Curse Womb Must Die', runtime: '24 min', synopsis: 'The first-years are dispatched to a detention center to rescue survivors, encountering a terrifying Special Grade curse.' }
    ]
  },
  'the-boys': {
    1: [
      { number: 1, title: 'The Name of the Game', runtime: '60 min', synopsis: 'Hughie Campbell suffers a tragic loss due to a superhero\'s reckless actions, and is recruited by Billy Butcher to take revenge.' },
      { number: 2, title: 'Cherry', runtime: '56 min', synopsis: 'The Boys capture a member of the Seven, but struggle to find a way to penetrate his indestructible carbon-skin armor.' },
      { number: 3, title: 'Get Some', runtime: '57 min', synopsis: 'Butcher blackmails a former associate to get dirt on the Seven, while Starlight faces the dark reality of her dream job.' },
      { number: 4, title: 'The Female of the Species', runtime: '57 min', synopsis: 'The Boys discover a silent, caged super-powered woman in an underground cellar, while Homelander orchestrates a horrific plane hijacking.' }
    ]
  }
};

// Main Helper function to retrieve/generate Seasons & Episodes for any movie/series
export function getSeriesSeasons(movie: Movie): Season[] {
  if (movie.type !== 'Series') {
    return [];
  }

  // Parse seasons count from string (e.g. "5 Seasons", "1 Season")
  let count = movie.seasonsCount || 1;
  if (!movie.seasonsCount && movie.runtimeOrSeasons) {
    const parsed = parseInt(movie.runtimeOrSeasons, 10);
    if (!isNaN(parsed)) {
      count = parsed;
    }
  }

  const seasons: Season[] = [];

  // Check if we have handcrafted details
  const customSeasons = DETAILED_SERIES_EPISODES[movie.id];

  for (let s = 1; s <= count; s++) {
    // If we have custom episodes for this season, use them
    if (customSeasons && customSeasons[s]) {
      seasons.push({
        seasonNumber: s,
        episodes: customSeasons[s]
      });
    } else {
      // Generate realistic procedural episodes for this season
      const episodesCount = s === count ? 8 : 10; // final season has 8, others have 10
      const seasonEpisodes: Episode[] = [];

      const episodeTitles = [
        'The New Horizon',
        'Escalating Shadows',
        'Unexpected Allies',
        'The Turning Point',
        'Whispers in the Dark',
        'High Stakes Conflict',
        'The Great Confrontation',
        'Climax of Retribution',
        'Granite Shadows',
        'Endless Horizon (Season Finale)'
      ];

      for (let e = 1; e <= episodesCount; e++) {
        const title = e === episodesCount 
          ? `Chapter ${e}: ${episodeTitles[9]}`
          : `Chapter ${e}: ${episodeTitles[(e - 1) % episodeTitles.length]}`;

        seasonEpisodes.push({
          number: e,
          title,
          runtime: `${20 + (e % 3) * 15 + (movie.genres.includes('Comedy') ? 0 : 15)} min`,
          synopsis: `An intense, high-fidelity development unfolds as characters navigate the critical events of Season ${s}. Secrets are revealed and tensions escalate toward an unforgettable climax.`
        });
      }

      seasons.push({
        seasonNumber: s,
        episodes: seasonEpisodes
      });
    }
  }

  return seasons;
}
