const { test, after } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");

const api = supertest(app);

test("blogs are return as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});
test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body.length, 3);
});

test("blogs have field named id instead of _id", async()=>{
     const response = await api.get("/api/blogs").expect(200)

  const blogs = response.body
  blogs.forEach(blog => {
    assert.ok(blog.id, 'Blog has id field')
    assert.strictEqual(blog._id, undefined)
  })
})

test("A valid blog can be added", async()=>{
    const newBlog = {
    id: "5dw22a851b54a676234d17f7",
    title: "React grandchild",
    author: "React ok Chan",
    url: "https://reactgrandchild.com/",
    likes: 12
    }

    await api.post("/api/blogs").send(newBlog).expect(201).expect("Content-Type", /application\/json/)
})
after(async()=>{
    await mongoose.connection.close();
})