const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/blogTest');

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})