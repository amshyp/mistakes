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
    id: 4,
    question: `Я зробив селфі й одразу пошкодував про це.

I ___ a selfie and immediately regretted it.`,
    options: ["made", "did", "took"],
    answer: 2,
    tip: "Для слів photo та selfie в англійській завжди використовується дієслово take (take a photo, take a selfie).",
    example: `The front camera has no mercy.

Фронтальна камера не знає жалю.`,
  },
  {
    id: 1,
    question: `Я дуже люблю розмовляти зі своїм котом англійською.

I ___ talking to my cat in English.`,
    options: ["very like", "really like", "much like"],
    answer: 1,
    tip: "В англійській мові very (дуже) вживається лише з прикметниками та прислівниками (наприклад, very beautiful — дуже красивий), але не ставиться перед дієсловами.",
    example: `Congratulations! Your English is now slightly better than your cat's.

Вітаємо! Тепер ваша англійська вже трохи краща, ніж у вашого кота.`,
  },
  {
    id: 2,
    question: `Я витратив усі свої гроші на каву.

I spent all my money ___ coffee.`,
    options: ["for", "on", "to"],
    answer: 1,
    tip: "Конструкція spend money on something (витратити гроші на щось) є стійким виразом в англійській мові.",
    example: `Financially irresponsible. Grammatically perfect.

Фінансово безвідповідально. Граматично бездоганно.`,
  },
  {
    id: 3,
    question: `Я хотів лягти спати раніше, але відкрив Instagram.

I wanted to ___ early, but I opened Instagram.`,
    options: ["go in bed", "go to bed", "go into bed"],
    answer: 1,
    tip: "Фраза go to bed є стійким англійським виразом, де прийменник to вказує напрямок руху.",
    example: `Five minutes on Instagram usually means one hour.

П'ять хвилин в Instagram зазвичай означають одну годину.`,
  },
  {
    id: 5,
    question: `Я вже три рази починав ходити в спортзал цього року.

I ___ going to the gym three times this year.`,
    options: ["started", "have started", "start"],
    answer: 1,
    tip: "Коли говоримо про події протягом періоду, який ще не закінчився (this year), використовуємо Present Perfect.",
    example: `Buying sportswear doesn't count as exercise.

Купити спортивний одяг не рахується за вправу.`,
  },
  {
    id: 6,
    question: `Учора я випадково купив шість бананів.

Yesterday I accidentally ___ six bananas.`,
    options: ["buyed", "bought", "did buy"],
    answer: 1,
    tip: "Дієслово buy (купувати) є неправильним. Його три форми: buy – bought – bought. У часі Past Simple використовується друга форма — bought.",
    example: `Bananas were on sale. That's the only explanation.

Банани були по акції. Іншого пояснення немає.`,
  },
  {
    id: 7,
    question: `Я не можу знайти свої окуляри, бо вони на мені.

I can't find my glasses because I'm ___ them.`,
    options: ["dressing", "wearing", "carrying"],
    answer: 1,
    tip: "Wear означає носити одяг, окуляри чи інші речі на собі.",
    example: `The glasses were closer than expected.

Окуляри були ближче, ніж очікувалося.`,
  },
  {
    id: 8,
    question: `Мені потрібна порада, як перестати купувати речі на Temu.

I need ___ advice on how to stop shopping on Temu.`,
    options: ["an", "some", "the"],
    answer: 1,
    tip: "Слово some використовується перед незліченними іменниками в ствердних реченнях, коли кількість не вказана точно. Some advice українською перекладається як «порада» або «кілька порад».",
    example: `Step one: close the Temu app.

Крок перший: закрий застосунок Temu.`,
  },
  {
    id: 9,
    question: `Якщо моя кава зникне, я буду дуже злий.

If my coffee disappears, I ___ very angry.`,
    options: ["will", "will be", "am"],
    answer: 1,
    tip: "Після допоміжного дієслова will завжди використовується інфінітив дієслова (його початкова форма).",
    example: `This is no longer an English lesson. It's an emergency.

Це вже не урок англійської. Це надзвичайна ситуація.`,
  },
  {
    id: 10,
    question: `Мій кіт ігнорує мене вже дві години.

My cat has been ignoring me ___ two hours.`,
    options: ["since", "for", "from"],
    answer: 1,
    tip: "Коли говоримо про проміжок часу, в англійській мові використовується прийменник for.",
    example: `Apparently, ignoring you is his full-time job.

Схоже, ігнорувати вас — це його робота на повний день.`,
  },
];

export default mistakes;
