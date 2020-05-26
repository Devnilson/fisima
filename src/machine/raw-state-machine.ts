import { Node } from './raw-node';
import { Event } from './event';
import { StateData } from './state-data';

export interface StateMachine<T> {
  dispatch($event: Event): void | never;
  getCurrentState(): StateData<T>;
}

export class RawStateMachine<T> implements StateMachine<T> {
  private _states: Map<string, Node<T>>;
  private _initialState: StateData<T>;
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
    // @ts-ignore We have already checked there is such state
    this._currentState = currentState.dispatch(event, this._currentState);

    if (!this._states.has(this._currentState.name))
      throw new Error(`Invalid state resulted on transition - No Such State ${this._currentState.name}`);
  }

  public getCurrentState(): StateData<T> {
    return this._currentState;
  }
}
