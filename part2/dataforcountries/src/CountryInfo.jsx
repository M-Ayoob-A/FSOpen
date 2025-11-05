import { useState, useEffect } from "react"
import axios from "axios"

const Countryinfo = ({ country }) => {
    
    const [info, setInfo] = useState({})
    const [weather, setWeather] = useState({})
    const api_key = import.meta.env.VITE_SOME_KEY

    useEffect(() => {
      axios.get("https://studies.cs.helsinki.fi/restcountries/api/name/" + country.toLowerCase())
          .then(res => {
            setInfo(res.data)
            return res.data.capitalInfo.latlng
          })
          .then(latlng => {
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${api_key}&units=metric`)
                .then(resp => {
                  setWeather({
                    temp: resp.data.main.temp,
                    icon: resp.data.weather[0].icon,
                    wind: resp.data.wind.speed
                  })
                })
          })
    }, [country])

    
    return (
        <>
          <h1>{country}</h1>
          <div>
            <div>Capital {info.capital}</div>
            <div>Area {info.area}</div>
          </div>
          {
            !Object.keys(info).length 
              ? <></> 
              : <>
                  <h2>Languages</h2>
                  <ul>
                    {Object.values(info.languages).map(l => <li key={l}>{l}</li>)}
                  </ul>
                  <img src={info.flags.svg} alt={info.flags.alt} style={{maxHeight: '200px'}} />
                  {
                    !Object.keys(weather).length
                      ? <></>
                      : <>
                          <h2>Weather in {info.capital}</h2>
                          <div>
                            <div>Temperature {weather.temp} Celsius</div>
                            <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} />
                            <div>Wind {weather.wind} m/s</div>
                          </div>
                        </>
                  }
                </>
          }
        </>
    )
}
export default Countryinfo