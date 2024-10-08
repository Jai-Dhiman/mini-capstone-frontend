import axios from "./axiosConfig";
import { useState, useEffect } from "react";
// import { ProductIndex } from "./ProductIndex";
import { ProductShow } from "./ProductShow";
import { LogoutLink } from "./LogoutLink";
import { Modal } from "./Modal";
import { useUser } from "./useUser";
import "./Index.css";

export function ProductPage() {
  const [products, setProducts] = useState([]);
  const [isProductsShowVisible, setIsProductsShowVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({});
  const { user } = useUser();

  const handleIndex = () => {
    console.log("handleIndex");
    axios.get("http://localhost:3000/products.json").then((response) => {
      console.log(response.data);
      setProducts(response.data);
    });
  };

  const handleShow = (product) => {
    console.log("handleShow", product);
    setIsProductsShowVisible(true);
    setCurrentProduct(product);
  };

  const handleUpdate = (id, params, successCallback) => {
    console.log("handleUpdate", params);
    axios
      .patch(`http://localhost:3000/products/${id}.json`, params)
      .then((response) => {
        setProducts(
          products.map((product) => {
            if (product.id === response.data.id) {
              return response.data;
            } else {
              return product;
            }
          })
        );
        successCallback();
        handleClose();
        console.log("Product updated successfully");
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        console.log("Failed to update product");
      });
  };

  const handleDestroy = (id) => {
    console.log("handleDestroy", id);
    axios.delete(`http://localhost:3000/products/${id}.json`).then(() => {
      setProducts(products.filter((product) => product.id !== id));
      handleClose();
    });
  };

  const handleClose = () => {
    console.log("handleClose");
    setIsProductsShowVisible(false);
  };

  useEffect(handleIndex, []);

  return (
    <main>
      {user && (
        <div className="user-info">
          <p>{user.name} is logged in</p>
          <LogoutLink />
        </div>
      )}
      {/* <ProductIndex products={products} onShow={handleShow} /> */}
      <Modal show={isProductsShowVisible} onClose={handleClose}>
        <ProductShow product={currentProduct} onUpdate={handleUpdate} onDestroy={handleDestroy} />
      </Modal>
    </main>
  );
}
