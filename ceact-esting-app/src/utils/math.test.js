import { add, subtract, multiply, divide, modulus } from "./math";

describe("Math Utility Functions", () => {

    test("Add A + B and return sum", () => {
        expect(add(2, 3)).toBe(5);
    });

    test("Subtract B from A", () => {
        expect(subtract(5, 3)).toBe(2);
    });

    test("Multiply A * B", () => {
        expect(multiply(4, 3)).toBe(12);
    });

    test("Divide A / B", () => {
        expect(divide(10, 2)).toBe(5);
    });

    test("Modulus A % B", () => {
        expect(modulus(10, 3)).toBe(1);
    });

    test("Division by zero should throw error", () => {
        expect(() => divide(5, 0)).toThrow("Cannot divide by zero");
    });

    test("Modulus by zero should throw error", () => {
        expect(() => modulus(5, 0)).toThrow("Cannot perform modulus by zero");
    });

});
