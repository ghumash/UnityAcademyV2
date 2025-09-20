import { motion } from "framer-motion";
import { cn } from "@/shared/lib/utils";
import type { AnimatedParticlesProps } from '../model/types';

/**
 * Компонент анимированных частиц для premium варианта таймера
 */
export const AnimatedParticles = ({ colors, count = 8 }: AnimatedParticlesProps) => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className={cn("absolute w-2 h-2 rounded-full", colors.pulseColor, "opacity-30")}
          animate={{
            x: [0, Math.random() * 400, 0],
            y: [0, Math.random() * 200, 0],
            scale: [0, 1, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut",
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
};
