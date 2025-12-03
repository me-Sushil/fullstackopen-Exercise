import useField from "../hooks";
const CreateNew = (props) => {
  const content = useField("content");
  const author = useField("author");
  const info = useField("info");
  // const reset = useField("reset");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    resetFn();
  };
  const resetFn = () => {
    content.reset();
    author.reset();
    info.reset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            type={content.type}
            value={content.value}
            onChange={content.onChange}
          />
        </div>
        <div>
          author
          <input
            type={author.type}
            value={author.value}
            onChange={author.onChange}
          />
        </div>
        <div>
          url for more info
          <input type={info.type} value={info.value} onChange={info.onChange} />
        </div>
        <button type="submit">create</button>{" "}
        <button type="reset" onClick={resetFn}>
          reset
        </button>
      </form>
    </div>
  );
};
export default CreateNew;
