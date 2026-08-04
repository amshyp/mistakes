"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type RefObject } from "react";
import ContactSection from "@/components/ContactSection";
import VocabularyMemeCard from "@/components/VocabularyMemeCard";
import type { VocabularyMemeQuestion } from "@/data/vocabularyMemes";
import styles from "@/components/vocabulary-memes/VocabularyMemes.module.css";

type Props = {
  questions: VocabularyMemeQuestion[];
  lastVisibleOptionRef: RefObject<HTMLButtonElement | null>;
};

export default function VocabularyMemeQuiz({ questions, lastVisibleOptionRef }: Props) {
  const resultsRef = useRef<HTMLElement>(null);
  const preloadedImagesRef = useRef<Map<string, HTMLImageElement>>(new Map());
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedWrongAnswerIds, setSelectedWrongAnswerIds] = useState<Set<string>>(() => new Set());
  const [isCorrect, setIsCorrect] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState(0);
  const isComplete = completedQuestions === questions.length;
  const activeQuestion = questions[currentQuestion];

  useEffect(() => {
    if (isComplete) resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [isComplete]);

  useEffect(() => {
    const nextImageSrc = questions[currentQuestion + 1]?.image;
    if (!nextImageSrc || preloadedImagesRef.current.has(nextImageSrc)) return;

    const image = new window.Image();
    preloadedImagesRef.current.set(nextImageSrc, image);
    image.src = nextImageSrc;
  }, [currentQuestion, questions]);

  function handleSelectAnswer(answerIndex: number) {
    if (!activeQuestion) return;
    if (answerIndex === activeQuestion.answer) {
      if (!isCorrect) setIsCorrect(true);
      return;
    }
    const optionId = activeQuestion.options[answerIndex]?.id;
    if (!optionId) return;
    setSelectedWrongAnswerIds((selectedIds) => {
      const nextSelectedIds = new Set(selectedIds);
      nextSelectedIds.add(optionId);
      return nextSelectedIds;
    });
  }

  function handleNextQuestion() {
    if (!isCorrect) return;
    setCompletedQuestions((completed) => completed + 1);
    setSelectedWrongAnswerIds(new Set());
    setIsCorrect(false);
    if (currentQuestion < questions.length - 1) setCurrentQuestion((question) => question + 1);
  }

  function handleRestart() {
    setCurrentQuestion(0);
    setSelectedWrongAnswerIds(new Set());
    setIsCorrect(false);
    setCompletedQuestions(0);
  }

  if (questions.length === 0) return null;

  if (isComplete) {
    return (
      <>
        <section ref={resultsRef} className={`${styles.resultCard} rounded-[1.75rem] border p-6 text-center sm:p-10`}>
          <div className="mx-auto aspect-[4/3] w-full max-w-[260px] overflow-hidden rounded-[1.15rem] border-[5px] border-white bg-white shadow-[7px_7px_0_rgb(124_58_237_/_26%)]">
            <Image
              src="/images/meme/end-meme.jpg"
              alt="Фінальний мем після проходження тесту"
              width={960}
              height={720}
              sizes="260px"
              preload
              className="h-auto w-full rounded-[0.85rem] object-contain"
            />
          </div>
          <h2 className="mt-6 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Вітаємо! Ви пройшли всі питання 🎉</h2>
          <p className="mt-5 text-5xl font-black text-violet-700">{questions.length}<span className="text-2xl text-slate-400">/{questions.length}</span></p>
          <p className="mx-auto mt-5 max-w-xl text-base font-medium leading-7 text-slate-600">Тепер ви знаєте більше цікавих англійських слів і виразів.</p>
        </section>
        <ContactSection currentQuizScore={questions.length} totalQuestions={questions.length} theme="vocabulary" onRestart={handleRestart} />
      </>
    );
  }

  return (
    <VocabularyMemeCard
      question={activeQuestion}
      selectedWrongAnswerIds={selectedWrongAnswerIds}
      isCorrect={isCorrect}
      onSelectAnswer={handleSelectAnswer}
      onNext={handleNextQuestion}
      isLastQuestion={currentQuestion === questions.length - 1}
      questionNumber={currentQuestion + 1}
      totalQuestions={questions.length}
      lastVisibleOptionRef={lastVisibleOptionRef}
    />
  );
}
