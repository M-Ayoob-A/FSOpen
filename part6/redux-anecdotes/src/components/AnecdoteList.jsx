import { useDispatch, useSelector } from "react-redux"
import { voteActionCreator } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes
                                              .filter(anecdote => anecdote.content.includes(state.filter))
                                              .sort((a, b) => b.votes - a.votes))
  const dispatch = useDispatch()

  const vote = id => {
    console.log('vote', id)
    dispatch(voteActionCreator(id))
  }
  
  return (
    <>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList