"use client";

import Image from "next/image";
import { Mystery_Quest } from "next/font/google";
import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import ContactSection from "@/components/ContactSection";
import WonderlandHeroTitle from "@/components/WonderlandHeroTitle";
import {
  wonderlandQuestions,
  type WonderlandQuestion,
  type WonderlandPhraseTile,
} from "@/data/wonderlandQuestions";
import styles from "./Wonderland.module.css";

const mysteryQuest = Mystery_Quest({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

type AnswerStatus = "building" | "incorrect" | "correct";
type PositionFeedbackPhase = "idle" | "visible" | "fading";

const buttonScrollDuration = 600;

const decorationPreloads = new Map<string, Promise<void>>();

function loadAndDecodeDecoration(src: string) {
  const existingPreload = decorationPreloads.get(src);
  if (existingPreload) return existingPreload;

  const preload = new Promise<void>((resolve) => {
    const image = new window.Image();

    const finish = () => {
      image.onload = null;
      image.onerror = null;
      resolve();
    };

    image.onload = () => {
      if (typeof image.decode !== "function") {
        finish();
        return;
      }

      void image.decode().catch(() => undefined).then(finish);
    };
    image.onerror = finish;
    image.src = src;

    if (image.complete) {
      image.onload = null;
      image.onerror = null;
      if (image.naturalWidth > 0 && typeof image.decode === "function") {
        void image.decode().catch(() => undefined).then(resolve);
      } else {
        resolve();
      }
    }
  });

  decorationPreloads.set(src, preload);
  return preload;
}

function decodeRenderedDecoration(image: HTMLImageElement) {
  if (typeof image.decode !== "function") return Promise.resolve();
  return image.decode().catch(() => undefined);
}

const wonderlandStars = [
  { top: "3%", left: "6%", size: "0.7rem", duration: "5.2s", delay: "-1.4s", color: "var(--wl-gold)" },
  { top: "8%", left: "89%", size: "0.95rem", duration: "7.4s", delay: "-4.1s", color: "var(--wl-violet-bright)", mobileHidden: true },
  { top: "15%", left: "3%", size: "1.1rem", duration: "6.3s", delay: "-2.2s", color: "var(--wl-gold)" },
  { top: "21%", left: "94%", size: "0.65rem", duration: "4.8s", delay: "-3.6s", color: "var(--wl-cyan)" },
  { top: "28%", left: "12%", size: "0.55rem", duration: "7.8s", delay: "-5.3s", color: "var(--wl-violet-bright)", mobileHidden: true },
  { top: "34%", left: "84%", size: "0.85rem", duration: "5.7s", delay: "-0.8s", color: "var(--wl-gold)" },
  { top: "40%", left: "4%", size: "0.75rem", duration: "6.9s", delay: "-4.7s", color: "var(--wl-cyan)" },
  { top: "46%", left: "96%", size: "1rem", duration: "5.1s", delay: "-2.9s", color: "var(--wl-violet-bright)", mobileHidden: true },
  { top: "51%", left: "15%", size: "0.6rem", duration: "7.1s", delay: "-1.7s", color: "var(--wl-gold)" },
  { top: "57%", left: "88%", size: "0.7rem", duration: "4.6s", delay: "-3.1s", color: "var(--wl-cyan)" },
  { top: "62%", left: "2%", size: "0.9rem", duration: "6.5s", delay: "-5.5s", color: "var(--wl-violet-bright)", mobileHidden: true },
  { top: "68%", left: "93%", size: "0.55rem", duration: "7.7s", delay: "-2.5s", color: "var(--wl-gold)" },
  { top: "73%", left: "9%", size: "0.8rem", duration: "5.9s", delay: "-4.3s", color: "var(--wl-cyan)" },
  { top: "78%", left: "86%", size: "1.05rem", duration: "6.1s", delay: "-0.9s", color: "var(--wl-gold)", mobileHidden: true },
  { top: "83%", left: "4%", size: "0.6rem", duration: "4.9s", delay: "-3.8s", color: "var(--wl-violet-bright)" },
  { top: "88%", left: "95%", size: "0.75rem", duration: "7.3s", delay: "-5.1s", color: "var(--wl-cyan)" },
  { top: "93%", left: "14%", size: "0.95rem", duration: "5.5s", delay: "-2.7s", color: "var(--wl-gold)", mobileHidden: true },
  { top: "97%", left: "80%", size: "0.65rem", duration: "6.7s", delay: "-1.2s", color: "var(--wl-violet-bright)" },
  { top: "5%", left: "82%", size: "0.6rem", duration: "6.4s", delay: "-3.3s", color: "var(--wl-cyan)" },
  { top: "11%", left: "11%", size: "0.85rem", duration: "5.6s", delay: "-0.6s", color: "var(--wl-gold)", mobileHidden: true },
  { top: "18%", left: "87%", size: "0.55rem", duration: "7.2s", delay: "-4.6s", color: "var(--wl-violet-bright)" },
  { top: "24%", left: "7%", size: "1rem", duration: "6.0s", delay: "-2.4s", color: "var(--wl-cyan)" },
  { top: "31%", left: "91%", size: "0.7rem", duration: "4.7s", delay: "-1.1s", color: "var(--wl-gold)", mobileHidden: true },
  { top: "37%", left: "16%", size: "0.65rem", duration: "7.5s", delay: "-5.0s", color: "var(--wl-violet-bright)" },
  { top: "43%", left: "81%", size: "0.9rem", duration: "5.4s", delay: "-2.0s", color: "var(--wl-cyan)" },
  { top: "48%", left: "8%", size: "0.55rem", duration: "6.8s", delay: "-4.0s", color: "var(--wl-gold)", mobileHidden: true },
  { top: "54%", left: "94%", size: "0.8rem", duration: "5.8s", delay: "-0.5s", color: "var(--wl-violet-bright)" },
  { top: "60%", left: "11%", size: "1.05rem", duration: "7.0s", delay: "-3.5s", color: "var(--wl-gold)" },
  { top: "65%", left: "85%", size: "0.6rem", duration: "4.9s", delay: "-2.6s", color: "var(--wl-cyan)", mobileHidden: true },
  { top: "70%", left: "5%", size: "0.75rem", duration: "6.2s", delay: "-4.8s", color: "var(--wl-violet-bright)" },
  { top: "76%", left: "97%", size: "0.55rem", duration: "7.6s", delay: "-1.5s", color: "var(--wl-gold)" },
  { top: "81%", left: "13%", size: "0.9rem", duration: "5.3s", delay: "-3.0s", color: "var(--wl-cyan)", mobileHidden: true },
  { top: "86%", left: "83%", size: "0.7rem", duration: "6.6s", delay: "-5.2s", color: "var(--wl-violet-bright)" },
  { top: "90%", left: "6%", size: "0.6rem", duration: "4.5s", delay: "-1.9s", color: "var(--wl-gold)" },
  { top: "95%", left: "90%", size: "1rem", duration: "7.3s", delay: "-3.9s", color: "var(--wl-cyan)", mobileHidden: true },
  { top: "99%", left: "18%", size: "0.65rem", duration: "5.7s", delay: "-0.7s", color: "var(--wl-violet-bright)" },
] as const;

const desktopStarLayout = {
  edge: [
    { top: "4%", left: "3%" }, { top: "13%", left: "96%" }, { top: "22%", left: "5%" },
    { top: "32%", left: "97%" }, { top: "42%", left: "2%" }, { top: "52%", left: "95%" },
    { top: "62%", left: "4%" }, { top: "72%", left: "98%" }, { top: "82%", left: "3%" },
    { top: "91%", left: "96%" }, { top: "98%", left: "6%" },
  ],
  inner: [
    { top: "7%", left: "19%" }, { top: "16%", left: "82%" }, { top: "25%", left: "16%" },
    { top: "35%", left: "85%" }, { top: "45%", left: "20%" }, { top: "55%", left: "80%" },
    { top: "65%", left: "17%" }, { top: "75%", left: "83%" }, { top: "85%", left: "21%" },
    { top: "94%", left: "79%" }, { top: "29%", left: "77%" }, { top: "69%", left: "23%" },
    { top: "88%", left: "86%" },
  ],
  center: [
    { top: "10%", left: "38%" }, { top: "19%", left: "61%" }, { top: "28%", left: "48%" },
    { top: "38%", left: "66%" }, { top: "48%", left: "34%" }, { top: "58%", left: "55%" },
    { top: "68%", left: "42%" }, { top: "78%", left: "63%" }, { top: "89%", left: "37%" },
    { top: "96%", left: "57%" }, { top: "33%", left: "53%" }, { top: "73%", left: "47%" },
  ],
} as const;

const mobileStarLayout = {
  edge: [
    { top: "6%", left: "4%" }, { top: "20%", left: "95%" }, { top: "34%", left: "5%" },
    { top: "49%", left: "96%" }, { top: "64%", left: "4%" }, { top: "79%", left: "95%" },
    { top: "94%", left: "6%" },
  ],
  inner: [
    { top: "3%", left: "19%" }, { top: "11%", left: "81%" }, { top: "18%", left: "22%" },
    { top: "26%", left: "78%" }, { top: "33%", left: "17%" }, { top: "41%", left: "83%" },
    { top: "48%", left: "24%" }, { top: "56%", left: "76%" }, { top: "63%", left: "20%" },
    { top: "71%", left: "80%" }, { top: "78%", left: "16%" }, { top: "86%", left: "84%" },
    { top: "92%", left: "23%" }, { top: "98%", left: "77%" },
  ],
  center: [
    { top: "8%", left: "43%" }, { top: "15%", left: "62%" }, { top: "23%", left: "36%" },
    { top: "30%", left: "57%" }, { top: "38%", left: "46%" }, { top: "45%", left: "66%" },
    { top: "53%", left: "34%" }, { top: "60%", left: "54%" }, { top: "68%", left: "41%" },
    { top: "75%", left: "64%" }, { top: "83%", left: "38%" }, { top: "89%", left: "58%" },
    { top: "95%", left: "47%" }, { top: "43%", left: "52%" }, { top: "73%", left: "50%" },
  ],
} as const;

const desktopStarPositions = [
  ...desktopStarLayout.edge,
  ...desktopStarLayout.inner,
  ...desktopStarLayout.center,
];

const mobileStarPositions = [
  ...mobileStarLayout.edge,
  ...mobileStarLayout.inner,
  ...mobileStarLayout.center,
];

function WonderlandStars() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 block overflow-hidden" aria-hidden="true">
      {wonderlandStars.map((star, index) => (
        <span
          key={`${star.top}-${star.left}`}
          className={`${styles.starFieldStar} absolute block`}
          style={{
            "--star-desktop-top": desktopStarPositions[index].top,
            "--star-desktop-left": desktopStarPositions[index].left,
            "--star-mobile-top": mobileStarPositions[index].top,
            "--star-mobile-left": mobileStarPositions[index].left,
            fontSize: star.size,
            animationDuration: star.duration,
            animationDelay: star.delay,
            color: star.color,
          } as CSSProperties}
        >
          {index % 3 === 0 ? "✦" : "⋆"}
        </span>
      ))}
    </div>
  );
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function scrollByWithDuration(distance: number, duration: number) {
  if (prefersReducedMotion()) {
    window.scrollBy({ top: distance, behavior: "auto" });
    return;
  }

  const startPosition = window.scrollY;
  const startTime = performance.now();

  function animate(currentTime: number) {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    window.scrollTo({ top: startPosition + distance * easedProgress });

    if (progress < 1) window.requestAnimationFrame(animate);
  }

  window.requestAnimationFrame(animate);
}

function shuffleOrder(ids: string[]) {
  const shuffled = [...ids];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  if (shuffled.length > 1 && shuffled.every((id, index) => id === ids[index])) {
    shuffled.push(shuffled.shift() as string);
  }

  return shuffled;
}

function unsolvedOrder(ids: string[]) {
  if (ids.length < 2) return [...ids];
  return [...ids.slice(1), ids[0]];
}

function WhiteRabbitMarker({ progress, totalCount }: { progress: number; totalCount: number }) {
  const top = 8 + (Math.min(progress, totalCount) / totalCount) * 82;

  return (
    <span
      aria-hidden="true"
      className={`${styles.rabbit} absolute left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 text-2xl drop-shadow-md`}
      style={{ top: `${top}%` }}
    >
      🐇
    </span>
  );
}

function WonderlandMap({ progress, totalCount }: { progress: number; totalCount: number }) {
  return (
    <aside className={`${styles.panel} relative min-h-[360px] overflow-hidden rounded-[2rem] p-6 sm:p-8`} aria-label="Маршрут подорожі">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-200">Journey map</p>
          <h2 className={`${styles.displaySerif} mt-2 text-2xl text-white`}>Through Wonderland</h2>
        </div>
        <span className="rounded-full border border-violet-300/30 bg-violet-400/10 px-3 py-1 text-xs font-semibold text-violet-200">
          {progress}/{totalCount}
        </span>
      </div>

      <div className="relative mx-auto mt-8 h-60 max-w-sm">
        <div className={`${styles.mapPath} absolute bottom-4 left-1/2 top-4 w-px -translate-x-1/2 opacity-70`} aria-hidden="true" />
        <WhiteRabbitMarker progress={progress} totalCount={totalCount} />

        <div className="absolute left-[4%] top-0 w-[42%] rounded-2xl border border-violet-300/25 bg-violet-400/10 p-3">
          <span className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-violet-200">Start</span>
          <p className={`${styles.displaySerif} mt-1 text-base text-white`}>The Garden Gate</p>
        </div>
        <div className="absolute right-[4%] top-[40%] w-[42%] rounded-2xl border border-cyan-300/25 bg-cyan-400/10 p-3">
          <span className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-cyan-200">Location I</span>
          <p className={`${styles.displaySerif} mt-1 text-base text-white`}>Rabbit Hole</p>
        </div>
        <div className="absolute bottom-0 left-[4%] w-[42%] rounded-2xl border border-amber-300/25 bg-amber-300/10 p-3">
          <span className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-amber-200">Location II</span>
          <p className={`${styles.displaySerif} mt-1 text-base text-white`}>Tea Party</p>
        </div>
      </div>
    </aside>
  );
}

function WonderlandHero({
  completedCount,
  progress,
  totalCount,
  onStart,
}: {
  completedCount: number;
  progress: number;
  totalCount: number;
  onStart: () => void;
}) {
  return (
    <header className="mx-auto max-w-6xl px-5 pb-20 pt-20 text-center sm:px-8 sm:pb-28 sm:pt-24">
      <div className="mx-auto max-w-5xl">
        <div className="relative z-20 mx-auto w-fit px-8 sm:px-14">
          <span className={`${styles.sparkle} absolute left-1 top-[18%] z-0 text-xl sm:left-3 sm:text-2xl`} style={{ animationDuration: "2.8s", animationDelay: "-0.7s" }} aria-hidden="true">✦</span>
          <span className={`${styles.sparkle} absolute right-1 top-[8%] z-0 text-sm sm:right-5 sm:text-lg`} style={{ animationDuration: "3.6s", animationDelay: "-2.1s" }} aria-hidden="true">⋆</span>
          <span className={`${styles.sparkle} absolute bottom-[17%] right-3 z-0 text-lg text-violet-300 sm:right-7 sm:text-xl`} style={{ animationDuration: "4.2s", animationDelay: "-1.4s" }} aria-hidden="true">✦</span>
          <span className={`${styles.sparkle} absolute -left-1 bottom-[8%] z-0 text-xs sm:left-2 sm:text-sm`} style={{ animationDuration: "3.1s", animationDelay: "-2.6s" }} aria-hidden="true">⋆</span>
          <span className={`${styles.sparkle} absolute left-[12%] top-[-8%] z-0 text-[0.65rem] sm:text-xs`} style={{ animationDuration: "4.5s", animationDelay: "-3.3s" }} aria-hidden="true">✦</span>
          <span className={`${styles.sparkle} absolute -right-1 top-[48%] z-0 text-xs text-violet-300 sm:right-1 sm:text-base`} style={{ animationDuration: "3.8s", animationDelay: "-0.9s" }} aria-hidden="true">⋆</span>
          <span className={`${styles.sparkle} absolute left-[17%] top-[45%] z-0 text-[0.6rem] sm:text-xs`} style={{ animationDuration: "2.6s", animationDelay: "-1.8s" }} aria-hidden="true">⋆</span>
          <span className={`${styles.sparkle} absolute right-[16%] top-[43%] z-0 text-[0.65rem] text-violet-300 sm:text-sm`} style={{ animationDuration: "4s", animationDelay: "-2.9s" }} aria-hidden="true">✦</span>
          <WonderlandHeroTitle
            className={`${styles.aliceTitleSvg} relative z-20 text-[clamp(2.55rem,7.8vw,5.4rem)]`}
          />
        </div>
        <p className="mx-auto mt-10 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
          Складайте англійські речення, відкривайте їхні приховані значення та рухайтеся далі Країною див.
        </p>
        <p className="mt-5 text-sm font-medium text-cyan-100">Розташуйте слова у правильному порядку.</p>
        <button
          type="button"
          onClick={onStart}
          className="mb-[10px] mt-10 inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-violet-300/30 bg-violet-600 px-6 py-3 text-base font-bold text-white shadow-lg shadow-violet-950/25 transition duration-300 hover:scale-[1.02] hover:bg-violet-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300 motion-reduce:transform-none motion-reduce:transition-none sm:mb-[14px] sm:mt-12 sm:w-auto"
        >
          Почати пригоду
        </button>

        <div className={`${styles.panelSoft} mt-8 hidden max-w-xl rounded-2xl p-5`} aria-hidden="true">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Прогрес подорожі</p>
              <p className="mt-1 text-sm text-slate-200">Відкрито локацій: {completedCount} з {totalCount}</p>
            </div>
            <span className={`${styles.displaySerif} text-2xl text-amber-200`}>{Math.round((completedCount / totalCount) * 100)}%</span>
          </div>
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-950/70">
            <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-300" style={{ width: `${(completedCount / totalCount) * 100}%` }} />
          </div>
        </div>
      </div>

      <div className="hidden" aria-hidden="true">
        <WonderlandMap progress={progress} totalCount={totalCount} />
      </div>
    </header>
  );
}

type WordBankProps = {
  words: WonderlandPhraseTile[];
  translation: string;
  locked: boolean;
  onSelect: (wordId: string) => void;
  onDragStart: (event: React.DragEvent<HTMLButtonElement>, wordId: string) => void;
  onDropWord: (wordId: string) => void;
};

function WordBank({ words, translation, locked, onSelect, onDragStart, onDropWord }: WordBankProps) {
  return (
    <div
      className={`${styles.panelSoft} mt-7 min-h-24 rounded-2xl p-4 sm:p-5`}
      data-testid="word-bank"
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        event.preventDefault();
        const wordId = event.dataTransfer.getData("text/wonderland-word");
        if (wordId) onDropWord(wordId);
      }}
    >
      {translation && (
        <div className="mb-3">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Складіть англійською речення:</p>
          <p className="mt-1 text-sm leading-6 text-slate-300">“{translation}”</p>
        </div>
      )}
      <div className="flex flex-wrap gap-2.5">
        {words.map((word) => (
          <button
            key={word.id}
            type="button"
            draggable={!locked}
            disabled={locked}
            onClick={() => onSelect(word.id)}
            onDragStart={(event) => onDragStart(event, word.id)}
            className={`${styles.control} inline-flex min-h-12 items-center justify-center rounded-xl px-4 py-2 text-base font-bold text-white transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300 disabled:cursor-default disabled:opacity-60 motion-reduce:transition-none`}
            aria-label={`Додати слово ${word.text}`}
          >
            {word.text}
          </button>
        ))}
      </div>
    </div>
  );
}

