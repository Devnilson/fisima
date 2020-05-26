import { Event, StateData } from '../model';
import { Observable } from 'rxjs';

export interface RxjsStateMachine<T> {
  dispatch($event: Event): void | never;
  getCurrentState(): Observable<StateData<T>>;
}