"use client";

import { useRef, useState } from "react";
import Hero from "@/components/Hero";
import Quiz from "@/components/Quiz";
import mistakes from "@/data/mistakes";

export default function Home() {
  const lastVisibleOptionRef = useRef<HTMLButtonElement>(null);
  const [, setQuizStarted] = useState(false);

  function handleStartQuiz(event: React.MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    setQuizStarted(true);

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const lastOption = lastVisibleOptionRef.current;

        if (!lastOption) {
          return;
        }

        const rect = lastOption.getBoundingClientRect();
        const bottomMargin = 24;
        const visibleBottom = window.innerHeight - bottomMargin;
        const requiredScroll = Math.max(0, rect.bottom - visibleBottom);

        if (requiredScroll < 2) {
          return;
        }

        window.scrollBy({
          top: requiredScroll,
          behavior: "smooth",
        });
      });
    });
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <Hero onStartQuiz={handleStartQuiz} />

      <section id="quiz" className="scroll-mt-6 px-5 pb-20 sm:px-8 sm:pb-28">
        <div className="mx-auto max-w-3xl">
          <div className="mb-7 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-800">Перевір себе</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">Наскільки впевнено ти говориш англійською?</h2>
          </div>
          <Quiz questions={mistakes} lastVisibleOptionRef={lastVisibleOptionRef} />
        </div>
      </section>
    </main>
  );
}
