import { supabase } from "../../lib/supabase";
import AnimalListClient from "../components/AnimalListClient.jsx";

export const revalidate = 3600;

export default async function AnimalesListPage() {
  // 1. Traer todos los animales y todas las categorías disponibles
  const { data: animals } = await supabase
    .from("animals")
    .select("id, name, slug, summary, main_image_url, category_id, categories(name, slug)");

  const { data: categories } = await supabase
    .from("categories")
    .select("id, name, slug");

  return (
    // Delegamos la renderización completa al cliente para poder animar el fondo de la pantalla
    <AnimalListClient initialAnimals={animals || []} categories={categories || []} />
  );
}