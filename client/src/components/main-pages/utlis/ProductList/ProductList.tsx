import { ProductType } from "../../../../api/ProductAPI";
import BtnRender from "./BtnRender";

interface ProductListProps {
  product: ProductType;
  isAdmin: boolean;
}

export default function ProductList({ product, isAdmin }: ProductListProps) {
  const images = Array.isArray(product.images)
    ? product.images
    : [product.images];

  return (
    <div className="product-card">
      {isAdmin && <input type="checkbox" checked={product.checked} />}

      {images.length > 0 ? (
        images.map((image) => (
          <img key={image.public_id} src={image.url} alt={image.public_id} />
        ))
      ) : (
        <p>No images available</p>
      )}

      <div className="product-box">
        <h2 title={product.title}>{product.title}</h2>
        <span>${product.price}</span>
        <p>{product.description}</p>
      </div>

      <BtnRender product={product} />
    </div>
  );
}
