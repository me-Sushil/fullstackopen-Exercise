import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAnecdotes = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createAnecdotes = async (newAnecdotes) => {
  const response = await axios.post(baseUrl, newAnecdotes)
  return response.data
}
export { getAnecdotes, createAnecdotes }
