"use server";

import { createClient } from "@/utils/supabase/server";

export async function createCheckoutOrder(data: {
  customer_name: string;
  customer_phone: string;
  delivery_method: string;
  delivery_time: string;
  items: any[];
  total_price: number;
  custom_message?: string;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: order, error } = await supabase
    .from("orders")
    .insert({
      user_id: user?.id || null, // null if guest
      customer_name: data.customer_name,
      customer_phone: data.customer_phone,
      delivery_method: data.delivery_method,
      delivery_time: data.delivery_time,
      custom_message: data.custom_message || null,
      items: data.items,
      total_price: data.total_price,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating order:", error);
    throw new Error("Gagal membuat pesanan");
  }

  return order;
}
