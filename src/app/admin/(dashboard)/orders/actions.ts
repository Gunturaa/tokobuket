"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

// Helper to create admin client with service role key (bypasses RLS)
const getAdminClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
};

export async function updateOrderStatus(orderId: string, newStatus: string) {
  const supabase = getAdminClient();

  const { error } = await supabase
    .from("orders")
    .update({ status: newStatus })
    .eq("id", orderId);

  if (error) {
    console.error("Error updating order status:", error);
    throw new Error("Gagal memperbarui status pesanan.");
  }

  revalidatePath("/admin", "layout");
}

export async function deleteOrder(orderId: string) {
  const supabase = getAdminClient();

  const { error } = await supabase
    .from("orders")
    .delete()
    .eq("id", orderId);

  if (error) {
    console.error("Error deleting order:", error);
    throw new Error("Gagal menghapus pesanan.");
  }

  revalidatePath("/admin", "layout");
}
