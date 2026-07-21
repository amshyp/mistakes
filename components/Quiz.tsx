"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import type { Mistake } from "@/data/mistakes";
import ContactSection from "@/components/ContactSection";
import QuizCard from "@/components/QuizCard";

type Props = {
  questions: Mistake[];
  lastVisibleOptionRef: RefObject<HTMLButtonElement | null>;
};

function getResultMessage(score: number) {
  if (score >= 9) {
    return "Відмінний результат! Продовжуйте вдосконалювати англійську та відкривати для себе нові теми.";
  }

  if (score >= 7) {
    return "Дуже хороший результат! Ви вже маєте гарну базу, залишилося лише відшліфувати окремі моменти.";
  }

  if (score >= 5) {
    return "Гарний початок! Кілька тем ще потребують уваги, але їх легко покращити регулярною практикою.";
  }

  if (score >= 3) {
    return "Гарний початок! Ви вже знаєте чимало, а решту легко надолужити з практикою.";
  }

  return "Кожна правильна відповідь — це крок уперед. Головне — почати, а далі все вийде!";
}

export default function Quiz({ questions, lastVisibleOptionRef }: Props) {
  const resultsRef = useRef<HTMLElement>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState(0);

  const isComplete = completedQuestions === questions.length;
  const activeQuestion = questions[currentQuestion];

  useEffect(() => {
    if (!isComplete) {
      return;
    }

    resultsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [isComplete]);

  function handleSelectAnswer(answerIndex: number) {
    if (selectedAnswer !== null || !activeQuestion) {
      return;
    }

    setSelectedAnswer(answerIndex);
    if (answerIndex === activeQuestion.answer) {
      setScore((currentScore) => currentScore + 1);
    }
  }

  function handleNextQuestion() {
    if (selectedAnswer === null) {
      return;
    }

    setCompletedQuestions((completed) => completed + 1);
    setSelectedAnswer(null);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((question) => question + 1);
    }
  }

  if (questions.length === 0) {
    return null;
  }

  if (isComplete) {
    const resultMessage = getResultMessage(score);

    return (
      <>
        <section ref={resultsRef} className="rounded-[1.75rem] border border-emerald-100 bg-white p-6 text-center shadow-xl shadow-emerald-950/5 sm:p-10">
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-emerald-100 text-3xl">🎉</div>
          <p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-emerald-800">Тест завершено</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Ваш результат</h2>
          <p className="mt-5 text-5xl font-black text-emerald-800">{score}<span className="text-2xl text-slate-400">/{questions.length}</span></p>
          <div className="mx-auto mt-5 max-w-xl leading-7 text-slate-600">
            <p className="text-base font-medium">{resultMessage}</p>
          </div>
        </section>
        <ContactSection currentQuizScore={score} totalQuestions={questions.length} />
      </>
    );
  }

  return (
    <QuizCard
      question={activeQuestion.question}
      options={activeQuestion.options}
      answer={activeQuestion.answer}
      tip={activeQuestion.tip}
      example={activeQuestion.example}
      selectedAnswer={selectedAnswer}
      onSelectAnswer={handleSelectAnswer}
      onNext={handleNextQuestion}
      isLastQuestion={currentQuestion === questions.length - 1}
      questionNumber={currentQuestion + 1}
      totalQuestions={questions.length}
      lastVisibleOptionRef={lastVisibleOptionRef}
    />
  );
}
