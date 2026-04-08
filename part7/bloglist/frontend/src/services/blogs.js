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

const likeBlog = async updatedBlog => {
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.put(baseUrl + '/' + updatedBlog.id.toString() + '/like', { likes: updatedBlog.likes }, config)
  return res.data
}

const deleteBlog = async blogToDelete => {
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.delete(baseUrl + '/' + blogToDelete, config)
  return res.data
}

const commentBlog = async (id, newComment) => {
  const config = {
    headers: { Authorization: token }
  }

  const res = await axios.put(baseUrl + '/' + id.toString() + '/comment', { comment: newComment }, config)
  return res.data
}

export default { getAll, createNew, setToken, likeBlog, deleteBlog, commentBlog }