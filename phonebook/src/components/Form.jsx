import { useState } from "react";

export function Form({ saveContact }) {
  const [newName, setNewName] = useState('')
  const [newPhoneNum, setNewPhoneNum] = useState('')

  /**
   * @description Handles changes in the name input field.
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event.
   */
  const handleNameChange = (event) => {
    console.log('new event: ', event.target)
    setNewName(event.target.value)
  }

  /**
   * @description Handles changes in the phone number input field.
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event.
   */
  const handlePhoneChange = (event) => {
    console.log('new event: ', event.target)
    setNewPhoneNum(event.target.value)
  }

  /**
   * @description Handles form submission to add a new contact.
   * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!newName || !newPhoneNum) return;
    saveContact(newName, newPhoneNum)
    setNewName('')
    setNewPhoneNum('')
    console.log(`${newName} has been submitted via form`)
  }

  return (
      <form onSubmit={handleSubmit}>
        <h3>Add a contact</h3>
        <div>
          Name: <input value={newName}
                       onChange={handleNameChange} />
        </div>
        <div>Phone: <input value={newPhoneNum}
                           onChange={handlePhoneChange} />
          <button type="submit">add</button>
        </div>
      </form>
  )
}