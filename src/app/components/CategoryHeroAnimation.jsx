"use client";
import { motion } from "framer-motion";

export default function CategoryHeroAnimation({ category }) {
  const appleEase = [0.16, 1, 0.3, 1];

  return (
    <section className="relative h-[50vh] flex items-center justify-center bg-safari-dark text-safari-sand overflow-hidden">
      {/* Imagen de Fondo */}
      <motion.div 
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.4 }}
        transition={{ duration: 1.4, ease: appleEase }}
        className="absolute inset-0 w-full h-full"
      >
        <img 
          src={category.cover_image_url || "https://images.unsplash.com/photo-1516426122078-c23e76319801"} 
          alt={category.name} 
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Degradado */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-safari-sand/30" />

      {/* Contenido Central */}
      <div className="text-center z-10 px-6 max-w-3xl">
        <motion.span 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: appleEase }}
          className="text-safari-sunset font-mono tracking-widest text-xs uppercase font-bold block mb-3"
        >
          Ecosistemas del Zoológico
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: appleEase }}
          className="text-4xl md:text-6xl font-serif font-black tracking-tight"
        >
          {category.name}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-4 text-base md:text-lg text-safari-sand/90 font-sans font-light leading-relaxed"
        >
          {category.description}
        </motion.p>
      </div>
    </section>
  );
}