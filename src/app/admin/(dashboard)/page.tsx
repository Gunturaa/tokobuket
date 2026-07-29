import { createClient } from "@/utils/supabase/server";
import { Package, TrendingUp, Users, ShoppingBag, Clock } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/format";
import { AnalyticsChart } from "./AnalyticsChart";

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  
  // 1. Fetch products count
  const { count: productCount } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true });
    
  // 2. Fetch orders data for stats and table
  const { data: allOrders, error } = await supabase
    .from('orders')
    .select('id, customer_name, total_price, status, created_at')
    .order('created_at', { ascending: false });

  // Calculate Stats
  const totalOrders = allOrders?.length || 0;
  const totalRevenue = allOrders?.reduce((sum, order) => sum + (order.total_price || 0), 0) || 0;
  const pendingOrders = allOrders?.filter(o => o.status === 'pending').length || 0;

  // Get Top 5 Recent Orders
  const recentOrders = allOrders?.slice(0, 5) || [];

  // Process data for Analytics Chart (Last 7 Days)
  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d;
  });

  const chartData = last7Days.map(date => {
    const dateStr = date.toLocaleDateString('id-ID', { weekday: 'short' });
    const dateOnly = date.toISOString().split('T')[0];
    
    // Sum revenue for this day
    const dayRevenue = allOrders?.filter(order => {
      const orderDate = new Date(order.created_at).toISOString().split('T')[0];
      return orderDate === dateOnly;
    }).reduce((sum, order) => sum + (order.total_price || 0), 0) || 0;

    return {
      date: dateStr,
      revenue: dayRevenue
    };
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-bold text-stone-900">Ringkasan Dashboard</h1>
        <p className="text-stone-500 mt-1">Selamat datang kembali! Berikut statistik toko Anda secara keseluruhan.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
        <div className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm flex items-start gap-4">
          <div className="bg-blue-100 p-4 rounded-2xl text-blue-600">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-stone-500">Pendapatan</p>
            <h3 className="text-2xl font-bold text-stone-900">{formatCurrency(totalRevenue)}</h3>
          </div>
        </div>

        {/* Stat Card 3 */}
        <div className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm flex items-start gap-4">
          <div className="bg-purple-100 p-4 rounded-2xl text-purple-600">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-stone-500">Total Pesanan</p>
            <h3 className="text-2xl font-bold text-stone-900">{totalOrders}</h3>
          </div>
        </div>

        {/* Stat Card 4 */}
        <div className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm flex items-start gap-4">
          <div className="bg-orange-100 p-4 rounded-2xl text-orange-600">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-stone-500">Menunggu (Pending)</p>
            <h3 className="text-2xl font-bold text-stone-900">{pendingOrders}</h3>
          </div>
        </div>
      </div>

      {/* Analytics Chart Section */}
      <div className="bg-white rounded-3xl border border-stone-100 p-8 shadow-sm">
        <h2 className="text-xl font-bold text-stone-900 mb-2">Tren Penjualan (7 Hari Terakhir)</h2>
        <p className="text-sm text-stone-500 mb-4">Melihat performa pendapatan toko Anda selama satu minggu ke belakang.</p>
        <AnalyticsChart data={chartData} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders Table */}
        <div className="bg-white rounded-3xl border border-stone-100 p-8 shadow-sm lg:col-span-2 overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-stone-900">Pesanan Terbaru</h2>
            <Link href="/admin/orders" className="text-sm font-medium text-primary hover:underline">
              Lihat Semua
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-stone-100">
                  <th className="pb-3 text-sm font-medium text-stone-500 font-serif">ID Pesanan</th>
                  <th className="pb-3 text-sm font-medium text-stone-500 font-serif">Pelanggan</th>
                  <th className="pb-3 text-sm font-medium text-stone-500 font-serif">Total</th>
                  <th className="pb-3 text-sm font-medium text-stone-500 font-serif">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.length > 0 ? (
                  recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-stone-50 hover:bg-stone-50 transition-colors">
                      <td className="py-4 text-sm font-medium text-stone-900">
                        #{order.id.slice(0, 8).toUpperCase()}
                      </td>
                      <td className="py-4 text-sm text-stone-600">
                        {order.customer_name}
                      </td>
                      <td className="py-4 text-sm font-medium text-stone-900">
                        {formatCurrency(order.total_price)}
                      </td>
                      <td className="py-4 text-sm">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          order.status === 'completed' ? 'bg-green-100 text-green-700' :
                          order.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                          'bg-orange-100 text-orange-700'
                        }`}>
                          {order.status === 'completed' ? 'Selesai' :
                           order.status === 'processing' ? 'Diproses' : 'Menunggu'}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-stone-500 text-sm">
                      Belum ada pesanan masuk.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-3xl border border-stone-100 p-8 shadow-sm">
          <h2 className="text-xl font-bold text-stone-900 mb-6">Akses Cepat</h2>
          <div className="flex flex-col gap-4">
            <Link href="/admin/products" className="p-5 rounded-2xl border border-stone-100 bg-stone-50 hover:bg-stone-100 hover:border-stone-200 transition-all group flex items-start gap-4">
              <div className="bg-white p-3 rounded-xl shadow-sm group-hover:text-primary transition-colors">
                <Package className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-stone-900 group-hover:text-primary transition-colors">Kelola Produk</h3>
                <p className="text-xs text-stone-500 mt-1">Tambah atau edit buket</p>
              </div>
            </Link>

            <Link href="/admin/orders" className="p-5 rounded-2xl border border-stone-100 bg-stone-50 hover:bg-stone-100 hover:border-stone-200 transition-all group flex items-start gap-4">
              <div className="bg-white p-3 rounded-xl shadow-sm group-hover:text-primary transition-colors">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-stone-900 group-hover:text-primary transition-colors">Kelola Pesanan</h3>
                <p className="text-xs text-stone-500 mt-1">Lihat dan update status pesanan</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
