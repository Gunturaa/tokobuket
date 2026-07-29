"use server";

import { createClient } from "@/utils/supabase/server";

export async function getOrderById(orderId: string) {
  const supabase = await createClient();

  const { data: order, error } = await supabase
    .from("orders")
    .select(`
      *,
      products (
        name,
        image_url
      )
    `)
    .eq("id", orderId)
    .single();

  if (error || !order) {
    return null;
  }

  return order;
}
