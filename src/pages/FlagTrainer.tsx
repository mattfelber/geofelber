import { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  Collapse, 
  Grid, 
  IconButton, 
  Paper, 
  Tooltip, 
  Typography,
  alpha 
} from '@mui/material';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface Country {
  name: string;
  code: string;
  hints: {
    colors: string;
    symbols: string;
    pattern: string;
  };
  quickTip: string;
}

const countries: Country[] = [
  // Western Europe
  {
    name: 'Andorra',
    code: 'ad',
    hints: {
      colors: 'Blue, yellow, and red vertical stripes',
      symbols: 'Coat of arms in center',
      pattern: 'Three vertical stripes with emblem'
    },
    quickTip: 'Blue, yellow, and red vertical stripes with coat of arms'
  },
  {
    name: 'Austria',
    code: 'at',
    hints: {
      colors: 'Red and white horizontal stripes',
      symbols: 'None',
      pattern: 'Three horizontal stripes'
    },
    quickTip: 'Red-white-red horizontal stripes'
  },
  {
    name: 'Belgium',
    code: 'be',
    hints: {
      colors: 'Black, yellow, and red vertical stripes',
      symbols: 'None',
      pattern: 'Three vertical stripes'
    },
    quickTip: 'Black, yellow, and red vertical stripes'
  },
  {
    name: 'France',
    code: 'fr',
    hints: {
      colors: 'Blue, white, and red vertical stripes',
      symbols: 'None',
      pattern: 'Three vertical stripes'
    },
    quickTip: 'Blue, white, and red vertical stripes'
  },
  {
    name: 'Germany',
    code: 'de',
    hints: {
      colors: 'Black, red, and yellow horizontal stripes',
      symbols: 'None',
      pattern: 'Three horizontal stripes'
    },
    quickTip: 'Black, red, and yellow horizontal stripes'
  },
  {
    name: 'Greece',
    code: 'gr',
    hints: {
      colors: 'Blue and white',
      symbols: 'Cross in canton',
      pattern: 'Nine stripes with cross in top-left'
    },
    quickTip: 'Blue and white stripes with cross in corner'
  },
  {
    name: 'Ireland',
    code: 'ie',
    hints: {
      colors: 'Green, white, and orange vertical stripes',
      symbols: 'None',
      pattern: 'Three vertical stripes'
    },
    quickTip: 'Green, white, and orange vertical stripes'
  },
  {
    name: 'Isle of Man',
    code: 'im',
    hints: {
      colors: 'Red with three armored legs',
      symbols: 'Three legs in armor joined at hip',
      pattern: 'Three legs in a spiral on red'
    },
    quickTip: 'Red flag with three armored legs in a spiral'
  },
  {
    name: 'Italy',
    code: 'it',
    hints: {
      colors: 'Green, white, and red vertical stripes',
      symbols: 'None',
      pattern: 'Three vertical stripes'
    },
    quickTip: 'Green, white, and red vertical stripes'
  },
  {
    name: 'Luxembourg',
    code: 'lu',
    hints: {
      colors: 'Red, white, and light blue horizontal stripes',
      symbols: 'None',
      pattern: 'Three horizontal stripes'
    },
    quickTip: 'Like Netherlands flag but with lighter blue'
  },
  {
    name: 'Malta',
    code: 'mt',
    hints: {
      colors: 'White and red vertical',
      symbols: 'George Cross in canton',
      pattern: 'Two vertical bands with cross'
    },
    quickTip: 'White and red with George Cross in top left'
  },
  {
    name: 'Monaco',
    code: 'mc',
    hints: {
      colors: 'Red and white horizontal stripes',
      symbols: 'None',
      pattern: 'Two horizontal stripes'
    },
    quickTip: 'Red on top, white on bottom (opposite of Indonesia)'
  },
  {
    name: 'Netherlands',
    code: 'nl',
    hints: {
      colors: 'Red, white, and blue horizontal stripes',
      symbols: 'None',
      pattern: 'Three horizontal stripes'
    },
    quickTip: 'Red, white, and blue horizontal stripes'
  },
  {
    name: 'Portugal',
    code: 'pt',
    hints: {
      colors: 'Green and red with coat of arms',
      symbols: 'National coat of arms',
      pattern: 'Vertical bicolor with centered emblem'
    },
    quickTip: 'Green and red vertical split with detailed coat of arms'
  },
  {
    name: 'Spain',
    code: 'es',
    hints: {
      colors: 'Red and yellow horizontal stripes',
      symbols: 'Coat of arms',
      pattern: 'Two red stripes with yellow middle'
    },
    quickTip: 'Red and yellow stripes with coat of arms'
  },
  {
    name: 'Switzerland',
    code: 'ch',
    hints: {
      colors: 'Red and white',
      symbols: 'White cross',
      pattern: 'White cross on red square background'
    },
    quickTip: 'White cross on red square background'
  },
  {
    name: 'United Kingdom',
    code: 'gb',
    hints: {
      colors: 'Red, white, and blue',
      symbols: 'Combined crosses of St. George, St. Andrew, and St. Patrick',
      pattern: 'Overlapping crosses'
    },
    quickTip: 'Union Jack - overlapping red and white crosses on blue'
  },
  // Eastern Europe
  {
    name: 'Albania',
    code: 'al',
    hints: {
      colors: 'Red with black double-headed eagle',
      symbols: 'Double-headed eagle',
      pattern: 'Black eagle on red background'
    },
    quickTip: 'Black double-headed eagle on red background'
  },
  {
    name: 'Bulgaria',
    code: 'bg',
    hints: {
      colors: 'White, green, and red horizontal stripes',
      symbols: 'None',
      pattern: 'Three horizontal stripes'
    },
    quickTip: 'White, green, and red horizontal stripes'
  },
  {
    name: 'Croatia',
    code: 'hr',
    hints: {
      colors: 'Red, white, and blue horizontal stripes',
      symbols: 'Coat of arms with checkered shield',
      pattern: 'Three horizontal stripes with coat of arms'
    },
    quickTip: 'Red, white, and blue with red and white checkerboard shield'
  },
  {
    name: 'Czech Republic',
    code: 'cz',
    hints: {
      colors: 'White, red, and blue',
      symbols: 'Blue triangle at hoist',
      pattern: 'Two horizontal stripes with triangle'
    },
    quickTip: 'White and red stripes with blue triangle on left'
  },
  {
    name: 'Hungary',
    code: 'hu',
    hints: {
      colors: 'Red, white, and green horizontal stripes',
      symbols: 'None',
      pattern: 'Three horizontal stripes'
    },
    quickTip: 'Red, white, and green horizontal stripes'
  },
  {
    name: 'Montenegro',
    code: 'me',
    hints: {
      colors: 'Red with gold borders and eagle',
      symbols: 'Double-headed eagle with crown',
      pattern: 'Golden bordered red flag with eagle'
    },
    quickTip: 'Red with gold-bordered double-headed eagle'
  },
  {
    name: 'North Macedonia',
    code: 'mk',
    hints: {
      colors: 'Red with yellow sun',
      symbols: 'Sun with eight rays',
      pattern: 'Yellow sun on red background'
    },
    quickTip: 'Red with yellow sunburst'
  },
  {
    name: 'Poland',
    code: 'pl',
    hints: {
      colors: 'White and red horizontal stripes',
      symbols: 'None',
      pattern: 'Two horizontal stripes'
    },
    quickTip: 'White on top, red on bottom'
  },
  {
    name: 'Romania',
    code: 'ro',
    hints: {
      colors: 'Blue, yellow, and red vertical stripes',
      symbols: 'None',
      pattern: 'Three vertical stripes'
    },
    quickTip: 'Blue, yellow, and red vertical stripes'
  },
  {
    name: 'Russia',
    code: 'ru',
    hints: {
      colors: 'White, blue, and red horizontal stripes',
      symbols: 'None',
      pattern: 'Three horizontal stripes'
    },
    quickTip: 'White, blue, and red horizontal stripes'
  },
  {
    name: 'Serbia',
    code: 'rs',
    hints: {
      colors: 'Red, blue, and white horizontal stripes',
      symbols: 'Double-headed eagle and crown',
      pattern: 'Three horizontal stripes with coat of arms'
    },
    quickTip: 'Red, blue, and white with double-headed eagle'
  },
  {
    name: 'Slovakia',
    code: 'sk',
    hints: {
      colors: 'White, blue, and red horizontal stripes',
      symbols: 'Coat of arms with double cross',
      pattern: 'Three horizontal stripes with coat of arms'
    },
    quickTip: 'White, blue, and red with double cross on shield'
  },
  {
    name: 'Slovenia',
    code: 'si',
    hints: {
      colors: 'White, blue, and red horizontal stripes',
      symbols: 'Coat of arms with Mount Triglav',
      pattern: 'Three horizontal stripes with coat of arms'
    },
    quickTip: 'White, blue, and red with Mount Triglav coat of arms'
  },
  {
    name: 'Ukraine',
    code: 'ua',
    hints: {
      colors: 'Blue and yellow horizontal stripes',
      symbols: 'None',
      pattern: 'Two horizontal stripes'
    },
    quickTip: 'Blue on top, yellow on bottom'
  },
  // Nordics
  {
    name: 'Denmark',
    code: 'dk',
    hints: {
      colors: 'Red with white cross',
      symbols: 'Nordic cross',
      pattern: 'White cross on red background'
    },
    quickTip: 'Red with white Nordic cross'
  },
  {
    name: 'Faroe Islands',
    code: 'fo',
    hints: {
      colors: 'White with red and blue cross',
      symbols: 'Nordic cross',
      pattern: 'White with red-bordered blue cross'
    },
    quickTip: 'White with red-bordered blue Nordic cross'
  },
  {
    name: 'Finland',
    code: 'fi',
    hints: {
      colors: 'White with blue cross',
      symbols: 'Nordic cross',
      pattern: 'Blue cross on white background'
    },
    quickTip: 'White with blue Nordic cross'
  },
  {
    name: 'Greenland',
    code: 'gl',
    hints: {
      colors: 'White and red',
      symbols: 'Circle divided into red and white',
      pattern: 'White top, red bottom with opposite colored circle'
    },
    quickTip: 'White and red with divided circle'
  },
  {
    name: 'Iceland',
    code: 'is',
    hints: {
      colors: 'Blue with red and white cross',
      symbols: 'Nordic cross',
      pattern: 'Blue with red-bordered white cross'
    },
    quickTip: 'Blue with red-bordered white Nordic cross'
  },
  {
    name: 'Norway',
    code: 'no',
    hints: {
      colors: 'Red with blue and white cross',
      symbols: 'Nordic cross',
      pattern: 'Red with blue-bordered white cross'
    },
    quickTip: 'Red with blue-bordered white Nordic cross'
  },
  {
    name: 'Sweden',
    code: 'se',
    hints: {
      colors: 'Blue with yellow cross',
      symbols: 'Nordic cross',
      pattern: 'Yellow cross on blue background'
    },
    quickTip: 'Blue with yellow Nordic cross'
  },
  // Additional Asian Countries
  {
    name: 'Taiwan',
    code: 'tw',
    hints: {
      colors: 'Red and blue with white sun',
      symbols: 'White sun symbol',
      pattern: 'Blue canton with white sun, red field'
    },
    quickTip: 'Blue rectangle with white sun in corner on red background'
  },
  {
    name: 'Mongolia',
    code: 'mn',
    hints: {
      colors: 'Red with blue stripes and yellow symbol',
      symbols: 'Soyombo symbol',
      pattern: 'Vertical stripes on sides with symbol'
    },
    quickTip: 'Red with blue stripes on sides and yellow Buddhist symbol'
  },
  {
    name: 'Kazakhstan',
    code: 'kz',
    hints: {
      colors: 'Light blue with yellow sun and eagle',
      symbols: 'Sun, eagle, and ornamental pattern',
      pattern: 'National ornament on left side'
    },
    quickTip: 'Light blue with yellow sun and ethnic pattern on side'
  },
  {
    name: 'Pakistan',
    code: 'pk',
    hints: {
      colors: 'Green and white',
      symbols: 'Crescent moon and star',
      pattern: 'White stripe on left with symbols'
    },
    quickTip: 'Green with white stripe, crescent moon and star'
  },
  {
    name: 'Sri Lanka',
    code: 'lk',
    hints: {
      colors: 'Maroon, orange, and green with golden lion',
      symbols: 'Lion holding sword and border leaves',
      pattern: 'Four golden bo leaves in corners'
    },
    quickTip: 'Golden lion on maroon background with orange and green stripes'
  },
  // Additional European Countries
  {
    name: 'Ireland',
    code: 'ie',
    hints: {
      colors: 'Green, white, and orange vertical stripes',
      symbols: 'None',
      pattern: 'Three vertical stripes'
    },
    quickTip: 'Green, white, and orange vertical stripes (similar to Ivory Coast but reversed)'
  },
  {
    name: 'Portugal',
    code: 'pt',
    hints: {
      colors: 'Green and red with coat of arms',
      symbols: 'National coat of arms',
      pattern: 'Vertical bicolor with centered emblem'
    },
    quickTip: 'Green and red vertical split with detailed coat of arms'
  },
  {
    name: 'Denmark',
    code: 'dk',
    hints: {
      colors: 'Red with white cross',
      symbols: 'Nordic cross',
      pattern: 'White cross on red background'
    },
    quickTip: 'Red with white Nordic cross (oldest national flag still in use)'
  },
  {
    name: 'Finland',
    code: 'fi',
    hints: {
      colors: 'White with blue cross',
      symbols: 'Nordic cross',
      pattern: 'Blue cross on white background'
    },
    quickTip: 'White with blue Nordic cross'
  },
  {
    name: 'Austria',
    code: 'at',
    hints: {
      colors: 'Red and white horizontal stripes',
      symbols: 'None',
      pattern: 'Three horizontal stripes'
    },
    quickTip: 'Red-white-red horizontal stripes'
  },
  {
    name: 'Belgium',
    code: 'be',
    hints: {
      colors: 'Black, yellow, and red vertical stripes',
      symbols: 'None',
      pattern: 'Three vertical stripes'
    },
    quickTip: 'Black, yellow, and red vertical stripes'
  },
  {
    name: 'Romania',
    code: 'ro',
    hints: {
      colors: 'Blue, yellow, and red vertical stripes',
      symbols: 'None',
      pattern: 'Three vertical stripes'
    },
    quickTip: 'Blue, yellow, and red vertical stripes (similar to Chad)'
  },
  {
    name: 'Hungary',
    code: 'hu',
    hints: {
      colors: 'Red, white, and green horizontal stripes',
      symbols: 'None',
      pattern: 'Three horizontal stripes'
    },
    quickTip: 'Red, white, and green horizontal stripes'
  },
  {
    name: 'Czech Republic',
    code: 'cz',
    hints: {
      colors: 'White, red, and blue',
      symbols: 'Blue triangle at hoist',
      pattern: 'Two horizontal stripes with triangle'
    },
    quickTip: 'White and red stripes with blue triangle on left'
  },
  {
    name: 'Ukraine',
    code: 'ua',
    hints: {
      colors: 'Blue and yellow horizontal stripes',
      symbols: 'None',
      pattern: 'Two horizontal stripes'
    },
    quickTip: 'Blue on top, yellow on bottom'
  },
  // Baltics
  {
    name: 'Estonia',
    code: 'ee',
    hints: {
      colors: 'Blue, black, and white horizontal stripes',
      symbols: 'None',
      pattern: 'Three horizontal stripes'
    },
    quickTip: 'Blue, black, and white horizontal stripes'
  },
  {
    name: 'Latvia',
    code: 'lv',
    hints: {
      colors: 'Maroon and white horizontal stripes',
      symbols: 'None',
      pattern: 'Three horizontal stripes with maroon top and bottom'
    },
    quickTip: 'Maroon with white stripe in middle'
  },
  {
    name: 'Lithuania',
    code: 'lt',
    hints: {
      colors: 'Yellow, green, and red horizontal stripes',
      symbols: 'None',
      pattern: 'Three horizontal stripes'
    },
    quickTip: 'Yellow, green, and red horizontal stripes'
  },
  // Latin America
  {
    name: 'Argentina',
    code: 'ar',
    hints: {
      colors: 'Light blue and white horizontal stripes',
      symbols: 'Sun of May in center',
      pattern: 'Three horizontal stripes with sun'
    },
    quickTip: 'Light blue and white stripes with golden sun'
  },
  {
    name: 'Bolivia',
    code: 'bo',
    hints: {
      colors: 'Red, yellow, and green horizontal stripes',
      symbols: 'Coat of arms for state flag',
      pattern: 'Three horizontal stripes'
    },
    quickTip: 'Red, yellow, and green horizontal stripes'
  },
  {
    name: 'Brazil',
    code: 'br',
    hints: {
      colors: 'Green background with yellow diamond',
      symbols: 'Blue circle with stars and "Ordem e Progresso" banner',
      pattern: 'Diamond shape in center'
    },
    quickTip: 'Green with yellow diamond and blue circle'
  },
  {
    name: 'Chile',
    code: 'cl',
    hints: {
      colors: 'White and red horizontal stripes with blue canton',
      symbols: 'White star on blue',
      pattern: 'Two horizontal stripes with blue square'
    },
    quickTip: 'Like Texas flag but with longer red stripe'
  },
  {
    name: 'Colombia',
    code: 'co',
    hints: {
      colors: 'Yellow, blue, and red horizontal stripes',
      symbols: 'None',
      pattern: 'Three horizontal stripes'
    },
    quickTip: 'Yellow, blue, and red horizontal stripes'
  },
  {
    name: 'Costa Rica',
    code: 'cr',
    hints: {
      colors: 'Blue, white, and red horizontal stripes',
      symbols: 'None',
      pattern: 'Five horizontal stripes'
    },
    quickTip: 'Blue, white, red, white, blue horizontal stripes'
  },
  {
    name: 'Mexico',
    code: 'mx',
    hints: {
      colors: 'Green, white, and red vertical stripes',
      symbols: 'Eagle with snake on cactus',
      pattern: 'Three vertical stripes with coat of arms'
    },
    quickTip: 'Green, white, and red with eagle eating snake'
  },
  {
    name: 'Peru',
    code: 'pe',
    hints: {
      colors: 'Red and white vertical stripes',
      symbols: 'None',
      pattern: 'Three vertical stripes'
    },
    quickTip: 'Red, white, red vertical stripes'
  },
  // North America
  {
    name: 'Canada',
    code: 'ca',
    hints: {
      colors: 'Red and white',
      symbols: 'Maple leaf',
      pattern: 'Red bands on sides with leaf in center'
    },
    quickTip: 'Red maple leaf between red bands'
  },
  {
    name: 'United States of America',
    code: 'us',
    hints: {
      colors: 'Red, white, and blue',
      symbols: 'Stars and stripes',
      pattern: '13 stripes and 50 stars'
    },
    quickTip: 'Stars in blue canton, red and white stripes'
  },
  // South & South-East Asia
  {
    name: 'Bangladesh',
    code: 'bd',
    hints: {
      colors: 'Green with red circle',
      symbols: 'Red circle',
      pattern: 'Red circle slightly off-center'
    },
    quickTip: 'Green with red circle (slightly off-center)'
  },
  {
    name: 'Bhutan',
    code: 'bt',
    hints: {
      colors: 'Yellow and orange diagonal',
      symbols: 'White dragon',
      pattern: 'Diagonal split with dragon'
    },
    quickTip: 'White dragon on yellow and orange'
  },
  {
    name: 'Cambodia',
    code: 'kh',
    hints: {
      colors: 'Red and blue with white',
      symbols: 'Angkor Wat temple',
      pattern: 'Three horizontal stripes with temple'
    },
    quickTip: 'Red with blue stripes and Angkor Wat temple'
  },
  {
    name: 'India',
    code: 'in',
    hints: {
      colors: 'Orange, white, and green horizontal stripes',
      symbols: 'Blue Ashoka Chakra (wheel)',
      pattern: 'Three horizontal stripes with wheel'
    },
    quickTip: 'Orange, white, and green with blue wheel'
  },
  {
    name: 'Indonesia',
    code: 'id',
    hints: {
      colors: 'Red and white horizontal stripes',
      symbols: 'None',
      pattern: 'Two horizontal stripes'
    },
    quickTip: 'Red over white horizontal stripes'
  },
  {
    name: 'Laos',
    code: 'la',
    hints: {
      colors: 'Red, blue, and white horizontal stripes',
      symbols: 'White circle',
      pattern: 'Three horizontal stripes with circle'
    },
    quickTip: 'Red with blue stripe and white circle'
  },
  {
    name: 'Malaysia',
    code: 'my',
    hints: {
      colors: 'Red and white stripes with blue canton',
      symbols: 'Crescent moon and star',
      pattern: 'Stripes with blue rectangle'
    },
    quickTip: 'Red and white stripes with blue canton containing yellow crescent'
  },
  {
    name: 'Pakistan',
    code: 'pk',
    hints: {
      colors: 'Green and white',
      symbols: 'Crescent moon and star',
      pattern: 'White stripe at hoist'
    },
    quickTip: 'Dark green with white stripe and crescent'
  },
  {
    name: 'Philippines',
    code: 'ph',
    hints: {
      colors: 'Blue, red, white, and yellow',
      symbols: 'Sun, stars, and triangle',
      pattern: 'Horizontal stripes with triangle'
    },
    quickTip: 'Blue and red with white triangle and sun'
  },
  {
    name: 'Singapore',
    code: 'sg',
    hints: {
      colors: 'Red and white',
      symbols: 'Crescent moon and five stars',
      pattern: 'Two horizontal bands'
    },
    quickTip: 'Red with white crescent and stars'
  },
  {
    name: 'Sri Lanka',
    code: 'lk',
    hints: {
      colors: 'Yellow, red, and green',
      symbols: 'Golden lion holding sword',
      pattern: 'Maroon background with borders'
    },
    quickTip: 'Golden lion on maroon with yellow and green borders'
  },
  {
    name: 'Thailand',
    code: 'th',
    hints: {
      colors: 'Red, white, and blue horizontal stripes',
      symbols: 'None',
      pattern: 'Five horizontal stripes'
    },
    quickTip: 'Red, white, blue, white, red stripes'
  },
  {
    name: 'Vietnam',
    code: 'vn',
    hints: {
      colors: 'Red with yellow star',
      symbols: 'Yellow five-pointed star',
      pattern: 'Star in center'
    },
    quickTip: 'Yellow star on red background'
  },
  // Rest of Asia
  {
    name: 'China',
    code: 'cn',
    hints: {
      colors: 'Red with yellow stars',
      symbols: 'One large and four small stars',
      pattern: 'Stars in top-left'
    },
    quickTip: 'Red with large star and four smaller stars'
  },
  {
    name: 'Hong Kong',
    code: 'hk',
    hints: {
      colors: 'Red with white flower',
      symbols: 'Bauhinia flower',
      pattern: 'White flower on red'
    },
    quickTip: 'Red with white five-petal flower'
  },
  {
    name: 'Japan',
    code: 'jp',
    hints: {
      colors: 'White with red circle',
      symbols: 'Red circle (sun)',
      pattern: 'Circle in center'
    },
    quickTip: 'White with red circle in center'
  },
  {
    name: 'Kazakhstan',
    code: 'kz',
    hints: {
      colors: 'Light blue with yellow sun and eagle',
      symbols: 'Sun, eagle, ornamental pattern',
      pattern: 'National ornament on left'
    },
    quickTip: 'Light blue with yellow sun and ethnic pattern'
  },
  {
    name: 'South Korea',
    code: 'kr',
    hints: {
      colors: 'White with red and blue circle',
      symbols: 'Yin-yang circle and trigrams',
      pattern: 'Circle with trigrams'
    },
    quickTip: 'White with red and blue yin-yang and black trigrams'
  },
  {
    name: 'Taiwan',
    code: 'tw',
    hints: {
      colors: 'Red with blue canton',
      symbols: 'White sun on blue',
      pattern: 'Blue rectangle with white sun'
    },
    quickTip: 'Red with blue canton containing white sun'
  },
  // Oceania
  {
    name: 'Australia',
    code: 'au',
    hints: {
      colors: 'Blue with Union Jack and stars',
      symbols: 'Union Jack and Southern Cross',
      pattern: 'Stars and Union Jack'
    },
    quickTip: 'Blue with Union Jack and Southern Cross stars'
  },
  {
    name: 'New Zealand',
    code: 'nz',
    hints: {
      colors: 'Blue with Union Jack and red stars',
      symbols: 'Union Jack and Southern Cross',
      pattern: 'Red stars and Union Jack'
    },
    quickTip: 'Like Australia but with red stars'
  },
  // Africa
  {
    name: 'Ghana',
    code: 'gh',
    hints: {
      colors: 'Red, gold, and green horizontal stripes',
      symbols: 'Black star',
      pattern: 'Three stripes with star'
    },
    quickTip: 'Red, gold, and green with black star'
  },
  {
    name: 'Kenya',
    code: 'ke',
    hints: {
      colors: 'Black, red, green, and white',
      symbols: 'Shield and spears',
      pattern: 'Horizontal stripes with shield'
    },
    quickTip: 'Black, red, green with Maasai shield'
  },
  {
    name: 'Nigeria',
    code: 'ng',
    hints: {
      colors: 'Green and white vertical stripes',
      symbols: 'None',
      pattern: 'Three vertical stripes'
    },
    quickTip: 'Green-white-green vertical stripes'
  },
  {
    name: 'South Africa',
    code: 'za',
    hints: {
      colors: 'Red, blue, green, yellow, black, white',
      symbols: 'Y-shaped band',
      pattern: 'Y-shape dividing colors'
    },
    quickTip: 'Y-shaped pattern with six colors'
  },
  // Middle East
  {
    name: 'Israel',
    code: 'il',
    hints: {
      colors: 'White and blue',
      symbols: 'Star of David',
      pattern: 'Two blue stripes with star'
    },
    quickTip: 'White with blue stripes and Star of David'
  },
  {
    name: 'Turkey',
    code: 'tr',
    hints: {
      colors: 'Red with white crescent and star',
      symbols: 'Crescent moon and star',
      pattern: 'Crescent and star on red'
    },
    quickTip: 'Red with white crescent moon and star'
  },
  {
    name: 'United Arab Emirates',
    code: 'ae',
    hints: {
      colors: 'Red, green, white, and black',
      symbols: 'None',
      pattern: 'Three horizontal stripes with vertical band'
    },
    quickTip: 'Red vertical band with three horizontal stripes'
  }
];

