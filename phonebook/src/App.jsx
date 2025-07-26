import {useEffect, useState} from 'react'
import './App.css'
import { Search } from './components/Search.jsx'
import { PhonebookList } from './components/PhonebookList.jsx'
import { Form } from "./components/Form.jsx";
import axios from "axios";
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [searchTerm, setSearchTerm] = useState('')


  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const persons = await personsService.getAll()

        setPersons(persons)
      } catch (error) {
          console.error('Error fetching phonebook:', error)
      }
    }
    fetchPersons()
  }, []);


  /**
   * Adds a new contact to the phonebook.
   *
   * @param {string} newName - The name of the person.
   * @param {string} newPhoneNum - The phone number of the person.
   */
  const addContact = async (newName, newPhoneNum) => {
    if (persons.find(person => person.name === newName || person.number === newPhoneNum)) {
      alert(`name: ${newName} / phone number: ${newPhoneNum} already in the phonebook`);
      return;
    }

    const personObject = {
      name: newName,
      number: newPhoneNum,
    }

    try {
      const newPerson = await personsService.create(personObject)

      setPersons([...persons, newPerson])
      console.log(newPerson)
    } catch (error) {
        console.error('Error saving person:', error)
      }
  }


  /**
   * Updates the phone number of a specific person in the persons array.
   *
   * @param {string} newPhoneNum - The new phone number for the person.
   * @param {number} personId - The ID of the person whose contact information needs to be updated.
   */
  const updateContact = async (newPhoneNum, personId) => {
    const existingContact = persons.find(person => person.id === personId)
    const updatedPersonObject = {
      id: personId,
      name: existingContact.name,  // keep same name
      number: newPhoneNum         // NEW phone number
    }

    try {
      const updatedPerson = await personsService.update(personId, updatedPersonObject)

      const updatedPersonsArray = persons.map(person => {
        if (person.id === personId) {
          console.log(`${existingContact.name}'s phone number updated to: ${updatedPerson.number}`)
          return updatedPerson
        } else {
          return person
        }
      })
      setPersons(updatedPersonsArray)
    } catch (error) {
      console.error('Error saving new phone number:', error)
    }
  }

  /**
   * Saves or updates a contact.
   *
   * This function checks if a person with the given name already exists in the contacts list.
   * If not, it adds the new contact. If the contact exists, it prompts the user whether to update
   * the existing contact's phone number.
   *
   * @param {string} newName - The name of the person.
   * @param {string} newPhoneNum - The new phone number for the contact.
   */
  const saveContact = (newName, newPhoneNum) => {
    const existingPerson = persons.find(person => person.name === newName)

    if (!existingPerson) {
      addContact(newName, newPhoneNum)
    }
    else if (existingPerson) {
      const userConfirmsUpdate = window.confirm(`${existingPerson.name} already exists! Would you like to update their contact info?`)

      if (userConfirmsUpdate) return updateContact(newPhoneNum, existingPerson.id)
    }
  }

  /**
   * @description Handles changes in the search term input field.
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event.
   */
  const handleSearch = (event) => {
    console.log('new event: ', event.target)
    setSearchTerm(event.target.value)
  }

  /**
   * Deletes a person from the list based on their ID after user confirmation.
   *
   * @param {number} personId - The ID of the person to be deleted.
   */
  const onDelete = async (personId) => {
    const personToDel = persons.find(person => person.id === personId)

    if (personToDel) {
      const userConfirmsDel = window.confirm(`Do you want to delete this entry?`)

      if (userConfirmsDel) {
        try {
          await personsService.delete(personId)
          const updatedPersonsArray = persons.filter(person => person.id !== personId)

          setPersons(updatedPersonsArray)
          console.log('Deleted:', personToDel.name)

        } catch (error) {
            console.error(`Error deleting ${personToDel}:`, error)
        }
      }
    }
  }

  return (
      <div>
        <h2>Phonebook</h2>
        <Form saveContact={saveContact} />
        <hr/>
        <Search value={searchTerm}
                onChange={handleSearch} />
        <PhonebookList persons={persons}
                       searchTerm={searchTerm}
                        onDelete={onDelete} />
      </div>
  )
}

export default App