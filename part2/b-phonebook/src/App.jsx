import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ id: 1, name: "Arto Hellas" }]);

  const [newName, setNewName] = useState("");
  function handleSubmit(event) {
    event.preventDefault();
    if(newName ==="" && number==="") return;
    if (persons.some((person) => person.name === newName.trim())) {
      window.alert(`${newName} already added to phonebook`);
      setNewName("");
    } else {
      const newObj = {
        id: persons.length + 1,
        name: newName,
        number: number,
      };
      setPersons(persons.concat(newObj));
      setNewName("");
      setNumber("");
    }
  }
  function handleInput(event) {
    setNewName(event.target.value);
  }

  const [number, setNumber] = useState("");

  const numberHandle = (event) => {
    setNumber(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <p>
            name:
            <input
              placeholder="type here"
              value={newName}
              onChange={handleInput}
            />
          </p>
          <p>
            number:
            <input
              type="tel"
              placeholder="+977 98....."
              value={number}
              onChange={numberHandle}
            />
          </p>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
         {persons.map((person) => {
        return <p key={person.id}>{person.name} {person.number}</p>;
      })}
    </div>
  );
};

export default App;
