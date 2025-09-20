import type { NextConfig } from "next";

const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vitals.vercel-insights.com https://yandex.com https://*.yandex.com https://*.yandex.ru",
  "style-src 'self' 'unsafe-inline' https://yandex.com https://*.yandex.com",
  "img-src 'self' data: blob: https: https://i.ytimg.com https://img.youtube.com https://yandex.com https://*.yandex.com https://*.yandex.ru",
  "font-src 'self' data: https://yandex.com https://*.yandex.com",
  "connect-src 'self' https://vitals.vercel-insights.com https://yandex.com https://*.yandex.com https://*.yandex.ru",
  "frame-src 'self' https://docs.google.com https://www.google.com https://www.youtube.com https://www.youtube-nocookie.com https://yandex.com https://*.yandex.com https://*.yandex.ru",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

const baseSecurityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  // CSP добавляем только в продакшене
] as const;

const securityHeaders =
  process.env.NODE_ENV === "production"
    ? [
        ...baseSecurityHeaders,
        {
          key: "Content-Security-Policy",
          value: process.env.CSP ?? CSP,
        },
      ]
    : baseSecurityHeaders;

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,

  // Оптимизация импортов библиотек
  experimental: {
    optimizePackageImports: [
      "motion/react",
      "date-fns",
      "lucide-react",
      "@radix-ui/react-accordion",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-navigation-menu",
      "@radix-ui/react-scroll-area",
      "react-hook-form",
      "zod",
    ],
    // Оптимизация CSS
    optimizeCss: true,
    // Турбо режим для сборки
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },

  // Оптимизация производительности
  onDemandEntries: {
    // Период в мс для хранения страниц в памяти
    maxInactiveAge: 25 * 1000,
    // Количество одновременно компилируемых страниц
    pagesBufferLength: 2,
  },

  // Сжатие и оптимизация
  compress: true,

  // Настройки изображений с оптимизацией
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "img.youtube.com" },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 год
    // Ленивая загрузка по умолчанию
    loader: "default",
    // Оптимизация для production
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Webpack оптимизации
  webpack: (config, { dev }) => {
    // Оптимизация для production
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: "all",
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: "vendors",
              chunks: "all",
              priority: 10,
            },
            common: {
              name: "common",
              minChunks: 2,
              chunks: "all",
              priority: 5,
              reuseExistingChunk: true,
            },
            icons: {
              test: /[\\/]node_modules[\\/](lucide-react|@tabler[\\/]icons-react)[\\/]/,
              name: "icons",
              chunks: "all",
              priority: 15,
            },
            motion: {
              test: /[\\/]node_modules[\\/]motion[\\/]/,
              name: "motion",
              chunks: "all",
              priority: 15,
            },
            radix: {
              test: /[\\/]node_modules[\\/]@radix-ui[\\/]/,
              name: "radix",
              chunks: "all",
              priority: 12,
            },
            forms: {
              test: /[\\/]node_modules[\\/](react-hook-form|zod)[\\/]/,
              name: "forms",
              chunks: "all",
              priority: 12,
            },
          },
        },
      };
    }

    return config;
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders as unknown as { key: string; value: string }[],
      },
      // Кэширование статических ресурсов
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Кэширование изображений
      {
        source: "/:path*.{jpg,jpeg,png,webp,avif,svg,ico}",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Кэширование шрифтов
      {
        source: "/:path*.{woff,woff2,eot,ttf,otf}",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Preload критических ресурсов
      {
        source: "/",
        headers: [
          {
            key: "Link",
            value: "</images/logos/logo.svg>; rel=preload; as=image",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
