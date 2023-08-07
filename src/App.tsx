import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./Components/SideBar/Sidebar.tsx";
import Home from "./Screen/Home/Home.tsx";

function App() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <Home />
    </div>
  );
}

export default App;
