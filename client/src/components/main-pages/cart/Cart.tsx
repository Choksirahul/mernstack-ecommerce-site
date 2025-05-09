import { useContext } from "react";
import { CartItem, GlobalState } from "../../../GlobalContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const state = useContext(GlobalState);

  if (!state) {
    throw new Error("GlobalState must be used within a DataProvider");
  }

  const [cart] = state.userAPI.cart;

  if (cart.length === 0) {
    return (
      <h2 style={{ textAlign: "center", fontSize: "5rem" }}>
        Your cart is empty
      </h2>
    );
  }

  return (
    <div>
      {cart.map((product: CartItem) => {
        const images = Array.isArray(product.images)
          ? product.images
          : [product.images];

        return (
          <div className="detail-product" key={product._id}>
            {images.length > 0 ? (
              images.map((image) => (
                <img
                  key={image.public_id}
                  src={image.url}
                  alt={image.public_id}
                />
              ))
            ) : (
              <p>No images available</p>
            )}

            <div className="box-detail">
              <div className="row">
                <h2>{product.title}</h2>
                <h6>{product.product_id}</h6>
              </div>
              <span>${product.price}</span>
              <p>{product.description}</p>
              <p>{product.content}</p>
              <p>Sold: {product.sold}</p>
              <Link to="/cart" className="cart">
                Buy Now
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
