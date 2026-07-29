export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "graduation" | "birthday" | "romantic" | "ready" | "other";
  imageUrl: string;
  isPopular?: boolean;
}

export const products: Product[] = [
  {
    id: "grad-01",
    name: "Buket Kelulusan Klasik",
    description: "Rayakan kelulusan mereka dengan paduan menawan dari bunga matahari segar, mawar putih, dan baby's breath. Termasuk boneka wisuda gratis dan kartu ucapan kustom.",
    price: 350000,
    category: "graduation",
    imageUrl: "",
    isPopular: true,
  },
  {
    id: "bday-01",
    name: "Pastel Pink Ulang Tahun",
    description: "Jadikan hari ulang tahunnya tak terlupakan dengan susunan bunga peony, tulip, dan anyelir merah muda premium yang dibungkus kertas gaya Korea mewah.",
    price: 450000,
    category: "birthday",
    imageUrl: "",
    isPopular: true,
  },
  {
    id: "rom-01",
    name: "Romansa Merah Abadi",
    description: "Simbol cinta sejati. Buket klasik berisi 24 mawar merah bertangkai panjang premium yang dipadukan dengan daun eucalyptus dalam balutan hitam elegan.",
    price: 650000,
    category: "romantic",
    imageUrl: "",
  },
  {
    id: "snack-01",
    name: "Buket Snack Manis",
    description: "Buket seru dan lezat yang terbuat dari cokelat premium, camilan manis, dan bunga kering yang cantik. Cocok untuk si pencinta makanan manis!",
    price: 280000,
    category: "other",
    imageUrl: "",
  },
  {
    id: "money-01",
    name: "Buket Uang Kemakmuran",
    description: "Perpaduan indah mawar segar dan lembaran uang kertas yang dilipat artistik. Hadiah elegan dan praktis untuk ulang tahun, hari jadi, atau grand opening. (Catatan: harga belum termasuk nominal uang)",
    price: 300000,
    category: "other",
    imageUrl: "",
  },
  {
    id: "ready-01",
    name: "Buket Ready Stock Eksklusif",
    description: "Buket yang sudah dirangkai indah dan siap untuk langsung dikirim hari ini. Solusi tepat untuk hadiah mendadak namun tetap berkesan.",
    price: 500000,
    category: "ready",
    imageUrl: "",
    isPopular: true,
  },
];
