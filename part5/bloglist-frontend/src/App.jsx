import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [showBlogDetails, setShowBlogDetails] = useState(null);

  const [notification, setNotification] = useState({
    message: null,
    type: null,
  });

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loginUser = window.localStorage.getItem("user");
    if (loginUser) {
      const user = JSON.parse(loginUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      username,
      password,
    };
    try {
      const result = await loginService.login(userData);
      window.localStorage.setItem("user", JSON.stringify(result));
      blogService.setToken(result.token);

      setUser(result);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error, "login failed error");
      showNotifications("wrong username or password", "error");
      setUsername("");
      setPassword("");
    }
  };

  const showNotifications = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: null, type: null }), 5000);
  };

  const handleLogout = () => {
    window.localStorage.removeItem("user");
    blogService.setToken(null);
    setUser(null);
  };

  const submitNewBlog = async (blogObject) => {
    // blogService.setToken(user.token);
    try {
      const newblog = await blogService.postBlog(blogObject);
      showNotifications("Blog Created successfully");

      console.log(newblog, "this is new blog");
      setBlogs([...blogs, newblog]);
    } catch (error) {
      showNotifications(error.message || "Failed to create blog", "error");
    }
  };

  const loginForm = () => {
    return (
      <>
        <h2>log in to Application</h2>
        <Notification
          notification={notification.message}
          type={notification.type}
        />
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              username
              <input
                value={username}
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
              />
            </label>
          </div>
          <div>
            <label>
              password
              <input
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </label>
          </div>
          <button type="submit">login</button>
        </form>
      </>
    );
  };

  const handleLike = async (blog) => {
    const blogData = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    };
    try {
      const updateBlog = await blogService.updateBlog(blog.id, blogData);
      setBlogs(blogs.map((blg) => (blg.id === blog.id ? updateBlog : blg)));
      setShowBlogDetails(blog.id);
    } catch (error) {
      console.log(error, "update failed error");
      showNotifications("Error on update blog", "error");
    }
  };

  const blogForm = () => {
    return (
      <div>
        <div>
          <h2>blogs</h2>
          <div>
            <Notification
              notification={notification.message}
              type={notification.type}
            />
          </div>
          <p>
            {user.name} Logged in <button onClick={handleLogout}>logout</button>
          </p>
        </div>

        <Togglable buttonLabel="create new blog">
          <BlogForm submitNewBlog={submitNewBlog} />
        </Togglable>

        {blogs
          .slice() // make a copy so React state is not mutated
          .sort((a, b) => b.likes - a.likes) // highest likes first
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              expanded={blog.id === showBlogDetails}
              toggleExpanded={() =>
                setShowBlogDetails(blog.id === showBlogDetails ? null : blog.id)
              }
              handleLike={handleLike}
              user={user}
            />
          ))}
      </div>
    );
  };
  return (
    <>
      {!user && loginForm()}
      {user && blogForm()}
    </>
  );
};

export default App;
