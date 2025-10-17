const Filter = ({ searchTerm, setSearchTerm }) => {
    
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value)
    }

    return (
        <div>
          filter shown with <input value={searchTerm} onChange={handleSearchChange} />
        </div>
    )
}

export default Filter