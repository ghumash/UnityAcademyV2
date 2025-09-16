import type { ContactDict } from "./types";

export const contacts: ContactDict = {
  pageTitle: "Контакты",
  tiles: [
    {
      title: "Присоединяйтесь к нашему сообществу",
      description:
        "Присоединяйтесь к Telegram каналу, где вы найдете объявления о работе, интересные события и информацию о других программах",
      action: {
        label: "Перейти",
      },
    },
    {
      title: "Эл. почта",
      description: "Мы отвечаем в рабочие часы.",
      action: {
        label: "Перейти",
      },
    },
    {
      title: "Инстаграм",
      description: "Сторис, рилс, запуски курсов и обновления.",
      action: {
        label: "Перейти",
      },
    },
    {
      title: "Фейсбук",
      description: "Сторис, шортс, запуски курсов и обновления.",
      action: {
        label: "Перейти",
      },
    },
  ],
  longItems: [
    {
      label: "Адрес",
      value: "Ванадзор, улица Варданянца, 116А",
    },
    {
      label: "Телефон",
      value: "+374 99 951 915",
    },
  ],
} as const;
