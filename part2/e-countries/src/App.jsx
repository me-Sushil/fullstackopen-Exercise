import { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
function App() {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [filter, setFilter] = useState([]);
  const [weather, setWeather] = useState([]);

  const apiKey = import.meta.env.VITE_API_KEY;

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

  const geourl = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}&units=metric`;

  useEffect(() => {
    const controldRequest = setTimeout(() => {
      axios.get(geourl).then((response) => {
        console.log(response.data);
        setWeather(response.data);
      });
    }, 1000);
    return () => clearTimeout(controldRequest);
  }, [search]);

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

        {search && filter.length > 10 && (
          <p>Too many matches, specify another filter</p>
        )}

        {search && filter.length <= 10 && filter.length > 1 && (
          <ul>
            {filter.map((c, index) => (
              <li key={index}>
                {c.name.common}{" "}
                <button onClick={() => setFilter([c])}>Show</button>
              </li>
            ))}
          </ul>
        )}

        {search && filter.length === 1 && (
          <div>
            <h2>{filter[0].name.common}</h2>
            <p>Capital {filter[0].capital}</p>
            <p>Area {filter[0].area}</p>

            <h4>Language</h4>
            <ul>
              {" "}
              {Object.values(filter[0].languages).map((lan, idx) => (
                <li key={idx}>{lan}</li>
              ))}
            </ul>

            <img
              src={filter[0].coatOfArms.png}
              alt="country"
              style={{ height: "200px", width: "200px" }}
            />
          </div>
        )}
      </div>
      <div>
        <h2>Weather in {weather?.name}</h2>
        <p>Tempreture : {weather?.main?.temp} Celsius</p>
        <p>Wind {weather?.wind?.speed} m/s</p>
      </div>
    </>
  );
}

export default App;
