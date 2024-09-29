import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;
      // You'll need to implement an endpoint to fetch the user's info
      axios
        .get("http://localhost:3000/user_info.json")
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user info:", error);
          localStorage.removeItem("jwt");
          delete axios.defaults.headers.common["Authorization"];
        });
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("jwt");
    delete axios.defaults.headers.common["Authorization"];
  };

  return <UserContext.Provider value={{ user, login, logout }}>{children}</UserContext.Provider>;
}

export const useUser = () => useContext(UserContext);
