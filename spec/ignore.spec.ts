import { ignored, ignore } from "../src";

test("should update ignored", () => {
	expect(ignored).toBe(false);
	ignore(() => {
		expect(ignored).toBe(true);
	});
	expect(ignored).toBe(false);
});

test("should work nested", () => {
	expect(ignored).toBe(false);
	ignore(() => {
		expect(ignored).toBe(true);
		ignore(() => {
			expect(ignored).toBe(true);
		});
		expect(ignored).toBe(true);
	});
	expect(ignored).toBe(false);
});
