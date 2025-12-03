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

export default Country;
