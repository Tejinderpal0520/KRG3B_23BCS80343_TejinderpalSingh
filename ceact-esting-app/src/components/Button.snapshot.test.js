import renderer from "react-test-renderer";
import Button from "./Button";

test("snapshot test", () => {
  const tree = renderer.create(<Button label="Submit" />).toJSON();
  expect(tree).toMatchSnapshot();
});