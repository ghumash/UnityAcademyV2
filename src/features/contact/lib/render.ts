export function renderContactEmail(data: {
  name: string;
  email?: string;
  subject?: string;
  message?: string;
}) {
  const subject = `Сообщение с сайта: ${data.subject ?? "без темы"}`;
  const text = [
    `Имя: ${data.name}`,
    data.email ? `Email: ${data.email}` : "",
    data.message ? `Сообщение: ${data.message}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <h2>Сообщение с сайта</h2>
    <p><b>Имя:</b> ${data.name}</p>
    ${data.email ? `<p><b>Email:</b> ${data.email}</p>` : ""}
    ${data.message ? `<p><b>Сообщение:</b> ${data.message}</p>` : ""}
  `;

  return { subject, text, html };
}
