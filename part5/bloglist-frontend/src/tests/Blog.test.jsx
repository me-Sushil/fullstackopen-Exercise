import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "../components/Blog";
import { expect } from "vitest";

test("render blog without url and likes", () => {
  const blog = {
    title: "this is javascript blog",
    author: "JavaScript",
  };

  render(<Blog blog={blog} />);

  const element = screen.getByText("this is javascript blog");
  expect(element).toBeDefined();
});

test("URL and likes are displayed when the show button is clicked", async () => {
  const blog = {
    title: "this is javascript blog",
    author: "JavaScript",
    url: "https://javascript.info",
    likes: 5,
  };

  const mockToggle = vi.fn();

  const { rerender } = render(
    <Blog
      blog={blog}
      expanded={false}
      toggleExpanded={mockToggle}
      handleLike={vi.fn()}
    />
  );

  // Initially, URL and likes should not be visible
  expect(screen.queryByText("https://javascript.info")).toBeNull();
  expect(screen.queryByText("likes 5")).toBeNull();

  const user = userEvent.setup();
  const button = screen.getByText("show");
  await user.click(button);

  // Verify the toggle function was called
  expect(mockToggle).toHaveBeenCalledTimes(1);

  // Re-render with expanded=true to simulate the state change
  rerender(
    <Blog
      blog={blog}
      expanded={true}
      toggleExpanded={mockToggle}
      handleLike={vi.fn()}
    />
  );

  // Now URL and likes should be visible
  expect(screen.getByText("https://javascript.info")).toBeDefined();
  expect(screen.getByText("likes 5")).toBeDefined();
});

test("like button is clicked twice, event handler is called twice", async () => {
  const blog = {
    title: "this is javascript blog",
    author: "JavaScript",
    url: "https://javascript.info",
    likes: 5,
  };
  const mockHandler = vi.fn();
  const mockToggle = vi.fn();

  render(
    <Blog
      blog={blog}
      expanded={true}
      toggleExpanded={mockToggle}
      handleLike={mockHandler}
    />
  );
  const user = userEvent.setup();
  const likeButton = screen.getByText("like");

  await user.click(likeButton);
  await user.click(likeButton);

  expect(mockHandler).toHaveBeenCalledTimes(2);
});
