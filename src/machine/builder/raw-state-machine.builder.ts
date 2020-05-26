import { NodeBuilder } from './node.builder';
import { RawStateMachine } from '../raw';
import { StateMachine } from '../model';

export class RawStateMachineBuilder<T> {
  private readonly initialStateName: string;
  private readonly initialStateData: T | undefined;
  private readonly nodeBuilders: NodeBuilder<T>[];

  constructor(
    initialStateName: string,
    initialStateData?: T,
  ) {
    this.initialStateName = initialStateName;
    this.initialStateData = initialStateData;
    this.nodeBuilders = [];
  }

  public withNode(name: string): NodeBuilder<T> {
    const nodeBuilder = new NodeBuilder<T>(this, name);
    this.nodeBuilders.push(nodeBuilder);
    return nodeBuilder;
  }

  public build(): StateMachine<T> {
    return new RawStateMachine<T>({
      name: this.initialStateName,
      data: this.initialStateData,
    }, this.nodeBuilders.map(nodeBuilder => nodeBuilder.build()));
  }
}