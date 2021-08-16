import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AddPerson from './components/addPerson'
import Numbers from './components/numbers'
import SearchPerson from './components/searchPerson'

const App = () => {

  const [persons, setPersons] = useState([])

  const hook = () => {
    console.log('effect');
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled');
        console.log(response.data); // TODO delete
        setPersons(response.data)
      })
  }

  useEffect(hook, [])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')

  // return true if user inputs are valid
  const verifyForm = () => {
    const findPerson = persons.find(person => 
      person.name === newName)

    if (findPerson !== undefined) {
      alert(`${newName} is already added to phonebook`)
      return false
    } else if (newName === '' || newNumber === '') {
      alert(`Fill required inputs`)
      return false
    }
    return true
  }

  const addPerson = (event) => {
    event.preventDefault()

    const userInputIsValid = verifyForm()

    if (userInputIsValid) {
      setPersons(persons.concat({name : newName,
        number: newNumber}))
      setNewName('')
      setNewNumber('')
    }
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchPerson 
        newSearch={newSearch}
        handleSearchChange={handleSearchChange}
      />

      <h2>add a new</h2>
      <AddPerson 
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handlePersonChange={handlePersonChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Numbers 
          persons={persons}
          newSearch={newSearch}
      />
    </div>
  )
}

export default App