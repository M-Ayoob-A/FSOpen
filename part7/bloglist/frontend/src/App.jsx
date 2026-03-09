import { useEffect } from "react";
import Notif from "./components/Notif";
import LoginForm from "./components/LoginForm";
import CreateBlogForm from "./components/CreateBlogForm";
import Toggle from "./components/Toggle";
import BlogList from "./components/BlogList";
import blogService from "./services/blogs";

import { useSelector, useDispatch } from "react-redux";
import { initialiseBlogs } from "./reducers/blogReducer";
import { setUserRedux, removeUser } from "./reducers/userReducer";

const App = () => {
  const dispatch = useDispatch();
  const reduxBlogs = useSelector((state) => state.blogs);
  const reduxUser = useSelector((state) => state.user);

  const handleLogOut = async (event) => {
    event.preventDefault();
    window.localStorage.removeItem("blogsAppUser");
    dispatch(removeUser());
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("blogsAppUser");
    if (loggedUserJSON) {
      const storedUser = JSON.parse(loggedUserJSON);
      dispatch(setUserRedux(storedUser));
      blogService.setToken(storedUser.token);
    }

    dispatch(initialiseBlogs());
  }, []);

  return (
    <>
      <Notif />
      {!reduxUser ? (
        <LoginForm setToken={blogService.setToken} />
      ) : (
        <div>
          <p>{reduxUser.name} logged in</p>
          <button onClick={handleLogOut}>logout</button>
          <Toggle buttonLabel="create new blog">
            <CreateBlogForm />
          </Toggle>
          <BlogList blogs={reduxBlogs} userId={reduxUser.id} />
        </div>
      )}
    </>
  );
};

export default App;
