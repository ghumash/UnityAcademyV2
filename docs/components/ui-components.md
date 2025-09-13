# UI компоненты

Документация по всем переиспользуемым UI компонентам в `/src/shared/ui`.

## Базовые компоненты

### Button

Основной компонент кнопки с поддержкой различных вариантов и размеров.

```typescript
import { Button } from '@/shared/ui'

// Базовое использование
<Button>Нажми меня</Button>

// Варианты
<Button variant="default">По умолчанию</Button>
<Button variant="destructive">Удалить</Button>
<Button variant="outline">Контур</Button>
<Button variant="secondary">Вторичная</Button>
<Button variant="ghost">Призрак</Button>
<Button variant="link">Ссылка</Button>

// Размеры
<Button size="default">Обычная</Button>
<Button size="sm">Маленькая</Button>
<Button size="lg">Большая</Button>
<Button size="icon">Иконка</Button>

// Состояния
<Button disabled>Отключена</Button>
<Button loading>Загрузка</Button>
```

**Пропсы:**
- `variant`: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
- `size`: 'default' | 'sm' | 'lg' | 'icon'
- `disabled`: boolean
- `loading`: boolean
- `asChild`: boolean - для использования с другими компонентами

### Input

Компонент поля ввода с поддержкой различных типов.

```typescript
import { Input } from '@/shared/ui'

// Базовое использование
<Input placeholder="Введите текст" />

// Типы
<Input type="email" placeholder="email@example.com" />
<Input type="password" placeholder="Пароль" />
<Input type="number" placeholder="Число" />

// С состояниями
<Input disabled placeholder="Отключено" />
<Input error="Поле обязательно" />
```

**Пропсы:**
- `type`: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url'
- `placeholder`: string
- `disabled`: boolean
- `error`: string
- `className`: string

### Label

Компонент метки для форм.

```typescript
import { Label } from '@/shared/ui'

<Label htmlFor="email">Email адрес</Label>
<Input id="email" type="email" />
```

### Textarea

Многострочное поле ввода.

```typescript
import { Textarea } from '@/shared/ui'

<Textarea 
  placeholder="Введите ваше сообщение..."
  rows={4}
/>
```

### Checkbox

Компонент чекбокса.

```typescript
import { Checkbox } from '@/shared/ui'

<Checkbox id="terms" />
<Label htmlFor="terms">Согласен с условиями</Label>
```

### Select

Выпадающий список.

```typescript
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui'

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Выберите опцию" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Опция 1</SelectItem>
    <SelectItem value="option2">Опция 2</SelectItem>
  </SelectContent>
</Select>
```

## Компоненты навигации

### Breadcrumb

Компонент хлебных крошек.

```typescript
import { 
  Breadcrumb, 
  BreadcrumbList, 
  BreadcrumbItem, 
  BreadcrumbLink, 
  BreadcrumbSeparator,
  BreadcrumbPage 
} from '@/shared/ui'

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Главная</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Текущая страница</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

### NavigationMenu

Компонент навигационного меню.

```typescript
import { 
  NavigationMenu, 
  NavigationMenuList, 
  NavigationMenuItem, 
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink
} from '@/shared/ui'

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Курсы</NavigationMenuTrigger>
      <NavigationMenuContent>
        <NavigationMenuLink href="/courses/js">JavaScript</NavigationMenuLink>
        <NavigationMenuLink href="/courses/react">React</NavigationMenuLink>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

## Компоненты отображения данных

### Card

Компонент карточки.

```typescript
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/shared/ui'

<Card>
  <CardHeader>
    <CardTitle>Заголовок карточки</CardTitle>
    <CardDescription>Описание карточки</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Содержимое карточки</p>
  </CardContent>
  <CardFooter>
    <Button>Действие</Button>
  </CardFooter>
</Card>
```

### Badge

Компонент бейджа.

```typescript
import { Badge } from '@/shared/ui'

<Badge>По умолчанию</Badge>
<Badge variant="secondary">Вторичный</Badge>
<Badge variant="destructive">Деструктивный</Badge>
<Badge variant="outline">Контур</Badge>
```

