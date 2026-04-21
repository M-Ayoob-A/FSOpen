import { useQuery, useMutation } from "@apollo/client/react"
import { ALL_AUTHORS, EDIT_BIRTHYEAR } from "../queries"
import { useState } from "react"

const Authors = (props) => {
  if (!props.show) {
    return null
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [name, setName] = useState('')
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [setBornTo, setYear] = useState('')

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const authors = useQuery(ALL_AUTHORS)

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [editAuth] = useMutation(EDIT_BIRTHYEAR)

  if (authors.loading) {
    return <div>Loading data ...</div> 
  }

  const onSubmit = (event) => {
    event.preventDefault()

    editAuth({ variables: {name, setBornTo} })

    setName('')
    setYear('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Set birthyear</h3>
      <form onSubmit={onSubmit} >
        <label>
          author
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </label>
        <label>
          born
          <input
            value={setBornTo}
            onChange={({ target }) => setYear(target.value)}
          />
        </label>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
