"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle, Truck, ShieldCheck, Clock, Image as ImageIcon, Loader2 } from "lucide-react";
import { formatCurrency } from "@/lib/format";
import { createOrder } from "../actions";

export default function ProductDetailClient({ product, settings }: { product: any, settings: any }) {
  const [customMessage, setCustomMessage] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("pickup");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [isPending, startTransition] = useTransition();

  if (!product) {
    notFound();
  }

  const handleOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;

    startTransition(async () => {
      try {
        const order = await createOrder({
          product_id: product.id,
          customer_name: customerName,
          customer_phone: customerPhone,
          custom_message: customMessage,
          total_price: product.price,
          delivery_method: deliveryMethod,
          delivery_time: deliveryTime,
        });

        const phoneNumber = settings?.whatsapp_number || "6289515441332";
        const defaultMsg = settings?.default_message || "Halo kak, saya mau pesan:";
        const text = `${defaultMsg}
[Order ID: #${order.id.slice(0, 8).toUpperCase()}]

Nama: ${customerName}
Produk: ${product.name}
Metode: ${deliveryMethod === "pickup" ? "Ambil di Toko" : "Kirim (Delivery)"}
Waktu: ${deliveryTime || "-"}
Ucapan: ${customMessage || "-"}
Total Harga: ${formatCurrency(product.price)}`;

        const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
        window.open(waUrl, "_blank");
      } catch (error) {
        alert("Gagal memproses pesanan. Silakan coba lagi.");
      }
    });
  };


  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4">
        
        <Link 
          href="/products" 
          className="inline-flex items-center text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Koleksi
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {/* Product Image */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-stone-100 flex items-center justify-center text-stone-400"
          >
            {product.imageUrl ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-tr from-pink-100 via-rose-50 to-amber-50 animate-pulse-gradient text-pink-300 flex flex-col items-center justify-center">
                <ImageIcon className="w-16 h-16 mb-4 opacity-60 drop-shadow-sm" />
                <span className="font-semibold tracking-wider uppercase text-pink-400/80">Gambar Produk</span>
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col"
          >
            <div className="mb-2">
              <span className="text-sm font-medium uppercase tracking-wider text-primary">
                {product.category === "graduation" ? "Kelulusan" :
                 product.category === "birthday" ? "Ulang Tahun" :
                 product.category === "romantic" ? "Romantis" :
                 product.category === "ready" ? "Ready Stock" : "Lainnya"}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4">
              {product.name}
            </h1>
            <p className="text-2xl font-semibold text-stone-900 mb-6">
              {formatCurrency(product.price)}
            </p>
            
            <div className="prose prose-stone mb-8">
              <p className="text-stone-600 leading-relaxed text-lg">
                {product.description}
              </p>
            </div>

            {/* Order Form */}
            <form onSubmit={handleOrder} className="mt-auto border-t border-stone-200 pt-8">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-stone-900 mb-2">Nama Lengkap *</label>
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full rounded-xl border-stone-300 shadow-sm focus:border-primary focus:ring-primary text-sm p-4 bg-stone-50 border outline-none transition-all"
                    placeholder="Contoh: Budi Santoso"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-stone-900 mb-2">Nomor WhatsApp *</label>
                  <input
                    type="text"
                    id="phone"
                    required
                    className="w-full rounded-xl border-stone-300 shadow-sm focus:border-primary focus:ring-primary text-sm p-4 bg-stone-50 border outline-none transition-all"
                    placeholder="Contoh: 08123456789"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="method" className="block text-sm font-medium text-stone-900 mb-2">Metode Pengiriman *</label>
                  <select
                    id="method"
                    className="w-full rounded-xl border-stone-300 shadow-sm focus:border-primary focus:ring-primary text-sm p-4 bg-stone-50 border outline-none transition-all"
                    value={deliveryMethod}
                    onChange={(e) => setDeliveryMethod(e.target.value)}
                  >
                    <option value="pickup">Ambil di Toko (Pickup)</option>
                    <option value="delivery">Kirim ke Lokasi (Delivery)</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-stone-900 mb-2">Waktu {deliveryMethod === "pickup" ? "Pengambilan" : "Pengiriman"} *</label>
                  <input
                    type="text"
                    id="time"
                    required
                    className="w-full rounded-xl border-stone-300 shadow-sm focus:border-primary focus:ring-primary text-sm p-4 bg-stone-50 border outline-none transition-all"
                    placeholder="Contoh: Besok Siang jam 12"
                    value={deliveryTime}
                    onChange={(e) => setDeliveryTime(e.target.value)}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-stone-900 mb-2">
                  Pesan di Kartu Ucapan (Opsional)
                </label>
                <textarea
                  id="message"
                  rows={3}
                  className="w-full rounded-xl border-stone-300 shadow-sm focus:border-primary focus:ring-primary text-sm p-4 bg-stone-50 border outline-none transition-all"
                  placeholder="Selamat kelulusan! Semoga sukses selalu..."
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                />
                <p className="text-xs text-stone-500 mt-2">
                  Pesan ini akan ditulis tangan pada kartu ucapan premium.
                </p>
              </div>

              <div className="space-y-4 pt-4">
                {(!settings || settings.is_open) ? (
                  <button 
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-medium py-4 px-8 rounded-xl flex items-center justify-center transition-all hover:-translate-y-1 active:scale-[0.98] shadow-lg disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isPending ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <MessageCircle className="w-5 h-5 mr-2" />
                        Pesan via WhatsApp
                      </>
                    )}
                  </button>
                ) : (
                  <button 
                    disabled
                    className="w-full bg-stone-200 text-stone-500 font-medium py-4 px-8 rounded-xl flex items-center justify-center cursor-not-allowed"
                  >
                    Toko Sedang Tutup
                  </button>
                )}
                
                <p className="text-center text-xs text-stone-500">
                  Pembayaran dilakukan setelah pesanan dikonfirmasi via WhatsApp
                </p>
              </div>
            </form>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-stone-200">
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center text-stone-600">
                  <Truck className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-stone-600">Pengiriman Dihari yang Sama</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center text-stone-600">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-stone-600">Jaminan Kesegaran Bunga</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 bg-stone-100 rounded-full flex items-center justify-center text-stone-600">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium text-stone-600">Dukungan 24/7</span>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
