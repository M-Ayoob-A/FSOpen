import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { likeBlog, removeBlog, commentBlog } from "../reducers/blogReducer";
import { useState } from "react";
import ErrorBoundary from "./ErrorBoundary";

import TextField from '@mui/material/TextField';
import useField from "../services/fieldHook";
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";


const Blog = ({ blog, user }) => {
  
  const commentField = useField("text")
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLike = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id };
    dispatch(likeBlog(updatedBlog));
  };

  const handleAddComment = () => {
    dispatch(commentBlog(blog.id, commentField.value))
    commentField.clear()
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
      <ErrorBoundary>
        
        <Typography variant="h4" >{blog.title} {blog.author}</Typography>

        <div>{blog.url}</div>
        <div>
          {blog.likes} likes
          <Button onClick={handleLike}>like</Button>
        </div>
        <div>added by {blog.user.name}</div>
        {user && blog.user.id === user.id && (
          <div>
            <Button onClick={handleDelete} color="error">delete</Button>
          </div>
        )}
        <div style={{ height: '20px' }} ></div>
        <Typography variant="h4" >Comments</Typography>
        <div style={{ alignItems: 'center', display: 'flex' }} >
          <TextField {...commentField.fieldAttrs} />
          <Button onClick={handleAddComment} >add comment</Button>
        </div>
        <List>
          {blog.comments.map(c => (
              <ListItem key={c}>{c}</ListItem>
          ))}
        </List>
      </ErrorBoundary>
    </>
  );
};
export default Blog;
