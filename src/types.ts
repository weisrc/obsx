import {
	value,
	reflect,
	depth,
	compare,
	onCall,
	onNode,
	onSet,
} from "./symbols";

export type OnSet<T> = (current: T, previous: T) => void;
export type OnNode<T> = (key: keyof T, node: Node<T>) => void;
export type Register<T> = (handler: T) => () => void;
export type OnCall<T extends Fn> = (
	args: Parameters<T>,
	res: ReturnType<T>
) => void;

export interface Reflect<T> {
	get(): T;
	set(v: T): T;
	call: T extends Fn ? T : never;
	previous: T;
	nodes: Node<T[keyof T]>[];
	onSets: OnSet<T>[];
	onCalls: T extends Fn ? OnCall<T>[] : never;
	onNodes: OnNode<T>[];
}

export type Node<T> = {
	[value]: T;
	[compare](depth?: number): void;
	[reflect](): Reflect<T>;
	[depth]: number;
	readonly [onSet]: Register<OnSet<T>>;
} & (T extends object ? ObjNode<T> : {}) &
	(T extends Fn ? FnNode<T> : {});

type Fn = (...args: any) => any;

type ObjNode<T extends object, U extends keyof T = keyof T> = {
	[K in U]: Node<Required<T>[K]>;
} & {
	readonly [onNode]: Register<OnNode<T>>;
};

type FnNode<T extends Fn> = {
	(...args: Parameters<T>): ReturnType<T>;
	readonly [onCall]: Register<OnCall<T>>;
};
