import React from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "./Dropdown.css";

interface DropdownProps {
  title: string;
  options: { name: string }[];
}

const DropdownComponent: React.FC<DropdownProps> = ({ title, options }) => {
  return (
    <DropdownButton
      as={ButtonGroup}
      className="dropdown"
      key={title}
      id={`dropdown-variants-${title}`}
      variant={title.toLowerCase()}
      title={title}
    >
      {options.map((option, index) => (
        <Dropdown.Item key={index} eventKey={String(index + 1)}>
          <p className="Ejemplos">{option.name}</p>
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

export default DropdownComponent;
