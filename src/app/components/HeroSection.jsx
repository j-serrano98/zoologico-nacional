"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const jeepX = useTransform(scrollYProgress, [0, 1], ["-20%", "40%"]);

  return (
    <section ref={ref} className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div style={{ y: textY }} className="z-10 text-center relative">
        <h1 className="text-7xl md:text-9xl font-serif font-black text-safari-olive tracking-tighter">
          SAFARI<span className="text-safari-sunset">.</span>
        </h1>
        <p className="text-xl md:text-2xl mt-4 font-medium text-safari-dark tracking-widest">
          EXPLORA LA NATURALEZA
        </p>
      </motion.div>
      
      {/* Silueta decorativa de vehículo 4x4 que se desplaza al hacer scroll */}
      <motion.div 
        style={{ x: jeepX }} 
        className="absolute bottom-10 left-0 opacity-10 pointer-events-none text-[15rem] md:text-[25rem] select-none"
      >
        🚙
      </motion.div>
    </section>
  );
}