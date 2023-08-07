import Sidebar from "../../Components/SideBar/Sidebar.tsx";
import "bootstrap/dist/css/bootstrap.min.css";

function Clientes() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <section>
        <h1>Clientes</h1>
      </section>
    </div>
  );
}

export default Clientes;
