import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Person from "./components/Person";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(()=>{
    
  },[])
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
