import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../../Components/SideBar/Sidebar";
import Table from "react-bootstrap/Table";
import ButtonSend from "../../Components/Button/Button";
import styled from "styled-components";
import useForceUpdate from "./Components/forceUpdate";
import Logo from "../../assets/LogoVentas.png";
import { client } from "../../supabase/client";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  PDFViewer,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
    padding: 10,
  },
  table: {
    display: "flex",
    width: "200%",
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    flex: 1,
    padding: 5,
    borderStyle: "solid",
    borderColor: "#000",
    borderWidth: 1,
  },
  headerCell: {
    backgroundColor: "#646cff",
    color: "#fff",
    fontWeight: "bold",
  },
  text: {
    fontSize: 12,
  },
  logo: {
    position: "relative",
    top: "10px",
    left: "10px",
    backgroundSize: "cover",
    width: "20%", // Ancho de la imagen
    height: "10%",
    // Altura de la imagen
  },
});

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

const Loading = styled.div`
  background-color: #646cff;
  width: 30%;
  margin: auto;
  height: 30%;
  border-radius: 50%;
`;

interface Ventas {
  id: number;
  cliente: string;
  producto: string;
  cantidad: number;
  price: number; // Agregamos la columna "price"
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

  const forceUpdate = useForceUpdate(); // Importa useForceUpdate de alguna fuente o crea tu propia función

  const fetchVentas = async () => {
    try {
      const ventasResponse = await client.from("Ventas").select("*");
      if (!ventasResponse.error) {
        setProductList(ventasResponse.data);
        forceUpdate(); // Forzar actualización
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

        await fetchVentas(); // Cargar ventas al inicio

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const cliente = String(formData.get("cliente"));
    const cantidad = parseFloat(String(formData.get("Cantidad")));
    const producto = String(formData.get("producto"));

    // Buscar el producto seleccionado
    const selectedProduct = products.find((p) => p.id.toString() === producto);

    if (selectedProduct) {
      const totalPrice = selectedProduct.price * cantidad;
      try {
        const result = await client.from("Ventas").insert([
          {
            cliente,
            producto,
            cantidad,
            price: totalPrice, // Almacenar el precio total
          },
        ]);

        console.log(result);

        if (result.data) {
          if (Array.isArray(result.data)) {
            // Asegurarse de que cada elemento de la lista tenga un precio definido
            (result.data as Ventas[]).forEach((item) => {
              item.price = selectedProduct.price * item.cantidad;
            });

            setProductList([...productList, ...(result.data as Ventas[])]);
          } else {
            // Asegurarse de que el elemento tenga un precio definido
            (result.data as Ventas).price =
              selectedProduct.price * (result.data as Ventas).cantidad;

            setProductList([...productList, result.data as Ventas]);
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

          <ButtonEditar type="submit">
            {currentProduct ? "Editar Venta" : "Registrar Venta"}
          </ButtonEditar>
        </FormVenta>

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
                        <td style={{ fontFamily: "Bold" }}>{product.id}</td>
                        <td style={{ fontFamily: "Bold" }}>
                          {selectedClient?.LastName}
                        </td>
                        <td style={{ fontFamily: "Bold" }}>
                          {selectedProduct?.name}
                        </td>
                        <td style={{ fontFamily: "Bold" }}>
                          {product.cantidad}
                        </td>
                        <td style={{ fontFamily: "Bold" }}>
                          ${totalPrice.toFixed(2)}
                        </td>
                        <th>
                          <div
                            className="ContainerItem"
                            style={{
                              position: "relative",
                              left: "20%",
                              width: "300px",
                              display: "flex",
                            }}
                          >
                            <ButtonSend
                              onClick={() => handleEditProduct(product)}
                            >
                              Editar
                            </ButtonSend>
                            <ButtonSend
                              onClick={() => handleDeleteProduct(product.id)}
                              key={`delete-${product.id}`}
                            >
                              Eliminar
                            </ButtonSend>
                          </div>
                        </th>
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
        <div>
          <PDFViewer width={600} height={400}>
            <Document>
              <Page size="A4" style={styles.page}>
                <View style={styles.table}>
                  <Image
                    src={Logo} // Reemplaza con la ruta de tu imagen
                    style={styles.logo}
                  />
                  <Text
                    style={{
                      textAlign: "center",
                      margin: "auto",
                      top: "-40px",
                      left: "-175px",
                      position: "relative",
                    }}
                  >
                    CONTROL DE VENTAS
                  </Text>
                  <View style={styles.row}>
                    <View style={[styles.cell, styles.headerCell]}>
                      <Text style={styles.text}>#</Text>
                    </View>
                    <View style={[styles.cell, styles.headerCell]}>
                      <Text style={styles.text}>Cliente</Text>
                    </View>
                    <View style={[styles.cell, styles.headerCell]}>
                      <Text style={styles.text}>Producto</Text>
                    </View>
                    <View style={[styles.cell, styles.headerCell]}>
                      <Text style={styles.text}>Cantidad</Text>
                    </View>
                    <View style={[styles.cell, styles.headerCell]}>
                      <Text style={styles.text}>Precio de Venta</Text>
                    </View>
                  </View>
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
                      <View style={styles.row} key={product.id}>
                        <View style={styles.cell}>
                          <Text style={styles.text}>{product.id}</Text>
                        </View>
                        <View style={styles.cell}>
                          <Text style={styles.text}>
                            {selectedClient?.LastName}
                          </Text>
                        </View>
                        <View style={styles.cell}>
                          <Text style={styles.text}>
                            {selectedProduct?.name}
                          </Text>
                        </View>
                        <View style={styles.cell}>
                          <Text style={styles.text}>{product.cantidad}</Text>
                        </View>
                        <View style={styles.cell}>
                          <Text style={styles.text}>
                            ${totalPrice.toFixed(2)}
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                  <View style={styles.cell}>
                    <Text style={{ marginTop: "20px", marginBottom: "20px" }}>
                      Total: ${calculateTotalPrice().toFixed(2)}
                    </Text>
                  </View>
                </View>
              </Page>
            </Document>
          </PDFViewer>
        </div>
      </Section>
    </div>
  );
}

export default VentasRealizadas;
