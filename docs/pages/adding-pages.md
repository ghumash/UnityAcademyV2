# Добавление новых страниц

Руководство по созданию новых страниц в Unity Academy V2 с использованием Next.js App Router.

## Структура страниц

### Локализованные страницы

Все страницы должны создаваться в директории `/src/app/[locale]/`:

```
src/app/[locale]/
├── (home)/           # Группа для главной страницы
│   ├── page.tsx      # Главная страница
│   └── loading.tsx   # Скелетон загрузки
├── about/            # Страница "О нас"
├── courses/          # Страницы курсов
├── new-page/         # Новая страница
│   ├── page.tsx      # Основная страница
│   ├── loading.tsx   # Скелетон загрузки
│   ├── error.tsx     # Страница ошибки (опционально)
│   └── not-found.tsx # 404 страница (опционально)
```

## Создание новой страницы

### 1. Создание директории и файлов

```bash
# Создаем директорию для новой страницы
mkdir src/app/[locale]/new-page

# Создаем основные файлы
touch src/app/[locale]/new-page/page.tsx
touch src/app/[locale]/new-page/loading.tsx
```

### 2. Основной файл страницы

```typescript
// src/app/[locale]/new-page/page.tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getT, type Locale } from '@/shared/lib/i18n'
import { createMetadata, JsonLd, buildBreadcrumbsJsonLd, buildOrganizationJsonLd } from '@/shared/seo'
import { siteConfig } from '@/shared/config/common/site'
import { Container, Section } from '@/shared/ui/custom'
import { AppAutoBreadcrumbs } from '@/widgets/AppAutoBreadcrumbs'

// Импорт конфигурации страницы
import { getNewPageConfig } from '@/shared/config/new-page/newPageConfig'

// Импорт виджетов
import { Hero } from '@/widgets/Hero'
import { ContentSection } from '@/widgets/ContentSection'
import { CtaBanner } from '@/widgets/CtaBanner'

interface NewPageProps {
  params: {
    locale: Locale
  }
}

// Генерация метаданных
export async function generateMetadata({
  params: { locale }
}: NewPageProps): Promise<Metadata> {
  const t = await getT(locale)
  
  return createMetadata({
    title: t('pages.newPage.meta.title'),
    description: t('pages.newPage.meta.description'),
    alternatesPath: siteConfig.routes.newPage,
    locale
  })
}

// Основной компонент страницы
export default async function NewPage({
  params: { locale }
}: NewPageProps) {
  const t = await getT(locale)
  
  // Получаем конфигурацию страницы
  const config = getNewPageConfig(locale)
  
  return (
    <>
      {/* SEO JSON-LD */}
      <JsonLd
        id="organization-new-page"
        data={buildOrganizationJsonLd()}
      />
      <JsonLd
        id="breadcrumbs-new-page"
        data={buildBreadcrumbsJsonLd([
          { name: t("common.navigation.home"), href: `/${locale}` },
          { name: t("common.navigation.newPage"), href: `/${locale}${siteConfig.routes.newPage}` },
        ])}
      />

      {/* Хлебные крошки */}
      <Section className="pt-6 pb-0">
        <Container>
          <AppAutoBreadcrumbs />
        </Container>
      </Section>

      {/* Основной контент */}
      <main id="main-content">
        {/* Героическая секция */}
        <Hero config={config.hero} />
        
        {/* Контентные секции */}
        {config.sections.map((section, index) => (
          <ContentSection 
            key={section.id} 
            config={section} 
          />
        ))}
        
        {/* Призыв к действию */}
        <CtaBanner config={config.cta} />
      </main>
    </>
  )
}
```

### 3. Скелетон загрузки

```typescript
// src/app/[locale]/new-page/loading.tsx
import { Skeleton } from '@/shared/ui'
import { Container, Section } from '@/shared/ui/custom'

export default function LoadingNewPage() {
  return (
    <>
      {/* Breadcrumbs skeleton */}
      <Section className="pt-6 pb-0">
        <Container>
          <div className="flex items-center gap-2 text-sm">
            <Skeleton className="h-4 w-12" />
            <span className="text-white/40">/</span>
            <Skeleton className="h-4 w-20" />
          </div>
        </Container>
      </Section>

      {/* Hero skeleton */}
      <Section>
        <Container>
          <div className="text-center space-y-6">
            <Skeleton className="h-12 w-3/4 mx-auto" />
            <Skeleton className="h-6 w-1/2 mx-auto" />
            <div className="flex gap-4 justify-center">
              <Skeleton className="h-12 w-32" />
              <Skeleton className="h-12 w-32" />
            </div>
          </div>
        </Container>
      </Section>

      {/* Content sections skeleton */}
      {Array.from({ length: 3 }).map((_, i) => (
        <Section key={i}>
          <Container>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/5" />
              </div>
              <Skeleton className="h-64 w-full rounded-lg" />
            </div>
          </Container>
        </Section>
      ))}

      {/* CTA Banner skeleton */}
      <Section>
        <Container>
          <div className="text-center space-y-4 p-8 rounded-lg bg-white/5">
            <Skeleton className="h-8 w-1/2 mx-auto" />
            <Skeleton className="h-4 w-2/3 mx-auto" />
            <Skeleton className="h-12 w-40 mx-auto" />
          </div>
        </Container>
      </Section>
    </>
  )
}
```

