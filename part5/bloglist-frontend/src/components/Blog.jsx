const Blog = ({ blog, expanded, toggleExpanded, handleLike, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div style={blogStyle}>
      <div>
        <span>{blog.title}</span>
        <span>{blog.author}</span>{" "}
        <button onClick={toggleExpanded}>{expanded ? "hide" : "show"}</button>
      </div>
      {expanded && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button onClick={() => handleLike(blog)}>like</button>
          </div>
          {user &&
            (blog.user?.id === user.userId ||
              blog.user?._id?.toString() === user.userId ||
              blog.user?.toString() === user.userId) && (
              <span>{user.name}</span>
            )}
        </div>
      )}
    </div>
  );
};
export default Blog;
