"use client";

import type { MouseEventHandler } from "react";

type Props = {
  onStartQuiz: MouseEventHandler<HTMLAnchorElement>;
};

export default function Hero({ onStartQuiz }: Props) {
  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-8 sm:px-8 sm:pb-24 sm:pt-12">
      <div className="absolute inset-x-0 top-0 -z-10 h-[30rem] bg-gradient-to-b from-emerald-100 via-stone-50 to-transparent" />
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-sm font-semibold text-emerald-800 shadow-sm backdrop-blur">
            ✦ Безкоштовний інтерактивний тест
          </span>

          <h1 className="mt-7 text-4xl font-black tracking-tight text-slate-950 sm:text-6xl sm:leading-[1.05]">
            10 типових помилок
            <span className="block bg-gradient-to-r from-emerald-950 via-emerald-800 to-teal-700 bg-clip-text text-transparent">в англійській</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Перевірте себе за кілька хвилин і дізнайтеся, які англійські
            конструкції варто прокачати вже сьогодні.
          </p>

          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-3 gap-3 sm:mt-16 sm:gap-5">
            {[
              ["10", "питань"],
              ["7 хв", "на проходження"],
              ["100%", "корисно"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-white/80 bg-white/75 px-3 py-4 text-center shadow-sm backdrop-blur sm:px-5 sm:py-5">
                <p className="text-lg font-extrabold text-slate-950 sm:text-2xl">{value}</p>
                <p className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">{label}</p>
              </div>
            ))}
          </div>

          <a
            href="#quiz"
            onClick={onStartQuiz}
            className="mt-8 inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-emerald-700/25 transition hover:-translate-y-0.5 hover:bg-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-200"
          >
            Почати тест <span aria-hidden="true" className="ml-2">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
