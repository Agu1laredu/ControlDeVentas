import styled from "styled-components";

const CardBanner = styled.div`
  width: 100%;
  height: 30vh;
  margin: 10px;
  border-radius: 20px;
  font-family: "Bolder";
  text-align: center;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.3);
  :hover {
    transition: 1s;
    cursor: pointer;
  }
  @media (max-width: 1030px) {
    height: 20vh;
    width: 600px;
  }
  @media (max-width: 800px) {
    height: 20vh;
    width: 800px;
  }
  @media (max-width: 768px) {
    gap: 20px;
    width: 1000px;
    margin-top: 10%;
  }
`;

const AbrigoImagen = styled.img`
  width: 30%;
  margin: auto;
  @media (max-width: 700px) {
    width: 40%;
    margin: auto;
  }

  @media (max-width: 500px) {
    width: 40%;
    margin: auto;
  }
`;
interface CardProps {
  title: string;
  text: string;
  img: string;
}
const Card: React.FC<CardProps> = ({ title, text, img }) => {
  return (
    <CardBanner>
      <h3 style={{ marginTop: 20 }}>{title}</h3>
      <AbrigoImagen src={img} alt="Abrigo" />
      <p>{text}</p>
    </CardBanner>
  );
};

export default Card;
