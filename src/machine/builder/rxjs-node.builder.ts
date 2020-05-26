import { Node, TransitionAction } from '../model';
import { noopTransitionTrigger } from '../raw';
import { RxjsStateMachineBuilder } from './rxjs-state-machine.builder';
import { NodeBuilder } from './node.builder';

export class RxjsNodeBuilder<T> {
  private readonly parentBuilder: RxjsStateMachineBuilder<T>;
  private readonly nodeBuilder: NodeBuilder<T>;

  constructor(
    parentBuilder: RxjsStateMachineBuilder<T>,
    nodeBuilder: NodeBuilder<T>,
    ) {
    this.parentBuilder = parentBuilder;
    this.nodeBuilder = nodeBuilder;
  }

  public withStaticTransition(
    eventType: string,
    destination: string,
    onTransitionTrigger: TransitionAction<T> = noopTransitionTrigger): RxjsNodeBuilder<T> {
    this.nodeBuilder.withStaticTransition(eventType, destination, onTransitionTrigger);
    return this;
  }

  public and(): RxjsStateMachineBuilder<T> {
    return this.parentBuilder;
  }

  public build(): Node<T> {
    return this.nodeBuilder.build();
  }
}