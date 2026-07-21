"use client";

import { useEffect, useRef, type RefObject } from "react";

type Props = {
  question: string;
  options: string[];
  answer: number;
  tip: string;
  example: string;
  selectedAnswer: number | null;
  onSelectAnswer: (answerIndex: number) => void;
  onNext: () => void;
  isLastQuestion: boolean;
  questionNumber: number;
  totalQuestions: number;
  lastVisibleOptionRef: RefObject<HTMLButtonElement | null>;
};

export default function QuizCard({
  question,
  options,
  answer,
  tip,
  example,
  selectedAnswer,
  onSelectAnswer,
  onNext,
  isLastQuestion,
  questionNumber,
  totalQuestions,
  lastVisibleOptionRef,
}: Props) {
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const progress = (questionNumber / totalQuestions) * 100;
  const [ukrainianQuestion, englishQuestion, ...questionDetails] = question.split("\n\n");
  const [englishFunNote, ukrainianFunNote] = example.split("\n\n");

  useEffect(() => {
    if (selectedAnswer === null) {
      return;
    }

    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        const nextButton = nextButtonRef.current;

        if (!nextButton) {
          return;
        }

        const buttonRect = nextButton.getBoundingClientRect();
        const bottomGap = 24;
        const visibleBottom = window.innerHeight - bottomGap;
        const requiredScroll = buttonRect.bottom - visibleBottom;

        if (requiredScroll <= 0) {
          return;
        }

        window.scrollTo({
          top: window.scrollY + requiredScroll,
          behavior: "smooth",
        });
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, [selectedAnswer]);

  function selectAnswer(answerIndex: number) {
    if (selectedAnswer !== null) {
      return;
    }

    onSelectAnswer(answerIndex);
  }

  return (
    <article className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-xl shadow-slate-900/5">
      <div className="border-b border-slate-100 bg-slate-50/70 px-5 py-5 sm:px-8">
        <div className="flex items-center justify-between gap-4 text-sm font-semibold">
          <span className="text-emerald-800">Питання {questionNumber} з {totalQuestions}</span>
          <span className="text-slate-400">{Math.round(progress)}%</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
          <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-500 transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="p-5 sm:p-8">
        <h2 className="leading-snug text-slate-950">
          <span className="block text-xl font-bold sm:text-2xl">{ukrainianQuestion}</span>
          <span className="mt-2 block text-lg font-medium text-slate-700 sm:text-xl">{englishQuestion}</span>
          {questionDetails.map((detail) => (
            <span key={detail} className="mt-2 block text-base font-semibold text-slate-800 sm:text-lg">
              {detail}
            </span>
          ))}
        </h2>

        <div className="mt-7 space-y-3">
          {options.map((option, index) => {
            const isCorrect = selectedAnswer !== null && index === answer;
            const isIncorrect = selectedAnswer === index && index !== answer;
            const stateClasses = isCorrect
              ? "border-emerald-500 bg-emerald-50 text-emerald-950"
              : isIncorrect
                ? "border-rose-400 bg-rose-50 text-rose-950"
                : "border-slate-200 bg-white text-slate-800 hover:border-emerald-300 hover:bg-emerald-50/50";

            return (
              <button
                key={option}
                ref={index === options.length - 1 ? lastVisibleOptionRef : undefined}
                type="button"
                className={`touch-manipulation select-none flex w-full items-center gap-4 rounded-2xl border px-4 py-4 text-left text-base font-semibold transition sm:px-5 ${stateClasses}`}
                onClick={() => selectAnswer(index)}
                disabled={selectedAnswer !== null}
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-current text-xs">
                  {isCorrect ? "✓" : isIncorrect ? "×" : String.fromCharCode(65 + index)}
                </span>
                {option}
              </button>
            );
          })}
        </div>

        {selectedAnswer !== null && (
          <div className="mt-6">
            <div className="rounded-2xl bg-emerald-50 p-5 text-slate-700">
              <p className="font-bold text-emerald-950">💡 Пояснення</p>
              <p className="mt-2 leading-7">{tip}</p>
              <div className="mt-3 border-t border-emerald-100 pt-3 leading-6 text-emerald-900">
                <p className="font-bold text-emerald-950">🤭 Fun note</p>
                <p className="mt-2 text-base font-semibold">{englishFunNote}</p>
                <p className="mt-1 text-sm font-normal">{ukrainianFunNote}</p>
              </div>
            </div>
            <button
              ref={nextButtonRef}
              type="button"
              className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-orange-500 px-5 py-4 font-bold text-white shadow-lg shadow-orange-700/20 transition hover:bg-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-200 sm:w-auto"
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
