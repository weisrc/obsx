import { Observers, Observable, CallObserver, SetObserver } from "./types";
interface ObserverMappings<T> {
    set: SetObserver;
    call: CallObserver<T>;
}
export declare function emit<K extends keyof Observers<T>, T>(kind: K, node: Observable<T>, args: Parameters<ObserverMappings<T>[K]>, called?: unknown[]): void;
export {};
