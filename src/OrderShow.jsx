// src/OrderShow.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "./axiosConfig";

export function OrderShow() {
  const [order, setOrder] = useState(null);
  const [errors, setErrors] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/orders/${id}`)
      .then((response) => {
        setOrder(response.data);
      })
      .catch((error) => {
        console.error("Error fetching order:", error);
        setErrors(["Error loading order. Please try again."]);
      });
  }, [id]);

  if (!order) return <div>Loading...</div>;

  return (
    <div>
      <h1>Order #{order.id}</h1>
      {errors.length > 0 && (
        <ul>
          {errors.map((error, index) => (
            <li key={index} style={{ color: "red" }}>
              {error}
            </li>
          ))}
        </ul>
      )}
      <p>Subtotal: ${order.subtotal}</p>
      <p>Tax: ${order.tax}</p>
      <p>Total: ${order.total}</p>
      <h2>Order Items:</h2>
      <ul>
        {order.carted_products.map((item) => (
          <li key={item.id}>
            {item.product.name} - Quantity: {item.quantity} - Price: ${item.product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
