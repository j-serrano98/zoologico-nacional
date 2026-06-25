"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function AnimalDetailAnimation({ animal, photos }) {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Efecto Parallax para la imagen y el título principal
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const appleEase = [0.16, 1, 0.3, 1];

  return (
    <div>
      {/* HERO SECTION PREMIUM */}
      <section ref={heroRef} className="relative h-[70vh] md:h-[85vh] flex items-end overflow-hidden bg-black">
        <motion.div style={{ y: yBg }} className="absolute inset-0 w-full h-full opacity-70">
          <img 
            src={animal.main_image_url} 
            alt={animal.name} 
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-safari-sand via-transparent to-black/40 z-10" />

        <motion.div 
          style={{ y: yText }} 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: appleEase }}
          className="container mx-auto px-6 mb-12 relative z-20"
        >
          <span className="text-safari-sunset font-mono uppercase tracking-widest text-sm font-bold bg-safari-dark/80 text-white px-3 py-1 rounded-sm inline-block mb-3">
            {animal.categories?.name}
          </span>
          <h1 className="text-5xl md:text-8xl font-serif font-black text-safari-dark tracking-tight">
            {animal.name}
          </h1>
          <p className="text-xl md:text-2xl italic font-serif text-safari-dark/80 mt-2">
            {animal.scientific_name}
          </p>
        </motion.div>
      </section>

      {/* FICHA TÉCNICA (ANIMACIÓN EN CASCADA / SCROLL TRIGGER) */}
      <section className="py-16 container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "Dieta", value: animal.diet, icon: "🥩" },
          { label: "Estado", value: animal.conservation_status, icon: "⚠️" },
          { label: "Peso Promedio", value: animal.weight, icon: "⚖️" },
          { label: "Ubicación", value: animal.location, icon: "🌍" },
        ].map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.15, ease: appleEase }}
            className="bg-white p-6 rounded-lg shadow-md border border-safari-olive/10 flex items-center gap-4 hover:shadow-lg transition-shadow"
          >
            <span className="text-3xl">{item.icon}</span>
            <div>
              <p className="text-xs uppercase tracking-wider font-mono text-safari-dark/60">{item.label}</p>
              <p className="text-lg font-bold text-safari-olive">{item.value || "No especificado"}</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* CONTENIDO DEL BLOG / HISTORIA */}
      <section className="py-12 container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: appleEase }}
          className="prose prose-lg text-safari-dark font-sans leading-relaxed"
        >
          <h3 className="text-3xl font-serif font-bold mb-6 text-safari-olive">
            Historia y Comportamiento
          </h3>
          <p className="text-lg md:text-xl text-justify whitespace-pre-line">
            {animal.description}
          </p>
        </motion.div>
      </section>

      {/* GALERÍA DE FOTOS REVELADAS (POLAROIDS ADICIONALES) */}
      {photos.length > 0 && (
        <section className="py-16 bg-safari-olive/10">
          <div className="container mx-auto px-6">
            <h3 className="text-3xl font-serif font-bold text-center mb-12 text-safari-dark">
              Álbum Fotográfico de Expedición
            </h3>
            <div className="flex flex-wrap justify-center gap-8">
              {photos.map((photo, index) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity: 0, scale: 0.8, rotate: index % 2 === 0 ? -5 : 5 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: index % 2 === 0 ? -2 : 2 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: appleEase }}
                  whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
                  className="bg-white p-4 pb-10 shadow-lg rounded-sm max-w-xs flex flex-col items-center border border-gray-100"
                >
                  <img src={photo.url} alt={photo.caption || animal.name} className="w-64 h-48 object-cover bg-gray-100" />
                  <p className="mt-4 font-mono text-xs text-safari-dark/70 text-center italic">
                    {photo.caption || `Captura #${index + 1}`}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}