"use client";

import { useState, useTransition, useEffect } from "react";
import { useCart } from "@/components/CartContext";
import { formatCurrency } from "@/lib/format";
import { createCheckoutOrder } from "./actions";
import { Loader2, ArrowLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CheckoutClient({ settings }: { settings: any }) {
  const { items, totalPrice, clearCart } = useCart();
  const router = useRouter();

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("pickup");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    // If cart is empty, redirect back to cart
    if (items.length === 0) {
      router.push("/cart");
    }
  }, [items, router]);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || items.length === 0) return;

    startTransition(async () => {
      try {
        const order = await createCheckoutOrder({
          customer_name: customerName,
          customer_phone: customerPhone,
          delivery_method: deliveryMethod,
          delivery_time: deliveryTime,
          custom_message: customMessage,
          items: items,
          total_price: totalPrice,
        });

        // Format items for WhatsApp text
        const itemsText = items.map((item, index) => 
          `${index + 1}. ${item.product.name} (${item.quantity}x) - ${formatCurrency(item.product.price * item.quantity)}`
        ).join('\n');

        const phoneNumber = settings?.whatsapp_number || "6289515441332";
        const defaultMsg = settings?.default_message || "Halo kak, saya mau pesan:";
        
        const text = `${defaultMsg}
[Order ID: #${order.id.slice(0, 8).toUpperCase()}]

Nama: ${customerName}
Metode: ${deliveryMethod === "pickup" ? "Ambil di Toko" : "Kirim (Delivery)"}
Waktu: ${deliveryTime || "-"}
${customMessage ? `\nPesan Kartu Ucapan:\n"${customMessage}"\n` : ""}
Pesanan:
${itemsText}

Total Harga: *${formatCurrency(totalPrice)}*`;

        const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
        
        // Clear cart and redirect
        clearCart();
        window.open(waUrl, "_blank");
        router.push("/track"); // Redirect to track page
        
      } catch (error) {
        alert("Gagal memproses pesanan. Silakan coba lagi.");
      }
    });
  };

  if (items.length === 0) return null; // Avoid rendering if empty

  return (
    <div className="min-h-screen bg-stone-50 py-12 md:py-24">
      <div className="container mx-auto px-4 max-w-5xl">
        <Link href="/cart" className="inline-flex items-center text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali ke Keranjang
        </Link>
        
        <h1 className="text-3xl font-serif font-bold text-stone-900 mb-8">Checkout Pesanan</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Form */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200 shadow-sm">
              <h2 className="text-xl font-bold text-stone-900 mb-6">Informasi Kontak & Pengiriman</h2>
              <form id="checkout-form" onSubmit={handleCheckout}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-stone-900 mb-2">Nama Lengkap *</label>
                    <input
                      type="text"
                      required
                      className="w-full rounded-xl border-stone-300 shadow-sm focus:border-primary focus:ring-primary p-4 bg-stone-50 border outline-none"
                      placeholder="Contoh: Budi Santoso"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-900 mb-2">No. HP / WhatsApp *</label>
                    <input
                      type="text"
                      required
                      className="w-full rounded-xl border-stone-300 shadow-sm focus:border-primary focus:ring-primary p-4 bg-stone-50 border outline-none"
                      placeholder="Contoh: 0812..."
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-stone-900 mb-2">Metode Pengiriman *</label>
                    <select
                      className="w-full rounded-xl border-stone-300 shadow-sm focus:border-primary focus:ring-primary p-4 bg-stone-50 border outline-none"
                      value={deliveryMethod}
                      onChange={(e) => setDeliveryMethod(e.target.value)}
                    >
                      <option value="pickup">Ambil di Toko (Pickup)</option>
                      <option value="delivery">Kirim ke Lokasi (Delivery)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-900 mb-2">
                      Waktu {deliveryMethod === "pickup" ? "Pengambilan" : "Pengiriman"} *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full rounded-xl border-stone-300 shadow-sm focus:border-primary focus:ring-primary p-4 bg-stone-50 border outline-none"
                      placeholder="Contoh: Besok Siang jam 12"
                      value={deliveryTime}
                      onChange={(e) => setDeliveryTime(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-sm font-medium text-stone-900 mb-2">Isi Kartu Ucapan (Opsional)</label>
                  <textarea
                    className="w-full rounded-xl border-stone-300 shadow-sm focus:border-primary focus:ring-primary p-4 bg-stone-50 border outline-none min-h-[100px]"
                    placeholder="Tuliskan ucapan untuk penerima buket bunga..."
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                  />
                </div>
              </form>
            </div>
          </div>

          {/* Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm sticky top-32">
              <h2 className="text-xl font-bold text-stone-900 mb-6">Ringkasan Belanja</h2>
              
              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-4">
                    <div className="w-16 h-16 rounded-lg bg-stone-100 overflow-hidden relative shrink-0">
                      {item.product.image_url && (
                        <img src={item.product.image_url} alt={item.product.name} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-stone-900 text-sm line-clamp-2">{item.product.name}</p>
                      <p className="text-stone-500 text-xs mt-1">{item.quantity} x {formatCurrency(item.product.price)}</p>
                    </div>
                    <div className="font-bold text-stone-900 text-sm">
                      {formatCurrency(item.product.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-stone-100 pt-6 mb-6">
                <div className="flex justify-between items-end">
                  <span className="font-bold text-stone-900">Total Tagihan</span>
                  <span className="text-xl font-bold text-primary">{formatCurrency(totalPrice)}</span>
                </div>
              </div>

              <button
                type="submit"
                form="checkout-form"
                disabled={isPending}
                className="w-full flex justify-center items-center py-4 rounded-xl bg-stone-900 text-white font-medium hover:bg-stone-800 transition-colors disabled:opacity-50"
              >
                {isPending ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                {isPending ? "Memproses..." : "Pesan Sekarang via WA"}
              </button>
              
              <p className="text-xs text-stone-400 text-center mt-4 flex items-center justify-center gap-1">
                <ShieldCheck className="w-4 h-4" />
                Data Anda aman bersama kami
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
