# Виджеты

Документация по всем переиспользуемым виджетам в `/src/widgets`. Виджеты — это композитные UI блоки, состоящие из нескольких компонентов.

## Навигационные виджеты

### NavBar

Основная навигационная панель сайта.

```typescript
import { NavBar } from '@/widgets/NavBar'

<NavBar />
```

**Функциональность:**
- Адаптивное меню для мобильных и десктопных устройств
- Переключатель языков
- Логотип с ссылкой на главную
- Автоматическое выделение активной страницы

**Конфигурация:** `/src/shared/config/common/navigation.tsx`

### AppAutoBreadcrumbs

Автоматические хлебные крошки на основе URL.

```typescript
import { AppAutoBreadcrumbs } from '@/widgets/AppAutoBreadcrumbs'

<AppAutoBreadcrumbs />
```

**Функциональность:**
- Автоматическое построение крошек из URL
- Поддержка локализации
- SEO JSON-LD разметка
- Специальная обработка страниц курсов

### AppBreadcrumbs

Ручные хлебные крошки с кастомной конфигурацией.

```typescript
import { AppBreadcrumbs } from '@/widgets/AppBreadcrumbs'

<AppBreadcrumbs 
  items={[
    { name: 'Главная', href: '/' },
    { name: 'Курсы', href: '/courses' },
    { name: 'JavaScript' }
  ]}
/>
```

### Footer

Подвал сайта.

```typescript
import { Footer } from '@/widgets/Footer'

<Footer />
```

**Функциональность:**
- Ссылки на основные разделы
- Социальные сети
- Контактная информация
- Копирайт

**Конфигурация:** `/src/shared/config/common/footer.tsx`

## Контентные виджеты

### Hero

Героическая секция для главной страницы.

```typescript
import { Hero } from '@/widgets/Hero'

<Hero config={heroConfig} />
```

**Пропсы:**
```typescript
interface HeroConfig {
  title: string
  subtitle: string
  description: string
  primaryButton: {
    text: string
    href: string
  }
  secondaryButton: {
    text: string
    href: string
  }
  backgroundVideo?: string
}
```

**Функциональность:**
- Анимированный текст
- Фоновое видео
- Две кнопки действий
- Адаптивный дизайн

### IntroWithDesc

Секция введения с описанием.

```typescript
import { IntroWithDesc } from '@/widgets/IntroWithDesc'

<IntroWithDesc config={introConfig} />
```

**Пропсы:**
```typescript
interface IntroConfig {
  title: string
  description: string
  image?: {
    src: string
    alt: string
  }
}
```

### ContentSection

Универсальная контентная секция.

```typescript
import { ContentSection } from '@/widgets/ContentSection'

<ContentSection config={contentConfig} />
```

**Пропсы:**
```typescript
interface ContentConfig {
  title: string
  content: string
  image?: {
    src: string
    alt: string
    position: 'left' | 'right'
  }
}
```

### FeaturesSection

Секция возможностей/преимуществ.

```typescript
import { FeaturesSection } from '@/widgets/FeaturesSection'

<FeaturesSection config={featuresConfig} />
```

**Пропсы:**
```typescript
interface FeaturesConfig {
  title: string
  description: string
  features: Array<{
    id: string
    title: string
    description: string
    icon: string
  }>
}
```

## Интерактивные виджеты

### Carousel

Карусель с автоматической прокруткой.

```typescript
import { Carousel } from '@/widgets/Carousel'

<Carousel config={carouselConfig} />
```

**Пропсы:**
```typescript
interface CarouselConfig {
  items: Array<{
    id: string
    title: string
    description: string
    image: string
    href?: string
  }>
  autoPlay?: boolean
  interval?: number
}
```

### VideoCardsCarousel

Карусель видео-карточек.

```typescript
import { VideoCardsCarousel } from '@/widgets/VideoCardsCarousel'

<VideoCardsCarousel config={videoConfig} />
```

**Функциональность:**
- Превью видео
- Модальное воспроизведение
- Адаптивная сетка
- Lazy loading

### LogoCarouselSection

Карусель логотипов партнеров.

```typescript
import { LogoCarouselSection } from '@/widgets/LogoCarouselSection'

<LogoCarouselSection config={logoConfig} />
```

**Пропсы:**
```typescript
interface LogoConfig {
  title: string
  logos: Array<{
    id: string
    name: string
    src: string
    href?: string
  }>
}
```

## Специализированные виджеты

### Courses

Список курсов с фильтрацией.

```typescript
import { Courses } from '@/widgets/Courses'

<Courses config={coursesConfig} />
```

**Пропсы:**
```typescript
interface CoursesConfig {
  title: string
  list: readonly Course[]
  levels: {
    beginner: string
    intermediate: string
    advanced: string
  }
  formats: {
    online: string
    offline: string
    hybrid: string
  }
}
```

**Функциональность:**
- Адаптивная сетка курсов
- Анимированные карточки
- Иконки и темы
- Мета-информация (уровень, формат, длительность)

### CourseTopics

Темы курса для детальной страницы.

```typescript
import { CourseTopics } from '@/widgets/CourseTopics'

<CourseTopics config={topicsConfig} />
```

**Пропсы:**
```typescript
interface TopicsConfig {
  title: string
  topics: Array<{
    id: string
    title: string
    description: string
    duration: string
    lessons: number
  }>
}
```