const getEncouragement = () => {
  const messages = ['Great job! 🎯', 'Perfect! ⭐', 'Excellent! 🏆', 'Amazing! 🌟'];
  return messages[Math.floor(Math.random() * messages.length)];
};

const FlagTrainer = () => {
  const [currentCountry, setCurrentCountry] = useState<Country | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [streak, setStreak] = useState(0);
  const [encouragement, setEncouragement] = useState('');
  const [options, setOptions] = useState<Country[]>([]);
  const [history, setHistory] = useState<Country[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [wrongAnswer, setWrongAnswer] = useState<string | null>(null);
  const [showCorrect, setShowCorrect] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [seenFlags, setSeenFlags] = useState<Set<string>>(new Set());

  useEffect(() => {
    selectNewCountry();
  }, []);

  const selectNewCountry = (addToHistory = true) => {
    let newCountry;
    do {
      newCountry = countries[Math.floor(Math.random() * countries.length)];
    } while (newCountry === currentCountry);
    
    // Get 4 random wrong answers
    const wrongOptions = countries
      .filter(c => c.name !== newCountry.name)
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);
    
    // Combine with correct answer and shuffle
    const allOptions = [...wrongOptions, newCountry]
      .sort(() => Math.random() - 0.5);
    
    setCurrentCountry(newCountry);
    setOptions(allOptions);
    setShowHint(false);
    setWrongAnswer(null);
    setShowCorrect(false);

    if (addToHistory) {
      setSeenFlags(prev => new Set(prev).add(newCountry.code));
      setHistory(prev => {
        const newHistory = [...prev.slice(0, historyIndex + 1), newCountry];
        setHistoryIndex(newHistory.length - 1);
        return newHistory;
      });
    }
  };

  const handleCorrectGuess = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    // Only increment streak if:
    // 1. We're at the latest point in history (not reviewing)
    // 2. This is a new flag we haven't seen before
    const isReviewing = historyIndex < history.length - 1;
    if (!isReviewing && currentCountry && !seenFlags.has(currentCountry.code)) {
      setStreak(prev => prev + 1);
      setEncouragement(getEncouragement());
    }
    
    // Wait a moment to show the correct answer highlight
    setTimeout(() => {
      selectNewCountry();
      setIsTransitioning(false);
    }, 500);
  };

  const handleIncorrectGuess = (selectedName: string) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setStreak(0);
    setEncouragement('');
    setWrongAnswer(selectedName);
    setShowCorrect(true);
    // Reset after 2 seconds
    setTimeout(() => {
      setWrongAnswer(null);
      setShowCorrect(false);
      selectNewCountry();
      setIsTransitioning(false);
    }, 2000);
  };

  const goBack = () => {
    if (historyIndex > 0 && !isTransitioning) {
      setIsTransitioning(true);
      const prevIndex = historyIndex - 1;
      const prevCountry = history[prevIndex];
      setHistoryIndex(prevIndex);
      
      // Get 4 random wrong answers
      const wrongOptions = countries
        .filter(c => c.name !== prevCountry.name)
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);
      
      // Combine with correct answer and shuffle
      const allOptions = [...wrongOptions, prevCountry]
        .sort(() => Math.random() - 0.5);
      
      setCurrentCountry(prevCountry);
      setOptions(allOptions);
      setShowHint(false);
      setEncouragement('');
      setWrongAnswer(null);
      setShowCorrect(false);
      setIsTransitioning(false);
    }
  };

  const goForward = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    if (historyIndex < history.length - 1) {
      // Go to next item in history
      const nextIndex = historyIndex + 1;
      const nextCountry = history[nextIndex];
      setHistoryIndex(nextIndex);
      
      // Get 4 random wrong answers
      const wrongOptions = countries
        .filter(c => c.name !== nextCountry.name)
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);
      
      // Combine with correct answer and shuffle
      const allOptions = [...wrongOptions, nextCountry]
        .sort(() => Math.random() - 0.5);
      
      setCurrentCountry(nextCountry);
      setOptions(allOptions);
      setShowHint(false);
      setEncouragement('');
      setWrongAnswer(null);
      setShowCorrect(false);
    } else {
      // Generate new country
      selectNewCountry();
    }
    setIsTransitioning(false);
  };

  if (!currentCountry) return null;

  return (
    <Box 
      sx={{ 
        width: '100%',
        maxWidth: '1200px',
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
      }}
    >
      {/* Header Section */}
      <Box 
        sx={{ 
          width: '100%',
          textAlign: 'center',
          mb: 2,
        }}
      >
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 700,
            background: 'linear-gradient(45deg, #58cc02 30%, #ffd900 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Flag Trainer
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={goBack}
            disabled={historyIndex <= 0 || isTransitioning}
            size="small"
            sx={{
              minWidth: '100px',
            }}
          >
            Back
          </Button>
          <Typography 
            variant="h6" 
            color="text.secondary"
            sx={{ 
              px: 2,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            Streak: {streak}
          </Typography>
          <Button
            variant="outlined"
            endIcon={<ArrowForwardIcon />}
            onClick={goForward}
            disabled={isTransitioning}
            size="small"
            sx={{
              minWidth: '100px',
            }}
          >
            Skip
          </Button>
        </Box>
        {encouragement && (
          <Typography 
            variant="h6" 
            color="primary"
            sx={{ 
              fontWeight: 700,
              animation: 'fadeIn 0.5s ease-in',
              '@keyframes fadeIn': {
                '0%': {
                  opacity: 0,
                  transform: 'translateY(-20px)',
                },
                '100%': {
                  opacity: 1,
                  transform: 'translateY(0)',
                },
              },
            }}
          >
            {encouragement}
          </Typography>
        )}
      </Box>

      {/* Main Content */}
      <Grid 
        container 
        spacing={{ xs: 2, md: 4 }}
        sx={{ 
          width: '100%',
          justifyContent: 'center',
        }}
      >
        {/* Flag Card */}
        <Grid item xs={12} md={8}>
          <Card 
            sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <CardContent 
              sx={{ 
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: { xs: 2, md: 3 },
                p: { xs: 2, md: 4 },
              }}
            >
              <Box 
                sx={{ 
                  width: '100%',
                  bgcolor: 'background.paper',
                  p: { xs: 2, md: 4 },
                  borderRadius: 2,
                  textAlign: 'center',
                  border: '1px solid',
                  borderColor: 'divider',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Box
                  component="img"
                  src={`https://flagcdn.com/w640/${currentCountry.code}.png`}
                  alt={`Flag of ${currentCountry.name}`}
                  sx={{
                    maxWidth: '100%',
                    height: 'auto',
                    maxHeight: { xs: '120px', md: '200px' },
                  }}
                />
              </Box>

              <Box 
                sx={{ 
                  display: 'flex',
                  gap: 2,
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}
              >
                <Tooltip title="Need a hint?">
                  <IconButton
                    onClick={() => setShowHint(!showHint)}
                    sx={{ 
                      color: 'warning.main',
                      bgcolor: (theme) => alpha(theme.palette.warning.main, 0.1),
                      '&:hover': {
                        bgcolor: (theme) => alpha(theme.palette.warning.main, 0.2),
                      },
                    }}
                  >
                    <LightbulbIcon />
                  </IconButton>
                </Tooltip>
              </Box>

              <Collapse in={showHint} sx={{ width: '100%' }}>
                <Paper 
                  sx={{ 
                    p: 3,
                    bgcolor: (theme) => alpha(theme.palette.warning.main, 0.1),
                  }}
                >
                  <Box 
                    sx={{ 
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 2,
                    }}
                  >
                    <Typography variant="h6" color="warning.main">
                      Hints
                    </Typography>
                    <IconButton 
                      size="small" 
                      onClick={() => setShowHint(false)}
                      sx={{ color: 'warning.main' }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>
                  <Typography paragraph>
                    <strong>Colors:</strong> {currentCountry.hints.colors}
                  </Typography>
                  <Typography paragraph>
                    <strong>Symbols:</strong> {currentCountry.hints.symbols}
                  </Typography>
                  <Typography>
                    <strong>Pattern:</strong> {currentCountry.hints.pattern}
                  </Typography>
                </Paper>
              </Collapse>
            </CardContent>
          </Card>
        </Grid>

        {/* Buttons Grid */}
        <Grid item xs={12} md={8}>
          <Grid 
            container 
            spacing={2} 
            sx={{ 
              justifyContent: 'center',
              width: '100%',
            }}
          >
            {options.map((country) => (
              <Grid item xs={12} sm={6} md={4} key={country.name}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => {
                    if (country.name === currentCountry?.name) {
                      handleCorrectGuess();
                    } else {
                      handleIncorrectGuess(country.name);
                    }
                  }}
                  disabled={isTransitioning}
                  sx={{
                    py: 2,
                    bgcolor: wrongAnswer === country.name 
                      ? 'error.main' 
                      : (showCorrect && country.name === currentCountry?.name)
                        ? 'success.main'
                        : 'background.paper',
                    color: (wrongAnswer === country.name || (showCorrect && country.name === currentCountry?.name))
                      ? 'white'
                      : 'text.primary',
                    '&:hover': {
                      bgcolor: wrongAnswer === country.name 
                        ? 'error.dark'
                        : (showCorrect && country.name === currentCountry?.name)
                          ? 'success.dark'
                          : 'primary.main',
                      color: 'white',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  {country.name}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FlagTrainer;
