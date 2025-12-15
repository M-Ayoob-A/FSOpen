import axios from 'axios'
const baseUrl = '/api/persons'
//const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
  return axios.get(baseUrl).then(res => res.data)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const deleteEntry = id => {
  return axios.delete(baseUrl + '/' + id)
}

const change = (id, newObj) => {
  return axios.put(baseUrl + '/' + id, newObj)
}

export default { 
  getAll: getAll, 
  create: create,
  deleteEntry: deleteEntry,
  change: change
}