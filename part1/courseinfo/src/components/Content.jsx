  import Part from "./Part";
  import Total from "./Total";
  const Content = ({ parts }) => {
    return (
      <>
        <Part parts={parts[0]} />
        <Part parts={parts[1]} />
        <Part parts={parts[2]} />
        <Part parts={parts[3]} />
        <Total parts={parts}/>
      </>
    );
  };

  export default Content;

