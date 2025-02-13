export interface Country {
  name: string;
  code: string;
  hints: {
    fact1: string;
    fact2: string;
    fact3: string;
  };
  quickTip: string;
  difficulty?: number;
}

export const countries: Country[] = [
  // Western Europe
  {
    name: 'Andorra',
    code: 'AD',
    hints: {
      fact1: "The flag features blue, yellow, and red stripes with the national coat of arms in the center.",
      fact2: "The motto 'Virtus Unita Fortior' (United Virtue is Stronger) appears on the coat of arms.",
      fact3: "The flag design combines French and Spanish influences, reflecting Andorra's co-principality status."
    },
    quickTip: "Look for the detailed coat of arms in the center of tricolor stripes"
  },
  {
    name: 'Austria',
    code: 'AT',
    hints: {
      fact1: "One of the oldest national flags in the world, dating back to 1230.",
      fact2: "The red-white-red design comes from a legend of Duke Leopold V's blood-soaked white tunic during battle.",
      fact3: "The three horizontal stripes are of equal width, with red on top and bottom."
    },
    quickTip: "Three horizontal stripes: red-white-red"
  },
  {
    name: 'Belgium',
    code: 'BE',
    hints: {
      fact1: "Features three vertical stripes: black, yellow, and red.",
      fact2: "Colors come from the coat of arms of the Duchy of Brabant.",
      fact3: "Similar to Germany's flag but with vertical stripes and different colors."
    },
    quickTip: "Vertical black-yellow-red stripes"
  },
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
    name: 'Greece',
    code: 'GR',
    hints: {
      fact1: "Nine horizontal stripes alternating blue and white, with a white cross on a blue square.",
      fact2: "The cross symbolizes Greek Orthodox Christianity.",
      fact3: "The stripes represent the nine syllables of 'Freedom or Death' in Greek."
    },
    quickTip: "Blue and white stripes with a cross in the corner"
  },
  {
    name: 'Ireland',
    code: 'IE',
    hints: {
      fact1: "Three vertical stripes: green, white, and orange.",
      fact2: "Green represents the Catholic tradition, orange the Protestant tradition.",
      fact3: "White in the middle symbolizes peace between the two communities."
    },
    quickTip: "Green, white, and orange vertical stripes"
  },
  {
    name: 'Isle of Man',
    code: 'IM',
    hints: {
      fact1: "Features the triskelion - three armored legs joined at the thigh.",
      fact2: "The legs appear to be running on a red background.",
      fact3: "One of the most unique and recognizable flags in the world."
    },
    quickTip: "Look for three joined legs in a spinning wheel formation"
  },
  {
    name: 'Italy',
    code: 'it',
    hints: {
      fact1: 'Ancient Rome was founded in 753 BC and became one of history\'s greatest empires',
      fact2: 'The Renaissance began here, giving us Leonardo da Vinci and Michelangelo',
      fact3: 'Home to the world\'s oldest company, founded in 578 AD'
    },
    quickTip: 'Green, white, and red vertical stripes'
  },
  {
    name: 'Luxembourg',
    code: 'LU',
    hints: {
      fact1: "Three horizontal stripes: light blue, white, and red.",
      fact2: "Similar to the Netherlands flag but with a lighter blue.",
      fact3: "Colors date back to the 13th century coat of arms."
    },
    quickTip: "Like Netherlands flag but with lighter blue"
  },
  {
    name: 'Malta',
    code: 'MT',
    hints: {
      fact1: "Two vertical stripes: white and red.",
      fact2: "Features the George Cross in the upper left corner.",
      fact3: "The cross was awarded by King George VI for bravery in WWII."
    },
    quickTip: "White and red with a cross in the corner"
  },
  {
    name: 'Monaco',
    code: 'MC',
    hints: {
      fact1: "Two equal horizontal stripes: red on top, white on bottom.",
      fact2: "Similar to Indonesia's flag but with different proportions.",
      fact3: "Colors come from the heraldic colors of the House of Grimaldi."
    },
    quickTip: "Two stripes: red over white"
  },
  {
    name: 'Netherlands',
    code: 'NL',
    hints: {
      fact1: "Three horizontal stripes: red, white, and blue.",
      fact2: "The oldest tricolor flag still in use today.",
      fact3: "Originally orange instead of red (hence the Dutch national color)."
    },
    quickTip: "Red, white, and blue horizontal stripes"
  },
  {
    name: 'Portugal',
    code: 'PT',
    hints: {
      fact1: "Vertical green and red stripes with national coat of arms in the center.",
      fact2: "Green represents hope and red represents the blood of those who died serving the nation.",
      fact3: "The armillary sphere behind the shield symbolizes Portugal's maritime discoveries."
    },
    quickTip: "Green and red with detailed coat of arms"
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
  {
    name: 'Switzerland',
    code: 'CH',
    hints: {
      fact1: "Red square with a white cross in the center.",
      fact2: "One of only two square national flags (the other is Vatican City).",
      fact3: "The white cross has been a symbol of Switzerland since the 13th century."
    },
    quickTip: "Square red flag with white cross"
  },
  {
    name: 'United Kingdom',
    code: 'GB',
    hints: {
      fact1: "Combines crosses of St. George (England), St. Andrew (Scotland), and St. Patrick (Ireland).",
      fact2: "Known as the Union Jack or Union Flag.",
      fact3: "The design dates back to 1801 when Ireland joined Great Britain."
    },
    quickTip: "Red, white, and blue crosses and diagonal stripes"
  },
  // Eastern Europe
  {
    name: 'Albania',
    code: 'AL',
    hints: {
      fact1: "Features a black double-headed eagle on a red background.",
      fact2: "The eagle symbol comes from the Byzantine and Roman empires.",
      fact3: "One of the oldest national symbols still in use today."
    },
    quickTip: "Black double-headed eagle on red"
  },
  {
    name: 'Bulgaria',
    code: 'BG',
    hints: {
      fact1: "Three horizontal stripes: white, green, and red.",
      fact2: "White represents peace, green stands for the fertility of the land.",
      fact3: "Red symbolizes the courage and valor of the Bulgarian people."
    },
    quickTip: "White, green, and red horizontal stripes"
  },
  {
    name: 'Croatia',
    code: 'HR',
    hints: {
      fact1: "Red, white, and blue horizontal stripes with coat of arms in center.",
      fact2: "The checkered shield (šahovnica) is a distinctive Croatian symbol.",
      fact3: "Crown above the shield contains symbols of historic regions."
    },
    quickTip: "Red-white-blue with checkered shield"
  },
  {
    name: 'Czech Republic',
    code: 'CZ',
    hints: {
      fact1: "Two horizontal stripes (white over red) with blue triangle at hoist.",
      fact2: "Colors represent Bohemia (white and red) and Moravia (blue).",
      fact3: "Design was created after the split of Czechoslovakia."
    },
    quickTip: "Blue triangle with white and red stripes"
  },
  {
    name: 'Hungary',
    code: 'HU',
    hints: {
      fact1: "Three horizontal stripes: red, white, and green.",
      fact2: "Red symbolizes strength, white represents faithfulness.",
      fact3: "Green stands for hope and the land's fertility."
    },
    quickTip: "Red, white, and green horizontal stripes"
  },
  {
    name: 'Montenegro',
    code: 'ME',
    hints: {
      fact1: "Red flag with gold borders and double-headed eagle.",
      fact2: "Features the state coat of arms with a golden lion.",
      fact3: "Design based on the personal standard of King Nikola I."
    },
    quickTip: "Golden-bordered red flag with double-headed eagle"
  },
  {
    name: 'North Macedonia',
    code: 'MK',
    hints: {
      fact1: "Red background with golden sun with eight rays extending to edges.",
      fact2: "The sun represents 'new sun of liberty' from a famous poem.",
      fact3: "Current design was adopted in 1995 after independence."
    },
    quickTip: "Red with yellow sunburst"
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
  {
    name: 'Romania',
    code: 'RO',
    hints: {
      fact1: "Three vertical stripes: blue, yellow, and red.",
      fact2: "Colors come from the principalities of Moldavia and Wallachia.",
      fact3: "Similar to Chad's flag but with slightly different shade of blue."
    },
    quickTip: "Blue, yellow, and red vertical stripes"
  },
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
    name: 'Serbia',
    code: 'RS',
    hints: {
      fact1: "Three horizontal stripes: red, blue, and white with coat of arms.",
      fact2: "Features a double-headed eagle and crown in the center.",
      fact3: "Colors are traditional Pan-Slavic colors."
    },
    quickTip: "Red-blue-white with double-headed eagle"
  },
  {
    name: 'Slovakia',
    code: 'SK',
    hints: {
      fact1: "Three horizontal stripes: white, blue, and red with coat of arms.",
      fact2: "The double cross represents Christianity and Slavic heritage.",
      fact3: "Three hills in the coat of arms represent three mountain ranges."
    },
    quickTip: "White-blue-red with double cross on hills"
  },
  {
    name: 'Slovenia',
    code: 'SI',
    hints: {
      fact1: "Three horizontal stripes: white, blue, and red with coat of arms.",
      fact2: "Coat of arms shows Mount Triglav and three golden stars.",
      fact3: "The stars come from the counts of Celje's coat of arms."
    },
    quickTip: "White-blue-red with mountain and stars"
  },
  {
    name: 'Ukraine',
    code: 'UA',
    hints: {
      fact1: "Two horizontal stripes: blue over yellow.",
      fact2: "Blue represents the sky, yellow symbolizes wheat fields.",
      fact3: "Colors have been associated with Ukraine since medieval times."
    },
    quickTip: "Blue over yellow horizontal stripes"
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
    name: 'Argentina',
    code: 'AR',
    hints: {
      fact1: 'Light blue and white horizontal stripes',
      fact2: 'Yellow "Sun of May" with human face in center',
      fact3: 'Same colors as Uruguay but sun design is different'
    },
    quickTip: 'Light blue-white-light blue with sun face',
    difficulty: 9
  },
  {
    name: 'Bolivia',
    code: 'BO',
    hints: {
      fact1: 'Red, yellow, and green horizontal stripes',
      fact2: 'State flag includes coat of arms in center',
      fact3: 'Only South American flag with three equal horizontal stripes'
    },
    quickTip: 'Red-yellow-green horizontal stripes',
    difficulty: 2
  },
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
    name: 'Chile',
    code: 'CL',
    hints: {
      fact1: 'White and red horizontal stripes',
      fact2: 'Blue square with white star in top left',
      fact3: 'Similar to Texas flag but blue section is shorter'
    },
    quickTip: 'Like Texas flag but shorter blue part',
    difficulty: 8
  },
  {
    name: 'Colombia',
    code: 'CO',
    hints: {
      fact1: 'Yellow, blue, and red horizontal stripes',
      fact2: 'Yellow stripe takes up half the flag',
      fact3: 'Similar to Ecuador and Venezuela but different proportions'
    },
    quickTip: 'Yellow (wide), blue, red stripes',
    difficulty: 10
  },
  {
    name: 'Costa Rica',
    code: 'CR',
    hints: {
      fact1: 'Five horizontal stripes: blue, white, red (double width), white, blue',
      fact2: 'Red stripe in middle is twice as wide as others',
      fact3: 'Similar to Thailand but with red in middle instead of blue'
    },
    quickTip: 'Blue-white-red(wide)-white-blue',
    difficulty: 1
  },
  {
    name: 'Curaçao',
    code: 'CW',
    hints: {
      fact1: 'Blue background with two yellow stars',
      fact2: 'White horizontal stripe near bottom',
      fact3: 'Stars represent Curaçao and Klein Curaçao'
    },
    quickTip: 'Blue with two stars and white stripe',
    difficulty: 5
  },
  {
    name: 'Dominican Republic',
    code: 'DO',
    hints: {
      fact1: 'Cross divides flag into four rectangles: blue and red',
      fact2: 'White cross with coat of arms in center',
      fact3: 'Only national flag with Bible depicted in center'
    },
    quickTip: 'Blue and red quarters with white cross',
    difficulty: 1
  },
  {
    name: 'Ecuador',
    code: 'EC',
    hints: {
      fact1: 'Yellow, blue, and red horizontal stripes',
      fact2: 'Large coat of arms in center',
      fact3: 'Similar to Colombia but includes coat of arms'
    },
    quickTip: 'Like Colombia but with coat of arms',
    difficulty: 7
  },
  {
    name: 'Guatemala',
    code: 'GT',
    hints: {
      fact1: 'Light blue and white vertical stripes',
      fact2: 'National emblem in center: scroll with date and quetzal bird',
      fact3: 'One of few flags with a bird that is not an eagle'
    },
    quickTip: 'Blue sides with white center and quetzal',
    difficulty: 2
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
  {
    name: 'Panama',
    code: 'PA',
    hints: {
      fact1: 'Four squares: white with blue star, red with white star',
      fact2: 'Stars are five-pointed',
      fact3: 'Similar concept to Texas flag but quartered'
    },
    quickTip: 'Quartered white-red with stars',
    difficulty: 1
  },
  {
    name: 'Peru',
    code: 'PE',
    hints: {
      fact1: 'Three vertical stripes: red, white, red',
      fact2: 'State flag has coat of arms in center white stripe',
      fact3: 'Similar to Canada but vertical and no maple leaf'
    },
    quickTip: 'Red-white-red vertical stripes',
    difficulty: 6
  },
  {
    name: 'Puerto Rico',
    code: 'PR',
    hints: {
      fact1: 'Five red and white stripes',
      fact2: 'Blue triangle with white star on hoist side',
      fact3: 'Similar to Cuba but colors reversed'
    },
    quickTip: 'Like Cuba but colors reversed',
    difficulty: 2
  },
  {
    name: 'Uruguay',
    code: 'UY',
    hints: {
      fact1: 'Nine white and light blue stripes',
      fact2: 'Golden "Sun of May" in white canton',
      fact3: 'More stripes than Argentina but same colors'
    },
    quickTip: 'Multiple blue-white stripes with sun',
    difficulty: 11
  },
  {
    name: 'U.S. Virgin Islands',
    code: 'VI',
    hints: {
      fact1: 'White background with yellow eagle',
      fact2: 'Letters "USVI" above eagle',
      fact3: 'Eagle holds olive branch and arrows like U.S. eagle'
    },
    quickTip: 'White with eagle and USVI letters',
    difficulty: 2
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
  },
  // Nordic Countries
  {
    name: 'Denmark',
    code: 'DK',
    hints: {
      fact1: 'Red background with white cross',
      fact2: 'Nordic cross design - cross shifted towards the hoist',
      fact3: 'Oldest continuously used national flag (Dannebrog). All other Nordic crosses are based on this design.'
    },
    quickTip: 'Red with white cross'
  },
  {
    name: 'Faroe Islands',
    code: 'FO',
    hints: {
      fact1: 'White background with red and blue cross',
      fact2: 'Nordic cross with blue outline on red cross',
      fact3: 'Reverse colors of Norwegian flag - white background instead of red'
    },
    quickTip: 'White with red and blue cross'
  },
  {
    name: 'Finland',
    code: 'FI',
    hints: {
      fact1: 'White background with blue cross',
      fact2: 'Nordic cross design',
      fact3: 'Only Nordic cross flag with just two colors. Called "Blue Cross Flag" (Siniristilippu)'
    },
    quickTip: 'White with blue cross'
  },
  {
    name: 'Greenland',
    code: 'GL',
    hints: {
      fact1: 'White and red with half circle',
      fact2: 'Split into white top and red bottom with a reversed circle',
      fact3: 'Only Nordic flag without a cross. Circle represents sun setting on horizon'
    },
    quickTip: 'White and red with half circle'
  },
  {
    name: 'Iceland',
    code: 'IS',
    hints: {
      fact1: 'Blue background with red-bordered white cross',
      fact2: 'Nordic cross with red outline',
      fact3: 'Colors represent ice (white), ocean (blue), and volcanic fire (red)'
    },
    quickTip: 'Blue with red-bordered white cross'
  },
  {
    name: 'Norway',
    code: 'NO',
    hints: {
      fact1: 'Red background with blue-bordered white cross',
      fact2: 'Nordic cross with blue outline',
      fact3: 'Original "double cross" design that inspired Faroe Islands and Iceland'
    },
    quickTip: 'Red with blue-bordered white cross'
  },
  {
    name: 'Sweden',
    code: 'SE',
    hints: {
      fact1: 'Blue background with yellow cross',
      fact2: 'Nordic cross design',
      fact3: 'Only Nordic cross flag using yellow. Inspired by Finnish coat of arms'
    },
    quickTip: 'Blue with yellow cross'
  },
  // North America
  {
    name: 'Bermuda',
    code: 'BM',
    hints: {
      fact1: 'Red British ensign with coat of arms',
      fact2: 'Shows shipwreck of Sea Venture in shield',
      fact3: 'Only British territory flag with a red background'
    },
    quickTip: 'Red British flag with shipwreck',
    difficulty: 4
  },
  {
    name: 'Canada',
    code: 'CA',
    hints: {
      fact1: 'Red and white with maple leaf',
      fact2: 'Leaf has exactly 11 points',
      fact3: 'Vertical red bands on either side'
    },
    quickTip: 'Red-white-red with maple leaf',
    difficulty: 3
  },
  {
    name: 'United States of America',
    code: 'US',
    hints: {
      fact1: '13 red and white stripes',
      fact2: '50 white stars on blue canton',
      fact3: 'Stars arranged in 9 alternating rows of 6 and 5'
    },
    quickTip: 'Stars and stripes',
    difficulty: 2
  },
  // South & South-East Asia
  {
    name: 'Bangladesh',
    code: 'BD',
    hints: {
      fact1: 'Green background with red circle',
      fact2: 'Circle slightly offset towards hoist',
      fact3: 'Similar to Japan but different colors'
    },
    quickTip: 'Green with red circle',
    difficulty: 5
  },
  {
    name: 'Bhutan',
    code: 'BT',
    hints: {
      fact1: 'Yellow and orange diagonal split',
      fact2: 'White dragon across the middle',
      fact3: 'Only flag with a dragon not touching edges'
    },
    quickTip: 'Diagonal yellow-orange with dragon',
    difficulty: 5
  },
  {
    name: 'Cambodia',
    code: 'KH',
    hints: {
      fact1: 'Red and blue horizontal stripes',
      fact2: 'White Angkor Wat temple in center',
      fact3: 'Only flag featuring a building as main element'
    },
    quickTip: 'Blue-red with white temple',
    difficulty: 8
  },
  {
    name: 'Christmas Island',
    code: 'CX',
    hints: {
      fact1: 'Blue background with Southern Cross',
      fact2: 'Yellow disk with green map',
      fact3: 'Shows golden bosun bird in flight'
    },
    quickTip: 'Blue with yellow disk and bird',
    difficulty: 3
  },
  {
    name: 'Indonesia',
    code: 'ID',
    hints: {
      fact1: 'Red over white horizontal stripes',
      fact2: 'Equal width stripes',
      fact3: 'Similar to Monaco and Poland but horizontal'
    },
    quickTip: 'Red over white horizontal',
    difficulty: 9
  },
  {
    name: 'Laos',
    code: 'LA',
    hints: {
      fact1: 'Red and blue stripes with white circle',
      fact2: 'White circle in center contains three horizontal bands',
      fact3: 'Only flag with a centered disc between stripes'
    },
    quickTip: 'Red-blue with white circle',
    difficulty: 6
  },
  {
    name: 'Malaysia',
    code: 'MY',
    hints: {
      fact1: 'Red and white stripes with blue canton',
      fact2: 'Yellow crescent and 14-pointed star',
      fact3: 'Similar to US flag but fewer stripes and different canton'
    },
    quickTip: 'Like US but with crescent and star',
    difficulty: 16
  },
  {
    name: 'Pakistan',
    code: 'PK',
    hints: {
      fact1: 'Dark green with white band at hoist',
      fact2: 'White crescent and star',
      fact3: 'Only flag with darker shade of green as main color'
    },
    quickTip: 'Dark green with white side',
    difficulty: 2
  },
  {
    name: 'Philippines',
    code: 'PH',
    hints: {
      fact1: 'Blue and red horizontal with white triangle',
      fact2: 'Yellow sun with eight rays and three stars',
      fact3: 'Only flag that can be displayed upside down (red on top) to signal war'
    },
    quickTip: 'Triangle with sun and stars',
    difficulty: 8
  },
  {
    name: 'Singapore',
    code: 'SG',
    hints: {
      fact1: 'Red and white horizontal',
      fact2: 'White crescent with five stars in canton',
      fact3: 'Only national flag with crescent moon facing right'
    },
    quickTip: 'Red-white with crescent and stars',
    difficulty: 3
  },
  {
    name: 'Sri Lanka',
    code: 'LK',
    hints: {
      fact1: 'Maroon background with golden lion',
      fact2: 'Four bo leaves in corners',
      fact3: 'Only flag with a sword-wielding lion'
    },
    quickTip: 'Maroon with golden lion',
    difficulty: 9
  },
  {
    name: 'Thailand',
    code: 'TH',
    hints: {
      fact1: 'Five horizontal stripes: red, white, blue (double), white, red',
      fact2: 'Center blue stripe is twice as wide',
      fact3: 'Similar to Costa Rica but with blue in middle'
    },
    quickTip: 'Red-white-blue(wide)-white-red',
    difficulty: 10
  },
  // East Asia
  {
    name: 'Hong Kong',
    code: 'HK',
    hints: {
      fact1: 'Red background with white five-petal flower',
      fact2: 'Bauhinia flower has five stars on petals',
      fact3: 'Only Chinese territory with a flower emblem'
    },
    quickTip: 'Red with white flower',
    difficulty: 6
  },
  {
    name: 'Kazakhstan',
    code: 'KZ',
    hints: {
      fact1: 'Light blue background with yellow sun and eagle',
      fact2: 'National ornamental pattern on hoist side',
      fact3: 'Only flag with ancient Kazakh sun pattern'
    },
    quickTip: 'Blue with sun and pattern',
    difficulty: 0
  },
  {
    name: 'Kyrgyzstan',
    code: 'KG',
    hints: {
      fact1: 'Red background with yellow sun',
      fact2: 'Sun has 40 rays and center design',
      fact3: 'Only flag with a tunduk (yurt crown) symbol'
    },
    quickTip: 'Red with yellow sun design',
    difficulty: 3
  },
  {
    name: 'South Korea',
    code: 'KR',
    hints: {
      fact1: 'White background with red and blue yin-yang',
      fact2: 'Black trigrams in corners',
      fact3: 'Only national flag with yin-yang symbol'
    },
    quickTip: 'White with yin-yang and trigrams',
    difficulty: 6
  },
  {
    name: 'Taiwan',
    code: 'TW',
    hints: {
      fact1: 'Red background with blue canton',
      fact2: 'White sun with twelve rays',
      fact3: 'Similar to other "sun" flags but rays are triangular'
    },
    quickTip: 'Red with blue corner and white sun',
    difficulty: 4
  },
  // Oceania
  {
    name: 'American Samoa',
    code: 'AS',
    hints: {
      fact1: 'Red, white and blue like US flag',
      fact2: 'Eagle and traditional weapons',
      fact3: 'Only US territory flag with red and white stripes on right'
    },
    quickTip: 'US colors with eagle and weapons',
    difficulty: 4
  },
  {
    name: 'Guam',
    code: 'GU',
    hints: {
      fact1: 'Red border around blue field',
      fact2: 'Traditional proa boat shape in center',
      fact3: 'Only US territory flag with red border'
    },
    quickTip: 'Blue with red border and boat',
    difficulty: 3
  },
  {
    name: 'New Zealand',
    code: 'NZ',
    hints: {
      fact1: 'Blue background with Union Jack',
      fact2: 'Four red stars with white borders',
      fact3: 'Similar to Australia but fewer stars and no white ones'
    },
    quickTip: 'Like Australia but four red stars',
    difficulty: 9
  },
  {
    name: 'Northern Mariana Islands',
    code: 'MP',
    hints: {
      fact1: 'Blue background with white star',
      fact2: 'Gray stone pillar (latte) symbol',
      fact3: 'Only flag featuring ancient Chamorro stone pillar'
    },
    quickTip: 'Blue with star and stone pillar',
    difficulty: 3
  },
  {
    name: 'U.S. Minor Outlying Islands',
    code: 'UM',
    hints: {
      fact1: 'Blue background with white palm tree',
      fact2: 'Five white stars for island groups',
      fact3: 'Only US territory flag with palm tree'
    },
    quickTip: 'Blue with palm tree and stars',
    difficulty: 1
  },
  // Africa
  {
    name: 'Botswana',
    code: 'BW',
    hints: {
      fact1: 'Light blue background with black stripes',
      fact2: 'White stripes separate the black ones',
      fact3: 'Black represents racial harmony, blue represents water'
    },
    quickTip: 'Blue with black and white stripes',
    difficulty: 4
  },
  {
    name: 'Eswatini',
    code: 'SZ',
    hints: {
      fact1: 'Red, blue and yellow horizontal stripes',
      fact2: 'Black and white shield in center',
      fact3: 'Only flag with traditional Swazi shield'
    },
    quickTip: 'Stripes with black/white shield',
    difficulty: 3
  },
  {
    name: 'Ghana',
    code: 'GH',
    hints: {
      fact1: 'Red, yellow and green horizontal stripes',
      fact2: 'Black star in center',
      fact3: 'First African country to use pan-African colors'
    },
    quickTip: 'Pan-African colors with black star',
    difficulty: 2
  },
  {
    name: 'Kenya',
    code: 'KE',
    hints: {
      fact1: 'Black, red and green horizontal stripes',
      fact2: 'White stripes separate colors',
      fact3: 'Traditional Maasai shield and spears in center'
    },
    quickTip: 'Stripes with shield and spears',
    difficulty: 3
  },
  {
    name: 'Lesotho',
    code: 'LS',
    hints: {
      fact1: 'Blue, white and green horizontal stripes',
      fact2: 'Black Basotho hat in center',
      fact3: 'Only national flag with a traditional hat'
    },
    quickTip: 'Stripes with black hat',
    difficulty: 4
  },
  {
    name: 'Madagascar',
    code: 'MG',
    hints: {
      fact1: 'White vertical stripe on hoist side',
      fact2: 'Red and green horizontal stripes',
      fact3: 'Colors represent sovereignty and rainforests'
    },
    quickTip: 'White side, red and green',
    difficulty: 5
  },
  {
    name: 'Nigeria',
    code: 'NG',
    hints: {
      fact1: 'Three vertical stripes',
      fact2: 'Green stripes on sides, white in middle',
      fact3: 'Green represents agriculture, white represents peace'
    },
    quickTip: 'Green-white-green vertical',
    difficulty: 5
  },
  {
    name: 'Réunion',
    code: 'RE',
    hints: {
      fact1: 'French tricolor with "La Réunion" text',
      fact2: 'Regional flag shows volcano',
      fact3: 'Only French overseas territory with volcano on flag'
    },
    quickTip: 'French flag with text/volcano',
    difficulty: 2
  },
  {
    name: 'Rwanda',
    code: 'RW',
    hints: {
      fact1: 'Light blue, yellow and green stripes',
      fact2: 'Golden sun in top right corner',
      fact3: 'Sun has 24 rays representing hope'
    },
    quickTip: 'Stripes with corner sun',
    difficulty: 5
  },
  {
    name: 'Senegal',
    code: 'SN',
    hints: {
      fact1: 'Green, yellow and red vertical stripes',
      fact2: 'Green star in center of yellow stripe',
      fact3: 'Similar to Mali but with star'
    },
    quickTip: 'Pan-African vertical with star',
    difficulty: 6
  },
  {
    name: 'South Africa',
    code: 'ZA',
    hints: {
      fact1: 'Y-shaped pattern dividing six colors',
      fact2: 'Red and blue on top, green on bottom',
      fact3: 'Only national flag with six colors'
    },
    quickTip: 'Y-shape with six colors',
    difficulty: 4
  },
  {
    name: 'Uganda',
    code: 'UG',
    hints: {
      fact1: 'Six horizontal stripes alternating black and yellow',
      fact2: 'White crested crane in center circle',
      fact3: 'Only flag with crested crane'
    },
    quickTip: 'Black/yellow stripes with crane',
    difficulty: 5
  },
  // Middle East
  {
    name: 'Israel',
    code: 'IL',
    hints: {
      fact1: 'White background with blue stripes',
      fact2: 'Star of David in center',
      fact3: 'Based on traditional Jewish prayer shawl'
    },
    quickTip: 'White with blue stripes and star',
    difficulty: 4
  },
  {
    name: 'Jordan',
    code: 'JO',
    hints: {
      fact1: 'Three horizontal stripes: black, white, green',
      fact2: 'Red triangle at hoist with white star',
      fact3: 'Similar to Palestine but star has seven points'
    },
    quickTip: 'Like Palestine with seven-point star',
    difficulty: 2
  },
  {
    name: 'Palestine',
    code: 'PS',
    hints: {
      fact1: 'Three horizontal stripes: black, white, green',
      fact2: 'Red triangle at hoist',
      fact3: 'Similar to Jordan but no star'
    },
    quickTip: 'Like Jordan without star',
    difficulty: 2
  },
  {
    name: 'Qatar',
    code: 'QA',
    hints: {
      fact1: 'White and maroon vertical sections',
      fact2: 'Serrated line between colors',
      fact3: 'Nine points in serrated divider'
    },
    quickTip: 'White and maroon with zigzag',
    difficulty: 4
  },
  {
    name: 'Tunisia',
    code: 'TN',
    hints: {
      fact1: 'Red background with white circle',
      fact2: 'Red crescent and star in circle',
      fact3: 'Only flag with crescent entirely in circle'
    },
    quickTip: 'Red with white circle and crescent',
    difficulty: 8
  },
  {
    name: 'Turkey',
    code: 'TR',
    hints: {
      fact1: 'Red background with white crescent',
      fact2: 'White star next to crescent',
      fact3: 'Crescent opens to right unlike most flags'
    },
    quickTip: 'Red with white crescent and star',
    difficulty: 8
  },
  {
    name: 'United Arab Emirates',
    code: 'AE',
    hints: {
      fact1: 'Three horizontal stripes: green, white, black',
      fact2: 'Red vertical band at hoist',
      fact3: 'Pan-Arab colors in unique arrangement'
    },
    quickTip: 'Three stripes with red side',
    difficulty: 5
  },
];
