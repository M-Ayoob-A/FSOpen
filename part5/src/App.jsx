import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notif from './components/Notif'
import Error from './components/Error'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Toggle from './components/Toggle'
import blogService from './services/blogs'

const App = () => {
  
  const [notifMessage, setNotifMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const handleLogOut = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('blogsAppUser')
    setUser(null)
  }

  const addNewBlog = createdBlog => {
    setBlogs(blogs.concat(createdBlog))
    console.log(blogs)
  }

  const setBlogsAfterSort = newBlogs => {
    setBlogs(newBlogs.sort((b1, b2) => b2.likes - b1.likes))
  }

  const updateBlogOnLike = updatedBlog => {
    setBlogsAfterSort(blogs.map(blog => blog.id === updatedBlog.id ? {...blog, likes: updatedBlog.likes} : blog))
  }

  const updateBlogsOnDelete = id => {
    setBlogs(blogs.filter(b => b.id !== id))
  }

  const handleDelete = idOfBlogToDelete => {
    try {
      blogService.deleteBlog(idOfBlogToDelete)
      updateBlogsOnDelete(idOfBlogToDelete)
    } catch (err) {
      console.log(err)
    }
  } 

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('blogsAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }

    blogService.getAll().then(blogs => {
      setBlogsAfterSort(blogs)
      //console.log(blogs)
    })
  }, [])

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlogOnLike={updateBlogOnLike} byUser={blog.user.id === user.id} handleDeleteParent={handleDelete} />
      )}
    </div>
  )

  return (
    <>
      <Notif message={notifMessage} />
      <Error message={errorMessage} />
      {!user && <LoginForm setUser={setUser} setErrorMessage={setErrorMessage} setToken={blogService.setToken} />}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogOut}>logout</button>
          <Toggle buttonLabel='create new blog'>
            <CreateBlogForm handleUpdateBlogs={addNewBlog} setNotifMessage={setNotifMessage} setErrorMessage={setErrorMessage} />
          </Toggle>
          {blogList()}
        </div>
      )}
    </>
  )
}

export default App