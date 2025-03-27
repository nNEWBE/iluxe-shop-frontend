export interface Author {
    _id: string;
    name: string;
    email: string;
    role: string;
    isBlocked: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface Product {
    _id: string;
    name: string;
    brand: string;
    category: string;
    description: string;
    price: number;
    productImage: string;
    inStock: boolean;
    quantity: number;
    rating: number;
    createdAt: string;
    updatedAt: string;
    author: Author;
}

export interface CardProps {
    product: Product;
}

export interface Order {
  _id: string;
  email: string;
  product: Product;
  quantity: number;
  totalPrice?: number;
  status: "Pending" | "Shipping";
}