## Конфигурация страницы

### 1. Создание конфигурации

```typescript
// src/shared/config/new-page/newPageConfig.tsx
import { type Locale } from '@/shared/lib/i18n'
import { siteConfig } from '@/shared/config/common/site'

export interface NewPageConfig {
  hero: {
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
  }
  sections: Array<{
    id: string
    title: string
    content: string
    image?: {
      src: string
      alt: string
      position: 'left' | 'right'
    }
  }>
  cta: {
    title: string
    description: string
    button: {
      text: string
      href: string
    }
  }
}

export function getNewPageConfig(locale: Locale): NewPageConfig {
  // Здесь можно добавить логику для разных языков
  return {
    hero: {
      title: 'Заголовок новой страницы',
      subtitle: 'Подзаголовок',
      description: 'Описание страницы...',
      primaryButton: {
        text: 'Основное действие',
        href: siteConfig.routes.apply
      },
      secondaryButton: {
        text: 'Узнать больше',
        href: siteConfig.routes.about
      }
    },
    sections: [
      {
        id: 'section-1',
        title: 'Первая секция',
        content: 'Контент первой секции...',
        image: {
          src: '/images/section-1.jpg',
          alt: 'Описание изображения',
          position: 'right'
        }
      }
      // Добавьте больше секций по необходимости
    ],
    cta: {
      title: 'Готовы начать?',
      description: 'Присоединяйтесь к нам уже сегодня',
      button: {
        text: 'Начать обучение',
        href: siteConfig.routes.apply
      }
    }
  }
}
```

## Добавление переводов

### 1. Создание переводов

```typescript
// src/shared/lib/i18n/directories/pages/newPage/hy.ts
export const newPage = {
  meta: {
    title: 'Նոր էջի վերնագիր | Unity Academy',
    description: 'Նոր էջի նկարագրություն...'
  },
  hero: {
    title: 'Նոր էջի վերնագիր',
    subtitle: 'Ենթավերնագիր',
    description: 'Էջի նկարագրություն...'
  },
  sections: {
    section1: {
      title: 'Առաջին բաժին',
      content: 'Առաջին բաժնի բովանդակություն...'
    }
  }
} as const

export type NewPageDict = typeof newPage
```

```typescript
// src/shared/lib/i18n/directories/pages/newPage/en.ts
import type { NewPageDict } from './hy'

export const newPage: NewPageDict = {
  meta: {
    title: 'New Page Title | Unity Academy',
    description: 'New page description...'
  },
  hero: {
    title: 'New Page Title',
    subtitle: 'Subtitle',
    description: 'Page description...'
  },
  sections: {
    section1: {
      title: 'First Section',
      content: 'First section content...'
    }
  }
}
```

### 2. Интеграция переводов

```typescript
// src/shared/lib/i18n/directories/pages/hy.ts
import { newPage } from './newPage/hy'

export const pages = {
  home,
  about,
  courses,
  newPage // Добавляем новую страницу
} as const
```

### 3. Обновление навигации

```typescript
// src/shared/config/common/navigation.tsx
export function getNavigationConfig(locale: Locale): NavigationConfig {
  const t = getT(locale)
  
  return {
    main: [
      {
        name: t('common.navigation.home'),
        href: siteConfig.routes.home
      },
      {
        name: t('common.navigation.about'),
        href: siteConfig.routes.about
      },
      {
        name: t('common.navigation.courses'),
        href: siteConfig.routes.courses
      },
      {
        name: t('common.navigation.newPage'), // Добавляем в навигацию
        href: siteConfig.routes.newPage
      }
    ]
  }
}
```

## Добавление маршрута

### 1. Обновление siteConfig

```typescript
// src/shared/config/common/site.ts
export const siteConfig = {
  routes: {
    home: '/',
    about: '/about',
    courses: '/courses',
    contacts: '/contacts',
    apply: '/apply',
    faq: '/faq',
    newPage: '/new-page' // Добавляем новый маршрут
  }
  // ...остальная конфигурация
} as const
```

