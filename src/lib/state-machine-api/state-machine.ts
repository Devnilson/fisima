import { MachineState } from './machine-state';
import { MachineEvent } from './machine-event';
export interface StateMachine<TOutput> {
  currentState: MachineState<TOutput>;
  dispatch($event: MachineEvent): void;
}
