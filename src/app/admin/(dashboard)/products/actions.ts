"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export async function createProduct(formData: FormData) {
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const category = formData.get("category") as string;
  const is_popular = formData.get("is_popular") === "on";
  const image = formData.get("image") as File;

  let image_url = "";

  // Handle Image Upload if exists
  if (image && image.size > 0) {
    const fileExt = image.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, image);

    if (uploadError) {
      console.error("Upload error:", uploadError);
      throw new Error("Gagal mengupload gambar.");
    }

    const { data } = supabase.storage.from('product-images').getPublicUrl(filePath);
    image_url = data.publicUrl;
  }

  const { error } = await supabase.from("products").insert({
    name,
    description,
    price,
    category,
    is_popular,
    image_url,
  });

  if (error) {
    console.error("Insert error:", error);
    throw new Error("Gagal menyimpan produk.");
  }

  revalidatePath("/admin/products");
  revalidatePath("/");
  revalidatePath("/products");
  redirect("/admin/products");
}

export async function deleteProduct(id: string, imageUrl: string | null) {
  const supabase = await createClient();

  // Delete image from storage if exists
  if (imageUrl && imageUrl.includes('product-images')) {
    const path = imageUrl.split('product-images/')[1];
    if (path) {
      await supabase.storage.from('product-images').remove([path]);
    }
  }

  const { error } = await supabase.from("products").delete().eq("id", id);
  
  if (error) {
    throw new Error("Gagal menghapus produk.");
  }

  revalidatePath("/admin/products");
  revalidatePath("/");
  revalidatePath("/products");
}

export async function updateProduct(id: string, formData: FormData) {
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const category = formData.get("category") as string;
  const is_popular = formData.get("is_popular") === "on";
  const is_available = formData.get("is_available") === "on";
  const image = formData.get("image") as File;
  const currentImageUrl = formData.get("current_image_url") as string;

  let image_url = currentImageUrl;

  // Handle Image Upload if new image exists
  if (image && image.size > 0) {
    const fileExt = image.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, image);

    if (uploadError) {
      console.error("Upload error:", uploadError);
      throw new Error("Gagal mengupload gambar.");
    }

    const { data } = supabase.storage.from('product-images').getPublicUrl(filePath);
    image_url = data.publicUrl;

    // Delete old image if it existed
    if (currentImageUrl && currentImageUrl.includes('product-images')) {
      const oldPath = currentImageUrl.split('product-images/')[1];
      if (oldPath) {
        await supabase.storage.from('product-images').remove([oldPath]);
      }
    }
  }

  const { error } = await supabase.from("products").update({
    name,
    description,
    price,
    category,
    is_popular,
    is_available,
    image_url,
  }).eq("id", id);

  if (error) {
    console.error("Update error:", error);
    throw new Error("Gagal memperbarui produk.");
  }

  revalidatePath("/admin/products");
  revalidatePath("/");
  revalidatePath("/products");
  redirect("/admin/products");
}
