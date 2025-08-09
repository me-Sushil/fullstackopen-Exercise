import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([{ id: 1, name: "Arto Hellas" }]);

  const [search, setSearch] = useState("");

  const filteredPerson = search ? persons.filter((person)=>
    person.name.toLowerCase().includes(search.toLowerCase())
): persons;

  return (
    <>
      <h2>Phonebook</h2>
      <Filter search={search} setSearch={setSearch}/>
      <h3>add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons}/>
      <h2>Numbers</h2>
      {filteredPerson.map((person) => {
        return (
          <p key={person.id}>
            {person.name} {person.number}
          </p>
        );
      })}
    </>
  );
};

export default App;
