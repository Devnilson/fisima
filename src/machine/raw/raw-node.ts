import { Node, StateData, Transition } from '../model';

export class RawNode<T> implements Node<T> {
  private readonly name: string;
  private readonly transitions: Transition<T>[];

  constructor(name: string, transitions: Transition<T>[]) {
    this.name = name;
    this.transitions = [];
    transitions.forEach(transition => {
      this.transitions.push(transition);
    });
  }

  public dispatch($event: Event, currentState: StateData<T>): StateData<T> {
    const transitions = this.transitions.filter(t => t.doesTrigger(currentState, $event));
    if (transitions.length > 1) {
      // TODO: Add more specific error with data
      throw new Error('More than one transition can be triggered at the same time ');
    }

    if (transitions.length === 0) {
      return currentState;
    }

    const transition = transitions[0];
    return transition.trigger(currentState, $event);
  }

  getName(): string {
    return this.name;
  }
}
