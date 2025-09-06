# Shared layer — Полное руководство для разработчиков

Это главный документ по слою `shared`. Он рассчитан на новичка, который впервые видит проект. Здесь вы найдёте:
- Навигацию по всем папкам и файлам внутри `src/shared`
- Подробные описания «что это» и «когда это использовать»
- Готовые примеры кода (copy-paste) для каждого модуля/функции
- Best practices и советы по расширению

Если вы не знаете, с чего начать — начните с раздела «Как тут всё устроено» и двигайтесь по оглавлению.

## Оглавление

- Как тут всё устроено
- Быстрый старт (TL;DR)
- Справочник функций (коротко)
- Папка config
  - `config/site.ts`
- Папка content (MDX-контент курсов/страниц)
  - Где храним MDX
  - `content/schema.ts`
  - `content/fs.ts`
  - `content/courses.ts`
  - `content/index.ts`
- Папка lib (утилиты и инфраструктура)
  - `lib/utils.ts` (cn)
  - `lib/anti-bot.ts` (проверка антибот)
  - `lib/rate-limit.ts` (лимит запросов)
  - `lib/request.ts` (метаданные клиента)
  - `lib/notify.ts` (webhook-уведомления)
  - `lib/actions/result.ts` (тип результата action)
  - `lib/logger.client.ts`, `lib/logger.server.ts`
  - `lib/i18n/*` (локализация)
- Папка mdx (рендер и TOC)
  - `mdx/renderer.tsx`
  - `mdx/toc.ts`
  - `mdx/toc-nav.tsx`
  - `mdx/components.tsx`, `callout.tsx`, `image.tsx`, `youtube*.tsx`, `sanitize.ts`
- Папка seo
  - `seo/meta.ts` (createMetadata)
  - `seo/jsonld.tsx` (JsonLd и билдеры)
- Папка ui/custom (только эта папка документируется)
  - `custom/container.tsx`
  - `custom/section.tsx`
  - `custom/google-form-embed.tsx`
  - `custom/skip-link.tsx`
- Best practices и расширение
- FAQ

---

## Как тут всё устроено

Слой `shared` объединяет:
- Конфиг сайта (`config`)
- Чтение и нормализацию MDX-контента (`content`)
- Утилиты и инфраструктурные функции (`lib`)
- MDX-рендер, оглавление и компоненты (`mdx`)
- SEO-хелперы (`seo`)
- Библиотеку UI-компонентов (shadcn/ui) + проектные обёртки (`ui`)

Импортируйте модули из barrel-файлов (`index.ts`), если они есть — так проще поддерживать стабильные пути.

---

## Быстрый старт (TL;DR)

- Добавить новый курс: создайте MDX-файлы в `src/content/courses/{ru|en|hy}/your-course.mdx` с фронтматтером (`title`, `excerpt`, `tags`...). Страница отрисуется на `/{locale}/courses/your-course`.
- Перевести строку: добавьте ключ в `shared/lib/i18n/directories/{ru|en|hy}.ts` и используйте `getT(locale)` → `t("path.to.key")`.
- Рендер MDX на странице: передайте `source` (строка MDX) в `<MdxRenderer source={body} />` и, опционально, оглавление через `getMdxToc` + `<MdxTocNav />`.
- Настройка метаданных: используйте `createMetadata({ title, canonical, alternatesPath, locale })` в `generateMetadata`/`metadata`.
- Формы: проверка антибот `checkAntiBot`, лимит `rateLimit`, вебхук `notify`, метаданные клиента `getClientMeta`.

---

## Справочник функций (коротко)

- Добавить новый курс — создаёт страницу курса из MDX
  ```md
  // src/content/courses/{ru|en|hy}/your-course.mdx
  ---
  title: "Заголовок"
  excerpt: "Краткое описание"
  tags: ["web", "frontend"]
  updatedAt: 2025-01-01
  cover: https://...
  ---
  # Введение
  ...
  ```
  Результат: страница на `/{locale}/courses/your-course`.

- getT(locale) — загрузить словарь локали и получить функцию t
  ```ts
  import { getT } from "@/shared/lib/i18n";
  const t = await getT("ru");
  t("common.nav.courses");
  ```

- MdxRenderer — рендерит MDX-строку в React
  ```tsx
  import { MdxRenderer } from "@/shared/mdx";
  <MdxRenderer source={course.body!} />
  ```

