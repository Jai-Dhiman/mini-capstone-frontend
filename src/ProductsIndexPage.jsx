import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Modal } from "./Modal";
import { ProductShow } from "./ProductShow";
import { useUser } from "./useUser";
import { LogoutLink } from "./LogoutLink";
import "./Index.css";

export function ProductsIndexPage() {
  const products = useLoaderData();
  const { user } = useUser();
  const [isProductShowVisible, setIsProductShowVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const handleShow = (product) => {
    setIsProductShowVisible(true);
    setCurrentProduct(product);
  };

  const handleClose = () => {
    setIsProductShowVisible(false);
    setCurrentProduct(null);
  };

  return (
    <main>
      {user && (
        <div className="user-info">
          <p>{user.name} is logged in</p>
          <LogoutLink />
        </div>
      )}
      <h1>All Products</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h2>{product.name}</h2>
            <img src={product.image_url} />
            <p>{product.description}</p>
            <button onClick={() => handleShow(product)}>More info</button>
          </div>
        ))}
      </div>
      <Modal show={isProductShowVisible} onClose={handleClose}>
        {currentProduct && <ProductShow product={currentProduct} />}
      </Modal>
    </main>
  );
}
