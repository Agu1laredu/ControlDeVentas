import styled from "styled-components";

const CardBanner = styled.div`
  width: 100%;
  height: 35vh;
  margin: 10px;
  border-radius: 20px;
  font-family: "Bolder";
  text-align: center;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.3);
  :hover {
    transition: 1s;
    box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }
  @media (max-width: 700px) {
    width: 100%;
    height: 40vh;
    gap: 20px;
    margin-top: 10%;
  }
`;

const AbrigoImagen = styled.img`
  width: 50%;
  margin: auto;
  @media (max-width: 700px) {
    width: 40%;
    margin: auto;
  }

  @media (max-width: 500px) {
    width: 50%;
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
      <h3>{title}</h3>
      <p>{text}</p>
      <AbrigoImagen src={img} alt="Abrigo" />
    </CardBanner>
  );
};

export default Card;
