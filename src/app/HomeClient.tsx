"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight, Star, Heart, Award, Sparkles, Image as ImageIcon } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import Image from "next/image";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function HomeClient({ products }: { products: any[] }) {
  const featuredProducts = products.filter(p => p.isPopular).slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=2000&auto=format&fit=crop"
            alt="Hero Floral Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl mx-auto space-y-6"
          >
            <motion.span variants={fadeInUp} className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-sm font-medium tracking-wider uppercase mb-2">
              Florist Premium
            </motion.span>
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight">
              Jadikan Setiap Momen <span className="text-primary-light italic">Spesial</span>
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-stone-200 max-w-xl mx-auto font-light">
              Buket mewah buatan tangan yang dikirim dengan cinta. Sempurna untuk kelulusan, ulang tahun, dan hari jadi.
            </motion.p>
            <motion.div variants={fadeInUp} className="pt-8">
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-stone-900 bg-white rounded-full hover:bg-primary-light hover:text-stone-900 transition-all duration-300 shadow-xl hover:shadow-primary/20 hover:-translate-y-1"
              >
                Jelajahi Koleksi
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Heart, title: "Dibuat dengan Cinta", desc: "Setiap rangkaian buket dibuat dengan hati-hati oleh florist ahli kami." },
              { icon: Star, title: "Kualitas Premium", desc: "Kami hanya menggunakan bunga segar dan berkualitas paling tinggi." },
              { icon: Award, title: "Jaminan Kepuasan", desc: "Kebahagiaan Anda adalah prioritas kami. 100% kepuasan dijamin." },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex flex-col items-center text-center p-8 rounded-3xl glass-card"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-semibold text-lg mb-2 text-stone-900">{feature.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4">
              Buket Pilihan
            </h2>
            <p className="text-stone-500 max-w-xl mx-auto">
              Temukan rangkaian yang paling disukai, sempurna untuk membuat setiap momen tak terlupakan.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-stone-600 border border-stone-300 rounded-full hover:bg-stone-100 transition-colors"
            >
              Lihat Semua Produk
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4">
                Belanja Berdasarkan Momen
              </h2>
              <p className="text-stone-500 max-w-md">
                Temukan rangkaian buket yang disesuaikan sempurna untuk setiap momen spesial Anda.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/products?category=graduation" className="group relative h-[300px] rounded-2xl overflow-hidden">
              {products.find(p => p.category === 'graduation' && p.imageUrl)?.imageUrl ? (
                <Image src={products.find(p => p.category === 'graduation' && p.imageUrl)!.imageUrl!} alt="Kelulusan" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              ) : (
                <div className="absolute inset-0 bg-stone-300 flex items-center justify-center"><ImageIcon className="w-12 h-12 text-stone-400" /></div>
              )}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6">
                <h3 className="text-3xl font-serif font-bold mb-2">Kelulusan</h3>
                <span className="text-sm border-b border-white pb-1 group-hover:text-primary-light group-hover:border-primary-light transition-colors">Belanja Sekarang</span>
              </div>
            </Link>
            
            <div className="grid grid-cols-2 gap-6">
              <Link href="/products?category=birthday" className="group relative h-[300px] rounded-2xl overflow-hidden">
                {products.find(p => p.category === 'birthday' && p.imageUrl)?.imageUrl ? (
                  <Image src={products.find(p => p.category === 'birthday' && p.imageUrl)!.imageUrl!} alt="Ulang Tahun" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <div className="absolute inset-0 bg-stone-300 flex items-center justify-center"><ImageIcon className="w-12 h-12 text-stone-400" /></div>
                )}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
                  <h3 className="text-xl font-serif font-bold mb-1">Ulang Tahun</h3>
                </div>
              </Link>
              
              <Link href="/products?category=romantic" className="group relative h-[300px] rounded-2xl overflow-hidden">
                {products.find(p => p.category === 'romantic' && p.imageUrl)?.imageUrl ? (
                  <Image src={products.find(p => p.category === 'romantic' && p.imageUrl)!.imageUrl!} alt="Romantis" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <div className="absolute inset-0 bg-stone-300 flex items-center justify-center"><ImageIcon className="w-12 h-12 text-stone-400" /></div>
                )}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
                  <h3 className="text-xl font-serif font-bold mb-1">Romantis</h3>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 relative overflow-hidden m-4 rounded-[3rem] glass shadow-2xl">
        <div className="absolute inset-0 bg-primary/90"></div>
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="currentColor" strokeWidth="2" fill="none"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pattern)" />
          </svg>
        </div>
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <Sparkles className="w-12 h-12 mx-auto mb-6 opacity-80" />
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Sudah Memesan?</h2>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 font-light">
            Cek status pesanan Anda dengan mudah menggunakan Order ID yang diberikan saat pemesanan.
          </p>
          <Link
            href="/track"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-primary bg-white rounded-full hover:bg-stone-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            Lacak Pesanan
          </Link>
        </div>
      </section>
    </>
  );
}
