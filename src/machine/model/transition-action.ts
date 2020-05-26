import { Event } from '.';
export type TransitionAction<T> = (current: T | undefined | null, $event: Event) => T | undefined | null;
