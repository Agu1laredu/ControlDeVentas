import { useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { client } from "./supabase/client";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthState = async () => {
      const session = client.auth.getSession();
      if (!session) {
        navigate("/login");
      } else {
        navigate("/");
      }
    };

    checkAuthState();
  }, [navigate]);

  return null; // Renderiza un componente vacío o puedes renderizar un spinner de carga si lo deseas
}

export default App;
