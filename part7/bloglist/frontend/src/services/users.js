import axios from 'axios'
const baseUrl = '/api/users'
//const baseUrl = 'http://localhost:3003/api/users'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return await res.data
}

export default { getAll }