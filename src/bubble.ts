import { Observable, info } from "./types";

export const bubble = (
	obs: Observable<unknown>,
	fn: (obs: Observable<unknown>) => void
) => {
	do fn(obs);
	while ((obs = obs[info].prev));
};
