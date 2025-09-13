# Архитектура проекта

Unity Academy V2 построен на современной архитектуре с использованием Next.js 15, React 18 и TypeScript, следуя принципам Feature-Sliced Design (FSD).

## Технологический стек

### Frontend
- **Next.js 15** - React фреймворк с App Router
- **React 18** - UI библиотека с Server Components
- **TypeScript** - статическая типизация
- **Tailwind CSS** - utility-first CSS фреймворк
- **Radix UI** - примитивы для accessibility
- **Framer Motion** - анимации и переходы

### Инструменты разработки
- **Bun** - быстрый пакетный менеджер и runtime
- **ESLint** - линтинг кода
- **Prettier** - форматирование кода
- **Husky** - Git hooks
- **Commitlint** - проверка коммитов

### Мониторинг и аналитика
- **Sentry** - отслеживание ошибок
- **Google Analytics** - веб-аналитика
- **Vercel Analytics** - производительность

## Архитектурные принципы

### 1. Feature-Sliced Design (FSD)

Проект организован по слоям в порядке возрастания ответственности:

```
src/
├── app/        # Слой приложения (маршруты, страницы)
├── widgets/    # Слой виджетов (композитные UI блоки)
├── features/   # Слой фич (пользовательские сценарии)
├── entities/   # Слой сущностей (бизнес-логика)
└── shared/     # Слой общих ресурсов
```

**Правила импортов:**
- Слой может импортировать только из нижележащих слоев
- Внутри слоя модули не должны импортировать друг друга
- Общие ресурсы доступны всем слоям

### 2. Separation of Concerns

Четкое разделение ответственности между компонентами:

- **UI компоненты** - только отображение
- **Бизнес-логика** - в отдельных хуках и утилитах
- **Конфигурация** - централизованная в `/shared/config`
- **Типы** - строгая типизация всех интерфейсов

### 3. Composition over Inheritance

Предпочтение композиции перед наследованием:

```typescript
// Композиция компонентов
<Card>
  <CardHeader>
    <CardTitle>{title}</CardTitle>
  </CardHeader>
  <CardContent>
    {children}
  </CardContent>
</Card>

// Композиция хуков
function usePageData() {
  const { locale } = useI18n()
  const config = useConfig(locale)
  const data = useApiData(config.endpoint)
  
  return { config, data }
}
```

## Слои архитектуры

### App Layer (Приложение)

**Назначение:** Маршрутизация и композиция страниц

```
app/
├── [locale]/           # Локализованные маршруты
│   ├── (home)/        # Группа маршрутов
│   ├── about/         # Статические страницы
│   ├── courses/       # Динамические маршруты
│   └── layout.tsx     # Локализованный layout
├── api/               # API маршруты
├── globals.css        # Глобальные стили
└── layout.tsx         # Корневой layout
```

**Ответственность:**
- Определение маршрутов
- Композиция виджетов в страницы
- SEO метаданные
- Обработка ошибок

### Widgets Layer (Виджеты)

**Назначение:** Композитные UI блоки

```
widgets/
├── NavBar/            # Навигация
├── Hero/              # Героические секции
├── Courses/           # Список курсов
├── Footer/            # Подвал
└── SmartForm/         # Умные формы
```

**Ответственность:**
- Композиция UI компонентов
- Интеграция с features
- Локальное состояние виджета
- Конфигурируемость через пропсы

### Features Layer (Фичи)

**Назначение:** Пользовательские сценарии

```
features/
├── apply/             # Подача заявки
│   ├── model/         # Логика и состояние
│   └── ui/            # UI компоненты
├── feedback/          # Обратная связь
├── i18n/              # Смена языка
└── theme/             # Смена темы
```

**Ответственность:**
- Бизнес-логика фичи
- Управление состоянием
- API интеграции
- Валидация данных

### Entities Layer (Сущности)

**Назначение:** Бизнес-сущности предметной области

