import React from "react";
import Table from "react-bootstrap/Table";
import Button from "../../../Components/Button/Button";

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

interface SalesTableProps {
  sales: Ventas[]; // Reemplaza con la definición de Ventas
  clients: Clients[]; // Reemplaza con la definición de Clients
  products: Product[]; // Reemplaza con la definición de Product
  onEditProduct: (product: Ventas) => void;
  onDeleteProduct: (id: number) => void;
}

const SalesTable: React.FC<SalesTableProps> = ({
  sales,
  clients,
  products,
  onEditProduct,
  onDeleteProduct,
}) => {
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    sales.forEach((product) => {
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
    <Table striped bordered hover>
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
        {sales.map((product) => {
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
              <td
                style={{
                  width: "100px",
                  fontSize: 20,
                  fontFamily: "Bold",
                }}
              >
                {product.id}
              </td>
              <td
                style={{
                  width: "100px",
                  fontSize: 20,
                  fontFamily: "Bold",
                }}
              >
                {selectedClient?.LastName}
              </td>
              <td
                style={{
                  fontSize: 20,
                  fontFamily: "Bold",
                }}
              >
                {selectedProduct?.name}
              </td>
              <td
                style={{
                  fontSize: 20,
                  fontFamily: "Bold",
                }}
              >
                {product.cantidad}
              </td>
              <td
                style={{
                  fontSize: 20,
                  fontFamily: "Bold",
                  color: "green",
                }}
              >
                ${totalPrice.toFixed(2)}
              </td>
              <td>
                <Button onClick={() => onEditProduct(product)}>Editar</Button>
                <Button
                  onClick={() => onDeleteProduct(product.id)}
                  key={`delete-${product.id}`}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
      <b
        style={{
          position: "absolute",
          fontSize: 30,
          right: "10%",
          bottom: "15%",
        }}
      >
        Total: ${" "}
        <span style={{ color: "green" }}>
          {calculateTotalPrice().toFixed(2)}
        </span>
      </b>
    </Table>
  );
};

export default SalesTable;
