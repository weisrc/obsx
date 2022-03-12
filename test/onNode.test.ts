import { observe, onNode } from "../src";

test("should callback", () => {
	let times = 0;
	const data = observe<{ a?: { b: number } }>({});
	data[onNode]((key, node) => {
		expect(node).toBeDefined();
		expect(key).toBe("a");
		times++;
	});
	data.a;
	expect(times).toBe(1);
});

test("should callback once", () => {
	let times = 0;
	const data = observe<{ a?: { b: number } }>({});
	data[onNode]((key, node) => {
		expect(node).toBeDefined();
		expect(key).toBe("a");
		times++;
	});
	data.a;
	data.a;
	data.a;
	data.a;
	data.a;
	expect(times).toBe(1);
});
