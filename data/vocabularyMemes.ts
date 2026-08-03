export type VocabularyOption = {
  id: string;
  label: string;
  explanation?: string;
};

export type VocabularyMemeQuestion = {
  id: number;
  image: string;
  imageAlt: string;
  english: string;
  ukrainian: string;
  options: VocabularyOption[];
  answer: number;
  funNote: string;
};

const vocabularyMemes: VocabularyMemeQuestion[] = [
  {
    id: 1,
    image: "/images/meme/Meme_01.png",
    imageAlt: "Мем про дуже довгу перерву на дивані",
    english: 'I said I was just taking a break, and a ____ later I was still on the sofa.',
    ukrainian: "Я сказав, що просто беру невелику перерву, а через два тижні усе ще лежав на дивані.",
    options: [
      {
        id: "rush-hour",
        label: "rush hour",
        explanation: "година пік (час найбільшого руху на дорогах, але використовується як стала назва явища тисняви)",
      },
      { id: "fortnight", label: "fortnight" },
      {
        id: "dog-days",
        label: "dog days",
        explanation: 'найспекотніші літні дні року (період "собачої спеки", зазвичай у липні–серпні)',
      },
    ],
    answer: 1,
    funNote: '🇬🇧 "Fortnight" means "two weeks" and is still very common in British English.',
  },
  {
    id: 2,
    image: "/images/meme/Meme_02.png",
    imageAlt: "Мем про довгу емоційну тираду щодо понеділків",
    english: "I only asked how his weekend was, and he started a 20-minute ____ about Mondays.",
    ukrainian: "Я лише запитав, як пройшли вихідні, а він почав 20-хвилинну тираду про понеділки.",
    options: [
      {
        id: "trade",
        label: "trade",
        explanation: "торгівля: купівля та продаж товарів чи послуг між людьми, компаніями або країнами",
      },
      {
        id: "drain",
        label: "drain",
        explanation: "стік, зливний отвір у раковині чи ванні, каналізація або дренажна система",
      },
      { id: "rant", label: "rant" },
    ],
    answer: 2,
    funNote: '“Rant” is a long, emotional and often angry speech or complaint.',
  },
  {
    id: 3,
    image: "/images/meme/Meme_03.png",
    imageAlt: "Мем про перегляд усього серіалу замість сну",
    english: '“One more episode and I’m going to bed,” I said to myself... and then I ____ the whole series.',
    ukrainian: "«Ще одна серія — і спати», — сказав я собі... а потім подивився весь серіал запоєм.",
    options: [
      { id: "binge-watched", label: "binge-watched" },
      {
        id: "saw-through",
        label: "saw through",
        explanation: "побачив наскрізь або розпізнав справжні наміри чи обман",
      },
      {
        id: "watched-out",
        label: "watched out",
        explanation: "був обережним або стерігся небезпеки",
      },
    ],
    answer: 0,
    funNote: "🍿 “Binge-watch” означає подивитися багато серій поспіль, часто за один раз. У минулому часі: “binge-watched”.",
  },
];

export default vocabularyMemes;
