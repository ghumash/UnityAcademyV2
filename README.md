# Unity Academy V2

Современная образовательная платформа, построенная на Next.js 15 с поддержкой трех языков (армянский, английский, русский).

## 🚀 Технологический стек

- **Next.js 15** - React фреймворк с App Router
- **React 18** - UI библиотека с Server Components
- **TypeScript** - статическая типизация
- **Tailwind CSS** - utility-first CSS фреймворк
- **Radix UI** - примитивы для accessibility
- **Bun** - быстрый пакетный менеджер

## 🏗️ Архитектура

Проект следует принципам **Feature-Sliced Design (FSD)**:

```
src/
├── app/        # Маршруты и страницы (Next.js App Router)
├── widgets/    # Композитные UI блоки
├── features/   # Пользовательские сценарии
├── entities/   # Бизнес-сущности
└── shared/     # Переиспользуемые ресурсы
```

## 🌐 Локализация

Поддержка трех языков:
- 🇦🇲 **Армянский (hy)** - основной язык
- 🇺🇸 **Английский (en)**
- 🇷🇺 **Русский (ru)**

## 📚 Документация

Полная документация проекта находится в папке [`/docs`](./docs/):

### 🚀 Начало работы
- [Установка и настройка](./docs/getting-started/installation.md)
- [Структура проекта](./docs/getting-started/project-structure.md)
- [Конфигурация](./docs/getting-started/configuration.md)

### 🧩 Компоненты
- [UI компоненты](./docs/components/ui-components.md)
- [Переиспользуемые виджеты](./docs/components/widgets.md)
- [Кастомные компоненты](./docs/components/custom-components.md)

### 🌐 Локализация
- [Система переводов](./docs/i18n/translation-system.md)

### 📄 Страницы
- [Добавление новых страниц](./docs/pages/adding-pages.md)

### 🏗️ Архитектура
- [Общая архитектура](./docs/architecture/overview.md)

## ⚡ Быстрый старт

### Установка

```bash
# Клонирование репозитория
git clone <repository-url>
cd unity-academy-v2

# Установка зависимостей
bun install

# Настройка переменных окружения
cp .env.example .env.local
```

### Запуск в режиме разработки

```bash
bun dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

### Основные команды

```bash
# Разработка
bun dev                 # Запуск dev сервера
bun build              # Сборка для продакшена
bun start              # Запуск продакшен сборки

# Качество кода
bun lint               # Проверка линтером
bun lint:fix           # Исправление ошибок линтера
bun type-check         # Проверка типов TypeScript

# Утилиты
bun clean              # Очистка кэша
bun analyze            # Анализ размера бандла
```

## 📋 Основные возможности

- ✅ **Многоязычность** - поддержка 3 языков с автоматическим определением
- ✅ **Адаптивный дизайн** - оптимизация для всех устройств
- ✅ **SEO оптимизация** - метаданные, JSON-LD, sitemap
- ✅ **Accessibility** - соответствие стандартам WCAG
- ✅ **Производительность** - оптимизация Core Web Vitals
- ✅ **Современная архитектура** - Feature-Sliced Design
- ✅ **Типобезопасность** - строгая типизация TypeScript
- ✅ **Компонентная система** - переиспользуемые UI компоненты

## 🎯 Структура страниц

- **Главная** - героическая секция, курсы, преимущества
- **О нас** - информация об академии и команде
- **Курсы** - каталог образовательных программ
- **Контакты** - контактная информация и карта
- **Подача заявки** - форма регистрации на курсы
- **FAQ** - часто задаваемые вопросы

## 🛠️ Разработка

### Добавление нового компонента

```typescript
// Создание в /src/shared/ui/
export interface ComponentProps {
  title: string
  variant?: 'primary' | 'secondary'
}

export function Component({ title, variant = 'primary' }: ComponentProps) {
  return (
    <div className={cn("base-classes", variant === 'primary' && "primary-classes")}>
      {title}
    </div>
  )
}
```

### Добавление новой страницы

```bash
# Создание структуры
mkdir src/app/[locale]/new-page
touch src/app/[locale]/new-page/{page,loading}.tsx

# Добавление переводов
# src/shared/lib/i18n/directories/pages/newPage/
```

### Добавление переводов

```typescript
// src/shared/lib/i18n/directories/common/navigation/hy.ts
export const navigation = {
  home: 'Գլխավոր',
  newPage: 'Նոր էջ'
} as const
```

## 📊 Производительность

Проект оптимизирован для достижения высоких показателей:

- **LCP** ≤ 2.5s - быстрая загрузка контента
- **INP** < 200ms - отзывчивый интерфейс
- **CLS** < 0.1 - стабильная верстка
- **Bundle size** оптимизирован через code splitting

## 🔧 Конфигурация

### Переменные окружения

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="Unity Academy"
GOOGLE_MAPS_API_KEY=your_api_key
SENTRY_DSN=your_sentry_dsn
```

### Настройка IDE

Рекомендуемые расширения для VS Code:
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- TypeScript Importer
- Auto Rename Tag

## 🤝 Участие в разработке

1. Форкните репозиторий
2. Создайте ветку для фичи (`git checkout -b feature/amazing-feature`)
3. Сделайте коммит (`git commit -m 'feat: add amazing feature'`)
4. Запушьте в ветку (`git push origin feature/amazing-feature`)
5. Откройте Pull Request

### Стандарты коммитов

Используем [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: добавление новой функциональности
fix: исправление бага
docs: обновление документации
style: форматирование кода
refactor: рефакторинг
test: добавление тестов
chore: обслуживание проекта
```

## 📄 Лицензия

Этот проект лицензирован под [MIT License](LICENSE).

## 📞 Контакты

- **Email**: info@unityacademy.am
- **Website**: [unityacademy.am](https://unityacademy.am)
- **Facebook**: [@unityacademy](https://facebook.com/unityacademy)
- **Instagram**: [@unityacademy](https://instagram.com/unityacademy)

---

Создано с ❤️ командой Unity Academy
