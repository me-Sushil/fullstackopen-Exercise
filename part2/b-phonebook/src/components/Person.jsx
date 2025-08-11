import Delete from "./Delete";
const Person = ({ search, persons, setPersons }) => {
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
            {person.name} {person.number} <Delete id={person.id} setPersons={setPersons}/>
          </p>
        );
      })}
    </>
  );
};
export default Person;
