import { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
function App() {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all/`)
      .then((response) => setResult(response.data));
  }, []);

  console.log(result, "this is result");

  useEffect(() => {
    setFilter(
      result.filter((co) =>
        co.name.common.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, result]);

  console.log(filter, "this is filter data");

  return (
    <>
      <div>
        <p>
          Find countries{" "}
          <input
            className="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search country"
          ></input>
        </p>

        {search && (filter.length > 10 && <p>Too many matches, specify another filter</p>)}
       
        {search && (filter.length <=10 && filter.length > 1 &&(
          <ul>
            {filter.map((c, index)=><li key={index}>{c.name.common}</li>)}
          </ul>
        ))}

        {search &&(filter.length === 1 && (
          <div>
          <h2>{filter.name.common}</h2>
          <h4>{filter.capital}</h4>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
