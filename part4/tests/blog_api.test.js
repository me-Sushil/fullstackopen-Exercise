const { test, after } = require("node:test");
const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");

const api = supertest(app);

test.only("blogs are return as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("blogs have field named id instead of _id", async()=>{
     const response = await api.get('/api/blogs').expect(200)

  const blogs = response.body
  blogs.forEach(blog => {
    assert.ok(blog.id, 'Blog has id field')
    assert.strictEqual(blog._id, undefined)
  })
})

after(async()=>{
    await mongoose.connection.close();
})