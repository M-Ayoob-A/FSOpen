import services from './services/persons'

const List = ({ persons, searchTerm, setPersons }) => {

  const deletePerson = person => {
    if (window.confirm(`Delete ${person.name}?`)) {
      services.deleteEntry(person.id)
      setPersons(persons.filter(p => p.name !== person.name))
    }
  }

  return (
    <div>
        {
          persons
            .filter(person => person.name.toLowerCase().match(searchTerm))
            .map(person => {
              return (
                <div key={person.name}>
                  <div >{person.name} {person.number}</div>
                  <button onClick={() => deletePerson(person)}>
                    delete
                  </button>
                </div>
              )
            })
        }
      </div>
  )
}

export default List