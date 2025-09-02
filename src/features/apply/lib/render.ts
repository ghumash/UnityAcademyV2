export function renderApplyEmail(data: {
  name: string;
  phone?: string;
  course?: string;
  message?: string;
}) {
  const subject = `Новая заявка: ${data.name}${data.course ? ` → ${data.course}` : ""}`;
  const text = [
    `Имя: ${data.name}`,
    data.phone ? `Телефон: ${data.phone}` : "",
    data.course ? `Курс: ${data.course}` : "",
    data.message ? `Сообщение: ${data.message}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <h2>Новая заявка</h2>
    <p><b>Имя:</b> ${data.name}</p>
    ${data.phone ? `<p><b>Телефон:</b> ${data.phone}</p>` : ""}
    ${data.course ? `<p><b>Курс:</b> ${data.course}</p>` : ""}
    ${data.message ? `<p><b>Сообщение:</b> ${data.message}</p>` : ""}
  `;

  return { subject, text, html };
}
