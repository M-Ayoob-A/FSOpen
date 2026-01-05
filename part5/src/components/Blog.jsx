import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog, updateBlogOnLike }) => {
  
  const [viewDetails, setViewDetails] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const handleLike = () => {
    setLikes(likes + 1)
    const updatedBlog = {...blog, likes: likes + 1, user: blog.user.id}
    blogService.updateBlog(updatedBlog)
    // Should this be in a .then? Currently, no - no need to wait for the response
    updateBlogOnLike(updatedBlog)
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
          
        </div>
      }
    </div>  
  )
}
export default Blog