- getMdxToc + MdxTocNav — строит и отображает оглавление MDX
  ```tsx
  import { getMdxToc, MdxTocNav } from "@/shared/mdx";
  const items = await getMdxToc(course.body!);
  <MdxTocNav items={items} />
  ```

- createMetadata — формирует метаданные страницы (SEO/OG/Twitter)
  ```ts
  import { createMetadata } from "@/shared/seo";
  export const metadata = createMetadata({
    title: "About",
    canonical: "https://example.com/ru/about",
    alternatesPath: "/about",
    locale: "ru",
  });
  ```

- checkAntiBot — проверка honeypot/таймингов формы
  ```ts
  import { checkAntiBot } from "@/shared/lib";
  const ab = checkAntiBot(input.hp, input.ts);
  if (ab) return { ok: false, message: "Rejected", errors: { form: ab } };
  ```

- rateLimit — простой in-memory лимит запросов
  ```ts
  import { rateLimit } from "@/shared/lib";
  const rl = await rateLimit(`contact:${ip}:${ua}`, { limit: 8, windowMs: 900000 });
  if (!rl.ok) return { ok: false, message: "Too many", errors: { form: `Wait ${Math.ceil(rl.retryAfter!/1000)}s` } };
  ```

- notify — отправка webhook-уведомления
  ```ts
  import { notify } from "@/shared/lib";
  await notify("apply", { data: parsed, meta });
  ```

- getClientMeta — метаданные клиента (ua, referer, lang, ip*)
  ```ts
  import { getClientMeta } from "@/shared/lib";
  const meta = await getClientMeta();
  console.log(meta.ip, meta.ua);
  ```

- cn — объединение CSS-классов c учётом Tailwind-конфликтов
  ```tsx
  import { cn } from "@/shared/lib";
  <div className={cn("p-4", isActive && "bg-primary", "bg-primary/80")} />
  ```

---

## Папка config

### `config/site.ts`
Хранит конфигурацию сайта: название, домен, соцсети, контакты, OG-ассеты, CTA и т.д.

Когда использовать:
- В SEO (название, URL, OG), в хедере/футере (логотип, имя, ссылки), при построении JSON-LD.

Пример:
```ts
import { siteConfig, absoluteUrl } from "@/shared/config";

console.log(siteConfig.name);            // Unity Academy
console.log(absoluteUrl("/ru"));        // https://your-domain/ru
```

---

## Папка content (MDX-контент)

Где храним MDX:
- Курс: `src/content/courses/<locale>/<slug>.mdx`
- Пример: `src/content/courses/ru/web-basics.mdx` (уже создан)

Фронтматтер курса (валидация через Zod):
```md
---
title: "Веб-разработка: основы"
excerpt: "HTML, CSS, JS — базовый старт для новичков."
tags: ["web", "frontend"]
updatedAt: 2025-01-01
cover: https://.../cover.jpg
---

# Заголовок
...
```

### `content/schema.ts`
Описывает Zod-схемы:
- `CourseFrontmatter` — поля фронтматтера курсов
- `NormalizedCourse` — нормализованная сущность курса, добавляется `locale`, `slug`, `body`

Когда использовать: при чтении файлов и в типизации результатов в коде.

### `content/fs.ts`
Файловые операции и парсинг MDX:
- `listCourseSlugs(locale)` — список слагов курсов для локали
- `readCourseFile(locale, slug)` — читает MDX, валидирует фронтматтер, возвращает `NormalizedCourse | null`

Пример:
```ts
import { listCourseSlugs, readCourseFile } from "@/shared/content/fs";

const slugs = await listCourseSlugs("ru");
const course = await readCourseFile("ru", slugs[0]!");
```

### `content/courses.ts`
Высокоуровневое API для курсов:
- `getAllCoursesForLocale(locale)` — список курсов (без draft), отсортированных по `updatedAt` desc
- `getCourseBySlugLocale(locale, slug)` — конкретный курс (если `draft`, вернёт `null`)
- `getAllTagsForLocale(locale)` — уникальные теги по локали
- `searchFilterCourses(locale, { q?, tag? })` — поиск по заголовку/описанию/тегам

Примеры:
```ts
import { getAllCoursesForLocale } from "@/shared/content";
const list = await getAllCoursesForLocale("ru");
```
```ts
import { getCourseBySlugLocale } from "@/shared/content";
const c = await getCourseBySlugLocale("en", "web-basics");
if (!c) throw new Error("Course not found");
```

### `content/index.ts`
Агрегатор экспортов и `getAllSlugs()` — объединяет все слаги по локалям для SSG.

