import { Node, OnCall, OnSet, OnNode, Register } from "./types";
import {
	value,
	reflect,
	depth,
	compare,
	onCall,
	onNode,
	onSet,
} from "./symbols";

const createRegister = <T>(handlers: T[]): Register<T> => {
	return (handler) => {
		handlers.push(handler);
		return () => {
			const i = handlers.indexOf(handler);
			if (i >= 0) handlers.splice(i, 1);
		};
	};
};

const createNode = <T>(
	get: any,
	set: (value: any) => any,
	call: (args: any[]) => any
): Node<T> => {
	let previous = get();
	const nodes: Node<unknown>[] = [];
	const onSets: OnSet<T>[] = [];
	const onCalls: OnCall<any>[] = [];
	const onNodes: OnNode<any>[] = [];
	return new Proxy(
		Object.assign(
			Object.defineProperty(
				(...args: any) => {
					const res = call(args);
					for (const h of onCalls) h(args, res);
					return res;
				},
				value,
				{
					get,
					set(v) {
						set(v);
						this[compare]();
					},
				}
			),
			{
				[depth]: 0,
				[onSet]: createRegister(onSets),
				[onCall]: createRegister(onCalls),
				[onNode]: createRegister(onNodes),
				[reflect]: () => ({
					get,
					set,
					call,
					previous,
					nodes,
					onSets,
					onCalls,
					onNodes,
				}),
				// @ts-ignore
				[compare](d = this[depth]) {
					const current = get();
					if (current === previous) {
						if (d-- === 0) return;
					} else d = this[depth];
					for (const h of onSets) h(current, previous);
					for (const n of nodes) n[compare](d);
					previous = current;
				},
			}
		) as any,
		{
			get(target, key) {
				if (key in target) return target[key];
				const node = createNode<any>(
					() => get()?.[key],
					(v) => (get()[key] = v),
					(args: any) => get()?.[key](...args)
				);
				nodes.push((target[key] = node));
				for (const h of onNodes) h(key, node);
				return node;
			},
		}
	);
};

export const observe = <T>(value: T) =>
	createNode<T>(
		() => value,
		(current: any) => (value = current),
		(args: any) => (value as any)?.(...args)
	);
