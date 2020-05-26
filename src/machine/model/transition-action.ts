export type TransitionAction<T> = (current: T | undefined | null) => T | undefined | null;
