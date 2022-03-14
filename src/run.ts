import { watch } from "./watch";
import { Observable, Dispose } from "./types";

export let use: (node: Observable<unknown>) => void = () => {};

export function run(fn: () => void) {
	let disposers: Dispose[] = [];
	let wrap = () => {
		for (let d of disposers) d();
		disposers = [];
		let prev = use;
		use = (node) => disposers.push(watch(node, wrap));
		fn();
		use = prev;
	};
	wrap();
}
