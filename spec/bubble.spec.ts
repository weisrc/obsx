import { bubble, observe } from "../src";

test("should traverse upwards to the root", () => {
	const o = observe([[0]]);
	const path: any[] = [];
	bubble(o[0][0], (n) => path.push(n));
	expect(path[0]).toBe(o[0][0]);
	expect(path[1]).toBe(o[0]);
	expect(path[2]).toBe(o);
});
