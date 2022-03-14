export const info = Symbol("info");

type Fn = (...args: any) => any;

export type SetObserver = () => void;
export type CallObserver<T> = T extends Fn
	? (args: Parameters<T>, ret: ReturnType<T>) => void
	: never;

export interface Observers<T> {
	set: Map<SetObserver, 0>;
	call: Map<CallObserver<T>, 0>;
}

export type Dispose = () => void;

export interface Info<T> extends Observers<T> {
	prev: Observable<unknown>;
}

export type Observable<T> = {
	$: T;
	[info]: Info<T>;
} & MapObservable<T> &
	(T extends Fn ? (...args: Parameters<T>) => ReturnType<T> : {});

type MapObservable<T, U extends keyof T = keyof T> = {
	[K in U]: Observable<Required<T>[K]>;
};
