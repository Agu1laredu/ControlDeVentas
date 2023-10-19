import Logo from "../../../assets/LogoVentas.png";
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
    width: "20%",
    height: "10%",
  },
});
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

interface PDFDocumentProps {
  productList: Ventas[];
  clients: Clients[];
  products: Product[];
}
const PDFDocument: React.FC<PDFDocumentProps> = ({
  productList,
  clients,
  products,
}) => {
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
    <PDFViewer width={600} height={400}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.table}>
            <Image src={Logo} style={styles.logo} />
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
              <View style={[styles.cell, styles.headerCell]}>
                <Text style={styles.text}>Fecha de Creación</Text>{" "}
                {/* Agregamos la columna de fecha */}
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
                    <Text style={styles.text}>{selectedClient?.LastName}</Text>
                  </View>
                  <View style={styles.cell}>
                    <Text style={styles.text}>{selectedProduct?.name}</Text>
                  </View>
                  <View style={styles.cell}>
                    <Text style={styles.text}>{product.cantidad}</Text>
                  </View>
                  <View style={styles.cell}>
                    <Text style={styles.text}>${totalPrice.toFixed(2)}</Text>
                  </View>
                  <View style={styles.cell}>
                    <Text style={styles.text}>
                      {new Date(product.created_at).toLocaleDateString()}{" "}
                      {/* Formatear la fecha */}
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
  );
};

export default PDFDocument;