Пример:
```ts
import { getAllSlugs } from "@/shared/content";
const all = await getAllSlugs(); // ["web-basics", ...]
```

---

## Папка lib (утилиты и инфраструктура)

### `lib/utils.ts`
- `cn(...classes: ClassValue[])` — склеивает классы с учётом конфликта tailwind-классов (использует `clsx` + `tailwind-merge`).

Пример:
```tsx
import { cn } from "@/shared/lib";
<div className={cn("p-4", isActive && "bg-primary", "bg-primary/80")} />
```

Best practice: передавайте только строковые/булевы условия; избегайте сложной логики внутри `cn`.

### `lib/anti-bot.ts`
- `checkAntiBot(hp, ts, now?) => string | null`
- Проверяет honeypot (`hp`), валидность таймштампа (`ts`) и задержку между загрузкой формы и отправкой.
- Результаты: `"Rejected"`, `"Too fast"`, `"Expired"` либо `null` (нормально).

Пример (server action):
```ts
import { checkAntiBot } from "@/shared/lib";
const ab = checkAntiBot(input.hp, input.ts);
if (ab) return { ok: false, message: "Rejected", errors: { form: ab } };
```

Best practice: ставьте скрытое поле `hp`, и сохраняйте `ts` при рендере формы.

### `lib/rate-limit.ts`
Простой in-memory rate limit (на инстанс). Для прод-серверлесс замените на Redis/Upstash.
- `rateLimit(key, { limit = 5, windowMs = 15*60*1000 })`
- Возвращает `{ ok, remaining, resetAt, retryAfter? }`

Пример:
```ts
import { rateLimit } from "@/shared/lib";
const rl = await rateLimit(`contact:${ip}:${ua}`, { limit: 8, windowMs: 900000 });
if (!rl.ok) return { ok: false, message: "Too many", errors: { form: `Try again in ${Math.ceil(rl.retryAfter!/1000)}s` } };
```

Best practice: ключ формируйте из стабильных признаков клиента (IP + UA + scope).

### `lib/request.ts`
Достаёт метаданные клиента.
- На клиенте: `{ ua, referer?, lang? }` из `navigator`/`document`
- На сервере: добавляет `ip?` из заголовков (`x-forwarded-for`, `x-real-ip`, `cf-connecting-ip`, `forwarded`)

Пример:
```ts
import { getClientMeta } from "@/shared/lib";
const meta = await getClientMeta();
console.log(meta.ip, meta.ua);
```

Best practice: не логируйте `hp`/секреты; обрезайте длинные строки UA.

### `lib/notify.ts`
Простейший отправитель webhook-уведомлений.
- Требует `process.env.NOTIFY_WEBHOOK_URL`
- `notify(topic, payload) => { delivered: boolean }`

Пример:
```ts
import { notify } from "@/shared/lib";
await notify("apply", { data: input, meta });
```

Best practice: не отправляйте PII в открытом виде; добавляйте серверные фильтры.

### `lib/actions/result.ts`
Единый формат результата server actions.
- Полезно для формы: `{ ok: boolean; message: string; errors?: Record<string,string> }`

Пример:
```ts
import type { ActionState } from "@/shared/lib/actions/result";
const res: ActionState = { ok: true, message: "Saved" };
```

### `lib/logger.client.ts`, `lib/logger.server.ts`
Хелперы логирования (расширяйте под Sentry, консоль, webhooks и т.п.).

Пример (сервер):
```ts
import { logError } from "@/shared/lib/logger.server";
await logError("contact.submit", err, { extra });
```

### `lib/i18n/*`
- `directories/{ru|en|hy}.ts` — словари (plain-объекты)
- `get-dictionary.ts` — загрузка словаря по локали
- `t.ts` — `getT(locale)` → функция `t(key)` с подсказками ключей
- `config.ts`, `types.ts`, `sync.ts` — инфраструктура

Пример:
```ts
import { getT } from "@/shared/lib/i18n";
const t = await getT("ru");
const title = t("common.nav.courses");
```

Best practice: не класть длинные HTML-строки в словари; храните только короткие фразы.

---

## Папка mdx (рендер и TOC)

### `mdx/renderer.tsx`
Рендерит MDX-строку в React-компоненты.

Пример:
```tsx
import { MdxRenderer } from "@/shared/mdx";
<MdxRenderer source={course.body!} />
```

### `mdx/toc.ts`
Строит оглавление из заголовков MDX (обычно h2/h3).

