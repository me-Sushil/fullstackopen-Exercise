// import { allAnecdotes } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useDispatch } from "react-redux";
// import { postAnecdotes } from "../services/anecdote";
import { createAnecdotesWithThunk } from "../reducers/anecdoteReducer";
const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdotes = (event) => {
    event.preventDefault();
    const content = event.target.anecdotes.value;
    event.target.anecdotes.value = "";
    dispatch(createAnecdotesWithThunk(content));

    // postAnecdotes(content).then((data) => dispatch(allAnecdotes(data)));

    // dispatch(setNotification(`${content} Created`));
    // setTimeout(() => {
    //   dispatch(setNotification(""));
    // }, 5000);

    dispatch(setNotification(`${content} Created`, 5));
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
