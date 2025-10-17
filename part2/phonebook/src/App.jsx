import { useState } from 'react'
import Filter from './Filter'
import Form from './Form'
import List from './List'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <h2>Add a new</h2>
      <Form persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      {/*<div>
        {persons
          .filter(person => person.name.toLowerCase().match(searchTerm))
          .map(person => <div key={person.id} >{person.name} {person.number}</div>)}
      </div>*/}
      <List searchTerm={searchTerm} persons={persons} />
    </div>
  )
}

export default App