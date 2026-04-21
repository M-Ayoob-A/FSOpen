import { useQuery, useMutation } from "@apollo/client/react"
import { ALL_AUTHORS, EDIT_BIRTHYEAR } from "../queries"
import { useState } from "react"

const Authors = (props) => {


  const [name, setName] = useState('')
  const [year, setYear] = useState('')

  const authors = useQuery(ALL_AUTHORS)
  const [editAuthor] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  if (authors.loading) {
    return <div>Loading data ...</div> 
  }


  const onSubmit = (event) => {
    event.preventDefault()
    if (name !== "select") {
      const setBornTo = parseInt(year)
      editAuthor({ variables: {name, setBornTo} })
      setName('')
      setYear('')
    }
  }

  if (!props.show) {
    return null
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
          <select
            value={name}
            onChange={({ target }) => setName(target.value)}
          >
            <option value="select" >Select an author</option>
            {authors.data.allAuthors.map((a) => (
              <option key={a.id} value={a.name} >{a.name}</option>
            ))}
          </ select>
        </label>
        <label>
          born
          <input
            value={year}
            onChange={({ target }) => setYear(parseInt(target.value))}
          />
        </label>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
