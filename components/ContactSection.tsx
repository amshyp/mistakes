"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";

type Props = {
  currentQuizScore: number;
  totalQuestions: number;
};

type ContactPayload = {
  name: string;
  phoneOrTelegram: string;
  score: number;
  totalQuestions: number;
  website: string;
};

function buildContactPayload(form: HTMLFormElement, currentQuizScore: number, totalQuestions: number): ContactPayload {
  const formData = new FormData(form);

  return {
    name: String(formData.get("name") ?? "").trim(),
    phoneOrTelegram: String(formData.get("phone_or_telegram") ?? "").trim(),
    score: currentQuizScore,
    totalQuestions,
    website: String(formData.get("website") ?? "").trim(),
  };
}

export default function ContactSection({ currentQuizScore, totalQuestions }: Props) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = buildContactPayload(form, currentQuizScore, totalQuestions);

    if (!payload.name || !payload.phoneOrTelegram) {
      setSubmitError("Будь ласка, заповніть обидва поля.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { success?: boolean; error?: string };

      if (!response.ok || !result.success) {
        throw new Error("Contact submission failed");
      }

      form.reset();
      setSubmitted(true);
    } catch {
      setSubmitError("Не вдалося надіслати заявку. Спробуйте ще раз або напишіть нам у Telegram.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="mt-10 rounded-[1.75rem] bg-emerald-950 px-5 py-10 text-white shadow-xl shadow-emerald-950/20 [overflow-anchor:none] sm:mt-14 sm:px-10 sm:py-12 lg:py-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-12">
        <div>
          <span className="inline-flex rounded-full bg-emerald-400/15 px-3 py-1.5 text-sm font-semibold text-emerald-100">Наступний крок</span>
          <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">Записуйтеся на безкоштовне тестове заняття-знайомство.</h2>
          <p className="mt-5 max-w-xl leading-7 text-slate-300">Визначимо ваш рівень англійської та складемо індивідуальний план навчання.</p>
        </div>

        <div className="lg:flex lg:h-[360px] lg:flex-col lg:justify-center">
          <div
            aria-hidden={isFormOpen}
            className={`grid text-center transition-[grid-template-rows,opacity,transform,margin] duration-300 ease-out ${isFormOpen ? "-translate-y-2 grid-rows-[0fr] opacity-0 mb-0" : "translate-y-0 grid-rows-[1fr] opacity-100 mb-0"}`}
          >
            <div className="min-h-0 overflow-hidden">
              <Image
                src="/images/teacher.png"
                alt="Аліса Кириченко, викладач англійської"
                width={130}
                height={130}
                className="mx-auto size-[105px] rounded-full bg-white object-contain shadow-lg md:size-[130px]"
              />
              <p className="mt-3 font-bold">Аліса Кириченко</p>
              <p className="mt-1 text-sm text-emerald-100">Викладач англійської</p>
              <a
                href="https://t.me/alisakerry"
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-orange-500 px-5 py-3.5 font-bold text-white shadow-lg shadow-orange-700/20 transition hover:bg-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-200"
              >
                Написати нам у Telegram
              </a>
            </div>
          </div>
          <button
            type="button"
            className="mx-auto mt-3 block text-center text-sm text-emerald-100/80 transition hover:text-white hover:underline focus:outline-none focus:underline"
            aria-expanded={isFormOpen}
            aria-controls="contact-form-panel"
            onClick={() => setIsFormOpen((isOpen) => !isOpen)}
          >
            {isFormOpen ? "Сховати форму" : "Або залиште контакт, і ми самі вам напишемо."}
          </button>

          <div
            id="contact-form-panel"
            aria-hidden={!isFormOpen}
            inert={!isFormOpen}
            className={`grid transition-[grid-template-rows,opacity,transform,margin] duration-300 ease-out ${isFormOpen ? "mt-5 translate-y-0 grid-rows-[1fr] opacity-100" : "-translate-y-2 mt-0 grid-rows-[0fr] opacity-0"}`}
          >
            <div className="min-h-0 overflow-hidden">
              {submitted ? (
                <div className="rounded-2xl bg-emerald-400 p-6 text-emerald-950">
                  <p className="text-lg font-extrabold">Дякуємо! Ми скоро з вами зв&apos;яжемося 😊</p>
                </div>
              ) : (
                <form className="rounded-2xl bg-white p-5 text-slate-950 sm:p-6 lg:py-2" onSubmit={handleSubmit}>
                  <label className="block text-sm font-bold" htmlFor="name">
                    Ваше ім&apos;я
                    <input id="name" name="name" required maxLength={100} placeholder="Ваше ім'я" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-base outline-none transition placeholder:text-slate-400 focus:border-emerald-700 focus:ring-4 focus:ring-emerald-100" />
                  </label>
                  <label className="mt-4 block text-sm font-bold" htmlFor="phone-or-telegram">
                    Телефон або Telegram
                    <input id="phone-or-telegram" name="phone_or_telegram" required maxLength={200} placeholder="@username або +380…" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-base outline-none transition placeholder:text-slate-400 focus:border-emerald-700 focus:ring-4 focus:ring-emerald-100" />
                  </label>
                  <div className="sr-only" aria-hidden="true">
                    <label htmlFor="website">Ваш сайт</label>
                    <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                  </div>
                  {submitError && <p className="mt-3 text-sm font-medium text-rose-700" role="alert">{submitError}</p>}
                  <button type="submit" disabled={isSubmitting} className="mt-5 w-full rounded-xl bg-orange-500 px-5 py-3.5 font-bold text-white shadow-lg shadow-orange-700/20 transition hover:bg-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-200 disabled:cursor-not-allowed disabled:opacity-70">
                    {isSubmitting ? "Надсилаємо..." : "Залишити заявку"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
