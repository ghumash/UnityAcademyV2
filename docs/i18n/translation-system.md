# Система переводов и локализации

Unity Academy V2 использует собственную систему интернационализации, построенную на Next.js App Router с поддержкой трех языков: армянского (hy), английского (en) и русского (ru).

## Архитектура системы

### Структура локализации

```
src/shared/lib/i18n/
├── directories/           # Переводы по разделам
│   ├── common/           # Общие переводы
│   │   ├── navigation/   # Навигация
│   │   ├── footer/       # Подвал
│   │   └── forms/        # Формы
│   ├── courses/          # Курсы
│   ├── faq/              # FAQ
│   └── pages/            # Страницы
├── helpers.ts            # Хелперы для работы с переводами
├── index.ts              # Основной экспорт
└── types.ts              # Типы локализации
```

### Поддерживаемые языки

```typescript
// Конфигурация языков
export const locales = ['hy', 'en', 'ru'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'hy'
```

## Основные компоненты

### useI18n Hook

Основной хук для работы с переводами.

```typescript
import { useI18n } from '@/shared/lib/i18n'

function MyComponent() {
  const { t, locale, setLocale } = useI18n()
  
  return (
    <div>
      <h1>{t('common.navigation.home')}</h1>
      <p>Текущий язык: {locale}</p>
      <button onClick={() => setLocale('en')}>
        Switch to English
      </button>
    </div>
  )
}
```

### Функция t()

Функция перевода с поддержкой интерполяции.

```typescript
// Простой перевод
t('common.navigation.home') // "Главная"

// С параметрами
t('common.forms.validation.required', { field: 'Email' })
// "Поле Email обязательно для заполнения"

// С плюрализацией
t('courses.count', { count: 5 })
// "5 курсов"
```

### getT() для Server Components

Серверная функция для получения переводов.

```typescript
import { getT } from '@/shared/lib/i18n'

export default async function ServerPage({ 
  params: { locale } 
}: { 
  params: { locale: Locale } 
}) {
  const t = await getT(locale)
  
  return (
    <div>
      <h1>{t('pages.about.title')}</h1>
    </div>
  )
}
```

## Структура переводов

### Общие переводы (common)

#### Навигация

```typescript
// common/navigation/hy.ts
export const navigation = {
  home: 'Գլխավոր',
  about: 'Մեր մասին',
  courses: 'Դասընթացներ',
  contacts: 'Կապ',
  apply: 'Դիմել',
  faq: 'ՀՏՀ'
} as const
```

#### Формы

```typescript
// common/forms/hy.ts
export const forms = {
  validation: {
    required: 'Այս դաշտը պարտադիր է',
    email: 'Մուտքագրեք վավեր էլ. հասցե',
    phone: 'Մուտքագրեք վավեր հեռախոսահամար'
  },
  buttons: {
    submit: 'Ուղարկել',
    cancel: 'Չեղարկել',
    save: 'Պահպանել'
  }
} as const
```

### Переводы страниц

#### Главная страница

```typescript
// pages/home/hy.ts
export const home = {
  hero: {
    title: 'Բարի գալուստ Unity Academy',
    subtitle: 'Ծրագրավորման դպրոց',
    description: 'Սովորեք ծրագրավորում...',
    primaryButton: 'Սկսել',
    secondaryButton: 'Իմանալ ավելին'
  },
  features: {
    title: 'Մեր առավելությունները',
    items: [
      {
        title: 'Փորձառու դասախոսներ',
        description: '...'
      }
    ]
  }
} as const
```

### Переводы курсов

```typescript
// courses/hy.ts
export const courses = {
  javascript: {
    title: 'JavaScript',
    description: 'Սովորեք JavaScript...',
    topics: [
      'Փոփոխականներ և տիպեր',
      'Ֆունկցիաներ',
      'DOM մանիպուլյացիա'
    ]
  },
  react: {
    title: 'React',
    description: 'Սովորեք React...'
  }
} as const
```

## Типизация

### Строгая типизация ключей

```typescript
// Автоматическая генерация типов
type NavigationKeys = keyof typeof navigation
type FormsKeys = keyof typeof forms

// Использование в функции t()
t('common.navigation.home') // ✅ Типизировано
t('common.navigation.invalid') // ❌ TypeScript ошибка
```

### Интерфейсы словарей

```typescript
export interface CommonDict {
  navigation: typeof navigation
  forms: typeof forms
  footer: typeof footer
}

export interface CoursesDict {
  javascript: CourseDict
  react: CourseDict
  // ...другие курсы
}
```

## Маршрутизация

### Локализованные маршруты

```typescript
// next.config.ts
const nextConfig = {
  i18n: {
    locales: ['hy', 'en', 'ru'],
    defaultLocale: 'hy',
    localeDetection: true
  }
}
```

### Структура URL

```
/hy/courses          # Армянский (по умолчанию)
/en/courses          # Английский
/ru/courses          # Русский
```

### Middleware для локализации

```typescript
// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { locales, defaultLocale } from '@/shared/lib/i18n'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Проверка наличия локали в URL
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  // Редирект на локаль по умолчанию
  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname}`, request.url)
    )
  }
}
```

## Компоненты локализации

### LanguageSwitcher

Переключатель языков.

```typescript
import { LanguageSwitcher } from '@/features/i18n/ui'

<LanguageSwitcher />
```

**Функциональность:**
- Выпадающий список языков
- Сохранение выбора в localStorage
- Автоматическое перенаправление

### LocalizedLink

Ссылка с автоматической локализацией.

```typescript
import { LocalizedLink } from '@/shared/lib/i18n'

