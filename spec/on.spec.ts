import { info, observe, on } from "../src";

test("should add observer", () => {
	const o = observe(() => {});
	const fn = () => {};
	on("set", o, fn);
	expect(o[info].set.has(fn)).toBeTruthy();
	on("call", o, fn);
	expect(o[info].call.has(fn)).toBeTruthy();
});

test("should dispose observer", () => {
	const o = observe(() => {});
	const fn = () => {};
	on("set", o, fn)();
	expect(o[info].set.has(fn)).toBeFalsy();
});
