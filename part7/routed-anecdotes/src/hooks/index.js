import { useState } from "react";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    console.log("this is reset");
    setValue("");
  };
  return {
    type,
    value,
    onChange,
    reset,
  };
};
export default useField;
