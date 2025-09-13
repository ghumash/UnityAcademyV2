# Кастомные компоненты

Документация по специализированным UI компонентам в `/src/shared/ui/custom` и `/src/shared/ui/lib`.

## Кастомные базовые компоненты

### Container

Контейнер для ограничения ширины контента.

```typescript
import { Container } from '@/shared/ui/custom'

<Container>
  <p>Контент с ограниченной шириной</p>
</Container>

// С кастомными классами
<Container className="py-8">
  <p>Контент с отступами</p>
</Container>
```

**Функциональность:**
- Максимальная ширина с центрированием
- Адаптивные отступы
- Поддержка кастомных классов

**Стили:**
- `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`

### Section

Секция для структурирования страницы.

```typescript
import { Section } from '@/shared/ui/custom'

<Section>
  <Container>
    <h2>Заголовок секции</h2>
    <p>Контент секции</p>
  </Container>
</Section>

// С кастомными отступами
<Section className="py-16">
  <Container>
    <p>Секция с большими отступами</p>
  </Container>
</Section>
```

**Функциональность:**
- Стандартные вертикальные отступы
- Семантическая разметка
- Поддержка кастомизации

**Стили:**
- `py-12 sm:py-16 lg:py-20`

### SkipLink

Ссылка для пропуска навигации (accessibility).

```typescript
import { SkipLink } from '@/shared/ui/custom'

<SkipLink href="#main-content">
  Перейти к основному контенту
</SkipLink>
```

**Функциональность:**
- Скрыта по умолчанию
- Появляется при фокусе с клавиатуры
- Улучшает доступность для screen readers

### PromoVideo

Компонент для промо-видео с превью.

```typescript
import { PromoVideo } from '@/shared/ui/custom'

<PromoVideo
  src="/videos/promo.mp4"
  poster="/images/video-poster.jpg"
  title="Промо-видео Unity Academy"
  autoPlay={false}
  controls={true}
/>
```

**Пропсы:**
```typescript
interface PromoVideoProps {
  src: string
  poster?: string
  title?: string
  autoPlay?: boolean
  controls?: boolean
  muted?: boolean
  loop?: boolean
  className?: string
}
```

**Функциональность:**
- Адаптивный размер
- Lazy loading
- Поддержка различных форматов
- Accessibility атрибуты

## Специализированные UI компоненты

### GradientHeading

Заголовок с градиентным эффектом.

```typescript
import { GradientHeading } from '@/shared/ui/lib'

<GradientHeading 
  as="h1" 
  gradient="primary"
  className="text-4xl font-bold"
>
  Заголовок с градиентом
</GradientHeading>
```

**Пропсы:**
```typescript
interface GradientHeadingProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  gradient?: 'primary' | 'secondary' | 'accent' | 'rainbow'
  children: React.ReactNode
  className?: string
}
```

**Градиенты:**
- `primary`: синий → фиолетовый
- `secondary`: зеленый → синий
- `accent`: оранжевый → розовый
- `rainbow`: многоцветный градиент

### TextGenerateEffect

Эффект печатающегося текста.

```typescript
import { TextGenerateEffect } from '@/shared/ui/lib'

<TextGenerateEffect 
  words="Добро пожаловать в Unity Academy"
  duration={2000}
  className="text-2xl"
/>
```

**Пропсы:**
```typescript
interface TextGenerateEffectProps {
  words: string
  duration?: number
  className?: string
  filter?: boolean
  onComplete?: () => void
}
```

**Функциональность:**
- Анимация появления слов
- Настраиваемая скорость
- Callback при завершении
- Фильтр размытия

### TextHoverEffect

Эффект при наведении на текст.

```typescript
import { TextHoverEffect } from '@/shared/ui/lib'

<TextHoverEffect 
  text="Наведи на меня"
  duration={300}
  className="text-xl font-semibold"
/>
```

**Функциональность:**
- Анимация букв при наведении
- Настраиваемая длительность
- Плавные переходы

### Highlighter

Компонент для подсветки текста.

```typescript
import { Highlighter } from '@/shared/ui/lib'

<Highlighter
  text="Это важный текст с подсветкой"
  highlight="важный"
  className="text-lg"
  highlightClassName="bg-yellow-200 text-yellow-800"
/>
```

**Пропсы:**
```typescript
interface HighlighterProps {
  text: string
  highlight: string | string[]
  className?: string
  highlightClassName?: string
  caseSensitive?: boolean
}
```

**Функциональность:**
- Подсветка одного или нескольких слов
- Регистрозависимый поиск
- Кастомные стили подсветки

### HighlightCard

Карточка с эффектом подсветки.

```typescript
import { HighlightCard } from '@/shared/ui/lib'

<HighlightCard
  title="Заголовок карточки"
  description="Описание карточки"
  icon="🚀"
  gradient="primary"
  className="p-6"
>
  <p>Дополнительный контент</p>
</HighlightCard>
```

**Пропсы:**
```typescript
interface HighlightCardProps {
  title: string
  description?: string
  icon?: string | React.ReactNode
  gradient?: 'primary' | 'secondary' | 'accent'
  children?: React.ReactNode
  className?: string
  onClick?: () => void
}
```

**Функциональность:**
- Анимированная подсветка границ
- Градиентные эффекты
- Интерактивные состояния

### GlowingEffect

Эффект свечения для элементов.

```typescript
import { GlowingEffect } from '@/shared/ui/lib'

<GlowingEffect
  color="blue"
  intensity="medium"
  className="p-4 rounded-lg"
>
  <p>Светящийся контент</p>
</GlowingEffect>
```

