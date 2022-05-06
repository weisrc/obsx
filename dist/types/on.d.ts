import { Observable, Dispose, Observers } from "./types";
export declare function on<T, K extends keyof Observers<T>>(kind: K, node: Observable<T>, observer: Observers<T>[K] extends Map<infer X, 0> ? X : never): Dispose;
