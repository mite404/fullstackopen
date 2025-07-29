import { useState, useEffect } from 'react'
import './App.css'
import axios from "axios";
import {Search} from "./components/Search.jsx";

function App() {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {

    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
        console.log('Got countries:', response.data)
        setCountries(response.data)
      } catch(error) {
        console.error('Error fetching countries', error)
      }
    }

    fetchCountries()
  }, []);

  const filterCountries = (searchTerm) => {
    const filteredArray = countries.filter(country => country.name.common.toLowerCase().includes(searchTerm.toLowerCase()))

    return filteredArray
  }

  const handleSearch = (event) => {
    console.log('search event:', event.target)
    setSearchTerm(event.target.value)
  }

  const updatedCountries = filterCountries(searchTerm)

  return (
    <>
      <h1>Country Info Search</h1>
      <Search value={searchTerm} onChange={handleSearch} />
      <p>Found {countries.length} countries</p>
      {updatedCountries.length > 10 ? (
          <p>Too many matches, please refine search</p>
      ) : (
          <ul>
            {updatedCountries.map(country => (
                <li key={country.ccn3}>
                  <p>{country.name.common}</p>
                </li>
            ))}
          </ul>
      )}
      {updatedCountries.length === 1 && (
          <p>Individual country's details here</p>
      )}
    </>
  )
}

export default App
