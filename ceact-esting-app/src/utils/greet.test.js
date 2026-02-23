import {greetName} from "./greet.js";

test("When name is given", () =>
    {expect(greetName("tejinder")).toBe("tejinder")}
)
test("When object has no name", () =>
    {expect(greetName(null)).toBe("guest")}
);
