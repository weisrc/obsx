import { observe, info } from "../../src";

test("should exist", () => {
	const o = observe(0);
	expect(o).toHaveProperty([info, "prev"]);
	expect(o).toHaveProperty([info, "set"]);
	expect(o[info].set).toBeInstanceOf(Map);
	expect(o).toHaveProperty([info, "call"]);
	expect(o[info].call).toBeInstanceOf(Map);
});
