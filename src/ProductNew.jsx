import { useState } from "react";
import axios from "./axiosConfig";
import { useNavigate } from "react-router-dom";

export function ProductNew() {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);

    try {
      const response = await axios.post("http://localhost:3000/products.json", params);
      console.log("Product created:", response.data);
      event.target.reset();
      navigate("/");
    } catch (error) {
      console.error("Error creating product:", error);

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);

        if (error.response.data && error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else {
          setErrors(["An unexpected error occurred. Please try again."]);
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
        setErrors(["No response received from the server. Please try again."]);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up the request:", error.message);
        setErrors(["An error occurred while sending the request. Please try again."]);
      }
    }
  };

  return (
    <div className="new-product">
      <h1>New Product</h1>
      {errors.length > 0 && (
        <ul>
          {errors.map((error, index) => (
            <li key={index} style={{ color: "red" }}>
              {error}
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input id="name" name="name" type="text" required />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input id="price" name="price" type="text" required />
        </div>
        <div>
          <label htmlFor="supplier_id">Supplier ID:</label>
          <input id="supplier_id" name="supplier_id" type="text" required />
        </div>
        <div>
          <label htmlFor="image_url">Image URL:</label>
          <input id="image_url" name="image_url" type="url" required />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input id="description" name="description" required></input>
        </div>
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
}
