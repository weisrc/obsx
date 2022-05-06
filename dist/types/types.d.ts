export declare const info: unique symbol;
declare type Fn = (...args: any) => any;
export declare type SetObserver = () => void;
export declare type CallObserver<T> = T extends Fn ? (args: Parameters<T>, ret: ReturnType<T>) => void : never;
export interface Observers<T> {
    set: Map<SetObserver, 0>;
    call: Map<CallObserver<T>, 0>;
}
export declare type Dispose = () => void;
export interface Info<T> extends Observers<T> {
    prev: Observable<unknown>;
}
export declare type Observable<T> = {
    $: T;
    [info]: Info<T>;
} & MapObservable<T> & (T extends Fn ? (...args: Parameters<T>) => ReturnType<T> : {});
declare type MapObservable<T, U extends keyof T = keyof T> = {
    [K in U]: Observable<Required<T>[K]>;
};
export {};
