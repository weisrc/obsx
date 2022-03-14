import { bubble } from "./bubble";
import { on } from "./on";
import { SetObserver, Dispose, Observable } from "./types";

export function watch<T>(node: Observable<T>, observer: SetObserver): Dispose {
	let disposers: Dispose[] = [];
	bubble(node, (n) => disposers.push(on("set", n, observer)));
	return () => disposers.forEach((d) => d());
}
