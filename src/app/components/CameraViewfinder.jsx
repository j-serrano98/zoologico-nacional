"use client";
import { motion } from "framer-motion";

export default function CameraViewfinder({ videoUrl }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-50px" }}
      className="relative w-full max-w-4xl mx-auto aspect-video bg-black rounded-lg overflow-hidden camera-corners shadow-2xl"
    >
      {/* UI de la cámara */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-red-500 font-mono text-xs md:text-sm z-20 flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm animate-pulse">
        <div className="w-2 h-2 bg-red-500 rounded-full"></div> REC
      </div>
      <div className="absolute bottom-4 left-4 text-white font-mono text-xs z-20 bg-black/40 px-2 py-1 rounded">
        ISO 400 | F/2.8 | 4K 60FPS
      </div>

      {/* Reproductor de Video */}
      {videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be") ? (
        <iframe 
          src={`${videoUrl}?autoplay=1&mute=1&loop=1&playlist=${videoUrl.split('/').pop()}`}
          className="w-full h-full object-cover border-0 opacity-90"
          allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <video 
          src={videoUrl} 
          autoPlay 
          muted 
          loop 
          playsInline
          className="w-full h-full object-cover opacity-90"
        />
      )}

      {/* Retícula de enfoque central */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none opacity-30布">
        <div className="w-12 h-[1px] bg-white absolute top-1/2 left-1/2 -translate-x-1/2"></div>
        <div className="w-[1px] h-12 bg-white absolute top-1/2 left-1/2 -translate-y-1/2"></div>
      </div>
    </motion.div>
  );
}