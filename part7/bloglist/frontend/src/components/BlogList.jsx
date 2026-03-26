import Blog from "./Blog";

const BlogList = ({ blogs, userId }) => {
  return (
    <>
      {blogs.length ? (
        <div>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} byUser={blog.user.id === userId} />
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default BlogList;
