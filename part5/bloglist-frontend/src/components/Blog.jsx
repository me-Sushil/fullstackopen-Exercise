const Blog = ({
  blog,
  expanded,
  toggleExpanded,
  handleLike,
  user,
  handleDelete,
}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  // Check if current user owns this blog
  const isOwner =
    user &&
    blog.user &&
    (blog.user.id === user.userId ||
      blog.user._id === user.userId ||
      blog.user === user.userId);

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
          {isOwner && (
            <div>
              <button
                onClick={() => handleDelete(blog.id)}
                style={{ backgroundColor: "blue" }}
              >
                remove
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Blog;