### UserCard

Карточка пользователя/преподавателя.

```typescript
import { UserCard } from '@/widgets/UserCard'

<UserCard config={userConfig} />
```

**Пропсы:**
```typescript
interface UserConfig {
  name: string
  role: string
  bio: string
  avatar: string
  social?: {
    linkedin?: string
    github?: string
    twitter?: string
  }
}
```

### TeamSection

Секция команды.

```typescript
import { TeamSection } from '@/widgets/TeamSection'

<TeamSection config={teamConfig} />
```

**Пропсы:**
```typescript
interface TeamConfig {
  title: string
  description: string
  members: Array<UserConfig>
}
```

## Формы и взаимодействие

### SmartForm

Умная форма с валидацией.

```typescript
import { SmartForm } from '@/widgets/SmartForm'

<SmartForm config={formConfig} />
```

**Пропсы:**
```typescript
interface SmartFormConfig {
  title: string
  description?: string
  fields: Array<{
    name: string
    type: 'text' | 'email' | 'tel' | 'textarea' | 'select'
    label: string
    placeholder?: string
    required?: boolean
    options?: Array<{ value: string; label: string }>
  }>
  submitButton: {
    text: string
    loadingText: string
  }
  onSubmit: (data: FormData) => Promise<void>
}
```

**Функциональность:**
- React Hook Form интеграция
- Валидация полей
- Состояния загрузки
- Обработка ошибок

### FaqAccordion

Аккордеон для FAQ.

```typescript
import { FaqAccordion } from '@/widgets/FaqAccordion'

<FaqAccordion config={faqConfig} />
```

**Пропсы:**
```typescript
interface FaqConfig {
  title: string
  items: Array<{
    id: string
    question: string
    answer: string
    icon?: string
  }>
}
```

### ContactTilesSection

Секция контактных плиток.

```typescript
import { ContactTilesSection } from '@/widgets/ContactTilesSection'

<ContactTilesSection config={contactsConfig} />
```

**Функциональность:**
- Различные типы контактов (телефон, email, адрес)
- Интерактивные плитки
- Иконки и анимации

## Призывы к действию

### CallToAction

Секция призыва к действию.

```typescript
import { CallToAction } from '@/widgets/CallToAction'

<CallToAction config={ctaConfig} />
```

**Пропсы:**
```typescript
interface CtaConfig {
  title: string
  description: string
  button: {
    text: string
    href: string
    variant?: 'primary' | 'secondary'
  }
  background?: 'gradient' | 'image' | 'video'
}
```

### CtaBanner

Баннер призыва к действию.

```typescript
import { CtaBanner } from '@/widgets/CtaBanner'

<CtaBanner config={bannerConfig} />
```

**Функциональность:**
- Компактный формат
- Фоновые эффекты
- Анимации при скролле

## Визуальные эффекты

### GlowingGrid

Светящаяся сетка с эффектами.

```typescript
import { GlowingGrid } from '@/widgets/GlowingGrid'

<GlowingGrid config={gridConfig} />
```

**Пропсы:**
```typescript
interface GridConfig {
  title: string
  items: Array<{
    id: string
    title: string
    description: string
    icon: string
    color: string
  }>
  columns?: 2 | 3 | 4
}
```

**Функциональность:**
- Анимированные эффекты свечения
- Интерактивные карточки
- Адаптивная сетка

### AnimatedLinesBadges

Анимированные бейджи с линиями.

```typescript
import { AnimatedLinesBadges } from '@/widgets/AnimatedLinesBadges'

<AnimatedLinesBadges config={badgesConfig} />
```

**Функциональность:**
- Анимированные соединительные линии
- Плавные переходы
- Интерактивные состояния

## Интеграции

### Maps

Интеграция с картами.

```typescript
import { Maps } from '@/widgets/Maps'

<Maps config={mapsConfig} />
```

**Пропсы:**
```typescript
interface MapsConfig {
  center: {
    lat: number
    lng: number
  }
  zoom: number
  markers?: Array<{
    lat: number
    lng: number
    title: string
    description?: string
  }>
}
```

**Функциональность:**
- Google Maps интеграция
- Кастомные маркеры
- Адаптивный размер

## Общие принципы

### Конфигурация

Все виджеты используют конфигурационный подход:

```typescript
// Конфигурация в /src/shared/config/
export function getWidgetConfig(locale: Locale): WidgetConfig {
  return {
    // конфигурация виджета
  }
}

// Использование в странице
const config = getWidgetConfig(locale)
<Widget config={config} />
```

### Типизация

Все виджеты строго типизированы:

```typescript
export interface WidgetProps {
  config: WidgetConfig
  className?: string
}

export function Widget({ config, className }: WidgetProps) {
  // реализация
}
```

### Стилизация

Виджеты используют:
- Tailwind CSS классы
- CSS переменные для цветов
- Адаптивный дизайн
- Анимации и переходы

### Accessibility

Все виджеты поддерживают:
- Семантическую разметку
- ARIA атрибуты
- Клавиатурную навигацию
- Screen readers

## Следующие шаги

- [Кастомные компоненты](./custom-components.md)
- [Добавление новых виджетов](../development/creating-widgets.md)
- [Дизайн-система](../design/colors.md)
