import { StateData } from './state-data';

export interface Transition<T> {
  trigger(currentState: StateData<T>, $event: any): StateData<T>;
}

export type TransitionAction<T> = (current: T | undefined | null) => T | undefined | null;

export const noopTransitionTrigger = <T>(a: T | null | undefined) => a;

export class RawMachineTransition<T> implements Transition<T> {
  private originState: string;
  private nextState: string;
  private onTrigger: TransitionAction<T>;

  constructor(
    originState: string,
    nextState: string,
    onTransitionTrigger: TransitionAction<T> = noopTransitionTrigger,
  ) {
    this.originState = originState;
    this.nextState = nextState;
    this.onTrigger = onTransitionTrigger;
  }

  trigger(currentState: StateData<T>, $event: any): StateData<T> {
    const data = this.onTrigger ? this.onTrigger(currentState.data) : currentState.data;
    return { name: this.nextState, data };
  }
}
