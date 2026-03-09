import { useState } from "react";
import { useDispatch } from "react-redux";
import { likeBlog, removeBlog } from "../reducers/blogReducer";

const Blog = ({ blog, updateBlogOnLike, byUser, handleDeleteParent }) => {
  const [viewDetails, setViewDetails] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const dispatch = useDispatch()

  // Can be reduced to a single dispatch call
  const handleLike = () => {
    setLikes(likes + 1); // May need this even with redux
    const updatedBlog = { ...blog, likes: likes + 1, user: blog.user.id };
    // Should this be in a .then? Currently, no - no need to wait for the response
    //updateBlogOnLike(updatedBlog);
    dispatch(likeBlog(updatedBlog));
  };

  /*const updateBlogOnLike = (updatedBlog) => {
    
    setBlogsAfterSort(
      blogs.map((blog) =>
        blog.id === updatedBlog.id
          ? { ...blog, likes: updatedBlog.likes }
          : blog,
      ),
    );
  };*/



  // Replace hDP call with dispatch
  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      //handleDeleteParent(blog.id);
      try {
        dispatch(removeBlog(blog.id));        
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div
      style={{
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5,
      }}
    >
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setViewDetails(!viewDetails)}>
          {viewDetails ? "hide" : "view"}
        </button>
      </div>
      {viewDetails && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {likes}
            <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {byUser && (
            <div>
              <button onClick={handleDelete}>delete</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Blog;
