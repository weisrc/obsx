import { SetObserver, Dispose, Observable } from "./types";
export declare function watch<T>(node: Observable<T>, observer: SetObserver): Dispose;
