import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Screen/Login/Login.tsx";
import Home from "./Screen/Home/Home.tsx";
import NotFound from "./Components/NotFound/NotFound.tsx";
import Productos from "./Screen/Produtos/Producto.tsx";
import Ventas from "./Screen/Ventas/Ventas.tsx";
import Clientes from "./Screen/Clientes/Clientes.tsx";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/Productos",
    element: <Productos />,
  },
  {
    path: "/Ventas",
    element: <Ventas />,
  },
  {
    path: "/Clientes",
    element: <Clientes />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
