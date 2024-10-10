import { Link } from "react-router-dom";
import { useUser } from "./useUser";
import { useState, useEffect } from "react";
import axios from "./axiosConfig";

export function Header() {
  const { user } = useUser();
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    if (user) {
      fetchCartItemCount();
    }
  }, [user]);

  const fetchCartItemCount = () => {
    axios
      .get("http://localhost:3000/carted_products")
      .then((response) => {
        setCartItemCount(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching cart item count:", error);
      });
  };

  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart ({cartItemCount})</Link>
        {user ? (
          <>
            <span>Welcome, {user.name}!</span>
            <Link to="/logout">Logout</Link>
          </>
        ) : (
          <>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </>
        )}
        <Link to="/newproduct">New Product</Link>
      </nav>
    </header>
  );
}
