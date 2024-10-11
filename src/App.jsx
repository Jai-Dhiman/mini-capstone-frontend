import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Header } from "./Header";
import { ProductsIndexPage } from "./ProductsIndexPage";
import { SignupPage } from "./SignupPage";
import { LoginPage } from "./LoginPage";
import { Footer } from "./Footer";
import { UserProvider } from "./UserContext";
import { ProductNew } from "./ProductNew";
import { ShoppingCart } from "./ShoppingCart";
import { OrderCreate } from "./OrderCreate";
import { OrderShow } from "./OrderShow";
import axios from "./axiosConfig";

const router = createBrowserRouter([
  {
    element: (
      <div>
        <Header />
        <Outlet />
        <Footer />
      </div>
    ),
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
      {
        path: "/cart",
        element: <ShoppingCart />,
      },
      {
        path: "/orders/new",
        element: <OrderCreate />,
      },
      {
        path: "/orders/:id",
        element: <OrderShow />,
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
