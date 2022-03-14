import { info, observe } from "../../src";

test("should prepend in path", () => {
	const o = observe({ a: 0 });
	expect(o.a[info].prev).toBe(o)
});
