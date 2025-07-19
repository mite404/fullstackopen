import { useState } from 'react'
import './App.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()

    if(persons.find(person => person.name === newName)) {
      alert(`${newName} is already in the phonebook`)
      return
    }

    const personObject = {
      id: String(persons.length + 1),
      name: newName
    }

    setPersons(persons.concat(personObject))
    setNewName('')
  }

  const handleNameChange = (event) => {
    console.log('new event: ', event.target)
    setNewName(event.target.value)
  }

  return (
      <div>
        <h2>Phonebook</h2>
        <form onSubmit={addName}>
          <div>
            name: <input  value={newName}
                          onChange={handleNameChange}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
        <h2>Names</h2>
        <div>
          {persons.map(person =>
            <div key={person.name}>{person.name}</div>)}
        </div>
      </div>
  )
}

export default App