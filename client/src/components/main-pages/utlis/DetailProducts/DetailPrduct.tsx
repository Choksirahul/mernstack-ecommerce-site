import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GlobalState } from "../../../../GlobalContext";
import { ProductType } from "../../../../api/ProductAPI";

export default function DetailPrduct() {
  const params = useParams();

  const state = useContext(GlobalState);

  if (!state) {
    throw new Error("GlobalState must be used within a DataProvider");
  }

  const [products] = state.productAPI.products;
  const [detailProduct, setDetailProduct] = useState<ProductType | null>(null);

  useEffect(() => {
    if (params.id && products.length > 0) {
      const foundProduct = products.find(
        (product) => product._id === params.id
      );

      if (foundProduct) {
        setDetailProduct(foundProduct);
      }
    }
  }, [params, products]);

  if (!detailProduct) {
    return null;
  }

  const images = Array.isArray(detailProduct.images)
    ? detailProduct.images
    : [detailProduct.images];

  return (
    <div className="detail-product-wrapper">
      <div className="detail-product">
        {images.length > 0 ? (
          images.map((image) => (
            <img key={image.public_id} src={image.url} alt={image.public_id} />
          ))
        ) : (
          <p>No images available</p>
        )}
        <div className="box-detail">
          <div className="row">
            <h2>{detailProduct.title}</h2>
            <h6>{detailProduct.product_id}</h6>
          </div>
          <span>${detailProduct.price}</span>
          <p>{detailProduct.description}</p>
          <p>{detailProduct.content}</p>
          <p>Sold:{detailProduct.sold}</p>
          <Link to="/cart" className="cart">
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
}
