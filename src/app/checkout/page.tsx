import { createClient } from "@/utils/supabase/server";
import CheckoutClient from "./CheckoutClient";

export const metadata = {
  title: "Checkout | Lila of the Valley",
};

export default async function CheckoutPage() {
  const supabase = await createClient();
  const { data: settings } = await supabase.from("settings").select("*").single();

  return <CheckoutClient settings={settings} />;
}
