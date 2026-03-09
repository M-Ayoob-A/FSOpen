import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notif from "./components/Notif";
import LoginForm from "./components/LoginForm";
import CreateBlogForm from "./components/CreateBlogForm";
import Toggle from "./components/Toggle";
import BlogList from "./components/BlogList";
import blogService from "./services/blogs";

import { useSelector, useDispatch } from "react-redux";
import { initialiseBlogs } from "./reducers/blogReducer";

const App = () => {
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();
  const reduxBlogs = useSelector(state => state.blogs)
  console.log(reduxBlogs)

  const handleLogOut = async (event) => {
    event.preventDefault();
    window.localStorage.removeItem("blogsAppUser");
    setUser(null);
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("blogsAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }

    dispatch(initialiseBlogs())
  }, []);

  const blogList = () => (
    <div>
      <h2>blogs</h2>
      {reduxBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          byUser={blog.user.id === user.id}
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
