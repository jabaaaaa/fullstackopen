import React, { useEffect, useState } from 'react'
import Country from './Country'
const MAX_COUNTRIES_DISPLAYED = 10

const DisplayCountries = ({filteredCountryData}) => {
    
    const [countries, setCountries] = useState(filteredCountryData)

    useEffect(() => {
        setCountries(filteredCountryData)
    }, [filteredCountryData])

    const changeCountry = (country) => {
        setCountries([country])
    }
    
    if (countries.length > MAX_COUNTRIES_DISPLAYED) {
        return (
            <>
            Too many matches, specify another filter
            </>
        )
    } else if (countries.length === 1) {
        return (
            <Country
            name={countries[0].name}
            capital={countries[0].capital}
            population={countries[0].population}
            languages={countries[0].languages}
            flag={countries[0].flag}
            />
        )
    
    } else {
        return (
            <>
            {countries.map(country =>
                <p 
                key={country.name}>
                {country.name}
                <button onClick={() => changeCountry(country)}>show</button>
                </p>
            )}
            </>
        )
    }
}
export default DisplayCountries

