import Delete from "./Delete";
const Person = ({ search, persons, setPersons, setMessage }) => {
  const filteredPerson = search
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(search.toLowerCase())
      )
    : persons;
  return (
    <>
      {filteredPerson.map((person) => {
        return (
          <p key={person.id}>
            {person.name} {person.number} <Delete id={person.id} name={person.name} setPersons={setPersons} setMessage={setMessage}/>
          </p>
        );
      })}
    </>
  );
};
export default Person;
