import { useState, FormEvent } from "react";
import { client } from "../../supabase/client.js";
import Logo from "../../assets/LogoVentas.png";
import "./Login.css";
function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const { error } = await client.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      // El inicio de sesión fue exitoso, redirige al usuario a la página de inicio, por ejemplo.
      // Puedes agregar esta lógica aquí.
    } catch (error) {
      setError("Error al iniciar sesión. Verifica tus credenciales."); // Manejar el error
    }
  };

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
