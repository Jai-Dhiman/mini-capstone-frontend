import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function ProductNew() {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors([]);
    const params = new FormData(event.target);

    axios
      .post("http://localhost:3000/products.json", params)
      .then((response) => {
        console.log("Product created:", response.data);
        event.target.reset();
        navigate("/"); // Redirect to the product index page
      })
      .catch((error) => {
        console.log(error.response);
        setErrors(["Error creating product. Please try again."]);
      });
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