```
entities/
├── course/            # Сущность курса
│   └── ui/            # UI представления
└── person/            # Сущность человека
    ├── model/         # Типы и модели
    └── ui/            # UI компоненты
```

**Ответственность:**
- Определение типов данных
- Бизнес-правила сущностей
- Базовые UI компоненты сущностей

### Shared Layer (Общие ресурсы)

**Назначение:** Переиспользуемые ресурсы

```
shared/
├── config/            # Конфигурации
├── ui/                # UI компоненты
├── lib/               # Утилиты и библиотеки
├── hooks/             # Переиспользуемые хуки
└── types.ts           # Общие типы
```

**Ответственность:**
- Базовые UI компоненты
- Утилитарные функции
- Общие типы и константы
- Конфигурация приложения

## Паттерны проектирования

### 1. Configuration Pattern

Централизованная конфигурация для всех компонентов:

```typescript
// Конфигурация виджета
export function getHeroConfig(locale: Locale): HeroConfig {
  const t = getT(locale)
  
  return {
    title: t('pages.home.hero.title'),
    subtitle: t('pages.home.hero.subtitle'),
    buttons: [
      {
        text: t('common.buttons.getStarted'),
        href: siteConfig.routes.apply
      }
    ]
  }
}

// Использование
const config = getHeroConfig(locale)
<Hero config={config} />
```

### 2. Compound Components Pattern

Составные компоненты для гибкости:

```typescript
// Определение составного компонента
<Card>
  <CardHeader>
    <CardTitle>Заголовок</CardTitle>
    <CardDescription>Описание</CardDescription>
  </CardHeader>
  <CardContent>
    Контент карточки
  </CardContent>
  <CardFooter>
    <Button>Действие</Button>
  </CardFooter>
</Card>
```

### 3. Render Props Pattern

Гибкие компоненты через render props:

```typescript
<DataProvider>
  {({ data, loading, error }) => (
    <>
      {loading && <Skeleton />}
      {error && <ErrorMessage error={error} />}
      {data && <DataDisplay data={data} />}
    </>
  )}
</DataProvider>
```

### 4. Custom Hooks Pattern

Переиспользуемая логика в хуках:

```typescript
function useFormSubmission<T>(
  onSubmit: (data: T) => Promise<void>
) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const handleSubmit = useCallback(async (data: T) => {
    setLoading(true)
    setError(null)
    
    try {
      await onSubmit(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [onSubmit])
  
  return { handleSubmit, loading, error }
}
```

## Управление состоянием

### 1. Локальное состояние

Использование React hooks для локального состояния:

```typescript
function ComponentWithState() {
  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState<Data | null>(null)
  
  // Логика компонента
}
```

### 2. Серверное состояние

Управление серверными данными через Server Components:

```typescript
// Server Component
async function ServerDataComponent() {
  const data = await fetchData()
  
  return <DataDisplay data={data} />
}

// Client Component для интерактивности
'use client'
function InteractiveComponent({ initialData }) {
  const [data, setData] = useState(initialData)
  
  // Клиентская логика
}
```

### 3. Глобальное состояние

Контекст для глобального состояния:

```typescript
// Провайдер темы
const ThemeContext = createContext<ThemeContextType | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

// Хук для использования
export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
```

## Система типов

### 1. Строгая типизация

Все компоненты и функции строго типизированы:

```typescript
interface ComponentProps {
  title: string
  description?: string
  variant: 'primary' | 'secondary'
  onClick: (id: string) => void
}

function Component({ title, description, variant, onClick }: ComponentProps) {
  // Реализация
}
```

### 2. Генерация типов

Автоматическая генерация типов из конфигураций:

```typescript
// Базовая конфигурация
const config = {
  routes: {
    home: '/',
    about: '/about'
  }
} as const

// Автоматически сгенерированные типы
type Routes = keyof typeof config.routes // 'home' | 'about'
type RoutePaths = typeof config.routes[Routes] // '/' | '/about'
```

