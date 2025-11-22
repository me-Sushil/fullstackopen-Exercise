import { useState } from "react";

const BlogForm = ({ submitNewBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const createBlog = (e) => {
    e.preventDefault();
    submitNewBlog({
      title,
      author,
      url,
    });

    setTitle("");
    setUrl("");
    setAuthor("");
  };

  return (
    <>
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
    </>
  );
};

export default BlogForm;
