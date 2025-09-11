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
    button: "from-indigo-900/40 via-black/60 to-black/80 border-indigo-500/30",
    sweep: "bg-gradient-to-r from-transparent via-indigo-400/30 to-transparent",
    hoverOverlay:
      "bg-gradient-to-r from-indigo-500/10 via-indigo-400/20 to-indigo-500/10",
    iconBg:
      "from-indigo-500/30 to-indigo-600/10 group-hover:from-indigo-400/40 group-hover:to-indigo-500/20",
    iconColor: "text-indigo-300 group-hover:text-indigo-200",
    textColor: "text-indigo-300 group-hover:text-indigo-200",
    subTextColor: "text-indigo-200/70 group-hover:text-indigo-100/80",
    arrowColor: "text-indigo-300",
    borderHoverShadow: "hover:border-indigo-400/60 hover:shadow-indigo-500/30",
  },
  purple: {
    button: "from-purple-900/40 via-black/60 to-black/80 border-purple-500/30",
    sweep: "bg-gradient-to-r from-transparent via-purple-400/30 to-transparent",
    hoverOverlay:
      "bg-gradient-to-r from-purple-500/10 via-purple-400/20 to-purple-500/10",
    iconBg:
      "from-purple-500/30 to-purple-600/10 group-hover:from-purple-400/40 group-hover:to-purple-500/20",
    iconColor: "text-purple-300 group-hover:text-purple-200",
    textColor: "text-purple-300 group-hover:text-purple-200",
    subTextColor: "text-purple-200/70 group-hover:text-purple-100/80",
    arrowColor: "text-purple-300",
    borderHoverShadow: "hover:border-purple-400/60 hover:shadow-purple-500/30",
  },
  orange: {
    button: "from-orange-900/40 via-black/60 to-black/80 border-orange-500/30",
    sweep: "bg-gradient-to-r from-transparent via-orange-400/30 to-transparent",
    hoverOverlay:
      "bg-gradient-to-r from-orange-500/10 via-orange-400/20 to-orange-500/10",
    iconBg:
      "from-orange-500/30 to-orange-600/10 group-hover:from-orange-400/40 group-hover:to-orange-500/20",
    iconColor: "text-orange-300 group-hover:text-orange-200",
    textColor: "text-orange-300 group-hover:text-orange-200",
    subTextColor: "text-orange-200/70 group-hover:text-orange-100/80",
    arrowColor: "text-orange-300",
    borderHoverShadow: "hover:border-orange-400/60 hover:shadow-orange-500/30",
  },
  emerald: {
    button:
      "from-emerald-900/40 via-black/60 to-black/80 border-emerald-500/30",
    sweep:
      "bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent",
    hoverOverlay:
      "bg-gradient-to-r from-emerald-500/10 via-emerald-400/20 to-emerald-500/10",
    iconBg:
      "from-emerald-500/30 to-emerald-600/10 group-hover:from-emerald-400/40 group-hover:to-emerald-500/20",
    iconColor: "text-emerald-300 group-hover:text-emerald-200",
    textColor: "text-emerald-300 group-hover:text-emerald-200",
    subTextColor: "text-emerald-200/70 group-hover:text-emerald-100/80",
    arrowColor: "text-emerald-300",
    borderHoverShadow:
      "hover:border-emerald-400/60 hover:shadow-emerald-500/30",
  },
  cyan: {
    button: "from-cyan-900/40 via-black/60 to-black/80 border-cyan-500/30",
    sweep: "bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent",
    hoverOverlay:
      "bg-gradient-to-r from-cyan-500/10 via-cyan-400/20 to-cyan-500/10",
    iconBg:
      "from-cyan-500/30 to-cyan-600/10 group-hover:from-cyan-400/40 group-hover:to-cyan-500/20",
    iconColor: "text-cyan-300 group-hover:text-cyan-200",
    textColor: "text-cyan-300 group-hover:text-cyan-200",
    subTextColor: "text-cyan-200/70 group-hover:text-cyan-100/80",
    arrowColor: "text-cyan-300",
    borderHoverShadow: "hover:border-cyan-400/60 hover:shadow-cyan-500/30",
  },
  rose: {
    button: "from-rose-900/40 via-black/60 to-black/80 border-rose-500/30",
    sweep: "bg-gradient-to-r from-transparent via-rose-400/30 to-transparent",
    hoverOverlay:
      "bg-gradient-to-r from-rose-500/10 via-rose-400/20 to-rose-500/10",
    iconBg:
      "from-rose-500/30 to-rose-600/10 group-hover:from-rose-400/40 group-hover:to-rose-500/20",
    iconColor: "text-rose-300 group-hover:text-rose-200",
    textColor: "text-rose-300 group-hover:text-rose-200",
    subTextColor: "text-rose-200/70 group-hover:text-rose-100/80",
    arrowColor: "text-rose-300",
    borderHoverShadow: "hover:border-rose-400/60 hover:shadow-rose-500/30",
  },
  violet: {
    button: "from-violet-900/40 via-black/60 to-black/80 border-violet-500/30",
    sweep: "bg-gradient-to-r from-transparent via-violet-400/30 to-transparent",
    hoverOverlay:
      "bg-gradient-to-r from-violet-500/10 via-violet-400/20 to-violet-500/10",
    iconBg:
      "from-violet-500/30 to-violet-600/10 group-hover:from-violet-400/40 group-hover:to-violet-500/20",
    iconColor: "text-violet-300 group-hover:text-violet-200",
    textColor: "text-violet-300 group-hover:text-violet-200",
    subTextColor: "text-violet-200/70 group-hover:text-violet-100/80",
    arrowColor: "text-violet-300",
    borderHoverShadow: "hover:border-violet-400/60 hover:shadow-violet-500/30",
  },
  teal: {
    button: "from-teal-900/40 via-black/60 to-black/80 border-teal-500/30",
    sweep: "bg-gradient-to-r from-transparent via-teal-400/30 to-transparent",
    hoverOverlay:
      "bg-gradient-to-r from-teal-500/10 via-teal-400/20 to-teal-500/10",
    iconBg:
      "from-teal-500/30 to-teal-600/10 group-hover:from-teal-400/40 group-hover:to-teal-500/20",
    iconColor: "text-teal-300 group-hover:text-teal-200",
    textColor: "text-teal-300 group-hover:text-teal-200",
    subTextColor: "text-teal-200/70 group-hover:text-teal-100/80",
    arrowColor: "text-teal-300",
    borderHoverShadow: "hover:border-teal-400/60 hover:shadow-teal-500/30",
  },
  amber: {
    button: "from-amber-900/40 via-black/60 to-black/80 border-amber-500/30",
    sweep: "bg-gradient-to-r from-transparent via-amber-400/30 to-transparent",
    hoverOverlay:
      "bg-gradient-to-r from-amber-500/10 via-amber-400/20 to-amber-500/10",
    iconBg:
      "from-amber-500/30 to-amber-600/10 group-hover:from-amber-400/40 group-hover:to-amber-500/20",
    iconColor: "text-amber-300 group-hover:text-amber-200",
    textColor: "text-amber-300 group-hover:text-amber-200",
    subTextColor: "text-amber-200/70 group-hover:text-amber-100/80",
    arrowColor: "text-amber-300",
    borderHoverShadow: "hover:border-amber-400/60 hover:shadow-amber-500/30",
  },
  lime: {
    button: "from-lime-900/40 via-black/60 to-black/80 border-lime-500/30",
    sweep: "bg-gradient-to-r from-transparent via-lime-400/30 to-transparent",
    hoverOverlay:
      "bg-gradient-to-r from-lime-500/10 via-lime-400/20 to-lime-500/10",
    iconBg:
      "from-lime-500/30 to-lime-600/10 group-hover:from-lime-400/40 group-hover:to-lime-500/20",
    iconColor: "text-lime-300 group-hover:text-lime-200",
    textColor: "text-lime-300 group-hover:text-lime-200",
    subTextColor: "text-lime-200/70 group-hover:text-lime-100/80",
    arrowColor: "text-lime-300",
    borderHoverShadow: "hover:border-lime-400/60 hover:shadow-lime-500/30",
  },
  fuchsia: {
    button:
      "from-fuchsia-900/40 via-black/60 to-black/80 border-fuchsia-500/30",
    sweep:
      "bg-gradient-to-r from-transparent via-fuchsia-400/30 to-transparent",
    hoverOverlay:
      "bg-gradient-to-r from-fuchsia-500/10 via-fuchsia-400/20 to-fuchsia-500/10",
    iconBg:
      "from-fuchsia-500/30 to-fuchsia-600/10 group-hover:from-fuchsia-400/40 group-hover:to-fuchsia-500/20",
    iconColor: "text-fuchsia-300 group-hover:text-fuchsia-200",
    textColor: "text-fuchsia-300 group-hover:text-fuchsia-200",
    subTextColor: "text-fuchsia-200/70 group-hover:text-fuchsia-100/80",
    arrowColor: "text-fuchsia-300",
    borderHoverShadow:
      "hover:border-fuchsia-400/60 hover:shadow-fuchsia-500/30",
  },
  blue: {
    button: "from-blue-900/40 via-black/60 to-black/80 border-blue-500/30",
    sweep: "bg-gradient-to-r from-transparent via-blue-400/30 to-transparent",
    hoverOverlay:
      "bg-gradient-to-r from-blue-500/10 via-blue-400/20 to-blue-500/10",
    iconBg:
      "from-blue-500/30 to-blue-600/10 group-hover:from-blue-400/40 group-hover:to-blue-500/20",
    iconColor: "text-blue-300 group-hover:text-blue-200",
    textColor: "text-blue-300 group-hover:text-blue-200",
    subTextColor: "text-blue-200/70 group-hover:text-blue-100/80",
    arrowColor: "text-blue-300",
    borderHoverShadow: "hover:border-blue-400/60 hover:shadow-blue-500/30",
  },
  pink: {
    button: "from-pink-900/40 via-black/60 to-black/80 border-pink-500/30",
    sweep: "bg-gradient-to-r from-transparent via-pink-400/30 to-transparent",
    hoverOverlay:
      "bg-gradient-to-r from-pink-500/10 via-pink-400/20 to-pink-500/10",
    iconBg:
      "from-pink-500/30 to-pink-600/10 group-hover:from-pink-400/40 group-hover:to-pink-500/20",
    iconColor: "text-pink-300 group-hover:text-pink-200",
    textColor: "text-pink-300 group-hover:text-pink-200",
    subTextColor: "text-pink-200/70 group-hover:text-pink-100/80",
    arrowColor: "text-pink-300",
    borderHoverShadow: "hover:border-pink-400/60 hover:shadow-pink-500/30",
  },
};
