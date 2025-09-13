# Установка и настройка

## Системные требования

- **Node.js**: версия 18.17 или выше
- **Bun**: рекомендуемый пакетный менеджер
- **Git**: для клонирования репозитория

## Установка

### 1. Клонирование репозитория

```bash
git clone <repository-url>
cd unity-academy-v2
```

### 2. Установка зависимостей

```bash
# Используя Bun (рекомендуется)
bun install

# Или используя npm
npm install

# Или используя yarn
yarn install
```

### 3. Настройка переменных окружения

Создайте файл `.env.local` в корне проекта:

```bash
cp .env.example .env.local
```

Заполните необходимые переменные:

```env
# Основные настройки
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="Unity Academy"

# Настройки форм и API
NEXT_PUBLIC_FORM_ENDPOINT=your-form-endpoint
GOOGLE_MAPS_API_KEY=your-google-maps-key

# Sentry (опционально)
SENTRY_DSN=your-sentry-dsn
SENTRY_ORG=your-sentry-org
SENTRY_PROJECT=your-sentry-project
```

### 4. Запуск в режиме разработки

```bash
bun dev
```

Приложение будет доступно по адресу: `http://localhost:3000`

## Команды разработки

### Основные команды

```bash
# Запуск в режиме разработки
bun dev

# Сборка для продакшена
bun build

# Запуск продакшен сборки
bun start

# Линтинг кода
bun lint

# Исправление ошибок линтера
bun lint:fix

# Проверка типов TypeScript
bun type-check
```

### Дополнительные команды

```bash
# Очистка кэша Next.js
bun clean

# Анализ размера бандла
bun analyze

# Запуск тестов (если настроены)
bun test
```

## Структура конфигурационных файлов

### `next.config.ts`
Основная конфигурация Next.js с настройками:
- Turbopack для ускорения разработки
- Интернационализация (i18n)
- Оптимизация изображений
- Настройки безопасности

### `tailwind.config.ts`
Конфигурация Tailwind CSS с:
- Кастомными цветами и темами
- Анимациями и эффектами
- Адаптивными брейкпоинтами

### `tsconfig.json`
Настройки TypeScript с:
- Строгими правилами типизации
- Алиасами путей (@/shared, @/widgets и т.д.)
- Поддержкой JSX

### `eslint.config.mjs`
Правила линтинга для:
- React и Next.js
- TypeScript
- Accessibility (a11y)
- Кастомные правила проекта

## Проверка установки

После установки убедитесь, что все работает корректно:

1. **Запустите dev сервер:**
   ```bash
   bun dev
   ```

2. **Откройте браузер** и перейдите на `http://localhost:3000`

3. **Проверьте консоль** на отсутствие ошибок

4. **Запустите сборку:**
   ```bash
   bun build
   ```

5. **Проверьте линтинг:**
   ```bash
   bun lint
   ```

## Возможные проблемы

### Ошибки установки зависимостей

```bash
# Очистите кэш и переустановите
rm -rf node_modules bun.lockb
bun install
```

### Проблемы с портом

Если порт 3000 занят, Next.js автоматически выберет следующий доступный порт или вы можете указать конкретный:

```bash
bun dev -p 3001
```

### Ошибки TypeScript

Убедитесь, что используете совместимую версию TypeScript:

```bash
bun add -D typescript@latest
```

## Следующие шаги

После успешной установки изучите:
- [Структуру проекта](./project-structure.md)
- [Конфигурацию](./configuration.md)
- [Компоненты](../components/ui-components.md)
