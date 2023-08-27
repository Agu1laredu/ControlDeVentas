import styled from "styled-components";

const Button = styled.button`
  width: 100%;
  margin: 20px auto;
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #646cff;
  cursor: pointer;
  transition: border-color 0.25s;

  :hover {
    border-color: #646cff;
  }
  :focus,
  :focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }
`;
function ButtonSend() {
  return <Button type="submit">Send</Button>;
}

export default ButtonSend;
