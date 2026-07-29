"use client";

import Link from "next/link";
import { useCart } from "@/components/CartContext";
import { formatCurrency } from "@/lib/format";
import { ArrowLeft, Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import Image from "next/image";

export default function CartClient() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center bg-stone-50">
        <div className="text-center">
          <div className="w-24 h-24 bg-stone-200 rounded-full flex items-center justify-center mx-auto mb-6 text-stone-400">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-stone-900 mb-2">Keranjang Belanja Kosong</h2>
          <p className="text-stone-500 mb-8 max-w-md mx-auto">Anda belum menambahkan produk apa pun ke dalam keranjang belanja. Mari mulai berbelanja!</p>
          <Link href="/products" className="inline-flex items-center px-6 py-3 bg-stone-900 text-white rounded-xl hover:bg-stone-800 transition-colors font-medium">
            Lihat Koleksi Bunga
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 py-12 md:py-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-8">Keranjang Belanja <span className="text-stone-400 text-2xl font-sans font-normal">({totalItems} produk)</span></h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="w-full lg:w-2/3 space-y-6">
            {items.map((item) => (
              <div key={item.product.id} className="bg-white rounded-3xl p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-6 border border-stone-200 shadow-sm relative">
                
                <button 
                  onClick={() => removeItem(item.product.id)}
                  className="absolute top-4 right-4 sm:relative sm:top-auto sm:right-auto text-stone-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>

                <div className="w-full sm:w-32 h-32 rounded-xl bg-stone-100 relative shrink-0 overflow-hidden">
                  {item.product.image_url ? (
                    <Image src={item.product.image_url} alt={item.product.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-300">
                      <ShoppingBag className="w-8 h-8" />
                    </div>
                  )}
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl font-semibold text-stone-900 mb-2">{item.product.name}</h3>
                  <p className="text-primary font-bold text-lg mb-4">{formatCurrency(item.product.price)}</p>
                  
                  <div className="flex items-center justify-center sm:justify-start gap-3">
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-50 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-semibold text-stone-900 w-6 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center text-stone-600 hover:bg-stone-50 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="hidden sm:block text-right shrink-0">
                  <p className="text-xs text-stone-500 font-bold uppercase tracking-wider mb-1">Subtotal</p>
                  <p className="font-bold text-stone-900 text-lg">{formatCurrency(item.product.price * item.quantity)}</p>
                </div>
              </div>
            ))}

            <Link href="/products" className="inline-flex items-center text-stone-500 hover:text-stone-900 font-medium transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Lanjut Berbelanja
            </Link>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-stone-200 shadow-sm sticky top-32">
              <h2 className="text-xl font-bold text-stone-900 mb-6">Ringkasan Pesanan</h2>
              
              <div className="space-y-4 mb-6 border-b border-stone-100 pb-6">
                <div className="flex justify-between text-stone-600">
                  <span>Total Produk</span>
                  <span className="font-medium text-stone-900">{totalItems} Item</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-stone-900">{formatCurrency(totalPrice)}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-end mb-8">
                <span className="text-lg font-bold text-stone-900">Total Tagihan</span>
                <span className="text-2xl font-bold text-primary">{formatCurrency(totalPrice)}</span>
              </div>

              <Link 
                href="/checkout" 
                className="w-full flex justify-center items-center py-4 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30"
              >
                Checkout Sekarang
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
