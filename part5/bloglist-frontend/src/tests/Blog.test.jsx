import { render, screen } from "@testing-library/react";
import Blog from "../components/Blog";

test("render blog", () => {
  const blog = {
    title: "this is javascript blog",
    author: "JavaScript",
  };

  render(<Blog blog={blog} />);

  const element = screen.getByText("this is javascript blog");
  expect(element).toBeDefined();
});
