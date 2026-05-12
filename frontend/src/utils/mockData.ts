interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  images: string[];
  description: string;
  rating: number;
  sold: number;
  isNew?: boolean;
  isBestSeller?: boolean;
}

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Elite Charcoal T-Shirt",
    category: "Clothing",
    price: 48,
    images: ["/body.jpg"],
    description: "Áo thun cao cấp",
    rating: 4.8,
    sold: 1240,
    isNew: true,
  },
  {
    id: "2",
    name: "Performance Navy Polo",
    category: "Clothing",
    price: 66,
    images: ["/line.jpg"],
    description: "Áo polo thể thao",
    rating: 4.9,
    sold: 890,
    isBestSeller: true,
  },
  {
    id: "3",
    name: "Pro Training Sweater",
    category: "Clothing",
    price: 88,
    images: ["/giày.jpg"],
    description: "Áo len tập gym",
    rating: 5,
    sold: 650,
    isBestSeller: true,
  },
  {
    id: "4",
    name: "Core Tech Hoodie",
    category: "Clothing",
    price: 98,
    images: ["/gió.jpg"],
    description: "Hoodie công nghệ cao",
    rating: 4.7,
    sold: 420,
  },
  {
    id: "5",
    name: "Ultra Light Running Shorts",
    category: "Clothing",
    price: 42,
    images: ["/tennis.jpg"],
    description: "Quần short chạy bộ",
    rating: 4.6,
    sold: 310,
  },
  {
    id: "6",
    name: "Signature Training Jacket",
    category: "Clothing",
    price: 120,
    images: ["/polo.jpg"],
    description: "Áo khoác tập luyện",
    rating: 4.9,
    sold: 180,
    isNew: true,
  },
];
