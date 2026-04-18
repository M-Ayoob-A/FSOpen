import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNew } from '../requests'
import NotifContext from '../NotificationContext'
import { useContext } from 'react'

const AnecdoteForm = () => {
  
  const { showNotif } = useContext(NotifContext)

  const queryClient = useQueryClient()
  
  const newAnecdoteMutation = useMutation({
    mutationFn: createNew,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      showNotif({
        type: 'CREATE',
        payload: data.content
      })
    },
    onError: (error) => { showNotif({ type: 'ERR', payload: error.message }) }
  })
  
  const onCreate = (event) => {
    event.preventDefault()
    const newContent = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content: newContent, votes: 0 })
    console.log("newAnecdoteMutation.status: ", newAnecdoteMutation.status)
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
