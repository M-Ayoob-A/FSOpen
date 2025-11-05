import { useState } from 'react'
import Display from './Display'

function App() {

  const [searchTerm, setSearchTerm] = useState('')

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
  }

  return (
    <>
      <div>
        find countries <input value={searchTerm} onChange={handleSearchChange} />
      </div>
      <Display searchTerm={searchTerm} />
    </>
  )
}

export default App