### Avatar

Компонент аватара.

```typescript
import { Avatar, AvatarImage, AvatarFallback } from '@/shared/ui'

<Avatar>
  <AvatarImage src="/avatar.jpg" alt="Пользователь" />
  <AvatarFallback>ИП</AvatarFallback>
</Avatar>
```

### Skeleton

Компонент скелетона для загрузки.

```typescript
import { Skeleton } from '@/shared/ui'

<Skeleton className="h-4 w-[250px]" />
<Skeleton className="h-4 w-[200px]" />
```

## Интерактивные компоненты

### Accordion

Компонент аккордеона.

```typescript
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/ui'

<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Вопрос 1</AccordionTrigger>
    <AccordionContent>
      Ответ на первый вопрос
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

### DropdownMenu

Выпадающее меню.

```typescript
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuSeparator 
} from '@/shared/ui'

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline">Меню</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Пункт 1</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Пункт 2</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### Popover

Компонент всплывающего окна.

```typescript
import { Popover, PopoverTrigger, PopoverContent } from '@/shared/ui'

<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline">Открыть</Button>
  </PopoverTrigger>
  <PopoverContent>
    <p>Содержимое всплывающего окна</p>
  </PopoverContent>
</Popover>
```

### Sheet

Боковая панель.

```typescript
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from '@/shared/ui'

<Sheet>
  <SheetTrigger asChild>
    <Button>Открыть панель</Button>
  </SheetTrigger>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Заголовок панели</SheetTitle>
    </SheetHeader>
    <p>Содержимое панели</p>
  </SheetContent>
</Sheet>
```

## Утилитарные компоненты

### ScrollArea

Область прокрутки.

```typescript
import { ScrollArea } from '@/shared/ui'

<ScrollArea className="h-[200px] w-[350px] rounded-md border p-4">
  <div className="space-y-2">
    {Array.from({ length: 50 }).map((_, i) => (
      <div key={i}>Элемент {i + 1}</div>
    ))}
  </div>
</ScrollArea>
```

### Alert

Компонент уведомления.

```typescript
import { Alert, AlertDescription, AlertTitle } from '@/shared/ui'
import { AlertCircle } from 'lucide-react'

<Alert>
  <AlertCircle className="h-4 w-4" />
  <AlertTitle>Внимание!</AlertTitle>
  <AlertDescription>
    Это важное уведомление
  </AlertDescription>
</Alert>
```

### Calendar

Компонент календаря.

```typescript
import { Calendar } from '@/shared/ui'
import { useState } from 'react'

const [date, setDate] = useState<Date | undefined>(new Date())

<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  className="rounded-md border"
/>
```

## Формы

### Form

Компоненты для работы с формами (React Hook Form).

```typescript
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui'
import { useForm } from 'react-hook-form'

const form = useForm()

<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input placeholder="email@example.com" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  </form>
</Form>
```

## Уведомления

### Sonner

Компонент тостов (уведомлений).

```typescript
import { toast } from 'sonner'

// В компоненте
const handleClick = () => {
  toast.success('Операция выполнена успешно!')
  toast.error('Произошла ошибка')
  toast.info('Информационное сообщение')
}

// В layout.tsx должен быть <Toaster />
```

## Стилизация

Все компоненты используют:
- **Tailwind CSS** для стилизации
- **CSS переменные** для цветовой схемы
- **clsx** и **tailwind-merge** для условных классов
- **Radix UI** как основа для accessibility

### Кастомизация

```typescript
// Использование cn утилиты для объединения классов
import { cn } from '@/shared/lib/utils'

<Button className={cn("custom-class", isActive && "active-class")}>
  Кнопка
</Button>
```

## Accessibility

Все компоненты следуют принципам доступности:
- Поддержка клавиатурной навигации
- ARIA атрибуты
- Семантическая разметка
- Поддержка screen readers

## Следующие шаги

- [Кастомные компоненты](./custom-components.md)
- [Виджеты](./widgets.md)
- [Дизайн-система](../design/colors.md)
