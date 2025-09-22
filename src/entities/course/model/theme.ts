import type { Theme } from "./types";

export const THEMES: Record<
  Theme,
  {
    button: string;
    sweep: string;
    hoverOverlay: string;
    iconBg: string;
    iconColor: string;
    textColor: string;
    subTextColor: string;
    arrowColor: string;
    borderHoverShadow: string;
  }
> = {
  indigo: {
    button:
      "from-indigo-50 via-white to-white border-indigo-200 dark:from-indigo-900/40 dark:via-black/60 dark:to-black/80 dark:border-indigo-500/30",
    sweep:
      "bg-gradient-to-r from-transparent via-indigo-500/15 to-transparent dark:via-indigo-400/30",
    hoverOverlay:
      "bg-gradient-to-r from-indigo-500/5 via-indigo-400/10 to-indigo-500/5 dark:from-indigo-500/10 dark:via-indigo-400/20 dark:to-indigo-500/10",
    iconBg:
      "from-indigo-500/15 to-indigo-600/5 group-hover:from-indigo-400/25 group-hover:to-indigo-500/10 dark:from-indigo-500/30 dark:to-indigo-600/10 dark:group-hover:from-indigo-400/40 dark:group-hover:to-indigo-500/20",
    iconColor:
      "text-indigo-700 group-hover:text-indigo-900 dark:text-indigo-300 dark:group-hover:text-indigo-200",
    textColor:
      "text-indigo-800 group-hover:text-indigo-900 dark:text-indigo-300 dark:group-hover:text-indigo-200",
    subTextColor:
      "text-indigo-600 group-hover:text-indigo-700 dark:text-indigo-200/70 dark:group-hover:text-indigo-100/80",
    arrowColor: "text-indigo-700 dark:text-indigo-300",
    borderHoverShadow:
      "hover:border-indigo-300/80 hover:shadow-indigo-400/20 dark:hover:border-indigo-400/60 dark:hover:shadow-indigo-500/30",
  },
  purple: {
    button:
      "from-purple-50 via-white to-white border-purple-200 dark:from-purple-900/40 dark:via-black/60 dark:to-black/80 dark:border-purple-500/30",
    sweep:
      "bg-gradient-to-r from-transparent via-purple-500/15 to-transparent dark:via-purple-400/30",
    hoverOverlay:
      "bg-gradient-to-r from-purple-500/5 via-purple-400/10 to-purple-500/5 dark:from-purple-500/10 dark:via-purple-400/20 dark:to-purple-500/10",
    iconBg:
      "from-purple-500/15 to-purple-600/5 group-hover:from-purple-400/25 group-hover:to-purple-500/10 dark:from-purple-500/30 dark:to-purple-600/10 dark:group-hover:from-purple-400/40 dark:group-hover:to-purple-500/20",
    iconColor:
      "text-purple-700 group-hover:text-purple-900 dark:text-purple-300 dark:group-hover:text-purple-200",
    textColor:
      "text-purple-800 group-hover:text-purple-900 dark:text-purple-300 dark:group-hover:text-purple-200",
    subTextColor:
      "text-purple-600 group-hover:text-purple-700 dark:text-purple-200/70 dark:group-hover:text-purple-100/80",
    arrowColor: "text-purple-700 dark:text-purple-300",
    borderHoverShadow:
      "hover:border-purple-300/80 hover:shadow-purple-400/20 dark:hover:border-purple-400/60 dark:hover:shadow-purple-500/30",
  },
  orange: {
    button:
      "from-orange-50 via-white to-white border-orange-200 dark:from-orange-900/40 dark:via-black/60 dark:to-black/80 dark:border-orange-500/30",
    sweep:
      "bg-gradient-to-r from-transparent via-orange-500/15 to-transparent dark:via-orange-400/30",
    hoverOverlay:
      "bg-gradient-to-r from-orange-500/5 via-orange-400/10 to-orange-500/5 dark:from-orange-500/10 dark:via-orange-400/20 dark:to-orange-500/10",
    iconBg:
      "from-orange-500/15 to-orange-600/5 group-hover:from-orange-400/25 group-hover:to-orange-500/10 dark:from-orange-500/30 dark:to-orange-600/10 dark:group-hover:from-orange-400/40 dark:group-hover:to-orange-500/20",
    iconColor:
      "text-orange-700 group-hover:text-orange-900 dark:text-orange-300 dark:group-hover:text-orange-200",
    textColor:
      "text-orange-800 group-hover:text-orange-900 dark:text-orange-300 dark:group-hover:text-orange-200",
    subTextColor:
      "text-orange-600 group-hover:text-orange-700 dark:text-orange-200/70 dark:group-hover:text-orange-100/80",
    arrowColor: "text-orange-700 dark:text-orange-300",
    borderHoverShadow:
      "hover:border-orange-300/80 hover:shadow-orange-400/20 dark:hover:border-orange-400/60 dark:hover:shadow-orange-500/30",
  },
  emerald: {
    button:
      "from-emerald-50 via-white to-white border-emerald-200 dark:from-emerald-900/40 dark:via-black/60 dark:to-black/80 dark:border-emerald-500/30",
    sweep:
      "bg-gradient-to-r from-transparent via-emerald-500/15 to-transparent dark:via-emerald-400/30",
    hoverOverlay:
      "bg-gradient-to-r from-emerald-500/5 via-emerald-400/10 to-emerald-500/5 dark:from-emerald-500/10 dark:via-emerald-400/20 dark:to-emerald-500/10",
    iconBg:
      "from-emerald-500/15 to-emerald-600/5 group-hover:from-emerald-400/25 group-hover:to-emerald-500/10 dark:from-emerald-500/30 dark:to-emerald-600/10 dark:group-hover:from-emerald-400/40 dark:group-hover:to-emerald-500/20",
    iconColor:
      "text-emerald-700 group-hover:text-emerald-900 dark:text-emerald-300 dark:group-hover:text-emerald-200",
    textColor:
      "text-emerald-800 group-hover:text-emerald-900 dark:text-emerald-300 dark:group-hover:text-emerald-200",
    subTextColor:
      "text-emerald-600 group-hover:text-emerald-700 dark:text-emerald-200/70 dark:group-hover:text-emerald-100/80",
    arrowColor: "text-emerald-700 dark:text-emerald-300",
    borderHoverShadow:
      "hover:border-emerald-300/80 hover:shadow-emerald-400/20 dark:hover:border-emerald-400/60 dark:hover:shadow-emerald-500/30",
  },
  cyan: {
    button:
      "from-cyan-50 via-white to-white border-cyan-200 dark:from-cyan-900/40 dark:via-black/60 dark:to-black/80 dark:border-cyan-500/30",
    sweep:
      "bg-gradient-to-r from-transparent via-cyan-500/15 to-transparent dark:via-cyan-400/30",
    hoverOverlay:
      "bg-gradient-to-r from-cyan-500/5 via-cyan-400/10 to-cyan-500/5 dark:from-cyan-500/10 dark:via-cyan-400/20 dark:to-cyan-500/10",
    iconBg:
      "from-cyan-500/15 to-cyan-600/5 group-hover:from-cyan-400/25 group-hover:to-cyan-500/10 dark:from-cyan-500/30 dark:to-cyan-600/10 dark:group-hover:from-cyan-400/40 dark:group-hover:to-cyan-500/20",
    iconColor:
      "text-cyan-700 group-hover:text-cyan-900 dark:text-cyan-300 dark:group-hover:text-cyan-200",
    textColor:
      "text-cyan-800 group-hover:text-cyan-900 dark:text-cyan-300 dark:group-hover:text-cyan-200",
    subTextColor:
      "text-cyan-600 group-hover:text-cyan-700 dark:text-cyan-200/70 dark:group-hover:text-cyan-100/80",
    arrowColor: "text-cyan-700 dark:text-cyan-300",
    borderHoverShadow:
      "hover:border-cyan-300/80 hover:shadow-cyan-400/20 dark:hover:border-cyan-400/60 dark:hover:shadow-cyan-500/30",
  },
  rose: {
    button:
      "from-rose-50 via-white to-white border-rose-200 dark:from-rose-900/40 dark:via-black/60 dark:to-black/80 dark:border-rose-500/30",
    sweep:
      "bg-gradient-to-r from-transparent via-rose-500/15 to-transparent dark:via-rose-400/30",
    hoverOverlay:
      "bg-gradient-to-r from-rose-500/5 via-rose-400/10 to-rose-500/5 dark:from-rose-500/10 dark:via-rose-400/20 dark:to-rose-500/10",
    iconBg:
      "from-rose-500/15 to-rose-600/5 group-hover:from-rose-400/25 group-hover:to-rose-500/10 dark:from-rose-500/30 dark:to-rose-600/10 dark:group-hover:from-rose-400/40 dark:group-hover:to-rose-500/20",
    iconColor:
      "text-rose-700 group-hover:text-rose-900 dark:text-rose-300 dark:group-hover:text-rose-200",
    textColor:
      "text-rose-800 group-hover:text-rose-900 dark:text-rose-300 dark:group-hover:text-rose-200",
    subTextColor:
      "text-rose-600 group-hover:text-rose-700 dark:text-rose-200/70 dark:group-hover:text-rose-100/80",
    arrowColor: "text-rose-700 dark:text-rose-300",
    borderHoverShadow:
      "hover:border-rose-300/80 hover:shadow-rose-400/20 dark:hover:border-rose-400/60 dark:hover:shadow-rose-500/30",
  },
  violet: {
    button:
      "from-violet-50 via-white to-white border-violet-200 dark:from-violet-900/40 dark:via-black/60 dark:to-black/80 dark:border-violet-500/30",
    sweep:
      "bg-gradient-to-r from-transparent via-violet-500/15 to-transparent dark:via-violet-400/30",
    hoverOverlay:
      "bg-gradient-to-r from-violet-500/5 via-violet-400/10 to-violet-500/5 dark:from-violet-500/10 dark:via-violet-400/20 dark:to-violet-500/10",
    iconBg:
      "from-violet-500/15 to-violet-600/5 group-hover:from-violet-400/25 group-hover:to-violet-500/10 dark:from-violet-500/30 dark:to-violet-600/10 dark:group-hover:from-violet-400/40 dark:group-hover:to-violet-500/20",
    iconColor:
      "text-violet-700 group-hover:text-violet-900 dark:text-violet-300 dark:group-hover:text-violet-200",
    textColor:
      "text-violet-800 group-hover:text-violet-900 dark:text-violet-300 dark:group-hover:text-violet-200",
    subTextColor:
      "text-violet-600 group-hover:text-violet-700 dark:text-violet-200/70 dark:group-hover:text-violet-100/80",
    arrowColor: "text-violet-700 dark:text-violet-300",
    borderHoverShadow:
      "hover:border-violet-300/80 hover:shadow-violet-400/20 dark:hover:border-violet-400/60 dark:hover:shadow-violet-500/30",
  },
  teal: {
    button:
      "from-teal-50 via-white to-white border-teal-200 dark:from-teal-900/40 dark:via-black/60 dark:to-black/80 dark:border-teal-500/30",
    sweep:
      "bg-gradient-to-r from-transparent via-teal-500/15 to-transparent dark:via-teal-400/30",
    hoverOverlay:
      "bg-gradient-to-r from-teal-500/5 via-teal-400/10 to-teal-500/5 dark:from-teal-500/10 dark:via-teal-400/20 dark:to-teal-500/10",
    iconBg:
      "from-teal-500/15 to-teal-600/5 group-hover:from-teal-400/25 group-hover:to-teal-500/10 dark:from-teal-500/30 dark:to-teal-600/10 dark:group-hover:from-teal-400/40 dark:group-hover:to-teal-500/20",
    iconColor:
      "text-teal-700 group-hover:text-teal-900 dark:text-teal-300 dark:group-hover:text-teal-200",
    textColor:
      "text-teal-800 group-hover:text-teal-900 dark:text-teal-300 dark:group-hover:text-teal-200",
    subTextColor:
      "text-teal-600 group-hover:text-teal-700 dark:text-teal-200/70 dark:group-hover:text-teal-100/80",
    arrowColor: "text-teal-700 dark:text-teal-300",
    borderHoverShadow:
      "hover:border-teal-300/80 hover:shadow-teal-400/20 dark:hover:border-teal-400/60 dark:hover:shadow-teal-500/30",
  },
  amber: {
    button:
      "from-amber-50 via-white to-white border-amber-200 dark:from-amber-900/40 dark:via-black/60 dark:to-black/80 dark:border-amber-500/30",
    sweep:
      "bg-gradient-to-r from-transparent via-amber-500/15 to-transparent dark:via-amber-400/30",
    hoverOverlay:
      "bg-gradient-to-r from-amber-500/5 via-amber-400/10 to-amber-500/5 dark:from-amber-500/10 dark:via-amber-400/20 dark:to-amber-500/10",
    iconBg:
      "from-amber-500/15 to-amber-600/5 group-hover:from-amber-400/25 group-hover:to-amber-500/10 dark:from-amber-500/30 dark:to-amber-600/10 dark:group-hover:from-amber-400/40 dark:group-hover:to-amber-500/20",
    iconColor:
      "text-amber-700 group-hover:text-amber-900 dark:text-amber-300 dark:group-hover:text-amber-200",
    textColor:
      "text-amber-800 group-hover:text-amber-900 dark:text-amber-300 dark:group-hover:text-amber-200",
    subTextColor:
      "text-amber-600 group-hover:text-amber-700 dark:text-amber-200/70 dark:group-hover:text-amber-100/80",
    arrowColor: "text-amber-700 dark:text-amber-300",
    borderHoverShadow:
      "hover:border-amber-300/80 hover:shadow-amber-400/20 dark:hover:border-amber-400/60 dark:hover:shadow-amber-500/30",
  },
  lime: {
    button:
      "from-lime-50 via-white to-white border-lime-200 dark:from-lime-900/40 dark:via-black/60 dark:to-black/80 dark:border-lime-500/30",
    sweep:
      "bg-gradient-to-r from-transparent via-lime-500/15 to-transparent dark:via-lime-400/30",
    hoverOverlay:
      "bg-gradient-to-r from-lime-500/5 via-lime-400/10 to-lime-500/5 dark:from-lime-500/10 dark:via-lime-400/20 dark:to-lime-500/10",
    iconBg:
      "from-lime-500/15 to-lime-600/5 group-hover:from-lime-400/25 group-hover:to-lime-500/10 dark:from-lime-500/30 dark:to-lime-600/10 dark:group-hover:from-lime-400/40 dark:group-hover:to-lime-500/20",
    iconColor:
      "text-lime-700 group-hover:text-lime-900 dark:text-lime-300 dark:group-hover:text-lime-200",
    textColor:
      "text-lime-800 group-hover:text-lime-900 dark:text-lime-300 dark:group-hover:text-lime-200",
    subTextColor:
      "text-lime-600 group-hover:text-lime-700 dark:text-lime-200/70 dark:group-hover:text-lime-100/80",
    arrowColor: "text-lime-700 dark:text-lime-300",
    borderHoverShadow:
      "hover:border-lime-300/80 hover:shadow-lime-400/20 dark:hover:border-lime-400/60 dark:hover:shadow-lime-500/30",
  },
  fuchsia: {
    button:
      "from-fuchsia-50 via-white to-white border-fuchsia-200 dark:from-fuchsia-900/40 dark:via-black/60 dark:to-black/80 dark:border-fuchsia-500/30",
    sweep:
      "bg-gradient-to-r from-transparent via-fuchsia-500/15 to-transparent dark:via-fuchsia-400/30",
    hoverOverlay:
      "bg-gradient-to-r from-fuchsia-500/5 via-fuchsia-400/10 to-fuchsia-500/5 dark:from-fuchsia-500/10 dark:via-fuchsia-400/20 dark:to-fuchsia-500/10",
    iconBg:
      "from-fuchsia-500/15 to-fuchsia-600/5 group-hover:from-fuchsia-400/25 group-hover:to-fuchsia-500/10 dark:from-fuchsia-500/30 dark:to-fuchsia-600/10 dark:group-hover:from-fuchsia-400/40 dark:group-hover:to-fuchsia-500/20",
    iconColor:
      "text-fuchsia-700 group-hover:text-fuchsia-900 dark:text-fuchsia-300 dark:group-hover:text-fuchsia-200",
    textColor:
      "text-fuchsia-800 group-hover:text-fuchsia-900 dark:text-fuchsia-300 dark:group-hover:text-fuchsia-200",
    subTextColor:
      "text-fuchsia-600 group-hover:text-fuchsia-700 dark:text-fuchsia-200/70 dark:group-hover:text-fuchsia-100/80",
    arrowColor: "text-fuchsia-700 dark:text-fuchsia-300",
    borderHoverShadow:
      "hover:border-fuchsia-300/80 hover:shadow-fuchsia-400/20 dark:hover:border-fuchsia-400/60 dark:hover:shadow-fuchsia-500/30",
  },
  blue: {
    button:
      "from-blue-50 via-white to-white border-blue-200 dark:from-blue-900/40 dark:via-black/60 dark:to-black/80 dark:border-blue-500/30",
    sweep:
      "bg-gradient-to-r from-transparent via-blue-500/15 to-transparent dark:via-blue-400/30",
    hoverOverlay:
      "bg-gradient-to-r from-blue-500/5 via-blue-400/10 to-blue-500/5 dark:from-blue-500/10 dark:via-blue-400/20 dark:to-blue-500/10",
    iconBg:
      "from-blue-500/15 to-blue-600/5 group-hover:from-blue-400/25 group-hover:to-blue-500/10 dark:from-blue-500/30 dark:to-blue-600/10 dark:group-hover:from-blue-400/40 dark:group-hover:to-blue-500/20",
    iconColor:
      "text-blue-700 group-hover:text-blue-900 dark:text-blue-300 dark:group-hover:text-blue-200",
    textColor:
      "text-blue-800 group-hover:text-blue-900 dark:text-blue-300 dark:group-hover:text-blue-200",
    subTextColor:
      "text-blue-600 group-hover:text-blue-700 dark:text-blue-200/70 dark:group-hover:text-blue-100/80",
    arrowColor: "text-blue-700 dark:text-blue-300",
    borderHoverShadow:
      "hover:border-blue-300/80 hover:shadow-blue-400/20 dark:hover:border-blue-400/60 dark:hover:shadow-blue-500/30",
  },
  pink: {
    button:
      "from-pink-50 via-white to-white border-pink-200 dark:from-pink-900/40 dark:via-black/60 dark:to-black/80 dark:border-pink-500/30",
    sweep:
      "bg-gradient-to-r from-transparent via-pink-500/15 to-transparent dark:via-pink-400/30",
    hoverOverlay:
      "bg-gradient-to-r from-pink-500/5 via-pink-400/10 to-pink-500/5 dark:from-pink-500/10 dark:via-pink-400/20 dark:to-pink-500/10",
    iconBg:
      "from-pink-500/15 to-pink-600/5 group-hover:from-pink-400/25 group-hover:to-pink-500/10 dark:from-pink-500/30 dark:to-pink-600/10 dark:group-hover:from-pink-400/40 dark:group-hover:to-pink-500/20",
    iconColor:
      "text-pink-700 group-hover:text-pink-900 dark:text-pink-300 dark:group-hover:text-pink-200",
    textColor:
      "text-pink-800 group-hover:text-pink-900 dark:text-pink-300 dark:group-hover:text-pink-200",
    subTextColor:
      "text-pink-600 group-hover:text-pink-700 dark:text-pink-200/70 dark:group-hover:text-pink-100/80",
    arrowColor: "text-pink-700 dark:text-pink-300",
    borderHoverShadow:
      "hover:border-pink-300/80 hover:shadow-pink-400/20 dark:hover:border-pink-400/60 dark:hover:shadow-pink-500/30",
  },
};
