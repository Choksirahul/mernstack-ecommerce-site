import { useEffect, useState } from "react";
import axios from "axios";

export interface ProductImage {
  url: string;
  public_id: string;
}

export interface ProductType {
  _id: string;
  product_id: string;
  title: string;
  price: number;
  description: string;
  content: string;
  images: ProductImage | ProductImage[];
  category: string;
  checked: boolean;
  sold: number;
}

export default function ProductAPI() {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await axios.get("/api/products");
        setProducts(data || []);
      } catch (err) {
        console.error("Failed to fetch products", err);
        setProducts([]); // ✅ fallback on error
      }
    };
    getProducts();
  }, []);

  return {
    products: [products, setProducts] as [
      ProductType[],
      React.Dispatch<React.SetStateAction<ProductType[]>>
    ],
  };
}
