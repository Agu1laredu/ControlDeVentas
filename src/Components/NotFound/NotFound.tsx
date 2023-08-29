import styled, { keyframes } from "styled-components";

const blink = keyframes`
  0% {
    opacity: 1;
  }
  12.5% {
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  37.5% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  62.5% {
    opacity: 0;
  }
  75% {
    opacity: 1;
  }
  87.5% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const changeColor = keyframes`
  0% {
    background-color: #ff5722;
  }
  25% {
    background-color: #4caf50;
  }
  50% {
    background-color: #2196f3;
  }
  75% {
    background-color: #ff9800;
  }
  100% {
    background-color: #e91e63;
  }
`;

const Section = styled.section`
  margin-top: 100px;
  width: 100vw;
  height: 90vh;
  overflow: hidden;
`;

const Card = styled.div`
  padding: 100px;
  border: 2px solid gray;
  border-radius: 20px;
  width: 400px;
  justify-content: center;
  background: linear-gradient(
    90deg,
    rgba(81, 74, 175, 1) 0%,
    rgba(61, 58, 105, 1) 100%,
    rgba(157, 166, 47, 1) 100%,
    rgba(236, 255, 0, 1) 100%,
    rgba(176, 31, 31, 1) 100%
  );
  z-index: 3;

  /* Aplicar ambas animaciones al mismo elemento */
  animation: ${blink} 8s ease infinite, ${changeColor} 8s ease infinite;
`;

const CardDos = styled.div`
  padding: 100px;
  border: 2px solid gray;
  border-radius: 20px;
  width: 400px;
  justifycontent: center;
  background: rgb(81, 74, 175);
  background: linear-gradient(
    90deg,
    rgba(81, 74, 175, 1) 0%,
    rgba(61, 58, 105, 1) 100%,
    rgba(157, 166, 47, 1) 100%,
    rgba(236, 255, 0, 1) 100%,
    rgba(176, 31, 31, 1) 100%
  );
  z-index: 1;
`;
const BlinkingCardDos = styled(CardDos)`
  animation: ${blink} 8s infinite;
  transition: 4s;
`;

const BlinkingCard = styled(Card)`
  animation: ${blink} 6s infinite;
  transition: 3s;
`;
const BlinkingCardTres = styled(Card)`
  animation: ${blink} 10s infinite; /* Ajusta la duración y otras propiedades de animación según tus preferencias */
  transition: 2s;
`;

function NotFound() {
  return (
    <Section>
      <BlinkingCardDos
        style={{
          position: "relative",
          top: "-5vh",
          left: " 45vw",
        }}
      >
        <h3 style={{ textAlign: "center", color: "white" }}>Not Found</h3>
      </BlinkingCardDos>
      <BlinkingCardTres
        id="CardNotFound"
        style={{
          position: "relative",
          top: "-10vh",
          left: " 25vw",
        }}
      >
        <h3 style={{ textAlign: "center", color: "white" }}>Not Found</h3>
      </BlinkingCardTres>
      <BlinkingCardDos
        id="CardNotFound"
        style={{
          position: "relative",
          top: "-10vh",
          left: " 45vw",
        }}
      >
        <h3 style={{ textAlign: "center", color: "white" }}>Not Found</h3>
      </BlinkingCardDos>
      <BlinkingCard
        style={{
          position: "relative",
          top: "-80vh",
          left: " 15vw",
        }}
      >
        <h3 style={{ textAlign: "center", color: "white" }}>Not Found</h3>
      </BlinkingCard>
      <BlinkingCard
        style={{
          position: "relative",
          top: "-60vh",
          left: " 15vw",
        }}
      >
        <h3 style={{ textAlign: "center", color: "white" }}>Not Found</h3>
      </BlinkingCard>
      <BlinkingCard
        style={{
          position: "relative",
          top: "-110vh",
          left: " 65vw",
        }}
      >
        <h3 style={{ textAlign: "center", color: "white" }}>Not Found</h3>
      </BlinkingCard>
      <BlinkingCardTres
        style={{
          position: "relative",
          top: "-100vh",
          left: " -5vw",
        }}
      >
        <h3 style={{ textAlign: "center", color: "white" }}>Not Found</h3>
      </BlinkingCardTres>
      <BlinkingCardTres
        style={{
          position: "relative",
          top: "-130vh",
          left: " 75vw",
        }}
      >
        <h3 style={{ textAlign: "center", color: "white" }}>Not Found</h3>
      </BlinkingCardTres>
      <BlinkingCardTres
        style={{
          position: "relative",
          top: "-200vh",
          left: " 78vw",
        }}
      >
        <h3 style={{ textAlign: "center", color: "white" }}>Not Found</h3>
      </BlinkingCardTres>
    </Section>
  );
}

export default NotFound;
