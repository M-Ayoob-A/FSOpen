import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notif from './components/Notif'
import Error from './components/Error'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import blogService from './services/blogs'

const App = () => {
  
  const [notifMessage, setNotifMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(null)
  
  /////////////////////////////// LOGIN THINGS
  

  const handleLogOut = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('blogsAppUser')
    setUser(null)
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('blogsAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  /////////////////////////////// LOGIN THINGS
  /*
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
      setBlogs(blogs.concat(createdBlog))
      //console.log(blogs)
      
      setNotifMessage(`a new blog ${title} by ${author}`)
      setTimeout(() => {
        setNotifMessage(null)
      }, 5000)
    } catch {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    
  }

  const createBlog = () => (
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
  */

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    })
  }, [])

  return (
    <>
      <Notif message={notifMessage} />
      <Error message={errorMessage} />
      {!user && <LoginForm setUser={setUser} setErrorMessage={setErrorMessage} setToken={blogService.setToken} />}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogOut}>logout</button>
          <CreateBlogForm blogs={blogs} setBlogs={setBlogs} setNotifMessage={setNotifMessage} setErrorMessage={setErrorMessage} />
          {blogList()}
        </div>
      )}
    </>
  )
}

export default App