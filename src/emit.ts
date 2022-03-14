import { ignored } from "./ignore";
import {
	Observers,
	Observable,
	info,
	CallObserver,
	SetObserver,
} from "./types";

interface ObserverMappings<T> {
	set: SetObserver;
	call: CallObserver<T>;
}

export function emit<K extends keyof Observers<T>, T>(
	kind: K,
	node: Observable<T>,
	args: Parameters<ObserverMappings<T>[K]>,
	called: unknown[] = []
) {
	if (ignored) return;
	for (let observer of node[info][kind].keys()) {
		if (!called.includes(observer)) {
			// @ts-ignore
			observer(...args);
			called.push(observer);
		}
	}
}
