/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Sidebar from "../../Components/SideBar/Sidebar";
import Table from "react-bootstrap/Table";
import Button from "../../Components/Button/Button";
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
const Loading = styled.div`
  background-color: #646cff;
  width: 30%;
  margin: auto;
  height: 30%;
  border-radius: 50%;
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
  const [isLoading, setIsLoading] = useState<boolean>(true); // Agregar estado para controlar la carga
  const clientsManager = new ClientsManager();

  useEffect(() => {
    async function fetchData() {
      try {
        // Obtener datos de clientes desde Supabase
        const clientsResponse = await client.from("Clients").select("*");
        if (!clientsResponse.error) {
          setClientList(clientsResponse.data);
        }
        setIsLoading(false); // Cambiar el estado de carga a falso una vez que se carguen los datos
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
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
  // Función para eliminar un cliente
  const handleDeleteProduct = async (id: number) => {
    try {
      // Elimina el cliente de la base de datos de Supabase
      const { error } = await client.from("Clients").delete().eq("id", id);

      if (!error) {
        // Elimina el cliente localmente
        clientsManager.deleteClient(id);
        clientsManager.saveClientsToLocalStorage();

        // Actualiza la lista de clientes excluyendo el cliente eliminado
        const updatedClientList = clientList.filter(
          (client) => client.id !== id
        );
        setClientList(updatedClientList);
      } else {
        console.error("Error deleting client:", error);
      }
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  // Función para editar un cliente
  const handleEditClient = async (clientData: Clients) => {
    try {
      // Actualiza el cliente en la base de datos de Supabase
      const { error } = await client.from("Clients").upsert([clientData]);

      if (!error) {
        // Actualiza el cliente localmente
        clientsManager.editClient(
          clientData.id,
          clientData.LastName,
          clientData.Apellido,
          clientData.Telefono
        );
        clientsManager.saveClientsToLocalStorage();

        // Actualiza la lista de clientes
        const updatedClientList = clientList.map((c) =>
          c.id === clientData.id ? clientData : c
        );
        setClientList(updatedClientList);
        setCurrentClient(null);
      } else {
        console.error("Error updating client:", error);
      }
    } catch (error) {
      console.error("Error updating client:", error);
    }
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
              <b style={{ fontSize: 20, fontFamily: "Bold" }}> Nombre : </b>
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
              <b style={{ fontSize: 20, fontFamily: "Bold" }}> Apellido : </b>
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
              <b style={{ fontSize: 20, fontFamily: "Bold" }}> Telefono : </b>
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
          clientList.map((clients) => (
            <TablaContainer key={clients.id}>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Cliente</th>
                    <th>Producto</th>
                    <th>Cantidad</th>
                  </tr>
                  <tr>
                    <th>#</th>
                    <td
                      style={{
                        width: "100px",
                        fontSize: 20,
                        fontFamily: "Bold",
                      }}
                    >
                      {clients.LastName}
                    </td>
                    <td
                      style={{
                        width: "100px",
                        fontSize: 20,
                        fontFamily: "Bold",
                      }}
                    >
                      {clients.Apellido}
                    </td>
                    <td
                      style={{
                        width: "100px",
                        fontSize: 20,
                        fontFamily: "Bold",
                      }}
                    >
                      {clients.Telefono}
                    </td>
                    <td>
                      <Button onClick={() => handleEditClient(clients)}>
                        Editar
                      </Button>
                      <Button onClick={() => handleDeleteProduct(clients.id)}>
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                </thead>
              </Table>
            </TablaContainer>
          ))
        )}
      </Section>
    </div>
  );
}

export default ClientsCode;
