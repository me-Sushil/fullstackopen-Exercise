import { useState } from "react";

const Form=({persons, setPersons})=>{
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

    return(
        <>
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
        </>
    )
}

export default Form;