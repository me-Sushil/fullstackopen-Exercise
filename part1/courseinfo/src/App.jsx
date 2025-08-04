const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }


  const Header = (props) => {
    return (
      <>
        <h1>{props.name}</h1>
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
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};
export default App;
