import Sidebar from "../../Components/SideBar/Sidebar.tsx";
import "bootstrap/dist/css/bootstrap.min.css";

function Productos() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <section>
        <h1>Productos</h1>
      </section>
    </div>
  );
}

export default Productos;