type AnswerSlotsProps = {
  slots: Array<string | null>;
  positionFeedback: boolean[] | null;
  wordById: Map<string, WonderlandPhraseTile>;
  endingPunctuation: WonderlandQuestion["endingPunctuation"];
  locked: boolean;
  status: AnswerStatus;
  positionFeedbackPhase: PositionFeedbackPhase;
  onReturn: (slotIndex: number) => void;
  onDropWord: (wordId: string, slotIndex: number) => void;
  onDragStart: (event: React.DragEvent<HTMLButtonElement>, wordId: string) => void;
};

function AnswerSlots({
  slots,
  positionFeedback,
  wordById,
  endingPunctuation,
  locked,
  status,
  positionFeedbackPhase,
  onReturn,
  onDropWord,
  onDragStart,
}: AnswerSlotsProps) {
  const statusClasses = status === "correct"
    ? "border-emerald-400/60 bg-emerald-900/50"
    : status === "incorrect"
      ? "border-rose-400/60 bg-rose-900/45"
      : "border-slate-500/70 bg-slate-800/55";

  return (
    <div
      className={`${styles.panelSoft} mt-6 rounded-2xl p-4 transition-colors sm:p-5 ${statusClasses}`}
      role="group"
      aria-label="Ваше речення"
      data-testid="answer-slots"
    >
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Ваше речення</p>
      <div className="flex flex-wrap gap-2.5">
        {slots.map((wordId, index) => {
          const word = wordId ? wordById.get(wordId) : undefined;
          const positionFeedbackClasses = positionFeedbackPhase === "visible" && positionFeedback
            ? positionFeedback[index]
              ? styles.positionCorrect
              : styles.positionIncorrect
            : "";
          const positionFeedbackTransitionClass = positionFeedbackPhase !== "idle"
            ? styles.positionFeedbackTransition
            : "";

          if (!word) {
            return (
              <div
                key={`empty-${index}`}
                className="min-h-12 min-w-[4.25rem] rounded-xl border-2 border-dashed border-slate-400/65 bg-slate-700/55"
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault();
                  const droppedId = event.dataTransfer.getData("text/wonderland-word");
                  if (droppedId) onDropWord(droppedId, index);
                }}
                aria-hidden="true"
              />
            );
          }

          return (
            <button
              key={word.id}
              type="button"
              draggable={!locked}
              disabled={locked}
              onClick={() => onReturn(index)}
              onDragStart={(event) => onDragStart(event, word.id)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                const droppedId = event.dataTransfer.getData("text/wonderland-word");
                if (droppedId) onDropWord(droppedId, index);
              }}
              className={`${styles.control} ${positionFeedbackTransitionClass} ${positionFeedbackClasses} inline-flex min-h-12 min-w-[4.25rem] items-center justify-center rounded-xl px-4 py-2 text-base font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300 disabled:cursor-default`}
              aria-label={locked ? word.text : `Повернути слово ${word.text}`}
            >
              {word.text}
            </button>
          );
        })}
        <span className="relative -top-[15px] self-end text-2xl font-bold leading-none text-white">
          {endingPunctuation}
        </span>
      </div>
    </div>
  );
}

