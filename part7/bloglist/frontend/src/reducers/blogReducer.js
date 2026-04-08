import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const initialBlogsState = [];

const blogSlice = createSlice({
  name: "blogs",
  initialState: initialBlogsState,
  reducers: {
    addNew(state, action) {
      state.push(action.payload);
    },
    like(state, action) {
      const blogId = action.payload;
      const blogToLike = state.find((b) => b.id === blogId);
      const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1 };
      return state
        .map((b) => (b.id !== blogId ? b : likedBlog))
        .sort((a, b) => b.likes - a.likes);
    },
    remove(state, action) {
      return state.filter((b) => b.id !== action.payload);
    },
    initialise(state, action) {
      return action.payload.sort((a, b) => b.likes - a.likes);
    },
    comment(state, action) {
      const blogId = action.payload.id
      const blogToComment = state.find((b) => b.id === blogId);
      const commentsList = blogToComment.comments
      const newList = [ ...commentsList, action.payload.comment ]
      return state
        .map((b) => (b.id !== blogId ? b : { ...blogToComment, comments: newList }))
    }
  },
});

const { addNew, like, remove, initialise, comment } = blogSlice.actions;

export const createBlog = (blog) => {
  return async (dispatch) => {
    const createdBlog = await blogService.createNew(blog);
    dispatch(addNew(createdBlog));
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id);
    dispatch(remove(id));
  };
};

export const initialiseBlogs = () => {
  return (dispatch) => {
    blogService.getAll().then((blogs) => {
      dispatch(initialise(blogs));
    });
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.likeBlog(blog);
    dispatch(like(blog.id));
  };
};

export const commentBlog = (id, newComment) => {
  return async (dispatch) => {
    await blogService.commentBlog(id, newComment);
    dispatch(comment({ id: id, comment: newComment }));
  };
};

export default blogSlice.reducer;
