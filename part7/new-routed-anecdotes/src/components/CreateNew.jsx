import { useNavigate } from 'react-router-dom'
import { useField, useAnecdotes } from '../hooks'

const CreateNew = () => {
  const navigate = useNavigate()

  const { addAnecdote } = useAnecdotes()

  const content = useField('text')
  const author = useField('text')
  const info = useField('text')


  const handleSubmit = async (e) => {
    e.preventDefault()
    await addAnecdote({ content: content.value , author: author.value, info: info.value, votes: 0 })
    navigate('/')
  }

  const handleReset = (e) => {
    e.preventDefault()
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' {...content.inputField} />
        </div>
        <div>
          author
          <input name='author' {...author.inputField} />
        </div>
        <div>
          url for more info
          <input name='info' {...info.inputField} />
        </div>
        <button>create</button>
        <button onClick={handleReset} >reset</button>
      </form>
    </div>
  )
}

export default CreateNew
