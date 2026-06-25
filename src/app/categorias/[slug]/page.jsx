import { supabase } from "../../../lib/supabase";
import { notFound } from "next/navigation";
import Link from "next/link";
import Polaroid from "../../components/Polaroid";
import CategoryHeroAnimation from "../../components/CategoryHeroAnimation";

export const revalidate = 3600;

export async function generateStaticParams() {
  const { data: categories } = await supabase.from("categories").select("slug");
  return categories?.map((cat) => ({ slug: cat.slug })) || [];
}

export default async function CategoryPage({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  // 1. Obtener los datos del bioma actual
  const { data: category, error: catError } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single();

  if (catError || !category) {
    notFound();
  }

  // 2. Traer los animales que pertenezcan a este bioma
  const { data: animals } = await supabase
    .from("animals")
    .select("id, name, slug, main_image_url")
    .eq("category_id", category.id);

  return (
    <main className="min-h-screen bg-safari-sand text-safari-dark pb-24 overflow-hidden">
      {/* Banner de Entrada Animado */}
      <CategoryHeroAnimation category={category} />

      {/* Listado Exclusivo */}
      <section className="container mx-auto px-6 max-w-6xl mt-16">
        <h2 className="text-3xl font-serif font-black mb-12 border-b border-safari-dark/10 pb-4">
          Fauna Residente ({animals?.length || 0})
        </h2>

        {animals && animals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 justify-items-center">
            {animals.map((animal, index) => {
              const rotations = [-3, 2, -1];
              return (
                <Link href={`/animales/${animal.slug}`} key={animal.id} className="block">
                  <Polaroid
                    title={animal.name}
                    imageSrc={animal.main_image_url}
                    rotation={rotations[index % rotations.length]}
                  />
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white/30 rounded-lg border border-dashed border-safari-dark/20 font-mono text-sm">
            Ningún animal asignado a este bioma por el momento.
          </div>
        )}
      </section>
    </main>
  );
}