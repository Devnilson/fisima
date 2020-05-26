import { Event } from './event';
import { StateData } from './state-data';

export interface StateMachine<T> {
  dispatch($event: Event): void | never;
  getCurrentState(): StateData<T>;
}
