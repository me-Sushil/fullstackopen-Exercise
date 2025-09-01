const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((acc, blog) => {
    return (acc += blog.likes);
  }, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;
  return blogs.reduce((favorite, blog) => {
    return blog.likes > favorite.likes ? blog : favorite;
  });
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const blogcounterByAuthor = {};

  blogs.forEach((blog) => {
    blogcounterByAuthor[blog.author] =
      (blogcounterByAuthor[blog.author] || 0) + 1;
  });

  let topAuthor = null;
  let maxBlogs = 0;
  for (let author in blogcounterByAuthor) {
    if (blogcounterByAuthor[author] > maxBlogs) {
        topAuthor = author;
        maxBlogs = blogcounterByAuthor[author];
    }
  }
   return {
      author: topAuthor,
      blogs: maxBlogs,
    };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
