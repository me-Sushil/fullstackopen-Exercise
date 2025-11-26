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
        await page.getByRole("button", { name: "create new blog" }).click();

        await createBlog(page, "this is vlog", "sushil", "http://vlog.com");

        await expect(page.getByText("this is vlog")).toBeVisible();
      });
      test("the blog can be liked", async ({ page }) => {
        await loginWith(page, "sushil", "sushil");
        await page.getByRole("button", { name: "create new blog" }).click();

        await createBlog(page, "this is vlog", "sushil", "http://vlog.com");

        await page.getByRole("button", { name: "show" }).click();
        await page.getByRole("button", { name: "like" }).click();
        await expect(page.getByText("likes 1")).toBeVisible();
      });
      test(" blog can deleted", async ({ page }) => {
        await page.getByRole("button", { name: "create new blog" }).click();

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
      await page.getByRole("button", { name: "create new blog" }).click();

      await createBlog(
        page,
        "Blog by first user",
        "First Author",
        "http://first.com"
      );

      await expect(page.getByText("Blog by first user")).toBeVisible();

      await page.getByRole("button", { name: "show" }).click();
      await expect(page.getByRole("button", { name: "remove" })).toBeVisible();
      await page.getByRole("button", { name: "logout" }).click();

      // Second user logs in
      await loginWith(page, "anotheruser", "password");
      await expect(page.getByText("Blog by first user")).toBeVisible();

      // 🔑 Force reload to fetch blogs for new user
      await page.reload();

      await page.getByRole("button", { name: "show" }).click();

      // Second user should NOT see the remove button
      await expect(
        page.getByRole("button", { name: "remove" })
      ).not.toBeVisible();
    });
    // test.only("blogs are ordered by likes, with the blog with the most likes first", async ({
    //   page,
    // }) => {
    //   // Login as first user
    //   await loginWith(page, "sushil", "sushil");

    //   // Create three blogs
    //   await page.getByRole("button", { name: "create new blog" }).click();

    //   await createBlog(page, "First blog", "Sushil", "http://first.com");
    //   await expect(page.getByText("First blog")).toBeVisible();

    //   await createBlog(page, "Second blog", "Sushil", "http://second.com");
    //   await expect(page.getByText("Second blog")).toBeVisible();

    //   await createBlog(page, "Third blog", "Sushil", "http://third.com");
    //   await expect(page.getByText("Third blog")).toBeVisible();

    //   // Verify all three blogs are visible initially
    //   await expect(page.getByText("First blog")).toBeVisible();
    //   await expect(page.getByText("Second blog")).toBeVisible();
    //   await expect(page.getByText("Third blog")).toBeVisible();

    //   // Like the first blog twice
    //   const firstBlogDiv = page.getByText("First blog").locator("..");
    //   await firstBlogDiv.getByRole("button", { name: "show" }).click();
    //   await page.waitForTimeout(300);

    //   expect(page.getByText("likes")).toBeVisible();

    //   await firstBlogDiv.getByRole("button", { name: "like" }).click();
    //   await page.waitForTimeout(500);
    //   await firstBlogDiv.getByRole("button", { name: "like" }).click();
    //   await page.waitForTimeout(500);

    //   // Collapse first blog
    //   await firstBlogDiv.getByRole("button", { name: "hide" }).click();
    //   await page.waitForTimeout(300);

    //   // Like the second blog once
    //   const secondBlogDiv = page.getByText("Second blog").locator("..");
    //   await secondBlogDiv.getByRole("button", { name: "show" }).click();
    //   await page.waitForTimeout(500);

    //   await secondBlogDiv.getByRole("button", { name: "like" }).click();
    //   await page.waitForTimeout(300);

    //   // Collapse second blog
    //   await secondBlogDiv.getByRole("button", { name: "hide" }).click();

    //   await page.reload();
    //   await page.waitForTimeout(500);

    //   // Get the order of blogs after liking
    //   const blogTitles = await page
    //     .locator("div.blog-summary")
    //     .allTextContents();

    //   // Extract blog titles from the text content
    //   const firstBlogTitle = blogTitles[0].split("\n")[0];
    //   const secondBlogTitle = blogTitles[1].split("\n")[0];
    //   const thirdBlogTitle = blogTitles[2].split("\n")[0];

    //   // Verify the order is: First blog (2 likes), Second blog (1 like), Third blog (0 likes)
    //   expect(firstBlogTitle).toContain("First blog");
    //   expect(secondBlogTitle).toContain("Second blog");
    //   expect(thirdBlogTitle).toContain("Third blog");
    // });
    // test("blogs are ordered by likes, with the blog with the most likes first", async ({
    //   page,
    // }) => {
    //   // Login as first user
    //   await loginWith(page, "sushil", "sushil");
    //   // await expect(page.getByText("Sushil Bishow Logged in")).toBeVisible();

    //   // Create first blog
    //   await page.getByRole("button", { name: "create new blog" }).click();
    //   await createBlog(page, "First blog", "Sushil", "http://first.com");
    //   await expect(page.getByText("First blog")).toBeVisible();
    //   await page.waitForTimeout(300);

    //   // Create second blog
    //   await createBlog(page, "Second blog", "Sushil", "http://second.com");
    //   await expect(page.getByText("Second blog")).toBeVisible();
    //   await page.waitForTimeout(300);

    //   // Create third blog
    //   await createBlog(page, "Third blog", "Sushil", "http://third.com");
    //   await expect(page.getByText("Third blog")).toBeVisible();
    //   await page.waitForTimeout(300);

    //   // ======== LIKE THE FIRST BLOG TWICE ========
    //   // Find first blog container
    //   const firstBlogDiv = page.getByText("First blog").locator("..");

    //   // Show first blog details
    //   await firstBlogDiv.getByRole("button", { name: "show" }).click();
    //   await page.waitForTimeout(500);

    //   // Like first blog (1st time)
    //   await firstBlogDiv.getByRole("button", { name: "like" }).click();
    //   await page.waitForTimeout(600);

    //   // Like first blog (2nd time)
    //   await firstBlogDiv.getByRole("button", { name: "like" }).click();
    //   await page.waitForTimeout(600);

    //   // Hide first blog
    //   await firstBlogDiv.getByRole("button", { name: "hide" }).click();
    //   await page.waitForTimeout(300);

    //   // ======== LIKE THE SECOND BLOG ONCE ========
    //   // Find second blog container
    //   const secondBlogDiv = page.getByText("Second blog").locator("..");

    //   // Show second blog details
    //   await secondBlogDiv.getByRole("button", { name: "show" }).click();
    //   await page.waitForTimeout(500);

    //   // Like second blog (1st time)
    //   await secondBlogDiv.getByRole("button", { name: "like" }).click();
    //   await page.waitForTimeout(600);

    //   // Hide second blog
    //   await secondBlogDiv.getByRole("button", { name: "hide" }).click();
    //   await page.waitForTimeout(300);

    //   // ======== THIRD BLOG HAS 0 LIKES (NO ACTION) ========

    //   // Reload page to ensure blogs are sorted by likes
    //   await page.reload();
    //   await page.waitForTimeout(1000);

    //   // ======== VERIFY SORTING ORDER ========
    //   // Get all blog summary containers
    //   const allBlogSummaries = await page.locator("div.blog-summary").all();

    //   expect(allBlogSummaries.length).toBe(3);

    //   // Get text content of each blog
    //   const firstBlogText = await allBlogSummaries[0].textContent();
    //   const secondBlogText = await allBlogSummaries[1].textContent();
    //   const thirdBlogText = await allBlogSummaries[2].textContent();

    //   // Verify the order: Most likes first
    //   // First blog should have 2 likes (most)
    //   expect(firstBlogText).toContain("First blog");

    //   // Second blog should have 1 like (middle)
    //   expect(secondBlogText).toContain("Second blog");

    //   // Third blog should have 0 likes (least)
    //   expect(thirdBlogText).toContain("Third blog");

    //   // ======== FINAL VERIFICATION: Check likes count ========
    //   // Open first blog and verify it shows 2 likes
    //   const verifyFirstBlog = page.getByText("First blog").locator("..");
    //   await verifyFirstBlog.getByRole("button", { name: "show" }).click();
    //   await page.waitForTimeout(300);

    //   // Verify likes count
    //   await expect(verifyFirstBlog.getByText("likes 2")).toBeVisible();
    // });
    test("blogs are ordered by likes, with the blog with the most likes first", async ({
      page,
    }) => {
      // Login as first user
      await loginWith(page, "sushil", "sushil");
      await expect(page.getByText("Sushil Bishow Logged in")).toBeVisible();

      // Create first blog
      await page.getByRole("button", { name: "create new blog" }).click();
      await createBlog(page, "First blog", "Sushil", "http://first.com");
      await expect(page.getByText("First blog")).toBeVisible();
      await page.waitForTimeout(400);

      // Create second blog
      await createBlog(page, "Second blog", "Sushil", "http://second.com");
      await expect(page.getByText("Second blog")).toBeVisible();
      await page.waitForTimeout(400);

      // Create third blog
      await createBlog(page, "Third blog", "Sushil", "http://third.com");
      await expect(page.getByText("Third blog")).toBeVisible();
      await page.waitForTimeout(400);

      // ======== LIKE THE FIRST BLOG TWICE ========
      // Use filter method instead of locator(..)
      const firstBlogText = page.getByText("First blog");
      const firstBlogContainer = firstBlogText
        .locator("xpath=ancestor::div[@style]")
        .first();

      // Click show button for first blog
      await firstBlogContainer.getByRole("button", { name: "show" }).click();
      await page.waitForTimeout(500);

      // Click like button first time
      await firstBlogContainer.getByRole("button", { name: "like" }).click();
      await page.waitForTimeout(800);

      // Click like button second time
      await firstBlogContainer.getByRole("button", { name: "like" }).click();
      await page.waitForTimeout(800);

      // Click hide button
      await firstBlogContainer.getByRole("button", { name: "hide" }).click();
      await page.waitForTimeout(400);

      // ======== LIKE THE SECOND BLOG ONCE ========
      const secondBlogText = page.getByText("Second blog");
      const secondBlogContainer = secondBlogText
        .locator("xpath=ancestor::div[@style]")
        .first();

      // Click show button for second blog
      await secondBlogContainer.getByRole("button", { name: "show" }).click();
      await page.waitForTimeout(500);

      // Click like button once
      await secondBlogContainer.getByRole("button", { name: "like" }).click();
      await page.waitForTimeout(800);

      // Click hide button
      await secondBlogContainer.getByRole("button", { name: "hide" }).click();
      await page.waitForTimeout(400);

      // ======== THIRD BLOG HAS 0 LIKES (NO ACTION) ========
      // Wait before reload
      await page.waitForTimeout(500);

      // ======== RELOAD PAGE ========
      await page.reload();
      await page.waitForTimeout(500);

      // Verify all blogs are visible after reload
      await expect(page.getByText("First blog")).toBeVisible();
      await expect(page.getByText("Second blog")).toBeVisible();
      await expect(page.getByText("Third blog")).toBeVisible();
      await page.waitForTimeout(500);

      // ======== GET ALL BLOG CONTAINERS (ORDERED) ========
      // Get all divs that contain blog titles
      const allBlogContainers = await page
        .locator("div[style*='border']")
        .all();
      expect(allBlogContainers.length).toBe(3);

      // Get first, second, third blog containers
      const firstContainer = allBlogContainers[0];
      const secondContainer = allBlogContainers[1];
      const thirdContainer = allBlogContainers[2];

      // ======== VERIFY TITLES IN CORRECT ORDER ========
      const firstTitle = await firstContainer
        .locator("span")
        .first()
        .textContent();
      const secondTitle = await secondContainer
        .locator("span")
        .first()
        .textContent();
      const thirdTitle = await thirdContainer
        .locator("span")
        .first()
        .textContent();

      expect(firstTitle.trim()).toBe("First blog"); // 2 likes - should be first
      expect(secondTitle.trim()).toBe("Second blog"); // 1 like - should be second
      expect(thirdTitle.trim()).toBe("Third blog"); // 0 likes - should be third

      // ======== VERIFY LIKES COUNTS ========
      // Expand first blog and verify 2 likes
      await firstContainer.getByRole("button", { name: "show" }).click();
      await page.waitForTimeout(500);
      await expect(firstContainer.getByText("likes 2")).toBeVisible();
      await firstContainer.getByRole("button", { name: "hide" }).click();
      await page.waitForTimeout(300);

      // Expand second blog and verify 1 like
      await secondContainer.getByRole("button", { name: "show" }).click();
      await page.waitForTimeout(500);
      await expect(secondContainer.getByText("likes 1")).toBeVisible();
      await secondContainer.getByRole("button", { name: "hide" }).click();
      await page.waitForTimeout(300);

      // Expand third blog and verify 0 likes
      await thirdContainer.getByRole("button", { name: "show" }).click();
      await page.waitForTimeout(500);
      await expect(thirdContainer.getByText("likes 0")).toBeVisible();
    });
  });
});