Пример:
```ts
import { getMdxToc } from "@/shared/mdx";
const items = await getMdxToc(course.body!);
```

### `mdx/toc-nav.tsx`
Компонент боковой навигации по оглавлению.

Пример:
```tsx
import { MdxTocNav } from "@/shared/mdx";
<MdxTocNav items={items} />
```

### `mdx/components.tsx` и вспомогательные
- Компоненты для MDX: `callout`, `image`, `youtube`, `youtube-lite` и санитайзер `sanitize.ts`.

Best practice: любые небезопасные HTML/скрипты блокируйте санитайзером; используйте lite-видеоплеер для производительности.

---

## Папка seo

### `seo/meta.ts` — `createMetadata()`
Единая функция для генерации `Metadata` (Next.js) с OG/Twitter и `alternates.languages`.

Пример:
```ts
import type { Metadata } from "next";
import { createMetadata } from "@/shared/seo";

export const metadata: Metadata = createMetadata({
  title: "About",
  canonical: "https://example.com/ru/about",
  alternatesPath: "/about",
  locale: "ru",
  description: "О нас",
});
```

### `seo/jsonld.tsx`
Компонент `JsonLd` и билдеры:
- `buildOrganizationJsonLd()` — организация, соцсети, контакты
- `buildBreadcrumbsJsonLd(items)` — хлебные крошки

Пример:
```tsx
import { JsonLd, buildBreadcrumbsJsonLd } from "@/shared/seo";
<JsonLd data={buildBreadcrumbsJsonLd([{ name: "Home", href: "/ru" }])} />
```

---

## Папка ui/custom (проектные обёртки)

Здесь описываем только `custom/*`. Остальные (`ui/*`) — это shadcn/ui компоненты.

### `custom/container.tsx`
Контейнер с максимальной шириной и внутр. отступами.

Пример:
```tsx
import { Container } from "@/shared/ui/custom";
<Container>
  <h1>Заголовок</h1>
</Container>
```

### `custom/section.tsx`
Секция с вертикальными отступами. Можно задать `as` (тег) и `id`.

Пример:
```tsx
import { Section } from "@/shared/ui/custom";
<Section as="main" id="main">
  ...контент секции...
</Section>
```

### `custom/google-form-embed.tsx`
Встраивает Google Form через iframe, добавляет кнопку «Открыть форму».
- Props: `id?` (ID формы), `url?` (полный URL, имеет приоритет), `title?`, `height?`, `openText?`

Пример:
```tsx
import { GoogleFormEmbed } from "@/shared/ui/custom";
<GoogleFormEmbed id={process.env.NEXT_PUBLIC_GFORM_ID} title="Опрос" />
```

### `custom/skip-link.tsx`
A11y-компонент: ссылка для перехода к `#main`.

Пример:
```tsx
import { SkipLink } from "@/shared/ui/custom";
<SkipLink label="Перейти к основному содержимому" />
```

Best practice: размещайте `<SkipLink />` как можно раньше в DOM (например, в layout), а основной контейнер помечайте `id="main"`.

---

## Best practices и расширение

- Строгая типизация: описывайте входы/выходы, используйте Zod-схемы при парсинге данных.
- Импорт через barrel: добавляйте экспорт в `index.ts`, чтобы не плодить «глубокие» пути.
- SSR/CSR разделение: всё, что тянет браузерные API, должно быть в клиентских компонентах (`"use client"`).
- Безопасность форм: комбинируйте `checkAntiBot`, `rateLimit`, серверную валидацию и логирование ошибок.
- Контент в MDX: держите фронтматтер минимальным, используйте заголовки h2/h3 для оглавления.
- SEO: задавайте `canonical` и `alternatesPath`, чтобы Next сам собрал `alternates.languages`.
- i18n: не храните длинные тексты в словарях; для больших текстов используйте MDX.

---

## FAQ

- «Почему курс не отображается?» — проверьте, что MDX-файл создан для нужной локали и `draft` не установлен. Слаг файла совпадает с URL.
- «Как добавить новый инструмент в shared/lib?» — создайте файл, продумайте API, добавьте экспорт в `lib/index.ts`, опишите в этом README.
- «Как включить уведомления?» — задайте `NOTIFY_WEBHOOK_URL` и вызывайте `notify(topic, payload)` из серверного кода.
- «Где взять IP пользователя?» — только на сервере через `getClientMeta()` (в заголовках `x-forwarded-for` и пр.).
