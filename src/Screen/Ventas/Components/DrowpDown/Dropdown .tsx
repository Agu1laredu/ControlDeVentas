import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "./Dropdown.css";
function VariantsExample() {
  return (
    <>
      {["Lista"].map((variant) => (
        <DropdownButton
          as={ButtonGroup}
          className="dropdown"
          name="Clientes"
          key={variant}
          id={`dropdown-variants-${variant}`}
          variant={variant.toLowerCase()}
          title={variant}
        >
          <Dropdown.Item eventKey="1">
            <p className="Ejemplos">Ejemplo 1</p>
          </Dropdown.Item>
          <Dropdown.Item eventKey="2">
            <p className="Ejemplos">Ejemplo 2</p>
          </Dropdown.Item>
          <Dropdown.Item eventKey="3">
            <p className="Ejemplos">Ejemplo 3</p>
          </Dropdown.Item>
          <Dropdown.Item eventKey="4">
            <p className="Ejemplos">Ejemplo 4</p>
          </Dropdown.Item>
        </DropdownButton>
      ))}
    </>
  );
}

export default VariantsExample;
