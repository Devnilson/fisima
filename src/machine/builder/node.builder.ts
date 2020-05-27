import { RawStateMachineBuilder } from './raw-state-machine.builder';
import { Node, Transition, TransitionAction } from '../model';
import { noopTransitionTrigger, StaticDestinationTransition, RawNode } from '../raw';

export class NodeBuilder<T> {
  private readonly parentBuilder: RawStateMachineBuilder<T>;
  private readonly nodeName: string;
  private readonly transitions: Transition<T>[];

  constructor(
    parentBuilder: RawStateMachineBuilder<T>,
    name: string) {
    this.parentBuilder = parentBuilder;
    this.nodeName = name;
    this.transitions = [];
  }

  public withStaticTransition(
    eventType: string,
    destinationNode: string,
    onTransitionTrigger: TransitionAction<T> = noopTransitionTrigger): NodeBuilder<T> {
    this.transitions.push(new StaticDestinationTransition(eventType, destinationNode, onTransitionTrigger));
    return this;
  }

  public and(): RawStateMachineBuilder<T> {
    return this.parentBuilder;
  }

  public build(): Node<T> {
    return new RawNode(this.nodeName, this.transitions);
  }
}