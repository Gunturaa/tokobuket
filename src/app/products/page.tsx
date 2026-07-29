import { createClient } from "@/utils/supabase/server";
import ProductsClient from "./ProductsClient";

export default async function ProductsPage() {
  const supabase = await createClient();
  
  const { data: productsData } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  const products = (productsData || []).map((p: any) => ({
    id: p.id,
    name: p.name,
    description: p.description,
    price: p.price,
    category: p.category,
    imageUrl: p.image_url,
    isPopular: p.is_popular,
    isAvailable: p.is_available,
  }));

  return <ProductsClient products={products} />;
}
