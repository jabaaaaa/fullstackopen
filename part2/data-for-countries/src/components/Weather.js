import react from 'react'

const kelvinToCelsius = (kelvin) =>  Math.floor(kelvin - 272.15)

const Weather = ({countries, weatherData}) => {
    console.log(weatherData.main);
    return (
        <>
        <h2>Temperature in {countries[0].capital}</h2>
            <p>Temperature: {kelvinToCelsius(weatherData.main.temp)} Celsius</p>
            <img 
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt="Image download failed"
                />
            <p>wind: {weatherData.wind.speed} direction {weatherData.wind.deg}</p>
        </>
    )
}

export default Weather