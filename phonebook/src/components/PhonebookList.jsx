export function PhonebookList({ persons, searchTerm }) {
  // @description Filters persons based on the search term.
  // @returns {Array} - An array of filtered persons.

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))

  /**
   * @description Removes hyphens from a phone number.
   * @param {string} phoneNumber - The phone number to remove hyphens from.
   * @returns {string} - The phone number with hyphens removed.
   */
  const removeHyphens = (phoneNumber) => {
    return phoneNumber.replace(/-/g, '');
  }

  return (
      <ul>
        {filteredPersons.map(person =>
            <li key={person.id}>{person.name}: {removeHyphens(person.phonenumber)}
            </li>
        )}
      </ul>
  )
}