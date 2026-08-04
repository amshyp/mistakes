"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type RefObject } from "react";
import type { VocabularyMemeQuestion } from "@/data/vocabularyMemes";
import styles from "@/components/vocabulary-memes/VocabularyMemes.module.css";

type Props = {
  question: VocabularyMemeQuestion;
  selectedWrongAnswerIds: ReadonlySet<string>;
  isCorrect: boolean;
  onSelectAnswer: (answerIndex: number) => void;
  onNext: () => void;
  isLastQuestion: boolean;
  questionNumber: number;
  totalQuestions: number;
  lastVisibleOptionRef: RefObject<HTMLButtonElement | null>;
};

export default function VocabularyMemeCard({
  question,
  selectedWrongAnswerIds,
  isCorrect,
  onSelectAnswer,
  onNext,
  isLastQuestion,
  questionNumber,
  totalQuestions,
  lastVisibleOptionRef,
}: Props) {
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const [loadedImageSrc, setLoadedImageSrc] = useState(() => questionNumber === 1 ? question.image : "");
  const progress = (questionNumber / totalQuestions) * 100;
  const [sentenceStart, sentenceEnd] = question.english.split("____");
  const blankMaskId = `blank-reveal-${question.id}`;

  useEffect(() => {
    if (!isCorrect) return;

    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        const nextButton = nextButtonRef.current;
        if (!nextButton) return;

        const requiredScroll = nextButton.getBoundingClientRect().bottom - (window.innerHeight - 24);
        if (requiredScroll <= 0) return;

        window.scrollTo({ top: window.scrollY + requiredScroll, behavior: "smooth" });
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, [isCorrect]);

  return (
    <article className={`${styles.quizCard} overflow-hidden rounded-[1.75rem] border`}>
      <div className={`${styles.progressHeader} border-b border-violet-100 px-5 py-5 sm:px-8`}>
        <div className="flex items-center justify-between gap-4 text-sm font-semibold">
          <span className={styles.progressText}>Питання {questionNumber} з {totalQuestions}</span>
          <span className="text-slate-400">{Math.round(progress)}%</span>
        </div>
        <div className={`${styles.progressTrack} mt-3 h-2 overflow-hidden rounded-full`}>
          <div className={`${styles.progressFill} h-full rounded-full transition-all duration-500`} style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="p-5 sm:p-8">
        <div className={styles.imageFrame}>
          <Image
            key={question.id}
            src={question.image}
            alt={question.imageAlt}
            width={800}
            height={600}
            sizes="260px"
            onLoad={() => setLoadedImageSrc(question.image)}
            className={`${styles.memeImage} ${loadedImageSrc === question.image ? styles.memeImageLoaded : ""} h-auto w-full`}
          />
        </div>

        <h2 className="mx-auto mt-7 max-w-2xl leading-snug text-slate-950">
          <span className={`${styles.englishSentence} block text-xl font-bold sm:text-2xl`}>
            {sentenceStart}
            <span
              className={styles.blank}
              role="img"
              aria-label="пропущене слово"
            >
            <svg
              key={question.id}
              className={styles.blankLine}
              viewBox="0 0 92 8"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <mask id={blankMaskId} maskUnits="userSpaceOnUse" x="0" y="0" width="92" height="8">
                <path
                  className={styles.blankReveal}
                  d="M 8 5 H 84"
                  pathLength="1"
                  fill="none"
                  stroke="white"
                  strokeWidth="5"
                />
              </mask>
              <path
                d="M 8 5 H 84"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="3"
                strokeLinecap="round"
                mask={`url(#${blankMaskId})`}
              />
            </svg>
            </span>
            {sentenceEnd}
          </span>
          <span className={`${styles.translation} mt-3 block text-base font-medium sm:text-lg`}>{question.ukrainian}</span>
        </h2>

        <div className="mt-7 space-y-3">
          {question.options.map((option, index) => {
            const optionIsCorrect = isCorrect && index === question.answer;
            const optionIsWrong = selectedWrongAnswerIds.has(option.id);
            const playfulBackground = [styles.answerLilac, styles.answerYellow, styles.answerMint][index % 3];
            const stateClasses = optionIsCorrect
              ? "border-emerald-500 bg-emerald-50 text-emerald-950"
              : optionIsWrong
                ? "border-rose-400 bg-rose-50 text-rose-950"
                : `${styles.answerDefault} ${playfulBackground} border-violet-200 text-slate-800 hover:border-violet-400`;

            return (
              <div key={option.id}>
                <button
                  ref={index === question.options.length - 1 ? lastVisibleOptionRef : undefined}
                  type="button"
                  className={`touch-manipulation flex w-full min-w-0 select-none items-start gap-4 rounded-2xl border px-4 py-4 text-left text-base transition sm:px-5 ${stateClasses}`}
                  onClick={() => onSelectAnswer(index)}
                  disabled={optionIsCorrect}
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-current text-xs font-semibold">
                    {optionIsCorrect ? "✓" : optionIsWrong ? "×" : String.fromCharCode(65 + index)}
                  </span>
                  <span className="min-w-0 flex-1 break-words font-semibold leading-6">
                    {option.label}
                    {optionIsWrong && option.explanation && (
                      <span className="animate-[fadeIn_250ms_ease-out] font-normal"> — {option.explanation}</span>
                    )}
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        {isCorrect && (
          <div className="mt-6 animate-[fadeIn_250ms_ease-out]">
            <div className={`${styles.funNote} rounded-2xl p-5`}>
              <p className={`${styles.funNoteTitle} font-black`}>✨ FUN NOTE</p>
              <p className="mt-2 leading-7">{question.funNote}</p>
            </div>
            <button
              ref={nextButtonRef}
              type="button"
              className={`${styles.actionButton} mt-5 inline-flex w-full items-center justify-center rounded-2xl px-5 py-4 font-bold text-white transition focus:outline-none sm:w-auto`}
              onClick={onNext}
            >
              {isLastQuestion ? "Побачити результат" : "Наступне питання"} <span aria-hidden="true" className="ml-2">→</span>
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