### 2. Обновление sitemap

```typescript
// src/app/sitemap.ts
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    siteConfig.routes.home,
    siteConfig.routes.about,
    siteConfig.routes.courses,
    siteConfig.routes.contacts,
    siteConfig.routes.apply,
    siteConfig.routes.faq,
    siteConfig.routes.newPage // Добавляем в sitemap
  ]
  
  // ...остальная логика
}
```

## Динамические страницы

### Создание динамической страницы

```typescript
// src/app/[locale]/blog/[slug]/page.tsx
interface BlogPostProps {
  params: {
    locale: Locale
    slug: string
  }
}

export async function generateStaticParams() {
  // Генерируем статические параметры для всех постов
  const posts = await getBlogPosts()
  
  return posts.map((post) => ({
    slug: post.slug
  }))
}

export async function generateMetadata({
  params: { locale, slug }
}: BlogPostProps): Promise<Metadata> {
  const post = await getBlogPost(slug)
  
  if (!post) {
    return {}
  }
  
  return createMetadata({
    title: post.title,
    description: post.excerpt,
    alternatesPath: `/blog/${slug}`,
    locale
  })
}

export default async function BlogPost({
  params: { locale, slug }
}: BlogPostProps) {
  const post = await getBlogPost(slug)
  
  if (!post) {
    notFound()
  }
  
  return (
    <>
      {/* SEO и контент */}
    </>
  )
}
```

## Группы маршрутов

### Использование групп

```typescript
// Группа для админ панели
src/app/[locale]/(admin)/
├── dashboard/
├── users/
└── settings/

// Группа для публичных страниц
src/app/[locale]/(public)/
├── blog/
├── news/
└── events/
```

### Layout для группы

```typescript
// src/app/[locale]/(admin)/layout.tsx
export default function AdminLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-content">
        {children}
      </main>
    </div>
  )
}
```

## Обработка ошибок

### Кастомная страница ошибки

```typescript
// src/app/[locale]/new-page/error.tsx
'use client'

import { useEffect } from 'react'
import { Button } from '@/shared/ui'
import { Container, Section } from '@/shared/ui/custom'

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <Section>
      <Container>
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Что-то пошло не так!</h2>
          <p className="text-gray-600">
            Произошла ошибка при загрузке страницы.
          </p>
          <Button onClick={reset}>
            Попробовать снова
          </Button>
        </div>
      </Container>
    </Section>
  )
}
```

### Кастомная 404 страница

```typescript
// src/app/[locale]/new-page/not-found.tsx
import Link from 'next/link'
import { Button } from '@/shared/ui'
import { Container, Section } from '@/shared/ui/custom'
import { siteConfig } from '@/shared/config/common/site'

export default function NotFound() {
  return (
    <Section>
      <Container>
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Страница не найдена</h2>
          <p className="text-gray-600">
            Запрашиваемая страница не существует.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild>
              <Link href={siteConfig.routes.home}>
                На главную
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={siteConfig.routes.courses}>
                К курсам
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  )
}
```

## Лучшие практики

### 1. Структура файлов

- Используйте понятные имена директорий
- Создавайте loading.tsx для каждой страницы
- Добавляйте error.tsx для критичных страниц

### 2. SEO оптимизация

- Всегда добавляйте метаданные
- Используйте JSON-LD разметку
- Добавляйте хлебные крошки

### 3. Производительность

- Используйте generateStaticParams для статических страниц
- Оптимизируйте изображения
- Добавляйте скелетоны загрузки

### 4. Доступность

- Используйте семантическую разметку
- Добавляйте skip-links
- Обеспечьте клавиатурную навигацию

## Тестирование страниц

### Unit тесты

```typescript
// __tests__/pages/new-page.test.tsx
import { render, screen } from '@testing-library/react'
import NewPage from '@/app/[locale]/new-page/page'

describe('NewPage', () => {
  it('renders page title', () => {
    render(<NewPage params={{ locale: 'hy' }} />)
    
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument()
  })
})
```

### E2E тесты

```typescript
// e2e/new-page.spec.ts
import { test, expect } from '@playwright/test'

test('new page loads correctly', async ({ page }) => {
  await page.goto('/hy/new-page')
  
  await expect(page.locator('h1')).toBeVisible()
  await expect(page.locator('[data-testid="cta-button"]')).toBeVisible()
})
```

## Следующие шаги

- [Маршрутизация](./routing.md)
- [SEO и метаданные](./seo-metadata.md)
- [Система переводов](../i18n/translation-system.md)
