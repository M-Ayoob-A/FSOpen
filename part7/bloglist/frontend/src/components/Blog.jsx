import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { likeBlog, removeBlog, commentBlog } from "../reducers/blogReducer";
import { useState } from "react";

const Blog = ({ blog, user }) => {
  
  const [comment, setComment] = useState("")
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id };
    dispatch(likeBlog(updatedBlog));
  };

  const handleAddComment = () => {
    dispatch(commentBlog(blog.id, comment))
    setComment("")
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        dispatch(removeBlog(blog.id));
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    }
  };

  if (!blog) {
    return null;
  }
  return (
    <>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div>{blog.url}</div>
      <div>
        {blog.likes} likes
        <button onClick={handleLike}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      {user && blog.user.id === user.id && (
        <div>
          <button onClick={handleDelete}>delete</button>
        </div>
      )}
      <h3>comments</h3>
      <div>
        <input
          type="text"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <button onClick={handleAddComment} >add comment</button>
      </div>
      <ul>
        {
          blog.comments.map(c => <li key={c}>{c}</li>)
        }
      </ul>
    </>
  );
};
export default Blog;
