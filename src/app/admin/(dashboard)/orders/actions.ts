"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateOrderStatus(orderId: string, newStatus: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("orders")
    .update({ status: newStatus })
    .eq("id", orderId);

  if (error) {
    console.error("Error updating order status:", error);
    throw new Error("Gagal memperbarui status pesanan.");
  }

  revalidatePath("/admin/orders");
}

export async function deleteOrder(orderId: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("orders")
    .delete()
    .eq("id", orderId);

  if (error) {
    console.error("Error deleting order:", error);
    throw new Error("Gagal menghapus pesanan.");
  }

  revalidatePath("/admin/orders");
}
