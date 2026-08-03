"use client";

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
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedWrongAnswerIds, setSelectedWrongAnswerIds] = useState<Set<string>>(() => new Set());
  const [isCorrect, setIsCorrect] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState(0);
  const isComplete = completedQuestions === questions.length;
  const activeQuestion = questions[currentQuestion];

  useEffect(() => {
    if (isComplete) resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [isComplete]);

  function handleSelectAnswer(answerIndex: number) {
    if (isCorrect || !activeQuestion) return;
    if (answerIndex === activeQuestion.answer) {
      setIsCorrect(true);
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
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-pink-100 text-3xl">🎉</div>
          <p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-pink-600">Тест завершено</p>
          <h2 className={`${styles.gradientText} mt-3 text-3xl font-black tracking-tight sm:text-4xl`}>Ваш результат</h2>
          <p className="mt-5 text-5xl font-black text-violet-700">{questions.length}<span className="text-2xl text-slate-400">/{questions.length}</span></p>
          <p className="mx-auto mt-5 max-w-xl text-base font-medium leading-7 text-slate-600">Чудова робота! Тепер ці слова точно запам&apos;ятаються.</p>
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
