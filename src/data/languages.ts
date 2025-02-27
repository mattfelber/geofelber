export interface Language {
  name: string;
  code: string;
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
    code: "zh",
    sample: "我昨天去买东西了。店里的服务员说这件衣服打八折。我觉得很便宜就买下来了。",
    hints: {
      writing: "Characters are built from radicals (components). Unlike Japanese kanji, Chinese characters are used exclusively",
      unique: "Four tones change word meaning Every syllable has a tone No spaces between words No conjugations or plural forms",
      examples: "打八折 (dǎ bā zhé) = 20% off shows number+measure word pattern 衣服 (yīfu) shows compound word formation",
      regions: "Mainland China, Taiwan, Singapore"
    },
    options: ["中文", "汉语", "普通话", "国语"]
  },
  {
    name: "Japanese",
    code: "ja",
    sample: "私は新しい漢字を覚えながら、日本語の勉強を頑張っています。来週の試験に向けて準備をしています。",
    hints: {
      writing: "Mix of hiragana (ひらがな), katakana (カタカナ), and kanji (漢字) Each has specific uses",
      unique: "Particles は が を で mark grammar roles Verbs change form but stay at end Complex honorific system",
      examples: "勉強を頑張っています shows particle を + verb conjugation + います (present continuous)",
      regions: "Japan"
    },
    options: ["日本語", "国語", "和語", "大和言葉"]
  },
  {
    name: "Korean",
    code: "ko",
    sample: "제가 한국어를 배우고 있는데 발음이 조금 어려워요. 특히 받침이 있는 단어들이 어렵습니다.",
    hints: {
      writing: "Letters grouped into syllable blocks Each block reads left-to-right top-to-bottom",
      unique: "Subject markers 가/이 object markers 를/을 Many honorific levels Extensive sound change rules",
      examples: "한국어를 shows topic marker 를 받침 shows syllable-final consonants",
      regions: "South Korea, North Korea"
    },
    options: ["한국어", "조선말", "한글", "국어"]
  },
  {
    name: "Cantonese",
    code: "yue",
    sample: "今日我去街市買嘢食。個售貨員話呢件衫有八折。我覺得好平就買咗啦。",
    hints: {
      writing: "Uses traditional Chinese characters Special characters not in Mandarin: 嘅 咗 喺",
      unique: "Nine tones (vs Mandarin's 4) Many characters unique to Cantonese like 冇 (have not) and 係 (be)",
      examples: "買嘢 shows Cantonese-specific vocabulary 咗 shows past tense marker",
      regions: "Hong Kong, Macau"
    },
    options: ["廣東話", "粵語", "香港話", "廣州話"]
  },
  {
    name: "Kazakh",
    code: "kk",
    sample: "Мен қазақ тілін үйреніп жатырмын. Дауысты дыбыстардың үндестігі өте қызық.",
    hints: {
      writing: "Uses Cyrillic with nine additional letters: ә ғ қ ң ө ұ ү һ і Some now use Latin script",
      unique: "Vowel harmony more strict than other Turkic languages No gender Word order: Subject-Object-Verb",
      examples: "үйреніп shows vowel harmony жатырмын shows present continuous",
      regions: "Kazakhstan"
    },
    options: ["Қазақ тілі", "Қазақша", "Қазақ", "Қазақ тілінде"]
  },
  {
    name: "Kyrgyz",
    code: "ky",
    sample: "Мен кыргыз тилин үйрөнүп жатам. Тамгалардын жазылышы кызыктуу экен.",
    hints: {
      writing: "Uses Cyrillic with additional letters ң ө ү җ Similar to Kazakh but with җ instead of ж",
      unique: "More Persian/Arabic loanwords than Kazakh Distinctive use of -лар/-лер for plurals",
      examples: "үйрөнүп shows vowel harmony жатам shows present continuous",
      regions: "Kyrgyzstan"
    },
    options: ["Кыргыз тили", "Кыргызча", "Кыргыз", "Кыргыз тилинде"]
  },
  {
    name: "Maori",
    code: "mi",
    sample: "Kei te ako au i te reo Māori. Ka rawe te wairua o ngā kupu me te tangi o te reo.",
    hints: {
      writing: "Uses Latin with macrons (ā ē ī ō ū) to show long vowels",
      unique: "No s, f, j, c sounds Uses ng and wh digraphs Every syllable must end in a vowel",
      examples: "ako (learn) shows typical CV structure reo shows characteristic lack of consonant clusters",
      regions: "New Zealand"
    },
    options: ["Te Reo Māori", "Te Reo", "Māori", "Te Reo Rangatira"]
  },
  {
    name: "Chamorro",
    code: "ch",
    sample: "Hu tungo' na debi di bai hu eyak i fino' Chamoru. Gof interesante i gramåtika-ña.",
    hints: {
      writing: "Uses Latin with ñ and ng. Distinctive use of ' for glottal stop",
      unique: "Complex verb morphology with person/number/mood markers Uses Spanish loanwords",
      examples: "tungo' shows glottal stop hu shows 1st person singular",
      regions: "Guam, Northern Mariana Islands"
    },
    options: ["Fino' Chamoru", "Chamoru", "Chamorro"]
  },
  {
    name: "Lao",
    code: "lo",
    sample: "ຂ້ອຍກຳລັງຮຽນພາສາລາວ. ຕົວອັກສອນແລະການອອກສຽງແມ່ນໜ້າສົນໃຈຫຼາຍ.",
    hints: {
      writing: "Unique script derived from Khmer No spaces between words Tone marks above/below letters",
      unique: "Tonal language with 6 tones SVO word order Many compound words",
      examples: "ກຳລັງ shows present continuous ຮຽນ shows typical monosyllabic word",
      regions: "Laos"
    },
    options: ["ພາສາລາວ", "ລາວ"]
  },
  {
    name: "Thai",
    code: "th",
    sample: "ผมกำลังเรียนภาษาไทยอยู่ที่มหาวิทยาลัย ถึงแม้ว่าการออกเสียงจะยาก แต่ผมก็ชอบเรียนมาก",
    hints: {
      writing: "Curvy script that hangs from a line with distinctive vowel marks above and below consonants",
      unique: "Complex tone system marked with ่  ้  ๊  ๋ No word spaces Vowels can appear before after above or below consonants",
      examples: "กำลัง shows vowel above and below เรียน shows complex vowel combination",
      regions: "Thailand"
    }
  },
  {
    name: "Vietnamese",
    code: "vi",
    sample: "Tôi đã đến nhà hàng để ăn phở. Người phục vụ đề nghị món phở đặc biệt với thịt bò tái và gân.",
    hints: {
      writing: "Latin alphabet with extensive diacritical marks for tones and vowel modifications",
      unique: "Six tones marked with ́  ̀  ̃  ̉  ̣ Special vowels â ă ê ô ơ ư Đ/đ consonant",
      examples: "đặc biệt shows tone marks + modified vowels phục vụ shows complex syllable structure",
      regions: "Vietnam"
    }
  },
  {
    name: "Khmer",
    code: "km",
    sample: "ខ្ញុំចូលចិត្តរៀនភាសាខ្មែរ។ អក្សរខ្មែរមានរូបរាងមូលៗ ហើយមានសញ្ញានៅពីលើនិងក្រោម។",
    hints: {
      writing: "Round curvy script with complex consonant clusters stacked vertically and horizontally",
      unique: "Subscript consonants stack below main consonants Multiple consonants can combine into clusters",
      examples: "ចូលចិត្ត shows triple consonant stack រៀន shows dependent vowel form",
      regions: "Cambodia"
    }
  },
  {
    name: "Burmese",
    code: "my",
    sample: "ကျွန်တော် မြန်မာစာ သင်နေပါတယ်။ အက္ခရာတွေရဲ့ ပုံသဏ္ဍာန်က အရမ်းလှပါတယ်။",
    hints: {
      writing: "Circular letters derived from ancient Brahmi script Uses stacked consonants and vowel marks",
      unique: "Tonal language with 4 tones Complex syllable structure with medial consonants",
      examples: "သင် shows basic syllable နေ shows tone mark",
      regions: "Myanmar (Burma)"
    },
    options: ["မြန်မာစာ", "မြန်မာ", "ဗမာစာ", "ဗမာ"]
  },
  {
    name: "Indonesian",
    code: "id",
    sample: "Saya sedang belajar bahasa Indonesia. Tata bahasanya sangat teratur dan mudah dipelajari.",
    hints: {
      writing: "Uses Latin alphabet No tones or special characters",
      unique: "Extensive prefix and suffix system Regular grammar with no verb conjugation",
      examples: "belajar shows ber- prefix sedang shows present continuous",
      regions: "Indonesia"
    },
    options: ["Bahasa Indonesia", "Indonesia", "Indonesian"]
  },
  {
    name: "Malay",
    code: "ms",
    sample: "Saya sedang belajar bahasa Melayu. Sistem ejaan dan tatabahasa sangat menarik.",
    hints: {
      writing: "Uses Latin alphabet with occasional Arabic loanwords in Jawi script",
      unique: "Similar to Indonesian but with more Arabic influence Different vocabulary choices",
      examples: "belajar shows ber- prefix ejaan shows typical Malay word",
      regions: "Malaysia, Singapore, Brunei"
    },
    options: ["Bahasa Melayu", "Melayu", "Malay"]
  },
  {
    name: "Sinhala",
    code: "si",
    sample: "මම සිංහල භාෂාව ඉගෙන ගන්නවා. අකුරු වල හැඩය සහ ලියන විදිය ගොඩක් ලස්සනයි.",
    hints: {
      writing: "Unique curved script with circular letters Vowel marks above below and after letters",
      unique: "Complex verb conjugation system Special characters for prenasalized stops",
      examples: "ගන්නවා shows verb conjugation අකුරු shows typical word structure",
      regions: "Sri Lanka"
    },
    options: ["සිංහල", "සිංහල භාෂාව"]
  },
  {
    name: "Tagalog",
    code: "tl",
    sample: "Nag-aaral ako ng wikang Tagalog. Ang mga panlapi ay napakaimportante sa wika.",
    hints: {
      writing: "Modern Tagalog uses Latin alphabet with ñ Traditional Baybayin script exists",
      unique: "Complex affix system changes verb meaning Focus system marks topic of sentence",
      examples: "nag-aaral shows present progressive mga shows plural marker",
      regions: "Philippines"
    },
    options: ["Tagalog", "Filipino", "Wikang Tagalog"]
  },
  {
    name: "Persian",
    code: "fa",
    sample: "من در حال یادگیری زبان فارسی هستم. خط و دستور زبان بسیار جالب است.",
    hints: {
      writing: "Modified Arabic script written right to left Special letters not in Arabic: پ چ ژ گ",
      unique: "No grammatical gender Extensive use of compound verbs SOV word order",
      examples: "هستم shows verb to be یادگیری shows verbal noun",
      regions: "Iran, Afghanistan, Tajikistan"
    },
    options: ["فارسی", "پارسی", "زبان فارسی"]
  },
  // South Asian Languages
  {
    name: "Bengali",
    code: "bn",
    sample: "আমি বাংলা ভাষা শিখছি। এই ভাষার লিপি খুব সুন্দর। বিশেষ করে যুক্তাক্ষরগুলি খুব আকর্ষণীয়।",
    hints: {
      writing: "Curvy script with distinctive horizontal line on top Letters connect at top",
      unique: "Complex conjunct consonants Two forms of many consonants Different from Devanagari",
      examples: "শিখছি shows present continuous যুক্তাক্ষর shows conjunct formation",
      regions: "Bangladesh, West Bengal (India)"
    }
  },
  {
    name: "Hindi",
    code: "hi",
    sample: "मैं हिंदी सीख रहा हूं। मुझे देवनागरी लिपि में लिखना बहुत पसंद है। अक्षरों के ऊपर की रेखा मुझे आकर्षित करती है।",
    hints: {
      writing: "Devanagari script with horizontal line connecting letters Letters hang from top line",
      unique: "Aspirated consonants ख घ ठ ध Retroflex sounds ट ड Gender affects verb agreement",
      examples: "सीख रहा हूं shows continuous tense देवनागरी shows conjunct consonants",
      regions: "North India"
    }
  },
  {
    name: "Tamil",
    code: "ta",
    sample: "நான் தமிழ் கற்றுக்கொண்டிருக்கிறேன். எழுத்துக்கள் வட்டமாகவும் கோடுகளாகவும் இருக்கின்றன.",
    hints: {
      writing: "Round shapes and curves very few straight lines Letters represent syllables",
      unique: "Retroflex consonants ட ண ற ள Many vowel modifications Strong literary tradition",
      examples: "கற்றுக்கொண்டிருக்கிறேன் shows complex verb conjugation எழுத்துக்கள் shows plural",
      regions: "Tamil Nadu (India), Sri Lanka"
    }
  },
  {
    name: "Sinhala",
    code: "si",
    sample: "මම සිංහල ඉගෙන ගන්නවා. අකුරු ලියන විදිය පුදුම සුන්දරයි. විශේෂයෙන් වටරවුම් හැඩය.",
    hints: {
      writing: "Round shapes and curves with distinctive loops and swirls",
      unique: "Special symbols for prenasalized stops Two sets of vowel signs for short/long",
      examples: "ඉගෙන ගන්නවා shows compound verb අකුරු shows plural without marker",
      regions: "Sri Lanka"
    },
    options: ["සිංහල", "සිංහල භාෂාව", "හෙළ බස"]
  },
  {
    name: "Greek",
    code: "el",
    sample: "Μαθαίνω ελληνικά και μου αρέσει πολύ. Το σύστημα τονισμού είναι πολύ ενδιαφέρον.",
    hints: {
      writing: "Uses Greek alphabet with diacritical marks for stress",
      unique: "Rich verb system with aspects and voices Complex noun declension",
      examples: "μαθαίνω shows present active τονισμού shows genitive case",
      regions: "Greece, Cyprus"
    },
    options: ["Ελληνικά", "Νέα Ελληνικά"]
  },
  {
    name: "Russian",
    code: "ru",
    sample: "Я изучаю русский язык уже два года. Сложнее всего для меня правильно использовать глагольные приставки.",
    hints: {
      writing: "Cyrillic alphabet with 33 letters including ж ц щ я ю",
      unique: "Six grammatical cases Word stress can change meaning Complex aspect system for verbs",
      examples: "изучаю shows first person conjugation глагольные shows adjective agreement",
      regions: "Russia"
    },
    options: ["Русский", "Русский язык", "Великорусский"]
  },
  {
    name: "Ukrainian",
    code: "uk",
    sample: "Я вивчаю українську мову. Система відмінків та наголосів дуже цікава.",
    hints: {
      writing: "Uses Cyrillic with special letters є ї ґ",
      unique: "Seven cases Complex stress system G can be г or ґ",
      examples: "вивчаю shows first person present відмінків shows genitive plural",
      regions: "Ukraine"
    },
    options: ["Українська", "Українська мова"]
  },
  {
    name: "Bulgarian",
    code: "bg",
    sample: "Изучавам български език. Системата на членуването е много интересна.",
    hints: {
      writing: "Uses Cyrillic without ы ъ is a full vowel",
      unique: "Only Slavic language without cases Uses definite article",
      examples: "изучавам shows present tense членуването shows articulation",
      regions: "Bulgaria"
    },
    options: ["Български", "Български език"]
  },
  {
    name: "Serbian",
    code: "sr",
    sample: "Учим српски језик. Занимљиво је што се користе и ћирилица и латиница.",
    hints: {
      writing: "Uses both Cyrillic and Latin scripts interchangeably",
      unique: "Only European language with complete digraphia Seven cases",
      examples: "учим shows first person present језик shows nominative case",
      regions: "Serbia"
    },
    options: ["Српски", "Српски језик"]
  },
  {
    name: "Mongolian",
    code: "mn",
    sample: "Би монгол хэлийг сурч байна. Үсэг үсгийн хэлбэр нь маш онцгой бөгөөд сонирхолтой байдаг.",
    hints: {
      writing: "Cyrillic with additional letters ө ү Uses vowel harmony extensively",
      unique: "Vowels must be either all masculine or all feminine in a word Subject-Object-Verb order",
      examples: "сурч байна shows continuous aspect үсгийн shows genitive case",
      regions: "Mongolia"
    },
    options: ["Монгол", "Монгол хэл", "Монгол бичиг"]
  },
  {
    name: "Georgian",
    code: "ka",
    sample: "მე ვსწავლობ ქართულ ენას. დამწერლობის სისტემა ძალიან ლამაზია.",
    hints: {
      writing: "Unique script with no uppercase/lowercase Round shapes",
      unique: "Complex verb system with person markers SOV word order",
      examples: "ვსწავლობ shows present tense ენას shows dative case",
      regions: "Georgia"
    },
    options: ["ქართული", "ქართული ენა"]
  },
  {
    name: "Armenian",
    code: "hy",
    sample: "Ես սովորում եմ հայերեն։ Հայկական տառերի ձևերն ու գրելաոճը շատ գեղեցիկ են։",
    hints: {
      writing: "Unique alphabet with 39 letters Each letter has distinct uppercase and lowercase",
      unique: "Rich system of consonant clusters Subject-Object-Verb word order",
      examples: "սովորում եմ shows present tense տառերի shows genitive case",
      regions: "Armenia"
    },
    options: ["Հայերեն", "Հայոց լեզու"]
  },
  {
    name: "Hungarian",
    code: "hu",
    sample: "Magyarul tanulok, és nagyon tetszik a nyelv. A magánhangzó-harmónia különösen érdekes.",
    hints: {
      writing: "Uses Latin with special characters á é í ó ö ő ú ü ű",
      unique: "Vowel harmony Agglutinative with many cases No grammatical gender",
      examples: "tanulok shows vowel harmony magánhangzó shows compound word",
      regions: "Hungary"
    },
    options: ["Magyar", "Magyar nyelv"]
  },
  {
    name: "Romanian",
    code: "ro",
    sample: "Învăț limba română. Sistemul de cazuri și articolele sunt foarte interesante.",
    hints: {
      writing: "Uses Latin with special letters ă â î ș ț",
      unique: "Only Romance language with case system Definite article is suffix",
      examples: "învăț shows first person present articolele shows articulation",
      regions: "Romania, Moldova"
    },
    options: ["Română", "Limba română"]
  },
  {
    name: "Croatian",
    code: "hr",
    sample: "Učim hrvatski jezik i jako mi se sviđa. Sustav naglasaka i padežni sustav su vrlo zanimljivi.",
    hints: {
      writing: "Uses Latin alphabet with special characters č ć đ š ž",
      unique: "Complex case system with 7 cases Distinction between č/ć and dž/đ",
      examples: "učim shows 1st person present padežni shows adjectival agreement",
      regions: "Croatia"
    },
    options: ["Hrvatski", "Hrvatski jezik"]
  },
  {
    name: "Slovenian",
    code: "sl",
    sample: "Učim se slovenščino. Dvojina in naglasni sistem sta zelo posebna in zanimiva.",
    hints: {
      writing: "Uses Latin alphabet with č š ž Special marks for stressed syllables",
      unique: "Has dual number (for two items) Complex stress system with pitch accent",
      examples: "učim shows 1st person present dvojina shows dual number",
      regions: "Slovenia"
    },
    options: ["Slovenščina", "Slovenski jezik"]
  },
  {
    name: "Danish",
    code: "da",
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
    code: "fo",
    sample: "Eg læri føroyskt, tí tað er eitt forvitnisligt mál. Ljóðskipanin er sera áhugaverd.",
    hints: {
      writing: "Uses Latin with special letters á æ ð í ó ú ý ø",
      unique: "Complex vowel system with nine vowels Maintains case system",
      examples: "læri shows i-umlaut føroyskt shows neuter form",
      regions: "Faroe Islands"
    },
    options: ["Føroyskt", "Føroysk tunga"]
  },
  {
    name: "Finnish",
    code: "fi",
    sample: "Opiskelen suomen kieltä. Sijamuotojärjestelmä on erittäin mielenkiintoinen.",
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
    code: "kl",
    sample: "Kalaallisut ilinniarpara. Oqaatsit katiterneqarsinnaanerat pikkunarpoq.",
    hints: {
      writing: "Uses Latin alphabet with special characters like ĸ",
      unique: "Highly agglutinative Can form very long words through suffixation",
      examples: "ilinniarpara shows incorporation katiterneqarsinnaanerat shows multiple suffixes",
      regions: "Greenland"
    },
    options: ["Kalaallisut", "Kalaallit oqaasii"]
  },
  {
    name: "Icelandic",
    code: "is",
    sample: "Ég er að læra íslensku. Fallbeygingar og hljóðkerfi tungumálsins eru mjög áhugaverð.",
    hints: {
      writing: "Uses Latin with special letters á é í ó ú ý þ ð æ ö",
      unique: "Preserves Old Norse case system Creates new words instead of borrowing",
      examples: "læra shows strong verb fallbeygingar shows compound word",
      regions: "Iceland"
    },
    options: ["Íslenska", "Íslenskt mál"]
  },
  {
    name: "Norwegian",
    code: "no",
    sample: "Jeg lærer norsk, og jeg liker språket veldig godt. Tonefallet er fascinerende.",
    hints: {
      writing: "Uses Latin with æ ø å Special rules for compound words",
      unique: "Two written standards (Bokmål/Nynorsk) Pitch accent system",
      examples: "lærer shows present tense tonefallet shows definite form",
      regions: "Norway"
    },
    options: ["Norsk", "Norsk språk"]
  },
  {
    name: "Swedish",
    code: "sv",
    sample: "Jag lär mig svenska och tycker mycket om språket. Tonaccenten är särskilt intressant.",
    hints: {
      writing: "Uses Latin with special letters å ä ö Special rules for en/ett words",
      unique: "Two grammatical genders Distinctive pitch accent system",
      examples: "lär mig shows reflexive verb tonaccent shows compound",
      regions: "Sweden, Finland"
    },
    options: ["Svenska", "Svenska språket"]
  },
  {
    name: "Spanish",
    code: "es",
    sample: "Estoy aprendiendo español. Me encantan los tiempos verbales y la riqueza del vocabulario.",
    hints: {
      writing: "Uses Latin alphabet with special ñ and stress marks á é í ó ú",
      unique: "Two forms of be (ser/estar) Complex verb conjugation system",
      examples: "estoy shows temporary state encantan shows gustar-type verb",
      regions: "Spain, Latin America"
    },
    options: ["Español", "Castellano"]
  },
  {
    name: "Portuguese",
    code: "pt",
    sample: "Estou aprendendo português. A nasalização e a conjugação verbal são muito interessantes.",
    hints: {
      writing: "Uses Latin with special marks á â ã ç é ê í ó ô õ ú",
      unique: "Personal infinitive Extensive nasal vowel system",
      examples: "estou shows present continuous nasalização shows nasal vowels",
      regions: "Portugal, Brazil"
    },
    options: ["Português", "Língua portuguesa"]
  },
  {
    name: "Papiamento",
    code: "pap",
    sample: "Mi ta siña papiamentu. E manera di kombiná palabra ta hopi interesante.",
    hints: {
      writing: "Uses Latin alphabet with ù è ò",
      unique: "Mix of Portuguese Spanish Dutch African languages",
      examples: "ta shows present tense siña shows Portuguese influence",
      regions: "Aruba, Curaçao, Bonaire"
    },
    options: ["Papiamentu", "Papiamento"]
  },

  // Middle Eastern Languages
  {
    name: "Persian",
    code: "fa",
    sample: "من دارم زبان فارسی را یاد می‌گیرم. حروف به هم پیوسته و خوشنویسی این زبان خیلی زیباست.",
    hints: {
      writing: "Arabic-based script with four additional letters پ چ ژ گ Written right to left",
      unique: "Ezafe construction connects words with unstated -e Uses Arabic script but not Arabic grammar",
      examples: "می‌گیرم shows present continuous with می prefix زیباست shows copula suffix است",
      regions: "Iran"
    },
    options: ["فارسی", "پارسی", "دری", "زبان فارسی"]
  },
  {
    name: "Hebrew",
    code: "he",
    sample: "אני לומד עברית כבר שנתיים. המערכת של שורשי המילים עוזרת לי להבין מילים חדשות.",
    hints: {
      writing: "Square script written right to left Vowel points optional in modern writing",
      unique: "Three letter roots form most words Different verb patterns (binyanim) change meaning",
      examples: "לומד from root ל־מ־ד (study) שנתיים shows dual number form",
      regions: "Israel"
    },
    options: ["עברית", "לשון הקודש", "יהודית", "עברית מודרנית"]
  },
  {
    name: "Jordanian Arabic",
    code: "ar",
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
    code: "tr",
    sample: "Türkçe öğreniyorum. Ses uyumu ve ekler sistemi çok ilginç.",
    hints: {
      writing: "Latin with special letters: ç, ğ, ı, ö, ş, ü. No q, w, x.",
      unique: "Vowel harmony. Agglutinative (many suffixes). No grammatical gender.",
      examples: "Compare with Azerbaijani: ev/ev (house), gelmek/gəlmək (to come), but different: ben/mən (I)",
      regions: "Turkey"
    },
    options: ["Türkçe", "Türk Dili", "Turkish", "Türkiye Türkçesi"]
  }
];
