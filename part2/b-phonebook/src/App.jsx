import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ id: 1, name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (newName.trim() === "" && number.trim() === "") return;
    if (persons.some((person) => person.name.toLowerCase() === newName.trim().toLowerCase())) {
      window.alert(`${newName} already added to phonebook`);
      setNewName("");
    } else {
      const newObj = {
        id: persons.length + 1,
        name: newName.trim(),
        number: number.trim(),
      };
      setPersons(persons.concat(newObj));
      setNewName("");
      setNumber("");
    }
  }

  const [number, setNumber] = useState("");
  const [search, setSearch] = useState("");

  const filteredPerson = search ? persons.filter((person)=>
    person.name.toLowerCase().includes(search.toLowerCase())
): persons;

  return (
    <>
      <h2>Phonebook</h2>
      <p>
        filter shown with
        <input
          placeholder="Search by name"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </p>

      <h3>add a new</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <p>
            name:
            <input
              placeholder="type here"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </p>
          <p>
            number:
            <input
              type="tel"
              placeholder="+977 98....."
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </p>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
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
