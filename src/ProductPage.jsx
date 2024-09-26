import axios from "axios";
import { useState, useEffect } from "react";
import { ProductIndex } from "./ProductIndex";
import { ProductNew } from "./ProductNew";

export function ProductPage() {
  const [products, setProduct] = useState([]);

  const handleIndex = () => {
    console.log("handleIndex");
    axios.get("http://localhost:3000/products.json").then((response) => {
      console.log(response.data);
      setProduct(response.data);
    });
  };

  const handleCreate = (params, successCallback) => {
    console.log("handleCreate", params);
    axios.post("http://localhost:3000/products.json", params).then((response) => {
      setProduct([...products, response.data]);
      successCallback();
    });
  };

  useEffect(handleIndex, []);

  return (
    <main>
      <ProductNew onCreate={handleCreate} />
      <ProductIndex products={products} />
    </main>
  );
}
