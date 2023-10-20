/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { client } from "../../supabase/client";

import Sidebar from "../../Components/SideBar/Sidebar";
import styled from "styled-components";
import useForceUpdate from "./Components/forceUpdate";
import PDFDocument from "./Components/PDFDocument";
import Table from "./Components/Table";
import Button from "../../Components/Button/Button";

import "bootstrap/dist/css/bootstrap.min.css";

const FormVenta = styled.form`
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
const ButtonCerraPDF = styled.button`
  position: relative;
  border: 1px solid black;
  top: 50px;
  left: 50%;
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

const Loading = styled.div`
  background-color: #646cff;
  width: 30%;
  margin: auto;
  height: 30%;
  border-radius: 50%;
`;

const Modaloverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7); /* Fondo semitransparente */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* Coloca el modal encima del contenido */
`;

const Modaloverlay2 = styled.div`
  padding: 20px;
  position: relative;
  left: -5%;
  border-radius: 10px;
  position: relative;
  z-index: 1001;
`;

interface Ventas {
  id: number;
  cliente: string;
  producto: string;
  cantidad: number;
  price: number; // Agregamos la columna "price"
  created_at: string; // Agregamos la columna "created_at"
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

function VentasRealizadas() {
  const [productList, setProductList] = useState<Ventas[]>([]);
  const [currentProduct, setCurrentProduct] = useState<Ventas | null>(null);
  const [clients, setClients] = useState<Clients[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<string>("");
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  const forceUpdate = useForceUpdate();

  const fetchVentas = async () => {
    try {
      const ventasResponse = await client.from("Ventas").select("*");
      if (!ventasResponse.error) {
        setProductList(ventasResponse.data);
        forceUpdate();
      }
    } catch (error) {
      console.error("Error fetching ventas:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientsResponse = await client.from("Clients").select("*");
        if (!clientsResponse.error) {
          setClients(clientsResponse.data);
        }

        const productsResponse = await client.from("Products").select("*");
        if (!productsResponse.error) {
          setProducts(productsResponse.data);
        }

        await fetchVentas();

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const cliente = String(formData.get("cliente"));
    const cantidad = parseFloat(String(formData.get("Cantidad")));
    const producto = String(formData.get("producto"));

    const selectedProduct = products.find((p) => p.id.toString() === producto);

    if (selectedProduct) {
      const totalPrice = selectedProduct.price * cantidad;
      try {
        const result = await client.from("Ventas").insert([
          {
            cliente,
            producto,
            cantidad,
            price: totalPrice,
          },
        ]);

        console.log(result);

        if (result.data) {
          if (Array.isArray(result.data)) {
            const updatedProducts = (result.data as Ventas[]).map((item) => ({
              ...item,
              price: selectedProduct.price * item.cantidad,
            }));
            setProductList([...productList, ...updatedProducts]);
          } else {
            const newItem = {
              ...(result.data as Ventas),
              price: selectedProduct.price * (result.data as Ventas).cantidad,
            };
            setProductList([...productList, newItem]);
          }
        }

        setCurrentProduct(null);
      } catch (error) {
        console.error("Error inserting sale:", error);
      }
    }
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      const { error } = await client.from("Ventas").delete().eq("id", id);

      if (!error) {
        setProductList((prevList) =>
          prevList.filter((venta) => venta.id !== id)
        );
      } else {
        console.error("Error deleting sale:", error);
      }
    } catch (error) {
      console.error("Error deleting sale:", error);
    }
  };

  // Manejador para abrir el modal del PDF
  const openPdfModal = () => {
    setIsPdfModalOpen(true);
  };

  // Manejador para cerrar el modal del PDF
  const closePdfModal = () => {
    setIsPdfModalOpen(false);
  };

  // Nuevo botón para abrir el modal del PDF
  const openPdfButton = <Button onClick={openPdfModal}>Ver PDF</Button>;

  return (
    <div
      style={{
        display: "flex",
        margin: "auto 20px",
      }}
    >
      <Sidebar />

      <Section>
        <h1 style={{ fontFamily: "Bold" }}>VENTAS</h1>
        <FormVenta onSubmit={handleFormSubmit}>
          <div style={{ textAlign: "center", margin: "auto 2px" }}>
            <select
              name="cliente"
              required
              value={selectedClientId}
              onChange={(e) => setSelectedClientId(e.target.value)}
            >
              <option value="">Seleccione un cliente</option>
              {clients.map((client) => (
                <option
                  style={{ fontFamily: "Bold", fontSize: 20, margin: "auto" }}
                  key={client.id}
                  value={client.id.toString()}
                >
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
                <option
                  style={{ fontFamily: "Bold", fontSize: 20, margin: "auto" }}
                  key={product.id}
                  value={product.id.toString()}
                >
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ textAlign: "center", margin: "auto 2px" }}>
            <label htmlFor="cantidad" style={{ fontFamily: "Bold" }}>
              Cantidad:
            </label>
            <input
              style={{ fontFamily: "Bold", fontSize: 20, margin: "auto" }}
              type="number"
              name="Cantidad"
              step="1"
              defaultValue={currentProduct?.cantidad ?? ""}
              required
            />
          </div>

          <div>
            <ButtonEditar type="submit">
              {currentProduct ? "Editar Venta" : "Registrar Venta"}
            </ButtonEditar>
          </div>
          {/* Botón para abrir el modal del PDF */}
          {openPdfButton}
        </FormVenta>
        {isPdfModalOpen && (
          <Modaloverlay className="pdf-modal-overlay">
            <Modaloverlay2 className="pdf-modal">
              <ButtonCerraPDF onClick={closePdfModal}>
                Cerrar PDF
              </ButtonCerraPDF>
              <PDFDocument
                productList={productList}
                clients={clients}
                products={products}
              />
            </Modaloverlay2>
          </Modaloverlay>
        )}
        {isLoading ? (
          <Loading>
            <h4
              style={{
                textAlign: "center",
                paddingTop: 60,
                fontSize: 40,
                fontFamily: "Bold",
              }}
            >
              CARGANDO DATOS
            </h4>
            <p
              style={{ textAlign: "center", fontSize: 20, fontFamily: "Bold" }}
            >
              ESPERA UN MOMENTO
            </p>
          </Loading>
        ) : (
          <Table
            sales={productList}
            clients={clients}
            products={products}
            onEditProduct={setCurrentProduct}
            onDeleteProduct={handleDeleteProduct}
          />
        )}
      </Section>
    </div>
  );
}

export default VentasRealizadas;
