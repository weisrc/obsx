export let ignored = false;

export function ignore(fn: () => void) {
	let prev = ignored;
	ignored = true;
	fn();
	ignored = prev;
}
