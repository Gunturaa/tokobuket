"use server";

import { createClient } from "@/utils/supabase/server";

export async function getOrderById(orderIdInput: string) {
  const supabase = await createClient();
  const cleanId = orderIdInput.replace('#', '').trim().toLowerCase();

  // Since Supabase ID is a UUID (36 chars) and user might only have 8 chars,
  // we fetch recent orders and find the match in memory to avoid postgrest casting issues.
  // Alternatively, if the input is a full UUID, we can query it directly.
  
  if (cleanId.length === 36) {
    const { data: order } = await supabase
      .from("orders")
      .select("*")
      .eq("id", cleanId)
      .single();
      
    return order || null;
  } else {
    // Partial ID search (fetch recent 1000 orders to find match)
    const { data: orders } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1000);
      
    if (!orders) return null;
    
    const matchedOrder = orders.find(o => o.id.toLowerCase().startsWith(cleanId));
    return matchedOrder || null;
  }
}
