# CountdownTimer Component

Модульный компонент обратного отсчета с поддержкой различных вариантов отображения и анимаций.

## Структура

```
CoutdownTimer/
├── CountdownTimer.tsx      # Основной компонент (75 строк)
├── types.ts               # TypeScript типы и интерфейсы
├── config.ts              # Конфигурации размеров и цветовых схем
├── utils.ts               # Утилиты (склонение времени)
├── AnimatedParticles.tsx  # Анимированные частицы
├── AnimatedBackground.tsx # Анимированный фон
├── TimeUnit.tsx           # Отдельная единица времени
├── ProgressBar.tsx        # Прогресс-бар
├── TimerHeader.tsx        # Заголовок с иконкой
├── CompactTimer.tsx       # Компактный вариант
├── PremiumTimer.tsx       # Premium вариант
├── CardTimer.tsx          # Основной вариант-карточка
├── index.ts               # Экспорты
└── README.md              # Документация
```

## Использование

### Базовое использование

```tsx
import { CountdownTimer } from '@/shared/ui/custom/CoutdownTimer';

<CountdownTimer
  storageKey="promo-timer"
  durationDays={3}
  title="Специальное предложение"
  subtitle="Успейте записаться!"
/>
```

### Варианты отображения

#### Компактный вариант
```tsx
<CountdownTimer
  variant="compact"
  storageKey="compact-timer"
  durationDays={1}
/>
```

#### Premium вариант с эффектами
```tsx
<CountdownTimer
  variant="premium"
  colorScheme="neon"
  size="lg"
  storageKey="premium-timer"
  durationDays={7}
/>
```

#### Основной вариант (карточка)
```tsx
<CountdownTimer
  variant="card"
  colorScheme="gradient"
  size="md"
  storageKey="card-timer"
  durationDays={5}
/>
```

## Параметры

| Параметр | Тип | По умолчанию | Описание |
|----------|-----|--------------|----------|
| `storageKey` | `string` | - | Ключ для localStorage (обязательный) |
| `durationDays` | `number` | `3` | Продолжительность в днях |
| `title` | `string` | - | Заголовок таймера |
| `subtitle` | `string` | - | Подзаголовок |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Размер компонента |
| `variant` | `"compact" \| "card"` | `"card"` | Вариант отображения |
| `colorScheme` | `"gradient" \| "neon" \| "sunset" \| "ocean" \| "forest" \| "yellow"` | `"gradient"` | Цветовая схема |
| `onExpire` | `() => void` | - | Callback при истечении времени |
| `className` | `string` | - | Дополнительные CSS классы |

## Цветовые схемы

- **gradient** - фиолетово-розовые градиенты
- **neon** - кибер-стиль с голубыми оттенками  
- **sunset** - теплые оранжево-красные тона
- **ocean** - морские сине-зеленые цвета
- **forest** - природные зеленые оттенки
- **yellow** - солнечные желто-оранжевые тона

## Варианты

- **compact** - минимальный размер для встраивания
- **card** - основной вариант с полным функционалом для hero-секций

## Особенности

### Адаптивность
- Автоматическая адаптация под размер экрана
- Оптимизированные размеры для мобильных устройств

### Простота
- Минимальные анимации для лучшей производительности
- Чистый и понятный интерфейс
- Респектирование `prefers-reduced-motion`

### Локализация
- Поддержка склонения времени для русского языка
- Автоматическое определение языка из словаря

### Состояния
- **Активное** - таймер работает и отсчитывает время
- **Истекшее** - время вышло, компонент скрывается

## Архитектура

Компонент построен по принципу модульной архитектуры:

1. **Разделение ответственности** - каждый файл отвечает за одну функцию
2. **Переиспользование** - подкомпоненты можно использовать независимо
3. **Типобезопасность** - полная поддержка TypeScript
4. **Производительность** - возможность ленивой загрузки

## Примеры интеграции

### В hero-секции
```tsx
<CountdownTimer
  variant="premium"
  size="lg"
  colorScheme="gradient"
  storageKey="course-enrollment"
  durationDays={10}
  title="Запись на курс заканчивается"
  subtitle="Не упустите возможность!"
/>
```

### В боковой панели
```tsx
<CountdownTimer
  variant="compact"
  size="sm"
  storageKey="sidebar-promo"
  durationDays={2}
/>
```

### В модальном окне
```tsx
<CountdownTimer
  variant="card"
  size="md"
  colorScheme="neon"
  storageKey="modal-offer"
  durationDays={1}
  onExpire={() => closeModal()}
/>
```
