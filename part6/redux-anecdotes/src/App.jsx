import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";
const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteForm/>
      <AnecdoteList/>
    </div>
  );
};

export default App;
