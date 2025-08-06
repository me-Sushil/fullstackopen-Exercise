const Total=({parts})=>{
  let total =  parts.reduce((acc, part)=> acc+part.exercises,0);
    return(
        <>
        <p style={{fontWeight:"bold"}}>total of {total} exercises</p>
        {/* <p>total of {parts[0].exercises + parts[1].exercises + parts[2].exercises + parts[3].exercises} exercises</p> */}
        </>
    )
}
export default Total;