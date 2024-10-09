import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Header } from "./Header";
import { ProductsIndexPage } from "./ProductsIndexPage";
import { SignupPage } from "./SignupPage";
import { LoginPage } from "./LoginPage";
import { Footer } from "./Footer";
import { UserProvider } from "./UserContext";
import { ProductNew } from "./ProductNew";
import axios from "axios";

const router = createBrowserRouter([
  {
    element: (
      <div>
        <Header />
        <Outlet />
        <Footer />
      </div>
    ),
    loader: async () => {
      const jwt = localStorage.getItem("jwt");
      if (jwt) {
        try {
          const response = await axios.get("http://localhost:3000/user_info.json", {
            headers: { Authorization: `Bearer ${jwt}` },
          });
          return response.data;
        } catch (error) {
          console.error("Error fetching user info:", error);
          localStorage.removeItem("jwt");
          delete axios.defaults.headers.common["Authorization"];
          return null;
        }
      }
      return null;
    },
    children: [
      {
        path: "/",
        element: <ProductsIndexPage />,
        loader: async () => {
          const response = await axios.get("http://localhost:3000/products.json");
          return response.data;
        },
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/newproduct",
        element: <ProductNew />,
      },
    ],
  },
]);

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
