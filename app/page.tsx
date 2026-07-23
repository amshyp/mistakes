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

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            <Link
              href="/tests/15-common-mistakes"
              className="group flex min-w-0 flex-col rounded-3xl border border-white/80 bg-white/80 p-6 shadow-lg shadow-rose-950/5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-rose-950/10 sm:p-7"
            >
              <span className="w-fit rounded-full bg-orange-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-orange-700">
                Граматика
              </span>
              <h3 className="mt-5 text-2xl font-black leading-tight tracking-tight text-slate-950">
                10 типових помилок в англійській
              </h3>
              <p className="mt-4 flex-1 leading-7 text-slate-600">
                Перевірте, чи не припускаєтеся Ви найпоширеніших помилок у розмовній англійській.
              </p>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-semibold text-slate-500">
                <span>10 запитань</span>
                <span>5–7 хвилин</span>
              </div>
              <span className="mt-7 inline-flex w-fit items-center rounded-2xl bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-md shadow-orange-500/20 transition group-hover:bg-orange-600">
                Пройти тест
              </span>
            </Link>

            <Link
              href="/tests/alice-in-wonderland"
              aria-label="Англійська з Алісою в Країні Див — Почати пригоду"
              className="group relative flex min-w-0 flex-col overflow-hidden rounded-3xl border border-white/80 bg-white/80 p-6 shadow-lg shadow-violet-950/5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-950/10 sm:p-7"
            >
              <span className="pointer-events-none absolute right-7 top-6 animate-pulse text-lg text-violet-400/55 motion-reduce:animate-none" aria-hidden="true">✦</span>
              <span className="pointer-events-none absolute right-16 top-14 animate-pulse text-xs text-pink-400/45 [animation-delay:-1.1s] [animation-duration:3.6s] motion-reduce:animate-none" aria-hidden="true">⋆</span>
              <span className="pointer-events-none absolute bottom-8 right-8 animate-pulse text-sm text-fuchsia-400/40 [animation-delay:-2s] [animation-duration:4.2s] motion-reduce:animate-none" aria-hidden="true">✦</span>

              <span className="relative z-10 w-fit rounded-full bg-violet-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-violet-700">
                ПРИГОДА
              </span>
              <h3 className="relative z-10 mt-5 text-2xl font-black leading-tight tracking-tight text-slate-950">
                Англійська з Алісою в Країні Див
              </h3>
              <p className="relative z-10 mt-4 flex-1 leading-7 text-slate-600">
                Складайте англійські речення з відомих цитат, відкривайте цікаві факти та подорожуйте Країною Див разом з Алісою.
              </p>
              <span className="relative z-10 mt-7 inline-flex w-fit items-center rounded-2xl bg-violet-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-violet-500/20 transition group-hover:bg-violet-700">
                Почати пригоду
              </span>
            </Link>

            {comingSoonTests.map((title) => (
              <article
                key={title}
                className="flex min-w-0 flex-col rounded-3xl border border-white/70 bg-white/55 p-6 opacity-70 shadow-sm backdrop-blur sm:p-7"
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
