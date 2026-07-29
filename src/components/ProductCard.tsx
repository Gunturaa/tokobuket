import Link from "next/link";
import Image from "next/image";
import { Product } from "@/data/products";
import { ShoppingBag, Image as ImageIcon } from "lucide-react";
import { formatCurrency } from "@/lib/format";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="group block glass-card rounded-3xl p-4 h-full flex flex-col">
      <div className="relative overflow-hidden rounded-2xl bg-stone-100 aspect-[4/5] mb-5 flex items-center justify-center shadow-inner">
        {product.isPopular && (
          <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-4 py-1.5 text-xs font-bold rounded-full shadow-md text-stone-900 tracking-wide uppercase">
            Terlaris
          </div>
        )}
        
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-tr from-pink-100 via-rose-50 to-amber-50 animate-pulse-gradient text-pink-300 flex flex-col items-center justify-center">
            <ImageIcon className="w-12 h-12 mb-3 opacity-60 drop-shadow-sm" />
            <span className="text-xs font-semibold tracking-wider uppercase text-pink-400/80">Gambar Produk</span>
          </div>
        )}

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-end p-4 opacity-0 group-hover:opacity-100">
          <button className="w-full bg-white text-stone-900 py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-colors">
            <ShoppingBag className="w-4 h-4" />
            Lihat Detail
          </button>
        </div>
      </div>
      <div>
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-serif font-medium text-lg text-stone-900 line-clamp-1">
            {product.name}
          </h3>
          <p className="font-semibold text-primary shrink-0">
            {formatCurrency(product.price)}
          </p>
        </div>
        <p className="text-sm text-stone-500 capitalize">
          {product.category === "graduation" ? "Kelulusan" :
           product.category === "birthday" ? "Ulang Tahun" :
           product.category === "romantic" ? "Romantis" :
           product.category === "ready" ? "Ready Stock" : "Lainnya"}
        </p>
      </div>
    </Link>
  );
}
