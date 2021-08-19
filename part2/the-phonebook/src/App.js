import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AddPerson from './components/addPerson'
import People from './components/People'
import SearchPerson from './components/searchPerson'
import peopleService from './services/modifyPeople'

const App = () => {

  const [people, setPeople] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')

  useEffect(() => {
    peopleService
      .getAll()
      .then(initialPeople => {
          setPeople(initialPeople)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const findPerson = people.find(person => 
      person.name === newName)
      
    if (newName === '' || newNumber === '') {
      alert(`Fill required inputs`)
      return
    }

    const newPersonObject = {
      name: newName,
      number: newNumber,
    }

    // if person is already added
     if (findPerson !== undefined) {

      const updateNumber = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`)

      if (updateNumber) {
        peopleService
        .update(findPerson.id, newPersonObject)
        .then(returnedPerson => {
          setPeople(
            people.map(person =>
              person.id !== findPerson.id ? person : returnedPerson
            )
          )
        })
        .catch(error => {
          alert("person number could not be updated")
        })
      }
    } else {
      peopleService
          .create(newPersonObject)
          .then(returnedPerson => {
            setPeople(people.concat(returnedPerson))
          })
          .catch(error => {
            alert("Person could not be added to server")
          })
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id) => {
    peopleService
        .deleteObject(id)
        .then(returnedPerson => {
          setPeople(people.filter(person => person.id !== id))
        })
        .catch(error => {
          alert("person could not be deleted")
        })
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
      <People
          persons={people}
          newSearch={newSearch}
          deletePerson={deletePerson}
      />
    </div>
  )
}

export default App