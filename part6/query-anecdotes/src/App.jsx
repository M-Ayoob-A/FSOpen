import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAll, vote } from './requests'
import { useContext } from 'react'
import NotifContext from './NotificationContext'

const App = () => {

  const queryClient = useQueryClient()

  const { showNotif } = useContext(NotifContext)

  const voteAnecdoteMutation = useMutation({
    mutationFn: vote,
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      showNotif({
        type: 'VOTE',
        payload: data.content
      })
    },
    onError: (error) => { showNotif({ type: 'ERR', payload: error }) }
  })

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    refetchOnWindowFocus: false,
    retry: 1
  })

  //console.log(JSON.parse(JSON.stringify(result)))
 
  if (result.isLoading) {
    return <div>loading data...</div>
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
