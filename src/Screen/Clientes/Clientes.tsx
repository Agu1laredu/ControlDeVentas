/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/SideBar/Sidebar";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";

interface Product {
  id: number;
  name: string;
  Telefono: number;
  Apellido: string;
}

class ProductManager {
  private cli: Product[];
  private nextId: number;

  constructor() {
    this.cli = [];
    this.nextId = 1;
  }
  savecliToLocalStorage(): void {
    localStorage.setItem("cli", JSON.stringify(this.cli));
  }

  loadcliFromLocalStorage(): void {
    const cliData = localStorage.getItem("cli");
    if (cliData) {
      this.cli = JSON.parse(cliData);
      this.nextId =
        this.cli.reduce((maxId, product) => Math.max(maxId, product.id), 0) + 1;
    }
  }

  // Agregar un nuevo producto
  addProduct(name: string, Telefono: number, Apellido: string): void {
    const newProduct: Product = {
      id: this.nextId,
      name,
      Telefono,
      Apellido,
    };

    this.cli.push(newProduct);
    this.nextId++;
  }

  // Editar un producto existente por ID
  editProduct(
    id: number,
    name: string,
    Telefono: number,
    Apellido: string
  ): void {
    const index = this.cli.findIndex((product) => product.id === id);

    if (index !== -1) {
      this.cli[index].name = name;
      this.cli[index].Telefono = Telefono;
      this.cli[index].Apellido = Apellido;
    } else {
      console.log("Producto no encontrado");
    }
  }

  // Eliminar un producto existente por ID
  deleteProduct(id: number): void {
    this.cli = this.cli.filter((product) => product.id !== id);
  }

  // Obtener todos los productos
  getcli(): Product[] {
    return this.cli;
  }
}

function Clientes() {
  const [cli, setClients] = useState<Product[]>([]);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const productManager = new ProductManager();

  useEffect(() => {
    // No es necesario cargar los productos nuevamente al montar el componente, ya que esto se hace automáticamente en el constructor de ProductManager
    setClients(productManager.getcli());
  }, []);

  // Función para manejar el envío del formulario de agregar/editar producto
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (currentProduct) {
      productManager.editProduct(
        currentProduct.id,
        currentProduct.name,
        currentProduct.Telefono,
        currentProduct.Apellido
      );
      setCurrentProduct(null);
    } else {
      const formData = new FormData(event.currentTarget);
      const name = formData.get("name") as string;
      const Telefono = parseFloat(formData.get("Telefono") as string);
      const Apellido = formData.get("Apellido") as string;
      productManager.addProduct(name, Telefono, Apellido);
    }

    productManager.savecliToLocalStorage(); // Guardamos los productos en el localStorage
    setClients(productManager.getcli());
  };

  // Función para eliminar un producto
  const handleDeleteClients = (id: number) => {
    productManager.deleteProduct(id);
    productManager.savecliToLocalStorage(); // Guardamos los productos en el localStorage
    setClients(productManager.getcli());
  };

  // Función para editar un producto
  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product);
  };
  return (
    <div
      style={{
        display: "flex",
        width: "120%",
        margin: "auto 20px",
      }}
    >
      <Sidebar />
      <section
        style={{ width: "100%", border: "2px solid #242527", padding: 50 }}
      >
        <h1>Clientes</h1>

        {/* Formulario para agregar/editar productos */}
        <form
          onSubmit={handleFormSubmit}
          style={{
            padding: "20px",
            margin: "auto",
            border: "2px solid black",
            display: "flex",
            borderRadius: "20px",
            textAlign: "center",
            width: "100%",
          }}
        >
          <div style={{ textAlign: "center", margin: "auto 2px" }}>
            <label htmlFor="name">
              <b style={{ fontSize: 20, fontWeight: "bold" }}> Nombre:</b>
            </label>
            <input
              type="text"
              name="name"
              defaultValue={currentProduct?.name ?? ""}
              required
            />
          </div>

          <div
            style={{
              textAlign: "center",
              margin: "auto 2px",
            }}
          >
            <label htmlFor="name">
              <b style={{ fontSize: 20, fontWeight: "bold" }}> Apellido:</b>
            </label>
            <input
              type="text"
              name="Apellido"
              defaultValue={currentProduct?.Apellido ?? ""}
              required
            />
          </div>
          <div
            style={{
              textAlign: "center",
              margin: "auto 2px",
            }}
          >
            <label htmlFor="Telefono">
              <b style={{ fontSize: 20, fontWeight: "bold" }}> Telefono:</b>
            </label>
            <input
              type="number"
              name="Telefono"
              step="0.01"
              defaultValue={currentProduct?.Telefono ?? ""}
              required
            />
          </div>
          <button
            type="submit"
            style={{
              marginLeft: 100,
            }}
          >
            {currentProduct ? "Editar Cliente" : "Agregar Cliente"}
          </button>
        </form>

        {/* Lista de productos */}
        <ul>
          {cli.map((product) => (
            <div
              key={product.id}
              style={{
                position: "relative",
                margin: "auto",
                top: "30px",
                border: "2px solid black",
                width: "100%",
                padding: "20px",
                borderRadius: "20px",
              }}
            >
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>{product.name}</th>
                    <th>{product.Apellido}</th>
                    <th>{product.Telefono}</th>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <button
                        onClick={() => handleEditProduct(product)}
                        style={{
                          width: "100px",
                          fontSize: 10,
                          fontWeight: "20px",
                        }}
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeleteClients(product.id)}
                        style={{
                          marginLeft: "20px",
                          width: "100px",
                          fontSize: 10,
                          fontWeight: "20px",
                        }}
                      >
                        Eliminar
                      </button>
                    </div>
                  </tr>
                </thead>
              </Table>
            </div>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Clientes;
