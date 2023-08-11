/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/SideBar/Sidebar";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import Dropdown from "./Components/DrowpDown/Dropdown ";

interface Ventas {
  id: number;
  cliente: string;
  pruducto: string;
  cantidad: number;
}

class VentasManager {
  private ventas: Ventas[];
  private nextId: number;

  constructor() {
    this.ventas = [];
    this.nextId = 1;
  }

  saveProductsToLocalStorage(): void {
    localStorage.setItem("ventas", JSON.stringify(this.ventas));
  }

  loadProductsFromLocalStorage(): void {
    const productsData = localStorage.getItem("ventas");
    if (productsData) {
      this.ventas = JSON.parse(productsData);
      this.nextId =
        this.ventas.reduce((maxId, ventas) => Math.max(maxId, ventas.id), 0) +
        1;
    }
  }

  // Agregar un nuevo producto
  addProduct(cliente: string, pruducto: string, cantidad: number): void {
    const newProduct: Ventas = {
      id: this.nextId,
      cliente,
      pruducto,
      cantidad,
    };

    this.ventas.push(newProduct);
    this.nextId++;
  }

  // Editar un producto existente por ID
  editProduct(
    id: number,
    cliente: string,
    pruducto: string,
    cantidad: number
  ): void {
    const index = this.ventas.findIndex((ventas) => ventas.id === id);

    if (index !== -1) {
      this.ventas[index].cliente = cliente;
      this.ventas[index].pruducto = pruducto;
      this.ventas[index].cantidad = cantidad;
    } else {
      console.log("Producto no encontrado");
    }
  }

  // Eliminar un producto existente por ID
  deleteProduct(id: number): void {
    this.ventas = this.ventas.filter((ventas) => ventas.id !== id);
  }

  // Obtener todos los productos
  getProducts(): Ventas[] {
    return this.ventas;
  }
}

function VentasRealizadas() {
  const [productList, setProductList] = useState<Ventas[]>([]);
  const [currentProduct, setCurrentProduct] = useState<Ventas | null>(null);
  const ventassManager = new VentasManager();

  useEffect(() => {
    ventassManager.loadProductsFromLocalStorage();
    setProductList(ventassManager.getProducts());
  }, []);

  // Función para manejar el envío del formulario de agregar/editar producto
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const cliente = formData.get("cliente") as string;
    const cantidad = parseFloat(formData.get("cantidad") as string);
    const producto = formData.get("producto") as string;

    if (currentProduct) {
      ventassManager.editProduct(
        currentProduct.id,
        cliente,
        producto,
        cantidad
      );
      setCurrentProduct(null);
    } else {
      ventassManager.addProduct(cliente, producto, cantidad);
    }

    ventassManager.saveProductsToLocalStorage(); // Guardamos los productos en el localStorage
    setProductList(ventassManager.getProducts());
  };

  // Función para eliminar un producto
  const handleDeleteProduct = (id: number) => {
    ventassManager.deleteProduct(id);
    ventassManager.saveProductsToLocalStorage(); // Guardamos los productos en el localStorage
    setProductList(ventassManager.getProducts());
  };

  // Función para editar un producto
  const handleEditProduct = (product: Ventas) => {
    setCurrentProduct(product);
  };

  return (
    <div
      style={{
        display: "flex",
        margin: "auto 20px",
      }}
    >
      <Sidebar />

      <section style={{ border: "2px solid #242527", padding: 50 }}>
        <h1>Ventas</h1>

        {/* Formulario para agregar/editar productos */}
        <form onSubmit={handleFormSubmit} className="FormProduct">
          <div style={{ textAlign: "center", margin: "auto 2px" }}>
            <label htmlFor="cliente">
              <b style={{ fontSize: 20, fontWeight: "bold" }}> Cliente </b>
            </label>
            <Dropdown />
          </div>

          <div style={{ textAlign: "center", margin: "auto 2px" }}>
            <label htmlFor="pruducto">
              <b style={{ fontSize: 20, fontWeight: "bold" }}> Producto </b>
            </label>
            <Dropdown />
          </div>
          <div style={{ textAlign: "center", margin: "auto 2px" }}>
            <label htmlFor="cantidad">
              <b style={{ fontSize: 20, fontWeight: "bold" }}> Cantidad :</b>
            </label>
            <input
              type="number"
              name="cantidad"
              step="0.01"
              defaultValue={currentProduct?.cantidad ?? ""}
              required
            />
          </div>
          <button
            className="ButtonEditar"
            type="submit"
            style={{ marginLeft: 100 }}
          >
            {currentProduct ? "Editar Venta" : "Agregar Venta"}
          </button>
        </form>

        {/* Mostrar los productos agregados */}
        {productList.map((product) => (
          <div
            key={product.id}
            style={{
              position: "relative",
              margin: "auto",
              top: "30px",
              width: "100%",
              padding: "20px",
              borderRadius: "20px",
            }}
          >
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>{product.cliente}</th>
                  <th>{product.pruducto}</th>
                  <th>{product.cantidad}</th>
                  <th>
                    <div
                      className="ContainerItem"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <button
                        onClick={() => handleEditProduct(product)}
                        style={{
                          width: "100px",
                          fontSize: 10,
                          fontWeight: "bold",
                        }}
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        style={{
                          marginLeft: "20px",
                          width: "100px",
                          fontSize: 10,
                          fontWeight: "bold",
                        }}
                      >
                        Eliminar
                      </button>
                    </div>
                  </th>
                </tr>
              </thead>
            </Table>
          </div>
        ))}
      </section>
    </div>
  );
}

export default VentasRealizadas;
