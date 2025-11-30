import { useSelector, useDispatch } from "react-redux";
// import { votes } from "../reducers/anecdoteReducer";
import { updateVoteWithThunk } from "../reducers/anecdoteReducer";
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

  const voteHandle = (id, content, votes) => {
    const newAnekdotesWithVote = { content, votes: votes + 1 };
    dispatch(updateVoteWithThunk(id, newAnekdotesWithVote));
    // dispatch(votes(id, newAnekdotesWithVote));
    // dispatch(setNotification(`You voted "${content}"`));
    // setTimeout(() => {
    //   dispatch(setNotification(""));
    // }, 5000);

    dispatch(setNotification(`You voted "${content}"`, 5));
  };

  return (
    <>
      {[...anecdotes]
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>
              {anecdote.content} has {anecdote.votes}
              <button
                onClick={() =>
                  voteHandle(anecdote.id, anecdote.content, anecdote.votes)
                }
              >
                vote
              </button>
            </div>
          </div>
        ))}
    </>
  );
};
export default AnecdoteList;
