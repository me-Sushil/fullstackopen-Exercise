const Total=({parts})=>{
  let total =  parts.reduce((acc, part)=> acc+part.exercises,0);
    return(
        <>
        <p style={{fontWeight:"bold"}}>total of {total} exercises</p>
        </>
    )
}
export default Total;