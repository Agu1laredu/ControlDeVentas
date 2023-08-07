import "./Card.css";
interface CardProps {
  title: string;
  text: string;
  img: string;
}
const Card: React.FC<CardProps> = ({ title, text, img }) => {
  return (
    <div className="Card">
      <h3>{title}</h3>
      <p>{text}</p>
      <img src={img} alt="Abrigo" className="AbrigoImg" />
    </div>
  );
};

export default Card;
