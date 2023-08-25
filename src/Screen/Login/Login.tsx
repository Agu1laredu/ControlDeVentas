import { useState, useEffect, FormEvent } from "react";
import { client } from "../../supabase/client.tsx";
import { useNavigate } from "react-router-dom";

import Logo from "../../assets/LogoVentas.png";

import "./Login.css";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores
  const navigate = useNavigate();

  const registerUser = async (email: string, password: string) => {
    const { error } = await client.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw error;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // Llama a la función de registro de usuario
      await registerUser(email, password);

      // Registro exitoso, redirige al usuario a la página de inicio
      navigate("/"); // Cambia la redirección según tus necesidades
    } catch (error) {
      setError("Error al registrar usuario. Verifica tus credenciales."); // Maneja el error
    }
  };

  useEffect(() => {
    const checkUser = async () => {
      const user = await client.auth.getUser();

      if (!user) {
        navigate("/"); // Usuario autenticado, redirigir a la página de inicio
      } else {
        navigate("/Login");
      }
    };

    checkUser();
  }, [navigate]);

  return (
    <div style={{ display: "flex" }}>
      <div>
        <img
          style={{
            position: "relative",
            zIndex: 3,
            left: 1100,
            width: "100%",
          }}
          src={Logo}
          alt=""
        />
      </div>
      <div
        className="Banner"
        style={{
          position: "absolute",
          top: "10px",
          height: "98%",
          width: "50%",
          backgroundColor: "#1a1a1c",
          borderRadius: "5px",
          border: "1px solid black",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            display: "grid",
            margin: " 30px auto",
            width: "50%",
            height: "20%",
            alignContent: "center",
          }}
        >
          <h4
            style={{
              textAlign: "center",
              marginTop: "100%",
              fontFamily: "Bolder",
              fontSize: 100,
              color: "white",
            }}
          >
            LOGIN
          </h4>
          <input
            type="email"
            name="email"
            id=""
            placeholder="ingresatuemail@hotmail.com"
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "98%",
              margin: " 50px 5px",
              height: "50px",
            }}
            value={email}
          />
          <input
            type="password"
            name="password"
            id=""
            placeholder="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "98%",
              margin: " 5px",
              height: "50px",
            }}
            value={password}
          />
          {error && (
            <p style={{ color: "red", textAlign: "center" }}>{error}</p>
          )}
          <button
            type="submit"
            style={{
              width: "100%",
              margin: " 20px auto",
            }}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
