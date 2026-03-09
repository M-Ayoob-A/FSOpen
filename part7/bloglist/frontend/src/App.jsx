import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notif from "./components/Notif";
import LoginForm from "./components/LoginForm";
import CreateBlogForm from "./components/CreateBlogForm";
import Toggle from "./components/Toggle";
import BlogList from "./components/BlogList";
import blogService from "./services/blogs";

import { useSelector, useDispatch } from "react-redux";
import { triggerNotification } from "./reducers/notifReducer";
import { initialiseBlogs, createBlog } from "./reducers/blogReducer";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();
  const reduxBlogs = useSelector(state => state.blogs)
  console.log(reduxBlogs)

  const handleLogOut = async (event) => {
    event.preventDefault();
    window.localStorage.removeItem("blogsAppUser");
    setUser(null);
  };

  // CREATE FUNCTION (moved to createblogform)
  /*const addNewBlog = async (newBlog) => {
    try {
      const createdBlog = await blogService.createNew(newBlog);
      setBlogs(blogs.concat(createdBlog));
      dispatch(createBlog(createdBlog))
      dispatch(triggerNotification(`a new blog ${createdBlog.title} by ${createdBlog.author}`, false))
    } catch {
      dispatch(triggerNotification("wrong credentials", true))
    }
  };*/

  const setBlogsAfterSort = (newBlogs) => {
    setBlogs(newBlogs.sort((b1, b2) => b2.likes - b1.likes));
  };

  // Won't need this one - can dispatch from Blog component
  const updateBlogOnLike = (updatedBlog) => {
    blogService.updateBlog(updatedBlog);
    setBlogsAfterSort(
      blogs.map((blog) =>
        blog.id === updatedBlog.id
          ? { ...blog, likes: updatedBlog.likes }
          : blog,
      ),
    );
  };

  /*const updateBlogsOnDelete = (id) => {
    setBlogs(blogs.filter((b) => b.id !== id));
  };*/

  // DELETE FUNCTION (w helper above)
  /*const handleDelete = (idOfBlogToDelete) => {
    try {
      blogService.deleteBlog(idOfBlogToDelete);
      updateBlogsOnDelete(idOfBlogToDelete);
    } catch (err) {
      console.log(err);
    }
  };*/

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("blogsAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }

    /*blogService.getAll().then((blogs) => {
      setBlogsAfterSort(blogs);
    });*/
    dispatch(initialiseBlogs())
  }, []);

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      {reduxBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlogOnLike={updateBlogOnLike}
          byUser={blog.user.id === user.id}
          //handleDeleteParent={handleDelete}
        />
      ))}
    </div>
  );

  return (
    <>
      <Notif />
      {!user && (
        <LoginForm
          setUser={setUser}
          setToken={blogService.setToken}
        />
      )}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogOut}>logout</button>
          <Toggle buttonLabel="create new blog">
            <CreateBlogForm />
          </Toggle>
          {blogList()}
        </div>
      )}
    </>
  );
};

export default App;
