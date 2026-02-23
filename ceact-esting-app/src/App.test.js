import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders counter heading", () => {
  render(<App />);
  const heading = screen.getByText("Counter App");
  expect(heading).toBeInTheDocument();
});

test("increments counter when button clicked", () => {
  render(<App />);

  const button = screen.getByText("Increment");
  const count = screen.getByTestId("count-value");

  fireEvent.click(button);

  expect(count).toHaveTextContent("1");
});
