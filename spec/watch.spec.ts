import { observe, watch } from "../src";

test("should notify on set", () => {
	const o = observe({ a: 0 });
	const fn = jest.fn();
	watch(o.a, fn);
	o.a.$++;
	expect(fn.mock.calls.length).toBe(1);
});

test("should dispose", () => {
	const o = observe({ a: 0 });
	const fn = jest.fn();
	watch(o.a, fn)();
	o.a.$++;
	expect(fn.mock.calls.length).toBe(0);
});

test("should notify on root set", () => {
	const o = observe({ a: 0 });
	const fn = jest.fn();
	watch(o.a, fn);
	o.$ = { a: 1 };
	expect(fn.mock.calls.length).toBe(1);
});

test("should notify on prop set", () => {
	const o = observe({ a: 0 });
	const fn = jest.fn();
	watch(o, fn);
	o.a.$++;
	expect(fn.mock.calls.length).toBe(1);
});

test("should be recursive", () => {
	const o = observe({ a: 0 });
	const fn = jest.fn(() => {
		if (o.a.$ >= 100) return;
		o.a.$++;
	});

	watch(o.a, fn);
	o.a.$++;

	expect(fn.mock.calls.length).toBe(100);
});
