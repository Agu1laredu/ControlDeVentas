import React, { useState, FormEvent } from "react";
import { client } from "../../supabase/client.tsx";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/LogoVentas.png";

import styled from "styled-components";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
}

const Banner = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  height: 98%;
  width: 50%;
  background-color: #1a1a1c;
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

const Title = styled.h4`
  text-align: center;
  margin-top: 50%;
  font-family: "Bolder";
  font-size: 100px;
  color: white;
`;

const Image = styled.img`
  position: relative;
  z-index: 3;
  left: 1100px;
  width: 150%;
`;

const Form = styled.form`
  display: grid;
  margin: 30px auto;
  width: 100%;
  height: 50%;
  align-content: center;
`;

const InputLogin = styled.input`
  width: 50%;
  margin: 10px auto;
  height: 50px;
`;

const Button = styled.button`
  margin: 10px auto;
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

function ButtonComponent({
  type = "button",
  children,
  ...otherProps
}: ButtonProps) {
  return (
    <Button type={type} {...otherProps}>
      {children}
    </Button>
  );
}

function Login(): JSX.Element {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const registerUser = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      const { error } = await client.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }
      // Inserta al usuario en la tabla 'profiles'
      const { data, error: profileError } = await client
        .from("profiles")
        .upsert([{ name, email }], { onConflict: "email" });

      if (profileError) {
        throw new Error(profileError.message);
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
      await registerUser(name, email, password);

      // Registro exitoso, redirige al usuario a la página de inicio
      navigate("/"); // Cambia la redirección según tus necesidades
    } catch (error) {
      setError("Error al registrar usuario. Verifica tus credenciales.");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div>
        <Image src={Logo} alt="Logo" />
      </div>
      <Banner>
        <Form onSubmit={handleSubmit}>
          <Title>LOGIN</Title>
          <InputLogin
            type="text"
            name="name"
            id=""
            placeholder="Name "
            onChange={(e) => setName(e.target.value)}
          />

          <InputLogin
            type="email"
            name="email"
            id=""
            placeholder="Correo Electrónico"
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputLogin
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
          <ButtonComponent type="submit">Enviar</ButtonComponent>
        </Form>
      </Banner>
    </div>
  );
}

export default Login;
