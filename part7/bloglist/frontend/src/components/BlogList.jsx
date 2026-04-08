import { Link } from "react-router-dom";

const BlogList = ({ blogs }) => {
  return (
    <>
      {blogs.length ? (
        <div>
          {blogs.map((blog) => (
            <div
              style={{
                paddingTop: 10,
                paddingLeft: 2,
                border: "solid",
                borderWidth: 1,
                marginBottom: 5,
              }}
              key={blog.id}
            >
              <Link to={`/blogs/${blog.id}`}>
                {blog.title} {blog.author}
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default BlogList;
