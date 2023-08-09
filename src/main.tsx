import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Screen/Home/Home.tsx";
import Productos from "./Screen/Produtos/Producto.js";
import Clientes from "./Screen/Clientes/Clientes.tsx";
import Ventas from "./Screen/Ventas/Ventas.tsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/Produtos",
    element: <Productos />,
  },
  {
    path: "/Clientes",
    element: <Clientes />,
  },
  {
    path: "/Ventas",
    element: <Ventas />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
