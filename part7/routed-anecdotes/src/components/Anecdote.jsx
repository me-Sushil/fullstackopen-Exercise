import { useParams } from "react-router-dom";
const Anecdote = ({ anecdotes }) => {
  const id = useParams().id;
  const myAnecdote = anecdotes.find((anecdote) => anecdote.id == id);
  return (
    <div>
      <h2>Single Anecdotes</h2>
      <div><h3>{myAnecdote.content}</h3>has {myAnecdote.votes} votes</div>
      <div>for more info see {myAnecdote.info}</div>
    </div>
  );
};
export default Anecdote;
