import Image from "react-bootstrap/Image";
import Imagen from "../../assets/BAnner.png";

function Banner() {
  return (
    <div style={{ margin: " 100px auto", width: 1000 }}>
      <Image src={Imagen} fluid />
    </div>
  );
}

export default Banner;
