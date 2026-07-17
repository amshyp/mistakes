"use client";

import { useState } from "react";
import type { Mistake } from "@/data/mistakes";
import ContactSection from "@/components/ContactSection";
import QuizCard from "@/components/QuizCard";

type Props = {
  questions: Mistake[];
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

function BilingualQuestion({ text }: { text: string }) {
  const [ukrainian, english, ...details] = text.split("\n\n");

  return (
    <p className="leading-7 text-slate-950">
      <span className="block font-bold">{ukrainian}</span>
      <span className="mt-1 block text-sm font-normal text-slate-700">{english}</span>
      {details.map((detail) => (
        <span key={detail} className="mt-1 block text-sm font-medium text-slate-800">
          {detail}
        </span>
      ))}
    </p>
  );
}

export default function Quiz({ questions }: Props) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});

  const isComplete = completedQuestions === questions.length;
  const activeQuestion = questions[currentQuestion];

  function handleSelectAnswer(answerIndex: number) {
    if (selectedAnswer !== null || !activeQuestion) {
      return;
    }

    setSelectedAnswer(answerIndex);
    setUserAnswers((answers) => ({ ...answers, [activeQuestion.id]: answerIndex }));

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
    const incorrectQuestions = questions.filter((question) => userAnswers[question.id] !== question.answer);
    const resultMessage = getResultMessage(score);

    return (
      <>
        <section className="rounded-[1.75rem] border border-emerald-100 bg-white p-6 text-center shadow-xl shadow-emerald-950/5 sm:p-10">
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-emerald-100 text-3xl">🎉</div>
          <p className="mt-6 text-sm font-bold uppercase tracking-[0.18em] text-emerald-800">Тест завершено</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Ваш результат</h2>
          <p className="mt-5 text-5xl font-black text-emerald-800">{score}<span className="text-2xl text-slate-400">/{questions.length}</span></p>
          <div className="mx-auto mt-5 max-w-xl leading-7 text-slate-600">
            <p className="text-base font-medium">{resultMessage}</p>
          </div>
        </section>
        <section className="mt-10 rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-10">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-800">Розбір відповідей</p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">Ваші помилки</h2>
            <p className="mt-3 text-slate-600">Перегляньте ці пояснення — вони допоможуть закріпити правило.</p>
          </div>
          {incorrectQuestions.length === 0 ? (
            <div className="mt-7 rounded-2xl bg-emerald-50 p-5 text-center text-emerald-950">
              <p className="font-semibold">Ви не припустилися помилок — чудова робота!</p>
              <p className="mt-1 text-sm font-normal">You made no mistakes — great job!</p>
            </div>
          ) : (
            <div className="mt-7 space-y-5">
              {incorrectQuestions.map((question) => (
                <article key={question.id} className="rounded-2xl border border-rose-100 bg-rose-50/40 p-5 sm:p-6">
                  <BilingualQuestion text={question.question} />
                  <dl className="mt-4 grid gap-3 text-sm leading-6 sm:grid-cols-2">
                    <div>
                      <dt className="font-bold text-rose-700">Ваша відповідь</dt>
                      <dd className="mt-1 text-slate-700">{question.options[userAnswers[question.id]]}</dd>
                    </div>
                    <div>
                      <dt className="font-bold text-emerald-700">Правильна відповідь</dt>
                      <dd className="mt-1 text-slate-700">{question.options[question.answer]}</dd>
                    </div>
                  </dl>
                  <div className="mt-4 rounded-xl bg-white/80 p-4 text-sm leading-6 text-slate-700">
                    <span className="font-bold text-emerald-950">Пояснення: </span>{question.tip}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
        <ContactSection />
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
    />
  );
}
