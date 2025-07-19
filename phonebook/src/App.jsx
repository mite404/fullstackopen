import {useState} from 'react'
import './App.css'
import { Search } from './components/Search.jsx'
import { PhonebookList } from './components/PhonebookList.jsx'
import { Form } from "./components/Form.jsx";


const App = () => {
  const [persons, setPersons] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const addContact = (newName, newPhoneNum) => {
    if (persons.find(person => person.name === newName || person.phonenumber === newPhoneNum)) {
      alert(`name: ${newName} / phone number: ${newPhoneNum} already in the phonebook`);
      return;
    }

    const personObject = {
      id: String(persons.length + 1),
      name: newName,
      phonenumber: newPhoneNum,
    }

    setPersons([...persons, personObject])
  }

  /**
   * @description Handles changes in the search term input field.
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event.
   */
  const handleSearch = (event) => {
    console.log('new event: ', event.target)
    setSearchTerm(event.target.value)
  }

  return (
      <div>
        <h2>Phonebook</h2>
        <Form addContact={addContact} />
        <hr/>
        <Search value={searchTerm}
                onChange={handleSearch} />
        <PhonebookList persons={persons}
                       searchTerm={searchTerm} />
      </div>
  )
}

export default App