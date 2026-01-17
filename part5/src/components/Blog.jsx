import { useState } from 'react'

const Blog = ({ blog, updateBlogOnLike, byUser, handleDeleteParent }) => {

  const [viewDetails, setViewDetails] = useState(false)
  const [likes, setLikes] = useState(blog.likes)


  const handleLike = () => {
    setLikes(likes + 1)
    const updatedBlog = { ...blog, likes: likes + 1, user: blog.user.id }
    // Should this be in a .then? Currently, no - no need to wait for the response
    updateBlogOnLike(updatedBlog)
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      handleDeleteParent(blog.id)
    }
  }

  return (
    <div style={{
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setViewDetails(!viewDetails)} >{viewDetails ? 'hide' : 'view'}</button>
      </div>
      {
        viewDetails &&
        <div>
          <div>{blog.url}</div>
          <div>
            likes {likes}
            <button onClick={handleLike} >
              like
            </button>
          </div>
          <div>{blog.user.name}</div>
          {byUser &&
          <div>
            <button onClick={handleDelete} >
              delete
            </button>
          </div>}
        </div>
      }
    </div>
  )
}
export default Blog