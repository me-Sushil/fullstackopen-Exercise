  import Part from "./Part";
  const Content = ({ parts }) => {
    return (
      <>
        <Part parts={parts[0]} />
        <Part parts={parts[1]} />
        <Part parts={parts[2]} />
      </>
    );
  };

  export default Content;

