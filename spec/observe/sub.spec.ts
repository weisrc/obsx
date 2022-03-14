import { observe } from "../../src";

const o = observe({ a: 0 });

test("should cache", () => {
	expect(o.a).toBe(o.a);
});

test("should be correct", () => {
	expect(o.a.$).toBe(0);
});
