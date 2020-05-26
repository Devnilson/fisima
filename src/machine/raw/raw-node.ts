import { Node, StateData, Transition } from '../model';

export class RawNode<T> implements Node<T> {
  private readonly name: string;
  private readonly transitions: Map<string, Transition<T>>;

  constructor(name: string, transitions: Transition<T>[]) {
    this.name = name;
    this.transitions = new Map<string, Transition<T>>();
    transitions.forEach(transition => {
      this.transitions.set(transition.getTransitionName(), transition);
    });
  }

  public dispatch($event: Event, currentState: StateData<T>): StateData<T> {
    if (!this.transitions.has($event.type)) {
      return currentState;
    }

    const transition = this.transitions.get($event.type);
    // @ts-ignore Already checked
    return transition.trigger(currentState, $event.payload);
  }

  getName(): string {
    return this.name;
  }
}
