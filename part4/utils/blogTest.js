const dummy = (blogs) => {
  return 1;
}

const totalLikes=(blogs)=>{

    return blogs.reduce((acc, blog)=>{
       return acc+= blog.likes;
    },0)
}

const favoriteBlog =(blogs)=>{
    if(blogs.length === 0) return null;
   return blogs.reduce((favorite, blog)=>{
       return blog.likes > favorite.likes ? blog : favorite;
    })
}

const mostBlogs  =(blogs)=>{
    if(blogs.length === 0) return null;

    

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs 
}