type MagicalFactCardProps = {
  question: WonderlandQuestion;
  onContinue: () => void;
  continueButtonRef: React.RefObject<HTMLButtonElement | null>;
};

function MagicalFactCard({ question, onContinue, continueButtonRef }: MagicalFactCardProps) {
  if (question.curiousFactText.length === 0) {
    return (
      <button
        ref={continueButtonRef}
        type="button"
        onClick={onContinue}
        className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl border border-violet-300/30 bg-violet-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-violet-950/20 transition hover:bg-violet-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300 motion-reduce:transition-none"
      >
        Далі за Кроликом
      </button>
    );
  }

  return (
    <aside className={`${styles.panel} mt-7 rounded-3xl border-amber-300/30 p-5 text-slate-200 sm:p-7`}>
      <h3 className={`${mysteryQuest.className} ${styles.wonderlandChapterText} text-2xl`}>{question.curiousFactTitle}</h3>
      <div className="mt-4 space-y-4 text-sm leading-6 sm:text-base sm:leading-7">
        {question.curiousFactText.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        {question.curiousFactExample && (
          <div className={`${styles.panelSoft} rounded-2xl p-4`}>
            <p className="font-bold text-violet-300">{question.curiousFactExample.english}</p>
            <p className="mt-1 text-slate-300">{question.curiousFactExample.ukrainian}</p>
          </div>
        )}
      </div>
      <button
        ref={continueButtonRef}
        type="button"
        onClick={onContinue}
        className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl border border-violet-300/30 bg-violet-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-violet-950/20 transition hover:bg-violet-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300 motion-reduce:transition-none"
      >
        Далі за Кроликом
      </button>
    </aside>
  );
}

type WonderlandSentenceCardProps = {
  question: WonderlandQuestion;
  onCorrect: (questionId: string) => void;
  onContinue: () => void;
};

type WonderlandChapterHeadingProps = {
  chapterNumber: number;
  title: string;
  countLabel: string;
};

function WonderlandChapterHeading({ chapterNumber, title, countLabel }: WonderlandChapterHeadingProps) {
  return (
    <div className="flex min-h-16 items-baseline justify-between gap-5 sm:gap-7">
      <div className="flex min-w-0 items-center gap-3">
        <span className={`${styles.wonderlandChapterBadge} inline-flex size-9 shrink-0 items-center justify-center rounded-full`}>
          <span className={`${mysteryQuest.className} ${styles.wonderlandChapterText} text-[0.9375rem] leading-none`}>
            {String(chapterNumber).padStart(2, "0")}
          </span>
        </span>
        <h2 className={`${mysteryQuest.className} ${styles.wonderlandChapterText} min-w-0 text-xl sm:text-2xl`}>
          {title}
        </h2>
      </div>
      <span className="shrink-0 rounded-full border border-cyan-300/25 bg-cyan-400/10 px-3 py-1.5 text-xs font-semibold text-cyan-100">
        {countLabel}
      </span>
    </div>
  );
}

function WonderlandSentenceCard({ question, onCorrect, onContinue }: WonderlandSentenceCardProps) {
  const isFirstCard = question.unlockOrder === 1;
  const phraseIds = useMemo(() => question.phraseTiles.map((tile) => tile.id), [question.phraseTiles]);
  const [availableIds, setAvailableIds] = useState(() => unsolvedOrder(phraseIds));
  const [slots, setSlots] = useState<Array<string | null>>(() => Array(question.phraseTiles.length).fill(null));
  const [status, setStatus] = useState<AnswerStatus>("building");
  const [positionFeedbackPhase, setPositionFeedbackPhase] = useState<PositionFeedbackPhase>("idle");
  const [positionFeedback, setPositionFeedback] = useState<boolean[] | null>(null);
  const [locked, setLocked] = useState(false);
  const [showFact, setShowFact] = useState(false);
  const [isDecorationReady, setIsDecorationReady] = useState(isFirstCard);
  const revealTimer = useRef<number | null>(null);
  const feedbackHoldTimer = useRef<number | null>(null);
  const feedbackClearTimer = useRef<number | null>(null);
  const feedbackSequence = useRef(0);
  const pendingCompleteEvaluation = useRef(false);
  const continueButtonRef = useRef<HTMLButtonElement>(null);
  const decorationImageRef = useRef<HTMLImageElement>(null);
  const wordById = useMemo(() => new Map(question.phraseTiles.map((tile) => [tile.id, tile])), [question.phraseTiles]);
  useEffect(() => () => {
    feedbackSequence.current += 1;
    if (revealTimer.current !== null) window.clearTimeout(revealTimer.current);
    if (feedbackHoldTimer.current !== null) window.clearTimeout(feedbackHoldTimer.current);
    if (feedbackClearTimer.current !== null) window.clearTimeout(feedbackClearTimer.current);
  }, []);

  useEffect(() => {
    const shuffleTimer = window.setTimeout(() => {
      setAvailableIds(shuffleOrder(phraseIds));
    }, 0);

    return () => window.clearTimeout(shuffleTimer);
  }, [phraseIds]);

  useEffect(() => {
    if (isFirstCard || !question.decoration) return;

    const image = decorationImageRef.current;
    if (!image) return;

    let isCurrent = true;

    const markReady = async () => {
      await decodeRenderedDecoration(image);
      if (isCurrent) setIsDecorationReady(true);
    };

    const handleLoad = () => {
      void markReady();
    };
    const handleError = () => {
      if (isCurrent) setIsDecorationReady(true);
    };

    if (image.complete) {
      if (image.naturalWidth > 0) void markReady();
      else handleError();
    } else {
      image.addEventListener("load", handleLoad, { once: true });
      image.addEventListener("error", handleError, { once: true });
    }

    return () => {
      isCurrent = false;
      image.removeEventListener("load", handleLoad);
      image.removeEventListener("error", handleError);
    };
  }, [isFirstCard, question.decoration, question.id]);

  useEffect(() => {
    if (status !== "correct" || !showFact) return;

    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        const continueButton = continueButtonRef.current;
        if (!continueButton) return;

        const buttonBounds = continueButton.getBoundingClientRect();
        const isFullyVisible = buttonBounds.top >= 0 && buttonBounds.bottom <= window.innerHeight;
        if (isFullyVisible) return;

        const bottomMargin = 32;
        const requiredScrollDistance = buttonBounds.bottom - window.innerHeight + bottomMargin;
        if (requiredScrollDistance <= 0) return;

        scrollByWithDuration(requiredScrollDistance, buttonScrollDuration);
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, [showFact, status]);

  function cancelTemporaryFeedback() {
    feedbackSequence.current += 1;
    pendingCompleteEvaluation.current = false;
    if (feedbackHoldTimer.current !== null) {
      window.clearTimeout(feedbackHoldTimer.current);
      feedbackHoldTimer.current = null;
    }
    if (feedbackClearTimer.current !== null) {
      window.clearTimeout(feedbackClearTimer.current);
      feedbackClearTimer.current = null;
    }
    setPositionFeedbackPhase("idle");
    setPositionFeedback(null);
  }

  useEffect(() => {
    if (!pendingCompleteEvaluation.current) return;
    pendingCompleteEvaluation.current = false;
    if (slots.some((slot) => slot === null)) return;

    const evaluationFrame = window.requestAnimationFrame(() => {
      const completeFeedback = slots.map((wordId, index) => wordId === phraseIds[index]);

      if (completeFeedback.every(Boolean)) {
        cancelTemporaryFeedback();
        setStatus("correct");
        setLocked(true);
        onCorrect(question.id);
        revealTimer.current = window.setTimeout(() => setShowFact(true), prefersReducedMotion() ? 0 : 550);
        return;
      }

      feedbackSequence.current += 1;
      setPositionFeedback(completeFeedback);
      setStatus("incorrect");
      setPositionFeedbackPhase("visible");
    });

    return () => window.cancelAnimationFrame(evaluationFrame);
  }, [onCorrect, phraseIds, question.id, slots]);

  useEffect(() => {
    if (positionFeedbackPhase !== "visible") return;
    const sequence = feedbackSequence.current;

    feedbackHoldTimer.current = window.setTimeout(() => {
      if (feedbackSequence.current !== sequence) return;
      setPositionFeedbackPhase("fading");
      feedbackHoldTimer.current = null;
    }, 1000);

    return () => {
      if (feedbackHoldTimer.current !== null) {
        window.clearTimeout(feedbackHoldTimer.current);
        feedbackHoldTimer.current = null;
      }
    };
  }, [positionFeedbackPhase]);

  useEffect(() => {
    if (positionFeedbackPhase !== "fading") return;
    const sequence = feedbackSequence.current;
    const fadeDuration = prefersReducedMotion() ? 0 : 2000;

    feedbackClearTimer.current = window.setTimeout(() => {
      if (feedbackSequence.current !== sequence) return;
      setPositionFeedbackPhase("idle");
      setPositionFeedback(null);
      setStatus("building");
      feedbackClearTimer.current = null;
    }, fadeDuration);

    return () => {
      if (feedbackClearTimer.current !== null) {
        window.clearTimeout(feedbackClearTimer.current);
        feedbackClearTimer.current = null;
      }
    };
  }, [positionFeedbackPhase]);

  function applyAnswer(nextSlots: Array<string | null>, nextAvailableIds: string[]) {
    const isComplete = nextSlots.every((slot) => slot !== null);
    const orderChanged = nextSlots.some((wordId, index) => wordId !== slots[index]);

    setSlots(nextSlots);
    setAvailableIds(nextAvailableIds);

    if (!isComplete) {
      cancelTemporaryFeedback();
      setStatus("building");
      return;
    }

    if (!orderChanged) {
      return;
    }

    const isCorrect = nextSlots.every((wordId, index) => wordId === phraseIds[index]);
    if (isCorrect) {
      cancelTemporaryFeedback();
      setStatus("correct");
      setLocked(true);
      onCorrect(question.id);
      revealTimer.current = window.setTimeout(() => setShowFact(true), prefersReducedMotion() ? 0 : 550);
      return;
    }

    cancelTemporaryFeedback();
    pendingCompleteEvaluation.current = true;
    setStatus("building");
  }

  function placeWord(wordId: string) {
    if (locked) return;
    const emptyIndex = slots.findIndex((slot) => slot === null);
    if (emptyIndex === -1 || !availableIds.includes(wordId)) return;

    const nextSlots = [...slots];
    nextSlots[emptyIndex] = wordId;
    applyAnswer(nextSlots, availableIds.filter((id) => id !== wordId));
  }

  function returnWord(slotIndex: number) {
    if (locked) return;
    const wordId = slots[slotIndex];
    if (!wordId) return;

    const nextSlots = [...slots];
    nextSlots[slotIndex] = null;
    applyAnswer(nextSlots, [...availableIds, wordId]);
  }

  function dropWordOnSlot(wordId: string, targetIndex: number) {
    if (locked || !wordById.has(wordId)) return;
    const sourceIndex = slots.indexOf(wordId);
    const fromBank = sourceIndex === -1;
    if (fromBank && !availableIds.includes(wordId)) return;
    if (sourceIndex === targetIndex) return;

    const nextSlots = [...slots];
    const displacedId = nextSlots[targetIndex];
    if (sourceIndex >= 0) nextSlots[sourceIndex] = displacedId;
    nextSlots[targetIndex] = wordId;

    let nextAvailable = availableIds.filter((id) => id !== wordId);
    if (fromBank && displacedId) nextAvailable = [...nextAvailable, displacedId];
    applyAnswer(nextSlots, nextAvailable);
  }

  function dropWordInBank(wordId: string) {
    if (locked) return;
    const sourceIndex = slots.indexOf(wordId);
    if (sourceIndex < 0) return;
    returnWord(sourceIndex);
  }

  function startDragging(event: React.DragEvent<HTMLButtonElement>, wordId: string) {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/wonderland-word", wordId);
  }

  const availableWords = availableIds.map((id) => wordById.get(id)).filter((word): word is WonderlandPhraseTile => Boolean(word));
  const feedback = status === "correct"
    ? "✨ Речення складено правильно. Шлях відкрито!"
    : status === "incorrect"
      ? "↺ Майже! Спробуйте змінити порядок слів."
      : "";

  return (
    <div className="relative overflow-visible">
      {question.decoration && (
        <div
          className={`${styles.decoration} pointer-events-none absolute top-0 ${
            question.decoration.side === "right"
              ? "right-0"
              : "left-0"
          }`}
          data-side={question.decoration.side}
          style={{
            "--decoration-desktop-width": `${question.decoration.desktop.width}px`,
            "--decoration-desktop-x": `${question.decoration.desktop.x}px`,
            "--decoration-desktop-y": `${question.decoration.desktop.y}px`,
            "--decoration-mobile-width": `${question.decoration.mobile.width}px`,
            "--decoration-mobile-x": `${question.decoration.mobile.x}px`,
            "--decoration-mobile-y": `${question.decoration.mobile.y}px`,
            opacity: question.decoration.opacity,
            zIndex: question.decoration.zIndex ?? 0,
          } as CSSProperties}
          aria-hidden="true"
        >
          <Image
            key={question.id}
            ref={decorationImageRef}
            src={question.decoration.src}
            alt=""
            width={question.decoration.desktop.width}
            height={question.decoration.desktop.width}
            sizes={`(min-width: 768px) ${question.decoration.desktop.width}px, ${question.decoration.mobile.width}px`}
            loading="eager"
            unoptimized
            className={`${styles.decorationImage} ${
              isFirstCard
                ? styles.decorationImageImmediate
                : isDecorationReady
                  ? styles.decorationImageActive
                  : ""
            } h-auto w-full`}
            style={{
              transform: [
                `rotate(${question.decoration.side === "left" ? -15 : 15}deg)`,
                question.decoration.flipX ? "scaleX(-1)" : "",
              ].filter(Boolean).join(" "),
            }}
          />
        </div>
      )}
      <section
        id={question.id}
        data-testid={`journey-step-${question.id}`}
        className={`${styles.panel} relative z-10 scroll-mt-8 overflow-hidden rounded-[2rem] p-5 sm:p-8 md:p-10`}
        style={question.decoration ? { backgroundColor: "var(--wl-panel)" } : undefined}
      >
        <div>
        <WonderlandChapterHeading
          chapterNumber={question.number}
          title={question.title}
          countLabel={`${question.wordCount} слів`}
        />

        <WordBank
          words={availableWords}
          translation={question.translationUk}
          locked={locked}
          onSelect={placeWord}
          onDragStart={startDragging}
          onDropWord={dropWordInBank}
        />
        <AnswerSlots
          slots={slots}
          positionFeedback={positionFeedback}
          wordById={wordById}
          endingPunctuation={question.endingPunctuation}
          locked={locked}
          status={status}
          positionFeedbackPhase={positionFeedbackPhase}
          onReturn={returnWord}
          onDropWord={dropWordOnSlot}
          onDragStart={startDragging}
        />

        <div className="mt-4 flex min-h-7 flex-wrap items-center justify-between gap-3" aria-live="polite" aria-atomic="true">
          {feedback && (
            <p className={`text-sm font-semibold ${status === "correct" ? "text-emerald-300" : "text-rose-300"}`}>
              {feedback}
            </p>
          )}
        </div>

        {status === "correct" && (
          <div className={`${styles.success} pointer-events-none mx-auto mb-5 mt-4 h-px w-96 max-w-full rounded-full bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300`} aria-hidden="true" />
        )}
        {showFact && (
          <MagicalFactCard
            question={question}
            onContinue={onContinue}
            continueButtonRef={continueButtonRef}
          />
        )}
        </div>
      </section>
    </div>
  );
}

function WonderlandCompletion() {
  return (
    <section
      className={`${styles.panel} rounded-[2rem] p-7 text-center sm:p-10`}
      data-testid="wonderland-completion"
    >
      <div className="text-3xl" aria-hidden="true">🗝 ✨</div>
      <h2 className={`${styles.displaySerif} mt-4 text-3xl text-white sm:text-4xl`}>
        Вітаємо, ви пройшли весь шлях<br />крізь Країну Див
      </h2>
      <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-300">
        Ви склали всі речення та відкрили їхні приховані значення.
      </p>
    </section>
  );
}

export default function AliceWonderlandTest() {
  const orderedQuestions = useMemo(
    () => [...wonderlandQuestions].sort((first, second) => first.unlockOrder - second.unlockOrder),
    [],
  );
  const [unlockedOrder, setUnlockedOrder] = useState(orderedQuestions[0]?.unlockOrder ?? 1);
  const [completedIds, setCompletedIds] = useState<string[]>([]);
  const [rabbitProgress, setRabbitProgress] = useState(0);
  const [journeyComplete, setJourneyComplete] = useState(false);
  const [quizAttempt, setQuizAttempt] = useState(0);
  const [isRestarting, setIsRestarting] = useState(false);
  const cardRefs = useRef(new Map<number, HTMLDivElement>());
  const completionRef = useRef<HTMLDivElement>(null);
  const quizStartRef = useRef<HTMLDivElement>(null);
  const restartFinalizeTimer = useRef<number | null>(null);
  const restartScrollPending = useRef(false);
  const visibleQuestions = isRestarting
    ? orderedQuestions
    : orderedQuestions.filter((question) => question.unlockOrder <= unlockedOrder);

  useEffect(() => {
    if (!restartScrollPending.current) return;
    restartScrollPending.current = false;

    const firstFrame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const quizStart = quizStartRef.current;
        if (!quizStart) return;

        const stickyHeaderOffset = 24;
        scrollByWithDuration(
          quizStart.getBoundingClientRect().top - stickyHeaderOffset,
          buttonScrollDuration,
        );

        const resetDelay = prefersReducedMotion() ? 0 : buttonScrollDuration;
        restartFinalizeTimer.current = window.setTimeout(() => {
          setIsRestarting(false);
          restartFinalizeTimer.current = null;
        }, resetDelay);
      });
    });

    return () => window.cancelAnimationFrame(firstFrame);
  }, [quizAttempt]);

  useEffect(() => () => {
    if (restartFinalizeTimer.current !== null) {
      window.clearTimeout(restartFinalizeTimer.current);
    }
  }, []);

  useEffect(() => {
    const decorationSources = orderedQuestions
      .map((question) => question.decoration?.src)
      .filter((src): src is string => Boolean(src));

    decorationSources.forEach((src) => {
      void loadAndDecodeDecoration(src);
    });
  }, [orderedQuestions]);

  function scrollTo(getElement: () => HTMLDivElement | null | undefined, distanceRatio = 1) {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const element = getElement();
        if (!element) return;

        scrollByWithDuration(
          element.getBoundingClientRect().top * distanceRatio,
          buttonScrollDuration,
        );
      });
    });
  }

  function handleCorrect(questionId: string) {
    setCompletedIds((ids) => ids.includes(questionId) ? ids : [...ids, questionId]);
    const completedIndex = orderedQuestions.findIndex((question) => question.id === questionId);
    setRabbitProgress(completedIndex + 1);
  }

  function handleStart() {
    const firstQuestion = orderedQuestions[0];
    if (!firstQuestion) return;

    const firstCard = cardRefs.current.get(firstQuestion.unlockOrder);
    if (!firstCard) return;

    const cardTopOffset = 24;
    scrollByWithDuration(
      firstCard.getBoundingClientRect().top - cardTopOffset,
      buttonScrollDuration,
    );
  }

  function handleContinue(question: WonderlandQuestion) {
    const nextQuestion = orderedQuestions.find((candidate) => candidate.unlockOrder > question.unlockOrder);

    if (nextQuestion) {
      setUnlockedOrder((currentOrder) => Math.max(currentOrder, nextQuestion.unlockOrder));
      scrollTo(() => cardRefs.current.get(nextQuestion.unlockOrder), 0.75);
      return;
    }

    setJourneyComplete(true);
    scrollTo(() => completionRef.current);
  }

  function handleRestart() {
    if (restartFinalizeTimer.current !== null) {
      window.clearTimeout(restartFinalizeTimer.current);
      restartFinalizeTimer.current = null;
    }

    const firstQuestionOrder = orderedQuestions[0]?.unlockOrder ?? 1;
    restartScrollPending.current = true;
    setIsRestarting(true);
    setUnlockedOrder(firstQuestionOrder);
    setCompletedIds([]);
    setRabbitProgress(0);
    setJourneyComplete(false);
    setQuizAttempt((attempt) => attempt + 1);
  }

  return (
    <main className={`${styles.wonderlandPage} relative overflow-x-hidden`}>
      <WonderlandStars />
      <div className="relative z-10">
        <WonderlandHero
          completedCount={completedIds.length}
          progress={rabbitProgress}
          totalCount={orderedQuestions.length}
          onStart={handleStart}
        />
        <div
          key={quizAttempt}
          ref={quizStartRef}
          className="mx-auto max-w-5xl scroll-mt-24 space-y-20 px-4 pb-24 sm:px-8 sm:pb-32 md:space-y-24"
        >
          {visibleQuestions.map((question) => (
            <div
              key={question.id}
              ref={(element) => {
                if (element) cardRefs.current.set(question.unlockOrder, element);
                else cardRefs.current.delete(question.unlockOrder);
              }}
            >
              <WonderlandSentenceCard
                question={question}
                onCorrect={handleCorrect}
                onContinue={() => handleContinue(question)}
              />
            </div>
          ))}

          {(journeyComplete || isRestarting) && (
            <div ref={completionRef} className="scroll-mt-8">
              <WonderlandCompletion />
              <ContactSection
                currentQuizScore={completedIds.length}
                totalQuestions={orderedQuestions.length}
                theme="wonderland"
                onRestart={handleRestart}
              />
            </div>
          )}

          <p className="sr-only" aria-live="polite">
            Завершено локацій: {completedIds.length} з {orderedQuestions.length}.
          </p>
        </div>
      </div>
    </main>
  );
}
