import { useState } from "react";
import NoteServices from "../services/NoteServices";
const PersonForm = ({ persons, setPersons, setMessage }) => {
  const [number, setNumber] = useState("");
  const [newName, setNewName] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (newName.trim() === "" && number.trim() === "") return;

    const yes = persons.find(
      (person) => person.name.toLowerCase() === newName.trim().toLowerCase()
    );

    if (yes) {
      const confirm = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one ?`
      );

      if (confirm) {
        const id = yes.id;

        if (!persons.some((p) => p.name === persons.name)) {
          setMessage(
            `Information of ${newName} has already been removed from server`
          );
          setTimeout(() => setMessage("message here"), 1500);
          return;
        }

        const upnum = {
          ...yes,
          number: number,
        };
        NoteServices.update(id, upnum)
          .then((updatePerson) => {
            console.log(updatePerson, "updated person");
            setPersons((prev) =>
              prev.map((person) => (person.id === id ? updatePerson : person))
            );
          })
          .catch((error) => {
            console.log(error, "error");
            setMessage(`${newName} is already removed from server`);
          });

        setMessage(`${newName} number update to phonebook`);
        setTimeout(() => {
          setMessage("message here");
        }, 1500);

        setNewName("");
        setNumber("");
      } else {
        setMessage(`cancel to update number`);
        setTimeout(() => {
          setMessage("message here");
        }, 1500);
      }
    } else {
      const newObj = {
        // id: `${persons.length + 1}`,
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
      setMessage(`${newName} is successfully added`);
      setTimeout(() => {
        setMessage(`message here`);
      }, 1500);
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
