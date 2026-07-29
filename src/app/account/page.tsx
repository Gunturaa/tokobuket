import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { logoutUser } from "../(auth)/actions";
import { LogOut, Package, User, MapPin } from "lucide-react";
import { formatCurrency } from "@/lib/format";

export const metadata = {
  title: "Akun Saya | Lila of the Valley",
};

export default async function AccountPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch user orders
  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending': return <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold uppercase rounded-full">Menunggu</span>;
      case 'processing': return <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold uppercase rounded-full">Diproses</span>;
      case 'completed': return <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase rounded-full">Selesai</span>;
      case 'cancelled': return <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold uppercase rounded-full">Batal</span>;
      default: return <span className="px-3 py-1 bg-stone-100 text-stone-700 text-xs font-bold uppercase rounded-full">Unknown</span>;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 py-12 md:py-24">
      <div className="container mx-auto px-4 max-w-5xl">
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Profile */}
          <div className="w-full md:w-1/3">
            <div className="bg-white rounded-3xl p-8 border border-stone-200 shadow-sm sticky top-32">
              <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
                <User className="w-10 h-10" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-stone-900 mb-2">
                {user.user_metadata.full_name || "Pelanggan"}
              </h2>
              <p className="text-stone-500 mb-6">{user.email}</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center text-stone-600">
                  <MapPin className="w-5 h-5 mr-3 text-stone-400" />
                  <span className="text-sm">Indonesia</span>
                </div>
              </div>

              <form action={logoutUser}>
                <button type="submit" className="flex items-center justify-center w-full py-3 px-4 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 font-medium transition-colors">
                  <LogOut className="w-5 h-5 mr-2" />
                  Keluar Akun
                </button>
              </form>
            </div>
          </div>

          {/* Main Content: Orders */}
          <div className="w-full md:w-2/3">
            <h1 className="text-3xl font-serif font-bold text-stone-900 mb-8">Riwayat Pesanan</h1>

            <div className="space-y-6">
              {orders && orders.length > 0 ? (
                orders.map((order) => (
                  <div key={order.id} className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200 shadow-sm">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-stone-100">
                      <div>
                        <p className="text-sm text-stone-500 font-medium mb-1">Order ID: <span className="text-stone-900 font-mono">#{order.id.slice(0,8)}</span></p>
                        <p className="text-xs text-stone-400">{formatDate(order.created_at)}</p>
                      </div>
                      {getStatusBadge(order.status)}
                    </div>

                    <div className="space-y-4">
                      {order.items?.map((item: any, index: number) => (
                        <div key={index} className="flex items-center gap-4">
                          {item.product.image_url ? (
                            <img src={item.product.image_url} alt={item.product.name} className="w-16 h-16 object-cover rounded-lg bg-stone-100" />
                          ) : (
                            <div className="w-16 h-16 rounded-lg bg-stone-100 flex items-center justify-center text-stone-400">
                              <Package className="w-6 h-6" />
                            </div>
                          )}
                          <div className="flex-1">
                            <h4 className="font-semibold text-stone-900">{item.product.name}</h4>
                            <p className="text-sm text-stone-500">{item.quantity} x {formatCurrency(item.product.price)}</p>
                          </div>
                          <div className="font-medium text-stone-900">
                            {formatCurrency(item.quantity * item.product.price)}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 pt-6 border-t border-stone-100 flex flex-wrap justify-between items-end gap-4">
                      <div>
                        <p className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">Pengiriman</p>
                        <p className="text-sm font-medium text-stone-900">
                          {order.delivery_method === 'pickup' ? 'Ambil di Toko' : 'Delivery'} 
                          <span className="text-stone-400 font-normal"> ({order.delivery_time})</span>
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">Total Belanja</p>
                        <p className="text-2xl font-bold text-primary">{formatCurrency(order.total_price)}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-3xl p-12 text-center border border-stone-200">
                  <Package className="w-16 h-16 mx-auto text-stone-300 mb-4" />
                  <h3 className="text-xl font-serif font-bold text-stone-900 mb-2">Belum ada pesanan</h3>
                  <p className="text-stone-500 mb-6">Anda belum pernah melakukan pemesanan apapun.</p>
                  <a href="/products" className="inline-flex items-center justify-center px-6 py-3 bg-stone-900 text-white rounded-xl hover:bg-stone-800 transition-colors">
                    Mulai Belanja
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
