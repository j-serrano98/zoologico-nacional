"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HomeHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Fondo inmersivo con una NUEVA URL activa y optimizada */}
      <motion.div className="absolute inset-0 w-full h-full opacity-60">
        <img 
          src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=2000" 
          alt="Sabana Salvaje" 
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Gradiente de legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#F4EBD0]" />

      {/* Contenido Central Animado */}
      <motion.div style={{ y: textY, opacity }} className="relative z-10 flex flex-col items-center text-center px-6">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-white font-mono tracking-[0.3em] text-sm md:text-base uppercase mb-6 drop-shadow-md"
        >
          Reserva Natural Digital
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-9xl font-serif font-black text-white tracking-tighter drop-shadow-2xl leading-none"
        >
          EL CORAZÓN<br/>SALVAJE.
        </motion.h1>
      </motion.div>

      {/* Indicador de Scroll */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
      >
        <span className="font-mono text-xs tracking-widest uppercase">Descubre</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}