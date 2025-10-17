const List = ({ persons, searchTerm}) => {

  return (
    <div>
        {persons
          .filter(person => person.name.toLowerCase().match(searchTerm))
          .map(person => <div key={person.id} >{person.name} {person.number}</div>)}
      </div>
  )
}

export default List