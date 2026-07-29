"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag, Truck, ShieldCheck, Clock, Image as ImageIcon, Minus, Plus } from "lucide-react";
import { formatCurrency } from "@/lib/format";
import { useCart } from "@/components/CartContext";
import { useRouter } from "next/navigation";

export default function ProductDetailClient({ product, settings }: { product: any, settings: any }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    router.push("/cart");
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

            <div className="mt-8 border-t border-stone-200 pt-8">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-stone-900 font-medium">Jumlah:</span>
                <div className="flex items-center gap-3 bg-stone-50 rounded-full border border-stone-200 px-2 py-1">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-stone-600 hover:bg-white hover:shadow-sm transition-all"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-semibold text-stone-900 w-6 text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-stone-600 hover:bg-white hover:shadow-sm transition-all"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {(!settings || settings.is_open) ? (
                  <button 
                    onClick={handleAddToCart}
                    className="w-full bg-stone-900 hover:bg-stone-800 text-white font-medium py-4 px-8 rounded-xl flex items-center justify-center transition-all hover:-translate-y-1 active:scale-[0.98] shadow-lg"
                  >
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Masukkan ke Keranjang
                  </button>
                ) : (
                  <button 
                    disabled
                    className="w-full bg-stone-200 text-stone-500 font-medium py-4 px-8 rounded-xl flex items-center justify-center cursor-not-allowed"
                  >
                    Toko Sedang Tutup
                  </button>
                )}
              </div>
            </div>

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
