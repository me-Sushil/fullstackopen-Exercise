import { useState } from "react";
const PersonForm = ({ persons, setPersons }) => {
  const [number, setNumber] = useState("");
  const [newName, setNewName] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (newName.trim() === "" && number.trim() === "") return;
    if (
      persons.some(
        (person) => person.name.toLowerCase() === newName.trim().toLowerCase()
      )
    ) {
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
  return (
    <>
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
    </>
  );
};

export default PersonForm;
