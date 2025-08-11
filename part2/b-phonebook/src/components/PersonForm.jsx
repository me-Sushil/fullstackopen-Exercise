import { useState } from "react";
import NoteServices from "../services/NoteServices";
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
      NoteServices.create(newObj).then((createRes) =>
        setPersons(persons.concat(createRes))
      );
      // axios.post("http://localhost:3001/persons", newObj).then((response) => {
      //   setPersons(persons.concat(response.data));
      //   console.log(response.data, "the responce is");
      // })
      // setPersons(persons.concat(newObj));
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
