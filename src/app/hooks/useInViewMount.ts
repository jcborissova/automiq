"use client";
import { useEffect, useRef, useState } from "react";

export function useInViewMount<T extends HTMLElement>(rootMargin = "0px 0px -10% 0px") {
  const ref = useRef<T | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!ref.current || mounted) return;
    const el = ref.current;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setMounted(true);
        io.disconnect();
      }
    }, { root: null, rootMargin, threshold: 0.01 });
    io.observe(el);
    return () => io.disconnect();
  }, [mounted]);

  return { ref, mounted };
}
