import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";

const App = () => {
  const [persons, setPersons] = useState([{ id: 1, name: "Arto Hellas" }]);
  const [search, setSearch] = useState("");
  return (
    <>
      <h2>Phonebook</h2>
      <Filter search={search} setSearch={setSearch}/>
      <h3>add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons}/>
      <h2>Numbers</h2>
      <Person search={search} persons={persons}/>
    </>
  );
};

export default App;
