import { info, Observable, Dispose, Observers } from "./types";

export function on<T, K extends keyof Observers<T>>(
	kind: K,
	node: Observable<T>,
	observer: Observers<T>[K] extends Map<infer X, 0> ? X : never
): Dispose {
	let map = node[info][kind];
	map.set(observer as any, 0);
	return () => map.delete(observer as any);
}
