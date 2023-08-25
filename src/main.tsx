import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Screen/Login/Login.tsx";
import Home from "./Screen/Home/Home.tsx";
import NotFound from "./Components/NotFound/NotFound.tsx";
import Productos from "./Screen/Produtos/Producto.tsx";
import Ventas from "./Screen/Ventas/Ventas.tsx";
import Clientes from "./Screen/Clientes/Clientes.tsx";

import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Productos" element={<Productos />} />
        <Route path="/Ventas" element={<Ventas />} />
        <Route path="/Clientes" element={<Clientes />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
