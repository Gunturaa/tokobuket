"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { Search, Package, Clock, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { getOrderById } from "./actions";
import Image from "next/image";
import { formatCurrency } from "@/lib/format";

export default function TrackOrderClient() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setError("");
    setOrder(null);

    startTransition(async () => {
      try {
        const result = await getOrderById(orderId.trim());
        if (result) {
          setOrder(result);
        } else {
          setError("Pesanan tidak ditemukan. Pastikan Order ID yang Anda masukkan benar.");
        }
      } catch (err) {
        setError("Terjadi kesalahan. Silakan coba lagi.");
      }
    });
  };

  const getStatusDisplay = (status: string) => {
    switch (status) {
      case 'pending': 
        return { icon: Clock, color: "text-amber-500", bg: "bg-amber-50", border: "border-amber-200", label: "Menunggu Diproses", description: "Pesanan Anda telah kami terima dan sedang menunggu konfirmasi." };
      case 'processing': 
        return { icon: Package, color: "text-blue-500", bg: "bg-blue-50", border: "border-blue-200", label: "Sedang Diproses", description: "Bunga Anda sedang dirangkai oleh florist ahli kami." };
      case 'completed': 
        return { icon: CheckCircle2, color: "text-green-500", bg: "bg-green-50", border: "border-green-200", label: "Selesai", description: "Pesanan Anda telah selesai dan diserahkan (Pickup/Delivery)." };
      case 'cancelled': 
        return { icon: XCircle, color: "text-red-500", bg: "bg-red-50", border: "border-red-200", label: "Dibatalkan", description: "Pesanan ini telah dibatalkan." };
      default: 
        return { icon: Clock, color: "text-stone-500", bg: "bg-stone-50", border: "border-stone-200", label: "Tidak Diketahui", description: "" };
    }
  };

  return (
    <div className="min-h-[80vh] bg-stone-50 py-12 md:py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4">Lacak Pesanan</h1>
          <p className="text-stone-500 text-lg">Masukkan Order ID Anda untuk melihat status pesanan terkini.</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-stone-200 mb-8"
        >
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                type="text"
                placeholder="Masukkan Order ID (Contoh: d3f2a1b9)"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-stone-300 focus:border-primary focus:ring-primary outline-none transition-all border"
                required
              />
            </div>
            <button
              type="submit"
              disabled={isPending || !orderId.trim()}
              className="bg-stone-900 hover:bg-stone-800 text-white px-8 py-4 rounded-2xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px]"
            >
              {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : "Lacak"}
            </button>
          </form>

          {error && (
            <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm text-center">
              {error}
            </div>
          )}
        </motion.div>

        {order && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-200"
          >
            {/* Status Header */}
            <div className={`p-8 border-b ${getStatusDisplay(order.status).bg} ${getStatusDisplay(order.status).border} border-b`}>
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm ${getStatusDisplay(order.status).color}`}>
                    {getStatusDisplay(order.status).icon({ className: "w-8 h-8" })}
                  </div>
                  <div>
                    <h3 className={`text-2xl font-bold ${getStatusDisplay(order.status).color}`}>
                      {getStatusDisplay(order.status).label}
                    </h3>
                    <p className="text-stone-600 mt-1 text-sm md:text-base">
                      {getStatusDisplay(order.status).description}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-stone-500 font-medium uppercase tracking-wider mb-1">Order ID</p>
                  <p className="text-xl font-mono font-bold text-stone-900">#{order.id.slice(0, 8)}</p>
                </div>
              </div>
            </div>

            {/* Order Details */}
            <div className="p-8">
              <h4 className="font-serif font-bold text-xl text-stone-900 mb-6">Detail Pesanan</h4>
              
              <div className="flex flex-col md:flex-row gap-8">
                {/* Product Box */}
                <div className="flex-1 bg-stone-50 rounded-2xl p-6 border border-stone-100 flex items-center gap-6">
                  {order.products?.image_url ? (
                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-white relative shrink-0 shadow-sm">
                      <Image 
                        src={order.products.image_url} 
                        alt="Product" 
                        fill 
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-24 h-24 rounded-xl bg-stone-200 shrink-0" />
                  )}
                  <div>
                    <h5 className="font-bold text-lg text-stone-900">{order.products?.name || "Produk Dihapus"}</h5>
                    <p className="text-primary font-medium mt-1">{formatCurrency(order.total_price)}</p>
                    {order.custom_message && (
                      <div className="mt-3 text-sm text-stone-600 italic bg-white p-3 rounded-lg border border-stone-200">
                        "{order.custom_message}"
                      </div>
                    )}
                  </div>
                </div>

                {/* Info List */}
                <div className="flex-1 space-y-4">
                  <div>
                    <p className="text-xs text-stone-500 uppercase font-bold tracking-wider mb-1">Nama Pemesan</p>
                    <p className="text-stone-900 font-medium">{order.customer_name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-stone-500 uppercase font-bold tracking-wider mb-1">Metode Pengiriman</p>
                    <p className="text-stone-900 font-medium">
                      {order.delivery_method === "pickup" ? "Ambil di Toko" : "Kirim ke Lokasi (Delivery)"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-stone-500 uppercase font-bold tracking-wider mb-1">Waktu</p>
                    <p className="text-stone-900 font-medium">{order.delivery_time || "-"}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
