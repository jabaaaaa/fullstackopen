import React, { useState } from 'react'
import "./../App.css";

const Country = ({name, capital, languages, population, flag}) => {
    //console.log(props);
    return (
        <>
            <h1>{name}</h1>
            <p>capital {capital}</p>
            <p>population {population}</p>
            <h2>Spoken languages</h2>
            {languages.map(data => 
            <li key={data.name}>{data.name}</li>
            )}
            <p></p>
             <img src={flag}  id="flagImage"  />
        </>
    )
}

export default Country
