"use client";
import { motion } from "framer-motion";

export default function EditorialSections() {
  const appleEase = [0.16, 1, 0.3, 1];

  const news = [
    { title: "Nacimiento de crías de Guepardo", category: "Conservación", date: "Octubre 2026", img: "https://images.unsplash.com/photo-1543884813-0e24177242ba?auto=format&fit=crop&w=600" },
    { title: "El impacto del clima en la Sabana", category: "Investigación", date: "Septiembre 2026", img: "https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?auto=format&fit=crop&w=600" },
  ];

  return (
    <div className="py-24 container mx-auto px-6 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        
        {/* Columna 1: Noticias */}
        <section>
          <div className="mb-10 border-b border-black/10 pb-4 flex justify-between items-end">
            <h2 className="text-4xl font-serif font-black text-[#2C221E]">Diario de Campo</h2>
            <button className="text-sm font-mono tracking-widest hover:text-[#D35400] transition-colors">VER TODO</button>
          </div>
          
          <div className="flex flex-col gap-8">
            {news.map((item, i) => (
              <motion.article 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: appleEase }}
                className="group cursor-pointer flex gap-6 items-center"
              >
                <div className="w-32 h-32 md:w-40 md:h-40 overflow-hidden rounded-lg bg-gray-200 shrink-0">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div>
                  <span className="text-[#D35400] font-mono text-xs tracking-widest uppercase block mb-2">{item.category} • {item.date}</span>
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-[#2C221E] group-hover:text-[#4A5D23] transition-colors leading-tight">
                    {item.title}
                  </h3>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Columna 2: Recursos Educativos y Métricas */}
        <section>
          <div className="mb-10 border-b border-black/10 pb-4">
            <h2 className="text-4xl font-serif font-black text-[#2C221E]">Impacto Global</h2>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: appleEase }}
            className="bg-[#4A5D23] text-[#F4EBD0] p-10 rounded-3xl shadow-xl flex flex-col justify-center h-[calc(100%-5rem)] relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <h3 className="text-3xl font-serif mb-6 relative z-10">Más que un zoológico, un centro de investigación.</h3>
            <p className="font-sans font-light opacity-90 mb-8 relative z-10">
              Accede a nuestra base de datos pública con investigaciones, modelos 3D de anatomía animal y guías de educación ambiental.
            </p>
            
            <div className="grid grid-cols-2 gap-6 relative z-10">
              <div>
                <p className="text-5xl font-black font-serif">142</p>
                <p className="text-xs font-mono uppercase tracking-wider opacity-70 mt-1">Especies Protegidas</p>
              </div>
              <div>
                <p className="text-5xl font-black font-serif">12</p>
                <p className="text-xs font-mono uppercase tracking-wider opacity-70 mt-1">Programas Activos</p>
              </div>
            </div>
            
            <button className="mt-10 self-start bg-[#F4EBD0] text-[#4A5D23] px-6 py-3 rounded-full text-sm font-bold tracking-widest hover:bg-white transition-colors relative z-10">
              EXPLORAR RECURSOS
            </button>
          </motion.div>
        </section>

      </div>
    </div>
  );
}