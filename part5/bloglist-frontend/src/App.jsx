import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
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
      showNotifications("wrong username or password","error");
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

  const createBlog = async (e) => {
    e.preventDefault();
    const newBlog = {
      title,
      author,
      url,
    };
    // blogService.setToken(user.token);
    try {
      const newblog = await blogService.postBlog(newBlog);
      showNotifications("Blog Created successfully");
      
      console.log(newblog, "this is new blog");
      setBlogs([...blogs, newblog]);
      setTitle("");
      setUrl("");
      setAuthor("");
    } catch (error) {
      setTitle("");
      setUrl("");
      setAuthor("");
      showNotifications(error.message || "Failed to create blog", "error");
      
    }
  };

  const loginForm = () => (
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

  const blogForm = () => (
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

      <div>
        <h2>Create new</h2>
        <form onSubmit={createBlog}>
          <div>
            <label>
              title:
              <input
                type="text"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              author:
              <input
                type="text"
                value={author}
                onChange={({ target }) => setAuthor(target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              url
              <input
                type="text"
                value={url}
                onChange={({ target }) => setUrl(target.value)}
              />
            </label>
          </div>
          <button>create</button>
        </form>
      </div>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );

  return (
    <>
      {!user && loginForm()}
      {user && blogForm()}
    </>
  );
};

export default App;
