const Blog = ({ blog }) => {
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
        {blog.title} {blog.author} <button>view</button>
      </div>
      <div>
        {blog.url}
      </div>
      <div>
       likes {blog.likes}<button>like</button>
      </div>
      <div>
        {blog.user.name}
      </div>
    </div>
  );
};
export default Blog;
