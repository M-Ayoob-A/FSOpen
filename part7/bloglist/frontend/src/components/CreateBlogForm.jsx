import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { triggerNotification } from "../reducers/notifReducer";

import TextField from '@mui/material/TextField';
import useField from "../services/fieldHook";
import Button from '@mui/material/Button';

const CreateBlogForm = () => {
  const authorField = useField("text")
  const urlField = useField("text")
  const titleField = useField("text")

  const dispatch = useDispatch();

  const handleCreate = async (event) => {
    event.preventDefault();

    if (!(titleField.value && authorField.value && urlField.value)) {
      dispatch(
        triggerNotification(
          `please complete all fields`,
          true,
        ),
      );
    }

    const newBlog = {
      title: titleField.value,
      author: authorField.value,
      url: urlField.value,
      comments: []
    };

    try {
      dispatch(createBlog(newBlog));
      dispatch(
        triggerNotification(
          `a new blog ${newBlog.title} by ${newBlog.author}`,
          false,
        ),
      );
      titleField.clear()
      authorField.clear()
      urlField.clear()
    } catch (e) {
      console.log(e);
      dispatch(triggerNotification("wrong credentials", true));
    }
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div>
          <label>
            title
            <TextField {...titleField.fieldAttrs} />
          </label>
        </div>
        <div>
          <label>
            author
            <TextField {...authorField.fieldAttrs} />
          </label>
        </div>
        <div>
          <label>
            url
            <TextField {...urlField.fieldAttrs} />
          </label>
        </div>
        <Button variant="outlined" type="submit">Create</Button>
      </form>
    </div>
  );
};

export default CreateBlogForm;
