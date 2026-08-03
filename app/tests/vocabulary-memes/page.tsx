"use client";

import { useRef } from "react";
import VocabularyMemeQuiz from "@/components/VocabularyMemeQuiz";
import vocabularyMemes from "@/data/vocabularyMemes";
import styles from "@/components/vocabulary-memes/VocabularyMemes.module.css";

const abstractDoodles = [
  "↝", "✦", "⚡", "♡", "○", "〰", "✧", "❝", "•••",
  "↪", "✺", "◌", "〽", "♕", "!", "∿", "⊙", "⁕",
];

export default function VocabularyMemesPage() {
  const lastVisibleOptionRef = useRef<HTMLButtonElement>(null);

  function handleStartQuiz(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const lastOption = lastVisibleOptionRef.current;
        if (!lastOption) return;
        const requiredScroll = Math.max(0, lastOption.getBoundingClientRect().bottom - (window.innerHeight - 24));
        if (requiredScroll < 2) return;
        window.scrollBy({ top: requiredScroll, behavior: "smooth" });
      });
    });
  }

  return (
    <main className={`${styles.page} min-h-screen text-slate-950`}>
      <div className={styles.decorations} aria-hidden="true">
        {abstractDoodles.map((doodle, index) => <span key={`${doodle}-${index}`} className={styles.doodle}>{doodle}</span>)}
      </div>
      <div className={styles.content}>
      <section className="relative overflow-hidden px-5 pb-16 pt-8 sm:px-8 sm:pb-24 sm:pt-12">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/60 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur">
            <span className="text-pink-500">✦</span><span className="text-violet-700">Інтерактивний тест</span>
          </span>
          <h1 className="mt-7 text-4xl font-black tracking-tight text-[#111827] sm:text-6xl sm:leading-[1.05]">
            Лексика <span className="whitespace-nowrap">з <span className={styles.gradientText}>мемами</span></span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
            Вивчайте живу англійську лексику через знайомі ситуації та меми.
          </p>
          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-3 gap-3 sm:mt-16 sm:gap-5">
            {[["3", "питання"], ["2 хв", "на проходження"], ["100%", "корисно"]].map(([value, label]) => (
              <div key={label} className="rounded-2xl border border-white/80 bg-white/75 px-3 py-4 text-center shadow-sm backdrop-blur sm:px-5 sm:py-5">
                <p className="text-lg font-extrabold text-slate-950 sm:text-2xl">{value}</p>
                <p className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">{label}</p>
              </div>
            ))}
          </div>
          <a href="#quiz" onClick={handleStartQuiz} className={`${styles.actionButton} mt-8 inline-flex items-center justify-center rounded-2xl px-6 py-4 text-base font-bold text-white transition hover:-translate-y-0.5 focus:outline-none`}>
            Почати тест <span aria-hidden="true" className="ml-2">→</span>
          </a>
        </div>
      </section>

      <section id="quiz" className="scroll-mt-6 px-5 pb-20 sm:px-8 sm:pb-28">
        <div className="mx-auto max-w-3xl">
          <div className="mb-7 text-center">
            <h2 className="text-2xl font-black tracking-tight text-[#111827] sm:text-3xl">
              Вставте <span className={styles.gradientText}>пропущене</span> слово
            </h2>
          </div>
          <VocabularyMemeQuiz questions={vocabularyMemes} lastVisibleOptionRef={lastVisibleOptionRef} />
        </div>
      </section>
      </div>
    </main>
  );
}
