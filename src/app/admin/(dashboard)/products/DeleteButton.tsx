"use client";

import { Trash2 } from "lucide-react";
import { useTransition } from "react";

export function DeleteButton({ action }: { action: () => void }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm("Yakin ingin menghapus produk ini?")) {
      startTransition(() => {
        action();
      });
    }
  };

  return (
    <button 
      type="button" 
      onClick={handleDelete}
      disabled={isPending}
      className={`p-2 rounded-lg transition-colors ${
        isPending ? 'text-stone-300 cursor-not-allowed' : 'text-stone-400 hover:text-red-600 hover:bg-red-50'
      }`}
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
