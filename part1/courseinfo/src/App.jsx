const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];
  const Header = (props) => {
    return (
      <>
        <h1>{props.course}</h1>
      </>
    );
  };

  const Content = ({ parts }) => {
    return (
      <>
        <Part parts={parts[0]} />
        <Part parts={parts[1]} />
        <Part parts={parts[2]} />
      </>
    );
  };
  const Part = ({ parts }) => {
    return (
      <>
        <p>
          {parts.name} {parts.exercises}
        </p>
      </>
    );
  };

  const Total = ({ parts }) => {
    return (
      <>
        <p>
          Number of exercises{" "}
          {parts.reduce((sum, part)=> sum+part.exercises ,0)}
        </p>
      </>
    );
  };

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};
export default App;
