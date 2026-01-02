import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  
  /////////////////////////////// LOGIN THINGS
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('blogsAppUser', JSON.stringify(user)) 
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      /*setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)*/
      console.log('login error')
    }
  }

  const handleLogOut = async () => {
    console.log('logging out', username, password)
    window.localStorage.removeItem('blogsAppUser')
    setUser(null)
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('blogsAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      //blogService.setToken(user.token)
    }
  }, [])

  const loginForm = () => (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )

  /////////////////////////////// LOGIN THINGS

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  return (
    <>
      {!user && loginForm()}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogOut}>logout</button>
          {blogList()}
        </div>
      )}
    </>
  )
}

export default App