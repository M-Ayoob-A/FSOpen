import { useState } from "react"
import axios from 'axios'

const Form = ({ persons, setPersons }) => {
    
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  //const [id, setId] = useState(persons.length + 1)

  const onFormSubmit = (event) => {
    event.preventDefault()
    console.log(persons)
    if (persons.some(p => p.name === newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = { 'name' : newName, 'number' : newPhoneNumber }
      setPersons(persons.concat(newPerson))
      //setId(id + 1)
      axios
        .post('http://localhost:3001/persons', newPerson).then(response => {
          console.log(response.data)
        })
      //console.log(id)
    }
  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewPhoneNumber(event.target.value)
  }

  return (
    <form onSubmit={onFormSubmit}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newPhoneNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit" >add</button>
      </div>
    </form>
  )
}

export default Form