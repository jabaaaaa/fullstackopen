import React, { useState } from 'react'
import Person from './Person'

const People = ({persons, newSearch, deletePerson}) => {
    return (
        <>
            {persons
            .filter(person => 
               person.name.toLowerCase().includes(
               newSearch.toLowerCase()))
            .map(person => 
               <Person 
                 key={person.name}
                 id={person.id} 
                 name={person.name} 
                 number={person.number}
                 deletePerson={deletePerson}
               />
            )}
        </>
    )
}

export default People


