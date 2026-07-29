"use client";

import { motion } from "framer-motion";
import { Heart, Star, Sparkles, Image as ImageIcon } from "lucide-react";

// Placeholder component for images
const ImagePlaceholder = ({ text, className }: { text: string; className?: string }) => (
  <div className={`flex flex-col items-center justify-center bg-gradient-to-tr from-pink-100 via-rose-50 to-amber-50 animate-pulse-gradient text-pink-300 border border-white/50 w-full h-full ${className || ""}`}>
    <ImageIcon className="w-16 h-16 mb-4 opacity-60 drop-shadow-sm" />
    <span className="font-semibold tracking-wider uppercase text-pink-400/80">{text}</span>
  </div>
);

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="container mx-auto px-4 max-w-5xl relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif font-bold text-stone-900 mb-6"
          >
            Cerita Kami
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-stone-600 max-w-2xl mx-auto"
          >
            Merangkai momen kebahagiaan melalui bahasa universal sebuah bunga.
          </motion.p>
        </div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-5">
          <Sparkles className="w-96 h-96" />
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-3xl overflow-hidden"
            >
              <ImagePlaceholder text="Gambar Florist / Studio" />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-serif font-bold text-stone-900">Lebih dari sekadar florist</h2>
              <p className="text-stone-600 leading-relaxed text-lg">
                Didirikan dengan penuh gairah akan seni merangkai bunga, Blossom & Co. percaya bahwa setiap buket menceritakan sebuah kisah yang unik. Kami tidak hanya sekadar menyusun bunga; kami merangkai emosi, kenangan, dan pesan cinta yang mendalam.
              </p>
              <p className="text-stone-600 leading-relaxed text-lg">
                Perjalanan kami dimulai di sebuah studio kecil di Jakarta, didorong oleh keinginan untuk menghadirkan rangkaian bunga premium yang estetik untuk merayakan momen-momen paling berharga dalam hidup Anda.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6 order-2 md:order-1 glass-card p-8 md:p-12 rounded-[2.5rem]"
            >
              <h2 className="text-3xl font-serif font-bold text-stone-900">Janji Kami</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="mt-1 bg-primary/10 p-2 rounded-full text-primary shrink-0">
                    <Heart className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900 text-lg">Dibuat dengan Cinta</h3>
                    <p className="text-stone-600">Setiap kelopak bunga diperiksa secara mendetail, dan setiap rangkaian buket dibuat dengan ketelitian dan rasa cinta yang tinggi.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 bg-primary/10 p-2 rounded-full text-primary shrink-0">
                    <Star className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900 text-lg">Kualitas Premium</h3>
                    <p className="text-stone-600">Kami bekerja sama dengan petani bunga lokal dan internasional terbaik untuk memastikan buket Anda tetap segar lebih lama.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-square rounded-3xl overflow-hidden order-1 md:order-2"
            >
              <ImagePlaceholder text="Gambar Detail Bunga" />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