**Пропсы:**
```typescript
interface GlowingEffectProps {
  color?: 'blue' | 'purple' | 'green' | 'orange' | 'pink'
  intensity?: 'low' | 'medium' | 'high'
  animated?: boolean
  children: React.ReactNode
  className?: string
}
```

**Функциональность:**
- Различные цвета свечения
- Настраиваемая интенсивность
- Анимированное свечение

## Карусели и слайдеры

### ProgressiveCarousel

Прогрессивная карусель с индикаторами.

```typescript
import { ProgressiveCarousel } from '@/shared/ui/lib'

<ProgressiveCarousel
  items={carouselItems}
  autoPlay={true}
  interval={5000}
  showIndicators={true}
  showArrows={true}
/>
```

**Пропсы:**
```typescript
interface ProgressiveCarouselProps {
  items: Array<{
    id: string
    content: React.ReactNode
  }>
  autoPlay?: boolean
  interval?: number
  showIndicators?: boolean
  showArrows?: boolean
  className?: string
  onSlideChange?: (index: number) => void
}
```

**Функциональность:**
- Автоматическая прокрутка
- Индикаторы прогресса
- Навигационные стрелки
- Touch/swipe поддержка

### LogoCarousel

Карусель логотипов с бесконечной прокруткой.

```typescript
import { LogoCarousel } from '@/shared/ui/lib'

<LogoCarousel
  logos={logoItems}
  speed="slow"
  direction="left"
  pauseOnHover={true}
/>
```

**Пропсы:**
```typescript
interface LogoCarouselProps {
  logos: Array<{
    id: string
    name: string
    src: string
    href?: string
  }>
  speed?: 'slow' | 'medium' | 'fast'
  direction?: 'left' | 'right'
  pauseOnHover?: boolean
  className?: string
}
```

**Функциональность:**
- Бесконечная прокрутка
- Настраиваемая скорость
- Пауза при наведении
- Адаптивный размер

### VideoCardsCarousel

Карусель видео-карточек.

```typescript
import { VideoCardsCarousel } from '@/shared/ui/lib'

<VideoCardsCarousel
  videos={videoItems}
  columns={3}
  gap="medium"
  showControls={true}
/>
```

**Пропсы:**
```typescript
interface VideoCardsCarouselProps {
  videos: Array<{
    id: string
    title: string
    description: string
    thumbnail: string
    videoUrl: string
    duration?: string
  }>
  columns?: 1 | 2 | 3 | 4
  gap?: 'small' | 'medium' | 'large'
  showControls?: boolean
  autoPlay?: boolean
  className?: string
}
```

**Функциональность:**
- Адаптивная сетка
- Модальное воспроизведение
- Lazy loading видео
- Превью с hover эффектами

## Принципы разработки

### Композиция

Кастомные компоненты строятся на основе базовых UI компонентов:

```typescript
// Пример композиции
export function CustomCard({ title, children, ...props }) {
  return (
    <Card {...props}>
      <CardHeader>
        <GradientHeading as="h3" gradient="primary">
          {title}
        </GradientHeading>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}
```

### Переиспользование

Компоненты проектируются для максимального переиспользования:

```typescript
// Гибкая конфигурация
interface FlexibleComponentProps {
  variant?: 'primary' | 'secondary'
  size?: 'small' | 'medium' | 'large'
  children: React.ReactNode
  className?: string
  // Дополнительные пропсы
}
```

### Типизация

Все компоненты строго типизированы:

```typescript
// Экспорт типов для переиспользования
export type { GradientHeadingProps, TextGenerateEffectProps }

// Дженерики для гибкости
interface GenericListProps<T> {
  items: T[]
  renderItem: (item: T) => React.ReactNode
  keyExtractor: (item: T) => string
}
```

### Accessibility

Все компоненты поддерживают доступность:

```typescript
// Пример с ARIA атрибутами
<div
  role="button"
  tabIndex={0}
  aria-label="Описание действия"
  onKeyDown={handleKeyDown}
  onClick={handleClick}
>
  {children}
</div>
```

### Производительность

Компоненты оптимизированы для производительности:

```typescript
// Мемоизация
const OptimizedComponent = React.memo(({ data, ...props }) => {
  const memoizedValue = useMemo(() => expensiveCalculation(data), [data])
  
  return <div {...props}>{memoizedValue}</div>
})

// Lazy loading
const LazyComponent = React.lazy(() => import('./HeavyComponent'))
```

## Создание новых компонентов

### Структура файла

```typescript
// ComponentName.tsx
import React from 'react'
import { cn } from '@/shared/lib/utils'

export interface ComponentNameProps {
  // пропсы
}

export function ComponentName({ 
  prop1, 
  prop2, 
  className, 
  ...props 
}: ComponentNameProps) {
  return (
    <div className={cn("base-classes", className)} {...props}>
      {/* содержимое */}
    </div>
  )
}

// Экспорт типов
export type { ComponentNameProps }
```

### Документация компонента

```typescript
/**
 * ComponentName - краткое описание
 * 
 * @example
 * <ComponentName prop1="value" prop2={true} />
 * 
 * @param prop1 - описание пропса
 * @param prop2 - описание пропса
 */
```

## Следующие шаги

- [Создание новых компонентов](../development/creating-components.md)
- [Тестирование компонентов](../development/testing.md)
- [Дизайн-система](../design/colors.md)
