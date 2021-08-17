import { useEffect, useState } from 'react';
import axios from 'axios'
import DisplayCountries from './components/DisplayCountries'

function App() {

  const [countryData, setCountries] = useState([])
  const [newSearch, setNewSearch] = useState('')

  const hook = () => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
  }

  useEffect(hook, [])
  
  const handleNewSearch = (event) => {
    setNewSearch(event.target.value)
  }

  const filteredCountryData = countryData
  .filter(data => data.name.toLowerCase()
     .includes(newSearch.toLowerCase()))

  return (
    <div>
      <form>
        find countries
        <input
          value={newSearch}
          onChange={handleNewSearch}
        />
      </form>
    <DisplayCountries
      filteredCountryData={filteredCountryData} />
    </div>

  );
  
}

export default App;
