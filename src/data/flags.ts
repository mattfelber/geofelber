export interface Country {
  name: string;
  code: string;
  hints: {
    fact1: string;
    fact2: string;
    fact3: string;
  };
  quickTip: string;
}

export const countries: Country[] = [
  // Western Europe
  {
    name: 'France',
    code: 'fr',
    hints: {
      fact1: 'Home to the Eiffel Tower, which was built in 1889 for the World\'s Fair',
      fact2: 'The French Revolution (1789-1799) gave us the motto "Liberty, Equality, Fraternity"',
      fact3: 'French cuisine is listed by UNESCO as an Intangible Cultural Heritage'
    },
    quickTip: 'Blue, white, and red vertical stripes'
  },
  {
    name: 'Germany',
    code: 'de',
    hints: {
      fact1: 'The Berlin Wall fell in 1989, reunifying East and West Germany',
      fact2: 'Home to over 20,000 castles, including the famous Neuschwanstein',
      fact3: 'Invented the printing press, aspirin, and the automobile'
    },
    quickTip: 'Black, red, and yellow horizontal stripes'
  },
  {
    name: 'Italy',
    code: 'it',
    hints: {
      fact1: 'Ancient Rome was founded in 753 BC and became one of history\'s greatest empires',
      fact2: 'The Renaissance began here, giving us Leonardo da Vinci and Michelangelo',
      fact3: 'Pizza was invented in Naples around the 18th century'
    },
    quickTip: 'Green, white, and red vertical stripes'
  },
  {
    name: 'Spain',
    code: 'es',
    hints: {
      fact1: 'The Spanish Empire was the first global empire in history',
      fact2: 'Home to the world\'s oldest restaurant - Botín, operating since 1725',
      fact3: 'Spanish is the world\'s second-most spoken language by native speakers'
    },
    quickTip: 'Red and yellow stripes with coat of arms'
  },
  // Eastern Europe
  {
    name: 'Russia',
    code: 'ru',
    hints: {
      fact1: 'The world\'s largest country, spanning 11 time zones',
      fact2: 'Lake Baikal contains 20% of world\'s unfrozen fresh water',
      fact3: 'First country to send a human to space (Yuri Gagarin, 1961)'
    },
    quickTip: 'White, blue, and red horizontal stripes'
  },
  {
    name: 'Poland',
    code: 'pl',
    hints: {
      fact1: 'Marie Curie, who discovered radium and polonium, was Polish',
      fact2: 'The world\'s largest castle by land area is in Malbork, Poland',
      fact3: 'Survived partition between three empires and emerged stronger'
    },
    quickTip: 'White on top, red on bottom'
  },
  // Asia
  {
    name: 'Japan',
    code: 'jp',
    hints: {
      fact1: 'The world\'s oldest monarchy, dating back to 660 BCE',
      fact2: 'Invented instant noodles, karaoke, and emoji',
      fact3: 'Home to the world\'s oldest company, founded in 578 AD'
    },
    quickTip: 'White with red circle in center'
  },
  {
    name: 'China',
    code: 'cn',
    hints: {
      fact1: 'Built the Great Wall, visible from low Earth orbit',
      fact2: 'Invented paper, gunpowder, compass, and printing',
      fact3: 'The Terracotta Army has over 8,000 soldiers, each with unique faces'
    },
    quickTip: 'Red with large star and four smaller stars'
  },
  {
    name: 'India',
    code: 'in',
    hints: {
      fact1: 'Invented the number system, including zero',
      fact2: 'Home to the world\'s largest postal network',
      fact3: 'The Taj Mahal took 22 years and 20,000 workers to build'
    },
    quickTip: 'Orange, white, and green with blue wheel'
  },
  // Latin America
  {
    name: 'Brazil',
    code: 'br',
    hints: {
      fact1: 'Home to the Amazon, producing 20% of Earth\'s oxygen',
      fact2: 'Only country in Americas colonized by Portuguese',
      fact3: 'Won the FIFA World Cup 5 times, more than any other nation'
    },
    quickTip: 'Green with yellow diamond and blue circle'
  },
  {
    name: 'Mexico',
    code: 'mx',
    hints: {
      fact1: 'Ancient Mayans invented chocolate over 3,000 years ago',
      fact2: 'Home to the world\'s smallest volcano, Cuexcomate',
      fact3: 'The flag\'s eagle-snake symbol comes from Aztec legend'
    },
    quickTip: 'Green, white, and red with eagle eating snake'
  },
  // Oceania
  {
    name: 'Australia',
    code: 'au',
    hints: {
      fact1: 'Home to 21 of the world\'s 25 most venomous snakes',
      fact2: 'The Great Barrier Reef is the world\'s largest living structure',
      fact3: 'Has the world\'s largest population of wild camels'
    },
    quickTip: 'Blue with Union Jack and Southern Cross stars'
  }
  // Add more countries following the same pattern...
];
