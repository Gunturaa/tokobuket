import { createClient } from "@/utils/supabase/server";
import { ArrowLeft, Save, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import EditProductForm from "./EditProductForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const supabase = await createClient();

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (!product) {
    redirect("/admin/products");
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/products" 
          className="p-3 bg-white rounded-full border border-stone-100 shadow-sm text-stone-500 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-serif font-bold text-stone-900">Edit Produk</h1>
          <p className="text-stone-500 mt-1">Perbarui detail buket {product.name}.</p>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-stone-100 shadow-sm">
        <EditProductForm product={product} />
      </div>
    </div>
  );
}
