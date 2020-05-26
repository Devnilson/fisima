import { StateData } from './state-data';

export interface Transition<T> {
  getTransitionName(): string;
  getDestinationState(): string;
  trigger(currentState: StateData<T>, $event: any): StateData<T>;
}