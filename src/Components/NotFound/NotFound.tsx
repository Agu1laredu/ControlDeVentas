import styled from "styled-components";

const Section = styled.section`
  width: 80vw;
  height: 80vh;
  overflow: hidden;
`;

const Card = styled.div`
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
  z-index: 3;
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

function NotFound() {
  return (
    <Section>
      <Card
        style={{
          position: "relative",
          top: "-5vh",
          left: " 45vw",
        }}
      >
        <h3 style={{ textAlign: "center", color: "white" }}>Not Found</h3>
      </Card>
      <CardDos
        id="CardNotFound"
        style={{
          position: "relative",
          top: "-10vh",
          left: " 25vw",
        }}
      >
        <h3 style={{ textAlign: "center", color: "white" }}>Not Found</h3>
      </CardDos>
      <CardDos
        id="CardNotFound"
        style={{
          position: "relative",
          top: "-10vh",
          left: " 45vw",
        }}
      >
        <h3 style={{ textAlign: "center", color: "white" }}>Not Found</h3>
      </CardDos>
      <Card
        style={{
          position: "relative",
          top: "-80vh",
          left: " 15vw",
        }}
      >
        <h3 style={{ textAlign: "center", color: "white" }}>Not Found</h3>
      </Card>
      <Card
        style={{
          position: "relative",
          top: "-60vh",
          left: " 15vw",
        }}
      >
        <h3 style={{ textAlign: "center", color: "white" }}>Not Found</h3>
      </Card>
      <Card
        style={{
          position: "relative",
          top: "-110vh",
          left: " 65vw",
        }}
      >
        <h3 style={{ textAlign: "center", color: "white" }}>Not Found</h3>
      </Card>
      <Card
        style={{
          position: "relative",
          top: "-100vh",
          left: " -5vw",
        }}
      >
        <h3 style={{ textAlign: "center", color: "white" }}>Not Found</h3>
      </Card>
    </Section>
  );
}

export default NotFound;
