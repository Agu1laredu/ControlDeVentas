/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/SideBar/Sidebar";
import Table from "react-bootstrap/Table";
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

interface Clients {
  id: number;
  LastName: string;
  Apellido: string;
  Telefono: number;
}

class ClientsManager {
  private clients: Clients[];
  private nextId: number;

  constructor() {
    this.clients = [];
    this.nextId = 1;
  }

  saveClientsToLocalStorage(): void {
    localStorage.setItem("Clients", JSON.stringify(this.clients));
  }

  loadClientsFromLocalStorage(): void {
    const clientsData = localStorage.getItem("Clients");
    if (clientsData) {
      this.clients = JSON.parse(clientsData);
      this.nextId =
        this.clients.reduce(
          (maxId, clients) => Math.max(maxId, clients.id),
          0
        ) + 1;
    }
  }

  // Agregar un nuevo producto
  addProduct(LastName: string, Apellido: string, Telefono: number): void {
    const newProduct: Clients = {
      id: this.nextId,
      LastName,
      Apellido,
      Telefono,
    };

    this.clients.push(newProduct);
    this.nextId++;
  }

  // Editar un producto existente por ID
  editProduct(
    id: number,
    LastName: string,
    Apellido: string,
    Telefono: number
  ): void {
    const index = this.clients.findIndex((clients) => clients.id === id);

    if (index !== -1) {
      this.clients[index].LastName = LastName;
      this.clients[index].Apellido = Apellido;
      this.clients[index].Telefono = Telefono;
    } else {
      console.log("Clients no encontrado");
    }
  }

  // Eliminar un producto existente por ID
  deleteProduct(id: number): void {
    this.clients = this.clients.filter((clients) => clients.id !== id);
  }

  // Obtener todos los productos
  getProducts(): Clients[] {
    return this.clients;
  }
}

function ClientsCode() {
  const [clientList, setClientList] = useState<Clients[]>([]);
  const [currentClient, setCurrentClient] = useState<Clients | null>(null);
  const clientsManager = new ClientsManager();

  useEffect(() => {
    clientsManager.loadClientsFromLocalStorage();
    setClientList(clientsManager.getProducts());
  }, []);

  // Función para manejar el envío del formulario de agregar/editar producto
  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const LastName = formData.get("LastName") as string;
    const Apellido = formData.get("Apellido") as string;
    const Telefono = parseFloat(formData.get("Telefono") as string);

    if (currentClient) {
      clientsManager.editProduct(
        currentClient.id,
        LastName,
        Apellido,
        Telefono
      );
      setCurrentClient(null);
    } else {
      clientsManager.addProduct(LastName, Apellido, Telefono);
    }

    clientsManager.saveClientsToLocalStorage(); // Guardamos los productos en el localStorage
    setClientList(clientsManager.getProducts());
  };

  // Función para eliminar un producto
  const handleDeleteProduct = (id: number) => {
    clientsManager.deleteProduct(id);
    clientsManager.saveClientsToLocalStorage(); // Guardamos los productos en el localStorage
    setClientList(clientsManager.getProducts());
  };

  // Función para editar un producto
  const handleEditProduct = (clients: Clients) => {
    setCurrentClient(clients);
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
        <h1> CLIENTES</h1>

        {/* Formulario para agregar/editar productos */}
        <Formproduct onSubmit={handleFormSubmit}>
          <div style={{ textAlign: "center", margin: "auto 2px" }}>
            <label htmlFor="LastName">
              <b style={{ fontSize: 20, fontWeight: "bold" }}> Nombre : </b>
            </label>
            <input
              type="text"
              name="LastName"
              defaultValue={currentClient?.LastName ?? ""}
              required
            />
          </div>

          <div style={{ textAlign: "center", margin: "auto 2px" }}>
            <label htmlFor="Apellido">
              <b style={{ fontSize: 20, fontWeight: "bold" }}> Apellido : </b>
            </label>
            <input
              type="text"
              name="Apellido"
              defaultValue={currentClient?.Apellido ?? ""}
              required
            />
          </div>
          <div style={{ textAlign: "center", margin: "auto 2px" }}>
            <label htmlFor="Telefono">
              <b style={{ fontSize: 20, fontWeight: "bold" }}> Telefono : </b>
            </label>
            <input
              type="number"
              name="Telefono"
              step="0.01"
              defaultValue={currentClient?.Telefono ?? ""}
              required
            />
          </div>
          <ButtonEditar type="submit">
            {currentClient ? "Editar Cliente" : "Agregar Cliente"}
          </ButtonEditar>
        </Formproduct>

        {/* Mostrar los productos agregados */}
        {clientList.map((clients) => (
          <TablaContainer key={clients.id}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>{clients.LastName}</th>
                  <th>{clients.Apellido}</th>
                  <th>{clients.Telefono}</th>
                  <th>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <ButtonSend onClick={() => handleEditProduct(clients)}>
                        Editar
                      </ButtonSend>
                      <ButtonSend
                        onClick={() => handleDeleteProduct(clients.id)}
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

export default ClientsCode;
