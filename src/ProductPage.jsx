import axios from "axios";
import { useState, useEffect } from "react";
import { ProductIndex } from "./ProductIndex";

export function ProductPage() {
  const [products, setProduct] = useState([]);
  const handleIndex = () => {
    console.log("handleIndex");
    axios.get("http://localhost:3000/products.json").then((response) => {
      console.log(response.data);
      setProduct(response.data);
    });
  };
  useEffect(handleIndex, []);

  return (
    <main>
      <ProductIndex products={products} />
    </main>
  );
}
