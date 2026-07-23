"use client";

import Image from "next/image";
import { Griffy } from "next/font/google";
import { useEffect, useMemo, useRef, useState } from "react";
import ContactSection from "@/components/ContactSection";
import WonderlandHeroTitle from "@/components/WonderlandHeroTitle";
import {
  wonderlandQuestions,
  type WonderlandQuestion,
  type WonderlandPhraseTile,
} from "@/data/wonderlandQuestions";
import styles from "./Wonderland.module.css";

const griffy = Griffy({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

type AnswerStatus = "building" | "incorrect" | "correct";

const rabbitTopPositions = [8, 50, 90];

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
] as const;

function WonderlandStars() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 hidden overflow-hidden sm:block" aria-hidden="true">
      {wonderlandStars.map((star, index) => (
        <span
          key={`${star.top}-${star.left}`}
          className={`${styles.starFieldStar} absolute ${"mobileHidden" in star && star.mobileHidden ? "hidden sm:block" : "block"}`}
          style={{
            top: star.top,
            left: star.left,
            fontSize: star.size,
            animationDuration: star.duration,
            animationDelay: star.delay,
            color: star.color,
          }}
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

function normalizeAnswerText(value: string) {
  return value
    .trim()
    .toLocaleLowerCase("en")
    .replace(/\s+/g, " ")
    .replace(/[.!?]+$/, "");
}

function WhiteRabbitMarker({ progress }: { progress: number }) {
  const top = rabbitTopPositions[progress];

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

function WonderlandMap({ progress }: { progress: number }) {
  return (
    <aside className={`${styles.panel} relative min-h-[360px] overflow-hidden rounded-[2rem] p-6 sm:p-8`} aria-label="Маршрут подорожі">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-200">Journey map</p>
          <h2 className={`${styles.displaySerif} mt-2 text-2xl text-white`}>Through Wonderland</h2>
        </div>
        <span className="rounded-full border border-violet-300/30 bg-violet-400/10 px-3 py-1 text-xs font-semibold text-violet-200">
          {progress}/2
        </span>
      </div>

      <div className="relative mx-auto mt-8 h-60 max-w-sm">
        <div className={`${styles.mapPath} absolute bottom-4 left-1/2 top-4 w-px -translate-x-1/2 opacity-70`} aria-hidden="true" />
        <WhiteRabbitMarker progress={progress} />

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
  onStart,
}: {
  completedCount: number;
  progress: number;
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
              <p className="mt-1 text-sm text-slate-200">Відкрито локацій: {completedCount} з 2</p>
            </div>
            <span className={`${styles.displaySerif} text-2xl text-amber-200`}>{Math.round((completedCount / 2) * 100)}%</span>
          </div>
          <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-950/70">
            <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-300" style={{ width: `${(completedCount / 2) * 100}%` }} />
          </div>
        </div>
      </div>

      <div className="hidden" aria-hidden="true">
        <WonderlandMap progress={progress} />
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
            aria-label={`Додати слово ${normalizeAnswerText(word.text)}`}
          >
            {normalizeAnswerText(word.text)}
          </button>
        ))}
      </div>
    </div>
  );
}

type AnswerSlotsProps = {
  slots: Array<string | null>;
  wordById: Map<string, WonderlandPhraseTile>;
  locked: boolean;
  status: AnswerStatus;
  onReturn: (slotIndex: number) => void;
  onDropWord: (wordId: string, slotIndex: number) => void;
  onDragStart: (event: React.DragEvent<HTMLButtonElement>, wordId: string) => void;
};

function AnswerSlots({ slots, wordById, locked, status, onReturn, onDropWord, onDragStart }: AnswerSlotsProps) {
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
              className={`${styles.control} inline-flex min-h-12 min-w-[4.25rem] items-center justify-center rounded-xl px-4 py-2 text-base font-bold text-white transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-300 disabled:cursor-default disabled:border-emerald-400/55 disabled:bg-emerald-900/60 motion-reduce:transition-none`}
              aria-label={locked ? normalizeAnswerText(word.text) : `Повернути слово ${normalizeAnswerText(word.text)}`}
            >
              {normalizeAnswerText(word.text)}
            </button>
          );
        })}
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
      <h3 className={`${griffy.className} ${styles.wonderlandChapterText} text-2xl`}>{question.curiousFactTitle}</h3>
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
          <span className={`${griffy.className} ${styles.wonderlandChapterText} text-[0.9375rem] leading-none`}>
            {String(chapterNumber).padStart(2, "0")}
          </span>
        </span>
        <h2 className={`${griffy.className} ${styles.wonderlandChapterText} min-w-0 text-xl sm:text-2xl`}>
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
  const phraseIds = useMemo(() => question.phraseTiles.map((tile) => tile.id), [question.phraseTiles]);
  const [availableIds, setAvailableIds] = useState(() => unsolvedOrder(phraseIds));
  const [slots, setSlots] = useState<Array<string | null>>(() => Array(question.phraseTiles.length).fill(null));
  const [status, setStatus] = useState<AnswerStatus>("building");
  const [locked, setLocked] = useState(false);
  const [showFact, setShowFact] = useState(false);
  const revealTimer = useRef<number | null>(null);
  const continueButtonRef = useRef<HTMLButtonElement>(null);
  const wordById = useMemo(() => new Map(question.phraseTiles.map((tile) => [tile.id, tile])), [question.phraseTiles]);
  const correctPhraseOrder = useMemo(
    () => question.phraseTiles.map((tile) => normalizeAnswerText(tile.text)),
    [question.phraseTiles],
  );

  useEffect(() => () => {
    if (revealTimer.current !== null) window.clearTimeout(revealTimer.current);
  }, []);

  useEffect(() => {
    const shuffleTimer = window.setTimeout(() => {
      setAvailableIds(shuffleOrder(phraseIds));
    }, 0);

    return () => window.clearTimeout(shuffleTimer);
  }, [phraseIds]);

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

        window.scrollBy({
          top: requiredScrollDistance,
          behavior: prefersReducedMotion() ? "auto" : "smooth",
        });
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, [showFact, status]);

  function applyAnswer(nextSlots: Array<string | null>, nextAvailableIds: string[]) {
    setSlots(nextSlots);
    setAvailableIds(nextAvailableIds);

    if (nextSlots.some((slot) => slot === null)) {
      setStatus("building");
      return;
    }

    const selectedPhrases = nextSlots.map((wordId) => normalizeAnswerText(wordById.get(wordId as string)?.text ?? ""));
    const isCorrect = selectedPhrases.every((phrase, index) => phrase === correctPhraseOrder[index])
      && selectedPhrases.join(" ") === normalizeAnswerText(question.normalizedSentence);
    if (!isCorrect) {
      setStatus("incorrect");
      return;
    }

    setStatus("correct");
    setLocked(true);
    onCorrect(question.id);
    revealTimer.current = window.setTimeout(() => setShowFact(true), prefersReducedMotion() ? 0 : 550);
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
          className={`pointer-events-none absolute z-0 ${
            question.decoration.position === "top-right-peek"
              ? "right-0 top-0 w-[27rem] translate-x-[40%] -translate-y-[25%] sm:w-[36rem] md:w-[48rem]"
              : "left-[-150px] top-[-200px] w-[21.6rem] -translate-x-[20%] -translate-y-[18%] -rotate-[15deg] sm:w-[28.8rem] md:w-[38.4rem]"
          }`}
          aria-hidden="true"
        >
          <Image
            src={question.decoration.src}
            alt=""
            width={question.decoration.width}
            height={question.decoration.height}
            sizes="(min-width: 768px) 768px, (min-width: 640px) 576px, 432px"
            className="h-auto w-full"
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
          wordById={wordById}
          locked={locked}
          status={status}
          onReturn={returnWord}
          onDropWord={dropWordOnSlot}
          onDragStart={startDragging}
        />

        <div className="mt-4 min-h-7" aria-live="polite" aria-atomic="true">
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
        Вітаємо, ви пройшли весь шлях<br />крізь Країну Див ✨
      </h2>
      <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-300">
        Ви склали обидва речення та відкрили їхні приховані значення.
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
  const cardRefs = useRef(new Map<number, HTMLDivElement>());
  const completionRef = useRef<HTMLDivElement>(null);

  function scrollTo(getElement: () => HTMLDivElement | null | undefined, distanceRatio = 1) {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const element = getElement();
        if (!element) return;

        window.scrollBy({
          top: element.getBoundingClientRect().top * distanceRatio,
          behavior: prefersReducedMotion() ? "auto" : "smooth",
        });
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
    window.scrollBy({
      top: firstCard.getBoundingClientRect().top - cardTopOffset,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
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

  return (
    <main className={`${styles.wonderlandPage} relative overflow-x-hidden max-sm:outline-2 max-sm:outline-red-500`}>
      <WonderlandStars />
      <div className="relative z-10">
        <WonderlandHero
          completedCount={completedIds.length}
          progress={rabbitProgress}
          onStart={handleStart}
        />
        <div className="mx-auto max-w-5xl space-y-20 px-4 pb-24 sm:px-8 sm:pb-32 md:space-y-24">
          {orderedQuestions.filter((question) => question.unlockOrder <= unlockedOrder).map((question) => (
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

          {journeyComplete && (
            <div ref={completionRef} className="scroll-mt-8">
              <WonderlandCompletion />
              <ContactSection
                currentQuizScore={completedIds.length}
                totalQuestions={orderedQuestions.length}
                theme="wonderland"
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
