import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../../Components/SideBar/Sidebar";
import Table from "react-bootstrap/Table";
import ButtonSend from "../../Components/Button/Button";
import styled from "styled-components";
import { client } from "../../supabase/client";
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

function VentasRealizadas() {
  const [productList, setProductList] = useState<Ventas[]>([]);
  const [currentProduct, setCurrentProduct] = useState<Ventas | null>(null);
  const [clients, setClients] = useState<Clients[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<string>("");
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const tableRef = useRef(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const clientsResponse = await client.from("Clients").select("*");
        if (!clientsResponse.error) {
          setClients(clientsResponse.data);
        }

        const productsResponse = await client.from("Products").select("*");
        if (!productsResponse.error) {
          setProducts(productsResponse.data);
        }

        const ventasResponse = await client.from("Ventas").select("*");
        if (!ventasResponse.error) {
          setProductList(ventasResponse.data);
        }

        setIsLoading(false);
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

    try {
      const result = await client.from("Ventas").insert([
        {
          cliente,
          producto,
          cantidad,
        },
      ]);

      console.log(result);

      if (result.data) {
        if (Array.isArray(result.data)) {
          setProductList([...productList, ...result.data]);
        } else {
          setProductList([...productList, result.data]);
        }
      }

      setCurrentProduct(null);
    } catch (error) {
      console.error("Error inserting sale:", error);
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

  const handleEditProduct = (product: Ventas) => {
    setCurrentProduct(product);
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    productList.forEach((product) => {
      const selectedProduct = products.find(
        (p) => p.id.toString() === product.producto
      );
      if (selectedProduct) {
        const price = selectedProduct.price * product.cantidad;
        totalPrice += price;
      }
    });
    return totalPrice;
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
              name="Cantidad"
              step="1"
              defaultValue={currentProduct?.cantidad ?? ""}
              required
            />
          </div>

          <ButtonEditar type="submit">
            {currentProduct ? "Editar Venta" : "Registrar Venta"}
          </ButtonEditar>
        </FormVenta>

        {isLoading ? (
          <div>
            <section style={{ margin: "100px auto", textAlign: "center" }}>
              <h4>CARGANDO DATOS</h4>
              <p>ESPERA UN MOMENTO</p>
            </section>
          </div>
        ) : (
          productList.length > 0 && (
            <TablaContainer>
              <Table striped bordered hover ref={tableRef} id="my-table">
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
                          <ButtonSend
                            onClick={() => handleEditProduct(product)}
                          >
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
              <div style={{ textAlign: "right", marginTop: "20px" }}>
                <strong>Total: ${calculateTotalPrice().toFixed(2)}</strong>
              </div>
            </TablaContainer>
          )
        )}
      </Section>
    </div>
  );
}

export default VentasRealizadas;
