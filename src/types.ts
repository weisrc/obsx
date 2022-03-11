import { notifyChange } from ".";
import { value, onChange, onApply } from "./symbols";

export type Function = (...args: unknown[]) => void;

export type ObserverInit<T> = (observer: T) => () => void;

export type ChangeObserver<T> = (current: T, previous: T) => void;
export type ApplyObserver<T extends Function> = (...args: Parameters<T>) => void;

export type ObservableValue<T> = {
	[value]: T;
	[notifyChange](force?: boolean): void;
	readonly [onChange]: ObserverInit<ChangeObserver<T>>;
};

// workaround to get all keys (even prototype keys)
export type ObservableObject<T, U extends keyof T = keyof T> = T extends object
	? {
			[k in U]: Observable<Required<T>[k]>;
	  }
	: {};

export type ObservableFunction<T> = T extends (...args: any) => any
	? {
			(...args: Parameters<T>): ReturnType<T>;
			readonly [onApply]: ObserverInit<ApplyObserver<T>>;
	  }
	: {};

export type Observable<T> = ObservableValue<T> &
	ObservableObject<T> &
	ObservableFunction<T>;
