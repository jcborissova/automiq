"use client";
import { useCallback } from "react";

export function useSmoothScroll() {
  return useCallback((selector: string) => {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);
}
