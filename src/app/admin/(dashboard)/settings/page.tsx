import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Save, Store } from "lucide-react";

export default async function AdminSettingsPage() {
  const supabase = await createClient();
  
  const { data: settings } = await supabase
    .from("settings")
    .select("*")
    .single();

  async function saveSettings(formData: FormData) {
    "use server";
    
    const supabase = await createClient();
    
    const store_name = formData.get("store_name") as string;
    const whatsapp_number = formData.get("whatsapp_number") as string;
    const is_open = formData.get("is_open") === "on";

    const { error } = await supabase
      .from("settings")
      .update({ store_name, whatsapp_number, is_open })
      .eq("id", settings?.id);

    if (error) {
      console.error(error);
      throw new Error("Gagal menyimpan pengaturan");
    }

    revalidatePath("/", "layout");
    redirect("/admin");
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-3xl font-serif font-bold text-stone-900">Pengaturan Toko</h1>
        <p className="text-stone-500 mt-1">Kelola informasi utama dan kontak bisnis Anda.</p>
      </div>

      <div className="bg-white rounded-[2.5rem] p-8 md:p-10 border border-stone-100 shadow-sm">
        <form action={saveSettings} className="space-y-6">
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-stone-900 mb-2">Nama Toko</label>
              <input
                type="text"
                name="store_name"
                defaultValue={settings?.store_name || "Toko Buket Bunga"}
                className="w-full rounded-2xl border-stone-200 bg-stone-50 p-4 text-sm focus:border-primary focus:ring-primary transition-all outline-none border"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-900 mb-2">Nomor WhatsApp Admin</label>
              <input
                type="text"
                name="whatsapp_number"
                defaultValue={settings?.whatsapp_number || "6289515441332"}
                className="w-full rounded-2xl border-stone-200 bg-stone-50 p-4 text-sm focus:border-primary focus:ring-primary transition-all outline-none border"
                placeholder="Contoh: 628123456789"
                required
              />
              <p className="text-xs text-stone-500 mt-2">Pastikan nomor diawali dengan 62 (Kode Negara Indonesia) tanpa tanda + atau spasi.</p>
            </div>

            <div className="pt-4">
              <label className="flex items-center gap-3 p-4 rounded-2xl border border-stone-200 bg-stone-50 cursor-pointer">
                <input
                  type="checkbox"
                  name="is_open"
                  defaultChecked={settings?.is_open ?? true}
                  className="w-5 h-5 rounded text-primary focus:ring-primary"
                />
                <div>
                  <span className="block text-sm font-semibold text-stone-900">Toko Sedang Buka</span>
                  <span className="block text-xs text-stone-500">Hapus centang jika Anda sedang libur menerima pesanan.</span>
                </div>
              </label>
            </div>
          </div>

          <div className="pt-6 border-t border-stone-100 flex justify-end">
            <button
              type="submit"
              className="px-8 py-4 bg-stone-900 text-white rounded-xl font-medium text-lg flex items-center gap-2 transition-all hover:bg-primary hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20"
            >
              <Save className="w-5 h-5" />
              Simpan Pengaturan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
