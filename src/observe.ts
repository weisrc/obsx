import { Observable, info } from "./types";
import { use } from "./run";
import { emit } from "./emit";
import { bubble } from "./bubble";
import { Observers } from ".";

export function observe<T>(data: T): Observable<T> {
	let root = [data];
	let fn = () => root;
	return _observe(fn, fn, fn)[0];
}

function _observe(
	get: () => any,
	set: (data: any) => any,
	call: any,
	prev?: any
): any {
	call[info] = {
		prev,
		call: new Map(),
		set: new Map(),
	} as Observers<any>;
	return new Proxy(Object.defineProperty(call, "$", { get, set }), {
		get(_, key, proxy) {
			if (key in call) return call[key];
			let obs = _observe(
				() => {
					use(obs);
					return get()?.[key];
				},
				(value) => {
					get()[key] = value;
					let called: any[] = [];
					bubble(obs, (n) => emit("set", n, [], called));
				},
				(...args: any) => {
					use(obs);
					let res = get()?.[key](...args);
					emit("call", obs, [args, res] as never);
					return res;
				},
				proxy
			);

			return (call[key] = obs);
		},
	});
}
