import { Node } from './raw-node';
import { Event } from './event';
import { StateData } from './state-data';
import { Observable, ReplaySubject, Subject } from 'rxjs';

export interface StateMachine<T> {
  dispatch($event: Event): void | never;
  getCurrentState(): Observable<StateData<T>>;
}

export class RawStateMachine<T> implements StateMachine<T> {
  private readonly _states: Map<string, Node<T>>;
  private readonly _initialState: StateData<T>;
  private readonly currentState$: Subject<StateData<T>>;
  private _currentState: StateData<T>;

  constructor(initialState: StateData<T>, states: Node<T>[]) {
    this._initialState = initialState;
    this._currentState = initialState;
    this.currentState$ = new ReplaySubject<StateData<T>>(1);
    this._states = new Map<string, Node<T>>();
    states.forEach(state => {
      this._states.set(state.getName(), state);
    });

    if (!this._states.has(this._currentState.name)) throw new Error(`Invalid initial state ${this._currentState.name}`);
    this.currentState$.next(this._currentState);
  }

  public dispatch(event: Event): void | never {
    const currentState = this._states.get(this._currentState.name) as Node<T>;
    const nextState = currentState.dispatch(event, this._currentState);

    if (!this._states.has(nextState.name))
      throw new Error(`Invalid state resulted on transition - No Such State ${nextState.name}`);

    this._currentState = nextState;
    this.currentState$.next(nextState);
  }

  public getCurrentState(): Observable<StateData<T>> {
    return this.currentState$.asObservable();
  }
}
