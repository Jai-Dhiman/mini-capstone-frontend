import { useState, useEffect } from "react";
import { useUser } from "./useUser";
import { useNavigate } from "react-router-dom";
import axios from "./axiosConfig";

export function ShoppingCart() {
  const [cartedProducts, setCartedProducts] = useState([]);
  const [errors, setErrors] = useState([]);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchCartedProducts();
    }
  }, [user]);

  const fetchCartedProducts = () => {
    axios
      .get("http://localhost:3000/carted_products")
      .then((response) => {
        setCartedProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching carted products:", error);
        setErrors(["Error loading shopping cart."]);
      });
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveItem(id);
      return;
    }

    axios
      .patch(`http://localhost:3000/carted_products/${id}`, { quantity: newQuantity })
      .then(() => {
        fetchCartedProducts();
      })
      .catch((error) => {
        console.error("Error updating quantity:", error);
        setErrors(["Error updating quantity. Please try again."]);
      });
  };

  const handleRemoveItem = (id) => {
    axios
      .delete(`http://localhost:3000/carted_products/${id}`)
      .then(() => {
        fetchCartedProducts();
      })
      .catch((error) => {
        console.error("Error removing item:", error);
        setErrors(["Error removing item. Please try again."]);
      });
  };

  const handleCreateOrder = () => {
    axios
      .post("http://localhost:3000/orders")
      .then((response) => {
        console.log("Order created:", response.data);
        navigate(`/orders/${response.data.id}`);
      })
      .catch((error) => {
        console.error("Error creating order:", error);
        setErrors(["Error creating order. Please try again."]);
      });
  };

  return (
    <div className="shopping-cart">
      <h1>Shopping Cart</h1>
      {errors.length > 0 && (
        <ul className="errors">
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}
      {cartedProducts.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="cart-items">
          {cartedProducts.map((item) => (
            <li key={item.id} className="cart-item">
              <img src={item.product.image_url} alt={item.product.name} />
              <div className="item-details">
                <h3>{item.product.name}</h3>
                <p>Price: ${item.product.price}</p>
                <div className="quantity-control">
                  <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <p>Subtotal: ${(item.product.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="cart-total">
        <h3>
          Total: ${cartedProducts.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2)}
        </h3>
        <button onClick={handleCreateOrder}>Create Order</button>
      </div>
    </div>
  );
}
