import { useState } from "react"
import services from './services/persons'

const Form = ({ persons, setPersons, setNotifMessage, setNotifColour }) => {
    
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')

  const onFormSubmit = (event) => {
    event.preventDefault()
    if (persons.some(p => p.name === newName) 
      && window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      const foundPerson = persons.find(p => p.name === newName)
      const changedPerson = { ...foundPerson, 'number' : newPhoneNumber }
      services.change(changedPerson.id, changedPerson).then(res => {
        setNotifColour('green')
        setNotifMessage(`Updated ${res.data.name}'s number`)
        setTimeout(() => {
          setNotifMessage(null)
        }, 5000)
      })
    } else {
      const newPerson = { 'name' : newName, 'number' : newPhoneNumber }
      setPersons(persons.concat(newPerson))
      services.create(newPerson).then(res => {
        setNotifColour('green')
        setNotifMessage(`Added ${res.data.name}`)
        setTimeout(() => {
          setNotifMessage(null)
        }, 5000)
      })
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