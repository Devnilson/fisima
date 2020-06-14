import { MachineState } from './machine-state';
import { MachineEvent } from './machine-event';
export interface StateMachine<TOutput> {
  getCurrentState(): MachineState<TOutput>;
  handle($event: MachineEvent): MachineState<TOutput> | never;
  canClose(): boolean;
  isClosed(): boolean;
  close(): MachineState<TOutput> | never;
}
