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
  const popularProducts = products.filter(p => p.isPopular);
  const featuredProducts = (popularProducts.length > 0 ? popularProducts : products).slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://plus.unsplash.com/premium_photo-1703369351133-ae15759133fd?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Hero Floral Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-8 h-full flex flex-col justify-center items-start pt-20">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-2xl space-y-8 text-left"
          >
            <motion.div variants={fadeInUp} className="flex items-center gap-3">
              <span className="w-12 h-[1px] bg-white/60"></span>
              <span className="text-white/90 text-sm font-medium tracking-[0.3em] uppercase">
                Florist Premium
              </span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white leading-[1.1]">
              Kisah Anda,<br/>
              <span className="text-primary-light italic font-light">Mekar Bersama Kami.</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-white/80 max-w-xl font-light leading-relaxed">
              Karya seni bunga artisan yang dirangkai dengan cinta. Sempurna untuk kelulusan, ulang tahun, dan setiap hari istimewa Anda.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="pt-6 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium tracking-wide text-stone-900 bg-white rounded-full hover:bg-primary-light hover:text-stone-900 transition-all duration-500 shadow-xl hover:-translate-y-1"
              >
                Eksplorasi Koleksi
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium tracking-wide text-white bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-all duration-500"
              >
                Hubungi Kami
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              { icon: Heart, title: "Dirangkai dengan Cinta", desc: "Setiap kelopak dan daun dipilih secara teliti untuk menghasilkan harmoni warna yang sempurna." },
              { icon: Star, title: "Kualitas Premium", desc: "Bunga segar grade A yang diimpor dan dirawat di suhu ideal agar mekar lebih lama." },
              { icon: Award, title: "Jaminan Kepuasan", desc: "Garansi penggantian jika bunga layu sebelum tiba. Kebahagiaan Anda adalah prioritas kami." },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.2, duration: 0.7, ease: "easeOut" }}
                className="group flex flex-col items-center text-center p-10 rounded-[2.5rem] bg-white border border-stone-100 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-stone-50 group-hover:bg-primary-light/30 rounded-2xl flex items-center justify-center text-stone-600 group-hover:text-primary-dark transition-all duration-500 mb-6 rotate-3 group-hover:rotate-0">
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="font-serif font-bold text-xl mb-3 text-stone-900">{feature.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{feature.desc}</p>
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-auto md:h-[600px]">
            {/* Main Category */}
            <Link href="/products?category=graduation" className="group relative h-[400px] md:h-full rounded-[2.5rem] overflow-hidden">
              {products.find(p => p.category === 'graduation' && p.imageUrl)?.imageUrl ? (
                <Image src={products.find(p => p.category === 'graduation' && p.imageUrl)!.imageUrl!} alt="Kelulusan" fill className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" />
              ) : (
                <div className="absolute inset-0 bg-stone-100 flex items-center justify-center"><ImageIcon className="w-12 h-12 text-stone-300" /></div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
              <div className="absolute inset-0 flex flex-col justify-end p-10">
                <span className="text-primary-light text-sm font-medium tracking-widest uppercase mb-2 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">Momen Spesial</span>
                <h3 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">Kelulusan</h3>
                <div className="flex items-center text-white/90 group-hover:text-white transition-colors">
                  <span className="text-sm font-medium mr-2">Eksplorasi</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-500" />
                </div>
              </div>
            </Link>

            {/* Sub Categories */}
            <div className="flex flex-col gap-6 h-full">
              <Link href="/products?category=birthday" className="group relative flex-1 rounded-[2.5rem] overflow-hidden min-h-[250px]">
                {products.find(p => p.category === 'birthday' && p.imageUrl)?.imageUrl ? (
                  <Image src={products.find(p => p.category === 'birthday' && p.imageUrl)!.imageUrl!} alt="Ulang Tahun" fill className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" />
                ) : (
                  <div className="absolute inset-0 bg-stone-100 flex items-center justify-center"><ImageIcon className="w-12 h-12 text-stone-300" /></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <h3 className="text-3xl font-serif font-bold text-white mb-2">Ulang Tahun</h3>
                  <div className="flex items-center text-white/90 group-hover:text-white transition-colors">
                    <span className="text-sm font-medium mr-2">Eksplorasi</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-500" />
                  </div>
                </div>
              </Link>

              <Link href="/products?category=romantic" className="group relative flex-1 rounded-[2.5rem] overflow-hidden min-h-[250px]">
                {products.find(p => p.category === 'romantic' && p.imageUrl)?.imageUrl ? (
                  <Image src={products.find(p => p.category === 'romantic' && p.imageUrl)!.imageUrl!} alt="Romantis" fill className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" />
                ) : (
                  <div className="absolute inset-0 bg-stone-100 flex items-center justify-center"><ImageIcon className="w-12 h-12 text-stone-300" /></div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <h3 className="text-3xl font-serif font-bold text-white mb-2">Romantis</h3>
                  <div className="flex items-center text-white/90 group-hover:text-white transition-colors">
                    <span className="text-sm font-medium mr-2">Eksplorasi</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-500" />
                  </div>
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
                <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="currentColor" strokeWidth="2" fill="none" />
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
