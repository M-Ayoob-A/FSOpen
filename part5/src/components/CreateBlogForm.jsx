import { useState } from "react"
import blogService from '../services/blogs'

const CreateBlogForm = ({ blogs, setBlogs, setNotifMessage, setErrorMessage }) => {
  
  const [title, setTitle] = useState('') 
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async event => {
    event.preventDefault()
    
    const newBlog = {
      title: title,
      author: author,
      url: url
    }

    try {
      const createdBlog = await blogService.createNew(newBlog)
      //console.log(createdBlog)
      setBlogs(blogs.concat(createdBlog))
      
      setNotifMessage(`a new blog ${title} by ${author}`)
      setTimeout(() => {
        setNotifMessage(null)
      }, 5000)
    } catch (error) {
      //console.log(error)
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    
  }


  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          <label>
            title
            <input
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            author
            <input
              type="text"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            url
            <input
              type="text"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default CreateBlogForm