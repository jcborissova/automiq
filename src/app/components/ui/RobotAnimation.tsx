/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { LottieRefCurrentProps } from "lottie-react";
import { motion } from "framer-motion";
import { useInViewMount } from "../../hooks/useInViewMount";

// Carga lottie-react solo en cliente (evita SSR y peso en server)
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

type Props = {
  className?: string;                 // tamaño vía Tailwind
  src?: string;                       // ruta del JSON en /public (default al tuyo)
  poster?: string;                    // imagen fallback
  loop?: boolean;
  autoplay?: boolean;
};

export default function RobotAnimation({
  className = "w-52 h-52 md:w-64 md:h-64",
  src = "/animations/Artificial intelligence digital technology.json",
  poster = "/animations/robot_poster.jpg",
  loop = true,
  autoplay = true,
}: Props) {
  const { ref, mounted } = useInViewMount<HTMLDivElement>("0px 0px -15% 0px");
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  const [data, setData] = useState<any | null>(null);
  const [ready, setReady] = useState(false);

  // ⚡ Carga el JSON en tiempo de ejecución (no entra al bundle)
  useEffect(() => {
    let cancelled = false;
    if (!mounted) return;
    (async () => {
      try {
        const res = await fetch(src, { cache: "force-cache" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (!cancelled) setData(json);
      } catch (e) {
        console.error("Lottie load error:", e);
      }
    })();
    return () => { cancelled = true; };
  }, [mounted, src]);

  // ⏸️ Pausa/Reanuda cuando la pestaña se oculta/muestra
  useEffect(() => {
    if (!mounted) return;
    const onVis = () => {
      const api = lottieRef.current;
      if (!api) return;
      if (document.visibilityState === "hidden") api.pause();
      else api.play();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [mounted]);

  // Respetar reduce-motion
  const prefersReducedMotion = useMemo(
    () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
    []
  );

  return (
    <motion.div
      ref={ref}
      className={`flex justify-center items-center relative z-[5] ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
    >
      {/* Placeholder estático si aún no montó o no cargó */}
      {(!mounted || !data || prefersReducedMotion) && (
        <img
          src={poster}
          alt="Robot"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none opacity-90"
          loading="lazy"
        />
      )}

      {/* Lottie solo cuando hay datos y no hay reduce-motion */}
      {mounted && data && !prefersReducedMotion && (
        <Lottie
          lottieRef={lottieRef}
          animationData={data}
          loop={loop}
          autoplay={autoplay}
          className="relative z-10 w-full h-full pointer-events-none"
          rendererSettings={{
            progressiveLoad: true,
            preserveAspectRatio: "xMidYMid meet",
            viewBoxOnly: true,
            // Filtra blur/shadows muy grandes en SVG (reduce coste en algunos JSON)
            filterSize: { width: "120%", height: "120%", x: "-10%", y: "-10%" } as any,
            hideOnTransparent: true,
          }}
          // Renderiza en SVG (default). Si tu JSON es muy pesado, prueba con canvas:
          // renderer="canvas"
          onDOMLoaded={() => setReady(true)}
          onComplete={() => {/* puedes pausar aquí si no quieres loop infinito */}}
          style={{ mixBlendMode: "screen" }}
        />
      )}
    </motion.div>
  );
}
