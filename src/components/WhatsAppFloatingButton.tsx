"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export function WhatsAppFloatingButton() {
  const phoneNumber = "6289515441332"; // Format: country code without + and phone number
  const defaultMessage = encodeURIComponent("Halo, saya ingin bertanya tentang Blossom & Co.!");
  const waUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <motion.a
      href={waUrl}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 15 }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 ease-in-out font-medium text-sm">
        Chat with us
      </span>
    </motion.a>
  );
}
