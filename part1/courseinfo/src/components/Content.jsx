  const Content = ({ parts }) => {
    return (
      <>
      <p>{parts[0].name} {parts[0].exercises}</p>
      <p>{parts[1].name} {parts[1].exercises}</p>
      <p>{parts[1].name} {parts[1].exercises}</p>
        {/* <Part parts={parts[0]} />
        <Part parts={parts[1]} />
        <Part parts={parts[2]} /> */}
      </>
    );
  };

  export default Content;
//   const Part = ({ parts }) => {
//     return (
//       <>
//         <p>
//           {parts.name} {parts.exercises}
//         </p>
//       </>
//     );
//   };
