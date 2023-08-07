import Sidebar from "../../Components/SideBar/Sidebar.tsx";
import "bootstrap/dist/css/bootstrap.min.css";

function Ventas() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <section>
        <h1>Ventas</h1>
      </section>
    </div>
  );
}

export default Ventas;
