import { StateMachine, MachineEvent, MachineState, MachineNode, MachineTransitionFn } from '../state-machine-api';

export class GenericStateMachine<TOutput> implements StateMachine<TOutput> {
  private currentState: MachineState<TOutput>;
  private closed = false;

  constructor(
    private initialNode: MachineNode,
    private finalNodes: Set<MachineNode>,
    private transitionFn: MachineTransitionFn<TOutput>,
  ) {
    this.currentState = {
      currentNode: initialNode,
    };
  }

  public getCurrentState(): MachineState<TOutput> {
    return this.currentState;
  }

  public handle($event: MachineEvent): MachineState<TOutput> | never {
    if (this.isClosed()) {
      throw new Error('StateMachine is now closed and can not accept any more events');
    }
    this.currentState = this.transitionFn(this.currentState, $event);
    return this.currentState;
  }

  public canClose(): boolean {
    return !this.isClosed() && this.finalNodes.has(this.currentState.currentNode);
  }

  public isClosed(): boolean {
    return this.closed;
  }

  public close(): MachineState<TOutput> | never {
    if (!this.canClose()) {
      throw new Error(
        'StateMachine can not be closed in current state: ' +
          this.currentState.currentNode +
          ' as it is not a final state',
      );
    }
    this.closed = true;
    return this.getCurrentState();
  }
}
