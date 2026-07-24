export type WonderlandPhraseTile = {
  id: string;
  text: string;
};

export type WonderlandQuestion = {
  id: string;
  number: number;
  title: string;
  originalSentence: string;
  normalizedSentence: string;
  endingPunctuation: "." | "?" | "!";
  translationUk: string;
  wordCount: number;
  phraseTiles: WonderlandPhraseTile[];
  curiousFactTitle: string;
  curiousFactText: string[];
  curiousFactExample?: {
    english: string;
    ukrainian: string;
  };
  decoration?: {
    src: string;
    width: number;
    height: number;
    position: "top-right-peek" | "top-left-peek";
    scale?: number;
    offsetX?: number;
    offsetY?: number;
    rotation?: number;
    flipX?: boolean;
  };
  unlockOrder: number;
};

export const wonderlandQuestions: WonderlandQuestion[] = [
  {
    id: "mad-as-a-hatter",
    number: 1,
    title: "Mad as a Hatter",
    originalSentence: "everybody knows he's as mad as a hatter.",
    normalizedSentence: "everybody knows he's as mad as a hatter",
    endingPunctuation: ".",
    translationUk: "Усі знають, що він абсолютно божевільний.",
    wordCount: 8,
    phraseTiles: [
      { id: "hatter-he-sounds", text: "everybody knows" },
      { id: "hatter-as-mad", text: "he's" },
      { id: "hatter-as-mad-adjective", text: "as mad" },
      { id: "hatter-as-a-hatter", text: "as a hatter" },
    ],
    curiousFactTitle: "Curious fact",
    curiousFactText: [
      "Вислів mad as a hatter існував ще до появи «Аліси». У XIX столітті капелюшники працювали з ртуттю, пари якої могли викликати тремтіння, зміни настрою й психічні розлади. Саме тому з'явився цей вислів, а Божевільний Капелюшник лише зробив його знаменитим. Він і сьогодні означає \"абсолютно божевільний\".",
    ],
    decoration: {
      src: "/images/hatter.png",
      width: 928,
      height: 1152,
      position: "top-left-peek",
      scale: 0.575,
      offsetX: 250,
      offsetY: -30,
    },
    unlockOrder: 1,
  },
  {
    id: "rabbit-hole",
    number: 2,
    title: "The Magic Cookie",
    originalSentence: "a little of that went a long way.",
    normalizedSentence: "a little of that went a long way",
    endingPunctuation: ".",
    translationUk: "Невеликого шматочка цього вистачить з головою.",
    wordCount: 8,
    phraseTiles: [
      { id: "rabbit-a-little", text: "a little" },
      { id: "rabbit-of-that", text: "of that" },
      { id: "rabbit-went", text: "went" },
      { id: "rabbit-a-long-way", text: "a long way" },
    ],
    curiousFactTitle: "✨ Curious fact",
    curiousFactText: [
      "“a little goes a long way” — поширений англійський вислів, який означає, що навіть невелика кількість чогось може дати великий результат.",
    ],
    curiousFactExample: {
      english: "“a little kindness goes a long way.”",
      ukrainian: "Навіть трохи доброти може багато змінити.",
    },
    decoration: {
      src: "/images/cookie.png",
      width: 2048,
      height: 1536,
      position: "top-right-peek",
    },
    unlockOrder: 2,
  },
  {
    id: "lost-muchness",
    number: 3,
    title: "The Lost Muchness",
    originalSentence: "you've completely lost your muchness.",
    normalizedSentence: "you've completely lost your muchness",
    endingPunctuation: ".",
    translationUk: "Ти повністю втратив свою унікальність. / Ти вже зовсім не той, ким був.",
    wordCount: 5,
    phraseTiles: [
      { id: "muchness-youve-lost", text: "you've" },
      { id: "muchness-completely-lost", text: "completely lost" },
      { id: "muchness-your", text: "your" },
      { id: "muchness-word", text: "muchness" },
    ],
    curiousFactTitle: "Curious fact",
    curiousFactText: [
      "Слова muchness раніше майже не існувало — його використали як вигаданий іменник від much. В «Алісі в Країні чудес» воно означає твою індивідуальність, внутрішній вогонь або справжню сутність.",
    ],
    decoration: {
      src: "/images/flamingo.png",
      width: 464,
      height: 576,
      position: "top-left-peek",
      scale: 0.8,
    },
    unlockOrder: 3,
  },
  {
    id: "sentence-first-verdict-afterwards",
    number: 4,
    title: "Vice versa",
    originalSentence: "sentence first verdict afterwards.",
    normalizedSentence: "sentence first verdict afterwards",
    endingPunctuation: ".",
    translationUk: "Спочатку покарання, потім вердикт.",
    wordCount: 4,
    phraseTiles: [
      { id: "verdict-sentence-first", text: "sentence" },
      { id: "verdict-first", text: "first" },
      { id: "verdict-word", text: "verdict" },
      { id: "verdict-afterwards", text: "afterwards" },
    ],
    curiousFactTitle: "Curious fact",
    curiousFactText: [
      "У Країні Див усе відбувається навпаки: спочатку карають, а вже потім вирішують, чи людина взагалі винна.",
    ],
    decoration: {
      src: "/images/queen.png",
      width: 2048,
      height: 2048,
      position: "top-left-peek",
      scale: 0.85,
      offsetY: 100,
    },
    unlockOrder: 4,
  },
  {
    id: "down-the-rabbit-hole",
    number: 5,
    title: "Down the Rabbit Hole",
    originalSentence: "suddenly Alice went down the rabbit hole.",
    normalizedSentence: "suddenly Alice went down the rabbit hole",
    endingPunctuation: ".",
    translationUk: "Раптом Аліса потрапила в кролячу нору.",
    wordCount: 7,
    phraseTiles: [
      { id: "down-suddenly", text: "suddenly" },
      { id: "down-alice", text: "Alice" },
      { id: "down-went", text: "went down" },
      { id: "down-rabbit-hole", text: "the rabbit hole" },
    ],
    curiousFactTitle: "Curious fact",
    curiousFactText: [
      "Саме ця сцена дала життя вислову down the rabbit hole. Сьогодні його використовують, коли людина настільки захоплюється якоюсь темою, що починає без кінця переходити від одного факту до іншого — ніби потрапляє в нескінченний лабіринт інформації.",
    ],
    decoration: {
      src: "/images/rabbit.png",
      width: 896,
      height: 1200,
      position: "top-right-peek",
      scale: 0.6,
      offsetX: 210,
    },
    unlockOrder: 5,
  },
  {
    id: "curiouser-and-curiouser",
    number: 6,
    title: "Curiouser and Curiouser",
    originalSentence: "it's getting curiouser and curiouser every day!",
    normalizedSentence: "it's getting curiouser and curiouser every day",
    endingPunctuation: "!",
    translationUk: "Щодня стає все дивніше й дивніше!",
    wordCount: 7,
    phraseTiles: [
      { id: "curiouser-its-getting", text: "it's getting" },
      { id: "curiouser-word", text: "curiouser" },
      { id: "curiouser-and", text: "and curiouser" },
      { id: "curiouser-every-day", text: "every day" },
    ],
    curiousFactTitle: "Curious fact",
    curiousFactText: [
      "У звичайній англійській так говорити неправильно — правильно more and more curious. Але Льюїс Керролл навмисно порушив граматичне правило, щоб передати щире здивування Аліси й зробити її мову більш дитячою та кумедною.",
    ],
    decoration: {
      src: "/images/alice.png",
      width: 448,
      height: 592,
      position: "top-left-peek",
      scale: 0.63,
      offsetX: 80,
      offsetY: 50,
    },
    unlockOrder: 6,
  },
  {
    id: "neither-here-nor-there",
    number: 7,
    title: "Neither Here nor There",
    originalSentence: "that's neither here nor there right now.",
    normalizedSentence: "that's neither here nor there right now",
    endingPunctuation: ".",
    translationUk: "Це зараз неважливо. / Це зараз не має стосунку до справи.",
    wordCount: 7,
    phraseTiles: [
      { id: "neither-thats", text: "that's" },
      { id: "neither-here", text: "neither here" },
      { id: "neither-nor-there", text: "nor there" },
      { id: "neither-right-now", text: "right now" },
    ],
    curiousFactTitle: "Curious fact",
    curiousFactText: [
      "Цей вислів означає \"це не по темі\" або \"це не має значення в цьому контексті\". Він з'явився ще в XVI столітті й буквально означав: це ні тут, ні там, тобто не належить до предмета розмови.",
    ],
    decoration: {
      src: "/images/tea.png",
      width: 576,
      height: 464,
      position: "top-right-peek",
      scale: 0.5,
      offsetX: 250,
      offsetY: -50,
      rotation: 10,
    },
    unlockOrder: 7,
  },
  {
    id: "raven-writing-desk",
    number: 8,
    title: "The Raven’s Riddle",
    originalSentence: "why is a raven like a writing desk?",
    normalizedSentence: "why is a raven like a writing desk",
    endingPunctuation: "?",
    translationUk: "Чому ворон схожий на письмовий стіл?",
    wordCount: 8,
    phraseTiles: [
      { id: "raven-why-is", text: "why is" },
      { id: "raven-a-raven", text: "a raven" },
      { id: "raven-like", text: "like" },
      { id: "raven-writing-desk", text: "a writing desk" },
    ],
    curiousFactTitle: "Curious fact",
    curiousFactText: [
      "Це найвідоміша загадка з «Аліси в Країні чудес». Найцікавіше те, що Льюїс Керролл спочатку не придумав відповіді. Він навмисно залишив загадку без розв'язку, щоб показати абсурдність світу Країни чудес.",
    ],
    decoration: {
      src: "/images/raven.png",
      width: 464,
      height: 576,
      position: "top-left-peek",
      scale: 0.7,
      offsetX: 60,
      offsetY: 150,
      flipX: true,
    },
    unlockOrder: 8,
  },
  {
    id: "time-is-a-he",
    number: 9,
    title: "Time Is a He",
    originalSentence: "just so you know time is a he not an it.",
    normalizedSentence: "just so you know time is a he not an it",
    endingPunctuation: ".",
    translationUk: "Просто щоб ти знав: Час — це він, а не воно.",
    wordCount: 11,
    phraseTiles: [
      { id: "time-just-so-you-know", text: "just so" },
      { id: "time-word", text: "you know" },
      { id: "time-is-a-he", text: "time is a he" },
      { id: "time-not-an-it", text: "not an it" },
    ],
    curiousFactTitle: "Curious fact",
    curiousFactText: [
      "Це репліка з фільму Alice Through the Looking Glass (2016). У ньому Час — не абстрактне поняття, а справжній персонаж. Саме тому герої кажуть he, а не it. Це гарний приклад персоніфікації в англійській мові.",
    ],
    decoration: {
      src: "/images/watch.png",
      width: 464,
      height: 576,
      position: "top-right-peek",
      scale: 0.51,
      offsetX: 240,
    },
    unlockOrder: 9,
  },
  {
    id: "tea-party",
    number: 10,
    title: "Mad Hatter’s Tea Party",
    originalSentence: "you may have noticed that I'm not all there myself.",
    normalizedSentence: "you may have noticed that I'm not all there myself",
    endingPunctuation: ".",
    translationUk: "Можливо, ви вже помітили, що я й сам не зовсім при здоровому глузді.",
    wordCount: 10,
    phraseTiles: [
      { id: "tea-you-may", text: "you may" },
      { id: "tea-have-noticed", text: "have noticed" },
      { id: "tea-that", text: "that" },
      { id: "tea-im-not", text: "I'm not" },
      { id: "tea-all-there", text: "all there" },
      { id: "tea-myself", text: "myself" },
    ],
    curiousFactTitle: "Curious fact",
    curiousFactText: [
      "Not all there не означає, що людини буквально «немає тут». За змістом цей вислів дуже схожий на українське «не всі вдома». Обидва означають, що людина поводиться дивно або «трохи не в собі».",
    ],
    decoration: {
      src: "/images/cat.png",
      width: 1242,
      height: 848,
      position: "top-left-peek",
    },
    unlockOrder: 10,
  },
];
