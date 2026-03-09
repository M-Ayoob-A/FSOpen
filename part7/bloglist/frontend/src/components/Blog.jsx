import { useState } from "react";
import { useDispatch } from "react-redux";
import { likeBlog, removeBlog } from "../reducers/blogReducer";

const Blog = ({ blog, updateBlogOnLike, byUser, handleDeleteParent }) => {
  const [viewDetails, setViewDetails] = useState(false);
  const [likes, setLikes] = useState(blog.likes);

  const dispatch = useDispatch()

  const handleLike = () => {
    setLikes(likes + 1);
    const updatedBlog = { ...blog, likes: likes + 1, user: blog.user.id };
    dispatch(likeBlog(updatedBlog));
  };

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
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
