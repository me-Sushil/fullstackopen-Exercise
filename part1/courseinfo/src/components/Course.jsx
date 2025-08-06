import Header from "./Header";
import Content from "./Content";
const Course=({course})=>{
    return(
        <>
        <Header name={course[0].name}/>
        <Content parts={course[0].parts}/>
        </>
    )
}
export default Course;