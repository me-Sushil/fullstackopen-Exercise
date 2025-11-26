const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3001/api/testing/reset");
    await request.post("http://localhost:3001/api/users", {
      data: {
        name: "Sushil Bishow",
        username: "sushil",
        password: "sushil",
      },
    });

    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByText("log in to Application")).toBeVisible();
    await expect(page.getByLabel("username")).toBeVisible();
    await expect(page.getByLabel("password")).toBeVisible();
    await expect(page.getByRole("button", { name: "login" })).toBeVisible();
  });

  describe("Login", () => {
    test("login succeeds with correct credentials", async ({ page }) => {
      await page.getByLabel("username").fill("sushil");
      await page.getByLabel("password").fill("sushil");
      await page.getByRole("button", { name: "login" }).click();

      await expect(page.getByText("Sushil Bishow Logged in")).toBeVisible();
    });
    test("login fails with wrong credentials", async ({ page }) => {
      await page.getByLabel("username").fill("sushil");
      await page.getByLabel("password").fill("123444");
      await page.getByRole("button", { name: "login" }).click();

      await expect(page.getByText("wrong username or password")).toBeVisible();
    });

    describe("when loggen in", () => {
      beforeEach(async ({ page }) => {
        await page.getByLabel("username").fill("sushil");
        await page.getByLabel("password").fill("sushil");
        await page.getByRole("button", { name: "login" }).click();
      });
      test("a new blog can be created", async ({ page }) => {
        await page.getByRole("button", { name: "create new blog" }).click();
        await page.getByLabel("title").fill("this is vlog");
        await page.getByLabel("author").fill("sushil");
        await page.getByLabel("url").fill("http://vlog.com");
        await page.getByRole("button", { name: "create" }).click();

        await expect(page.getByText("this is vlog")).toBeVisible();
      });
      test("the blog can be liked", async ({ page }) => {
         await page.getByLabel("username").fill("sushil");
        await page.getByLabel("password").fill("sushil");
        await page.getByRole("button", { name: "login" }).click();

         await page.getByRole("button", { name: "create new blog" }).click();
        await page.getByLabel("title").fill("this is vlog");
        await page.getByLabel("author").fill("sushil");
        await page.getByLabel("url").fill("http://vlog.com");
        await page.getByRole("button", { name: "create" }).click();

        await page.getByRole("button", { name: "show" }).click();
        await page.getByRole("button", { name: "like" }).click();
        await expect(page.getByText("likes 1")).toBeVisible();
      });
    });
  });
});
