import axios from "axios";
import { useState, useEffect } from "react";
import { ProductIndex } from "./ProductIndex";
import { ProductShow } from "./ProductShow";
import { ProductNew } from "./ProductNew";
import { Modal } from "./Modal";

export function ProductPage() {
  const [products, setProduct] = useState([]);
  const [isProductsShowVisible, setIsProductsShowVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});

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

  const handleShow = (product) => {
    console.log("handleShow", product);
    setIsProductsShowVisible(true);
    setCurrentProduct(product);
  };

  const handleClose = () => {
    console.log("handleClose");
    setIsProductsShowVisible(false);
  };

  useEffect(handleIndex, []);

  return (
    <main>
      <ProductNew onCreate={handleCreate} />
      <ProductIndex products={products} onShow={handleShow} />
      <Modal show={isProductsShowVisible} onClose={handleClose}>
        <ProductShow product={currentProduct} />
      </Modal>
    </main>
  );
}
