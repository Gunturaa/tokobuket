import { createClient } from "@/utils/supabase/server";
import ProductDetailClient from "./ProductDetailClient";
import { notFound } from "next/navigation";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  
  const supabase = await createClient();
  const { data: p } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (!p) {
    notFound();
  }

  const { data: settingsData } = await supabase
    .from("settings")
    .select("*")
    .single();

  const product = {
    id: p.id,
    name: p.name,
    description: p.description,
    price: p.price,
    category: p.category,
    imageUrl: p.image_url,
    isPopular: p.is_popular,
    isAvailable: p.is_available,
  };

  return <ProductDetailClient product={product} settings={settingsData} />;
}
