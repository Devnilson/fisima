import { StateData, StateMachine } from '../model';
import { RxjsStateMachine } from './rxjs-state-machine';
import { Observable, ReplaySubject, Subject } from 'rxjs';

export class RxjsStateMachineDecorator<T> implements RxjsStateMachine<T> {
  private readonly machine: StateMachine<T>;
  private readonly currentState$: Subject<StateData<T>>;

  constructor(machine: StateMachine<T>) {
    this.machine = machine;
    this.currentState$ = new ReplaySubject(1);
  }

  dispatch($event: Event): void {
    this.machine.dispatch($event);
    this.currentState$.next(this.machine.getCurrentState());
  }

  getCurrentState(): Observable<StateData<T>> {
    return this.currentState$.asObservable();
  }
}