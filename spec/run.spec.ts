import { run, observe } from "../src";

test("should run on call", () => {
	const o = observe({ a: 0 });
	const fn = jest.fn(() => {
		o.a.$;
	});
	run(fn);
	expect(fn.mock.calls.length).toBe(1);
});

test("should run on set", () => {
	const o = observe({ a: 0 });
	const fn = jest.fn(() => {
		o.a.$;
	});
	run(fn);
	o.a.$++;
	expect(fn.mock.calls.length).toBe(2);
});

test("should work nested", () => {
	const o = observe({ a: 0 });
	const nested = jest.fn(() => {
		o.a.$;
	});
	const fn = jest.fn(() => {
		run(nested);
	});
	run(fn);
	o.a.$++;
	expect(fn.mock.calls.length).toBe(2);
});
