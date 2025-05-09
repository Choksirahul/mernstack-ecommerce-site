import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { CartItem } from "../GlobalContext";
import { ProductType } from "./ProductAPI";

export default function UserAPI(token: string): {
  isLoggedIn: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  isAdmin: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  cart: [CartItem[], React.Dispatch<React.SetStateAction<CartItem[]>>];
  addCart: (product: ProductType) => void;
} {
  const [isLoggedIn, setIsLoogedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get("/user/information", {
            headers: { Authorization: token },
          });

          setIsLoogedIn(true);

          if (res.data.role === 1) {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } catch (err) {
          const error = err as AxiosError<{ msg: string }>;
          alert(error.response?.data?.msg);
        }
      };
      getUser();
    }
  }, [token]);

  const addCart = async (product: ProductType) => {
    if (!isLoggedIn) {
      alert("Please login to add a product in a cart!");
      return;
    }

    const check = cart.every((item) => {
      return item._id !== product._id;
    });

    if (check) {
      setCart([...cart, { ...product, quantity: 1 }]);
    } else {
      alert("This product has been already present in the cart");
    }
  };

  return {
    isLoggedIn: [isLoggedIn, setIsLoogedIn],
    isAdmin: [isAdmin, setIsAdmin],
    cart: [cart, setCart],
    addCart: addCart,
  };
}
