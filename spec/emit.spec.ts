import { emit, ignore, info, observe } from "../src";

test("should emit to all observers", () => {
	const o = observe({ a: 0 });
	const fn = jest.fn();
	o[info].set.set(fn, 0);
	emit("set", o, []);
	expect(fn.mock.calls.length).toBe(1);
});

test("should dedupe calls", () => {
	const o = observe({ a: 0 });
	const fn = jest.fn();
	o[info].set.set(fn, 0);
	o.a[info].set.set(fn, 0);
	emit("set", o.a, []);
	expect(fn.mock.calls.length).toBe(1);
});

test("should pass parameters", () => {
	const o = observe([1, 2, 3]);
	const fn = jest.fn();
	o.push[info].call.set(fn, 0);
	const args = [[4, 5, 6], 6];
	emit("call", o.push, args as any);
	expect(fn.mock.calls[0]).toEqual(args);
});

test("should not emit if ignore", () => {
	const o = observe([1, 2, 3]);
	const fn = jest.fn();
	o.push[info].call.set(fn, 0);
	ignore(() => {
		emit("call", o.push, [[4, 5, 6], 6]);
	});
	expect(fn.mock.calls.length).toEqual(0);
});
