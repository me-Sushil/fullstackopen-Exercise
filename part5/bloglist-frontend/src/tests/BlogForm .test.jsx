import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "../components/BlogForm";
import { expect } from "vitest";

test("form calls event handler with right details when a new blog is created", async () => {
  const submitNewBlog = vi.fn();
  const user = userEvent.setup();

  render(<BlogForm submitNewBlog={submitNewBlog} />);

  const blogTitle = screen.getByPlaceholderText("this is title");
  const blogAuther = screen.getByPlaceholderText("this is author");
  const blogUrl = screen.getByPlaceholderText("this is url");
  const submitButton = screen.getByText("create");

  await user.type(blogTitle, "testing form");
  await user.type(blogAuther, "test author");
  await user.type(blogUrl, "test url");
  await user.click(submitButton);

  expect(submitNewBlog).toHaveBeenCalledTimes(1);
  expect(submitNewBlog.mock.calls[0][0].title).toBe("testing form");
  expect(submitNewBlog.mock.calls[0][0].author).toBe("test author");
  expect(submitNewBlog.mock.calls[0][0].url).toBe("test url");
});
