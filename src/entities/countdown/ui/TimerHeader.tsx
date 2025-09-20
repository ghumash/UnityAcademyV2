import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/shared/lib/utils";
import { Timer, Sparkles, Star } from "lucide-react";
import type { TimerHeaderProps } from '../model/types';

/**
 * Компонент заголовка таймера с иконкой и текстом
 */
export const TimerHeader = ({ 
  title, 
  subtitle, 
  colors, 
  sizes, 
  variant = "card",
  isUrgent = false,
  isAlmostExpired = false,
  dict
}: TimerHeaderProps) => {
  const getIcon = () => {
    switch (variant) {
      case "compact":
        return (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Timer className={cn(sizes.icon, colors.text)} />
          </motion.div>
        );
      case "premium":
        return (
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          >
            <Sparkles className={cn(sizes.icon, colors.text)} />
          </motion.div>
        );
      default:
        return (
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0] 
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          >
            <Star className={cn(sizes.icon, colors.text)} />
          </motion.div>
        );
    }
  };

  if (variant === "compact") {
    return (
      <div className="flex items-center gap-2">
        {getIcon()}
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-3", variant === "premium" ? "mb-4" : "mb-3")}>
      {getIcon()}
      <div>
        <motion.h3 
          className={cn(sizes.title, colors.accent)}
          animate={isUrgent ? { 
            scale: [1, 1.05, 1],
            color: ["currentColor", "#ef4444", "currentColor"]
          } : {}}
          transition={{ duration: 1, repeat: Infinity }}
        >
          {title}
        </motion.h3>
        {subtitle && (
          <motion.p 
            className={cn(sizes.subtitle, colors.text, "opacity-80")}
            animate={isAlmostExpired ? {
              opacity: [0.8, 1, 0.8]
            } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
      
      {/* Сообщение о срочности для premium варианта */}
      {variant === "premium" && (
        <AnimatePresence>
          {isAlmostExpired && dict && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-3 text-center"
            >
              <motion.span
                className={cn("text-sm font-semibold", colors.accent)}
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
              >
                {dict.common.countdown.messages.lastChance}
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};
