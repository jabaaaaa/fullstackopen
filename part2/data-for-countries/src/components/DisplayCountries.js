import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Country from './Country'
import Weather from './Weather'

const MAX_COUNTRIES_DISPLAYED = 10

const DisplayCountries = ({filteredCountryData}) => {
    
    const [countries, setCountries] = useState(filteredCountryData)
    const [weatherData, setWeather] = useState('')

    useEffect(() => {
        setCountries(filteredCountryData)
    }, [filteredCountryData])

    useEffect(() => {
        if (countries.length !== 0) {
            let weatherRequest = axios
                .get(`http://api.openweathermap.org/data/2.5/weather?q=${countries[0].capital}&appid=5447fbdda2013cf1b1780515a3b99ce5`)
                .then(response=> {
                    setWeather(response.data)
                })
        }
    }, [countries])

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
            <>
                <Country
                name={countries[0].name}
                capital={countries[0].capital}
                population={countries[0].population}
                languages={countries[0].languages}
                flag={countries[0].flag}
                />
                <Weather
                    countries={countries}
                    weatherData={weatherData}
                />
            </>

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

