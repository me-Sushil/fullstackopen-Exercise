import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdotes } from '../services/requests'
import NotificationContext from '../NotificationContext'
import { useContext } from 'react'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const { showNotification } = useContext(NotificationContext)
  const newAnecdotesMutation = useMutation({
    mutationFn: createAnecdotes,
    onSuccess: (newAnecdotes) => {
      const anecnotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecnotes.concat(newAnecdotes))
      showNotification(`a new anecdote '${newAnecdotes.content}' created`)
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    newAnecdotesMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
