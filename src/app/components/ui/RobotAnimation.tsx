"use client";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import robotData from "../../../../public/animations/Artificial intelligence digital technology.json";

export default function RobotAnimation() {
  return (
    <motion.div
      className="w-52 h-52 md:w-64 md:h-64 flex justify-center items-center relative z-[5]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2 }}
    >
      <Lottie
        animationData={robotData}
        loop
        autoplay
        style={{
          width: "100%",
          height: "100%",
          zIndex: 2,
          position: "relative",
          pointerEvents: "none",
          mixBlendMode: "screen", // 🔹 esto integra mejor la animación
        }}
      />
    </motion.div>
  );
}
