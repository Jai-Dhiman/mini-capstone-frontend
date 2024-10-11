import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { Modal } from "./Modal";
import { ProductShow } from "./ProductShow";
import { useUser } from "./useUser";
import axios from "./axiosConfig";
import "./Index.css";

export function ProductsIndexPage() {
  const products = useLoaderData();
  const { user } = useUser();
  const [isProductShowVisible, setIsProductShowVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isQuantityModalVisible, setIsQuantityModalVisible] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleShow = (product) => {
    setIsProductShowVisible(true);
    setCurrentProduct(product);
  };

  const handleClose = () => {
    setIsProductShowVisible(false);
    setCurrentProduct(null);
  };

  const handleAddToCart = (productId) => {
    if (!user) {
      alert("Please log in to add items to cart.");
      return;
    }
    setSelectedProductId(productId);
    setIsQuantityModalVisible(true);
  };

  const handleQuantitySubmit = () => {
    axios
      .post("http://localhost:3000/carted_products", {
        product_id: selectedProductId,
        quantity: quantity,
      })
      .then((response) => {
        console.log("Product added to cart:", response.data);
        setIsQuantityModalVisible(false);
        setQuantity(1);
        alert("Product added to cart!");
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
        alert("Error adding product to cart. Please try again.");
      });
  };

  return (
    <main>
      <h1>All Products</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <h2>{product.name}</h2>
            <img src={product.image_url} alt={product.name} />
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <button onClick={() => handleShow(product)}>More info</button>
            <button onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <Modal show={isProductShowVisible} onClose={handleClose}>
        {currentProduct && <ProductShow product={currentProduct} />}
      </Modal>
      <Modal show={isQuantityModalVisible} onClose={() => setIsQuantityModalVisible(false)}>
        <div className="quantity-modal">
          <h2>Select Quantity</h2>
          <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} />
          <button onClick={handleQuantitySubmit}>Add to Cart</button>
        </div>
      </Modal>
    </main>
  );
}
