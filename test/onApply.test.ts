import { observe, onApply, value } from "../src";

test("should callback when called", () => {
	const data = observe([1, 2, 3]);
	let args!: number[];
	data.push[onApply]((...got) => {
		args = got;
	});
	data.push(4, 5, 6);
	expect(data[value]).toEqual([1, 2, 3, 4, 5, 6]);
	expect(args).toEqual([4, 5, 6]);
});

test("should keep this bindings", () => {
	const data = observe([1, 2, 3]);
	let args!: number[];
	const { push } = data;
	push[onApply]((...got) => {
		args = got;
	});
	data.push(4, 5, 6);
	expect(data[value]).toEqual([1, 2, 3, 4, 5, 6]);
	expect(args).toEqual([4, 5, 6]);
});

test("should not callback when unsubscribed", () => {
	const data = observe([1, 2, 3]);
	let times = 0;
	data.push[onApply](() => {
		times++;
	})();
	data.push(4, 5, 6);
	expect(data[value]).toEqual([1, 2, 3, 4, 5, 6]);
	expect(times).toBe(0);
});
