import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, updateAnecdotes } from './services/requests'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import NotificationContext from './NotificationContext'
import { useContext } from 'react'
const App = () => {
  const queryClient = useQueryClient()
  const { showNotification } = useContext(NotificationContext)

  const updateVoteMutation = useMutation({
    mutationFn: updateAnecdotes,
    onSuccess: (newAnecdotes) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(
        ['anecdotes'],
        anecdotes.map((anecdote) =>
          anecdote.id === newAnecdotes.id ? newAnecdotes : anecdote,
        ),
      )
      showNotification(`anecdote '${newAnecdotes.content}' voted`)
    },
  })
  const handleVote = (anecdote) => {
    updateVoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    console.log('vote')
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false,
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }
  if (result.isError) {
    return <div>anecdote service not available due to server problems</div>
  }
  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
