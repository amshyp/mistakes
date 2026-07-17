export type Mistake = {
  id: number;
  question: string;
  options: string[];
  answer: number;
  tip: string;
  example: string;
};

const mistakes: Mistake[] = [
  {
    id: 1,
    question: "Оберіть правильний варіант: «Я з тобою згоден». ",
    options: ["I agree with you.", "I am agree with you.", "I agree to you."],
    answer: 0,
    tip: "Agree — це дієслово, тому після I не потрібне am. З людиною вживаємо прийменник with.",
    example: "We agree with our teacher.",
  },
  {
    id: 2,
    question: "Оберіть правильний варіант: «У нас не так багато часу». ",
    options: ["We don't have many time.", "We don't have much time.", "We don't have a lot time."],
    answer: 1,
    tip: "Much вживаємо з незлічуваними іменниками, а time — незлічуваний.",
    example: "How much water do you drink?",
  },
  {
    id: 3,
    question: "Оберіть правильний варіант: «Вона сказала мені правду». ",
    options: ["She said me the truth.", "She told the truth me.", "She told me the truth."],
    answer: 2,
    tip: "Tell вживаємо з людиною-адресатом: tell somebody something. Після say потрібен to: say something to somebody.",
    example: "He said hello to me.",
  },
  {
    id: 4,
    question: "Оберіть правильний варіант: «Я зробив домашнє завдання». ",
    options: ["I made my homework.", "I did my homework.", "I created my homework."],
    answer: 1,
    tip: "Зі homework вживаємо do. Make частіше означає створити або виготовити щось.",
    example: "She made a cake for the party.",
  },
  {
    id: 5,
    question: "Оберіть правильний варіант: «Ти дуже добре говориш англійською». ",
    options: ["You speak English very good.", "You speak English very well.", "You speak English very better."],
    answer: 1,
    tip: "Good — прикметник, а well — прислівник. Воно описує дієслово speak.",
    example: "This is a good book.",
  },
  {
    id: 6,
    question: "Оберіть правильний варіант: «Чи можеш ти позичити мені свою ручку?» ",
    options: ["Can you borrow me your pen?", "Can you lend me your pen?", "Can you give me your pen for ever?"],
    answer: 1,
    tip: "Lend — дати комусь у тимчасове користування. Borrow — взяти в когось у тимчасове користування.",
    example: "Can I borrow your dictionary?",
  },
  {
    id: 7,
    question: "Оберіть правильний варіант: «Я живу тут уже п'ять років». ",
    options: ["I have lived here since five years.", "I have lived here for five years.", "I live here from five years."],
    answer: 1,
    tip: "For показує тривалість періоду, а since — його початкову точку.",
    example: "I have lived here since 2021.",
  },
  {
    id: 8,
    question: "Оберіть правильний варіант: «Покажи мені інший варіант». ",
    options: ["Show me other option.", "Show me another option.", "Show me the another option."],
    answer: 1,
    tip: "Another означає «ще один / інший» перед іменником в однині. Other зазвичай вживаємо з множиною або перед another іменником.",
    example: "Other students are waiting outside.",
  },
  {
    id: 9,
    question: "Оберіть правильний варіант: «У цьому році стало менше помилок». ",
    options: ["There are less mistakes this year.", "There are fewer mistakes this year.", "There are little mistakes this year."],
    answer: 1,
    tip: "Fewer вживаємо зі злічуваними іменниками у множині, а less — з незлічуваними.",
    example: "I drink less coffee now.",
  },
  {
    id: 10,
    question: "Оберіть правильний варіант: «Чи є в холодильнику молоко?» ",
    options: ["Is there some milk in the fridge?", "Is there any milk in the fridge?", "Is there many milk in the fridge?"],
    answer: 1,
    tip: "У звичайних запитаннях і запереченнях вживаємо any. Some частіше використовуємо у ствердженнях і ввічливих пропозиціях.",
    example: "Would you like some tea?",
  },
  {
    id: 11,
    question: "Оберіть правильний варіант: «Я звик рано вставати». ",
    options: ["I use to get up early.", "I am used to get up early.", "I am used to getting up early."],
    answer: 2,
    tip: "Be used to означає «бути звичним до» й вимагає іменника або дієслова з -ing. Used to + інфінітив — це звичка в минулому.",
    example: "I used to live in Kyiv.",
  },
  {
    id: 12,
    question: "Оберіть правильний варіант: «Ми прибули до Лондона о восьмій». ",
    options: ["We arrived to London at eight.", "We arrived in London at eight.", "We arrived at London at eight."],
    answer: 1,
    tip: "Arrive in вживаємо з містами й країнами, а arrive at — з конкретними місцями та будівлями.",
    example: "The train arrived at the station late.",
  },
  {
    id: 13,
    question: "Оберіть правильний варіант: «Мені цікава ця книга». ",
    options: ["I am interesting in this book.", "I am interested in this book.", "This book is interested for me."],
    answer: 1,
    tip: "Interested описує почуття людини. Interesting описує предмет або явище, яке викликає інтерес.",
    example: "This book is really interesting.",
  },
  {
    id: 14,
    question: "Оберіть правильний варіант: «Вона дала мені корисну пораду». ",
    options: ["She gave me a useful advice.", "She gave me a useful advise.", "She gave me some useful advice."],
    answer: 2,
    tip: "Advice — незлічуваний іменник «порада». Advise — дієслово «радити».",
    example: "I advise you to practise every day.",
  },
  {
    id: 15,
    question: "Оберіть правильний варіант: «Зараз вона готує вечерю». ",
    options: ["She cooks dinner now.", "She is cooking dinner now.", "She cooking dinner now."],
    answer: 1,
    tip: "Present Continuous використовуємо для дії, яка відбувається зараз. Present Simple — для звичок, фактів і розкладів.",
    example: "She cooks dinner every evening.",
  },
];

export default mistakes;
