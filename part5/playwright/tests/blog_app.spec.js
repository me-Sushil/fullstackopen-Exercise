const { test, expect, beforeEach, describe } = require("@playwright/test");
const { createBlog, loginWith } = require("./helper");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        name: "Sushil Bishow",
        username: "sushil",
        password: "sushil",
      },
    });

    await page.goto("/");
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByText("log in to Application")).toBeVisible();
    await expect(page.getByLabel("username")).toBeVisible();
    await expect(page.getByLabel("password")).toBeVisible();
    await expect(page.getByRole("button", { name: "login" })).toBeVisible();
  });

  describe("Login", () => {
    test("login succeeds with correct credentials", async ({ page }) => {
      await loginWith(page, "sushil", "sushil");

      await expect(page.getByText("Sushil Bishow Logged in")).toBeVisible();
    });

    test("login fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "sushil", "12dscde");

      await expect(page.getByText("wrong username or password")).toBeVisible();
    });

    describe("when loggen in", () => {
      beforeEach(async ({ page }) => {
        await loginWith(page, "sushil", "sushil");
      });
      test("a new blog can be created", async ({ page }) => {
        await createBlog(page, "this is vlog", "sushil", "http://vlog.com");

        await expect(page.getByText("this is vlog")).toBeVisible();
      });
      test("the blog can be liked", async ({ page }) => {
        await loginWith(page, "sushil", "sushil");
        await createBlog(page, "this is vlog", "sushil", "http://vlog.com");

        await page.getByRole("button", { name: "show" }).click();
        await page.getByRole("button", { name: "like" }).click();
        await expect(page.getByText("likes 1")).toBeVisible();
      });
    });
  });
});
