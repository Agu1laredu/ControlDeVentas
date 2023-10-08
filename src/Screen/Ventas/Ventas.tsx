/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/SideBar/Sidebar";
import Table from "react-bootstrap/Table";
import ButtonSend from "../../Components/Button/Button";
import styled from "styled-components";
import { client } from "../../supabase/client";
import "bootstrap/dist/css/bootstrap.min.css";

const Formproduct = styled.form`
  padding: 20px;
  margin: auto;
  display: flex;
  border-radius: 20px;
  text-align: center;

  @media (max-width: 700px) {
    display: grid;
    width: 50%;
  }
`;

const Section = styled.section`
  margin-left: 100px;
  border: 2px solid #242527;
  padding: 50px;
  width: 80vw;
  border-radius: 15px;
`;

const ButtonEditar = styled.button`
  margin-left: 100px;
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #646cff;
  cursor: pointer;
  transition: border-color 0.25s;

  :hover {
    border-color: #646cff;
  }

  :focus,
  :focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }

  @media (max-width: 700px) {
    width: 100%;
    margin: auto;
    position: relative;
    left: -50%;
    top: 20%;
  }
`;

const TablaContainer = styled.div`
  position: relative;
  margin: auto;
  top: 30px;
  width: 100%;
  padding: 20px;
  border-radius: 20px;
`;

interface Ventas {
  id: number;
  cliente: string;
  producto: string;
  cantidad: number;
}
interface Product {
  id: number;
  name: string;
  price: number;
  Talle: string;
}

interface Clients {
  id: number;
  LastName: string;
  Apellido: string;
  Telefono: number;
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
      this.nextId = Math.max(...this.ventas.map((ventas) => ventas.id), 0) + 1;
    }
  }

  addProduct(cliente: string, producto: string, cantidad: number): void {
    const newProduct: Ventas = {
      id: this.nextId,
      cliente,
      producto,
      cantidad,
    };

    this.ventas.push(newProduct);
    this.nextId++;
    this.saveProductsToLocalStorage();
  }

  editProduct(
    id: number,
    cliente: string,
    producto: string,
    cantidad: number
  ): void {
    const index = this.ventas.findIndex((ventas) => ventas.id === id);

    if (index !== -1) {
      this.ventas[index].cliente = cliente;
      this.ventas[index].producto = producto;
      this.ventas[index].cantidad = cantidad;
      this.saveProductsToLocalStorage();
    } else {
      console.log("Producto no encontrado");
    }
  }

  deleteProduct(id: number): void {
    this.ventas = this.ventas.filter((ventas) => ventas.id !== id);
    this.saveProductsToLocalStorage();
  }

  getProducts(): Ventas[] {
    return this.ventas;
  }
}

function VentasRealizadas() {
  const [productList, setProductList] = useState<Ventas[]>([]);
  const [currentProduct, setCurrentProduct] = useState<Ventas | null>(null);
  const ventassManager = new VentasManager();
  const [clients, setClients] = useState<Clients[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<string>("");
  const [selectedProductId, setSelectedProductId] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      try {
        // Obtener datos de clientes desde Supabase
        const clientsResponse = await client.from("Clients").select("*");
        if (!clientsResponse.error) {
          setClients(clientsResponse.data);
        }

        // Obtener datos de productos desde Supabase
        const productsResponse = await client.from("Products").select("*");
        if (!productsResponse.error) {
          setProducts(productsResponse.data);
        }

        // Obtener datos de ventas desde Supabase
        const ventasResponse = await client.from("Ventas").select("*");
        if (!ventasResponse.error) {
          setProductList(ventasResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const cliente = String(formData.get("cliente"));
    const cantidad = parseFloat(String(formData.get("Cantidad")));
    const producto = String(formData.get("producto"));

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

    try {
      // Insertar datos en Supabase
      const result = await client.from("Ventas").insert([
        {
          cliente,
          producto,
          cantidad,
        },
      ]);

      console.log(result);

      // Guardar datos en el almacenamiento local después de cada modificación
      ventassManager.saveProductsToLocalStorage();
      setProductList(ventassManager.getProducts());
    } catch (error) {
      console.error("Error inserting sale:", error);
    }
  };

  const handleDeleteProduct = (id: number) => {
    ventassManager.deleteProduct(id);
    ventassManager.saveProductsToLocalStorage();
    setProductList(ventassManager.getProducts());
  };

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

      <Section>
        <h1>VENTAS</h1>

        <Formproduct onSubmit={handleFormSubmit}>
          <div style={{ textAlign: "center", margin: "auto 2px" }}>
            <select
              name="cliente"
              required
              value={selectedClientId}
              onChange={(e) => setSelectedClientId(e.target.value)}
            >
              <option value="">Seleccione un cliente</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id.toString()}>
                  {client.LastName}
                </option>
              ))}
            </select>
          </div>

          <div style={{ textAlign: "center", margin: "auto 2px" }}>
            <select
              name="producto"
              required
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
            >
              <option value="">Seleccione un Producto</option>
              {products.map((product) => (
                <option key={product.id} value={product.id.toString()}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ textAlign: "center", margin: "auto 2px" }}>
            <label htmlFor="cantidad">Cantidad:</label>
            <input
              type="number"
              name="cantidad"
              step="1"
              defaultValue={currentProduct?.cantidad ?? ""}
              required
            />
          </div>

          <ButtonEditar type="submit">
            {currentProduct ? "Editar Venta" : "Registrar Venta"}
          </ButtonEditar>
        </Formproduct>

        {productList.length > 0 && (
          <TablaContainer>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Cliente</th>
                  <th>Producto</th>
                  <th>Cantidad</th>
                  <th>Precio de Venta</th>
                </tr>
              </thead>
              <tbody>
                {productList.map((product) => {
                  const selectedClient = clients.find(
                    (c) => c.id.toString() === product.cliente
                  );
                  const selectedProduct = products.find(
                    (p) => p.id.toString() === product.producto
                  );
                  const totalPrice =
                    selectedProduct &&
                    !isNaN(selectedProduct.price) &&
                    !isNaN(product.cantidad)
                      ? selectedProduct.price * product.cantidad
                      : 0;

                  return (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{selectedClient?.LastName}</td>
                      <td>{selectedProduct?.name}</td>
                      <td>{product.cantidad}</td>
                      <td>${totalPrice.toFixed(2)}</td>
                      <td>
                        <ButtonSend onClick={() => handleEditProduct(product)}>
                          Editar
                        </ButtonSend>
                        <ButtonSend
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          Eliminar
                        </ButtonSend>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </TablaContainer>
        )}
      </Section>
    </div>
  );
}

export default VentasRealizadas;
