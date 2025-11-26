const { test, expect, beforeEach, describe } = require("@playwright/test");
const { createBlog, loginWith } = require("./helper");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    //create one user
    await request.post("/api/users", {
      data: {
        name: "Sushil Bishow",
        username: "sushil",
        password: "sushil",
      },
    });
    // Create second user
    await request.post("/api/users", {
      data: {
        name: "Another User",
        username: "anotheruser",
        password: "password",
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
      test(" blog can deleted", async ({ page }) => {
        await createBlog(page, "this is vlog", "sushil", "http://vlog.com");
        await expect(page.getByText("this is vlog")).toBeVisible();

        await page.getByRole("button", { name: "show" }).click();

        page.on("dialog", async (dialog) => {
          expect(dialog.type()).toBe("confirm");
          expect(dialog.message()).toContain("Delete this is vlog by sushil");
          await dialog.accept();
        });

        // Click the delete button
        await page.getByRole("button", { name: "remove" }).click();

        // Verify the blog is no longer visible
        await expect(page.getByText("this is vlog")).not.toBeVisible();
      });
    });

    test("only the user who added the blog sees the delete button", async ({
      page,
    }) => {
      await loginWith(page, "sushil", "sushil");

      await createBlog(
        page,
        "Blog by first user",
        "First Author",
        "http://first.com"
      );

      await expect(
        page.getByText("Blog by first user")
      ).toBeVisible();

      await page.getByRole("button", { name: "show" }).click();
      await expect(page.getByRole("button", { name: "remove" })).toBeVisible();
      await page.getByRole("button", { name: "logout" }).click();


      // Second user logs in
      await loginWith(page, "anotheruser", "password");
      await expect(
        page.getByText("Blog by first user")
      ).toBeVisible();

      
      // 🔑 Force reload to fetch blogs for new user
        await page.reload();

      await page.getByRole("button", { name: "show" }).click();

      // Second user should NOT see the remove button
      await expect(
        page.getByRole("button", { name: "remove" })
      ).not.toBeVisible();
    });
  });
});
