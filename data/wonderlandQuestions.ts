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
  };
  unlockOrder: number;
};

export const wonderlandQuestions: WonderlandQuestion[] = [
  {
    id: "rabbit-hole",
    number: 1,
    title: "The Magic Cookie",
    originalSentence: "A little of that went a long way.",
    normalizedSentence: "a little of that went a long way",
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
      "“A little goes a long way” — поширений англійський вислів, який означає, що навіть невелика кількість чогось може дати великий результат.",
    ],
    curiousFactExample: {
      english: "“A little kindness goes a long way.”",
      ukrainian: "Навіть трохи доброти може багато змінити.",
    },
    decoration: {
      src: "/images/cookie.png",
      width: 2048,
      height: 1536,
      position: "top-right-peek",
    },
    unlockOrder: 1,
  },
  {
    id: "tea-party",
    number: 2,
    title: "Mad Hatter’s Tea Party",
    originalSentence: "You may have noticed that I'm not all there myself.",
    normalizedSentence: "you may have noticed that i'm not all there myself",
    translationUk: "Можливо, ви вже помітили, що я й сам не зовсім при здоровому глузді.",
    wordCount: 10,
    phraseTiles: [
      { id: "tea-you-may", text: "you may" },
      { id: "tea-have-noticed", text: "have noticed" },
      { id: "tea-that", text: "that" },
      { id: "tea-im-not", text: "i'm not" },
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
    unlockOrder: 2,
  },
];
