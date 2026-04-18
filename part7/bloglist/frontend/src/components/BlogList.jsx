import { Link } from "react-router-dom";

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';

const BlogList = ({ blogs }) => {
  return (
    <>
      {blogs.length ? (
        <List>
          {blogs.map((blog) => (
              <ListItemButton component={Link} to={`/blogs/${blog.id}`} key={blog.id} >
                  {blog.title} {blog.author}
              </ListItemButton>
          ))}
        </List>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default BlogList;
/*
<Link to={`/blogs/${blog.id}`} key={blog.id}>
              <ListItemButton >
                  {blog.title} {blog.author}
              </ListItemButton>
            </Link>
*/