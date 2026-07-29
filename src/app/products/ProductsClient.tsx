"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ProductCard } from "@/components/ProductCard";
import { Filter } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { id: "all", label: "Semua Buket" },
  { id: "graduation", label: "Kelulusan" },
  { id: "birthday", label: "Ulang Tahun" },
  { id: "romantic", label: "Romantis" },
  { id: "ready", label: "Ready Stock" },
  { id: "other", label: "Lainnya" },
];

export default function ProductsClient({ products }: { products: any[] }) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4"
          >
            Koleksi Kami
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-stone-500 max-w-2xl mx-auto"
          >
            Jelajahi pilihan kurasi buket buatan tangan premium kami, sempurna untuk setiap momen.
          </motion.p>
        </div>

        {/* Filter */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
          <div className="flex items-center gap-2 text-stone-500 font-medium">
            <Filter className="w-5 h-5" />
            <span>Filter berdasarkan:</span>
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center md:justify-end">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  activeCategory === cat.id 
                    ? "bg-stone-900 text-white shadow-md"
                    : "bg-white text-stone-600 border border-stone-200 hover:border-stone-300 hover:bg-stone-50"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
        >
          {filteredProducts.map((product) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={product.id}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-2xl font-serif text-stone-400">Tidak ada produk ditemukan di kategori ini.</h3>
          </div>
        )}
        
      </div>
    </div>
  );
}
