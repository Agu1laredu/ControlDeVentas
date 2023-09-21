import { useState, ChangeEvent } from "react";

type InitialStateType = {
  [key: string]: unknown;
};

const useForm = (initialState: InitialStateType) => {
  const [formValues, setFormValues] = useState(initialState);

  const reset = () => setFormValues(initialState);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value, name } = event.target;

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  return { formValues, handleInputChange, reset };
};

export default useForm;
