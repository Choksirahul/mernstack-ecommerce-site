import { useContext } from "react";
import { GlobalState } from "../../../../GlobalContext";
import { Link } from "react-router-dom";
import { ProductType } from "../../../../api/ProductAPI";

interface BtnRenderProps {
  product: ProductType;
}

export default function BtnRender({ product }: BtnRenderProps) {
  const state = useContext(GlobalState);

  if (!state) {
    throw new Error("GlobalState must be used within a DataProvider");
  }

  const [isAdmin] = state.userAPI.isAdmin;
  const addCart = state.userAPI.addCart;

  return (
    <div className="row-btn">
      {isAdmin ? (
        <>
          <Link id="btnBuy" to={`#!`}>
            Delete
          </Link>
          <Link id="btnView" to={`detail/${product._id}`}>
            Edit
          </Link>
        </>
      ) : (
        <>
          <Link id="btnBuy" to={`#!`} onClick={() => addCart(product)}>
            Buy
          </Link>
          <Link id="btnView" to={`detail/${product._id}`}>
            View
          </Link>
        </>
      )}
    </div>
  );
}
