import React, { useState, useEffect, FormEvent } from "react";
import { client } from "../../supabase/client.tsx";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/LogoVentas.png";

import styled from "styled-components";
interface ButtonProps {
  type?: "button" | "submit" | "reset"; // Esto permite que la prop 'type' sea opcional y solo acepte ciertos valores
  children: React.ReactNode;
  // Otras propiedades que pueda tener tu botón
}

const Banner = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  height: 98%;
  width: 50%;
  background-color: #1a1a1c; /* Corregido typo backgroundcolor a backgroundColor */
  border-radius: 5px;
  border: 1px solid black;
  background: rgb(81, 74, 175);
  background: linear-gradient(
    90deg,
    rgba(81, 74, 175, 1) 0%,
    rgba(61, 58, 105, 1) 100%,
    rgba(157, 166, 47, 1) 100%,
    rgba(236, 255, 0, 1) 100%,
    rgba(176, 31, 31, 1) 100%
  );
`;

const Tittle = styled.h4`
  text-align: center;
  margin-top: 50%;
  font-family: Bolder; /* Corregido typo font-family a fontFamily */
  font-size: 100px;
  color: white;
`;

const Imagen = styled.img`
  position: relative;
  z-index: 3;
  left: 1100px;
  width: 100%;
`;
const Formulario = styled.form`
  display: grid;
  margin: 30px auto;
  width: 50%;
  height: 20%;
  align-content: center; /* Corregido typo aligncontent a align-content */
`;

const InputLogins = styled.input`
  width: 98%;
  margin: 5px;
  height: 50px;
`;
const Button = styled.button`
  margin-left: 100px;
  border-radius: 8px;
  width: 200px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #646cff;
  cursor: pointer;
  transition: border-color 0.25s;

  :hover {
    border-color: #646cff;
  }
  :focus,
  :focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }
  @media (max-width: 700px) {
    width: 100%;
    margin: auto;
    position: relative;
    left: -50%;
    top: 20%;
  }
`;

function Buutton({ type = "button", children, ...otherProps }: ButtonProps) {
  return (
    <Button type={type} {...otherProps}>
      {children}
    </Button>
  );
}
function Login(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores
  const navigate = useNavigate();

  const registerUser = async (email: string, password: string) => {
    try {
      const { data, error } = await client.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    } catch (error) {
      console.error(error);
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
        <Imagen src={Logo} alt="Logo" />
      </div>
      <Banner>
        <Formulario onSubmit={handleSubmit}>
          <Tittle>LOGIN</Tittle>
          <InputLogins
            type="email"
            name="email"
            id=""
            placeholder="ingresatuemail@hotmail.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <InputLogins
            type="password"
            name="password"
            id=""
            placeholder="Contraseña"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {error && (
            <p style={{ color: "red", textAlign: "center" }}>{error}</p>
          )}
          <Buutton type="submit">Enviar</Buutton>
          {/* Corregido el botón para que funcione el envío del formulario */}
        </Formulario>
      </Banner>
    </div>
  );
}

export default Login;
