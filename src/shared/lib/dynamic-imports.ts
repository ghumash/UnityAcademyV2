// Динамические импорты для библиотек с условной загрузкой

// Ленивый импорт motion/react только при необходимости анимаций
export const loadFramerMotion = async () => {
  const { motion, AnimatePresence, useReducedMotion } = await import(
    "motion/react"
  );
  return { motion, AnimatePresence, useReducedMotion };
};

// Ленивый импорт react-hook-form только для форм
export const loadReactHookForm = async () => {
  const { useForm, Controller } = await import("react-hook-form");
  const { zodResolver } = await import("@hookform/resolvers/zod");
  return { useForm, Controller, zodResolver };
};
