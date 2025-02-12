export interface Language {
  name: string;
  sample: string;
  hints: {
    writing: string;
    unique: string;
    examples: string;
  };
}

export const languages: Language[] = [
  // East Asian Languages
  {
    name: "Chinese",
    sample: "你好，欢迎来到中国",
    hints: {
      writing: "Uses Chinese characters (hanzi). Characters are square-shaped and complex.",
      unique: "Tonal language with no alphabet, each character represents a morpheme.",
      examples: "Characters like 中, 国, 人 are common"
    }
  },
  {
    name: "Japanese",
    sample: "こんにちは、日本へようこそ",
    hints: {
      writing: "Mix of hiragana (rounded characters), katakana (angular characters), and kanji (Chinese characters).",
      unique: "Uses three writing systems together.",
      examples: "ひらがな (hiragana), カタカナ (katakana), 漢字 (kanji)"
    }
  },
  {
    name: "Korean",
    sample: "안녕하세요, 한국에 오신 것을 환영합니다",
    hints: {
      writing: "Uses Hangul alphabet with circular and straight lines.",
      unique: "Letters are grouped into syllable blocks.",
      examples: "ㄱ, ㄴ, ㄷ are basic consonants"
    }
  },
  
  // Southeast Asian Languages
  {
    name: "Thai",
    sample: "สวัสดี ยินดีต้อนรับสู่ประเทศไทย",
    hints: {
      writing: "Curvy script that hangs from a line, with vowel marks above and below.",
      unique: "No spaces between words, uses tone marks.",
      examples: "ก, ข, ค are common consonants"
    }
  },
  {
    name: "Vietnamese",
    sample: "Xin chào, chào mừng đến Việt Nam",
    hints: {
      writing: "Uses Latin alphabet with many diacritical marks.",
      unique: "Extensive use of tone marks above and below letters.",
      examples: "â, ă, ê, ô, ơ, ư are modified vowels"
    }
  },
  {
    name: "Khmer",
    sample: "សួស្តី សូមស្វាគមន៍មកកាន់ប្រទេសកម្ពុជា",
    hints: {
      writing: "Round, curvy script with complex consonant clusters.",
      unique: "Letters have subscript forms that stack below.",
      examples: "ក, ខ, គ are basic consonants"
    }
  },
  {
    name: "Lao",
    sample: "ສະບາຍດີ, ຍິນດີຕ້ອນຮັບສູ່ປະເທດລາວ",
    hints: {
      writing: "Similar to Thai but rounder, with fewer loops.",
      unique: "No spaces between words, simpler than Thai.",
      examples: "ກ, ຂ, ຄ are common consonants"
    }
  },
  {
    name: "Burmese",
    sample: "မင်္ဂလာပါ၊ မြန်မာနိုင်ငံကို ကြိုဆိုပါတယ်",
    hints: {
      writing: "Circular letters with many stacked components.",
      unique: "Uses circular and semi-circular shapes extensively.",
      examples: "က, ခ, ဂ are basic consonants"
    }
  },

  // South Asian Languages
  {
    name: "Bengali",
    sample: "স্বাগতম, বাংলাদেশে আপনাকে স্বাগত",
    hints: {
      writing: "Curvy script with a distinctive horizontal line on top.",
      unique: "Letters hang from a top line called matra.",
      examples: "ক, খ, গ are common consonants"
    }
  },
  {
    name: "Hindi",
    sample: "नमस्ते, भारत में आपका स्वागत है",
    hints: {
      writing: "Devanagari script with a horizontal line on top.",
      unique: "Letters hang from top line, connected strokes.",
      examples: "क, ख, ग are basic consonants"
    }
  },
  {
    name: "Tamil",
    sample: "வணக்கம், இந்தியாவிற்கு வரவேற்கிறோம்",
    hints: {
      writing: "Round shapes and curves, very few straight lines.",
      unique: "Characters often look like numbers or symbols.",
      examples: "க, ச, ட are common consonants"
    }
  },

  // European Languages
  {
    name: "Greek",
    sample: "Καλώς ήρθατε στην Ελλάδα",
    hints: {
      writing: "Greek alphabet with distinctive characters.",
      unique: "Mix of familiar and unfamiliar letters to English readers.",
      examples: "α, β, γ are basic letters"
    }
  },
  {
    name: "Russian",
    sample: "Добро пожаловать в Россию",
    hints: {
      writing: "Cyrillic alphabet with some letters similar to Latin.",
      unique: "Mix of familiar and unfamiliar letters to English readers.",
      examples: "а, б, в are basic letters"
    }
  },
  {
    name: "Ukrainian",
    sample: "Ласкаво просимо до України",
    hints: {
      writing: "Cyrillic alphabet with unique Ukrainian letters.",
      unique: "Uses і instead of и, and has ї and є.",
      examples: "і, ї, є are distinctive Ukrainian letters"
    }
  },
  {
    name: "Bulgarian",
    sample: "Добре дошли в България",
    hints: {
      writing: "Cyrillic alphabet similar to Russian.",
      unique: "Uses ъ more frequently than other Slavic languages.",
      examples: "б, в, г are common letters"
    }
  },
  {
    name: "Serbian",
    sample: "Добродошли у Србију",
    hints: {
      writing: "Uses both Cyrillic and Latin alphabets.",
      unique: "Has letters љ, њ, џ in Cyrillic.",
      examples: "ђ, ћ, џ are unique Serbian letters"
    }
  },
  {
    name: "Mongolian",
    sample: "Монгол улсад тавтай морилно уу",
    hints: {
      writing: "Uses Cyrillic alphabet with additional letters.",
      unique: "Has ө and ү letters not found in Russian.",
      examples: "ө, ү, н are common letters"
    }
  },
  {
    name: "Georgian",
    sample: "კეთილი იყოს თქვენი მობრძანება საქართველოში",
    hints: {
      writing: "Unique curved script unlike any other.",
      unique: "Rounded letters with no capital letters.",
      examples: "ა, ბ, გ are basic letters"
    }
  },
  {
    name: "Armenian",
    sample: "Բարի գալուստ Հայաստան",
    hints: {
      writing: "Unique alphabet with distinctive curves and angles.",
      unique: "Letters have numerical values, used since 405 AD.",
      examples: "ա, բ, գ are basic letters"
    }
  }
];
