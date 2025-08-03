import Part1 from "./Part1";
const Content = (props) => {
  return (
    <div>
        <Part1 part1={props.part1} exercises1={props.exercises1}/>
        <Part2 part2={props.part2} exercises2={props.exercises2}/>
        <Part3 />
    </div>
  );
};
export default Content;
