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
  {
    id: 4,
    image: "/images/meme/Meme_04.png",
    imageAlt: "Мем про людину, яка ділиться секретною інформацією",
    english: "I don’t ____, I just share information.",
    ukrainian: "Я не розкриваю таємниці, а просто ділюся інформацією.",
    options: [
      { id: "spill-the-beans", label: "spill the beans" },
      {
        id: "break-the-ice",
        label: "break the ice",
        explanation: "розтопити лід (у сенсі подолати початкову напруженість у спілкуванні)",
      },
      {
        id: "shell-corn",
        label: "shell corn",
        explanation: "лущити кукурудзу",
      },
    ],
    answer: 0,
    funNote: "🤫 Spill the beans буквально означає «розсипати боби» 🫘, але насправді це ідіома, яка означає проговоритися або випадково видати чийсь секрет.",
  },
  {
    id: 5,
    image: "/images/meme/Meme_05.png",
    imageAlt: "Мем про незручний момент із помахом рукою",
    english: "That ____ moment when I waved back... only to realize they were waving at someone else.",
    ukrainian: "Той незручний момент, коли я помахала у відповідь... тільки щоб зрозуміти, що махають іншій людині.",
    options: [
      {
        id: "coward",
        label: "coward",
        explanation: "боягуз, людина, якій бракує сміливості",
      },
      { id: "awkward", label: "awkward" },
      {
        id: "award",
        label: "award",
        explanation: "нагорода або премія за заслуги й досягнення",
      },
    ],
    answer: 1,
    funNote: "😬 Історично слово “awkward” означало «рух у неправильному напрямку» або буквально щось на кшталт «рух задом наперед». Спочатку ним описували людей, які поводилися незграбно, ніби задкували або рухалися не в той бік.",
  },
  {
    id: 6,
    image: "/images/meme/Meme_06.png",
    imageAlt: "Мем про нерозуміння жарту",
    english: "I was laughing with everyone, but still ____ about the joke.",
    ukrainian: "Я сміявся разом з усіма, але досі не розумів, у чому жарт.",
    options: [
      {
        id: "useless",
        label: "useless",
        explanation: "марний, непотрібний або такий, від якого немає користі",
      },
      {
        id: "cureless",
        label: "cureless",
        explanation: "невиліковний, такий, що не піддається лікуванню чи виправленню",
      },
      { id: "clueless", label: "clueless" },
    ],
    answer: 2,
    funNote: "🧶 Слово clueless виникло завдяки давньогрецькому міфу про Тесея та Мінотавра. Слово clue (підказка) початково означало «клубок ниток». Саме такий клубок Аріадна дала Тесею, щоб він знайшов вихід із лабіринту. Згодом значення змінилося з фізичної нитки на логічну нитку розслідування. Відповідно, clueless буквально означає «людина, яка втратила нитку й застрягла в лабіринті.",
  },
  {
    id: 7,
    image: "/images/meme/Meme_07.png",
    imageAlt: "Мем про невимкнений мікрофон під час дзвінка в Zoom",
    english: "Zoom calls can be ____ when someone forgets to mute their microphone.",
    ukrainian: "Дзвінки в Zoom можуть бути безжальними, якщо хтось забуде вимкнути мікрофон.",
    options: [
      {
        id: "storage",
        label: "storage",
        explanation: "місце або процес зберігання товарів, речей чи цифрових даних",
      },
      { id: "savage", label: "savage" },
      {
        id: "average",
        label: "average",
        explanation: "середній показник, середня величина або щось звичайне й посереднє",
      },
    ],
    answer: 1,
    funNote: "🔥 Колись слово “savage” означало просто «дикий» і могло стосуватися лісових рослин або тварин. Згодом воно стало образливим словом щодо людей, а сьогодні в сучасному сленгу отримало ще одне значення. Тепер savage часто означає людину, яка настільки безжально чесна, зухвала або ефектна, що це навіть викликає захоплення.",
  },
  {
    id: 8,
    image: "/images/meme/Meme_08.png",
    imageAlt: "Мем про довгий вибір булочки",
    english: "He said he wasn't ____, and then spent 15 minutes choosing a bun.",
    ukrainian: "Він сказав, що не перебірливий, а потім 15 хвилин вибирав булочку.",
    options: [
      { id: "picky", label: "picky" },
      {
        id: "tricky",
        label: "tricky",
        explanation: "складний, хитрий або заплутаний",
      },
      {
        id: "pinky",
        label: "pinky",
        explanation: "мізинець (найменший палець на руці)",
      },
    ],
    answer: 0,
    funNote: "🐦 Слово “picky” походить від дієслова “pick” («вибирати»), але його історія ще давніша. Прагерманський корінь цього слова означав «дзьобати». Тож історично picky людина — це той, хто не бере все підряд, а ніби пташка повільно «видзьобує» лише найкращі шматочки.",
  },
  {
    id: 9,
    image: "/images/meme/Meme_09.png",
    imageAlt: "Мем про саркастичний захват від безкоштовної понаднормової роботи",
    english: "Sure, I'd be ____ to work overtime for free.",
    ukrainian: "Звісно, я буду просто в захваті працювати понаднормово безкоштовно.",
    options: [
      {
        id: "thrived",
        label: "thrived",
        explanation: "процвітав, успішно розвивався або розростався",
      },
      { id: "thrilled", label: "thrilled" },
      {
        id: "chilled",
        label: "chilled",
        explanation: "охолоджений (про їжу або напої) або розслаблений і спокійний",
      },
    ],
    answer: 1,
    funNote: "⚡ Колись слово “thrill” означало буквально «пронизати» або «викликати тремтіння». Згодом це відчуття стали пов'язувати із сильними емоціями, тому сьогодні “thrilled” означає «бути в захваті». А ще англійці дуже люблять використовувати це слово саркастично — коли насправді зовсім не раді.",
  },
  {
    id: 10,
    image: "/images/meme/Meme_10.png",
    imageAlt: "Мем про надмірне хвилювання за людину",
    english: "I don't know why you ____ over me so much, 'cause I'm totally fine.",
    ukrainian: "Я не знаю, чому ти так за мене переживаєш, бо зі мною все супер.",
    options: [
      {
        id: "threat",
        label: "threat",
        explanation: "загроза або небезпека",
      },
      {
        id: "wet",
        label: "wet",
        explanation: "мокрий, вологий або дощовий",
      },
      { id: "fret", label: "fret" },
    ],
    answer: 2,
    funNote: "🧟‍♂️ Колись слово “fret” означало буквально «роз'їдати», «поглинати» або «зжирати». Ним описували, як іржа повільно роз'їдає метал або як дикі звірі розривають здобич. Тож коли англійці кажуть “Don't fret”, вони буквально мають на увазі: «Не дозволяй тривозі з'їдати тебе зсередини».",
  },
];

export default vocabularyMemes;
