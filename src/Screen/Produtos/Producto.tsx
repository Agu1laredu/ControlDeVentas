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
  width: 200px;
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

interface Product {
  id: number;
  name: string;
  price: number;
  Talle: string;
}

class ProductManager {
  private products: Product[];
  private nextId: number;

  constructor() {
    this.products = [];
    this.nextId = 1;
  }

  saveProductsToLocalStorage(): void {
    localStorage.setItem("products", JSON.stringify(this.products));
  }

  loadProductsFromLocalStorage(): void {
    const productsData = localStorage.getItem("products");
    if (productsData) {
      this.products = JSON.parse(productsData);
      this.nextId =
        this.products.reduce(
          (maxId, product) => Math.max(maxId, product.id),
          0
        ) + 1;
    }
  }

  // Agregar un nuevo producto
  addProduct(name: string, price: number, Talle: string): void {
    const newProduct: Product = {
      id: this.nextId,
      name,
      price,
      Talle,
    };

    this.products.push(newProduct);
    this.nextId++;
  }

  // Editar un producto existente por ID
  editProduct(id: number, name: string, price: number, Talle: string): void {
    const index = this.products.findIndex((product) => product.id === id);

    if (index !== -1) {
      this.products[index].name = name;
      this.products[index].price = price;
      this.products[index].Talle = Talle;
    } else {
      console.log("Producto no encontrado");
    }
  }

  // Eliminar un producto existente por ID
  deleteProduct(id: number): void {
    this.products = this.products.filter((product) => product.id !== id);
  }

  // Obtener todos los productos
  getProducts(): Product[] {
    return this.products;
  }
}

function Productos() {
  const [productList, setProductList] = useState<Product[]>([]);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0); // Estado para el precio total
  const productManager = new ProductManager();

  useEffect(() => {
    productManager.loadProductsFromLocalStorage();
    setProductList(productManager.getProducts());
    updateTotalPrice();
  }, []);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const name = formData.get("name") as string;
      const price = parseFloat(formData.get("price") as string);
      const Talle = formData.get("Talle") as string;

      const result = await client.from("Products").insert([
        {
          name,
          price,
          Talle,
        },
      ]);

      console.log(result);

      productManager.addProduct(name, price, Talle);
      productManager.saveProductsToLocalStorage();
      const updatedProductList = [
        ...productList,
        productManager.getProducts()[productManager.getProducts().length - 1],
      ]; // Agrega el último producto agregado a la lista actual
      setProductList(updatedProductList);
      updateTotalPrice();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      // Elimina el producto de la base de datos de Supabase
      const result = await client.from("Products").delete().eq("id", id);

      console.log(result);

      // Elimina el producto localmente
      productManager.deleteProduct(id);
      productManager.saveProductsToLocalStorage();
      const updatedProductList = productList.filter(
        (product) => product.id !== id
      );
      setProductList(updatedProductList);
      updateTotalPrice();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // Función para editar un producto
  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product);
  };

  // Función para actualizar el precio total
  const updateTotalPrice = () => {
    const total = productManager
      .getProducts()
      .reduce((acc, product) => acc + product.price, 0);
    setTotalPrice(total);
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
        <h1>PRODUCTOS</h1>

        {/* Formulario para agregar/editar productos */}
        <Formproduct onSubmit={handleFormSubmit}>
          <div style={{ textAlign: "center", margin: "auto 2px" }}>
            <label htmlFor="name">
              <b style={{ fontSize: 20, fontWeight: "bold" }}> Producto :</b>
            </label>
            <input
              type="text"
              name="name"
              defaultValue={currentProduct?.name ?? ""}
              required
            />
          </div>

          <div style={{ textAlign: "center", margin: "auto 2px" }}>
            <label htmlFor="Talle">
              <b style={{ fontSize: 20, fontWeight: "bold" }}> Talle :</b>
            </label>
            <input
              type="text"
              name="Talle"
              defaultValue={currentProduct?.Talle ?? ""}
              required
            />
          </div>
          <div style={{ textAlign: "center", margin: "auto 2px" }}>
            <label htmlFor="price">
              <b style={{ fontSize: 20, fontWeight: "bold" }}> Precio :</b>
            </label>
            <input
              type="number"
              name="price"
              step="0.01"
              defaultValue={currentProduct?.price ?? ""}
              required
            />
          </div>

          <ButtonEditar className="ButtonEditar" type="submit">
            {currentProduct ? "Editar Producto" : "Agregar Producto"}
          </ButtonEditar>
        </Formproduct>

        {/* Mostrar los productos agregados */}
        {productList.map((product) => (
          <TablaContainer key={product.id}>
            <tr key={product.id}></tr>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <td>{product.name}</td>
                  <td>{product.Talle}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <tr>
                    <td colSpan={2}>Total:</td>
                    <td>${totalPrice.toFixed(2)}</td>
                  </tr>
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

export default Productos;
