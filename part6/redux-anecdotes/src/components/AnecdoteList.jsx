import { useSelector, useDispatch } from "react-redux";
import { votes } from "../reducers/anecdoteReducer";

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

  
  return (
    <>
      {[...anecdotes]
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>
              {anecdote.content} has {anecdote.votes}
              <button onClick={() => dispatch(votes(anecdote.id))}>vote</button>
            </div>
          </div>
        ))}
    </>
  );
};
export default AnecdoteList;
