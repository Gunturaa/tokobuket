"use client";

import { updateProduct } from "../../actions";
import { Save, Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function EditProductForm({ product }: { product: any }) {
  const [imagePreview, setImagePreview] = useState<string | null>(product.image_url);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  const updateProductWithId = updateProduct.bind(null, product.id);

  return (
    <form action={updateProductWithId} className="space-y-8">
      <input type="hidden" name="current_image_url" value={product.image_url || ""} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-stone-900 mb-2">Nama Produk</label>
            <input
              type="text"
              name="name"
              required
              defaultValue={product.name}
              className="w-full rounded-2xl border-stone-200 bg-stone-50 p-4 text-sm focus:border-primary focus:ring-primary transition-all outline-none border"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-900 mb-2">Harga (Rp)</label>
            <input
              type="number"
              name="price"
              required
              min="0"
              defaultValue={product.price}
              className="w-full rounded-2xl border-stone-200 bg-stone-50 p-4 text-sm focus:border-primary focus:ring-primary transition-all outline-none border"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-900 mb-2">Kategori</label>
            <select
              name="category"
              required
              defaultValue={product.category}
              className="w-full rounded-2xl border-stone-200 bg-stone-50 p-4 text-sm focus:border-primary focus:ring-primary transition-all outline-none border appearance-none"
            >
              <option value="graduation">Kelulusan</option>
              <option value="birthday">Ulang Tahun</option>
              <option value="romantic">Romantis</option>
              <option value="ready">Ready Stock</option>
              <option value="other">Lainnya</option>
            </select>
          </div>

          <div className="space-y-3 pt-2">
            <label className="flex items-center gap-3 p-4 rounded-2xl border border-stone-200 bg-stone-50 cursor-pointer">
              <input
                type="checkbox"
                name="is_popular"
                defaultChecked={product.is_popular}
                className="w-5 h-5 rounded text-primary focus:ring-primary"
              />
              <div>
                <span className="block text-sm font-semibold text-stone-900">Tandai sebagai Terlaris</span>
                <span className="block text-xs text-stone-500">Akan ditampilkan di halaman utama</span>
              </div>
            </label>
            
            <label className="flex items-center gap-3 p-4 rounded-2xl border border-stone-200 bg-stone-50 cursor-pointer">
              <input
                type="checkbox"
                name="is_available"
                defaultChecked={product.is_available}
                className="w-5 h-5 rounded text-green-600 focus:ring-green-600"
              />
              <div>
                <span className="block text-sm font-semibold text-stone-900">Stok Tersedia</span>
                <span className="block text-xs text-stone-500">Hapus centang jika produk sedang habis</span>
              </div>
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-stone-900 mb-2">Foto Produk</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-stone-200 border-dashed rounded-2xl bg-stone-50 hover:bg-stone-100 transition-colors cursor-pointer relative overflow-hidden group min-h-[160px]">
              
              {imagePreview ? (
                <Image 
                  src={imagePreview} 
                  alt="Preview" 
                  fill 
                  className="object-cover"
                />
              ) : (
                <div className="space-y-1 text-center">
                  <ImageIcon className="mx-auto h-12 w-12 text-stone-400 group-hover:text-primary transition-colors" />
                  <div className="flex text-sm text-stone-600 justify-center">
                    <span className="relative rounded-md font-medium text-primary hover:text-primary-dark">
                      <span>Upload file baru</span>
                    </span>
                  </div>
                  <p className="text-xs text-stone-500">PNG, JPG up to 5MB</p>
                </div>
              )}
              
              <input 
                name="image" 
                type="file" 
                accept="image/*" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                onChange={handleImageChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-900 mb-2">Deskripsi Produk</label>
            <textarea
              name="description"
              rows={5}
              defaultValue={product.description}
              className="w-full rounded-2xl border-stone-200 bg-stone-50 p-4 text-sm focus:border-primary focus:ring-primary transition-all outline-none border"
              placeholder="Tulis deskripsi detail produk di sini..."
            />
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-stone-100 flex justify-end">
        <button
          type="submit"
          className="px-8 py-4 bg-stone-900 text-white rounded-xl font-medium text-lg flex items-center gap-2 transition-all hover:bg-primary hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20"
        >
          <Save className="w-5 h-5" />
          Perbarui Produk
        </button>
      </div>
    </form>
  );
}
