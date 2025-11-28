import { createAnecdotes } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdotes = (event) => {
    event.preventDefault();
    const content = event.target.anecdotes.value;
    event.target.anecdotes.value = "";
    dispatch(createAnecdotes(content));
    dispatch(setNotification(`${content} Created`));
    setTimeout(() => {
      dispatch(setNotification(""));
    }, 5000);
  };

  return (
    <>
      <form onSubmit={addAnecdotes}>
        <div>
          <input name="anecdotes" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};
export default AnecdoteForm;
