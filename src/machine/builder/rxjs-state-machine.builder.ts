import { NodeBuilder } from './node.builder';
import { RawStateMachineBuilder } from './raw-state-machine.builder';
import { RxjsStateMachine, RxjsStateMachineDecorator } from '../rxjs';
import { RxjsNodeBuilder } from './rxjs-node.builder';

export class RxjsStateMachineBuilder<T> {
  private readonly rawStateMachineBuilder: RawStateMachineBuilder<T>;
  constructor(
    initialStateName: string,
    initialStateData?: T,
  ) {
    this.rawStateMachineBuilder = new RawStateMachineBuilder(initialStateName, initialStateData);
  }

  public withNode(name: string): RxjsNodeBuilder<T> {
    return new RxjsNodeBuilder<T>(this, this.rawStateMachineBuilder.withNode(name));
  }

  public build(): RxjsStateMachine<T> {
    return new RxjsStateMachineDecorator<T>(this.rawStateMachineBuilder.build());
  }
}