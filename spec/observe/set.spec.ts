import { info, observe } from "../../src";

test("should have $ value", () => {
	const o = observe({ a: 0 });
	expect(o.a.$).toBe(0);
});

test("should update prop", () => {
	const o = observe({ a: 0 });
	o.a.$++;
	expect(o.a.$).toBe(1);
});

test("should update root", () => {
	const o = observe({ a: 0 });
	o.$ = { a: 1 };
	expect(o.$).toEqual({ a: 1 });
});

test("should notify set observers", () => {
	const o = observe({ a: 0 });
	const fn = jest.fn();
	o.a[info].set.set(fn, 0);
	o.a.$++;
	expect(fn.mock.calls.length).toBe(1);
});

test("should notify root set observers", () => {
	const o = observe({ a: 0 });
	const fn = jest.fn();
	o[info].set.set(fn, 0);
	o.a.$++;
	expect(fn.mock.calls.length).toBe(1);
});
