import axios from "axios";
import { useState, useEffect } from "react";
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
export default useCountry;
