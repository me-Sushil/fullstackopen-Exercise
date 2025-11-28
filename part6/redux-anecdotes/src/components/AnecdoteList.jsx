import { useSelector, useDispatch } from "react-redux";
import { votes } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === "") {
      return anecdotes;
    }
    return anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    );
  });
  const dispatch = useDispatch();

  const voteHandle = (id, content) => {
    dispatch(votes(id));
    dispatch(setNotification(`You voted "${content}"`));
    setTimeout(()=>{
    dispatch(setNotification(""));

    },5000)
  };
  return (
    <>
      {[...anecdotes]
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>
              {anecdote.content} has {anecdote.votes}
              <button onClick={() => voteHandle(anecdote.id, anecdote.content)}>
                vote
              </button>
            </div>
          </div>
        ))}
    </>
  );
};
export default AnecdoteList;
