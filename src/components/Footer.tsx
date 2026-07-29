import Link from "next/link";
import { Flower2, MessageCircle, MapPin } from "lucide-react";

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

export function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 py-16 mt-auto">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">

          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2 text-white">
              <Flower2 className="w-8 h-8 text-primary" />
              <span className="font-serif text-2xl font-bold tracking-tight">
                Lila of the Valley
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs text-stone-400">
              Jadikan setiap momen lebih spesial dengan buket bunga buatan tangan premium kami. Menghadirkan kebahagiaan dan keanggunan untuk orang yang Anda cintai.
            </p>
          </div>

          <div>
            <h3 className="text-white font-serif font-semibold text-lg mb-4">Tautan Cepat</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm hover:text-primary transition-colors">Beranda</Link>
              </li>
              <li>
                <Link href="/products" className="text-sm hover:text-primary transition-colors">Koleksi Kami</Link>
              </li>
              <li>
                <Link href="/track" className="text-sm hover:text-primary transition-colors">Lacak Pesanan</Link>
              </li>
              <li>
                <Link href="/about" className="text-sm hover:text-primary transition-colors">Tentang Kami</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-serif font-semibold text-lg mb-4">Kategori</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/products?category=graduation" className="text-sm hover:text-primary transition-colors">Kelulusan</Link>
              </li>
              <li>
                <Link href="/products?category=birthday" className="text-sm hover:text-primary transition-colors">Ulang Tahun</Link>
              </li>
              <li>
                <Link href="/products?category=romantic" className="text-sm hover:text-primary transition-colors">Romantis</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-serif font-semibold text-lg mb-4">Kontak</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <MessageCircle className="w-5 h-5 text-primary shrink-0" />
                <span>+62 895-1544-1332 (Hanya WhatsApp)</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <InstagramIcon className="w-5 h-5 text-primary shrink-0" />
                <a href="https://instagram.com/lilaofvalley" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
                  @lilaofvalley
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>Yogyakarta, Indonesia<br />(Pengiriman tersedia di seluruh kota)</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-stone-800 mt-16 pt-8 text-center text-sm text-stone-500 flex flex-col md:flex-row items-center justify-between">
          <p>&copy; {new Date().getFullYear()} Lila of the Valley. Hak Cipta Dilindungi.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">Kebijakan Privasi</Link>
            <Link href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
