import Container from "react-bootstrap/Container";
import styled from "styled-components";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../../assets/LogoVentas.png";
import { client } from "../../supabase/client";
import { useNavigate, Link } from "react-router-dom";

import "./Sidebar.css";

const ButtonLogout = styled.button`
  width: 110px;
  color: white;
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #646cff;
  cursor: pointer;
  transition: border-color 0.25s;

  :focus,
  :focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }
`;

function BasicExample() {
  const navigate = useNavigate();

  async function signOut() {
    try {
      const { error } = await client.auth.signOut();
      if (error) {
        throw error;
      }
      // Redirige al usuario a la página de inicio de sesión
      navigate("/login");
    } catch (error) {
      console.error("Error al hacer logout:", error);
    }
  }

  return (
    <Navbar className="Navbar">
      <Container style={{ display: "grid" }}>
        <Navbar.Brand id="Logo">
          <img src={Logo} alt="Logo" className="LogoImagen" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" style={{ display: "grid" }}>
            {" "}
            <Link to={`/`} className="Links">
              Inicio
            </Link>
            <Link to={`/productos`} className="Links">
              Productos
            </Link>
            <Link to={`/clientes`} className="Links">
              Clientes
            </Link>
            <Link to={`/ventas`} className="Links">
              Ventas
            </Link>
            <ButtonLogout onClick={signOut}>Logout</ButtonLogout>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
