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
        setPersons(persons.map(p => {
          if (p.name === res.data.name) {
            return { ...p, 'number' : res.data.number };
          } else {
            return p
          }
        }))
        setNotifColour('green')
        setNotifMessage(`Updated ${newName}'s number`)
        setTimeout(() => {
          setNotifMessage(null)
        }, 5000)
      })
    } else {
      const newPerson = { 'name' : newName, 'number' : newPhoneNumber }
      services.create(newPerson).then(res => {
        setPersons(persons.concat(res.data))
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