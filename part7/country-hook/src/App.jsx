import React, { useState, useEffect } from "react";
import axios from "axios";
import Country from "./Country";
import useCountry from "./hooks/useCountry";
const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        {/* <input {...nameInput} /> */}
        <input
          type={nameInput.type}
          value={nameInput.value}
          onChange={nameInput.onChange}
        />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
