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
          <Dropdown.Item eventKey="1">Ejemplo 1</Dropdown.Item>
          <Dropdown.Item eventKey="2">Ejemplo 2</Dropdown.Item>
          <Dropdown.Item eventKey="3">Ejemplo 3</Dropdown.Item>
          <Dropdown.Item eventKey="4">Ejemplo 4</Dropdown.Item>
        </DropdownButton>
      ))}
    </>
  );
}

export default VariantsExample;
