// src/OrderCreate.jsx
import { useState } from "react";
import axios from "./axiosConfig";
import { useNavigate } from "react-router-dom";

export function OrderCreate() {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

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
    <div>
      <h1>Create Order</h1>
      {errors.length > 0 && (
        <ul>
          {errors.map((error, index) => (
            <li key={index} style={{ color: "red" }}>
              {error}
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleCreateOrder}>Create Order</button>
    </div>
  );
}
