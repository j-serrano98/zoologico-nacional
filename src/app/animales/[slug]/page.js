import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import CameraViewfinder from "../../components/CameraViewfinder";
import AnimalDetailAnimation from "../../components/AnimalDetailAnimation"; // Crearemos este para las animaciones tipo Apple

// Revalidar cada hora para rendimiento óptimo
export const revalidate = 3600; 

// Generar rutas estáticas en tiempo de compilación para que cargue instantáneamente (estilo Apple)
export async function generateStaticParams() {
  const { data: animals } = await supabase.from("animals").select("slug");
  return animals?.map((animal) => ({ slug: animal.slug })) || [];
}

export default async function AnimalPage({ params }) {
  // UNWRAP PARAMS: En Next.js 15+ params es una Promesa y requiere await
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  // Consultar el animal por su slug, incluyendo su categoría y multimedia relacionada
  const { data: animal, error } = await supabase
    .from("animals")
    .select(`
      *,
      categories ( name, slug ),
      animal_media ( url, media_type, caption )
    `)
    .eq("slug", slug)
    .single();

  // Si no existe el animal o hay error, mandamos un 404 limpio de Next.js
  if (error || !animal) {
    notFound();
  }

  // Filtrar fotos adicionales y el video para la cámara
  const photos = animal.animal_media?.filter(m => m.media_type === "image") || [];
  const video = animal.animal_media?.find(m => m.media_type === "video")?.url;

  return (
    <main className="min-h-screen bg-safari-sand text-safari-dark pb-24 overflow-hidden">
      {/* Componente del cliente para el Hero con Parallax y animaciones de entrada */}
      <AnimalDetailAnimation animal={animal} photos={photos} />

      {/* Sección del Video Documental (Visor de Cámara) */}
      {video && (
        <section className="py-20 px-6 bg-safari-dark text-safari-sand">
          <div className="container mx-auto text-center mb-12">
            <span className="text-safari-sunset font-mono tracking-widest text-sm uppercase block mb-2">
              PRODUCCIÓN EN EL TERRENO
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold">
              Comportamiento Salvaje
            </h2>
          </div>
          <CameraViewfinder videoUrl={video} />
        </section>
      )}
    </main>
  );
}