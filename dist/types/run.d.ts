import { Observable } from "./types";
export declare let use: (node: Observable<unknown>) => void;
export declare function run(fn: () => void): void;
