import { observe, value, onSet, compare } from "../src";

test("should not call onChange when not forced", () => {
	const data = observe(1);
	let times = 0;
	data[onSet](() => {
		times++;
	});
	data[compare]();
	expect(times).toBe(0);
});

test("should not call onChange when forced", () => {
	const data = observe(1);
	let times = 0;
	data[onSet](() => {
		times++;
	});
	data[compare](-1);
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

test("should notify for nested properties", () => {
	const data = observe({ a: { b: 1 } });
	let times = 0;
	data.a.b[onSet]((current, previous) => {
		expect(current).toBe(2);
		expect(previous).toBe(1);
		times++;
	});
	data[value] = { a: { b: 2 } };
	expect(times).toBe(1);
});

test("should only notify for nested properties when changed", () => {
	const data = observe({ a: { b: 1 } });
	let times = 0;
	data.a.b[onSet]((current, previous) => {
		expect(current).toBe(2);
		expect(previous).toBe(1);
		times++;
	});
	data[value] = { a: { b: 2 } };
	data[value] = { a: { b: 2 } };
	expect(times).toBe(1);
});
