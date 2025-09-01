const { test, describe } = require('node:test')
const assert = require('node:assert')
const blogTest = require('../utils/blogTest');
describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const listWithMultipleBlog = [
    {
      _id: '5a422aa71b53a676234d17f8',
      title: 'Blog 0',
      author: 'Blog 0 author',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 2,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676244d17f2',
      title: 'Blog 1',
      author: 'Blog 1 author',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 6,
      __v: 0
    },
    {
      _id: '5a422da71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 8,
      __v: 0
    },
    {
      _id: '5a422aa71b51a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 9,
      __v: 0
    }
  ]
  test('when list has only one blog equals the likes of that', () => {
    const result = blogTest.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  test("when list has zero blog", ()=>{
    const results = blogTest.totalLikes([]);
    assert.strictEqual(results, 0);
  })
  
})