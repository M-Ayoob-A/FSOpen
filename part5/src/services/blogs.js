import axios from 'axios'
const baseUrl = '/api/blogs'
//const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
  token = 'Bearer ' + newToken
}

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

const updateBlog = async updatedBlog => {
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.put(baseUrl + '/' + updatedBlog.id.toString(), updatedBlog, config)
  return res.data
}

export default { getAll, createNew, setToken, updateBlog }