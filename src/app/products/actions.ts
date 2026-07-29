"use server";

import { createClient } from "@/utils/supabase/server";

export async function createOrder(data: {
  product_id: string;
  customer_name: string;
  customer_phone: string;
  custom_message: string;
  total_price: number;
}) {
  const supabase = await createClient();
  
  const { data: order, error } = await supabase
    .from("orders")
    .insert([data])
    .select()
    .single();

  if (error) {
    console.error("Error creating order:", error);
    throw new Error("Gagal membuat pesanan.");
  }

  return order;
}
