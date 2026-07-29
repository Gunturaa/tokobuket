"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Palette, Leaf, Wallet, AlignLeft } from "lucide-react";

export default function CustomBouquetPage() {
  const [formData, setFormData] = useState({
    flowerType: "",
    colorTheme: "",
    budget: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const phoneNumber = "6289515441332";
    const text = `Halo kak, saya ingin pesan Custom Bouquet:
- Bunga: ${formData.flowerType || "Bebas/Sesuai rekomendasi"}
- Warna: ${formData.colorTheme || "Bebas/Sesuai rekomendasi"}
- Budget: ${formData.budget || "-"}
- Catatan: ${formData.notes || "-"}`;

    const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank");
  };

  return (
    <div className="min-h-screen py-24 md:py-32">
      <div className="container mx-auto px-4 max-w-4xl">
        
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4"
          >
            Buket Kustom
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-stone-500 max-w-2xl mx-auto text-lg"
          >
            Punya ide atau referensi spesifik? Beritahu kami apa yang Anda cari, dan florist ahli kami akan mewujudkannya.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-[2.5rem] p-8 md:p-12"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Flower Type */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-stone-900 mb-3">
                  <Leaf className="w-4 h-4 text-primary" />
                  Pilihan Bunga
                </label>
                <input
                  type="text"
                  placeholder="Cth: Mawar, Peony, Tulip (Boleh dikosongkan)"
                  className="w-full rounded-2xl border-white/60 bg-white/50 backdrop-blur-sm p-4 text-sm focus:border-primary focus:ring-primary focus:bg-white transition-all outline-none border shadow-inner"
                  value={formData.flowerType}
                  onChange={(e) => setFormData({ ...formData, flowerType: e.target.value })}
                />
              </div>

              {/* Color Theme */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-stone-900 mb-3">
                  <Palette className="w-4 h-4 text-primary" />
                  Tema Warna
                </label>
                <input
                  type="text"
                  placeholder="Cth: Pastel Pink, Klasik Merah Putih"
                  className="w-full rounded-2xl border-white/60 bg-white/50 backdrop-blur-sm p-4 text-sm focus:border-primary focus:ring-primary focus:bg-white transition-all outline-none border shadow-inner"
                  value={formData.colorTheme}
                  onChange={(e) => setFormData({ ...formData, colorTheme: e.target.value })}
                />
              </div>
            </div>

            {/* Budget */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-stone-900 mb-3">
                <Wallet className="w-4 h-4 text-primary" />
                Rentang Budget (IDR)
              </label>
              <select
                className="w-full rounded-2xl border-white/60 bg-white/50 backdrop-blur-sm p-4 text-sm focus:border-primary focus:ring-primary focus:bg-white transition-all outline-none border shadow-inner appearance-none"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                required
              >
                <option value="" disabled>Pilih rentang budget Anda</option>
                <option value="150.000 - 300.000">Rp 150.000 - Rp 300.000</option>
                <option value="300.000 - 500.000">Rp 300.000 - Rp 500.000</option>
                <option value="500.000 - 1.000.000">Rp 500.000 - Rp 1.000.000</option>
                <option value="> 1.000.000">Di atas Rp 1.000.000</option>
              </select>
            </div>

            {/* Additional Notes */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-stone-900 mb-3">
                <AlignLeft className="w-4 h-4 text-primary" />
                Detail Tambahan / Gaya Kertas Bungkus
              </label>
              <textarea
                rows={4}
                placeholder="Ceritakan tentang momennya, preferensi warna kertas bungkus, atau pesan di kartu ucapan..."
                className="w-full rounded-2xl border-white/60 bg-white/50 backdrop-blur-sm p-4 text-sm focus:border-primary focus:ring-primary focus:bg-white transition-all outline-none border shadow-inner"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>

            <div className="pt-4 border-t border-stone-100">
              <button
                type="submit"
                className="w-full md:w-auto px-8 py-4 bg-stone-900 text-white rounded-xl font-medium text-lg flex items-center justify-center gap-2 transition-all hover:bg-primary hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20"
              >
                <MessageCircle className="w-5 h-5" />
                Diskusikan via WhatsApp
              </button>
            </div>
          </form>
        </motion.div>
        
      </div>
    </div>
  );
}
