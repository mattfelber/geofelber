export interface Language {
  name: string;
  sample: string;
  hints: {
    writing: string;
    unique: string;
    examples: string;
    regions: string;
  };
  options?: string[];
}

export const languages: Language[] = [
  // East Asian Languages
  {
    name: "Chinese",
    sample: "你好！我是一个学生。",
    hints: {
      writing: "Characters are built from radicals (components). Unlike Japanese kanji, Chinese characters are used exclusively.",
      unique: "Four tones change word meaning. Every syllable has a tone. No alphabet or phonetic system in regular writing.",
      examples: "妈 (high tone) = mother, 马 (rising tone) = horse, 骂 (falling tone) = scold, 麻 (falling-rising) = hemp",
      regions: "Mainland China, Taiwan, Singapore"
    },
    options: ["中文", "汉语", "普通话", "国语"]
  },
  {
    name: "Japanese",
    sample: "こんにちは！今日は良い天気ですね。",
    hints: {
      writing: "Mix of hiragana (ひらがな), katakana (カタカナ), and kanji (漢字). Each has specific uses.",
      unique: "No spaces between words. Particles mark grammar. Complex honorific system.",
      examples: "Compare kanji readings: 山 (やま/サン), 川 (かわ/セン), 本 (ほん/ホン)",
      regions: "Japan"
    },
    options: ["日本語", "国語", "和語", "大和言葉"]
  },
  {
    name: "Korean",
    sample: "안녕하세요! 오늘 날씨가 좋네요.",
    hints: {
      writing: "Unlike Chinese/Japanese, letters are grouped into syllable blocks. Each block reads left-to-right, top-to-bottom.",
      unique: "Subject and object markers. Honorifics based on social status. Many Chinese loanwords.",
      examples: "가 (ga) is ㄱ+ㅏ, 낭 (nang) is ㄴ+ㅏ+ㅇ stacked together",
      regions: "South Korea, North Korea"
    },
    options: ["한국어", "조선말", "한글", "국어"]
  },
  {
    name: "Cantonese",
    sample: "早晨！今日天氣好靚。",
    hints: {
      writing: "Uses traditional Chinese characters. Special characters not in Mandarin: 嘅, 咗, 喺.",
      unique: "Nine tones (vs Mandarin's 4). Many characters unique to Cantonese like 冇 (have not) and 係 (be).",
      examples: "Compare with Mandarin: 我哋/我们 (we), 唔係/不是 (not), 而家/现在 (now)",
      regions: "Hong Kong, Macau"
    },
    options: ["廣東話", "粵語", "香港話", "廣州話"]
  },
  {
    name: "Kazakh",
    sample: "Сәлем! Қалыңыз қалай?",
    hints: {
      writing: "Uses Cyrillic with nine additional letters: ә, ғ, қ, ң, ө, ұ, ү, һ, і. Some now use Latin script.",
      unique: "Vowel harmony more strict than other Turkic languages. No gender. Word order: Subject-Object-Verb.",
      examples: "Compare with Russian: қала/город (city), кітап/книга (book), мектеп/школа (school)",
      regions: "Kazakhstan"
    },
    options: ["Қазақ тілі", "Қазақша", "Қазақ", "Қазақ тілінде"]
  },
  {
    name: "Kyrgyz",
    sample: "Салам! Жакшы күн!",
    hints: {
      writing: "Uses Cyrillic with additional letters: ң, ө, ү, җ. Similar to Kazakh but with җ instead of ж.",
      unique: "More Persian/Arabic loanwords than Kazakh. Distinctive use of -лар/-лер for plurals.",
      examples: "Compare with Kazakh: жок/жоқ (no), келем/келемін (I come), бар/бар (exists)",
      regions: "Kyrgyzstan"
    },
    options: ["Кыргыз тили", "Кыргызча", "Кыргыз", "Кыргыз тилинде"]
  },
  {
    name: "Maori",
    sample: "Kia ora! Ka pai te rangi nei.",
    hints: {
      writing: "Uses Latin alphabet with macrons (ā, ē, ī, ō, ū). Only 15 letters: 5 vowels (+ long), 10 consonants.",
      unique: "No s, f, j, c sounds. Uses ng and wh digraphs. Every syllable must end in a vowel.",
      examples: "Compare with Hawaiian: wahine/wahine (woman), kai/kai (sea) but different: tangata/kanaka (person)",
      regions: "New Zealand"
    },
    options: ["Te Reo Māori", "Te Reo", "Māori", "Te Reo Rangatira"]
  },
  {
    name: "Chamorro",
    sample: "Håfa adai! Mamaolek ha' hao?",
    hints: {
      writing: "Uses Latin with å. Glottal stop marked with apostrophe. Spanish influence in spelling.",
      unique: "Complex system of pronouns based on person and number. Uses infix -um- for actor focus.",
      examples: "Compare with Spanish loans: sinahguan/guardado (kept), ya/ya (already), but native: håga' (daughter)",
      regions: "Guam"
    },
    options: ["Fino' Chamoru", "Chamoru", "Chamorro", "Lenguåhi Chamoru"]
  },
  
  // Southeast Asian Languages
  {
    name: "Thai",
    sample: "สวัสดีค่ะ สบายดีไหมคะ",
    hints: {
      writing: "Curvy script that hangs from a line, with vowel marks above and below.",
      unique: "No spaces between words, uses tone marks.",
      examples: "ก, ข, ค are common consonants",
      regions: "Thailand"
    }
  },
  {
    name: "Vietnamese",
    sample: "Xin chào! Tôi ăn phở và cơm.",
    hints: {
      writing: "Uses Latin alphabet with many diacritical marks.",
      unique: "Extensive use of tone marks above and below letters.",
      examples: "â, ă, ê, ô, ơ, ư are modified vowels",
      regions: "Vietnam"
    }
  },
  {
    name: "Khmer",
    sample: "ស្រុកខ្មែរស្រស់បំព្រង",
    hints: {
      writing: "Round, curvy script with complex consonant clusters.",
      unique: "Letters have subscript forms that stack below.",
      examples: "ក, ខ, គ are basic consonants",
      regions: "Cambodia"
    }
  },
  {
    name: "Lao",
    sample: "ສະບາຢດີຂອບໃຈຫຼາຍໆ",
    hints: {
      writing: "Similar to Thai but rounder, with fewer loops.",
      unique: "No spaces between words, simpler than Thai.",
      examples: "ກ, ຂ, ຄ are common consonants",
      regions: "Laos"
    }
  },
  {
    name: "Burmese",
    sample: "မင်္ဂလာပါ ခင်ဗျား။",
    hints: {
      writing: "Circular letters with many stacked components.",
      unique: "Uses circular and semi-circular shapes extensively.",
      examples: "က, ခ, ဂ are basic consonants",
      regions: "Myanmar"
    }
  },

  // South Asian Languages
  {
    name: "Bengali",
    sample: "নমস্কার! কেমন আছেন?",
    hints: {
      writing: "Curvy script with a distinctive horizontal line on top.",
      unique: "Letters hang from a top line called matra.",
      examples: "ক, খ, গ are common consonants",
      regions: "Bangladesh, West Bengal (India)"
    }
  },
  {
    name: "Hindi",
    sample: "नमस्ते! आप कैसे हैं?",
    hints: {
      writing: "Devanagari script with a horizontal line on top.",
      unique: "Letters hang from top line, connected strokes.",
      examples: "क, ख, ग are basic consonants",
      regions: "North India"
    }
  },
  {
    name: "Tamil",
    sample: "வணக்கம்! எப்படி இருக்கிறீர்கள்?",
    hints: {
      writing: "Round shapes and curves, very few straight lines.",
      unique: "Characters often look like numbers or symbols.",
      examples: "க, ச, ட are common consonants",
      regions: "Tamil Nadu (India), Sri Lanka"
    }
  },
  {
    name: "Dzongkha",
    sample: "ཀུན་གསལ། ག་དེ་སྦེ་ཡོད?",
    hints: {
      writing: "Uses Tibetan script. Letters connect at top line. Many stacked components.",
      unique: "Only national language using Tibetan script. Uses more final consonants than Tibetan.",
      examples: "Compare with Tibetan: འབྲུག་ (Bhutan), བཀྲ་ཤིས་ (greeting), གཞུང་ (government)",
      regions: "Bhutan"
    },
    options: ["རྫོང་ཁ་", "འབྲུག་གི་སྐད་", "རྒྱལ་ཡོངས་སྐད་ཡིག་", "འབྲུག་པའི་སྐད་"]
  },
  {
    name: "Indonesian",
    sample: "Selamat pagi! Apa kabar?",
    hints: {
      writing: "Uses standard Latin alphabet. No special characters except occasional é. Very regular spelling.",
      unique: "Many prefixes and suffixes (me-, ber-, -kan, -i). Reduplication for plurals: orang-orang (people).",
      examples: "Compare with Malay: saya/aku (I), sekarang/kini (now), bilang/cakap (say)",
      regions: "Indonesia"
    },
    options: ["Bahasa Indonesia", "Indonesian", "Bahasa", "Bahasa Nasional"]
  },
  {
    name: "Malay",
    sample: "Selamat pagi! Apa khabar?",
    hints: {
      writing: "Uses standard Latin alphabet. Some Arabic-derived words use é and '. More conservative spelling than Indonesian.",
      unique: "Four registers: royal, formal, informal, casual. More Arabic loanwords than Indonesian.",
      examples: "Compare with Indonesian: awak/anda (you), bila/kapan (when), tengok/lihat (see)",
      regions: "Malaysia"
    },
    options: ["Bahasa Melayu", "Melayu", "Bahasa Malaysia", "Bahasa Rasmi"]
  },
  {
    name: "Sinhala",
    sample: "ආයුබෝවන්! සුබ උදෑසනක්.",
    hints: {
      writing: "Round letters with loops and curves. Vowels can appear above, below, or beside consonants.",
      unique: "Special symbols for /ŋ/ and prenasalized stops. Two sets of vowel signs for short/long sounds.",
      examples: "Compare with other Indic scripts: ක /ka/, ඛ /kha/, ග /ga/ vs Devanagari क, ख, ग",
      regions: "Sri Lanka"
    },
    options: ["සිංහල", "සිංහල භාෂාව", "හෙළ බස", "ලංකා භාෂාව"]
  },
  {
    name: "Tagalog",
    sample: "Magandang umaga! Kumusta ka?",
    hints: {
      writing: "Uses Latin alphabet with ñ and ng. Distinctive use of mga for plurals.",
      unique: "Complex verb focus system. Four types of focus marked by affixes: mag-, -um-, -in, i-.",
      examples: "Compare Spanish loans: eskwela/escuela (school), silya/silla (chair), but native: araw (day)",
      regions: "Philippines"
    },
    options: ["Filipino", "Tagalog", "Wikang Filipino", "Wikang Pambansa"]
  },
  {
    name: "Urdu",
    sample: "السلام علیکم! آپ کیسے ہیں؟",
    hints: {
      writing: "Uses Persian-Arabic script written right to left. Distinctive چ پ ٹ ڈ ژ letters not in Arabic.",
      unique: "Same language as Hindi but different script. More Persian/Arabic vocabulary than Hindi.",
      examples: "Compare with Hindi: kitāb/किताब (book), mushkil/मुश्किल (difficult), dil/दिल (heart)",
      regions: "Pakistan"
    },
    options: ["اردو", "اردو زبان", "قومی زبان", "معیاری اردو"]
  },

  // European Languages
  {
    name: "Greek",
    sample: "Καλημέρα! Πώς είσαι;",
    hints: {
      writing: "Greek alphabet with distinctive characters.",
      unique: "Mix of familiar and unfamiliar letters to English readers.",
      examples: "α, β, γ are basic letters",
      regions: "Greece"
    }
  },
  {
    name: "Russian",
    sample: "Здравствуйте! Как дела?",
    hints: {
      writing: "Cyrillic alphabet with some letters similar to Latin.",
      unique: "Mix of familiar and unfamiliar letters to English readers.",
      examples: "а, б, в are basic letters",
      regions: "Russia"
    }
  },
  {
    name: "Ukrainian",
    sample: "Доброго дня! Як справи?",
    hints: {
      writing: "Cyrillic alphabet with unique Ukrainian letters.",
      unique: "Uses і instead of и, and has ї and є.",
      examples: "і, ї, є are distinctive Ukrainian letters",
      regions: "Ukraine"
    }
  },
  {
    name: "Bulgarian",
    sample: "Добър ден! Как сте?",
    hints: {
      writing: "Cyrillic alphabet similar to Russian.",
      unique: "Uses ъ more frequently than other Slavic languages.",
      examples: "б, в, г are common letters",
      regions: "Bulgaria"
    }
  },
  {
    name: "Serbian",
    sample: "Добар дан! Како сте?",
    hints: {
      writing: "Uses both Cyrillic and Latin alphabets.",
      unique: "Has letters љ, њ, џ in Cyrillic.",
      examples: "ђ, ћ, џ are unique Serbian letters",
      regions: "Serbia"
    }
  },
  {
    name: "Mongolian",
    sample: "Өнөөдөр үзэсгэлэнтэй өдөр.",
    hints: {
      writing: "Uses Cyrillic alphabet with additional letters.",
      unique: "Has ө and ү letters not found in Russian.",
      examples: "ө, ү, н are common letters",
      regions: "Mongolia"
    }
  },
  {
    name: "Georgian",
    sample: "გამარჯობა! როგორ ხარ?",
    hints: {
      writing: "Unique curved script unlike any other.",
      unique: "Rounded letters with no capital letters.",
      examples: "ა, ბ, გ are basic letters",
      regions: "Georgia"
    }
  },
  {
    name: "Armenian",
    sample: "Բարև ձեզ! Ինչպե՞ս եք:",
    hints: {
      writing: "Unique alphabet with distinctive curves and angles.",
      unique: "Letters have numerical values, used since 405 AD.",
      examples: "ա, բ, գ are basic letters",
      regions: "Armenia"
    }
  },
  {
    name: "Hungarian",
    sample: "Szép napot kívánok! Hogy vagy?",
    hints: {
      writing: "Only language using double acute accent (˝). Compare ű with German ü or Slovak ŭ.",
      unique: "Vowel harmony: suffixes change to match vowels (ház+ban but kert+ben). Stress always on first syllable.",
      examples: "Long consonants change meaning: kor (age) vs. korr (corrode), tol (push) vs. toll (pen)",
      regions: "Hungary"
    },
    options: ["Magyar", "Magyar nyelv", "Magyarország nyelve", "A magyar"]
  },
  {
    name: "Romanian",
    sample: "Bună ziua! Ce mai faci?",
    hints: {
      writing: "Only Romance language using ă (schwa). Distinctive comma-below letters ș and ț (different from cedilla ş, ţ).",
      unique: "Preserved Latin cases unlike other Romance languages. Definite article added at end: lup → lupul (the wolf).",
      examples: "față (face) vs. fraţe (brother) - note the different cedilla types",
      regions: "Romania"
    },
    options: ["Română", "Limba română", "Românește", "Graiul românesc"]
  },
  {
    name: "Croatian",
    sample: "Dobar dan! Kako si?",
    hints: {
      writing: "Unlike Serbian which uses both scripts, Croatian uses only Latin. Has both ć and č (Serbian has only ć).",
      unique: "Uses 'ije' where Serbian uses 'e': mlijeko vs. mleko (milk). No 'Eastern' letters like ђ or џ.",
      examples: "Compare with Serbian: svijet/svet (world), bijel/beo (white)",
      regions: "Croatia"
    },
    options: ["Hrvatski", "Hrvatski jezik", "Hrvatska riječ", "Hrvatsko pismo"]
  },
  {
    name: "Slovenian",
    sample: "Dober dan! Kako si?",
    hints: {
      writing: "Uses only č, š, ž - fewer special letters than Croatian (no ć) or Serbian (no đ).",
      unique: "Only Slavic language that still uses dual number: ena hiša (one house), dve hiši (two houses), tri hiše (three houses).",
      examples: "oče (father) vs. Croatian/Serbian otac, človek vs. Czech člověk",
      regions: "Slovenia"
    },
    options: ["Slovenščina", "Slovenski jezik", "Slovenska beseda", "Slovensko"]
  },
  {
    name: "Danish",
    sample: "Jeg kan godt lide at spise rød grød med fløde.",
    hints: {
      writing: "Uses æ, ø, å. Letters 'w', 'q', 'z' only in loan words. Silent 'd' in many words.",
      unique: "Distinctive 'soft d' (like 'th' in 'this'). Glottal stop (stød) changes meaning: hun (she) vs. hund (dog).",
      examples: "Compare with Norwegian: tid/tid (time), mad/mat (food), gade/gate (street)",
      regions: "Denmark"
    },
    options: ["Dansk", "Danske", "Det danske sprog", "Den danske tunge"]
  },
  {
    name: "Faroese",
    sample: "Góðan dag! Hvussu hevur tú tað?",
    hints: {
      writing: "Uses á, æ, ð, í, ó, ø, ú, ý. Letter 'w' never used. Preserves 'ð' like Icelandic.",
      unique: "Mix of Icelandic and Danish features. Uses 'ð' but also Danish 'ø'. Many diphthongs like 'oy' in Føroy.",
      examples: "Compare with Icelandic: dagur/dagur (day), maður/maður (man), but føroyskt/færeyska (Faroese)",
      regions: "Faroe Islands"
    },
    options: ["Føroyskt", "Føroyska", "Føroyskt mál", "Føroya mál"]
  },
  {
    name: "Finnish",
    sample: "Hyvää päivää! Mitä kuuluu?",
    hints: {
      writing: "Uses ä, ö. Double letters very common (both vowels and consonants). No b, c, f, q, w, x, z in native words.",
      unique: "Not related to other Nordic languages. Vowel harmony: back (a, o, u) vs front (ä, ö, y) vowels never mix.",
      examples: "Double letters change meaning: tuli (fire) vs. tuuli (wind), kuka (who) vs. kukka (flower)",
      regions: "Finland"
    },
    options: ["Suomi", "Suomen kieli", "Suomea", "Suomalainen"]
  },
  {
    name: "Greenlandic",
    sample: "Aluu! Qanoq ippit?",
    hints: {
      writing: "Uses only a, e, i, o, u, p, t, k, q, v, s, g, r, l, m, n, ng. No c, d, f, h, w, x, y, z.",
      unique: "Very long words due to agglutination. Double 'll' common. Letter 'q' represents uvular k sound.",
      examples: "Ilulissat (icebergs), Kalaallit Nunaat (Greenland), inuugujaq (goodbye)",
      regions: "Greenland"
    },
    options: ["Kalaallisut", "Kalaallit oqaasii", "Grønlandsk", "Tunumiisut"]
  },
  {
    name: "Icelandic",
    sample: "Góðan dag! Hvað segir þú?",
    hints: {
      writing: "Uses á, æ, ð, é, í, ó, ú, ý, þ. Only Nordic language still using þ (thorn) and ð (eth).",
      unique: "Most archaic Nordic language. New words made from old roots: tölva (computer) = tala (number) + völva (prophetess).",
      examples: "Compare with Danish: þrír/tre (three), höfuð/hoved (head), maður/mand (man)",
      regions: "Iceland"
    },
    options: ["Íslenska", "Íslenskt mál", "Islenska", "Íslensk tunga"]
  },
  {
    name: "Norwegian",
    sample: "God dag! Hvordan har du det?",
    hints: {
      writing: "Uses æ, ø, å like Danish. Two written forms: Bokmål (like Danish) and Nynorsk (more traditional).",
      unique: "Same letters as Danish but pronounced as written. Has pitch accent: bønder (farmers) vs. bønner (beans).",
      examples: "Bokmål vs Nynorsk: jeg/eg (I), ikke/ikkje (not), nå/no (now)",
      regions: "Norway"
    },
    options: ["Norsk", "Bokmål", "Nynorsk", "Det norske språk"]
  },
  {
    name: "Swedish",
    sample: "Hej! Hur mår du?",
    hints: {
      writing: "Uses å, ä, ö (not æ, ø like Danish/Norwegian). Letter combinations 'sj', 'sk', 'tj' make unique sounds.",
      unique: "Pitch accent like Norwegian. 'Sj' sound (like 'hu' in 'huge') is distinctive: sjö (lake), skjorta (shirt).",
      examples: "Compare with Danish/Norwegian: sjuk/syg/syk (sick), kärlek/kærlighed/kjærlighet (love)",
      regions: "Sweden"
    },
    options: ["Svenska", "Rikssvenska", "Svenskt språk", "Svenska språket"]
  },
  {
    name: "Spanish",
    sample: "¡Buenos días! ¿Cómo estás?",
    hints: {
      writing: "Uses ñ, á, é, í, ó, ú, ü. Opens questions/exclamations with inverted marks (¿¡). No k or w in native words.",
      unique: "Distinguishable by ñ and ¿¡. Latin American variants use 'ustedes' instead of 'vosotros', some use 'vos' for 'you'.",
      examples: "Compare dialects: carro/coche (car), computadora/ordenador (computer), aguacate/palta (avocado)",
      regions: "Spain"
    },
    options: ["Español", "Castellano", "Lengua española", "Idioma español"]
  },
  {
    name: "Portuguese",
    sample: "Bom dia! Como vai você?",
    hints: {
      writing: "Uses ã, õ, á, â, ê, í, ó, ô, ú, ç. No ñ (uses nh instead). Unique to Portuguese: ã, õ.",
      unique: "Many nasal sounds (ã, õ, -em, -im). Brazilian uses more gerunds, European more infinitives.",
      examples: "BR vs PT: trem/comboio (train), mad/mat (food), gade/gate (street)",
      regions: "Portugal"
    },
    options: ["Português", "Língua portuguesa", "Brasileiro", "Português do Brasil"]
  },
  {
    name: "Papiamento",
    sample: "Bon dia! Con ta bai?",
    hints: {
      writing: "Mix of Portuguese/Spanish with Dutch influence. Uses ù, è, ò. No complex Spanish characters like ñ.",
      unique: "Verbs don't conjugate: 'ta' marks present, 'a' past, 'lo' future. Many words end in -u where Spanish has -o.",
      examples: "Compare with Spanish: bon dia/buenos días (good day), danki/gracias (thanks), kas/casa (house)",
      regions: "Aruba, Curaçao, Sint Maarten"
    },
    options: ["Papiamentu", "Papiamento", "Lenga kreol", "Idioma kreol"]
  },

  // African Languages
  {
    name: "Setswana",
    sample: "Dumela! Ke a go rata.",
    hints: {
      writing: "Uses Latin alphabet. No special characters but uses combinations like 'tl', 'kg', 'ng'.",
      unique: "Noun classes shown by prefixes. Seven different ways to say 'it' based on noun class.",
      examples: "Compare with Zulu: motho/umuntu (person), pula/imvula (rain), ntlo/indlu (house)",
      regions: "Botswana"
    },
    options: ["Setswana", "Tswana", "Botswana", "Secoana"]
  },
  {
    name: "Siswati",
    sample: "Sawubona! Unjani?",
    hints: {
      writing: "Latin script. Uses combinations like 'dz', 'hl', 'mf'. No special characters.",
      unique: "15 noun classes. Click consonants borrowed from Zulu. Uses 'ku-' prefix for infinitives.",
      examples: "Compare with Xhosa: umfati/umfazi (woman), live/ilanga (sun), umntfwana/umntwana (child)",
      regions: "Eswatini"
    },
    options: ["SiSwati", "Swati", "Swazi", "LuSwati"]
  },
  {
    name: "Kinyarwanda",
    sample: "Muraho! Amakuru yawe?",
    hints: {
      writing: "Latin alphabet. No special characters but uses 'ny', 'rw', 'cy' combinations.",
      unique: "Tones not marked in writing. Complex verb system with 17 tenses. No grammatical gender.",
      examples: "Compare with Kirundi: amazi/amazi (water), umuntu/umuntu (person), but different: ejo/ejo hazaza (tomorrow)",
      regions: "Rwanda"
    },
    options: ["Ikinyarwanda", "Kinyarwanda", "Urunyarwanda", "Rwanda"]
  },
  {
    name: "Malagasy",
    sample: "Salama! Manao ahoana ny fahasalamanao?",
    hints: {
      writing: "Latin script. Uses 'ao' for /u/ sound. No 'c', 'q', 'w', 'x'.",
      unique: "Word order: Verb-Object-Subject. Many words of Indonesian origin. Complex passive voice system.",
      examples: "Compare with Indonesian: tanana/tangan (hand), vato/batu (stone), voalavo/tikus (rat)",
      regions: "Madagascar"
    },
    options: ["Malagasy", "Teny Malagasy", "Gasy", "Malgache"]
  },
  {
    name: "Yoruba",
    sample: "Ẹ kú àárọ̀! Báwo ni ọjọ́ rẹ?",
    hints: {
      writing: "Latin with diacritics. Three tone marks (́ ̀ ̄) and underdots (ẹ ọ ṣ).",
      unique: "Three level tones plus rising/falling. Extensive use of nasalized vowels.",
      examples: "Compare with Igbo: ọkọ̀/di (husband), ilé/ụlọ (house), ọmọ/nwa (child)",
      regions: "Nigeria"
    },
    options: ["Yorùbá", "Èdè Yorùbá", "Yooba", "Ede Yoruba"]
  },
  // Middle Eastern Languages
  {
    name: "Hebrew",
    sample: "!שלום! מה שלומך",
    hints: {
      writing: "Right-to-left script. Consonants only, vowels as optional dots/lines. Final forms of some letters.",
      unique: "Three-letter roots. Gender in verbs. No capital letters. Vowels usually omitted in writing.",
      examples: "Compare with Arabic roots: שלום/سلام (peace), ספר/كتاب (book), ילד/ولد (boy)",
      regions: "Israel"
    },
    options: ["עברית", "Ivrit", "Hebrew", "לשון הקודש"]
  },
  {
    name: "Jordanian Arabic",
    sample: "!مرحبا! كيف حالك اليوم",
    hints: {
      writing: "Arabic script. Uses all Arabic letters plus distinctive local pronunciations.",
      unique: "G sound (ق) pronounced as /g/ not /q/. Distinctive 'ch' sound in some words.",
      examples: "Compare with MSA: قال/جال (he said), قلب/جلب (heart), but same: كتاب (book)",
      regions: "Jordan"
    },
    options: ["اللهجة الأردنية", "الأردني", "عربي أردني", "لهجة أردنية"]
  },
  {
    name: "Turkish",
    sample: "Merhaba! Bugün hava çok güzel.",
    hints: {
      writing: "Latin with special letters: ç, ğ, ı, ö, ş, ü. No q, w, x.",
      unique: "Vowel harmony. Agglutinative (many suffixes). No grammatical gender.",
      examples: "Compare with Azerbaijani: ev/ev (house), gelmek/gəlmək (to come), but different: ben/mən (I)",
      regions: "Turkey"
    },
    options: ["Türkçe", "Türk Dili", "Turkish", "Türkiye Türkçesi"]
  }
];
