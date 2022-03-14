import { observe, run } from "../src";

const observable = observe({
	a: {
		b: 0,
	},
	increase() {
		observable.a.b.$++;
	},
});

run(() => {
	console.log("updated", observable.a.b.$);
});

observable.increase();
