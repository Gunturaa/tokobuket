"use client";

import { useTransition } from "react";
import { updateOrderStatus, deleteOrder } from "./actions";
import { Check, Clock, Package, Trash2, XCircle } from "lucide-react";

export function StatusSelector({ orderId, currentStatus }: { orderId: string, currentStatus: string }) {
  const [isPending, startTransition] = useTransition();

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    startTransition(() => {
      updateOrderStatus(orderId, newStatus);
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'processing': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-stone-100 text-stone-700 border-stone-200';
    }
  };

  return (
    <select
      value={currentStatus}
      onChange={handleStatusChange}
      disabled={isPending}
      className={`text-sm rounded-full px-3 py-1 border font-medium outline-none cursor-pointer disabled:opacity-50 transition-colors ${getStatusColor(currentStatus)}`}
    >
      <option value="pending">Menunggu</option>
      <option value="processing">Diproses</option>
      <option value="completed">Selesai</option>
      <option value="cancelled">Dibatalkan</option>
    </select>
  );
}

export function DeleteOrderButton({ orderId }: { orderId: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm("Apakah Anda yakin ingin menghapus pesanan ini?")) {
      startTransition(() => {
        deleteOrder(orderId);
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="p-2 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
      title="Hapus Pesanan"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
