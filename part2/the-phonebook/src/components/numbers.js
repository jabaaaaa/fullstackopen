import React, { useState } from 'react'
import Number from './number'

const Numbers = ({persons, newSearch}) => {
    return (
        <>
            {persons
            .filter(person => 
               person.name.toLowerCase().includes(
               newSearch.toLowerCase()))
            .map(person => 
               <Number 
                 key={person.name} 
                 name={person.name} 
                 number={person.number}
               />
            )}
        </>
    )
}

export default Numbers


