import { Event, StateData, Transition, TransitionAction } from '../model';

export const noopTransitionTrigger = <T>(a: T | null | undefined) => a;

export class StaticDestinationTransition<T> implements Transition<T> {
  private readonly eventType: string;
  private readonly nextState: string;
  private readonly onTrigger: TransitionAction<T>;

  constructor(
    eventName: string,
    nextState: string,
    onTransitionTrigger: TransitionAction<T> = noopTransitionTrigger,
  ) {
    this.eventType = eventName;
    this.nextState = nextState;
    this.onTrigger = onTransitionTrigger;
  }

  public trigger(currentState: StateData<T>, $event: Event): StateData<T> {
    const data = this.onTrigger ? this.onTrigger(currentState.data, $event.payload) : currentState.data;
    return { name: this.nextState, data };
  }

  doesTrigger(currentState: StateData<T>, $event: Event): boolean {
    return this.eventType === $event.type;
  }
}
