import { motion } from "framer-motion";
import { cn } from "@/shared/lib/utils";
import type { AnimatedBackgroundProps } from '../model/types';

/**
 * Компонент анимированного фона для таймера
 */
export const AnimatedBackground = ({ colors, variant = "simple" }: AnimatedBackgroundProps) => {
  if (variant === "pulsing") {
    return (
      <motion.div
        className={cn("absolute inset-0", colors.gradient, "opacity-30")}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    );
  }

  return (
    <motion.div
      className={cn(
        "absolute inset-0 opacity-20",
        "bg-gradient-to-r",
        colors.gradient
      )}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
};
