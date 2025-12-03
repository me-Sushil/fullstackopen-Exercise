import React, { useState, useEffect } from "react";
import axios from "axios";

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

const Country = ({ country }) => {
  // country.name is an object with 'common' and 'official' properties, not a string
  console.log("all details of country", country?.name?.common);
  if (!country) {
    return null;
  }

  if (!country.found) {
    return <div>not found...</div>;
  }

  return (
    <div>
      {/* country.name is an object, use country.name.common for the display name */}
      <h3>{country.name.common}</h3>
      {/* country.capital is an array, use [0] to get the first element */}
      <div>capital {country.capital[0]}</div>
      {/* country.population is a number */}
      <div>population {country.population}</div>
      {/* country.flags is an object with 'svg' and 'png' properties, use .svg for the image source */}
      <img
        src={country.flags.svg}
        height="100"
        alt={`flag of ${country.name.common}`}
      />
    </div>
  );
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
