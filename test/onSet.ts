import { observe, value, onSet } from "../src";

test("should callback", () => {
	let times = 0;
	const data = observe(1);
	data[onSet]((current, previous) => {
		expect(current).toBe(2);
		expect(previous).toBe(1);
		times++;
	});
	data[value] = 2;
	expect(times).toBe(1);
});

test("should only callback when value changed", () => {
	const data = observe(1);
	let times = 0;
	data[onSet]((current, previous) => {
		expect(current).toBe(2);
		expect(previous).toBe(1);
		times++;
	});
	data[value] = 2;
	data[value] = 2;
	data[value] = 2;
	expect(times).toBe(1);
});

test("should not callback when unsubscribed", () => {
	const data = observe(1);
	let times = 0;
	data[onSet](() => {
		times++;
	})();
	data[value] = 2;
	expect(times).toBe(0);
});
