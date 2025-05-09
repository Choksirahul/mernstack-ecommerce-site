import React, { createContext } from "react";
import ProductAPI, { ProductType } from "./api/ProductAPI";

export interface CartItem extends ProductType {
  _id: string;
  quantity: number;
}

export interface GlobalStateType {
  token: [string, React.Dispatch<React.SetStateAction<string>>];
  productAPI: ReturnType<typeof ProductAPI>;
  userAPI: {
    isLoggedIn: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    isAdmin: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
    cart: [CartItem[], React.Dispatch<React.SetStateAction<CartItem[]>>];
    addCart: (product: ProductType) => void;
  };
}

// Use `undefined` as the default, enforce `useContext` inside a Provider
export const GlobalState = createContext<GlobalStateType | undefined>(
  undefined
);
