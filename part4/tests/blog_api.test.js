const { test, after, describe } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const helper = require("./test_helper");
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

test("blogs have field named id instead of _id", async () => {
  const response = await api.get("/api/blogs").expect(200);

  const blogs = response.body;
  blogs.forEach((blog) => {
    assert.ok(blog.id, "Blog has id field");
    assert.strictEqual(blog._id, undefined);
  });
});

test("A valid blog can be added", async () => {
  const newBlog = {
    id: "5dw22a851b54a676234d17f7",
    title: "React grandchild",
    author: "React ok Chan",
    url: "https://reactgrandchild.com/",
    likes: 12,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);
  const response = await api.get("/api/blogs");

  const title = response.body.map((b) => b.title);

  assert.strictEqual(response.body.length, helper.initialBlogs.length + 1);

  assert(title.includes("React grandchild"));
});

test("blog without title is not added", async () => {
  const newBlog = {
    id: "5dw22a851b54a676234d17f7",
    author: "React ok Chan",
    url: "https://reactgrandchild.com/",
    likes: 12,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);

  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

test("blog without likes field defaults to 0", async () => {
  const newBlog = {
    title: "Test Blog Without Likes",
    author: "Test Author",
    url: "https://testblog.com/",
  };

  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.likes, 0);
});

test("blog without url is not added", async () => {
  const newBlog = {
    title: "Test Blog",
    author: "Test Author",
    likes: 5,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);

  const response = await api.get("/api/blogs");
  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

test("blog without both title and url is not added", async () => {
  const newBlog = {
    author: "Test Author",
    likes: 5,
  };

  await api.post("/api/blogs").send(newBlog).expect(400);

  const response = await api.get("/api/blogs");
  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

describe("delete blog", () => {
  test("blog can be deleted by id", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    const blogs = blogsAtEnd.map((n) => n.title);
    assert(!blogs.includes(blogToDelete.title));

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);
  });
});

describe("Update blogs", () => {
  test("a blog can be updated", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const updatedData = {
      title: "Updated Title",
      author: "Updated Author",
      url: "https://updated.com/",
      likes: 25,
    };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedData)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    const updatedBlog = blogsAtEnd.find((blog) => blog.id === blogToUpdate.id);

    assert.strictEqual(updatedBlog.title, "Updated Title");
    assert.strictEqual(updatedBlog.author, "Updated Author");
    assert.strictEqual(updatedBlog.url, "https://updated.com/");
    assert.strictEqual(updatedBlog.likes, 25);
  });

  test("updating a non-existent blog returns 404", async () => {
    const nonExistentId = "507f1f77bcf86cd799439011";

    const updatedData = {
      title: "Updated Title",
      author: "Updated Author",
      url: "https://updated.com/",
      likes: 25,
    };

    await api.put(`/api/blogs/${nonExistentId}`).send(updatedData).expect(404);
  });

  test("updating blog with invalid id returns 400", async () => {
    const invalidId = "invalid-id";

    const updatedData = {
      title: "Updated Title",
      author: "Updated Author",
      url: "https://updated.com/",
      likes: 25,
    };

    await api.put(`/api/blogs/${invalidId}`).send(updatedData).expect(400);
  });
});

after(async () => {
  await mongoose.connection.close();
});
