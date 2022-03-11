import { observe, value } from "../src";

test("should return value", () => {
	const data = observe(1);
	expect(data[value]).toBe(1);
});

test("should change", () => {
	const data = observe(1);
	data[value] = 2;
	expect(data[value]).toBe(2);
});

test("should change property", () => {
	const data = observe({ a: 1 });
	data.a[value] = 2;
	expect(data.a[value]).toBe(2);
});

test("should deeply nested property", () => {
	const data = observe({ a: { b: { c: { d: { e: 1 } } } } });
	data.a.b.c.d.e[value] = 2;
	expect(data.a.b.c.d.e[value]).toBe(2);
});

test("should optional chain get", () => {
	type T = { a: { b: { c?: { d: { e: number } } } } };
	const data = observe<T>({ a: { b: {} } });
	expect(data.a.b.c!.d!.e![value]).toBe(undefined);
});

test("should throw error when setting undefined", () => {
	type T = { a: { b: { c?: { d: { e: number } } } } };
	const data = observe<T>({ a: { b: {} } });
	expect(() => (data.a.b.c!.d!.e![value] = 2)).toThrow(TypeError);
});
