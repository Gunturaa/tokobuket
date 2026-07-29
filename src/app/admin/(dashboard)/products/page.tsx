import { createClient } from "@/utils/supabase/server";
import { Plus, Pencil } from "lucide-react";
import { formatCurrency } from "@/lib/format";
import Link from "next/link";
import Image from "next/image";
import { deleteProduct } from "./actions";
import { DeleteButton } from "./DeleteButton";

export default async function AdminProductsPage() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-stone-900">Katalog Produk</h1>
          <p className="text-stone-500 mt-1">Kelola semua produk buket bunga Anda di sini.</p>
        </div>
        <Link href="/admin/products/new" className="bg-stone-900 hover:bg-primary text-white px-5 py-3 rounded-xl font-medium flex items-center gap-2 transition-colors">
          <Plus className="w-5 h-5" />
          Tambah Produk
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-stone-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50/50 border-b border-stone-100">
                <th className="px-6 py-4 font-semibold text-stone-900 text-sm">Nama Produk</th>
                <th className="px-6 py-4 font-semibold text-stone-900 text-sm">Harga</th>
                <th className="px-6 py-4 font-semibold text-stone-900 text-sm">Kategori</th>
                <th className="px-6 py-4 font-semibold text-stone-900 text-sm">Status</th>
                <th className="px-6 py-4 font-semibold text-stone-900 text-sm text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {products?.map((product) => (
                <tr key={product.id} className="hover:bg-stone-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {product.image_url ? (
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 border border-stone-100">
                          <Image src={product.image_url} alt={product.name} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-stone-100 flex-shrink-0" />
                      )}
                      <div>
                        <p className="font-medium text-stone-900 line-clamp-1">{product.name}</p>
                        {product.is_popular && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">Terlaris</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-stone-600">
                    {formatCurrency(product.price)}
                  </td>
                  <td className="px-6 py-4 text-stone-500 capitalize">
                    {product.category}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      product.is_available 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-stone-100 text-stone-800'
                    }`}>
                      {product.is_available ? 'Tersedia' : 'Habis'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link href={`/admin/products/${product.id}/edit`} className="p-2 text-stone-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <DeleteButton action={deleteProduct.bind(null, product.id, product.image_url)} />
                    </div>
                  </td>
                </tr>
              ))}
              
              {!products || products.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-stone-500">
                    Belum ada produk. Silakan tambah produk baru.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
