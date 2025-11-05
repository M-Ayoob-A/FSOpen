import axios from 'axios'
import { useEffect, useState } from 'react'
import Countryinfo from './CountryInfo'

const Display = ({ searchTerm }) => {
    const [countriesList, setCountriesList] = useState([])
    const [matches, setMatches] = useState([])
    const [specificCountry, setSpecificCountry] = useState('')

    useEffect(() => {
      axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
          .then(res => {
            setCountriesList(res.data.map(c => c.name.common))
          })
    }, [])

    useEffect(() => {
      searchTerm.length === 0 
              ? setMatches([])
              : setMatches(countriesList.filter(c => c.toLowerCase().match(searchTerm)))
    }, [searchTerm])

    return (
        <>
          {
            matches.length === 0 
              ? <> </>
              : matches.length > 10
                  ? <div>Too many matches, specify another filter</div>
                  : matches.length === 1
                      ? <Countryinfo country={matches[0]} />
                      : specificCountry
                          ? <>
                              <Countryinfo country={specificCountry} />
                              <button onClick={() => setSpecificCountry('')} >Back</button>
                            </>
                          : <div>
                              {
                                matches.map(c => <div key={c}>
                                  {c}
                                  <button onClick={() => setSpecificCountry(c)} >
                                    Show
                                  </button>
                                </div>)
                              }
                            </div>
          }
        </>
    )
}
export default Display