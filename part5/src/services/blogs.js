import axios from 'axios'
const baseUrl = '/api/blogs'
//const baseUrl = 'http://localhost:3001/api/persons'

let token = null

const setToken = newToken => {
  token = 'Bearer ' + newToken
}

/*const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}*/

const getAll = () => {
  const res = axios.get(baseUrl)
  return res.then(response => response.data)
}

const createNew = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.post(baseUrl, newBlog, config)
  return res.data
}

export default { getAll, createNew, setToken }