import { noopTransitionTrigger, RawMachineTransition, Transition, TransitionAction } from '../raw-transition';
import { Node, RawNode } from '../raw-node';
import { StateMachineBuilder } from './state-machine.builder';

export class NodeBuilder<T> {
  private readonly parentBuilder: StateMachineBuilder<T>;
  private readonly nodeName: string;
  private readonly transitions: Transition<T>[];

  constructor(
    parentBuilder: StateMachineBuilder<T>,
    name: string) {
    this.parentBuilder = parentBuilder;
    this.nodeName = name;
    this.transitions = [];
  }

  public withTransition(
    transitionName: string,
    destination: string,
    onTransitionTrigger: TransitionAction<T> = noopTransitionTrigger): NodeBuilder<T> {
    this.transitions.push(new RawMachineTransition(transitionName, destination, onTransitionTrigger));
    return this;
  }

  public and(): StateMachineBuilder<T> {
    return this.parentBuilder;
  }

  public build(): Node<T> {
    return new RawNode(this.nodeName, this.transitions);
  }
}