import Link from "next/link";
import { registerUser } from "../(auth)/actions";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Daftar Akun | Lila of the Valley",
};

export default function RegisterPage({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-sm border border-stone-200">
        <div>
          <Link href="/" className="inline-flex items-center text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali ke Beranda
          </Link>
          <h2 className="text-center text-3xl font-serif font-bold text-stone-900">
            Buat Akun Baru
          </h2>
          <p className="mt-2 text-center text-sm text-stone-600">
            Sudah punya akun?{" "}
            <Link href="/login" className="font-medium text-primary hover:text-primary/80 transition-colors">
              Masuk di sini
            </Link>
          </p>
        </div>
        
        <form className="mt-8 space-y-6" action={registerUser}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">Nama Lengkap</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-stone-300 placeholder-stone-500 text-stone-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm bg-stone-50"
                placeholder="Nama Lengkap"
              />
            </div>
            <div>
              <label htmlFor="phone" className="sr-only">Nomor HP / WhatsApp</label>
              <input
                id="phone"
                name="phone"
                type="text"
                required
                className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-stone-300 placeholder-stone-500 text-stone-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm bg-stone-50"
                placeholder="Nomor HP / WhatsApp (contoh: 0812...)"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-stone-300 placeholder-stone-500 text-stone-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm bg-stone-50"
                placeholder="Alamat Email"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-xl relative block w-full px-4 py-3 border border-stone-300 placeholder-stone-500 text-stone-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm bg-stone-50"
                placeholder="Password (minimal 6 karakter)"
                minLength={6}
              />
            </div>
          </div>

          {searchParams?.message && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg text-center font-medium">
              {searchParams.message}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-stone-900 hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-stone-900 transition-colors"
            >
              Daftar Sekarang
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
