import { createClient } from "@/utils/supabase/server";
import { formatCurrency } from "@/lib/format";
import { StatusSelector, DeleteOrderButton } from "./OrderActionsClient";
import Image from "next/image";

export default async function AdminOrdersPage() {
  const supabase = await createClient();

  // Fetch orders with their related products
  const { data: orders, error } = await supabase
    .from("orders")
    .select(`
      *,
      products (
        name,
        image_url
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-stone-900">Pesanan</h1>
          <p className="text-stone-500 mt-1">Kelola pesanan masuk dari pelanggan Anda.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200">
                <th className="py-4 px-6 font-semibold text-sm text-stone-600">ID / Tanggal</th>
                <th className="py-4 px-6 font-semibold text-sm text-stone-600">Pelanggan</th>
                <th className="py-4 px-6 font-semibold text-sm text-stone-600">Produk</th>
                <th className="py-4 px-6 font-semibold text-sm text-stone-600">Pengiriman</th>
                <th className="py-4 px-6 font-semibold text-sm text-stone-600">Total Harga</th>
                <th className="py-4 px-6 font-semibold text-sm text-stone-600">Status</th>
                <th className="py-4 px-6 font-semibold text-sm text-stone-600 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {orders && orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-stone-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="text-sm font-medium text-stone-900 uppercase">#{order.id.slice(0, 8)}</div>
                      <div className="text-xs text-stone-500 mt-1">{formatDate(order.created_at)}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm font-semibold text-stone-900">{order.customer_name}</div>
                      <div className="text-xs text-stone-500">{order.customer_phone}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        {order.products?.image_url ? (
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-stone-100 relative shrink-0">
                            <Image 
                              src={order.products.image_url} 
                              alt="Product" 
                              fill 
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-stone-100 shrink-0" />
                        )}
                        <div>
                          <div className="text-sm font-medium text-stone-900 line-clamp-1">{order.products?.name || "Produk Dihapus"}</div>
                          {order.custom_message && (
                            <div className="text-xs text-stone-500 italic line-clamp-1 truncate max-w-[150px]" title={order.custom_message}>
                              "{order.custom_message}"
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm font-semibold text-stone-900">
                        {order.delivery_method === "pickup" ? "Ambil di Toko" : "Delivery"}
                      </div>
                      <div className="text-xs text-stone-500">
                        {order.delivery_time || "-"}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-sm font-medium text-stone-900">{formatCurrency(order.total_price)}</div>
                    </td>
                    <td className="py-4 px-6">
                      <StatusSelector orderId={order.id} currentStatus={order.status} />
                    </td>
                    <td className="py-4 px-6 text-right">
                      <DeleteOrderButton orderId={order.id} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-stone-500">
                    Belum ada pesanan masuk.
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
