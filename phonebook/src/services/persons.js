import axios from "axios";
const baseUrl = 'http://localhost:3001/persons'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  console.log('Data fetched successfully', response.data)
  // ensure response.data.persons is an array if not, set validPersons to an empty array
  const validPersons = Array.isArray(response.data) ? response.data : []
  return validPersons
}

const create = async (personObject) => {
  const response = await axios.post(`${baseUrl}`, personObject)
  return response.data
}

const update = async (personId, updatedPersonObject) => {
  const response = await axios.put(`${baseUrl}/${personId}`, updatedPersonObject)
  return response.data
}

const deletePerson = async (personId) => {
  await axios.delete(`${baseUrl}/${personId}`)
}

export default { getAll, create, update, delete: deletePerson }