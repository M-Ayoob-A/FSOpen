import Blog from "./Blog"

const BlogList = (blogs, updateBlogOnLike, handleDelete, user) => {
  return (
    <>
      {blogs.length
      ? <div>
          <h2>blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} updateBlogOnLike={updateBlogOnLike} byUser={blog.user.id === user.id} handleDeleteParent={handleDelete} />
          )}
        </div>
      : <div></div>}
    </>
    
  )
}
//  <BlogList blogs={blogs} updateBlogOnLike={updateBlogOnLike} handleDelete={handleDelete} user={user} />
 
export default BlogList