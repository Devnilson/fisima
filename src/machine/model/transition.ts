import { StateData } from './state-data';

export interface Transition<T> {
  doesTrigger(currentState: StateData<T>, $event: Event): boolean;
  /**
   * Returns the nextState with mapped data or currentState if not triggered.
   * @param currentState Current machine state and data
   * @param $event Event triggered with expected payload
   */
  trigger(currentState: StateData<T>, $event: Event): StateData<T>;
}