import { Node, Event, StateData, StateMachine } from '../model';

export class RawStateMachine<T> implements StateMachine<T> {
  private readonly _states: Map<string, Node<T>>;
  private readonly _initialState: StateData<T>;
  private _currentState: StateData<T>;

  constructor(initialState: StateData<T>, states: Node<T>[]) {
    this._initialState = initialState;
    this._currentState = initialState;
    this._states = new Map<string, Node<T>>();
    states.forEach(state => {
      this._states.set(state.getName(), state);
    });

    if (!this._states.has(this._currentState.name)) throw new Error(`Invalid initial state ${this._currentState.name}`);
  }

  public dispatch(event: Event): void | never {
    const currentState = this._states.get(this._currentState.name) as Node<T>;
    const nextState = currentState.dispatch(event, this._currentState);

    if (!this._states.has(nextState.name))
      throw new Error(`Invalid state resulted on transition - No Such State ${nextState.name}`);

    this._currentState = nextState;
  }

  public getCurrentState(): StateData<T> {
    return this._currentState;
  }
}
