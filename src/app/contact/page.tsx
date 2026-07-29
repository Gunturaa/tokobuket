"use client";

import { motion } from "framer-motion";
import { MessageCircle, MapPin, Mail, Clock } from "lucide-react";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export default function ContactPage() {
  return (
    <div className="min-h-screen py-24 md:py-32">
      <div className="container mx-auto px-4 max-w-5xl">
        
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-4"
          >
            Hubungi Kami
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-stone-500 max-w-2xl mx-auto text-lg"
          >
            Kami akan sangat senang mendengar dari Anda. Hubungi kami untuk pesanan kustom, kolaborasi, atau pertanyaan apapun yang Anda miliki.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            
            <motion.a 
              href="https://wa.me/6289515441332"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-6 rounded-3xl flex items-start gap-4"
            >
              <div className="bg-[#25D366]/10 p-3 rounded-full text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-stone-900 mb-1">WhatsApp</h3>
                <p className="text-stone-500 text-sm mb-2">Cara tercepat menghubungi kami</p>
                <p className="text-stone-900 font-medium">+62 895-1544-1332</p>
              </div>
            </motion.a>

            <motion.a 
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card p-6 rounded-3xl flex items-start gap-4 group"
            >
              <div className="bg-pink-100 p-3 rounded-full text-pink-600 group-hover:bg-gradient-to-tr group-hover:from-yellow-400 group-hover:via-pink-500 group-hover:to-purple-500 group-hover:text-white transition-all">
                <InstagramIcon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-stone-900 mb-1">Instagram</h3>
                <p className="text-stone-500 text-sm mb-2">Lihat karya terbaru kami</p>
                <p className="text-stone-900 font-medium">@blossomandco</p>
              </div>
            </motion.a>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-card p-6 rounded-3xl flex items-start gap-4"
            >
              <div className="bg-stone-100 p-3 rounded-full text-stone-600">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-stone-900 mb-1">Jam Operasional</h3>
                <p className="text-stone-600 text-sm">Senin - Sabtu: 08:00 - 20:00</p>
                <p className="text-stone-600 text-sm">Minggu: 09:00 - 15:00</p>
              </div>
            </motion.div>

          </div>

          {/* Map/Location Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2 glass-card p-6 md:p-10 rounded-[2.5rem] h-full flex flex-col"
          >
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-serif font-bold text-stone-900">Studio Kami</h2>
            </div>
            
            <p className="text-stone-600 mb-6">
              Kami berlokasi di pusat kota Jakarta. Pengiriman tersedia untuk seluruh area kota dan sekitarnya. Untuk mengambil pesanan sendiri (self-pickup), silakan buat janji temu dengan kami melalui WhatsApp.
            </p>

            {/* Placeholder for map - in a real app, use Google Maps iframe */}
            <div className="flex-1 w-full bg-stone-100 rounded-2xl overflow-hidden relative min-h-[300px]">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-stone-400">
                <MapPin className="w-12 h-12 mb-2 opacity-50" />
                <span>Jakarta, Indonesia</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
