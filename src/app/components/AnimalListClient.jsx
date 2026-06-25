"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Polaroid from "./Polaroid.jsx";

// Diccionario de imágenes de alta resolución optimizadas de Unsplash para cada bioma
const biomeImages = {
  "all": "https://res.cloudinary.com/dtjynfbic/image/upload/v1782393831/nature-landscape-lake-of-fire-volcano_lkcqzt.jpg",                    // Sabana/África general
  "sabana-africana": "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=1200",        // Árbol de Acacia
  "selva-tropical": "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80&w=1200",         // Selva densa y bruma
  "oceano-y-mares": "https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&q=80&w=1200",         // Azul profundo marino
  "pantanos-y-humedales": "https://images.unsplash.com/photo-1444090542259-0af8fa96557e?auto=format&fit=crop&q=80&w=1200",   // Humedal al amanecer
  "montanas-y-alpinos": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200",     // Picos nevados
  "desiertos": "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&q=80&w=1200",              // Dunas doradas
  "bosques-templados": "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=1200",      // Rayos de sol entre árboles
  "tundra-y-artico": "https://images.unsplash.com/photo-1517783999520-f068d7431a60?auto=format&fit=crop&q=80&w=1200",        // Paisaje helado ártico
  "cuevas-y-subterraneos": "https://images.unsplash.com/photo-1519069344445-31b312ee1824?auto=format&fit=crop&q=80&w=1200",  // Caverna de roca y agua
  "arrecifes-de-coral": "https://images.unsplash.com/photo-1546505876-0ce550f28384?auto=format&fit=crop&q=80&w=1200"       // Corales e iluminación submarina
};

export default function AnimalListClient({ initialAnimals, categories }) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredAnimals = selectedCategory === "all"
    ? initialAnimals
    : initialAnimals.filter(animal => animal.categories?.slug === selectedCategory);

  const appleEase = [0.16, 1, 0.3, 1];
  const currentBgImage = biomeImages[selectedCategory] || biomeImages["all"];

  return (
    <div className="min-h-screen text-[#2C221E] pt-32 pb-24 px-6 relative overflow-hidden md:pl-32">
      
      {/* CAPA DE IMÁGENES DE FONDO DINÁMICAS */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.8, scale: 1 }} // Opacidad controlada al 25% para no competir con las Polaroids
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: appleEase }}
            className="absolute inset-0 w-full h-full"
          >
            <img 
              src={currentBgImage} 
              alt="Fondo Ecosistema" 
              className="w-full h-full object-cover filter blur-[1px]" // Desenfoque cinemático
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Capa de tinte encima de la foto para amalgamar los colores safari */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F4EBD0]/50 via-[#F4EBD0]/80 to-[#F4EBD0]" />
      </div>

      {/* CONTENIDO PRINCIPAL DE LA INTERFAZ */}
      <div className="container mx-auto max-w-6xl relative z-10">
        
        {/* Cabecera */}
        <div className="text-center mb-16">
          <span className="text-[#D35400] font-mono tracking-widest text-sm font-bold uppercase block mb-2">
            Catálogo de Expedición
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-black tracking-tight">
            Especies Registradas
          </h1>
          <p className="mt-4 text-lg opacity-80 max-w-xl mx-auto">
            Filtra por bioma y observa cómo tu entorno cambia por completo. Haz clic sobre las fotografías para abrir la bitácora.
          </p>
        </div>

        {/* Selector de Categorías */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-6 py-2 rounded-full text-sm font-mono tracking-wider transition-all duration-300 ${
              selectedCategory === "all"
                ? "bg-[#4A5D23] text-[#F4EBD0] shadow-md scale-105"
                : "bg-white/60 backdrop-blur-md text-[#2C221E] hover:bg-white/90 border border-black/5"
            }`}
          >
            TODOS
          </button>
          
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-6 py-2 rounded-full text-sm font-mono tracking-wider transition-all duration-300 ${
                selectedCategory === cat.slug
                  ? "bg-[#4A5D23] text-[#F4EBD0] shadow-md scale-105"
                  : "bg-white/60 backdrop-blur-md text-[#2C221E] hover:bg-white/90 border border-black/5"
              }`}
            >
              {cat.name.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Grid de Especies */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
          <AnimatePresence mode="popLayout">
            {filteredAnimals.map((animal, index) => {
              const rotations = [-2, 3, -1, 2, -3];
              return (
                <motion.div
                  key={animal.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{ duration: 0.5, ease: appleEase }}
                >
                  <Link href={`/animales/${animal.slug}`}>
                    <Polaroid
                      title={animal.name}
                      imageSrc={animal.main_image_url}
                      rotation={rotations[index % rotations.length]}
                    />
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}