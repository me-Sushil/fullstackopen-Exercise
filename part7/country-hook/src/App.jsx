import React, { useState, useEffect } from "react";
import axios from "axios";
import Country from "./Country";
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

const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  console.log("name  of country", name);

  useEffect(() => {
    if (!name) return; // Don't fetch if name is empty

    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then((res) => setCountry({ ...res.data, found: true }))
      .catch(() => setCountry({ found: false })); // Handle error;
  }, [name]);

  console.log(country, "this is country after return useEffect");
  return country;
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