<LocalizedLink href="/courses">
  {t('common.navigation.courses')}
</LocalizedLink>
```

## Работа с формами

### Локализованная валидация

```typescript
import { useI18n } from '@/shared/lib/i18n'
import { useForm } from 'react-hook-form'

function ContactForm() {
  const { t } = useI18n()
  const form = useForm({
    resolver: zodResolver(schema)
  })
  
  return (
    <form>
      <Input
        {...form.register('email')}
        placeholder={t('common.forms.placeholders.email')}
        error={form.formState.errors.email?.message}
      />
    </form>
  )
}
```

### Локализованные сообщения об ошибках

```typescript
// Схема валидации с переводами
const createContactSchema = (t: TFunction) => z.object({
  email: z
    .string()
    .min(1, t('common.forms.validation.required'))
    .email(t('common.forms.validation.email')),
  phone: z
    .string()
    .min(1, t('common.forms.validation.required'))
    .regex(/^\+?[\d\s-()]+$/, t('common.forms.validation.phone'))
})
```

## SEO и метаданные

### Локализованные метаданные

```typescript
// app/[locale]/layout.tsx
import { getT } from '@/shared/lib/i18n'

export async function generateMetadata({ 
  params: { locale } 
}: {
  params: { locale: Locale }
}) {
  const t = await getT(locale)
  
  return {
    title: t('meta.site.title'),
    description: t('meta.site.description'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'hy': '/hy',
        'en': '/en',
        'ru': '/ru'
      }
    }
  }
}
```

### Hreflang теги

```typescript
// Автоматическая генерация hreflang
<link rel="alternate" hrefLang="hy" href="https://site.com/hy/page" />
<link rel="alternate" hrefLang="en" href="https://site.com/en/page" />
<link rel="alternate" hrefLang="ru" href="https://site.com/ru/page" />
```

## Добавление новых переводов

### 1. Создание структуры

```typescript
// Новый раздел: src/shared/lib/i18n/directories/blog/
mkdir src/shared/lib/i18n/directories/blog
touch src/shared/lib/i18n/directories/blog/{hy,en,ru}.ts
touch src/shared/lib/i18n/directories/blog/index.ts
```

### 2. Определение типов

```typescript
// blog/hy.ts
export const blog = {
  title: 'Բլոգ',
  posts: {
    readMore: 'Կարդալ ավելին',
    publishedOn: 'Հրապարակված՝',
    author: 'Հեղինակ՝'
  },
  categories: {
    programming: 'Ծրագրավորում',
    design: 'Դիզայն',
    career: 'Կարիերա'
  }
} as const

export type BlogDict = typeof blog
```

### 3. Переводы на другие языки

```typescript
// blog/en.ts
import type { BlogDict } from './hy'

export const blog: BlogDict = {
  title: 'Blog',
  posts: {
    readMore: 'Read more',
    publishedOn: 'Published on',
    author: 'Author:'
  },
  categories: {
    programming: 'Programming',
    design: 'Design',
    career: 'Career'
  }
}
```

### 4. Интеграция в основной словарь

```typescript
// i18n/hy.ts
import { blog } from './directories/blog/hy'

export default {
  common,
  pages,
  courses,
  faq,
  blog // Добавляем новый раздел
} as const
```

## Лучшие практики

### 1. Структурирование ключей

```typescript
// ✅ Хорошо - иерархическая структура
'pages.about.hero.title'
'common.forms.validation.required'

// ❌ Плохо - плоская структура
'aboutPageHeroTitle'
'requiredFieldError'
```

### 2. Использование констант

```typescript
// ✅ Хорошо - типизированные константы
export const TRANSLATION_KEYS = {
  HOME_TITLE: 'pages.home.title',
  SUBMIT_BUTTON: 'common.forms.buttons.submit'
} as const
```

### 3. Интерполяция параметров

```typescript
// Перевод с параметрами
'common.messages.welcome': 'Բարի գալուստ, {{name}}!'

// Использование
t('common.messages.welcome', { name: 'Անի' })
```

### 4. Плюрализация

```typescript
// Поддержка множественного числа
'courses.count': {
  one: '{{count}} դասընթաց',
  few: '{{count}} դասընթաց',
  many: '{{count}} դասընթաց'
}
```

## Производительность

### Lazy Loading переводов

```typescript
// Динамическая загрузка переводов
const loadTranslations = async (locale: Locale) => {
  const translations = await import(`./directories/${locale}`)
  return translations.default
}
```

### Кэширование

```typescript
// Кэширование переводов в памяти
const translationsCache = new Map<Locale, any>()

export const getCachedTranslations = (locale: Locale) => {
  if (!translationsCache.has(locale)) {
    const translations = loadTranslations(locale)
    translationsCache.set(locale, translations)
  }
  return translationsCache.get(locale)
}
```

## Тестирование

### Тестирование переводов

```typescript
// Проверка наличия всех ключей
describe('Translations', () => {
  it('should have all required keys', () => {
    const hyKeys = Object.keys(hyTranslations)
    const enKeys = Object.keys(enTranslations)
    const ruKeys = Object.keys(ruTranslations)
    
    expect(hyKeys).toEqual(enKeys)
    expect(enKeys).toEqual(ruKeys)
  })
})
```

## Следующие шаги

- [Добавление новых языков](./adding-languages.md)
- [Управление переводами](./translation-management.md)
- [SEO для многоязычных сайтов](../pages/seo-metadata.md)
