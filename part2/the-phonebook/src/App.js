import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AddPerson from './components/addPerson'
import People from './components/People'
import SearchPerson from './components/searchPerson'
import peopleService from './services/modifyPeople'
import Notification from './components/Notification'

const App = () => {

  const [people, setPeople] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [notification, setNotification] = useState(
    {message: '', color: '', backgroundColor: ''})

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

    // if person is already added, update number
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
          setNotification(
            {message: `${newPersonObject.name}'s number was updated`,
            color: 'green', backgroundColor: '#dcedc8'})
        })
        .catch(error => {
          setNotification(
            {message: `Information of ${newPersonObject.name} has already been removed from server`,
            color: 'red', backgroundColor: 'mistyrose'})
        })
      }
    // if person is not added, add new person + number
    } else {
      peopleService
          .create(newPersonObject)
          .then(returnedPerson => {
            setPeople(people.concat(returnedPerson))
            setNotification(
              {message: `Added ${newPersonObject.name}`,
              color: 'green', backgroundColor: '#dcedc8'})
          })
          .catch(error => {
            setNotification(
              {message: `${newPersonObject.name} could not be added to server`,
              color: 'red', backgroundColor: 'mistyrose'})
          })
    }
    setNewName('')
    setNewNumber('')

    setTimeout(() => {
      setNotification({message: ''})
    }, 5000)
  }

  const deletePerson = (id, name) => {
    const deletePerson = window.confirm(`Delete ${name}?`);
    if (deletePerson) {
      peopleService
        .deleteObject(id)
        .then(returnedPerson => {
          setPeople(people.filter(person => person.id !== id))
          setNotification(
            {message: `${name} was deleted`,
            color: 'green', backgroundColor: '#dcedc8'})
        })
        .catch(error => {
          setNotification(
            {message: `Information of ${name} has already been removed from server`,
            color: 'red', backgroundColor: 'mistyrose'})
        })
      setTimeout(() => {
        setNotification({message: ''})
      }, 5000)
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
      <Notification 
        message={notification.message} 
        color={notification.color}
        backgroundColor={notification.backgroundColor}
        />
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