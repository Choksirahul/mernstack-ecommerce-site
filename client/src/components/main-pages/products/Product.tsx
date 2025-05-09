import ProductList from "../utlis/ProductList/ProductList";
import { useContext } from "react";
import { GlobalState } from "../../../GlobalContext";
import { ProductType } from "../../../api/ProductAPI";

export default function Product() {
  const state = useContext(GlobalState);

  if (!state) {
    throw new Error("GlobalState must be used within a DataProvider");
  }

  const [products] = state.productAPI.products;
  const [isAdmin] = state.userAPI.isAdmin;

  return (
    <div className="products">
      <div className="products-content">
        {products.map((product: ProductType) => (
          <ProductList
            key={product.product_id}
            product={product}
            isAdmin={isAdmin}
          />
        ))}
      </div>
    </div>
  );
}
