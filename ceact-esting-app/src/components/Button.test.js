import { render, screen } from "@testing-library/react";
import Button from "./Button";

test("renders button text", () => {
  render(<Button label="Submit" />);
  const buttonElement = screen.getByText("Submit");
  expect(buttonElement).toBeInTheDocument();
});