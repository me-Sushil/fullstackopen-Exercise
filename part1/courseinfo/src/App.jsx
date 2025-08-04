const App = () => {
  const courseDetail = {
    course: "Half Stack application development",
    parts: [
      { part1: "Fundamentals of React", exercises1: 10 },
      { part2: "Using props to pass data", exercises2: 7 },
      { part3: "State of a component", exercises3: 14 },
    ],
  };

  const Header = (props) => {
    return (
      <>
        <h1>{props.course}</h1>
      </>
    );
  };

  const Content=(props)=>{
    return(
      <>
      <p>{props.part1} {props.exercises1}</p>
      <p>{props.part2} {props.exercises2}</p>
      <p>{props.part3} {props.exercises3}</p>
      </>
    )
  }

  return (
    <div>
      <Header course={courseDetail.course} />
      <Content parts={courseDetail.parts} />
      <Total parts={courseDetail.parts} />
    </div>
  );
};
export default App;
