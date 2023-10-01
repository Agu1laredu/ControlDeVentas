import Image from "react-bootstrap/Image";
import Imagen from "../../assets/BAnner.png";

import styled from "styled-components";

const ContainerBanner = styled.div`
  margin: 100px auto;
  width: 1000px;
  @media (max-width: 1030px) {
    width: 70vw;
  }
  @media (max-width: 800px) {
    width: 65vw;
  }
  @media (max-width: 700px) {
    margin: 100px auto;
    width: 100%;
  }
`;
function Banner() {
  return (
    <ContainerBanner className="ContainerBanner">
      <Image src={Imagen} fluid />
    </ContainerBanner>
  );
}

export default Banner;
