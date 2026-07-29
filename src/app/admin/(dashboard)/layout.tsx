import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Settings, 
  LogOut,
  Flower2
} from "lucide-react";
import { logout } from "./actions";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-stone-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-stone-200 flex flex-col hidden md:flex fixed h-full z-10">
        <div className="p-6">
          <Link href="/admin" className="flex items-center gap-2 text-stone-900">
            <Flower2 className="w-6 h-6 text-primary" />
            <span className="font-serif text-xl font-bold tracking-tight">Admin Panel</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-all">
            <LayoutDashboard className="w-5 h-5" />
            Overview
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-all">
            <Package className="w-5 h-5" />
            Produk
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl text-stone-400 cursor-not-allowed transition-all">
            <ShoppingCart className="w-5 h-5" />
            Pesanan (Segera)
          </Link>
          <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl text-stone-400 cursor-not-allowed transition-all">
            <Settings className="w-5 h-5" />
            Pengaturan (Segera)
          </Link>
        </nav>

        <div className="p-4 border-t border-stone-200">
          <div className="mb-4 px-4">
            <p className="text-xs text-stone-500 font-medium truncate">{user.email}</p>
          </div>
          <form action={logout}>
            <button className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl text-red-600 hover:bg-red-50 transition-all">
              <LogOut className="w-5 h-5" />
              Keluar
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 p-8">
        {children}
      </main>
    </div>
  );
}
