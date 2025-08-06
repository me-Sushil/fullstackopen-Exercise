import Header from "./Header";
import Content from "./Content";
import Node from "./Node";

const Course=({course})=>{
    return(
        <>
        <Header name={course[0].name}/>
        <Content parts={course[0].parts}/>
        <Node node={course[1]}/>
        </>
    )
}
export default Course;