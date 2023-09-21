import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "../../Components/SideBar/Sidebar";
import Card from "../../Components/Card/Card";
import Banner from "../../Components/Carousel/Banner";
import { client } from "../../supabase/client";

const Section = styled.section`
  height: 80vh;
  width: 80vw;
  margin-left: 100px;
  border-radius: 30px;

  @media (max-width: 700px) {
    margin-left: 20px;
  }
`;

const Title = styled.h1`
  text-align: center;
  margin: 30px;
  font-family: "Bolder";
`;

const CardContainer = styled.div`
  display: flex;

  @media (max-width: 700px) {
    display: grid;
  }
`;

const ButtonLogout = styled.button`
  position: absolute;
  left: 80%;
  top: 10%;
  width: 110px;
  color: white;
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: black;
  cursor: pointer;
  transition: border-color 0.25s;

  :hover {
    border-color: #646cff;
  }

  :focus,
  :focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }
`;

interface CardInfo {
  title: string;
  text: string;
  img: string;
}

function Home() {
  const navigate = useNavigate();

  const infoCard: CardInfo[] = [
    {
      title: "Buzos",
      text: "Buzos para emprendimientos y equipos de trabajo",
      img: "https://masonlineprod.vtexassets.com/arquivos/ids/233244/0779904806928-01-24412.jpg?v=637859709008930000",
    },
    {
      title: "Remeras",
      text: "Remeras a medida para emprendimientos",
      img: "https://cdnlaol.laanonimaonline.com/webapp_webp/images/fotos/b/0000049000/29655_2.webp",
    },
    {
      title: "Conjuntos",
      text: "Conjuntos a medida para emprendimientos",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShyK25f9M386bxb8X9OgLIAdoop_81qchqw5VQq_QF3iz1zEyQE0u-Z24pnFmag_RwmEA&usqp=CAU",
    },
    {
      title: "Abrigos",
      text: "Abrigos a medida sectores de trabajos",
      img: "https://d368r8jqz0fwvm.cloudfront.net/172-product_lg/campera-de-hombre-desmontable-3-x-1.jpg",
    },
  ];

  async function signOut() {
    try {
      const { error } = await client.auth.signOut();
      if (error) {
        throw error;
      }
      // Redirige al usuario a la página de inicio de sesión
      navigate("/Login");
    } catch (error) {
      console.error("Error al hacer logout:", error);
    }
  }

  return (
    <div style={{ display: "flex", gap: 5 }}>
      <Sidebar />
      <Section>
        <div style={{ display: "flex" }}>
          <Title>CONTROL DE VENTAS</Title>
          <ButtonLogout onClick={signOut}>Logout</ButtonLogout>
        </div>
        <CardContainer>
          {infoCard.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              text={item.text}
              img={item.img}
            />
          ))}
        </CardContainer>
        <Banner />
      </Section>
    </div>
  );
}

export default Home;
