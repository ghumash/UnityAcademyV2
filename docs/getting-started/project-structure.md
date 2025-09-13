# Структура проекта

Unity Academy V2 следует архитектуре **Feature-Sliced Design (FSD)** для обеспечения масштабируемости и поддерживаемости кода.

## Общая структура

```
unity-academy-v2/
├── docs/                    # Документация проекта
├── public/                  # Статические файлы
├── src/                     # Исходный код
├── tools/                   # Инструменты разработки
├── .env.example            # Пример переменных окружения
├── next.config.ts          # Конфигурация Next.js
├── package.json            # Зависимости проекта
└── README.md              # Основная документация
```

## Структура `/src`

### 📱 `/src/app` - App Router (Next.js 15)

```
app/
├── [locale]/               # Локализованные маршруты
│   ├── (home)/            # Группа маршрутов для главной
│   ├── about/             # Страница "О нас"
│   ├── apply/             # Страница подачи заявки
│   ├── contacts/          # Страница контактов
│   ├── courses/           # Страницы курсов
│   │   ├── [slug]/        # Детальная страница курса
│   │   └── page.tsx       # Список курсов
│   ├── faq/               # Страница FAQ
│   └── layout.tsx         # Локализованный layout
├── api/                   # API маршруты
│   ├── echo/              # Тестовый endpoint
│   ├── forms/             # Обработчики форм
│   └── health/            # Health check
├── globals.css            # Глобальные стили
├── layout.tsx             # Корневой layout
└── not-found.tsx          # 404 страница
```

### 🎯 `/src/entities` - Бизнес-сущности

```
entities/
├── course/                # Сущность "Курс"
│   └── ui/                # UI компоненты курса
└── person/                # Сущность "Человек"
    ├── model/             # Типы и модели
    └── ui/                # UI компоненты персоны
```

### ⚡ `/src/features` - Функциональности

```
features/
├── apply/                 # Функция подачи заявки
│   ├── model/             # Логика и типы
│   └── ui/                # UI компоненты
├── feedback/              # Функция обратной связи
│   ├── model/             # Логика и типы
│   └── ui/                # UI компоненты
├── i18n/                  # Функция смены языка
│   └── ui/                # Переключатель языка
└── theme/                 # Функция смены темы
    └── ui/                # Переключатель темы
```

### 🔧 `/src/shared` - Общие ресурсы

```
shared/
├── config/                # Конфигурации
│   ├── about/             # Конфиг страницы "О нас"
│   ├── apply/             # Конфиг страницы заявки
│   ├── common/            # Общие конфиги (сайт, навигация)
│   ├── contacts/          # Конфиг контактов
│   ├── courses/           # Конфиг курсов
│   ├── faq/               # Конфиг FAQ
│   └── home/              # Конфиг главной страницы
├── content/               # Контент и данные
├── hooks/                 # Переиспользуемые хуки
├── lib/                   # Утилиты и библиотеки
│   ├── actions/           # Server Actions
│   ├── google/            # Google API интеграции
│   ├── i18n/              # Система интернационализации
│   └── utils.ts           # Общие утилиты
├── seo/                   # SEO утилиты
├── ui/                    # UI компоненты
│   ├── custom/            # Кастомные компоненты
│   ├── lib/               # Специализированные UI
│   └── *.tsx              # Базовые UI компоненты
└── types.ts               # Общие типы
```

### 🧩 `/src/widgets` - Виджеты

```
widgets/
├── AnimatedLinesBadges/   # Анимированные бейджи
├── AppAutoBreadcrumbs/    # Автоматические хлебные крошки
├── AppBreadcrumbs/        # Хлебные крошки
├── CallToAction/          # Призыв к действию
├── Carousel/              # Карусель
├── ContactTilesSection/   # Секция контактных плиток
├── ContentSection/        # Контентная секция
├── CourseTopics/          # Темы курса
├── Courses/               # Список курсов
├── CtaBanner/             # CTA баннер
├── FaqAccordion/          # FAQ аккордеон
├── FeaturesSection/       # Секция возможностей
├── Footer/                # Подвал сайта
├── GlowingGrid/           # Светящаяся сетка
├── Hero/                  # Героическая секция
├── IntroWithDesc/         # Введение с описанием
├── LogoCarouselSection/   # Карусель логотипов
├── Maps/                  # Карты
├── NavBar/                # Навигационная панель
├── SmartForm/             # Умная форма
├── TeamSection/           # Секция команды
├── UserCard/              # Карточка пользователя
└── VideoCardsCarousel/    # Карусель видео-карточек
```

## Принципы организации

### 1. Feature-Sliced Design

- **app** - маршруты и страницы приложения
- **entities** - бизнес-сущности предметной области
- **features** - функциональности пользователя
- **shared** - переиспользуемые ресурсы
- **widgets** - композитные UI блоки

### 2. Правила импортов

```typescript
// ✅ Правильно - импорт из нижележащих слоев
import { Button } from '@/shared/ui'
import { UserCard } from '@/widgets/UserCard'

// ❌ Неправильно - импорт из вышележащих слоев
import { HomePage } from '@/app/[locale]/(home)/page'
```

### 3. Алиасы путей

```typescript
// Настроены в tsconfig.json
'@/app/*': ['./src/app/*']
'@/entities/*': ['./src/entities/*']
'@/features/*': ['./src/features/*']
'@/shared/*': ['./src/shared/*']
'@/widgets/*': ['./src/widgets/*']
```

## Конвенции именования

### Файлы и папки

- **Компоненты**: PascalCase (`UserCard.tsx`)
- **Утилиты**: camelCase (`formatDate.ts`)
- **Константы**: UPPER_SNAKE_CASE (`API_ENDPOINTS.ts`)
- **Типы**: PascalCase (`UserType.ts`)

### Компоненты

```typescript
// Экспорт по умолчанию для страниц
export default function HomePage() { ... }

// Именованный экспорт для компонентов
export function UserCard() { ... }
export { UserCard }
```

### Конфигурации

```typescript
// Функции конфигурации с префиксом get
export function getHomeConfig(locale: Locale) { ... }
export function getCoursesConfig(locale: Locale) { ... }
```

## Статические файлы

### `/public`

```
public/
├── videos/                # Видеофайлы
├── *.svg                  # Иконки и логотипы
├── *.jpg, *.png          # Изображения
├── favicon.ico           # Фавикон
├── robots.txt            # Robots.txt
└── sitemap.xml           # Карта сайта
```

### Оптимизация изображений

```typescript
// Используйте Next.js Image для оптимизации
import Image from 'next/image'

<Image
  src="/logo.svg"
  alt="Unity Academy"
  width={200}
  height={50}
  priority // для критических изображений
/>
```

## Инструменты разработки

### `/tools`

```
tools/
└── eslint-plugin-unity/   # Кастомные правила ESLint
    └── index.mjs          # Конфигурация плагина
```

## Следующие шаги

- [Конфигурация проекта](./configuration.md)
- [UI компоненты](../components/ui-components.md)
- [Система локализации](../i18n/translation-system.md)
