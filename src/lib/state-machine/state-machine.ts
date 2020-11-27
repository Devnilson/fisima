import {
  StateMachine,
  MachineEvent,
  MachineState,
  MachineNode,
  MachineTransitionFn,
  MachineOutputFn,
} from '../state-machine-api';

export class GenericStateMachine<TOutput> implements StateMachine<TOutput> {
  private _currentState: MachineState<TOutput>;

  constructor(
    private initialState: MachineState<TOutput>,
    private nodes: MachineNode[],
    private transitionFn: MachineTransitionFn<TOutput>,
    private outputFn: MachineOutputFn<TOutput>,
  ) {
    this._currentState = Object.freeze(initialState);
  }

  public get currentState(): MachineState<TOutput> {
    return this._currentState;
  }

  public dispatch($event: MachineEvent): MachineState<TOutput> {
    const nextNodeId = this.transitionFn(this.currentState, $event);
    const nextNode = this.nodes.find((node) => node.id === nextNodeId);
    if (nextNode) {
      const output = this.outputFn(this.currentState, $event, nextNode);
      this._currentState = { currentNode: nextNode, output } as MachineState<TOutput>;
    }
    return this._currentState;
  }
}