### 3. Дискриминированные объединения

Типобезопасные варианты:

```typescript
type ButtonVariant = 
  | { variant: 'primary'; color: string }
  | { variant: 'secondary'; outline: boolean }
  | { variant: 'ghost' }

function Button(props: ButtonVariant) {
  switch (props.variant) {
    case 'primary':
      // props.color доступен
      break
    case 'secondary':
      // props.outline доступен
      break
    case 'ghost':
      // никаких дополнительных свойств
      break
  }
}
```

## Производительность

### 1. Code Splitting

Автоматическое разделение кода по маршрутам:

```typescript
// Автоматическое разделение по страницам
app/[locale]/about/page.tsx  // about.js
app/[locale]/courses/page.tsx // courses.js

// Ручное разделение компонентов
const HeavyComponent = lazy(() => import('./HeavyComponent'))

function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <HeavyComponent />
    </Suspense>
  )
}
```

### 2. Мемоизация

Оптимизация перерендеров:

```typescript
// Мемоизация компонентов
const ExpensiveComponent = memo(function ExpensiveComponent({ data }) {
  // Дорогие вычисления
})

// Мемоизация значений
function Component({ items }) {
  const expensiveValue = useMemo(() => {
    return items.reduce((acc, item) => acc + item.value, 0)
  }, [items])
  
  const handleClick = useCallback((id: string) => {
    // Обработчик
  }, [])
  
  return <div>{expensiveValue}</div>
}
```

### 3. Оптимизация изображений

Автоматическая оптимизация через Next.js Image:

```typescript
import Image from 'next/image'

<Image
  src="/hero-image.jpg"
  alt="Hero"
  width={1200}
  height={600}
  priority // для критических изображений
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

## Безопасность

### 1. CSP заголовки

Настройка Content Security Policy:

```typescript
// next.config.ts
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' blob: data:;
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`

export default {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, '')
          }
        ]
      }
    ]
  }
}
```

### 2. Валидация данных

Валидация на всех уровнях:

```typescript
// Схемы валидации
const contactSchema = z.object({
  email: z.string().email(),
  message: z.string().min(10).max(1000)
})

// Server Action с валидацией
export async function submitContact(formData: FormData) {
  const data = contactSchema.parse({
    email: formData.get('email'),
    message: formData.get('message')
  })
  
  // Обработка валидных данных
}
```

### 3. Санитизация

Очистка пользовательского ввода:

```typescript
import DOMPurify from 'isomorphic-dompurify'

function sanitizeHtml(html: string) {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em'],
    ALLOWED_ATTR: []
  })
}
```

## Тестирование

### 1. Архитектура тестов

```
__tests__/
├── components/        # Тесты компонентов
├── pages/            # Тесты страниц
├── utils/            # Тесты утилит
└── e2e/              # E2E тесты
```

### 2. Стратегия тестирования

- **Unit тесты** - для утилит и хуков
- **Component тесты** - для UI компонентов
- **Integration тесты** - для фич
- **E2E тесты** - для критических путей

## Мониторинг

### 1. Отслеживание ошибок

Интеграция с Sentry для мониторинга:

```typescript
// Обработка ошибок
Sentry.captureException(error, {
  tags: {
    component: 'ContactForm',
    action: 'submit'
  },
  extra: {
    formData: sanitizedData
  }
})
```

### 2. Метрики производительности

Отслеживание Core Web Vitals:

```typescript
// Автоматический сбор метрик
export function reportWebVitals(metric) {
  if (metric.label === 'web-vital') {
    // Отправка в аналитику
    gtag('event', metric.name, {
      value: Math.round(metric.value),
      event_label: metric.id
    })
  }
}
```

## Следующие шаги

- [Feature-Sliced Design](./fsd.md)
- [Паттерны проектирования](./patterns.md)
- [Стандарты кода](../development/code-standards.md)
