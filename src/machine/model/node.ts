import { Event } from './event';
import { StateData } from './state-data';

export interface Node<T> {
  getName(): string;
  dispatch($event: Event, currentState: StateData<T>): StateData<T>;
}
