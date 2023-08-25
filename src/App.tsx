import { useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Screen/Login/Login";
import { client } from "./supabase/client";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    client.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/login");
      } else {
        navigate("/");
      }
    });
  }, [navigate]);

  return (
    <div style={{ display: "flex" }}>
      <Login />
    </div>
  );
}

export default App;
