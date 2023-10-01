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
  width: 70vw;
  border-radius: 15px;
  @media (max-width: 1280px) {
    width: 75vw;
  }
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
    this.loadClientsFromLocalStorage();
  }

  saveClientsToLocalStorage(): void {
    localStorage.setItem("Clients", JSON.stringify(this.clients));
  }

  loadClientsFromLocalStorage(): void {
    const clientsData = localStorage.getItem("Clients");
    if (clientsData) {
      this.clients = JSON.parse(clientsData);
      this.nextId =
        this.clients.reduce((maxId, client) => Math.max(maxId, client.id), 0) +
        1;
    }
  }

  // Agregar un nuevo cliente
  addClient(LastName: string, Apellido: string, Telefono: number): void {
    const newClient: Clients = {
      id: this.nextId,
      LastName,
      Apellido,
      Telefono,
    };

    this.clients.push(newClient);
    this.nextId++;
    this.saveClientsToLocalStorage();
  }

  // Editar un cliente existente por ID
  editClient(
    id: number,
    LastName: string,
    Apellido: string,
    Telefono: number
  ): void {
    const index = this.clients.findIndex((client) => client.id === id);

    if (index !== -1) {
      this.clients[index].LastName = LastName;
      this.clients[index].Apellido = Apellido;
      this.clients[index].Telefono = Telefono;
      this.saveClientsToLocalStorage();
    } else {
      console.log("Cliente no encontrado");
    }
  }

  // Eliminar un cliente existente por ID
  deleteClient(id: number): void {
    this.clients = this.clients.filter((client) => client.id !== id);
    this.saveClientsToLocalStorage();
  }

  // Obtener todos los clientes
  getClients(): Clients[] {
    return this.clients;
  }
}

function ClientsCode() {
  const [clientList, setClientList] = useState<Clients[]>([]);
  const [currentClient, setCurrentClient] = useState<Clients | null>(null);
  const clientsManager = new ClientsManager();

  useEffect(() => {
    clientsManager.loadClientsFromLocalStorage();
    setClientList(clientsManager.getClients());
  }, []);

  // Función para manejar el envío del formulario de agregar/editar producto
  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);
      const LastName = formData.get("LastName") as string;
      const Apellido = formData.get("Apellido") as string;
      const Telefono = parseFloat(formData.get("Telefono") as string);

      const result = await client.from("Clients").insert([
        {
          LastName,
          Apellido,
          Telefono,
        },
      ]);

      console.log(result);

      clientsManager.addClient(LastName, Apellido, Telefono);
      clientsManager.saveClientsToLocalStorage();
      const updateClientList = [
        ...clientList,
        clientsManager.getClients()[clientsManager.getClients().length - 1],
      ]; // Agrega el último producto agregado a la lista actual
      setClientList(updateClientList);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  // Función para eliminar un producto
  const handleDeleteProduct = async (id: number) => {
    try {
      // Elimina el producto de la base de datos de Supabase
      const result = await client.from("Clients").delete().eq("id", id);

      console.log(result);

      // Elimina el producto localmente
      clientsManager.deleteClient(id);
      clientsManager.saveClientsToLocalStorage();
      const updateClientList = clientList.filter((client) => client.id !== id);
      setClientList(updateClientList);
    } catch (error) {
      console.error(error);
      throw error;
    }
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
                  <td style={{ width: "100px", fontSize: 20 }}>
                    {clients.LastName}
                  </td>
                  <td style={{ width: "100px", fontSize: 20 }}>
                    {clients.Apellido}
                  </td>
                  <td style={{ width: "100px", fontSize: 20 }}>
                    {clients.Telefono}
                  </td>
                  <th>
                    <div
                      className="ContainerItem"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
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
