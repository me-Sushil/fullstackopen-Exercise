import { useState } from "react";
import Display from "./components/Display";
import Form from "./components/Form";

const App = () => {
  const [persons, setPersons] = useState([{ id: 1, name: "Arto Hellas" }]);
  return (
    <div>
      <h2>Phonebook</h2>
      <Form persons={persons} setPersons={setPersons}/>
      <Display persons={persons} />
    </div>
  );
};
export default App;
