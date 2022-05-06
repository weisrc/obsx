import { Observable } from "./types";
export declare const bubble: (obs: Observable<unknown>, fn: (obs: Observable<unknown>) => void) => void;
