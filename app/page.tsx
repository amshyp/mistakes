import Image from "next/image";
import Link from "next/link";

const comingSoonTests = [
  "Прийменники в англійській",
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-gradient-to-br from-[#FFF8E8] via-[#FFE8D9] to-[#FCE7F3] text-slate-950">
      <section className="px-5 pb-14 pt-12 sm:px-8 sm:pb-20 sm:pt-20">
        <div className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/60 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur">
            <span className="text-orange-400">✦</span>
            <span>Інтерактивні тести</span>
          </span>

          <h1 className="mx-auto mt-7 max-w-3xl text-4xl font-black tracking-tight sm:text-6xl sm:leading-[1.05]">
            Вивчайте англійську <span className="bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500 bg-clip-text text-transparent">цікаво</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Обирайте інтерактивні тести, складайте речення, відкривайте цікаві факти та вдосконалюйте англійську крок за кроком.
          </p>
        </div>
      </section>

      <section className="px-5 pb-20 sm:px-8 sm:pb-28">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-7 text-2xl font-black tracking-tight sm:mb-9 sm:text-3xl">Оберіть тест</h2>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            <Link
              href="/tests/15-common-mistakes"
              className="group mx-auto flex w-full max-w-[540px] min-w-0 flex-col rounded-3xl border border-white/80 bg-white/80 p-6 shadow-lg shadow-rose-950/5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-950/10 sm:p-7"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-2xl">
                <Image
                  src="/images/card-mistakes.png"
                  alt="Превʼю тесту «10 типових помилок в англійській»"
                  fill
                  sizes="(max-width: 639px) min(calc(100vw - 40px), 540px), (max-width: 1279px) min(calc(50vw - 42px), 540px), 371px"
                  className="object-cover"
                />
                <span className="absolute left-3 top-3 z-10 w-fit rounded-full border border-[#22C55E] bg-[#16A34A] px-3 py-1 text-xs font-medium uppercase tracking-[0.12em] text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.35)] shadow-[0_8px_18px_rgba(0,0,0,0.16)]">
                  Граматика
                </span>
              </div>
              <h3 className="mt-5 text-2xl font-black leading-tight tracking-tight text-[#111827]">
                10 типових помилок в англійській
              </h3>
              <p className="mt-4 flex-1 leading-7 text-slate-600">
                Перевірте, чи не припускаєтеся Ви найпоширеніших помилок у розмовній англійській.
              </p>
              <span className="mt-7 inline-flex w-fit items-center rounded-2xl bg-gradient-to-r from-[#22C55E] to-[#15803D] px-5 py-3 text-sm font-bold text-white shadow-md shadow-orange-500/20 transition group-hover:from-[#4ADE80] group-hover:to-[#16A34A]">
                Пройти тест
              </span>
            </Link>

            <Link
              href="/tests/vocabulary-memes"
              className="group mx-auto flex w-full max-w-[540px] min-w-0 flex-col rounded-3xl border border-white/80 bg-white/80 p-6 shadow-lg shadow-rose-950/5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-950/10 sm:p-7"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-2xl">
                <Image
                  src="/images/card-meme.png"
                  alt="Превʼю тесту «Лексика з мемами»"
                  fill
                  sizes="(max-width: 639px) min(calc(100vw - 40px), 540px), (max-width: 1279px) min(calc(50vw - 42px), 540px), 371px"
                  className="object-cover"
                />
                <span className="absolute left-3 top-3 z-10 w-fit rounded-full border border-[#EC4899] bg-[#DB2777] px-3 py-1 text-xs font-medium uppercase tracking-[0.12em] text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.35)] shadow-[0_8px_18px_rgba(0,0,0,0.16)]">
                  Лексика
                </span>
              </div>
              <h3 className="mt-5 text-2xl font-black leading-tight tracking-tight text-[#111827]">
                Лексика з мемами
              </h3>
              <p className="mt-4 flex-1 leading-7 text-slate-600">
                Вивчайте цікаві англійські слова за допомогою мемів та коротких інтерактивних тестів.
              </p>
              <span className="mt-7 inline-flex w-fit items-center rounded-2xl bg-gradient-to-r from-[#F43F5E] to-[#EC4899] px-5 py-3 text-sm font-bold text-white shadow-md shadow-orange-500/20 transition group-hover:from-[#FB7185] group-hover:to-[#F472B6]">
                Почати тест
              </span>
            </Link>

            <Link
              href="/tests/alice-in-wonderland"
              aria-label="Англійська з Алісою в Країні Чудес — Почати пригоду"
              className="group mx-auto flex w-full max-w-[540px] min-w-0 flex-col rounded-3xl border border-white/80 bg-white/80 p-6 shadow-lg shadow-violet-950/5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-950/10 sm:p-7"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-2xl">
                <Image
                  src="/images/card-alice.png"
                  alt="Превʼю тесту «Англійська з Алісою в Країні Чудес»"
                  fill
                  sizes="(max-width: 639px) min(calc(100vw - 40px), 540px), (max-width: 1279px) min(calc(50vw - 42px), 540px), 371px"
                  className="object-cover"
                />
                <span className="absolute left-3 top-3 z-10 w-fit rounded-full border border-[#8B5CF6] bg-[#6D28D9] px-3 py-1 text-xs font-medium uppercase tracking-[0.12em] text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.35)] shadow-[0_8px_18px_rgba(0,0,0,0.16)]">
                  ПРИГОДА
                </span>
              </div>
              <h3 className="mt-5 text-2xl font-black leading-tight tracking-tight text-[#111827]">
                Англійська з Алісою в Країні Чудес
              </h3>
              <p className="mt-4 flex-1 leading-7 text-slate-600">
                Складайте англійські речення з відомих цитат та відкривайте цікаві факти разом з Алісою.
              </p>
              <span className="mt-7 inline-flex w-fit items-center rounded-2xl bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] px-5 py-3 text-sm font-bold text-white shadow-md shadow-orange-500/20 transition group-hover:from-[#A78BFA] group-hover:to-[#7C3AED]">
                Почати пригоду
              </span>
            </Link>

            {comingSoonTests.map((title) => (
              <article
                key={title}
                className="mx-auto flex w-full max-w-[540px] min-w-0 flex-col rounded-3xl border border-white/70 bg-white/55 p-6 opacity-70 shadow-sm backdrop-blur sm:p-7"
              >
                <span className="w-fit rounded-full bg-rose-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-rose-500">
                  Незабаром
                </span>
                <h3 className="mt-5 text-2xl font-black leading-tight tracking-tight text-slate-700">
                  {title}
                </h3>
                <p className="mt-4 leading-7 text-slate-500">
                  Новий інтерактивний тест уже готується.
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
