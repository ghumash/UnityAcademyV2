// Flat config для ESLint v9 + Next.js + TS
import { FlatCompat } from "@eslint/eslintrc";
import unusedImports from "eslint-plugin-unused-imports";
import unityPlugin from "./tools/eslint-plugin-unity/index.mjs";

// базовая директория для compat-режима
const compat = new FlatCompat({
  baseDirectory: new URL(".", import.meta.url).pathname,
});

export default [
  // игноры
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "dist/**",
      "out/**",
      "coverage/**",
    ],
  },

  // правила Next.js (core-web-vitals) через compat
  ...compat.extends("next/core-web-vitals"),

  // общие правила проекта
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: { "unused-imports": unusedImports },
    rules: {
      // чистим неиспользуемые импорты/переменные
      "unused-imports/no-unused-imports": "warn",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      // консоль оставляем для warn/error
      "no-console": ["warn", { allow: ["warn", "error"] }],
      // проверяем существование импортируемых модулей (отключаем для server-only)
      "import/no-unresolved": "off",
      // предотвращаем некорректные экспорты
      "import/export": "error",
    },
  },

  // Next 15: params в page/layout/generateMetadata → Promise<...>, иначе ошибка
  {
    files: ["src/app/**/layout.tsx", "src/app/**/page.tsx"],
    plugins: { unity: unityPlugin },
    rules: {
      "unity/require-async-params": "error",
    },
  },
];
