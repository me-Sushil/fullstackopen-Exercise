import Part from "./Part";
import Total from "./Total";

const Node = ({node})=>{
    return(
        <>
        <h4>Node.js</h4>
        <Part parts={node.parts[0]}/>
        <Part parts={node.parts[1]}/>
        <Total parts={node.parts}/>
        </>
    )
}

export default Node;