import { useEffect } from "react";
import { Routes, Route, Link, useMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import CssBaseline from '@mui/material/CssBaseline';
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

import Notif from "./components/Notif";
import LoginForm from "./components/LoginForm";
import CreateBlogForm from "./components/CreateBlogForm";
import Toggle from "./components/Toggle";
import BlogList from "./components/BlogList";
import Blog from "./components/Blog";
import ErrorBoundary from "./components/ErrorBoundary";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import blogService from "./services/blogs";
import { getUser, removeUser } from "./services/persistentUser";

import { initialiseBlogs } from "./reducers/blogReducer";
import { setUserRedux, removeUserRedux } from "./reducers/userReducer";
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
    removeUser("blogsAppUser");
    dispatch(removeUserRedux());
  };

  useEffect(() => {
    const loggedUserJSON = getUser("blogsAppUser");
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
        <ErrorBoundary>
          <Typography variant="h2" gutterBottom>{user.name}</Typography>
          <Typography variant="h2" gutterBottom>{user.name}</Typography>
          {/*<h3>added blogs</h3>*/}
          <List>
            {user.blogs.map((blog) => {
              return <ListItem key={blog.id}>{blog.title}</ListItem>;
            })}
          </List>
        </ErrorBoundary>
      </>
    );
  };

  const Users = () => {
    return (
      <>
        <ErrorBoundary>
          <Typography variant="h2" gutterBottom>Users</Typography>
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
        </ErrorBoundary>
      </>
    );
  };

  const BlogPage = () => {
    return (
      <>
        <ErrorBoundary>
          <Toggle buttonLabel="create new blog">
            <CreateBlogForm />
          </Toggle>
        </ErrorBoundary>
        <ErrorBoundary>
          <BlogList blogs={reduxBlogs} userId={reduxUser.id} />
        </ErrorBoundary>
      </>
    );
  };

  const Nonexistent = () => <div><Typography variant="h6">Blog App</Typography></div>

  return (
    <>
      <CssBaseline>
        <Notif />
        {!reduxUser ? (
          <>
            <Typography variant="h2" gutterBottom>blogs</Typography>
            <LoginForm setToken={blogService.setToken} />
          </>
        ) : (
          <>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Blog App
                </Typography>
                <Button color="white" component={Link} to="/" >
                  Blogs
                </Button>
                <Button color="white" component={Link} to="/users" >
                  Users
                </Button>
                <Button color="white" onClick={handleLogOut}>Logout</Button>
              </Toolbar>
            </AppBar>
            <Container>
              <div 
                style={{ 
                  color: 'grey', 
                  fontStyle: 'italic',
                  marginTop: '20px',
                  marginBottom: '20px'
                }} 
              >
                {reduxUser.name} logged in
              </div>
              
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
                <Route path="*" element={<Nonexistent />} />
              </Routes>
            </Container>
          </>
        )}
      </CssBaseline>
    </>
  );
};

export default App;
