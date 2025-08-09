import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ id: 1, name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (persons.some((person) => person.name === newName.trim())) {
      window.alert(`${newName} already added to phonebook`);
      setNewName("");
    } else {
      const newObj = {
        id: persons.length + 1,
        name: newName,
      };
      setPersons(persons.concat(newObj));
      setNewName("");
    }
  }
  function handleInput(event) {
    setNewName(event.target.value);
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name:
          <input
            placeholder="type here"
            value={newName}
            onChange={handleInput}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => {
        return <p key={person.id}>{person.name}</p>;
      })}
    </div>
  );
};
export default App;
