import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      username,
      password,
    };
    try {
      const result = await blogService.login(userData);
      window.localStorage.setItem("token", JSON.stringify(result.token));
      setUser(result);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error, "login failed error");
    }
  };

  const handleLogout =()=>{
    window.localStorage.removeItem("token");
  }
  
  const loginForm = () => (
    <>
      <h2>log in to Application</h2>
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
      <h2>blogs</h2>
      <p>{user.name} Logged in <button onClick={handleLogout}>logout</button></p>
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
