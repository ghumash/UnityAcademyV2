"use client";
import { useEffect } from "react";

export function ScrollToHash() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const maxAttempts = 30;
    let attempts = 0;

    const check = () => {
      document.getElementById(hash.slice(1))?.scrollIntoView();
      if (++attempts < maxAttempts) setTimeout(check, 250);
    };
    setTimeout(check, 1000);
  }, []);

  return null;
}
