import { observe, info } from "../../src";

test("should return value", () => {
	const o = observe({ a: (a: string, b: string, c: string) => a + b + c });
	expect(o.a("1", "2", "3")).toBe("123");
});

test("should notify call observers", () => {
	const o = observe({ a: () => "hello" });
	const fn = jest.fn();
	o.a[info].call.set(fn, 0);
	o.a();
	expect(fn.mock.calls.length).toBe(1);
});

test("should notify call observers with correct parameters", () => {
	const o = observe({ a: (a: string, b: string, c: string) => a + b + c });
	const fn = jest.fn();
	o.a[info].call.set(fn, 0);
	o.a("1", "2", "3");
	expect(fn.mock.calls[0]).toEqual([["1", "2", "3"], "123"]);
});

test("should work for array methods", () => {
	const o = observe([1, 2, 3]);
	const fn = jest.fn();
	o.push[info].call.set(fn, 0);
	o.push(4, 5, 6);
	expect(fn.mock.calls[0]).toEqual([[4, 5, 6], 6]);
});
