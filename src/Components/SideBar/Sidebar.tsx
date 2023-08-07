import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../../assets/LogoVentas.png";
import "./Sidebar.css";

import { Link } from "react-router-dom";

function BasicExample() {
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
            <Link to={`/Produtos`} className="Links">
              Productos
            </Link>
            <Link to={`/Clientes`} className="Links">
              Clientes
            </Link>
            <Link to={`/Ventas`} className="Links">
              Ventas
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
