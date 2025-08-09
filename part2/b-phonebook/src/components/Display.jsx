const Display=({persons})=>{
    return(
        <>
        <h2>Numbers</h2>
         {persons.map((person) => {
        return <p key={person.id}>{person.name}</p>;
      })}
        </>
    )

}
export default Display;