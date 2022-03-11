import { value, onChange, onApply, notifyChange } from "./symbols";
import { Observable } from "./types";

function _observe(
	get: () => any,
	set: (value: any) => any,
	apply: (...args: any) => any
): any {
	const applyObservers = new Map();
	const changeObesrvers = new Map();
	const propertyProxies: any[] = [];
	let previous = get();
	const target: any = Object.defineProperty(
		(...args: any) => {
			const result = apply(...args);
			for (const applier of applyObservers.keys()) applier(...args);
			return result;
		},
		value,
		{
			get,
			set(current) {
				set(current);
				target[notifyChange]();
			},
		}
	);
	target[notifyChange] = (force = false) => {
		const current = get();
		if (!force && current === previous) return;
		for (const observer of changeObesrvers.keys()) observer(current, previous);
		for (const propertyProxy of propertyProxies)
			propertyProxy[notifyChange](force);
		previous = current;
	};
	target[onChange] = (observer: any) => {
		changeObesrvers.set(observer, 0);
		return () => changeObesrvers.delete(observer);
	};
	target[onApply] = (observer: any) => {
		applyObservers.set(observer, 0);
		return () => applyObservers.delete(observer);
	};
	return new Proxy(target, {
		get: (target, key) => {
			if (key in target) return target[key];
			const proxy = _observe(
				() => get()?.[key],
				(value) => (get()[key] = value),
				(...args) => get()?.[key](...args)
			);
			propertyProxies.push(proxy);
			target[key] = proxy;
			return proxy;
		},
	});
}

export function observe<T>(value: T): Observable<T> {
	return _observe(
		() => value,
		(current) => (value = current),
		// @ts-ignore
		(...args) => value?.(...args)
	);
}
