import { useState } from 'react'
import './App.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNum, setNewPhoneNum] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const addContact = (event) => {
    event.preventDefault()

    if(persons.find(person => person.name === newName || person.phonenumber === newPhoneNum)) {
      alert(`name: ${newName} / phone number: ${newPhoneNum} already in the phonebook`)
      return
    }

    const personObject = {
      id: String(persons.length + 1),
      name: newName,
      phonenumber: newPhoneNum,
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewPhoneNum('')
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleNameChange = (event) => {
    console.log('new event: ', event.target)
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    console.log('new event: ', event.target)
    setNewPhoneNum(event.target.value)
  }

  const handleSearch = (event) => {
    console.log('new event: ', event.target)
    setSearchTerm(event.target.value)
  }

  const removeHyphens = (phoneNumber) => {
    return phoneNumber.replace(/-/g, '');
  }

  return (
      <div>
        <h2>Phonebook</h2>
        <h3>Search: <input  value={searchTerm}
                            onChange={handleSearch}/></h3>
        <hr/>
        <form onSubmit={addContact}>
          <h3>Add a contact</h3>
          <div>
            name: <input  value={newName}
                          onChange={handleNameChange}/>
          </div>
          <div>phone: <input  value={newPhoneNum}
                              onChange={handlePhoneChange}/>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
        <h2>Names</h2>
        <div>
          {filteredPersons.map(person =>
            <div key={person.name}>{person.name}: {removeHyphens(person.phonenumber)}</div>)}
        </div>
      </div>
  )
}

export default App