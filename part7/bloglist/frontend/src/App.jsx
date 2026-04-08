import { useEffect } from "react";
import { Routes, Route, Link, useMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Notif from "./components/Notif";
import LoginForm from "./components/LoginForm";
import CreateBlogForm from "./components/CreateBlogForm";
import Toggle from "./components/Toggle";
import BlogList from "./components/BlogList";
import Blog from "./components/Blog";

import blogService from "./services/blogs";

import { initialiseBlogs } from "./reducers/blogReducer";
import { setUserRedux, removeUser } from "./reducers/userReducer";
import { initialiseUsers } from "./reducers/allUsersReducer";

const App = () => {
  const dispatch = useDispatch();
  const reduxBlogs = useSelector((state) => state.blogs);
  const reduxUser = useSelector((state) => state.user);
  const reduxUsers = useSelector((state) => state.users);

  const userMatch = useMatch("users/:id");
  const specificUser = userMatch
    ? reduxUsers.find((u) => u.id === userMatch.params.id)
    : null;
  const blogsMatch = useMatch("blogs/:id");
  const specificBlog = blogsMatch
    ? reduxBlogs.find((b) => b.id === blogsMatch.params.id)
    : null;

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
    dispatch(initialiseUsers());
  }, []);

  const SingleUser = ({ user }) => {
    if (!user) {
      return null;
    }
    return (
      <>
        <h2>{user.name}</h2>
        <h3>added blogs</h3>
        <ul>
          {user.blogs.map((blog) => {
            return <li key={blog.id}>{blog.title}</li>;
          })}
        </ul>
      </>
    );
  };

  const Users = () => {
    return (
      <>
        <h2>Users</h2>
        <table>
          <tbody>
            <tr>
              <td></td>
              <td style={{ fontWeight: "bold" }}>blogs created</td>
            </tr>
            {reduxUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  };

  const BlogPage = () => {
    return (
      <>
        <Toggle buttonLabel="create new blog">
          <CreateBlogForm />
        </Toggle>
        <BlogList blogs={reduxBlogs} userId={reduxUser.id} />
      </>
    );
  };

  return (
    <>
      <Notif />
      {!reduxUser ? (
        <>
          <h2>blogs</h2>
          <LoginForm setToken={blogService.setToken} />
        </>
      ) : (
        <>
          <div
            style={{ backgroundColor: "lightgrey" , display: "flex", flexDirection: "row", gap: "10px" }}
          >
            <Link to="/">blogs</Link>
            <Link to="/users">users</Link>
            <div>{reduxUser.name} logged in</div>
            <button onClick={handleLogOut}>logout</button>
          </div>
          <h2>blog app</h2>
          <Routes>
            <Route path="/" element={<BlogPage />} />
            <Route path="/users" element={<Users />} />
            <Route
              path="/users/:id"
              element={<SingleUser user={specificUser} />}
            />
            <Route
              path="/blogs/:id"
              element={<Blog blog={specificBlog} user={reduxUser} />}
            />
          </Routes>
        </>
      )}
    </>
  );
};

export default App;
