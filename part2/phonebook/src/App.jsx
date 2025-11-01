import { useState, useEffect } from 'react'
import Filter from './Filter'
import Form from './Form'
import List from './List'
import services from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    services.getAll().then(data => setPersons(data))
  }, [persons])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <h2>Add a new</h2>
      <Form persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <List searchTerm={searchTerm} persons={persons} setPersons={setPersons} />
    </div>
  )
}

export default App