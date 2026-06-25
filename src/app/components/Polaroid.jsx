"use client"; // Necesario para Framer Motion en App Router
import { motion } from "framer-motion";

export default function Polaroid({ imageSrc, title, rotation = -2 }) {
  // La curva de aceleración que usa Apple (Cubic Bezier)
  const appleEase = [0.16, 1, 0.3, 1];

  return (
    <motion.div
      initial={{ opacity: 0, y: 80, scale: 0.95, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotate: rotation }}
      viewport={{ once: true, margin: "-100px" }} // Se activa 100px antes de llegar
      transition={{ duration: 1, ease: appleEase }}
      whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
      className="bg-white p-4 pb-12 shadow-xl rounded-sm max-w-sm flex flex-col items-center cursor-pointer transition-shadow hover:shadow-2xl"
    >
      <div className="w-full h-64 bg-gray-200 overflow-hidden relative">
        {/* Aquí luego irá el componente <Image> de Next.js conectado a Cloudinary */}
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="mt-6 font-serif text-2xl font-bold text-safari-dark">
        {title}
      </h3>
    </motion.div>
  );
}