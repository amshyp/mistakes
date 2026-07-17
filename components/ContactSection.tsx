"use client";

import { FormEvent, useState } from "react";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="contact" className="mt-10 rounded-[1.75rem] bg-emerald-950 px-5 py-10 text-white shadow-xl shadow-emerald-950/20 sm:mt-14 sm:px-10 sm:py-12">
      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-12">
        <div>
          <span className="inline-flex rounded-full bg-emerald-400/15 px-3 py-1.5 text-sm font-semibold text-emerald-100">Наступний крок</span>
          <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">Записуйся на безкоштовне тестове заняття-знайомство</h2>
          <p className="mt-5 max-w-xl leading-7 text-slate-300">Ми визначимо Ваш рівень англійської та підберемо програму, яка підійде саме Вам.</p>
        </div>

        {submitted ? (
          <div className="rounded-2xl bg-emerald-400 p-6 text-emerald-950">
            <p className="text-lg font-extrabold">Дякуємо за заявку!</p>
            <p className="mt-2 leading-6">Ми скоро зв’яжемося з Вами, щоб домовитися про заняття.</p>
          </div>
        ) : (
          <form className="rounded-2xl bg-white p-5 text-slate-950 sm:p-6" onSubmit={handleSubmit}>
            <label className="block text-sm font-bold" htmlFor="name">
              Ім&apos;я
              <input id="name" name="name" required placeholder="Ваше ім'я" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-base outline-none transition placeholder:text-slate-400 focus:border-emerald-700 focus:ring-4 focus:ring-emerald-100" />
            </label>
            <label className="mt-4 block text-sm font-bold" htmlFor="contact-method">
              Телефон або Telegram
              <input id="contact-method" name="contact-method" required placeholder="@username або +380…" className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-base outline-none transition placeholder:text-slate-400 focus:border-emerald-700 focus:ring-4 focus:ring-emerald-100" />
            </label>
            <button type="submit" className="mt-5 w-full rounded-xl bg-orange-500 px-5 py-3.5 font-bold text-white shadow-lg shadow-orange-700/20 transition hover:bg-orange-400 focus:outline-none focus:ring-4 focus:ring-orange-200">Записатися</button>
          </form>
        )}
      </div>
    </section>
  );
}
