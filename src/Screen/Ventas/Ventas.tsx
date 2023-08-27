/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/SideBar/Sidebar";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import DropdownComponent from "./Components/DrowpDown/Dropdown ";

import ButtonSend from "../../Components/Button/Button";
import styled from "styled-components";

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
  borderradius: 20px;
`;

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

  // Luego en tu componente App, donde tienes los arrays de Clientes y Productos:
  const Clientes = [
    {
      name: "Hector",
    },
    {
      name: "Hugo",
    },
    {
      name: "Jeronimo",
    },
  ];

  const Productos = [
    {
      name: "Buzos Esc Oroño",
    },
    {
      name: "Remeras Maxi kiosco",
    },
    {
      name: "Camperas Colores Primarios",
    },
  ];
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

        {/* Formulario para agregar/editar productos */}
        <Formproduct onSubmit={handleFormSubmit}>
          <div style={{ textAlign: "center", margin: "auto 2px" }}>
            <label htmlFor="cliente"></label>
            <DropdownComponent title="Clientes" options={Clientes} />
          </div>

          <div style={{ textAlign: "center", margin: "auto 2px" }}>
            <label htmlFor="producto"></label>
            <DropdownComponent title="Productos" options={Productos} />
          </div>

          <div style={{ textAlign: "center", margin: "auto 2px" }}>
            <label htmlFor="cantidad">
              <b style={{ fontSize: 20, fontWeight: "bold" }}> Cantidad :</b>
            </label>
            <input
              style={{ width: "80px", height: "50px", marginLeft: "20px" }}
              type="number"
              name="cantidad"
              step="0.01"
              defaultValue={currentProduct?.cantidad ?? ""}
              required
            />
          </div>
          <ButtonEditar type="submit">
            {currentProduct ? "Editar Cliente" : "Agregar Cliente"}
          </ButtonEditar>
        </Formproduct>

        {/* Mostrar los productos agregados */}
        {productList.map((product) => (
          <TablaContainer key={product.id}>
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
                      <ButtonSend onClick={() => handleEditProduct(product)}>
                        Editar
                      </ButtonSend>
                      <ButtonSend
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        Eliminar
                      </ButtonSend>
                    </div>
                  </th>
                </tr>
              </thead>
            </Table>
          </TablaContainer>
        ))}
      </Section>
    </div>
  );
}

export default VentasRealizadas;
