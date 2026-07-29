import { createClient } from "@/utils/supabase/server";
import { Package, TrendingUp, Users } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  
  // Fetch stats from supabase
  const { count: productCount } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true });
    
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-stone-900">Ringkasan Dashboard</h1>
        <p className="text-stone-500 mt-1">Selamat datang kembali! Berikut statistik toko Anda hari ini.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stat Card 1 */}
        <div className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm flex items-start gap-4">
          <div className="bg-primary/10 p-4 rounded-2xl text-primary">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-stone-500">Total Produk</p>
            <h3 className="text-2xl font-bold text-stone-900">{productCount || 0}</h3>
          </div>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm flex items-start gap-4 opacity-70">
          <div className="bg-blue-100 p-4 rounded-2xl text-blue-600">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-stone-500">Total Penjualan</p>
            <h3 className="text-2xl font-bold text-stone-900">-</h3>
            <p className="text-xs text-stone-400 mt-1">Segera Hadir</p>
          </div>
        </div>

        {/* Stat Card 3 */}
        <div className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm flex items-start gap-4 opacity-70">
          <div className="bg-green-100 p-4 rounded-2xl text-green-600">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-stone-500">Pesanan Baru</p>
            <h3 className="text-2xl font-bold text-stone-900">-</h3>
            <p className="text-xs text-stone-400 mt-1">Segera Hadir</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-stone-100 p-8 shadow-sm">
        <h2 className="text-xl font-bold text-stone-900 mb-4">Akses Cepat</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/admin/products" className="p-6 rounded-2xl border border-stone-100 bg-stone-50 hover:bg-stone-100 hover:border-stone-200 transition-all group">
            <h3 className="font-semibold text-stone-900 group-hover:text-primary transition-colors">Kelola Katalog Produk &rarr;</h3>
            <p className="text-sm text-stone-500 mt-2">Tambah buket baru, edit harga, atau ganti foto produk.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
