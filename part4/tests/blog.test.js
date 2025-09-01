const { test, describe } = require('node:test')
const assert = require('node:assert')
const blogTest = require('../utils/blogTest');

test('dummy returns one', () => {
  const blogs = []

  const result = blogTest.dummy(blogs)
  
  assert.strictEqual(result, 1)
})