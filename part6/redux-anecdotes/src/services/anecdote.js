import axios from "axios";
const baseUrl = "http://localhost:3001/anecdote";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const postAnecdotes = async (content) => {
  const newAnekdotes = {
    content,
    votes: 0,
  };
  const response = await axios.post(baseUrl, newAnekdotes);
  return response.data;
};

const update = async (id, newAnekdotesWithVote) => {
  const response = await axios.put(`${baseUrl}/${id}`, newAnekdotesWithVote);
  return response.data;
};
export { getAll, postAnecdotes, update };
