import styled from "styled-components";
import Sidebar from "../../Components/SideBar/Sidebar";
import Card from "../../Components/Card/Card";
import Banner from "../../Components/Carousel/Banner";

const Section = styled.section`
  height: 80vh;
  width: 80vw;
  margin-left: 100px;
  border-radius: 30px;
  @media (max-width: 1280px) {
    width: 75vw;
  }
  @media (max-width: 1030px) {
    width: 70vw;
  }
  @media (max-width: 800px) {
    width: 65vw;
  }
  @media (max-width: 700px) {
    margin-left: 20px;
  }
`;

const Title = styled.h1`
  text-align: center;
  margin: 30px;
  font-family: "Bolder";
  @media (max-width: 1030px) {
    font-size: 60px;
  }
  @media (max-width: 800px) {
    font-size: 40px;
  }
`;

const CardContainer = styled.div`
  display: flex;

  @media (max-width: 700px) {
    display: grid;
  }
`;

interface CardInfo {
  title: string;
  text: string;
  img: string;
}

function Home() {
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

  return (
    <div style={{ display: "flex", gap: 5 }}>
      <Sidebar />
      <Section>
        <div style={{ display: "flex" }}>
          <Title>CONTROL DE VENTAS</Title>
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
