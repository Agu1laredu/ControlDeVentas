import Image from "react-bootstrap/Image";
import Imagen from "../../assets/BAnner.png";
import "./Banner.css";
function Banner() {
  return (
    <div className="ContainerBanner">
      <Image src={Imagen} fluid />
    </div>
  );
}

export default Banner;
