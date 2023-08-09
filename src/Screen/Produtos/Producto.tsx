/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/SideBar/Sidebar";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";

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
  const productManager = new ProductManager();

  useEffect(() => {
    productManager.loadProductsFromLocalStorage();
    setProductList(productManager.getProducts());
  }, []);

  // Función para manejar el envío del formulario de agregar/editar producto
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name") as string;
    const price = parseFloat(formData.get("price") as string);
    const Talle = formData.get("Talle") as string;

    if (currentProduct) {
      productManager.editProduct(currentProduct.id, name, price, Talle);
      setCurrentProduct(null);
    } else {
      productManager.addProduct(name, price, Talle);
    }

    productManager.saveProductsToLocalStorage(); // Guardamos los productos en el localStorage
    setProductList(productManager.getProducts());
  };

  // Función para eliminar un producto
  const handleDeleteProduct = (id: number) => {
    productManager.deleteProduct(id);
    productManager.saveProductsToLocalStorage(); // Guardamos los productos en el localStorage
    setProductList(productManager.getProducts());
  };

  // Función para editar un producto
  const handleEditProduct = (product: Product) => {
    setCurrentProduct(product);
  };

  // Función para obtener el total de precios de los productos agregados
  const getTotalPrice = () => {
    return productList.reduce((total, product) => total + product.price, 0);
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
        style={{ width: "110%", border: "2px solid #242527", padding: 50 }}
      >
        <h1>Productos</h1>

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

          <div style={{ textAlign: "center", margin: "auto 2px" }}>
            <label htmlFor="Talle">
              <b style={{ fontSize: 20, fontWeight: "bold" }}> Talle:</b>
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
              <b style={{ fontSize: 20, fontWeight: "bold" }}> Precio:</b>
            </label>
            <input
              type="number"
              name="price"
              step="0.01"
              defaultValue={currentProduct?.price ?? ""}
              required
            />
          </div>
          <button type="submit" style={{ marginLeft: 100 }}>
            {currentProduct ? "Editar Producto" : "Agregar Producto"}
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
                  <th>{product.Talle}</th>
                  <th>${product.price}</th>
                  <th>
                    <div style={{ display: "flex", justifyContent: "center" }}>
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

        {/* Mostrar el total de precios de los productos */}
        <div
          style={{
            textAlign: "center",
            margin: "200px auto",
            fontFamily: "Bolder",
          }}
        >
          <h2>
            Total de precios:
            <span style={{ color: "green" }}>${getTotalPrice()}</span>
          </h2>
        </div>
      </section>
    </div>
  );
}

export default Productos;
