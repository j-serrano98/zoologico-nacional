import { supabase } from "../lib/supabase";
import HomeHero from "./components/HomeHero.jsx";
import Polaroid from "./components/Polaroid.jsx";
import EditorialSections from "./components/EditorialSections.jsx";
import Link from "next/link";

export const revalidate = 3600;

export default async function Home() {
  // Traemos los animales de Supabase
  const { data: animals } = await supabase
    .from("animals")
    .select("id, name, slug, main_image_url")
    .limit(3);

  return (
    // Agregamos md:pl-24 para dejarle espacio respirable al Sidebar Flotante
    <main className="min-h-screen font-sans overflow-x-hidden md:pl-24 flex flex-col">
      
      {/* 1. Hero Full Screen */}
      <HomeHero />

      {/* 2. Sección Especies Destacadas */}
      <section className="py-32 relative bg-[#F4EBD0] text-[#2C221E] z-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-serif font-black">Especies Destacadas</h2>
            <p className="mt-4 text-xl opacity-70">Encuentros cercanos con los residentes más imponentes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 justify-items-center">
            {animals && animals.map((animal, index) => {
              const rotations = [-3, 2, -1];
              return (
                <Link href={`/animales/${animal.slug}`} key={animal.id}>
                  <Polaroid 
                    title={animal.name} 
                    imageSrc={animal.main_image_url} 
                    rotation={rotations[index % rotations.length]} 
                  />
                </Link>
              );
            })}
          </div>
          
          <div className="mt-16 text-center">
            <Link href="/animales" className="inline-block border border-[#2C221E] text-[#2C221E] px-8 py-4 text-sm font-mono uppercase tracking-widest hover:bg-[#2C221E] hover:text-[#F4EBD0] transition-colors rounded-full">
              Ver Catálogo Completo
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Secciones Profesionales (Noticias y Datos) */}
      <section className="bg-white rounded-t-[3rem] z-20 relative shadow-[0_-20px_50px_rgba(0,0,0,0.05)]">
        <EditorialSections />
      </section>

      {/* 4. Footer Minimalista */}
      <footer className="bg-[#2C221E] text-[#F4EBD0] py-12 px-6 text-center z-20 relative">
        <h2 className="text-3xl font-serif font-black tracking-widest mb-4">SAFARI<span className="text-[#D35400]">.</span></h2>
        <p className="font-mono text-xs opacity-50 uppercase tracking-widest">© 2026 Reserva Natural Digital. Todos los derechos reservados.</p>
      </footer>
    </main>
  );
}