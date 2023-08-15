import Sidebar from "../../Components/SideBar/Sidebar.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import Card from "../../Components/Card/Card.tsx";
import Banner from "../../Components/Carousel/Banner.tsx";

// Interfaz para el objeto de cada elemento de infoCard
interface CardInfo {
  title: string;
  text: string;
  img: string;
}

function Home() {
  const infoCard: CardInfo[] = [
    {
      title: "Buzos",
      text: "Buzos  para emprendimientos y equipos de trabajo",
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
    <div style={{ display: "flex" }}>
      <Sidebar />
      <section>
        <h1>CONTROL DE VENTAS</h1>
        <div className="CardContainer">
          {/* Mapea cada elemento de infoCard y pasa la información a Card */}
          {infoCard.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              text={item.text}
              img={item.img}
            />
          ))}
        </div>
        <Banner />
        {/* <h2>Controla tus ventas de manera eficiente</h2> */}
      </section>
    </div>
  );
}

export default Home;
