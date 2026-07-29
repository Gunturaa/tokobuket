import { login } from "./actions";
import { Flower2, Lock } from "lucide-react";
import Link from "next/link";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message: string }>;
}) {
  const resolvedParams = await searchParams;
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 glass-card p-10 rounded-[2.5rem]">
        
        <div className="flex flex-col items-center justify-center text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-stone-900 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Flower2 className="w-8 h-8 text-primary" />
              <span className="font-serif text-2xl font-bold tracking-tight text-stone-900">
                Lila of the Valley
              </span>
            </div>
          </Link>
          <h2 className="text-2xl font-bold text-stone-900">Admin Dashboard</h2>
          <p className="mt-2 text-sm text-stone-500">
            Masuk untuk mengelola katalog produk dan pesanan.
          </p>
        </div>

        <form className="mt-8 space-y-6" action={login}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full rounded-2xl border-white/60 bg-white/50 backdrop-blur-sm p-4 text-sm focus:border-primary focus:ring-primary focus:bg-white transition-all outline-none border shadow-inner"
                placeholder="admin@lilaofvalley.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full rounded-2xl border-white/60 bg-white/50 backdrop-blur-sm p-4 text-sm focus:border-primary focus:ring-primary focus:bg-white transition-all outline-none border shadow-inner"
                placeholder="••••••••"
              />
            </div>
          </div>

          {resolvedParams?.message && (
            <p className="text-sm text-red-600 bg-red-50 p-3 rounded-xl border border-red-100 text-center">
              {resolvedParams.message}
            </p>
          )}

          <div>
            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent rounded-2xl shadow-sm text-sm font-medium text-white bg-stone-900 hover:bg-primary transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/30"
            >
              <Lock className="w-4 h-4" />
              Masuk ke Dashboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
