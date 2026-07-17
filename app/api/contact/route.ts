import { Resend } from "resend";

// TODO: After verifying a custom domain in Resend, restore both recipients:
// sshypaa@gmail.com
// alisa.kyrichenko@gmail.com
const RECIPIENTS = ["sshypaa@gmail.com"];
const MAX_NAME_LENGTH = 100;
const MAX_CONTACT_LENGTH = 200;

type ContactRequest = {
  name?: unknown;
  phoneOrTelegram?: unknown;
  score?: unknown;
  totalQuestions?: unknown;
  website?: unknown;
};

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };

    return entities[character];
  });
}

function isOptionalNonNegativeInteger(value: unknown) {
  return value === undefined || (typeof value === "number" && Number.isInteger(value) && value >= 0 && value <= 1000);
}

function errorResponse(message: string, status: number) {
  return Response.json({ success: false, error: message }, { status });
}

export async function POST(request: Request) {
  let body: ContactRequest;

  try {
    body = (await request.json()) as ContactRequest;
  } catch {
    return errorResponse("Некоректний формат запиту.", 400);
  }

  if (!body || typeof body !== "object") {
    return errorResponse("Некоректні дані форми.", 400);
  }

  if (typeof body.website === "string" && body.website.trim()) {
    return Response.json({ success: true });
  }

  if (typeof body.name !== "string" || typeof body.phoneOrTelegram !== "string") {
    return errorResponse("Заповніть ім’я та контактні дані.", 400);
  }

  const name = body.name.trim();
  const phoneOrTelegram = body.phoneOrTelegram.trim();

  if (!name || !phoneOrTelegram || name.length > MAX_NAME_LENGTH || phoneOrTelegram.length > MAX_CONTACT_LENGTH) {
    return errorResponse("Перевірте введені дані.", 400);
  }

  if (!isOptionalNonNegativeInteger(body.score) || !isOptionalNonNegativeInteger(body.totalQuestions)) {
    return errorResponse("Некоректний результат тесту.", 400);
  }

  const hasQuizResult = typeof body.score === "number" && typeof body.totalQuestions === "number";
  const quizResult = hasQuizResult ? `${body.score} / ${body.totalQuestions}` : "не передано";
  const submittedAt = new Intl.DateTimeFormat("uk-UA", {
    dateStyle: "full",
    timeStyle: "long",
    timeZone: "Europe/Kyiv",
  }).format(new Date());

  const safeName = escapeHtml(name);
  const safeContact = escapeHtml(phoneOrTelegram);
  const safeQuizResult = escapeHtml(quizResult);
  const safeSubmittedAt = escapeHtml(submittedAt);

  const html = `
    <h1>Нова заявка з сайту</h1>
    <p><strong>Ім’я:</strong><br>${safeName}</p>
    <p><strong>Телефон або Telegram:</strong><br>${safeContact}</p>
    <p><strong>Результат тесту:</strong><br>${safeQuizResult}</p>
    <p><strong>Дата і час:</strong><br>${safeSubmittedAt}</p>
  `;

  const text = [
    "Нова заявка з сайту",
    "",
    "Ім’я:",
    name,
    "",
    "Телефон або Telegram:",
    phoneOrTelegram,
    "",
    `Результат тесту: ${quizResult}`,
    "",
    "Дата і час:",
    submittedAt,
  ].join("\n");

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return errorResponse("Сервіс надсилання тимчасово недоступний.", 500);
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      // TODO: Replace onboarding@resend.dev with an address on a verified custom domain before production use.
      from: "English School <onboarding@resend.dev>",
      to: RECIPIENTS,
      subject: "Нова заявка з тесту",
      html,
      text,
    });

    if (error) {
      return errorResponse("Не вдалося надіслати заявку. Спробуйте ще раз.", 502);
    }

    return Response.json({ success: true });
  } catch {
    return errorResponse("Не вдалося надіслати заявку. Спробуйте ще раз.", 500);
  }
}
